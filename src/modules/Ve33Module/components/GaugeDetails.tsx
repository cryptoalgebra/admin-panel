import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import { VotingPool } from "@/types/gauge";
import { formatUnits } from "viem";
import { Info } from "lucide-react";

interface IGaugeDetails {
    votingPool: VotingPool;
}

const GaugeDetails = ({ votingPool }: IGaugeDetails) => {
    return (
        <div className="flex flex-col text-left p-6 bg-card border border-border rounded-lg transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-bg-200 rounded-xl">
                    <Info size={18} className="text-text" />
                </div>
                <h3 className="font-semibold text-lg text-text">Gauge Details</h3>
            </div>

            <div className="flex flex-col gap-5">
                {/* Addresses */}
                <div>
                    <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Gauge Address</p>
                    <DataWithCopyButton data={votingPool.gauge} />
                </div>
                <div>
                    <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Pool Address</p>
                    <DataWithCopyButton data={votingPool.pool} />
                </div>
                <div>
                    <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Vault Address</p>
                    <DataWithCopyButton data={votingPool.vault} />
                </div>

                <div className="h-px bg-border" />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-bg-200 rounded-lg border border-border">
                        <p className="text-xs text-text/50 mb-0.5">Votes Deposited</p>
                        <p className="text-lg font-semibold text-text">{formatUnits(votingPool.poolVotesDeposited, 18)} veTOKEN</p>
                    </div>
                    <div className="p-3 bg-bg-200 rounded-lg border border-border">
                        <p className="text-xs text-text/50 mb-0.5">Total Incentives</p>
                        <p className="text-lg font-semibold text-text">
                            ${votingPool.rewardTokenList.reduce((acc, rewardToken) => acc + rewardToken.amountUsd, 0).toFixed(4)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GaugeDetails;
