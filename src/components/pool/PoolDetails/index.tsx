import { DataRow } from "@/components/common/DataRow";
import { SectionCard } from "@/components/common/SectionCard";
import { StatBox } from "@/components/common/StatBox";
import { PoolFieldsFragment } from "@/graphql/generated/graphql";
import { formatAmount } from "@/utils/common/formatAmount";
import { useBlockExplorerUrl } from "@/hooks/common/useBlockExplorerUrl";
import { Info } from "lucide-react";
import { Address } from "viem";

interface IPoolDetails {
    poolId: Address;
    pool: PoolFieldsFragment;
}

const PoolDetails = ({ pool, poolId }: IPoolDetails) => {
    const explorerBaseUrl = useBlockExplorerUrl();
    const fee = Number(pool.overrideFee !== "0" ? pool.overrideFee : pool.fee) / 10_000;

    return (
        <SectionCard title="Pool Details" icon={Info}>
            <div className="grid grid-cols-2 gap-3 pb-4">
                <StatBox label="TVL USD" value={`$${formatAmount(pool.totalValueLockedUSD)}`} />
                <StatBox label="Volume USD" value={`$${formatAmount(pool.volumeUSD)}`} />
                <StatBox label="Fee" value={`${fee}%`} />
                <StatBox label="Fees USD" value={`$${formatAmount(pool.feesUSD)}`} />
            </div>
            <div className="divide-y divide-border">
                <DataRow label="Pool Address" copyable={poolId} link={`${explorerBaseUrl}/address/${poolId}`} />
                <DataRow label="Deployer" copyable={pool.deployer} link={`${explorerBaseUrl}/address/${pool.deployer}`} />
                <DataRow label="Current Tick" value={pool.tick} />
                <DataRow label="Tick Spacing" value={pool.tickSpacing} />
            </div>
        </SectionCard>
    );
};

export default PoolDetails;
