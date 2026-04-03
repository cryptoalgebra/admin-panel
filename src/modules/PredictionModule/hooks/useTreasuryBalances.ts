import { Address, erc20Abi } from "viem";
import { useReadContracts, useBalance } from "wagmi";
import { useMemo } from "react";
import { PredictionMarket } from "../types";

interface TokenBalance {
    address: Address;
    symbol: string;
    decimals: number;
    balance: bigint;
}

export function useTreasuryBalances(protocolAddress: Address | undefined, markets: PredictionMarket[]) {
    const collateralTokens = useMemo(() => {
        const unique = new Set<Address>();
        for (const m of markets) {
            if (m.collateralToken) unique.add(m.collateralToken.toLowerCase() as Address);
        }
        return Array.from(unique) as Address[];
    }, [markets]);

    const { data: nativeBalance } = useBalance({
        address: protocolAddress,
        query: { enabled: !!protocolAddress },
    });

    const tokenInfoContracts = useMemo(() => {
        if (!protocolAddress || collateralTokens.length === 0) return [];
        return collateralTokens.flatMap((token) => [
            { address: token, abi: erc20Abi, functionName: "symbol" as const },
            { address: token, abi: erc20Abi, functionName: "decimals" as const },
            {
                address: token,
                abi: erc20Abi,
                functionName: "balanceOf" as const,
                args: [protocolAddress],
            },
        ]);
    }, [protocolAddress, collateralTokens]);

    const { data: tokenData } = useReadContracts({
        contracts: tokenInfoContracts,
        query: { enabled: tokenInfoContracts.length > 0 },
    });

    const tokenBalances: TokenBalance[] = useMemo(() => {
        if (!tokenData || collateralTokens.length === 0) return [];
        const result: TokenBalance[] = [];
        for (let i = 0; i < collateralTokens.length; i++) {
            const symbolResult = tokenData[i * 3];
            const decimalsResult = tokenData[i * 3 + 1];
            const balanceResult = tokenData[i * 3 + 2];
            if (symbolResult?.status === "success" && decimalsResult?.status === "success" && balanceResult?.status === "success") {
                result.push({
                    address: collateralTokens[i],
                    symbol: symbolResult.result as string,
                    decimals: decimalsResult.result as number,
                    balance: balanceResult.result as bigint,
                });
            }
        }
        return result;
    }, [tokenData, collateralTokens]);

    const claimableFeesByToken = useMemo(() => {
        const feeMap = new Map<string, { symbol: string; decimals: number; total: bigint; address: Address }>();
        for (const m of markets) {
            const fees = BigInt(m.accruedFees || 0);
            if (fees <= 0n) continue;
            const addr = (m.collateralToken as string).toLowerCase();
            const existing = feeMap.get(addr);
            if (existing) {
                existing.total += fees;
            } else {
                const tokenInfo = tokenBalances.find((t) => t.address.toLowerCase() === addr);
                feeMap.set(addr, {
                    symbol: tokenInfo?.symbol || "???",
                    decimals: tokenInfo?.decimals || 18,
                    total: fees,
                    address: addr as Address,
                });
            }
        }
        return Array.from(feeMap.values());
    }, [markets, tokenBalances]);

    return {
        nativeBalance,
        tokenBalances,
        claimableFeesByToken,
        collateralTokens,
    };
}
