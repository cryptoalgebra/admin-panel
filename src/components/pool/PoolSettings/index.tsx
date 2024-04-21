import DataWithCopyButton from '@/components/common/DataWithCopyButton';
import ManagePoolSettingsModal from '@/components/modals/pool/ManagePoolSettingsModal';
import { ALGEBRA_STUB_PLUGIN, PLUGIN_FACTORY } from '@/constants/addresses';
import { pluginFactoryABI, useAlgebraPoolPlugin } from '@/generated';
import { usePluginFlags } from '@/hooks/pools/usePluginFlags';
import { usePool } from '@/hooks/pools/usePool';
import { Address, useContractRead } from 'wagmi';
import PoolActivationModal from '@/components/modals/pool/PoolActivationModal';

interface IPoolSettings {
    poolId: Address;
}

const PoolSettings = ({ poolId }: IPoolSettings) => {
    const flags = usePluginFlags(poolId);

    const { data: pluginId } = useAlgebraPoolPlugin({
        address: poolId,
    });

    const { data: basePluginId } = useContractRead({
        address: PLUGIN_FACTORY,
        abi: pluginFactoryABI,
        functionName: 'pluginByPool',
        args: [poolId],
    });

    const isToActivate = pluginId === ALGEBRA_STUB_PLUGIN;

    const isDynamicFeeDisabled =
        flags?.DYNAMIC_FEE_FLAG === 1 && flags?.BEFORE_SWAP_FLAG === 1;

    const [, pool] = usePool(poolId);

    return (
        <div className="flex flex-col gap-4 text-left p-4 border rounded-xl">
            <div className="font-bold">Pool Settings</div>
            <div>
                <p className="font-semibold text-sm">Pool address</p>
                <DataWithCopyButton data={poolId} />
            </div>
            <div>
                <p className="font-semibold text-sm">Base plugin address</p>
                <DataWithCopyButton data={basePluginId || ''} />
            </div>
            <div>
                <p className="font-semibold text-sm">Stub plugin address</p>
                <DataWithCopyButton data={ALGEBRA_STUB_PLUGIN} />
            </div>
            <div className="flex gap-4 mt-auto">
                <ManagePoolSettingsModal
                    poolId={poolId}
                    functionName="setCommunityFee"
                    title="Community Fee"
                >
                    <button className="py-2 px-4 w-1/2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400">
                        Community Fee
                    </button>
                </ManagePoolSettingsModal>
                {isDynamicFeeDisabled ? (
                    <ManagePoolSettingsModal
                        poolId={poolId}
                        isDynamicFee={true}
                        title="Dynamic Fee"
                    >
                        <button className="py-2 px-4 w-1/2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400">
                            Dynamic Fee
                        </button>
                    </ManagePoolSettingsModal>
                ) : (
                    <ManagePoolSettingsModal
                        poolId={poolId}
                        functionName="setFee"
                        title="Fee"
                    >
                        <button className="py-2 px-4 w-1/2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400">
                            Fee
                        </button>
                    </ManagePoolSettingsModal>
                )}
                <ManagePoolSettingsModal
                    poolId={poolId}
                    functionName="setTickSpacing"
                    title="Tick Spacing"
                >
                    <button className="py-2 px-4 w-1/2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400">
                        Tick Spacing
                    </button>
                </ManagePoolSettingsModal>
            </div>
            {isToActivate && basePluginId ? (
                <PoolActivationModal
                    isToActivate={isToActivate}
                    pluginId={basePluginId}
                    poolId={poolId}
                    title={`Activate Pool ${pool?.token0.symbol} / ${pool?.token1.symbol}`}
                >
                    <button className="flex justify-center w-full py-2 px-4 border border-green-500 text-green-600 font-bold rounded-xl hover:bg-green-600 hover:text-white">
                        Activate Pool
                    </button>
                </PoolActivationModal>
            ) : (
                <PoolActivationModal
                    isToActivate={isToActivate}
                    pluginId={ALGEBRA_STUB_PLUGIN}
                    poolId={poolId}
                    title={`Deactivate Pool ${pool?.token0.symbol} / ${pool?.token1.symbol}`}
                >
                    <button className="flex justify-center w-full py-2 px-4 border border-red-200 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white">
                        Deactivate Pool
                    </button>
                </PoolActivationModal>
            )}
        </div>
    );
};

export default PoolSettings;
