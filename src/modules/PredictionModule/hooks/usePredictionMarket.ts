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

    const market = gqlData?.market
        ? ({
              index: BigInt(gqlData.market.id.split("-")[1]),
              ...gqlData.market,
          } as PredictionMarket)
        : undefined;

    return { market, loading, error, refetch };
}
