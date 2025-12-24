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
import { Puzzle, RotateCcw, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface IManagePlugins {
    poolId: Address;
}

const ManagePlugins = ({ poolId }: IManagePlugins) => {
    const pluginFlags = usePluginFlags(poolId);
    const [flags, setFlags] = useState<PluginFlags>();

    const pluginConfig = useMemo(() => {
        if (!flags) return;
        return parsePluginFlags(flags);
    }, [flags]);

    const { data: pluginActiveModules } = usePoolPlugins(poolId);
    const activeModules = useMemo(() => {
        if (!pluginActiveModules) return;
        return Object.entries(pluginActiveModules);
    }, [pluginActiveModules]);

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
                updatedFlags.DYNAMIC_FEE_FLAG = prev.DYNAMIC_FEE_FLAG ? 0 : 1;
                updatedFlags.BEFORE_SWAP_FLAG = prev.DYNAMIC_FEE_FLAG ? 0 : 1;
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

            {pluginId && flags && activeModules ? (
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
                        {activeModules.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {activeModules.map(([key, value]) => (
                                    <span
                                        key={key}
                                        className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border",
                                            value
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                : "bg-red-50 text-red-700 border-red-200"
                                        )}
                                    >
                                        {value ? <Check size={12} /> : <X size={12} />}
                                        {PLUGIN_KEYS[key as keyof typeof PLUGIN_KEYS].split("Plugin")[0]}
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

                            {defaultPluginConfig !== pluginConfig && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleResetPluginConfig}
                                    className="flex items-center gap-1.5 h-auto py-1 px-2 text-xs text-text/50 hover:text-text"
                                >
                                    <RotateCcw size={12} />
                                    Reset
                                </Button>
                            )}
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
