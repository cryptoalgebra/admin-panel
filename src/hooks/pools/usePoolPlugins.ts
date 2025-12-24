import { useReadAlgebraPoolPlugin } from "@/generated";
import { usePluginActiveModulesQuery } from "@/graphql/generated/graphql";
import { useClients } from "../graphql/useClients";
import { useMemo } from "react";
import { Address } from "viem";

export const PLUGIN_KEYS = {
    DYNAMIC_FEE: "Dynamic Fee Plugin",
    FARMING_PROXY: "Farming Proxy Plugin",
    VOLATILITY_ORACLE: "Volatility Oracle Plugin",
    ALM: "ALM Plugin",
    LIMIT_ORDER: "Limit Order Plugin",
    SECURITY: "Security Plugin",
    FEE_DISCOUNT: "Fee Discount Plugin",
} as const;

type PoolPluginType = Record<keyof typeof PLUGIN_KEYS, boolean>;

export function usePoolPlugins(poolAddress: Address | undefined) {
    const { infoClient } = useClients();
    const { data: pluginId } = useReadAlgebraPoolPlugin({
        address: poolAddress,
    });
    const { data, loading } = usePluginActiveModulesQuery({
        variables: { pluginId: pluginId?.toLowerCase() || "" },
        client: infoClient,
    });

    const poolPlugins: PoolPluginType | undefined = useMemo(() => {
        const enabledPlugins = data?.plugin?.activeModules;
        if (!enabledPlugins || enabledPlugins.length === 0) return undefined;

        const result = enabledPlugins.map((module) => module.trim());

        return {
            DYNAMIC_FEE: result.includes(PLUGIN_KEYS.DYNAMIC_FEE),
            FARMING_PROXY: result.includes(PLUGIN_KEYS.FARMING_PROXY),
            VOLATILITY_ORACLE: result.includes(PLUGIN_KEYS.VOLATILITY_ORACLE),
            ALM: result.includes(PLUGIN_KEYS.ALM),
            LIMIT_ORDER: result.includes(PLUGIN_KEYS.LIMIT_ORDER),
            SECURITY: result.includes(PLUGIN_KEYS.SECURITY),
            FEE_DISCOUNT: result.includes(PLUGIN_KEYS.FEE_DISCOUNT),
        };
    }, [data]);

    return {
        data: poolPlugins,
        isLoading: loading,
    };
}
