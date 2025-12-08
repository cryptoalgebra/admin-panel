import { useReadContracts } from "wagmi";
import { Pool, ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";
import { useCurrency } from "@/hooks/common/useCurrency";
import { useMemo } from "react";
import { algebraPoolABI } from "config/abis";

export const PoolState = {
    LOADING: "LOADING",
    NOT_EXISTS: "NOT_EXISTS",
    EXISTS: "EXISTS",
    INVALID: "INVALID",
} as const;

export type PoolStateType = (typeof PoolState)[keyof typeof PoolState];

export function usePool(address: Address | undefined): [PoolStateType, Pool | null] {
    const {
        data: multicallData,
        isLoading: isMulticallLoading,
        isError: isMulticallError,
    } = useReadContracts({
        allowFailure: false,
        contracts: address
            ? [
                  { address, abi: algebraPoolABI, functionName: "tickSpacing" },
                  { address, abi: algebraPoolABI, functionName: "globalState" },
                  { address, abi: algebraPoolABI, functionName: "liquidity" },
                  { address, abi: algebraPoolABI, functionName: "token0" },
                  { address, abi: algebraPoolABI, functionName: "token1" },
              ]
            : undefined,
    });

    const [tickSpacing, globalState, liquidity, token0Address, token1Address] = multicallData || [];

    const token0 = useCurrency(token0Address);
    const token1 = useCurrency(token1Address);

    const isPoolError = isMulticallError || !address;

    const isPoolLoading = isMulticallLoading;
    const isTokensLoading = !token0 || !token1;

    return useMemo(() => {
        if ((isPoolLoading || isTokensLoading) && !isPoolError) return [PoolState.LOADING, null];

        if (!tickSpacing || !globalState || liquidity === undefined) return [PoolState.NOT_EXISTS, null];

        if (globalState[0] === 0n || !token0 || !token1) return [PoolState.NOT_EXISTS, null];

        try {
            return [
                PoolState.EXISTS,
                new Pool(
                    token0.wrapped,
                    token1.wrapped,
                    globalState[2],
                    ADDRESS_ZERO,
                    globalState[0].toString(),
                    Number(liquidity),
                    globalState[1],
                    tickSpacing
                ),
            ];
        } catch (error) {
            return [PoolState.NOT_EXISTS, null];
        }
    }, [token0, token1, globalState, liquidity, tickSpacing, isPoolError, isPoolLoading, isTokensLoading]);
}
