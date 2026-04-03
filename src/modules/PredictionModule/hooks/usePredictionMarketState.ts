import { predictionMarketABI } from "config/abis/prediction/market";
import { useMemo } from "react";
import { Address } from "viem";
import { useReadContracts } from "wagmi";

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
}

export function usePredictionMarketState(marketAddress: Address | undefined) {
    const contracts = useMemo(() => {
        if (!marketAddress) return [];

        const functionNames = [
            "protocol",
            "collateralToken",
            "seeded",
            "outcome",
            "priceYes",
            "priceNo",
            "qYes",
            "qNo",
            "accruedFees",
            "question",
            "b",
            "feeBps",
            "tradingDeadline",
            "maxLoss",
        ];

        return functionNames.map((functionName) => ({
            address: marketAddress,
            abi: predictionMarketABI,
            functionName,
        }));
    }, [marketAddress]);

    const { data, refetch, isLoading } = useReadContracts({
        contracts,
        query: { enabled: !!marketAddress },
    });

    const result: MarketState | undefined = useMemo(() => {
        if (!data) return;

        return {
            protocol: data[0]?.result as Address | undefined,
            collateralToken: data[1]?.result as Address | undefined,
            seeded: data[2]?.result as boolean | undefined,
            outcome: data[3]?.result as number | undefined,
            priceYes: data[4]?.result as bigint | undefined,
            priceNo: data[5]?.result as bigint | undefined,
            qYes: data[6]?.result as bigint | undefined,
            qNo: data[7]?.result as bigint | undefined,
            accruedFees: data[8]?.result as bigint | undefined,
            question: data[9]?.result as string | undefined,
            b: data[10]?.result as bigint | undefined,
            feeBps: data[11]?.result as bigint | undefined,
            tradingDeadline: data[12]?.result as bigint | undefined,
            maxLoss: data[13]?.result as bigint | undefined,
        };
    }, [data]);

    return {
        data: result,
        refetch,
        isLoading,
    };
}
