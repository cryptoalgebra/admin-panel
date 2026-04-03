import { DataRow } from "@/components/common/DataRow";
import { SectionCard } from "@/components/common/SectionCard";
import { StatBox } from "@/components/common/StatBox";
import { useBlockExplorerUrl } from "@/hooks/common/useBlockExplorerUrl";
import { VotingPool } from "@/types/gauge";
import { formatUnits } from "viem";
import { Info } from "lucide-react";

interface IGaugeDetails {
    votingPool: VotingPool;
}

const GaugeDetails = ({ votingPool }: IGaugeDetails) => {
    const explorerBaseUrl = useBlockExplorerUrl();

    const totalIncentives = votingPool.rewardTokenList.reduce((acc, rewardToken) => acc + rewardToken.amountUsd, 0);

    return (
        <SectionCard title="Gauge Details" icon={Info}>
            <div className="grid grid-cols-2 gap-3 pb-4">
                <StatBox label="Votes Deposited" value={`${formatUnits(votingPool.poolVotesDeposited, 18)} veTOKEN`} />
                <StatBox label="Total Incentives" value={`$${totalIncentives.toFixed(4)}`} />
            </div>
            <div className="divide-y divide-border">
                <DataRow label="Gauge Address" copyable={votingPool.gauge} link={`${explorerBaseUrl}/address/${votingPool.gauge}`} />
                <DataRow label="Pool Address" copyable={votingPool.pool} link={`${explorerBaseUrl}/address/${votingPool.pool}`} />
                <DataRow label="Vault Address" copyable={votingPool.vault} link={`${explorerBaseUrl}/address/${votingPool.vault}`} />
            </div>
        </SectionCard>
    );
};

export default GaugeDetails;
