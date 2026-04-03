import { useAllMarketsListQuery } from "@/graphql/generated/graphql";
import { useClients } from "@/hooks/graphql/useClients";
import { useMemo } from "react";
import { MarketStatus, PredictionMarket } from "../types";
import { getMarketStatus } from "../utils";

const STATUS_ORDER: Record<MarketStatus, number> = {
    [MarketStatus.Active]: 0,
    [MarketStatus.TradingClosed]: 1,
    [MarketStatus.Resolved]: 2,
};

export function useAllPredictionMarkets() {
    const { predictionClient } = useClients();

    const { data, loading, error, refetch } = useAllMarketsListQuery({
        client: predictionClient,
        pollInterval: 60_000,
    });

    const markets: PredictionMarket[] = useMemo(() => {
        if (!data?.markets) return [];
        return (data.markets as PredictionMarket[])
            .slice()
            .sort((a, b) => Number(a.tradingDeadline) - Number(b.tradingDeadline))
            .sort((a, b) => {
                const sa = STATUS_ORDER[getMarketStatus(a)] ?? 99;
                const sb = STATUS_ORDER[getMarketStatus(b)] ?? 99;
                return sa - sb;
            });
    }, [data]);

    return { markets, loading, error, refetch };
}
