import { useMemo } from "react";
import { Token, ExtendedNative, ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk";
import { useReadContracts } from "wagmi";
import { Address, erc20Abi } from "viem";
import { DEFAULT_CHAIN_ID, DEFAULT_NATIVE_NAME, DEFAULT_NATIVE_SYMBOL } from "config/default-chain";

export function useAlgebraToken(address: Address | undefined) {
    const { data: tokenData, isLoading } = useReadContracts({
        allowFailure: false,
        contracts: [
            {
                address: address as Address,
                abi: erc20Abi,
                functionName: "symbol",
            },
            {
                address: address as Address,
                abi: erc20Abi,
                functionName: "name",
            },
            {
                address: address as Address,
                abi: erc20Abi,
                functionName: "decimals",
            },
        ],
    });

    return useMemo(() => {
        if (!address) return;

        const isETH = address === ADDRESS_ZERO;

        if (isETH) return ExtendedNative.onChain(DEFAULT_CHAIN_ID, DEFAULT_NATIVE_SYMBOL, DEFAULT_NATIVE_NAME);

        if (isLoading || !tokenData) return undefined;

        const [symbol, name, decimals] = tokenData;

        return new Token(DEFAULT_CHAIN_ID, address, decimals, symbol, name);
    }, [address, tokenData, isLoading]);
}
