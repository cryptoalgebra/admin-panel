import { Address, erc20Abi } from "viem";
import { useReadContracts, useBalance } from "wagmi";
import { useMemo } from "react";
import { PredictionMarket } from "../types";
import { ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk";
import { DEFAULT_NATIVE_SYMBOL } from "config/default-chain";

interface TokenBalance {
    address: Address;
    symbol: string;
    decimals: number;
    balance: bigint;
}

interface AmountByToken {
    symbol: string;
    decimals: number;
    total: bigint;
    address: Address;
}

function aggregateAmountsByToken(
    markets: PredictionMarket[],
    tokenMeta: Map<string, TokenBalance>,
    selector: (market: PredictionMarket) => bigint,
): AmountByToken[] {
    const amountMap = new Map<string, AmountByToken>();

    for (const market of markets) {
        const amount = selector(market);
        if (amount <= 0n) continue;

        const address = (market.collateralToken || ADDRESS_ZERO).toLowerCase() as Address;
        const existing = amountMap.get(address);

        if (existing) {
            existing.total += amount;
            continue;
        }

        const meta = tokenMeta.get(address);
        amountMap.set(address, {
            address,
            symbol: meta?.symbol || (address === ADDRESS_ZERO.toLowerCase() ? DEFAULT_NATIVE_SYMBOL : "???"),
            decimals: meta?.decimals || 18,
            total: amount,
        });
    }

    return Array.from(amountMap.values());
}

export function useTreasuryBalances(protocolAddress: Address | undefined, markets: PredictionMarket[]) {
    const collateralTokens = useMemo(() => {
        const unique = new Set<Address>();
        for (const m of markets) {
            if (m.collateralToken && m.collateralToken.toLowerCase() !== ADDRESS_ZERO.toLowerCase()) {
                unique.add(m.collateralToken.toLowerCase() as Address);
            }
        }
        return Array.from(unique) as Address[];
    }, [markets]);

    const hasNativeCollateral = useMemo(
        () => markets.some((market) => market.collateralToken?.toLowerCase() === ADDRESS_ZERO.toLowerCase()),
        [markets],
    );

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

    const tokenMeta = useMemo(() => {
        const entries = tokenBalances.map((token) => [token.address.toLowerCase(), token] as const);

        if (hasNativeCollateral) {
            entries.push([
                ADDRESS_ZERO.toLowerCase(),
                {
                    address: ADDRESS_ZERO as Address,
                    symbol: nativeBalance?.symbol || DEFAULT_NATIVE_SYMBOL,
                    decimals: nativeBalance?.decimals || 18,
                    balance: nativeBalance?.value || 0n,
                },
            ]);
        }

        return new Map(entries);
    }, [tokenBalances, hasNativeCollateral, nativeBalance]);

    const claimableFeesByToken = useMemo(() => aggregateAmountsByToken(markets, tokenMeta, (market) => BigInt(market.accruedFees || 0)), [
        markets,
        tokenMeta,
    ]);

    const seededAmountsByToken = useMemo(() => aggregateAmountsByToken(markets, tokenMeta, (market) => BigInt(market.seedAmount || 0)), [
        markets,
        tokenMeta,
    ]);

    return {
        nativeBalance,
        tokenBalances,
        claimableFeesByToken,
        seededAmountsByToken,
        collateralTokens,
    };
}
