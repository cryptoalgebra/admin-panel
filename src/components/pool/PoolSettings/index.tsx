import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import ManagePoolSettingsModal from "@/components/modals/pool/ManagePoolSettingsModal";
import { ALGEBRA_STUB_PLUGIN, PLUGIN_FACTORY } from "@/constants/addresses";
import { pluginFactoryABI, useAlgebraPoolPlugin } from "@/generated";
import { usePool } from "@/hooks/pools/usePool";
import { Address, useContractRead } from "wagmi";
import PoolActivationModal from "@/components/modals/pool/PoolActivationModal";
import { ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk";

interface IPoolSettings {
    poolId: Address;
    deployer: Address;
}

const PoolSettings = ({ poolId, deployer }: IPoolSettings) => {
    const { data: pluginId } = useAlgebraPoolPlugin({
        address: poolId,
    });

    const { data: basePluginId } = useContractRead({
        address: PLUGIN_FACTORY,
        abi: pluginFactoryABI,
        functionName: "pluginByPool",
        args: [poolId],
    });

    const isToActivate = pluginId === ALGEBRA_STUB_PLUGIN;

    const [, pool] = usePool(poolId);

    return (
        <div className="flex flex-col gap-4 text-left p-6 bg-white border border-neutral-200 rounded-lg">
            <div className="font-semibold text-lg mb-2">Pool Settings</div>
            <div>
                <p className="text-xs text-neutral-500 mb-1">Pool address</p>
                <DataWithCopyButton data={poolId} />
            </div>
            <div>
                <p className="text-xs text-neutral-500 mb-1">Base plugin address</p>
                <DataWithCopyButton data={basePluginId || ""} />
            </div>
            <div>
                <p className="text-xs text-neutral-500 mb-1">Stub plugin address</p>
                <DataWithCopyButton data={ALGEBRA_STUB_PLUGIN} />
            </div>
            <div className="flex gap-2 mt-auto">
                <ManagePoolSettingsModal poolId={poolId} functionName="setCommunityFee" title="Community Fee">
                    <button className="py-2 px-4 w-1/2 text-black border border-neutral-200 text-sm rounded-lg hover:bg-neutral-100 transition-colors">
                        Community Fee
                    </button>
                </ManagePoolSettingsModal>
                {deployer === ADDRESS_ZERO && (
                    <ManagePoolSettingsModal poolId={poolId} functionName="setFee" title="Fee" isAdaptiveFee>
                        <button className="py-2 px-4 w-1/2 text-black border border-neutral-200 text-sm rounded-lg hover:bg-neutral-100 transition-colors">
                            Fee
                        </button>
                    </ManagePoolSettingsModal>
                )}
                <ManagePoolSettingsModal poolId={poolId} functionName="setTickSpacing" title="Tick Spacing">
                    <button className="py-2 px-4 w-1/2 text-black border border-neutral-200 text-sm rounded-lg hover:bg-neutral-100 transition-colors">
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
                    <button className="flex justify-center w-full py-2 px-4 border border-green-500 text-green-600 font-medium text-sm rounded-lg hover:bg-green-600 hover:text-white transition-colors">
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
                    <button className="flex justify-center w-full py-2 px-4 border border-red-200 text-red-500 font-medium text-sm rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                        Deactivate Pool
                    </button>
                </PoolActivationModal>
            )}
        </div>
    );
};

export default PoolSettings;
