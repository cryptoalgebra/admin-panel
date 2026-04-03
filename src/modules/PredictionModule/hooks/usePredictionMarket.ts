import { useSingleMarketQuery } from "@/graphql/generated/graphql";
import { useClients } from "@/hooks/graphql/useClients";
import { PredictionMarket } from "../types";

export function usePredictionMarket(marketAddress: string | undefined) {
    const { predictionClient } = useClients();

    const { data: gqlData, loading, error, refetch } = useSingleMarketQuery({
        variables: { marketId: marketAddress!.toLowerCase() },
        client: predictionClient,
        skip: !marketAddress,
    });

    return { market: gqlData?.market as PredictionMarket | null | undefined, loading, error, refetch };
}
