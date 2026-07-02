import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { formatAmount } from "@/utils/common/formatAmount";
import { truncateHash } from "@/utils/common/truncateHash";
import { Address, formatUnits } from "viem";
import { useAllPredictionMarkets } from "../../hooks/useAllPredictionMarkets";
import { useTreasuryBalances } from "../../hooks/useTreasuryBalances";
import { Copy, Check, AlertTriangle, Wallet, DollarSign, TrendingUp, Users, Coins, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useBlockExplorerUrl } from "@/hooks/common/useBlockExplorerUrl";
import { TopUpModal } from "../modals/TopUpModal";
import { useBatchWithdrawPredictionFees, usePredictionProtocolAddress } from "../../hooks";
import { useAccount, useChainId } from "wagmi";
import { useMarketManagerDataQuery } from "@/graphql/generated/graphql";
import { BINARY_LMSR_MARKET_MANAGER } from "config/contract-addresses";
import { useClients } from "@/hooks/graphql/useClients";

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

const formatTokenTotals = (items: { total: bigint; decimals: number; symbol: string }[]) => {
    if (items.length === 0) return { primary: "0", secondary: undefined as string | undefined };
    if (items.length === 1) {
        const [item] = items;
        return {
            primary: `${formatAmount(formatUnits(item.total, item.decimals))} ${item.symbol}`,
            secondary: undefined,
        };
    }

    return {
        primary: `${items.length} assets`,
        secondary: items
            .slice(0, 2)
            .map((item) => `${formatAmount(formatUnits(item.total, item.decimals))} ${item.symbol}`)
            .join(" · "),
    };
};

export const PredictionSummary = () => {
    const { address: userAddress } = useAccount();
    const chainId = useChainId();
    const { markets, refetch: refetchMarkets } = useAllPredictionMarkets();
    const [topUpOpen, setTopUpOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const explorerBaseUrl = useBlockExplorerUrl();
    const { toast } = useToast();

    const { data: protocolAddress } = usePredictionProtocolAddress();
    const isOwner = userAddress && protocolAddress && protocolAddress.toLowerCase() === userAddress.toLowerCase();

    const { predictionClient } = useClients();

    const { data: marketManagerData, refetch: refetchMarketManager } = useMarketManagerDataQuery({
        variables: {
            address: BINARY_LMSR_MARKET_MANAGER[chainId].toLowerCase(),
        },
        skip: !protocolAddress,
        client: predictionClient,
    });

    const { nativeBalance, tokenBalances, claimableFeesByToken } = useTreasuryBalances(protocolAddress, markets);
    const { withdrawFees: claimAllFees, isLoading: isClaimingAll } = useBatchWithdrawPredictionFees(() => {
        refetchMarkets();
        refetchMarketManager();
    });

    const stats = useMemo(() => {
        const marketManager = marketManagerData?.marketManager;
        if (!marketManager) {
            return {
                total: 0,
                active: 0,
                resolved: 0,
                closed: 0,
                totalVolume: 0,
                totalUsers: 0,
                totalTrades: 0,
                totalFees: 0,
                totalSeededMarkets: 0,
            };
        }

        const totalMarkets = Number(marketManager.marketCount);
        const activeMarkets = Number(marketManager.openMarketCount);
        const resolvedMarkets = Number(marketManager.resolvedMarketCount);
        const closedMarkets = totalMarkets - activeMarkets - resolvedMarkets;
        // const marketsWithFees = markets.filter((m) => hasClaimableFees(m));
        const tvl = formatUnits(BigInt(marketManager.tvl), 6);
        const totalVolume = formatUnits(BigInt(marketManager.totalVolume), 6);
        const totalFees = formatUnits(BigInt(marketManager.accruedFees), 6);
        const totalUsers = marketManager.activeUserCount;
        const totalTrades = marketManager.totalTrades;
        const totalSeededMarkets = Number(marketManager.seededMarketCount);

        return {
            total: totalMarkets,
            active: activeMarkets,
            resolved: resolvedMarkets,
            closed: closedMarkets,
            tvl,
            totalVolume,
            totalUsers,
            totalTrades,
            totalFees,
            totalSeededMarkets,
        };
    }, [marketManagerData]);

    const claimAllEligibleMarkets = useMemo(() => markets.filter((market) => BigInt(market.accruedFees || 0) > 0n), [markets]);

    const claimableFeesDisplay = useMemo(() => formatTokenTotals(claimableFeesByToken), [claimableFeesByToken]);
    // const seededDisplay = useMemo(() => formatTokenTotals(seededAmountsByToken), [seededAmountsByToken]);

    const nativeFormatted = nativeBalance ? formatAmount(formatUnits(nativeBalance.value, nativeBalance.decimals), 4) : "—";
    const isLowGas = nativeBalance ? Number(formatUnits(nativeBalance.value, nativeBalance.decimals)) < 0.01 : false;

    const handleCopy = () => {
        if (!protocolAddress) return;
        navigator.clipboard.writeText(protocolAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClaimAll = () => {
        if (!protocolAddress) return;

        if (claimAllEligibleMarkets.length === 0) {
            toast({
                title: "No fees to claim",
                description: "There are no accrued protocol fees available right now.",
            });
            return;
        }

        claimAllFees(claimAllEligibleMarkets, protocolAddress);
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

                            {isOwner && (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={handleClaimAll}
                                    disabled={claimAllEligibleMarkets.length === 0 || isClaimingAll}
                                    className="gap-1.5 text-xs"
                                >
                                    <Coins size={16} />
                                    {isClaimingAll ? "Claiming..." : "Claim All Fees"}
                                </Button>
                            )}

                            {!isOwner && (
                                <TopUpModal open={topUpOpen} onOpenChange={setTopUpOpen} protocolAddress={protocolAddress}>
                                    <Button variant="outline" size="sm" onClick={() => setTopUpOpen(true)} className="gap-1.5 text-xs">
                                        <Plus size={16} /> Top Up
                                    </Button>
                                </TopUpModal>
                            )}
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
                    {/* <StatCard
                        icon={Droplets}
                        label="Seeded Capital"
                        value={seededDisplay.primary}
                        subValue={seededDisplay.secondary || `${stats.totalSeededMarkets} seeded markets`}
                    /> */}
                    <StatCard
                        icon={Coins}
                        label="Claimable Fees"
                        value={claimableFeesDisplay.primary}
                        subValue={claimableFeesDisplay.secondary || `across ${claimAllEligibleMarkets.length} markets`}
                    />
                </div>
            </div>
        </>
    );
};
