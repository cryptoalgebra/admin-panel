import { FormattedPool } from "@/types/pool";
import { Link } from "react-router-dom";
import { useAllPoolsQuery } from "@/graphql/generated/graphql";
import { useMemo } from "react";
import { Address } from "viem";
import { customPoolDeployerTitleByAddress } from "config/custom-pool-deployer";
import { formatAmount } from "@/utils/common/formatAmount";

const PoolHeader = () => (
    <div className="hidden md:grid grid-cols-6 text-xs font-medium text-text/50 uppercase tracking-wider px-4 py-3 bg-bg-200 border-b border-border">
        <div>Pool</div>
        <div>Deployer</div>
        <div>TVL</div>
        <div>Volume 24H</div>
        <div>APR</div>
        <div></div>
    </div>
);

const PoolRow = (pool: FormattedPool) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-0 w-full text-left px-4 py-4 bg-card border-b border-border hover:bg-bg-200 transition-colors items-center">
            {pool.pair.token0 && pool.pair.token1 && (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Pool</div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-text">{`${pool.pair.token0.symbol} / ${pool.pair.token1.symbol}`}</span>
                        <span className="bg-bg-200 text-xs text-text/70 rounded px-2 py-0.5 border border-border">{`${pool.fee}%`}</span>
                    </div>
                </div>
            )}
            {pool.deployer && (
                <div className="flex w-full justify-between">
                    <div className="md:hidden text-xs text-text/50 font-medium">Deployer</div>
                    <div className="text-sm text-text">{customPoolDeployerTitleByAddress[pool.deployer as Address]}</div>
                </div>
            )}
            {pool.tvlUSD ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">TVL</div>
                    <div className="text-sm text-text">{`$${formatAmount(pool.tvlUSD)}`}</div>
                </div>
            ) : (
                <div className="text-sm text-text">$0</div>
            )}
            {pool.volume24USD ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Volume 24H</div>
                    <div className="text-sm text-text">{`$${formatAmount(pool.volume24USD)}`}</div>
                </div>
            ) : (
                <div className="text-sm text-text">$0</div>
            )}
            {pool.apr ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">APR</div>
                    <div className="text-sm text-text">{pool.apr}</div>
                </div>
            ) : (
                <div className="text-sm text-text">0</div>
            )}

            <div className="text-right">
                <Link
                    to={`/pools/${pool.id}`}
                    className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
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

        return pools.pools.map(({ id, token0, token1, fee, totalValueLockedUSD, volumeUSD, deployer }) => ({
            id: id as Address,
            pair: {
                token0,
                token1,
            },
            deployer,
            fee: Number(fee) / 10_000,
            tvlUSD: Number(totalValueLockedUSD),
            volume24USD: Number(volumeUSD),
            apr: 0,
        }));
    }, [pools]);

    return (
        <div className="w-full text-left bg-card border border-border rounded-lg overflow-hidden">
            {loading ? (
                <div className="flex items-center justify-center p-8">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-5 h-5 border-2 border-border border-t-text rounded-full animate-spin" />
                        <span className="text-sm text-text/50">Loading pools...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <PoolHeader />
                    <div>
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
