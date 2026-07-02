import { binaryLmsrMarketManagerAbi } from "@/generated";
import { BINARY_LMSR_MARKET_MANAGER } from "config/contract-addresses";
import { useMemo } from "react";
import { Address } from "viem";
import { useChainId, useReadContracts } from "wagmi";

export interface MarketState {
    protocol: Address | undefined;
    collateralToken: Address | undefined;
    seeded: boolean | undefined;
    outcome: number | undefined;
    priceYes: bigint | undefined;
    priceNo: bigint | undefined;
    qYes: bigint | undefined;
    qNo: bigint | undefined;
    accruedFees: bigint | undefined;
    question: string | undefined;
    b: bigint | undefined;
    feeBps: bigint | undefined;
    tradingDeadline: bigint | undefined;
    maxLoss: bigint | undefined;
    accountedCollateral: bigint | undefined;
}

function parseMarketIndex(marketId: string | undefined) {
    if (!marketId) return undefined;

    const [, rawIndex] = marketId.split("-");
    const normalizedIndex = rawIndex ?? marketId;

    try {
        return BigInt(normalizedIndex);
    } catch {
        return undefined;
    }
}

export function usePredictionMarketState(marketId: string | undefined) {
    const chainId = useChainId();

    const contracts = useMemo(() => {
        const marketIndex = parseMarketIndex(marketId);
        const managerAddress = BINARY_LMSR_MARKET_MANAGER[chainId];

        if (marketIndex === undefined || !managerAddress) return [];

        return [
            {
                address: managerAddress,
                abi: binaryLmsrMarketManagerAbi,
                functionName: "getMarket" as const,
                args: [marketIndex],
            },
            {
                address: managerAddress,
                abi: binaryLmsrMarketManagerAbi,
                functionName: "priceYes" as const,
                args: [marketIndex],
            },
            {
                address: managerAddress,
                abi: binaryLmsrMarketManagerAbi,
                functionName: "priceNo" as const,
                args: [marketIndex],
            },
            {
                address: managerAddress,
                abi: binaryLmsrMarketManagerAbi,
                functionName: "maxLoss" as const,
                args: [marketIndex],
            },
        ];
    }, [marketId, chainId]);

    const { data, refetch, isLoading } = useReadContracts({
        contracts,
        query: { enabled: contracts.length > 0 },
    });

    const result: MarketState | undefined = useMemo(() => {
        if (!data) return;

        const marketData = data[0]?.result as
            | {
                  collateralToken: Address;
                  protocol: Address;
                  question: string;
                  tradingDeadline: bigint;
                  b: bigint;
                  feeBps: bigint;
                  seeded: boolean;
                  outcome: number;
                  qYes: bigint;
                  qNo: bigint;
                  accruedFees: bigint;
                  accountedCollateral: bigint;
              }
            | undefined;

        if (!marketData) return;

        return {
            protocol: marketData.protocol,
            collateralToken: marketData.collateralToken,
            seeded: marketData.seeded,
            outcome: marketData.outcome,
            priceYes: data[1]?.result as bigint | undefined,
            priceNo: data[2]?.result as bigint | undefined,
            qYes: marketData.qYes,
            qNo: marketData.qNo,
            accruedFees: marketData.accruedFees,
            question: marketData.question,
            b: marketData.b,
            feeBps: marketData.feeBps,
            tradingDeadline: marketData.tradingDeadline,
            maxLoss: data[3]?.result as bigint | undefined,
            accountedCollateral: marketData.accountedCollateral,
        };
    }, [data]);

    return {
        data: result,
        refetch,
        isLoading,
    };
}
