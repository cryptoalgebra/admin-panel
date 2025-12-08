import { useAllPoolsQuery } from "@/graphql/generated/graphql";
import { FormattedPool } from "@/types/pool";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Address } from "viem";
import { ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk";

const deployers: { [key: string]: string } = {
    "0x7e3387e0595552e992ede4476417704703866e5a": "HAVE PLUGIN",
    "0xbb75acad36f08201a49a6dd077229d95f4e7bd50": "NO PLUGIN",
    [ADDRESS_ZERO]: "BASE",
};

const PoolHeader = () => (
    <div className="hidden md:grid grid-cols-6 text-sm text-black font-semibold px-4 py-3 bg-neutral-200 border-b border-neutral-100">
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
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-0 w-full text-left px-4 py-4 bg-white border-b border-neutral-200 hover:bg-neutral-50 transition-colors items-center">
            {pool.pair.token0 && pool.pair.token1 && (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-neutral-500 font-medium">Pool</div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{`${pool.pair.token0.symbol} / ${pool.pair.token1.symbol}`}</span>
                        <span className="bg-neutral-100 text-xs rounded px-2 py-0.5">{`${pool.fee}%`}</span>
                    </div>
                </div>
            )}
            {pool.deployer && (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-neutral-500 font-medium">Deployer</div>
                    <div className="text-sm">{deployers[pool.deployer]}</div>
                </div>
            )}
            {pool.tvlUSD ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-neutral-500 font-medium">TVL</div>
                    <div className="text-sm">{`$${pool.tvlUSD.toFixed(2)}`}</div>
                </div>
            ) : (
                <div className="text-sm">$0</div>
            )}
            {pool.volume24USD ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-neutral-500 font-medium">Volume 24H</div>
                    <div className="text-sm">{`$${pool.volume24USD.toFixed(2)}`}</div>
                </div>
            ) : (
                <div className="text-sm">$0</div>
            )}
            {pool.apr ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-neutral-500 font-medium">APR</div>
                    <div className="text-sm">{pool.apr}</div>
                </div>
            ) : (
                <div className="text-sm">0</div>
            )}

            <div className="text-right">
                <Link
                    to={`/pools/${pool.id}`}
                    className="inline-block px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors"
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
        <div className="w-full text-left bg-white border border-neutral-200 rounded-lg overflow-hidden">
            {loading ? (
                <div className="p-8 text-center text-neutral-500">Loading...</div>
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
