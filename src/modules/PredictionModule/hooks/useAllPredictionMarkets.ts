import { useAllMarketsListQuery } from "@/graphql/generated/graphql";
import { useClients } from "@/hooks/graphql/useClients";
import { useMemo } from "react";
import { PredictionMarket, MarketStatus } from "../types";
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
        return (data.markets as PredictionMarket[]).slice().sort((a, b) => {
            const sa = STATUS_ORDER[getMarketStatus(a) as MarketStatus] ?? 99;
            const sb = STATUS_ORDER[getMarketStatus(b) as MarketStatus] ?? 99;
            return sa - sb;
        });
    }, [data]);

    return { markets, loading, error, refetch };
}
