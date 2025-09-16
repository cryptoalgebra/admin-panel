import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import { VotingPool } from "@/types/gauge";
import { formatUnits } from "viem";

interface IGaugeDetails {
    votingPool: VotingPool;
}

const GaugeDetails = ({ votingPool }: IGaugeDetails) => {
    return (
        <div className="flex flex-col text-left p-4 border rounded-xl">
            <div className="font-bold mb-4">Gauge Details</div>
            <div className="flex flex-col gap-4">
                <div>
                    <p className="font-semibold text-sm">Gauge address</p>
                    <DataWithCopyButton data={votingPool.gauge} />
                </div>
                <div>
                    <p className="font-semibold text-sm">Pool address</p>
                    <DataWithCopyButton data={votingPool.pool} />
                </div>
                <div>
                    <p className="font-semibold text-sm">Vault address</p>
                    <DataWithCopyButton data={votingPool.vault} />
                </div>
                <div>
                    <p className="font-semibold text-sm">Votes Deposited</p>
                    <p>{formatUnits(votingPool.poolVotesDeposited, 18)} veALGB</p>
                </div>
                <div>
                    <p className="font-semibold text-sm">Total Incentives</p>
                    <p>${votingPool.rewardTokenList.reduce((acc, rewardToken) => acc + rewardToken.amountUsd, 0).toFixed(4)}</p>
                </div>
            </div>
        </div>
    );
};

export default GaugeDetails;
