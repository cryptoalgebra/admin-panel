import { useCurrency } from "@/hooks/common/useCurrency";
import { formatAmount } from "@/utils/common/formatAmount";
import { useEffect, useMemo, useState } from "react";
import { formatUnits } from "viem";
import { useNavigate } from "react-router-dom";
import { useAllPredictionMarkets } from "../../hooks/useAllPredictionMarkets";
import { PredictionMarket, MarketStatus, MarketOutcome } from "../../types";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/common/cn";
import CurrencyLogo from "@/components/common/CurrencyLogo";
import { formatDeadline, formatQuestionText, getMarketStatus, hasClaimableFees } from "../../utils";
import { OutcomeBadge, StatusBadge } from "../common/Badge";

type FilterType = "all" | "active" | "resolved" | "trading-closed" | "fees-available";

const ITEMS_PER_PAGE = 10;

const MarketPoolLabel = ({ market }: { market: PredictionMarket }) => {
    const token0 = useCurrency(market.token0);
    const token1 = useCurrency(market.token1);

    if (!token0 || !token1) return <span className="text-sm text-text/50">Loading...</span>;

    return (
        <div className="flex items-center gap-2 font-medium text-sm text-text">
            <CurrencyLogo currency={token0} size={18} />
            <CurrencyLogo className="-ml-3" currency={token1} size={18} />
            <span>
                {token0.symbol} / {token1.symbol}
            </span>
        </div>
    );
};

const MarketQuestion = ({ market }: { market: PredictionMarket }) => {
    const token0 = useCurrency(market.token0);
    const token1 = useCurrency(market.token1);
    const collateralToken = useCurrency(market.collateralToken);

    if (!token0 || !token1 || !collateralToken) return <span className="text-sm text-text/50">Loading...</span>;

    const questionText = formatQuestionText(market, collateralToken.wrapped, token0.symbol || "", token1.symbol || "");

    return (
        <div className="text-sm text-text" title={questionText}>
            {questionText}
        </div>
    );
};

const PredictionHeader = () => (
    <div className="hidden lg:grid grid-cols-[1.5fr_2.5fr_1.2fr_1fr_1fr_1.5fr_20px] text-xs font-medium text-text/50 uppercase tracking-wider px-4 py-3 bg-card-hover border-b border-border">
        <div>Pool</div>
        <div>Question</div>
        <div>Status</div>
        <div>Volume</div>
        <div>Fees</div>
        <div>Deadline</div>
        <div></div>
    </div>
);

const MarketRow = ({ market, onClick }: { market: PredictionMarket; onClick: () => void }) => {
    const status = getMarketStatus(market);
    const hasFees = hasClaimableFees(market);
    const outcome = market.outcome as MarketOutcome;

    const collateralToken = useCurrency(market.collateralToken);

    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr_1.2fr_1fr_1fr_1.5fr_20px] gap-4 lg:gap-0 w-full text-left px-4 py-4 bg-card border-b border-border hover:bg-card-hover transition-colors items-center cursor-pointer"
            onClick={onClick}
        >
            <div className="flex w-full justify-between lg:justify-start">
                <div className="lg:hidden text-xs text-text/50 font-medium">Pool</div>
                <div className="flex items-center gap-2">
                    <MarketPoolLabel market={market} />
                </div>
            </div>

            <div className="flex w-full justify-between lg:justify-start items-center gap-2">
                <div className="lg:hidden text-xs text-text/50 font-medium">Question</div>
                <MarketQuestion market={market} />
                <OutcomeBadge outcome={outcome} />
            </div>

            <div className="flex w-full justify-between lg:justify-start">
                <div className="lg:hidden text-xs text-text/50 font-medium">Status</div>
                <StatusBadge status={status} hasFees={hasFees} />
            </div>

            <div className="flex w-full justify-between lg:justify-start">
                <div className="lg:hidden text-xs text-text/50 font-medium">Volume</div>
                {collateralToken ? (
                    <div className="text-sm text-text">
                        {formatAmount(formatUnits(BigInt(market.totalVolume || 0), collateralToken.decimals))} {collateralToken.symbol}
                    </div>
                ) : (
                    <span className="text-sm text-text/50">Loading...</span>
                )}
            </div>

            <div className="flex w-full justify-between lg:justify-start">
                <div className="lg:hidden text-xs text-text/50 font-medium">Fees</div>
                {collateralToken ? (
                    <div className="text-sm text-text">
                        {formatAmount(formatUnits(BigInt(market.accruedFees || 0), collateralToken.decimals))} {collateralToken.symbol}
                    </div>
                ) : (
                    <span className="text-sm text-text/50">Loading...</span>
                )}
            </div>

            <div className="flex w-full justify-between lg:justify-start">
                {(() => {
                    const { label, ended } = formatDeadline(market.tradingDeadline);
                    return (
                        <>
                            <div className="lg:hidden text-xs text-text/50 font-medium">Deadline</div>
                            <div className={cn("text-sm", ended ? "text-text/50" : "text-text")}>{label}</div>
                        </>
                    );
                })()}
            </div>

            <div className="flex items-center justify-end gap-1">
                <ArrowRight size={14} className="text-text/50" />
            </div>
        </div>
    );
};

export const PredictionMarketsList = () => {
    const { markets, loading } = useAllPredictionMarkets();
    const [filter, setFilter] = useState<FilterType>("all");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const filteredMarkets = useMemo(() => {
        return markets.filter((market) => {
            const status = getMarketStatus(market);
            switch (filter) {
                case "active":
                    return status === MarketStatus.Active;
                case "resolved":
                    return status === MarketStatus.Resolved;
                case "trading-closed":
                    return status === MarketStatus.TradingClosed;
                case "fees-available":
                    return hasClaimableFees(market);
                default:
                    return true;
            }
        });
    }, [markets, filter]);

    const totalPages = Math.ceil(filteredMarkets.length / ITEMS_PER_PAGE);
    const paginatedMarkets = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return filteredMarkets.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredMarkets, page]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setPage(1);
    }, [filter]);

    const handleMarketClick = (market: PredictionMarket) => {
        navigate(`/prediction/${market.id}`);
    };

    const filters: { key: FilterType; label: string }[] = [
        { key: "all", label: "All" },
        { key: "active", label: "Active" },
        { key: "trading-closed", label: "Trading Closed" },
        { key: "resolved", label: "Resolved" },
        { key: "fees-available", label: "Fees Available" },
    ];

    return (
        <>
            <div className="flex gap-2 mb-4 flex-wrap">
                {filters.map((f) => (
                    <Button key={f.key} variant={filter === f.key ? "primary" : "outline"} size="sm" onClick={() => setFilter(f.key)}>
                        {f.label}
                    </Button>
                ))}
            </div>

            <div className="w-full text-left bg-card border border-border rounded-lg overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center p-8">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-5 h-5 border-2 border-border border-t-text rounded-full animate-spin" />
                            <span className="text-sm text-text/50">Loading markets...</span>
                        </div>
                    </div>
                ) : filteredMarkets.length === 0 ? (
                    <div className="flex items-center justify-center p-8">
                        <span className="text-sm text-text/50">No markets found</span>
                    </div>
                ) : (
                    <div>
                        <PredictionHeader />
                        <div>
                            {paginatedMarkets.map((market) => (
                                <MarketRow key={market.id} market={market} onClick={() => handleMarketClick(market)} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 px-2 w-full">
                    <div className="text-sm text-text/50">
                        Showing {(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, filteredMarkets.length)} of{" "}
                        {filteredMarkets.length} markets
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                            <ChevronLeft size={16} />
                        </Button>
                        <span className="text-sm text-text px-2">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
