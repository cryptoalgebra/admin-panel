import PageContainer from "@/components/common/PageContainer";
import GaugeDetails from "@/components/gauge/GaugeDetails";
import { GaugeRewards } from "@/components/gauge/GaugeRewards";
import { useVoterGaugeToPool } from "@/generated";
import { useVotingPool } from "@/hooks/gauges/useVotingPool";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Address } from "wagmi";

const GaugePage = () => {
    const { gauge } = useParams<{ gauge: Address }>();

    const { data: poolAddress } = useVoterGaugeToPool({
        args: [gauge!],
        enabled: !!gauge,
    });

    const { data: votingPool, refetch } = useVotingPool(poolAddress as Address);

    const { token0, token1 } = votingPool || {};

    return (
        <PageContainer>
            <Link to={"/gauges"} className="flex items-center gap-2 mb-4 hover:text-black/70">
                <ArrowLeft size={16} />
                <span>Back</span>
            </Link>
            <div className="mb-8">
                {token0 && token1 && <div className="font-bold text-2xl">{`Gauge for ${token0.symbol} / ${token1.symbol} pool`}</div>}
            </div>
            {votingPool ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                    <GaugeDetails votingPool={votingPool} />
                    <GaugeRewards votingPool={votingPool} refetch={refetch} />
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </PageContainer>
    );
};

export default GaugePage;
