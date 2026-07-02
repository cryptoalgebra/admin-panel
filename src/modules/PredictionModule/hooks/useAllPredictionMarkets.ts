import { useClients } from "@/hooks/graphql/useClients";
import { useCallback, useMemo } from "react";
import { useAllOpenMarketsListQuery, useMarketsWithFeesListQuery } from "@/graphql/generated/graphql";
import { MarketStatus, PredictionMarket } from "../types";
import { getMarketStatus } from "../utils";

const STATUS_ORDER: Record<MarketStatus, number> = {
    [MarketStatus.Active]: 0,
    [MarketStatus.TradingClosed]: 1,
    [MarketStatus.Resolved]: 2,
};

export function useAllPredictionMarkets() {
    const { predictionClient } = useClients();
    const {
        data: openMarketsData,
        loading: openMarketsLoading,
        error: openMarketsError,
        refetch: refetchOpenMarkets,
    } = useAllOpenMarketsListQuery({
        client: predictionClient,
        pollInterval: 60_000,
    });

    const {
        data: marketsWithFeesData,
        loading: marketsWithFeesLoading,
        error: marketsWithFeesError,
        refetch: refetchMarketsWithFees,
    } = useMarketsWithFeesListQuery({
        client: predictionClient,
        pollInterval: 60_000,
    });

    const refetch = useCallback(async () => {
        await Promise.all([refetchOpenMarkets(), refetchMarketsWithFees()]);
    }, [refetchOpenMarkets, refetchMarketsWithFees]);

    const markets: PredictionMarket[] = useMemo(() => {
        const mergedMarkets = new Map<string, PredictionMarket>();

        for (const market of openMarketsData?.markets ?? []) {
            mergedMarkets.set(market.id, market as PredictionMarket);
        }

        for (const market of marketsWithFeesData?.markets ?? []) {
            mergedMarkets.set(market.id, market as PredictionMarket);
        }

        return Array.from(mergedMarkets.values())
            .slice()
            .sort((a, b) => Number(a.tradingDeadline) - Number(b.tradingDeadline))
            .sort((a, b) => {
                const sa = STATUS_ORDER[getMarketStatus(a)] ?? 99;
                const sb = STATUS_ORDER[getMarketStatus(b)] ?? 99;
                return sa - sb;
            })
            .map((market) => ({
                ...market,
                index: BigInt(market.id.split("-")[1]),
            }));
    }, [openMarketsData, marketsWithFeesData]);

    return {
        markets,
        loading: openMarketsLoading || marketsWithFeesLoading,
        error: openMarketsError || marketsWithFeesError,
        refetch,
    };
}
