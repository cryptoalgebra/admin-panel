import { useAllPoolsQuery } from '@/graphql/generated/graphql';
import { FormattedPool } from '@/types/pool';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Address } from 'wagmi';

const PoolHeader = () => (
    <div className="hidden md:grid grid-cols-5 uppercase text-xs font-semibold text-gray-600 mb-4 pb-4 border-b border-gray-300">
        <div>Pool</div>
        <div>TVL</div>
        <div>Volume 24H</div>
        <div>APR</div>
        <div></div>
    </div>
);

const PoolRow = (pool: FormattedPool) => {
    return (
        <div className="grid grid-cols-5 gap-4 md:gap-0 md:grid-cols-5 w-full text-left p-4 bg-gray-50 border border-gray-300 rounded-xl">
            {pool.pair.token0 && pool.pair.token1 && (
                <div className="flex w-full justify-between">
                    <div className="md:hidden font-bold">Pool</div>
                    <div className="flex items-center gap-4">
                        <p>
                            {`${pool.pair.token0.symbol} / ${pool.pair.token1.symbol}`}
                        </p>
                        <div className="bg-blue-200 text-sm rounded-xl px-2 py-1">{`${pool.fee}%`}</div>
                    </div>
                </div>
            )}
            {pool.tvlUSD ? (
                <div className="flex w-full justify-between">
                    <div className="md:hidden font-bold">Pool</div>
                    <div>{`$${pool.tvlUSD.toFixed(2)}`}</div>
                </div>
            ) : (
                <div>$0</div>
            )}
            {pool.volume24USD ? (
                <div className="flex w-full justify-between">
                    <div className="md:hidden font-bold">Pool</div>
                    <div>{`$${pool.volume24USD.toFixed(2)}`}</div>
                </div>
            ) : (
                <div>$0</div>
            )}
            {pool.apr ? (
                <div className="flex w-full justify-between">
                    <div className="md:hidden font-bold">Pool</div>
                    <div>{pool.apr}</div>
                </div>
            ) : (
                <div>0</div>
            )}

            <div className="text-right">
                <Link
                    to={`/pools/${pool.id}`}
                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400"
                >
                    Manage →
                </Link>
            </div>
        </div>
    );
};

const PoolsList = () => {
    const { data: pools, loading } = useAllPoolsQuery();

    const formattedPools: FormattedPool[] = useMemo(() => {
        if (!pools?.pools) return [];

        return pools.pools.map(
            ({ id, token0, token1, fee, totalValueLockedUSD, volumeUSD }) => ({
                id: id as Address,
                pair: {
                    token0,
                    token1,
                },
                fee: Number(fee) / 10_000,
                tvlUSD: Number(totalValueLockedUSD),
                volume24USD: Number(volumeUSD),
                apr: 0,
            })
        );
    }, [pools]);

    return (
        <div className="w-full text-left">
            {loading ? (
                'Loading...'
            ) : (
                <div>
                    <PoolHeader />
                    <div className="grid grid-cols-1 gap-4">
                        {formattedPools.map((pool) => (
                            <PoolRow key={pool.id} {...pool} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PoolsList;
