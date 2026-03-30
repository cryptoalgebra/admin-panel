import { Market, useAllOpenMarketsListQuery } from "@/graphql/generated/graphql";
import { useCurrency } from "@/hooks/common/useCurrency";
import { useClients } from "@/hooks/graphql/useClients";
import { formatAmount } from "@/utils/common/formatAmount";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const PredictionHeader = () => (
    <div className="hidden md:grid grid-cols-8 text-xs font-medium text-text/50 uppercase tracking-wider px-4 py-3 bg-bg-200 border-b border-border">
        <div>Pool</div>
        <div>Question</div>
        <div>TVL</div>
        <div>Volume</div>
        <div>Users</div>
        <div>Stops</div>
        <div>Resolves</div>
        <div></div>
    </div>
);

const MarketRow = (market: Market) => {

    const token0 = useCurrency(market.token0)
    const token1 = useCurrency(market.token1)

    console.log(market)

    return (
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-0 w-full text-left px-4 py-4 bg-card border-b border-border hover:bg-bg-200 transition-colors items-center">
            {token0 && token1 && (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Pool</div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-text">{`${token0.symbol} / ${token1.symbol}`}</span>
                    </div>
                </div>
            )}
            {market.condition && (
                <div className="flex w-full justify-between">
                    <div className="md:hidden text-xs text-text/50 font-medium">Question</div>
                    <div className="text-sm text-text">{`${market.condition} than ${market.mark}`}</div>
                </div>
            )}
            {market ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">TVL</div>
                    <div className="text-sm text-text">{`$${formatAmount(1000)}`}</div>
                </div>
            ) : (
                <div className="text-sm text-text">$0</div>
            )}
            {market.totalVolume ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Volume 24H</div>
                    <div className="text-sm text-text">{`$${formatAmount(market.totalVolume)}`}</div>
                </div>
            ) : (
                <div className="text-sm text-text">$0</div>
            )}
            {market.activeUsers ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Users</div>
                    <div className="text-sm text-text">{`$${formatAmount(market.activeUsers)}`}</div>
                </div>
            ) : (
                <div className="text-sm text-text">$0</div>
            )}
            {market.tradingDeadline ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Trading Stops</div>
                    <div className="text-sm text-text">{market.tradingDeadline}</div>
                </div>
            ) : (
                <div className="text-sm text-text">0</div>
            )}
            {market.plannedResolutionTimestamp ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Resolves at</div>
                    <div className="text-sm text-text">{market.plannedResolutionTimestamp}</div>
                </div>
            ) : (
                <div className="text-sm text-text">0</div>
            )}

            <div className="text-right">
                <Link
                    to={`/prediction/${market.id}`}
                    className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                    Manage →
                </Link>
            </div>
        </div>
    );
};

const PredictionMarketsList = () => {

    const { predictionClient } = useClients();

    const { data: markets, loading } = useAllOpenMarketsListQuery({
        client: predictionClient
    });

    const formattedPools = useMemo(() => {
        if (!markets?.markets) return [];

        return markets.markets as Market[];

        // return markets.markets.map(({ id, token0, token1, fee, overrideFee, totalValueLockedUSD, volumeUSD, deployer }) => ({
        //     id: id as Address,
        //     pair: {
        //         token0,
        //         token1,
        //     },
        //     deployer,
        //     fee: Number(fee) / 10_000,
        //     overrideFee: Number(overrideFee) / 10_000,
        //     tvlUSD: Number(totalValueLockedUSD),
        //     volume24USD: Number(volumeUSD),
        //     apr: 0,
        // }));
    }, [markets]);

    return (
        <div className="w-full text-left bg-card border border-border rounded-lg overflow-hidden">
            {loading ? (
                <div className="flex items-center justify-center p-8">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-5 h-5 border-2 border-border border-t-text rounded-full animate-spin" />
                        <span className="text-sm text-text/50">Loading markets...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <PredictionHeader />
                    <div>
                        {formattedPools.map((market) => (
                            <MarketRow key={market.id} {...market} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )

};

export default PredictionMarketsList;