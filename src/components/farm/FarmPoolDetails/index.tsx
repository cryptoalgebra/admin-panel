import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import Loader from "@/components/common/Loader";
import { useSinglePoolQuery } from "@/graphql/generated/graphql";
import { formatCurrency } from "@/utils/common/formatCurrency";
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
        <div className="text-left p-6 bg-white border border-neutral-200 rounded-lg">
            <div className="font-semibold text-lg mb-6">{`${name} Details`}</div>
            {token0 && token1 ? (
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="text-xs text-neutral-500 mb-1">Pool address</div>
                        <DataWithCopyButton data={id} />
                    </div>
                    <div>
                        <div className="text-xs text-neutral-500 mb-1">{`${token0.symbol} address`}</div>
                        <DataWithCopyButton data={token0.id} />
                    </div>
                    <div>
                        <div className="text-xs text-neutral-500 mb-1">{`${token1.symbol} address`}</div>
                        <DataWithCopyButton data={token1.id} />
                    </div>
                    <div>
                        <div className="text-xs text-neutral-500 mb-1">{`${token0.symbol} to ${token1.symbol} rate`}</div>
                        {formattedPool ? (
                            <div className="text-sm">{`1 ${token0.symbol} = ${formattedPool.token0To1Rate} ${token1.symbol}`}</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div>
                        <div className="text-xs text-neutral-500 mb-1">{`${token1.symbol} to ${token0.symbol} rate`}</div>
                        {formattedPool ? (
                            <div className="text-sm">{`1 ${token1.symbol} = ${formattedPool.token1To0Rate} ${token0.symbol}`}</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            ) : (
                <Loader color="black" />
            )}
        </div>
    );
};

export default FarmPoolDetails;
