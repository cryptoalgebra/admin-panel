import { MarketStatus, MarketOutcome } from "../../types";

const statusColors: Record<MarketStatus, string> = {
    [MarketStatus.Active]: "bg-green-500/20 text-green-400",
    [MarketStatus.TradingClosed]: "bg-yellow-500/20 text-yellow-400",
    [MarketStatus.Resolved]: "bg-gray-500/20 text-gray-400",
};

interface StatusBadgeProps {
    status: MarketStatus;
    hasFees?: boolean;
}

export const StatusBadge = ({ status, hasFees }: StatusBadgeProps) => (
    <div className="flex items-center gap-1.5">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>{status}</span>
        {hasFees && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">Fees</span>
        )}
    </div>
);

interface OutcomeBadgeProps {
    outcome: MarketOutcome;
}

export const OutcomeBadge = ({ outcome }: OutcomeBadgeProps) => {
    if (outcome === MarketOutcome.Unresolved) return null;

    const isYes = outcome === MarketOutcome.Yes;

    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                isYes ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            }`}
        >
            {isYes ? "YES" : "NO"}
        </span>
    );
};
