import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import { Button } from "@/components/ui/button";
import SetPluginAddressModal from "@/components/modals/pool/ChangePluginAddressModal";
import ManagePluginConfigModal from "@/components/modals/pool/ManagePluginConfigModal";
import { useReadAlgebraBasePluginDefaultPluginConfig, useReadAlgebraPoolPlugin } from "@/generated";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { usePluginFlags } from "@/hooks/pools/usePluginFlags";
import { PluginFlags } from "@/types/pool-plugin-flags";
import { parsePluginConfig } from "@/utils/pool/parsePluginConfig";
import { parsePluginFlags } from "@/utils/pool/parsePluginFlags";
import { useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import { useWriteContract } from "wagmi";
import { algebraPoolABI } from "config/abis";
import { PLUGIN_KEYS, usePoolPlugins } from "@/hooks/pools/usePoolPlugins";
import { Puzzle, Check, AlertTriangle } from "lucide-react";
import { cn } from "@/utils/common/cn";
import type { PluginConfigModuleKey } from "@/components/modals/pool/ManagePluginConfigModal";

interface IManagePlugins {
    poolId: Address;
}

const MODULE_NAME_TO_KEY: Record<string, PluginConfigModuleKey> = {
    [PLUGIN_KEYS.DYNAMIC_FEE]: "DYNAMIC_FEE",
    [PLUGIN_KEYS.FARMING_PROXY]: "FARMING_PROXY",
    [PLUGIN_KEYS.VOLATILITY_ORACLE]: "VOLATILITY_ORACLE",
    [PLUGIN_KEYS.ALM]: "ALM",
    [PLUGIN_KEYS.LIMIT_ORDER]: "LIMIT_ORDER",
    [PLUGIN_KEYS.SECURITY]: "SECURITY",
};

const MODULE_ORDER: PluginConfigModuleKey[] = [
    "DYNAMIC_FEE",
    "FARMING_PROXY",
    "VOLATILITY_ORACLE",
    "ALM",
    "LIMIT_ORDER",
    "SECURITY",
];

type ModuleStatus = "ENABLED" | "DISABLED" | "PARTIAL";

interface ModuleDefinition {
    key: PluginConfigModuleKey;
    label: string;
    requiredFlags: Array<keyof PluginFlags>;
}

const MODULE_DEFINITIONS: ModuleDefinition[] = [
    { key: "DYNAMIC_FEE", label: "Dynamic Fee", requiredFlags: ["BEFORE_SWAP_FLAG", "DYNAMIC_FEE_FLAG"] },
    { key: "FARMING_PROXY", label: "Farming", requiredFlags: ["AFTER_SWAP_FLAG"] },
    { key: "VOLATILITY_ORACLE", label: "Volatility Oracle", requiredFlags: ["BEFORE_SWAP_FLAG"] },
    { key: "ALM", label: "ALM", requiredFlags: ["AFTER_SWAP_FLAG"] },
    { key: "LIMIT_ORDER", label: "Limit Order", requiredFlags: ["AFTER_SWAP_FLAG"] },
    { key: "SECURITY", label: "Security", requiredFlags: ["BEFORE_SWAP_FLAG", "BEFORE_POSITION_MODIFY_FLAG", "BEFORE_FLASH_FLAG"] },
];

const SECURITY_FLAG_EXPLANATIONS: Record<keyof PluginFlags, string> = {
    BEFORE_SWAP_FLAG: "swap protection",
    AFTER_SWAP_FLAG: "swap post-check",
    BEFORE_POSITION_MODIFY_FLAG: "position modify protection",
    AFTER_POSITION_MODIFY_FLAG: "position modify post-check",
    BEFORE_FLASH_FLAG: "flash protection",
    AFTER_FLASH_FLAG: "flash post-check",
    AFTER_INIT_FLAG: "initialization post-check",
    DYNAMIC_FEE_FLAG: "dynamic fee updates",
};

const FLAG_TO_HOOK_LABEL: Record<keyof PluginFlags, string> = {
    BEFORE_SWAP_FLAG: "beforeSwap",
    AFTER_SWAP_FLAG: "afterSwap",
    BEFORE_POSITION_MODIFY_FLAG: "beforePositionModify",
    AFTER_POSITION_MODIFY_FLAG: "afterPositionModify",
    BEFORE_FLASH_FLAG: "beforeFlash",
    AFTER_FLASH_FLAG: "afterFlash",
    AFTER_INIT_FLAG: "afterInit",
    DYNAMIC_FEE_FLAG: "dynamicFee",
};

const ManagePlugins = ({ poolId }: IManagePlugins) => {
    const pluginFlags = usePluginFlags(poolId);
    const [flags, setFlags] = useState<PluginFlags>();

    const pluginConfig = useMemo(() => {
        if (!flags) return;
        return parsePluginFlags(flags);
    }, [flags]);

    const { activeModuleNames } = usePoolPlugins(poolId);

    const activeModuleKeys = useMemo(() => {
        const moduleSet = new Set<PluginConfigModuleKey>();

        for (const moduleName of activeModuleNames) {
            const mappedModule = MODULE_NAME_TO_KEY[moduleName.trim()];
            if (mappedModule) {
                moduleSet.add(mappedModule);
            }
        }

        return MODULE_ORDER.filter((moduleKey) => moduleSet.has(moduleKey));
    }, [activeModuleNames]);

    const currentActiveModules = useMemo(() => {
        if (!flags) return [];

        return MODULE_DEFINITIONS.filter((moduleDefinition) => activeModuleKeys.includes(moduleDefinition.key))
            .map((moduleDefinition) => {
                const enabledFlags = moduleDefinition.requiredFlags.filter((flag) => Boolean(flags[flag]));
                let status: ModuleStatus = "DISABLED";
                let hoverExplanation: string | undefined;
                if (moduleDefinition.key === "DYNAMIC_FEE") {
                    const isBeforeSwapEnabled = Boolean(flags.BEFORE_SWAP_FLAG);
                    const isDynamicFeeEnabled = Boolean(flags.DYNAMIC_FEE_FLAG);

                    if (isBeforeSwapEnabled && isDynamicFeeEnabled) {
                        status = "ENABLED";
                    } else if (isBeforeSwapEnabled && !isDynamicFeeEnabled) {
                        status = "DISABLED";
                    } else if (!isBeforeSwapEnabled && isDynamicFeeEnabled) {
                        status = "PARTIAL";
                        hoverExplanation = "Enabled hooks: dynamicFee. Missing hooks: beforeSwap";
                    }
                } else if (moduleDefinition.key === "SECURITY") {
                    if (enabledFlags.length === 0) {
                        status = "DISABLED";
                    } else if (enabledFlags.length === moduleDefinition.requiredFlags.length) {
                        status = "ENABLED";
                    } else {
                        status = "PARTIAL";
                        hoverExplanation = `Enabled functionality: ${enabledFlags
                            .map((flag) => SECURITY_FLAG_EXPLANATIONS[flag])
                            .join(", ")}`;
                    }
                } else if (enabledFlags.length === moduleDefinition.requiredFlags.length) {
                    status = "ENABLED";
                } else if (enabledFlags.length > 0) {
                    status = "PARTIAL";
                    const missingFlags = moduleDefinition.requiredFlags.filter((flag) => !enabledFlags.includes(flag));
                    hoverExplanation = `Enabled hooks: ${enabledFlags
                        .map((flag) => FLAG_TO_HOOK_LABEL[flag])
                        .join(", ")}. Missing hooks: ${missingFlags.map((flag) => FLAG_TO_HOOK_LABEL[flag]).join(", ")}`;
                }

                return {
                    key: moduleDefinition.key,
                    label: moduleDefinition.label,
                    status,
                    hoverExplanation,
                };
            })
            .filter((moduleDefinition) => moduleDefinition.status !== "DISABLED");
    }, [activeModuleKeys, flags]);

    const { data: pluginId } = useReadAlgebraPoolPlugin({
        address: poolId,
    });

    const { data: defaultPluginConfig } = useReadAlgebraBasePluginDefaultPluginConfig({
        address: pluginId,
    });

    const { data: setPluginConfigHash, writeContract, isPending } = useWriteContract();

    const { isLoading } = useTransactionAwait(setPluginConfigHash, { title: "Set Plugin" });

    useEffect(() => {
        if (!pluginFlags) return;
        setFlags(pluginFlags);
    }, [pluginFlags]);

    const handleCheckFlag = (flag: keyof PluginFlags) => {
        if (!flags) return;
        setFlags((prev) => {
            if (!prev) return;
            const updatedFlags = { ...prev };

            if (flag === "DYNAMIC_FEE_FLAG") {
                const nextDynamicFeeFlag = prev.DYNAMIC_FEE_FLAG ? 0 : 1;
                updatedFlags.DYNAMIC_FEE_FLAG = nextDynamicFeeFlag;

                // Dynamic fee requires beforeSwap, so enabling dynamicFee also enables beforeSwap.
                if (nextDynamicFeeFlag === 1) {
                    updatedFlags.BEFORE_SWAP_FLAG = 1;
                }
            } else if (flag === "BEFORE_SWAP_FLAG") {
                const nextBeforeSwapFlag = prev.BEFORE_SWAP_FLAG ? 0 : 1;
                updatedFlags.BEFORE_SWAP_FLAG = nextBeforeSwapFlag;

                // If beforeSwap is turned off, dynamicFee must be turned off as well.
                if (nextBeforeSwapFlag === 0) {
                    updatedFlags.DYNAMIC_FEE_FLAG = 0;
                }
            } else {
                updatedFlags[flag] = prev[flag] ? 0 : 1;
            }

            return updatedFlags;
        });
    };

    const handleConfirm = () => {
        if (isLoading || isPending || pluginConfig === undefined) return;
        writeContract({
            address: poolId,
            abi: algebraPoolABI,
            functionName: "setPluginConfig",
            args: [pluginConfig],
        });
    };

    const handleResetPluginConfig = () => {
        if (defaultPluginConfig === undefined) return;
        setFlags(parsePluginConfig(defaultPluginConfig));
    };

    return (
        <div className="flex flex-col text-left p-6 bg-white border border-border rounded-lg transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-bg-200 rounded-xl">
                    <Puzzle size={18} className="text-text" />
                </div>
                <h3 className="font-semibold text-lg text-text">Plugin Management</h3>
            </div>

            {pluginId && flags ? (
                <div className="flex flex-col gap-5 flex-1">
                    {/* Plugin Address */}
                    <div>
                        <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Plugin Address</p>
                        <DataWithCopyButton data={pluginId} />
                    </div>

                    <div className="h-px bg-border" />

                    {/* Active Modules */}
                    <div>
                        <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-3">Active Modules</p>
                        {currentActiveModules.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {currentActiveModules.map((moduleItem) => (
                                    <span
                                        key={moduleItem.key}
                                        title={moduleItem.status === "PARTIAL" ? moduleItem.hoverExplanation : undefined}
                                        className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border",
                                            moduleItem.status === "ENABLED"
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                : "bg-amber-50 text-amber-700 border-amber-200"
                                        )}
                                    >
                                        {moduleItem.status === "ENABLED" ? <Check size={12} /> : <AlertTriangle size={12} />}
                                        {moduleItem.label}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-text/50">No active modules</p>
                        )}
                    </div>
                    <div className="h-px bg-border" />

                    {/* Plugin Config */}
                    <div className=" rounded-xl mb-4 space-y-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Plugin Configuration</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-bg-200 rounded-lg border border-neutral-200">
                                <p className="text-xs text-text/50 mb-0.5">Current</p>
                                <p className="text-lg font-semibold text-text">{pluginConfig}</p>
                            </div>
                            {defaultPluginConfig !== undefined && (
                                <div className="p-3 bg-bg-200 rounded-lg border border-neutral-200">
                                    <p className="text-xs text-text/50 mb-0.5">Default</p>
                                    <p className="text-lg font-semibold text-text">{defaultPluginConfig}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center py-8">
                    <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
                </div>
            )}

            <div className="flex flex-col gap-4 mt-auto">
                {flags && pluginId && pluginConfig !== undefined && (
                    <ManagePluginConfigModal
                        pluginConfig={pluginConfig}
                        onChange={handleCheckFlag}
                        onReset={handleResetPluginConfig}
                        onConfirm={handleConfirm}
                        isLoading={isLoading || isPending}
                        title="Custom Hooks Settings"
                        flags={flags}
                        activeModuleKeys={activeModuleKeys}
                    >
                        <Button variant="outline" className="w-full">
                            Manage Plugin Config
                        </Button>
                    </ManagePluginConfigModal>
                )}
                {pluginId && (
                    <SetPluginAddressModal poolId={poolId} title="Set Plugin Address">
                        <Button variant="outline" className="w-full">
                            Change Plugin Address
                        </Button>
                    </SetPluginAddressModal>
                )}
            </div>
        </div>
    );
};

export default ManagePlugins;
