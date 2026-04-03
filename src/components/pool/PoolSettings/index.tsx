import { DataRow } from "@/components/common/DataRow";
import { SectionCard } from "@/components/common/SectionCard";
import ManagePoolSettingsModal from "@/components/modals/pool/ManagePoolSettingsModal";
import ManageFeeModal from "@/components/modals/pool/ManageFeeModal";
import PoolSecurityModal from "@/components/modals/pool/PoolSecurityModal";
import { Button } from "@/components/ui/button";
import { PLUGIN_FACTORY } from "config/contract-addresses";
import { DEFAULT_CHAIN_ID } from "config/default-chain";
import { usePool } from "@/hooks/pools/usePool";
import { useBlockExplorerUrl } from "@/hooks/common/useBlockExplorerUrl";
import { Address } from "viem";
import { useReadContract } from "wagmi";
import { pluginFactoryABI } from "config/abis";
import { Lock, Settings } from "lucide-react";

interface IPoolSettings {
    poolId: Address;
}

const PoolSettings = ({ poolId }: IPoolSettings) => {
    const explorerBaseUrl = useBlockExplorerUrl();

    const { data: basePluginId } = useReadContract({
        address: PLUGIN_FACTORY[DEFAULT_CHAIN_ID],
        abi: pluginFactoryABI,
        functionName: "pluginByPool",
        args: [poolId],
    });

    const [, pool] = usePool(poolId);

    return (
        <SectionCard title="Pool Settings" icon={Settings}>
            <div className="divide-y divide-border pb-4">
                <DataRow label="Pool Address" copyable={poolId} link={`${explorerBaseUrl}/address/${poolId}`} />
                <DataRow
                    label="Base Plugin"
                    copyable={basePluginId || ""}
                    link={basePluginId ? `${explorerBaseUrl}/address/${basePluginId}` : undefined}
                />
            </div>

            <div className="flex flex-col gap-3 mt-4">
                <div className="flex gap-2">
                    <ManagePoolSettingsModal poolId={poolId} functionName="setCommunityFee" title="Community Fee">
                        <Button variant="outline" className="flex-1">
                            Community Fee
                        </Button>
                    </ManagePoolSettingsModal>
                    <ManageFeeModal poolId={poolId}>
                        <Button variant="outline" className="flex-1">
                            Fee
                        </Button>
                    </ManageFeeModal>
                    <ManagePoolSettingsModal poolId={poolId} functionName="setTickSpacing" title="Tick Spacing">
                        <Button variant="outline" className="flex-1">
                            Tick Spacing
                        </Button>
                    </ManagePoolSettingsModal>
                </div>
            </div>

            <div className="mt-4 ">
                <PoolSecurityModal poolId={poolId} title={`Pool Security: ${pool?.token0.symbol} / ${pool?.token1.symbol}`}>
                    <Button variant="destructive" className="w-full">
                        <Lock size={12} /> Manage Pool Security
                    </Button>
                </PoolSecurityModal>
            </div>
        </SectionCard>
    );
};

export default PoolSettings;
