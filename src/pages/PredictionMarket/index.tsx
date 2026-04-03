import PageContainer from "@/components/common/PageContainer";
import { useCurrency } from "@/hooks/common/useCurrency";
import { MarketOutcome } from "@/modules/PredictionModule/types";
import { formatAmount } from "@/utils/common/formatAmount";
import { Link, useParams } from "react-router-dom";
import { Address, formatUnits } from "viem";
import { ArrowLeft } from "lucide-react";
import { useBlockExplorerUrl } from "@/hooks/common/useBlockExplorerUrl";
import { useAccount } from "wagmi";

import PredictionModule from "@/modules/PredictionModule";
const { usePredictionMarketState, useMarketAuthorization, useMarketCollateralBalance, usePredictionMarket } = PredictionModule.hooks;
const { formatQuestionText, getMarketStatus, hasClaimableFees } = PredictionModule.utils;
const { MarketHeader, MarketOverview, MarketLiveState, MarketTimelines, MarketProtocolFees } = PredictionModule.components;

const PredictionMarketPage = () => {
    const { address: userAddress } = useAccount();
    const explorerBaseUrl = useBlockExplorerUrl();
    const { market: marketId } = useParams() as { market: Address };

    const { market, loading: marketLoading } = usePredictionMarket(marketId);
    const { data: marketState, refetch: refetchMarketState, isLoading: marketStateLoading } = usePredictionMarketState(marketId);
    const { balance: collateralBalance, refetch: refetchBalance } = useMarketCollateralBalance(marketId, marketState?.collateralToken);
    const authorization = useMarketAuthorization(marketState);

    const token0 = useCurrency(market?.token0);
    const token1 = useCurrency(market?.token1);
    const collateralToken = useCurrency(market?.collateralToken);

    const status = market ? getMarketStatus(market) : null;
    const hasFees = market ? hasClaimableFees(market) : false;
    const outcome = (marketState?.outcome ?? market?.outcome ?? 0) as MarketOutcome;

    const accruedFeesFormatted = marketState?.accruedFees
        ? formatAmount(formatUnits(marketState.accruedFees, collateralToken?.decimals || 0))
        : "0";

    const questionText =
        token0 && token1 && market && collateralToken
            ? formatQuestionText(market, collateralToken.wrapped, token0.symbol ?? "", token1.symbol ?? "")
            : "Loading...";

    const isLoading = marketLoading || marketStateLoading;

    return (
        <PageContainer>
            <Link to="/prediction" className="inline-flex items-center gap-2 text-sm text-text/60 hover:text-text mb-6">
                <ArrowLeft size={16} />
                Back to Markets
            </Link>

            {isLoading || !market ? (
                <div className="flex items-center justify-center py-32 w-full">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-6 h-6 border-2 border-border border-t-text rounded-full animate-spin" />
                        <span className="text-sm text-text/50">Loading market data...</span>
                    </div>
                </div>
            ) : (
                <>
                    <MarketHeader
                        questionText={questionText}
                        status={status}
                        hasFees={hasFees}
                        outcome={outcome}
                        marketId={marketId}
                        explorerBaseUrl={explorerBaseUrl}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                        <MarketOverview
                            market={market}
                            marketState={marketState}
                            collateralToken={collateralToken}
                            outcome={outcome}
                            marketId={marketId}
                            explorerBaseUrl={explorerBaseUrl}
                        />
                        <MarketLiveState
                            marketState={marketState}
                            collateralBalance={collateralBalance}
                            collateralToken={collateralToken}
                            accruedFeesFormatted={accruedFeesFormatted}
                        />
                        <MarketTimelines market={market} />
                        <MarketProtocolFees
                            marketId={marketId}
                            marketState={marketState}
                            collateralToken={collateralToken}
                            accruedFeesFormatted={accruedFeesFormatted}
                            authorization={authorization}
                            userAddress={userAddress}
                            onSuccess={() => {
                                refetchMarketState();
                                refetchBalance();
                            }}
                        />
                    </div>
                </>
            )}
        </PageContainer>
    );
};

export default PredictionMarketPage;
