import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import Loader from "@/components/common/Loader";
import { useSinglePoolQuery } from "@/graphql/generated/graphql";
import { formatCurrency } from "@/utils/common/formatCurrency";
import { Coins } from "lucide-react";
import { useMemo } from "react";

interface IFarmPoolDetails {
    name: string;
    id: string;
}

const FarmPoolDetails = ({ name, id }: IFarmPoolDetails) => {
    const { data: pool } = useSinglePoolQuery({
        variables: {
            poolId: id,
        },
    });

    const formattedPool = useMemo(() => {
        if (!pool?.pool) return;

        return {
            token0To1Rate: Number(pool.pool.token1Price).toFixed(6),
            token1To0Rate: Number(pool.pool.token0Price).toFixed(6),
            tvlUSD: formatCurrency.format(pool.pool.totalValueLockedUSD),
        };
    }, [pool]);

    const token0 = pool?.pool?.token0;
    const token1 = pool?.pool?.token1;

    return (
        <div className="flex flex-col text-left p-6 bg-card border border-border rounded-lg transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-bg-200 rounded-xl">
                    <Coins size={18} className="text-text" />
                </div>
                <h3 className="font-semibold text-lg text-text">{name}</h3>
            </div>

            {token0 && token1 ? (
                <div className="flex flex-col gap-5">
                    {/* Token Addresses */}
                    <div>
                        <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Pool Address</p>
                        <DataWithCopyButton data={id} />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">{token0.symbol} Address</p>
                        <DataWithCopyButton data={token0.id} />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">{token1.symbol} Address</p>
                        <DataWithCopyButton data={token1.id} />
                    </div>

                    <div className="h-px bg-border" />

                    {/* Exchange Rates */}
                    <div>
                        <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-3">Exchange Rates</p>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="p-3 bg-bg-200 rounded-lg border border-border">
                                <p className="text-xs text-text/50 mb-0.5">
                                    {token0.symbol} → {token1.symbol}
                                </p>
                                {formattedPool && (
                                    <p className="text-sm font-medium text-text">
                                        1 {token0.symbol} = {formattedPool.token0To1Rate} {token1.symbol}
                                    </p>
                                )}
                            </div>
                            <div className="p-3 bg-bg-200 rounded-lg border border-border">
                                <p className="text-xs text-text/50 mb-0.5">
                                    {token1.symbol} → {token0.symbol}
                                </p>
                                {formattedPool && (
                                    <p className="text-sm font-medium text-text">
                                        1 {token1.symbol} = {formattedPool.token1To0Rate} {token0.symbol}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center py-8">
                    <Loader color="currentColor" />
                </div>
            )}
        </div>
    );
};

export default FarmPoolDetails;
