import { infoClient } from "@/graphql/clients";
import { useNativePriceQuery } from "@/graphql/generated/graphql";

export function useNativePriceUSD() {
    const { data: bundles, loading: isLoading } = useNativePriceQuery({
        client: infoClient,
    });

    return {
        nativePriceUSD: Number(bundles?.bundles[0].maticPriceUSD || 0),
        isLoading,
    };
}
