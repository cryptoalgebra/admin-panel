import { formatUnits } from "viem";
import { formatAmount } from "@/utils/common/formatAmount";
import { Token } from "@cryptoalgebra/integral-sdk";
import { MarketOutcome, MarketStatus, PredictionMarket } from "../types";

export function formatTimestamp(ts: string | number): string {
    const date = new Date(Number(ts) * 1000);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatDeadline(ts: string | number): { label: string; ended: boolean } {
    const now = Math.floor(Date.now() / 1000);
    const timestamp = Number(ts);
    if (timestamp < now) return { label: "Ended", ended: true };
    return { label: formatTimestamp(ts), ended: false };
}

export function isDeadlinePassed(ts: string | number): boolean {
    const now = Math.floor(Date.now() / 1000);
    return Number(ts) < now;
}

export function formatQuestionText(market: PredictionMarket, collateralToken: Token, token0Symbol: string, token1Symbol: string): string {
    const markNum = Number(formatUnits(BigInt(market.mark || 0), collateralToken.decimals));
    const markFormatted = formatAmount(markNum);
    return `Will ${token0Symbol} be ${market.condition} than ${markFormatted} ${token1Symbol}?`;
}

export function getMarketStatus(market: PredictionMarket): MarketStatus {
    const outcome = Number(market.outcome ?? 0);
    if (outcome !== MarketOutcome.Unresolved) return MarketStatus.Resolved;
    const now = Math.floor(Date.now() / 1000);
    if (Number(market.tradingDeadline) < now) return MarketStatus.TradingClosed;
    return MarketStatus.Active;
}

export function hasClaimableFees(market: PredictionMarket): boolean {
    return BigInt(market.accruedFees) > 0n;
}
