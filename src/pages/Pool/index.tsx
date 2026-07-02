import PageContainer from "@/components/common/PageContainer";
import ManagePlugins from "@/components/pool/ManagePlugins";
import PoolDetails from "@/components/pool/PoolDetails";
import PoolSettings from "@/components/pool/PoolSettings";
import TokenDetails from "@/components/pool/TokensDetails";
import { useSinglePoolQuery } from "@/graphql/generated/graphql";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Address } from "viem";

const PoolPage = () => {
    const { pool: poolId } = useParams() as { pool: Address };

    const { data: pool } = useSinglePoolQuery({
        variables: {
            poolId,
        },
    });

    return (
        <PageContainer>
            <Link to={"/pools"} className="flex items-center gap-2 mb-6 text-text/70 hover:text-text transition-colors">
                <ArrowLeft size={16} />
                <span>Back to Pools</span>
            </Link>
            {pool?.pool ? (
                <>
                    <div className="mb-8">
                        <h1 className="font-semibold text-2xl text-text">
                            {`${pool?.pool?.token0.symbol} / ${pool?.pool?.token1.symbol}`}
                        </h1>
                        <p className="text-sm text-text/50 mt-1">Pool Management</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                        <PoolDetails poolId={poolId} pool={pool.pool} />
                        <ManagePlugins poolId={poolId} />
                        <TokenDetails poolId={poolId} name="Tokens" />
                        <PoolSettings poolId={poolId} />
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center py-32 mx-auto w-fit">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-6 h-6 border-2 border-border border-t-text rounded-full animate-spin" />
                        <span className="text-sm text-text/50">Loading pool data...</span>
                    </div>
                </div>
            )}
        </PageContainer>
    );
};

export default PoolPage;
