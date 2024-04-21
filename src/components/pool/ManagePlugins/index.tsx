import DataWithCopyButton from '@/components/common/DataWithCopyButton';
import Loader from '@/components/common/Loader';
import SetPluginAddressModal from '@/components/modals/pool/ChangePluginAddressModal';
import ManagePluginConfigModal from '@/components/modals/pool/ManagePluginConfigModal';
import { Switch } from '@/components/ui/switch';
import { ALGEBRA_STUB_PLUGIN } from '@/constants/addresses';
import {
    useAlgebraBasePluginDefaultPluginConfig,
    useAlgebraPoolPlugin,
    usePrepareAlgebraPoolSetPluginConfig,
} from '@/generated';
import { useTransitionAwait } from '@/hooks/common/useTransactionAwait';
import { usePluginConfig } from '@/hooks/pools/usePluginConfig';
import { usePluginFlags } from '@/hooks/pools/usePluginFlags';
import { PluginFlags } from '@/types/pool-plugin-flags';
import { useEffect, useState } from 'react';
import { Address, useContractWrite } from 'wagmi';
interface IManagePlugins {
    poolId: Address;
}

const ManagePlugins = ({ poolId }: IManagePlugins) => {
    const pluginFlags = usePluginFlags(poolId);
    const [flags, setFlags] = useState<PluginFlags | null>(null);
    const pluginConfig = usePluginConfig(flags);

    const { data: pluginId } = useAlgebraPoolPlugin({
        address: poolId,
    });

    const isToActivate = pluginId === ALGEBRA_STUB_PLUGIN;

    const isSwapDisabled =
        flags?.AFTER_SWAP_FLAG === 1 || flags?.BEFORE_SWAP_FLAG === 1;

    const isMintBurnDisabled = flags?.BEFORE_POSITION_MODIFY_FLAG === 1;

    const isFlashesDisabled =
        flags?.AFTER_FLASH_FLAG === 1 || flags?.BEFORE_FLASH_FLAG === 1;

    const { data: defaultPluginConfig } =
        useAlgebraBasePluginDefaultPluginConfig({
            address: pluginId,
        });

    const { config: preparedPluginConfig } =
        usePrepareAlgebraPoolSetPluginConfig({
            address: poolId,
            args: [pluginConfig],
        });

    const { data: setPluginConfigHash, write } =
        useContractWrite(preparedPluginConfig);

    const { isLoading } = useTransitionAwait(
        setPluginConfigHash?.hash,
        'Set Plugin'
    );

    useEffect(() => {
        setFlags(pluginFlags);
    }, [pluginFlags]);

    const handleCheckFlag = (flag: keyof PluginFlags) => {
        if (!flags) return;
        setFlags((prev) => {
            if (!prev) return null;
            const updatedFlags = { ...prev };

            if (flag === 'DYNAMIC_FEE_FLAG') {
                updatedFlags.DYNAMIC_FEE_FLAG = prev.DYNAMIC_FEE_FLAG ? 0 : 1;
                updatedFlags.BEFORE_SWAP_FLAG = prev.DYNAMIC_FEE_FLAG ? 0 : 1;
            } else {
                updatedFlags[flag] = prev[flag] ? 0 : 1;
            }

            return updatedFlags;
        });
    };

    const handleConfirm = () => {
        if (isLoading) return;
        write?.();
    };

    return (
        <div className="flex flex-col gap-4 text-left p-4 border rounded-xl">
            <div className="font-bold">Manage Plugins</div>
            {pluginId && flags ? (
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="font-semibold text-sm">
                            Current Plugin address
                        </p>
                        <DataWithCopyButton data={pluginId} />
                    </div>
                    <div className="flex justify-between ">
                        <div>
                            <p className="font-semibold text-sm">
                                Pool Plugin Config (uint8)
                            </p>
                            <p>{pluginConfig}</p>
                        </div>
                        {defaultPluginConfig ? (
                            <div>
                                <p className="font-semibold text-sm">
                                    Default Plugin Config (uint8)
                                </p>
                                <p>{defaultPluginConfig}</p>
                            </div>
                        ) : null}
                    </div>
                    <hr />
                    {!isToActivate ? (
                        <>
                            <div className="flex items-center justify-between">
                                <label htmlFor="farmingsPlugin">
                                    <p className="font-semibold text-sm">
                                        On-chain farmings Setup
                                    </p>
                                    <p>
                                        AFTER_SWAP_FLAG ={' '}
                                        {flags.AFTER_SWAP_FLAG}
                                    </p>
                                </label>
                                <Switch
                                    id="farmingsPlugin"
                                    checked={Boolean(flags.AFTER_SWAP_FLAG)}
                                    onCheckedChange={() =>
                                        handleCheckFlag('AFTER_SWAP_FLAG')
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="oraclePlugin">
                                    <p className="font-semibold text-sm">
                                        TWAP Oracle Setup
                                    </p>
                                    <p>
                                        BEFORE_SWAP_FLAG ={' '}
                                        {flags.BEFORE_SWAP_FLAG}
                                    </p>
                                </label>
                                <Switch
                                    id="oraclePlugin"
                                    checked={Boolean(flags.BEFORE_SWAP_FLAG)}
                                    onCheckedChange={() =>
                                        handleCheckFlag('BEFORE_SWAP_FLAG')
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="dynamicFeePlugin">
                                    <p className="font-semibold text-sm">
                                        Dynamic Fees Setup
                                    </p>
                                    <p>
                                        BEFORE_SWAP_FLAG ={' '}
                                        {flags.BEFORE_SWAP_FLAG}
                                    </p>
                                    <p>
                                        DYNAMIC_FEE = {flags.DYNAMIC_FEE_FLAG}
                                    </p>
                                </label>
                                <Switch
                                    id="dynamicFeePlugin"
                                    checked={Boolean(
                                        flags.DYNAMIC_FEE_FLAG &&
                                            flags.BEFORE_SWAP_FLAG
                                    )}
                                    onCheckedChange={() => {
                                        handleCheckFlag('DYNAMIC_FEE_FLAG');
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <p className="font-semibold text-sm">
                                    Swap status
                                </p>
                                {isSwapDisabled ? (
                                    <p className="text-red-600">Disabled</p>
                                ) : (
                                    <p className="text-green-600">Enabled</p>
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-sm">
                                    Mint / Burn status
                                </p>
                                {isMintBurnDisabled ? (
                                    <p className="text-red-600">Disabled</p>
                                ) : (
                                    <p className="text-green-600">Enabled</p>
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-sm">
                                    Flash status
                                </p>
                                {isFlashesDisabled ? (
                                    <p className="text-red-600">Disabled</p>
                                ) : (
                                    <p className="text-green-600">Enabled</p>
                                )}
                            </div>
                        </>
                    )}
                    <button
                        disabled={isLoading}
                        onClick={handleConfirm}
                        className="flex items-center justify-center py-2 px-4 w-full mt-auto bg-blue-500 text-white font-bold rounded-xl disabled:bg-blue-400 hover:bg-blue-400"
                    >
                        {isLoading ? <Loader /> : 'Confirm'}
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {flags && pluginId && pluginConfig !== undefined && (
                <ManagePluginConfigModal
                    pluginConfig={pluginConfig}
                    onChange={handleCheckFlag}
                    onConfirm={handleConfirm}
                    isLoading={isLoading}
                    title="Custom Hooks Settings"
                    flags={flags}
                >
                    <button className="py-2 px-4 w-full mt-auto border border-blue-500 text-blue-500 bg-white font-bold rounded-xl hover:bg-blue-500 hover:text-white">
                        Manage Plugin Config
                    </button>
                </ManagePluginConfigModal>
            )}
            {pluginId && (
                <SetPluginAddressModal
                    poolId={poolId}
                    title="Set Plugin Address"
                >
                    <button className="py-2 px-4 w-full mt-auto border border-blue-500 text-blue-500 bg-white font-bold rounded-xl hover:bg-blue-500 hover:text-white">
                        Change Plugin Address
                    </button>
                </SetPluginAddressModal>
            )}
        </div>
    );
};

export default ManagePlugins;
