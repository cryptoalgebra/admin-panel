import { useReadAlgebraPoolPlugin } from "@/generated";
import { usePluginActiveModulesQuery } from "@/graphql/generated/graphql";
import { useClients } from "../graphql/useClients";
import { useMemo } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";
import { slidingFeePluginAbi } from "config/abis";

export const PLUGIN_KEYS = {
    DYNAMIC_FEE: "Dynamic Fee Plugin",
    FARMING_PROXY: "Farming Proxy Plugin",
    VOLATILITY_ORACLE: "Volatility Oracle Plugin",
    ALM: "ALM Plugin",
    LIMIT_ORDER: "Limit Order Plugin",
    SECURITY: "Security Plugin",
    FEE_DISCOUNT: "Fee Discount Plugin",
} as const;

export type FeePluginType = "ADAPTIVE_FEE" | "SLIDING_FEE" | "STATIC_FEE";

type PoolPluginType = Record<keyof typeof PLUGIN_KEYS, boolean>;

export function usePoolPlugins(poolAddress: Address | undefined) {
    const { infoClient } = useClients();
    const { data: pluginAddress } = useReadAlgebraPoolPlugin({
        address: poolAddress,
    });
    const { data, loading } = usePluginActiveModulesQuery({
        variables: { pluginId: pluginAddress?.toLowerCase() || "" },
        client: infoClient,
    });

    // Try to read s_baseFee to detect if it's a SlidingFee plugin
    const { data: slidingBaseFee, isError: isSlidingFeeError } = useReadContract({
        address: pluginAddress,
        abi: slidingFeePluginAbi,
        functionName: "s_baseFee",
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

    // Determine fee plugin type based on active modules and contract calls
    const feePluginType: FeePluginType = useMemo(() => {
        // If we successfully read s_baseFee, it's a SlidingFee plugin
        if (slidingBaseFee !== undefined && !isSlidingFeeError) {
            return "SLIDING_FEE";
        }

        // If Dynamic Fee is enabled, it's AdaptiveFee (AlgebraBasePluginV1)
        if (poolPlugins?.DYNAMIC_FEE) {
            return "ADAPTIVE_FEE";
        }

        // Default to static fee (no dynamic fee plugin)
        return "STATIC_FEE";
    }, [poolPlugins, slidingBaseFee, isSlidingFeeError]);

    return {
        data: poolPlugins,
        pluginAddress,
        feePluginType,
        isLoading: loading,
    };
}
