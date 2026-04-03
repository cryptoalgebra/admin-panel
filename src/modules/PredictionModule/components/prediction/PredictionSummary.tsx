import { Button } from "@/components/ui/button";
import { formatAmount } from "@/utils/common/formatAmount";
import { truncateHash } from "@/utils/common/truncateHash";
import { Address, formatUnits } from "viem";
import { useAllPredictionMarkets } from "../../hooks/useAllPredictionMarkets";
import { useTreasuryBalances } from "../../hooks/useTreasuryBalances";
import { usePredictionMarketState } from "../../hooks/usePredictionMarketState";
import { MarketStatus } from "../../types";
import { Copy, Check, AlertTriangle, Wallet, DollarSign, TrendingUp, Users, Coins, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useBlockExplorerUrl } from "@/hooks/common/useBlockExplorerUrl";
import { TopUpModal } from "../modals/TopUpModal";
import { getMarketStatus, hasClaimableFees } from "../../utils";

const StatCard = ({
    icon: Icon,
    label,
    value,
    subValue,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    subValue?: string;
}) => (
    <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 text-text/50 mb-2">
            <Icon size={14} />
            <span className="text-xs font-medium uppercase">{label}</span>
        </div>
        <div className="flex gap-1 items-center">
            <span className=" text-xl font-bold text-text">{value}</span>
            {subValue && <span className="text-xs text-text/50 mt-0.5">{subValue}</span>}
        </div>
    </div>
);

export const PredictionSummary = () => {
    const { markets } = useAllPredictionMarkets();
    const [topUpOpen, setTopUpOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const explorerBaseUrl = useBlockExplorerUrl();

    const firstMarket = markets[0];
    const { data: marketState } = usePredictionMarketState(firstMarket?.id);
    const protocolAddress = marketState?.protocol;

    const { nativeBalance, tokenBalances, claimableFeesByToken } = useTreasuryBalances(protocolAddress, markets);

    const stats = useMemo(() => {
        const activeMarkets = markets.filter((m) => getMarketStatus(m) === MarketStatus.Active);
        const resolvedMarkets = markets.filter((m) => getMarketStatus(m) === MarketStatus.Resolved);
        const closedMarkets = markets.filter((m) => getMarketStatus(m) === MarketStatus.TradingClosed);
        const marketsWithFees = markets.filter((m) => hasClaimableFees(m));
        const totalVolume = markets.reduce((acc, m) => acc + Number(formatUnits(BigInt(m.totalVolume || 0), 6)), 0);
        const totalUsers = new Set(markets.flatMap((m) => m.activeUsers || 0)).size;
        const totalTrades = markets.reduce((acc, m) => acc + Number(m.totalTrades || 0), 0);
        const totalFees = claimableFeesByToken.reduce((acc, f) => acc + Number(formatUnits(f.total, f.decimals)), 0);

        return {
            total: markets.length,
            active: activeMarkets.length,
            resolved: resolvedMarkets.length,
            closed: closedMarkets.length,
            withFees: marketsWithFees.length,
            totalVolume,
            totalUsers,
            totalTrades,
            totalFees,
        };
    }, [markets, claimableFeesByToken]);

    const nativeFormatted = nativeBalance ? formatAmount(formatUnits(nativeBalance.value, nativeBalance.decimals), 4) : "—";
    const isLowGas = nativeBalance ? Number(formatUnits(nativeBalance.value, nativeBalance.decimals)) < 0.01 : false;

    const handleCopy = () => {
        if (!protocolAddress) return;
        navigator.clipboard.writeText(protocolAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div className="w-full space-y-4 mb-6">
                <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Wallet size={20} className="text-primary" />
                            </div>
                            <div>
                                <div className="text-xs text-text/50 uppercase font-medium">Protocol Treasury</div>
                                {protocolAddress ? (
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`${explorerBaseUrl}/address/${protocolAddress}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-mono text-text hover:text-primary transition-colors"
                                        >
                                            {truncateHash(protocolAddress as Address, 6, 4)}
                                        </a>
                                        <button onClick={handleCopy} className="p-0.5 rounded hover:bg-bg-200">
                                            {copied ? (
                                                <Check size={12} className="text-green-500" />
                                            ) : (
                                                <Copy size={12} className="text-text/50" />
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-sm text-text/50">Loading...</span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 bg-bg-200 rounded-lg px-3 py-2">
                                <span className="text-xs text-text/50">ETH</span>
                                <span className="text-sm font-medium text-text">{nativeFormatted}</span>
                                {isLowGas && <AlertTriangle size={14} className="text-yellow-500" />}
                            </div>

                            {tokenBalances.slice(0, 2).map((token) => (
                                <div key={token.address} className="flex items-center gap-2 bg-bg-200 rounded-lg px-3 py-2">
                                    <span className="text-xs text-text/50">{token.symbol}</span>
                                    <span className="text-sm font-medium text-text">
                                        {formatAmount(formatUnits(token.balance, token.decimals))}
                                    </span>
                                </div>
                            ))}

                            <TopUpModal open={topUpOpen} onOpenChange={setTopUpOpen} protocolAddress={protocolAddress}>
                                <Button variant="outline" size="sm" onClick={() => setTopUpOpen(true)} className="gap-1.5">
                                    <Plus size={16} /> Top Up
                                </Button>
                            </TopUpModal>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <StatCard
                        icon={TrendingUp}
                        label="Total Markets"
                        value={stats.total}
                        subValue={`· ${stats.active} active · ${stats.closed} closed`}
                    />
                    <StatCard icon={Users} label="Total Trades" value={formatAmount(stats.totalTrades)} />
                    <StatCard icon={DollarSign} label="Total Volume" value={`${formatAmount(stats.totalVolume)} USDC`} />
                    <StatCard
                        icon={Coins}
                        label="Claimable Fees"
                        value={`${formatAmount(stats.totalFees)} USDC`}
                        subValue={` across ${stats.withFees} markets`}
                    />
                </div>
            </div>
        </>
    );
};
