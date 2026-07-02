import PageContainer from "@/components/common/PageContainer";
import Ve33Module from "@/modules/Ve33Module";
import { useReadVoterGaugeToPool } from "@/generated";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Address } from "viem";

const { GaugeDetails, GaugeRewards } = Ve33Module.components;
const { useVotingPool } = Ve33Module.hooks;

const GaugePage = () => {
    const { gauge } = useParams<{ gauge: Address }>();

    const { data: poolAddress } = useReadVoterGaugeToPool({
        args: gauge ? [gauge] : undefined,
    });

    const { data: votingPool, refetch } = useVotingPool(poolAddress as Address);

    const { token0, token1 } = votingPool || {};

    return (
        <PageContainer>
            <Link to={"/gauges"} className="flex items-center gap-2 mb-6 text-text/70 hover:text-text transition-colors">
                <ArrowLeft size={16} />
                <span>Back to Gauges</span>
            </Link>
            <div className="mb-8">
                {token0 && token1 && <h1 className="font-semibold text-2xl text-text">{`${token0.symbol} / ${token1.symbol}`}</h1>}
                <p className="text-sm text-text/50 mt-1">Gauge Management</p>
            </div>
            {votingPool ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                    <GaugeDetails votingPool={votingPool} />
                    <GaugeRewards votingPool={votingPool} refetch={refetch} />
                </div>
            ) : (
                <div className="flex items-center justify-center py-16">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-6 h-6 border-2 border-border border-t-text rounded-full animate-spin" />
                        <span className="text-sm text-text/50">Loading gauge data...</span>
                    </div>
                </div>
            )}
        </PageContainer>
    );
};

export default GaugePage;
