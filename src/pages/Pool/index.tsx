import PageContainer from '@/components/common/PageContainer';
import ManagePlugins from '@/components/pool/ManagePlugins';
import PoolDetails from '@/components/pool/PoolDetails';
import PoolSettings from '@/components/pool/PoolSettings';
import TokenDetails from '@/components/pool/TokensDetails';
import { useSinglePoolQuery } from '@/graphql/generated/graphql';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Address } from 'wagmi';

const PoolPage = () => {
    const { pool: poolId } = useParams() as { pool: Address };

    const { data: pool } = useSinglePoolQuery({
        variables: {
            poolId,
        },
    });

    return (
        <PageContainer>
            <Link
                to={'/pools'}
                className="flex items-center gap-2 mb-4 hover:text-black/70"
            >
                <ArrowLeft size={16} />
                <span>Back</span>
            </Link>
            {pool?.pool ? (
                <>
                    <div className="mb-8">
                        <div className="font-bold text-2xl">
                            {`Pool ${pool?.pool?.token0.symbol} / ${pool?.pool?.token1.symbol}`}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                        <PoolDetails poolId={poolId} pool={pool.pool} />
                        <ManagePlugins poolId={poolId} />
                        <TokenDetails poolId={poolId} name="Tokens" />
                        <PoolSettings poolId={poolId} />
                    </div>
                </>
            ) : (
                'Loading...'
            )}
        </PageContainer>
    );
};

export default PoolPage;
