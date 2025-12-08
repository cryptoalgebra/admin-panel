import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import Loader from "@/components/common/Loader";
import SetPluginAddressModal from "@/components/modals/pool/ChangePluginAddressModal";
import ManagePluginConfigModal from "@/components/modals/pool/ManagePluginConfigModal";
import { Switch } from "@/components/ui/switch";
import { ALGEBRA_STUB_PLUGIN } from "config/contract-addresses";
import { DEFAULT_CHAIN_ID } from "config/default-chain";
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

    const { data: pluginId } = useReadAlgebraPoolPlugin({
        address: poolId,
    });

    const isToActivate = pluginId === ALGEBRA_STUB_PLUGIN[DEFAULT_CHAIN_ID];

    const isSwapDisabled = flags?.AFTER_SWAP_FLAG === 1 || flags?.BEFORE_SWAP_FLAG === 1;

    const isMintBurnDisabled = flags?.BEFORE_POSITION_MODIFY_FLAG === 1;

    const isFlashesDisabled = flags?.AFTER_FLASH_FLAG === 1 || flags?.BEFORE_FLASH_FLAG === 1;

    const { data: defaultPluginConfig } = useReadAlgebraBasePluginDefaultPluginConfig({
        address: pluginId,
    });

    const { data: setPluginConfigHash, writeContract } = useWriteContract();

    const { isLoading } = useTransactionAwait(setPluginConfigHash, "Set Plugin");

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
        if (isLoading || pluginConfig === undefined) return;
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
        <div className="flex flex-col gap-4 text-left p-6 bg-white border border-neutral-200 rounded-lg">
            <div className="font-semibold text-lg mb-2">Manage Plugins</div>
            {pluginId && flags ? (
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-xs text-neutral-500 mb-1">Current Plugin address</p>
                        <DataWithCopyButton data={pluginId} />
                    </div>
                    <div className="flex justify-between ">
                        <div>
                            <p className="text-xs text-neutral-500 mb-1">Pool Plugin Config (uint8)</p>
                            <div className="flex justify-between items-center">
                                <p className="text-sm">{pluginConfig}</p>
                                {defaultPluginConfig !== pluginConfig && (
                                    <button
                                        onClick={handleResetPluginConfig}
                                        className="flex items-center justify-center border border-neutral-200 px-3 py-1 text-xs rounded-lg hover:bg-neutral-100 transition-colors"
                                    >
                                        reset
                                    </button>
                                )}
                            </div>
                        </div>
                        {defaultPluginConfig ? (
                            <div>
                                <p className="text-xs text-neutral-500 mb-1">Default Plugin Config (uint8)</p>
                                <p className="text-sm">{defaultPluginConfig}</p>
                            </div>
                        ) : null}
                    </div>
                    <hr />
                    {!isToActivate ? (
                        <>
                            <div className="flex items-center justify-between">
                                <label htmlFor="farmingsPlugin">
                                    <p className="text-sm font-medium">On-chain farmings Setup</p>
                                    <p className="text-xs text-neutral-500">AFTER_SWAP_FLAG = {flags.AFTER_SWAP_FLAG}</p>
                                </label>
                                <Switch
                                    id="farmingsPlugin"
                                    checked={Boolean(flags.AFTER_SWAP_FLAG)}
                                    onCheckedChange={() => handleCheckFlag("AFTER_SWAP_FLAG")}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="oraclePlugin">
                                    <p className="text-sm font-medium">TWAP Oracle Setup</p>
                                    <p className="text-xs text-neutral-500">BEFORE_SWAP_FLAG = {flags.BEFORE_SWAP_FLAG}</p>
                                </label>
                                <Switch
                                    id="oraclePlugin"
                                    checked={Boolean(flags.BEFORE_SWAP_FLAG)}
                                    onCheckedChange={() => handleCheckFlag("BEFORE_SWAP_FLAG")}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="dynamicFeePlugin">
                                    <p className="text-sm font-medium">Dynamic Fees Setup</p>
                                    <p className="text-xs text-neutral-500">BEFORE_SWAP_FLAG = {flags.BEFORE_SWAP_FLAG}</p>
                                    <p className="text-xs text-neutral-500">DYNAMIC_FEE = {flags.DYNAMIC_FEE_FLAG}</p>
                                </label>
                                <Switch
                                    id="dynamicFeePlugin"
                                    checked={Boolean(flags.DYNAMIC_FEE_FLAG && flags.BEFORE_SWAP_FLAG)}
                                    onCheckedChange={() => {
                                        handleCheckFlag("DYNAMIC_FEE_FLAG");
                                    }}
                                />
                            </div>
                            <button
                                disabled={isLoading}
                                onClick={handleConfirm}
                                className="flex items-center justify-center py-2 px-4 w-full mt-auto text-sm bg-black text-white rounded-lg disabled:bg-neutral-400 hover:bg-neutral-800 transition-colors"
                            >
                                {isLoading ? <Loader /> : "Confirm"}
                            </button>
                        </>
                    ) : (
                        <>
                            <div>
                                <p className="text-xs text-neutral-500 mb-1">Swap status</p>
                                {isSwapDisabled ? (
                                    <p className="text-sm text-red-600">Disabled</p>
                                ) : (
                                    <p className="text-sm text-green-600">Enabled</p>
                                )}
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 mb-1">Mint / Burn status</p>
                                {isMintBurnDisabled ? (
                                    <p className="text-sm text-red-600">Disabled</p>
                                ) : (
                                    <p className="text-sm text-green-600">Enabled</p>
                                )}
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 mb-1">Flash status</p>
                                {isFlashesDisabled ? (
                                    <p className="text-sm text-red-600">Disabled</p>
                                ) : (
                                    <p className="text-sm text-green-600">Enabled</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <div className="flex flex-col gap-4 mt-auto">
                {flags && pluginId && pluginConfig !== undefined && (
                    <ManagePluginConfigModal
                        pluginConfig={pluginConfig}
                        onChange={handleCheckFlag}
                        onReset={handleResetPluginConfig}
                        onConfirm={handleConfirm}
                        isLoading={isLoading}
                        title="Custom Hooks Settings"
                        flags={flags}
                    >
                        <button className="py-2 px-4 w-full mt-auto text-sm border border-neutral-200 text-black bg-white rounded-lg hover:bg-neutral-100 transition-colors">
                            Manage Plugin Config
                        </button>
                    </ManagePluginConfigModal>
                )}
                {pluginId && (
                    <SetPluginAddressModal poolId={poolId} title="Set Plugin Address">
                        <button className="py-2 px-4 w-full mt-auto text-sm border border-neutral-200 text-black bg-white rounded-lg hover:bg-neutral-100 transition-colors">
                            Change Plugin Address
                        </button>
                    </SetPluginAddressModal>
                )}
            </div>
        </div>
    );
};

export default ManagePlugins;
