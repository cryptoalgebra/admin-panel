import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import ManagePoolSettingsModal from "@/components/modals/pool/ManagePoolSettingsModal";
import PoolSecurityModal from "@/components/modals/pool/PoolSecurityModal";
import { Button } from "@/components/ui/button";
import { PLUGIN_FACTORY } from "config/contract-addresses";
import { DEFAULT_CHAIN_ID } from "config/default-chain";
import { usePool } from "@/hooks/pools/usePool";
import { Address } from "viem";
import { useReadContract } from "wagmi";
import { pluginFactoryABI } from "config/abis";
import { Lock, Settings } from "lucide-react";

interface IPoolSettings {
    poolId: Address;
}

const PoolSettings = ({ poolId }: IPoolSettings) => {
    const { data: basePluginId } = useReadContract({
        address: PLUGIN_FACTORY[DEFAULT_CHAIN_ID],
        abi: pluginFactoryABI,
        functionName: "pluginByPool",
        args: [poolId],
    });

    const [, pool] = usePool(poolId);

    return (
        <div className="flex flex-col text-left p-6 bg-card border border-border rounded-lg transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-bg-200 rounded-xl">
                    <Settings size={18} className="text-text" />
                </div>
                <h3 className="font-semibold text-lg text-text">Pool Settings</h3>
            </div>

            <div className="flex flex-col gap-5 flex-1">
                {/* Addresses */}
                <div>
                    <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Pool Address</p>
                    <DataWithCopyButton data={poolId} />
                </div>
                <div>
                    <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Base Plugin</p>
                    <DataWithCopyButton data={basePluginId || ""} />
                </div>

                <div className="h-px bg-border" />

                {/* Settings Buttons */}
                <div>
                    <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-3">Quick Actions</p>
                    <div className="flex gap-2">
                        <ManagePoolSettingsModal poolId={poolId} functionName="setCommunityFee" title="Community Fee">
                            <Button variant="outline" className="flex-1">
                                Community Fee
                            </Button>
                        </ManagePoolSettingsModal>
                        {/* <ManageFeeModal poolId={poolId}>
                            <Button variant="outline" className="flex-1">
                                Fee
                            </Button>
                        </ManageFeeModal> */}
                        <ManagePoolSettingsModal poolId={poolId} functionName="setTickSpacing" title="Tick Spacing">
                            <Button variant="outline" className="flex-1">
                                Tick Spacing
                            </Button>
                        </ManagePoolSettingsModal>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
                <PoolSecurityModal poolId={poolId} title={`Pool Security: ${pool?.token0.symbol} / ${pool?.token1.symbol}`}>
                    <Button variant="destructive" className="w-full">
                        <Lock size={12} /> Manage Pool Security
                    </Button>
                </PoolSecurityModal>
            </div>
        </div>
    );
};

export default PoolSettings;
