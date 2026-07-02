import { Address } from "viem";
import { ExternalLink } from "lucide-react";
import { MarketOutcome, MarketStatus } from "../../types";
import { OutcomeBadge, StatusBadge } from "../common";

interface MarketHeaderProps {
    questionText: string;
    status: MarketStatus | null;
    hasFees: boolean;
    outcome: MarketOutcome;
    marketId: Address;
    explorerBaseUrl: string;
}

export const MarketHeader = ({ questionText, status, hasFees, outcome, marketId, explorerBaseUrl }: MarketHeaderProps) => (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 w-full">
        <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-text">{questionText}</h1>
            <div className="flex flex-wrap items-center gap-2">
                {status && <StatusBadge status={status} hasFees={hasFees} />}
                <OutcomeBadge outcome={outcome} />
            </div>
            <div className="flex items-center gap-4 text-sm ml-auto">
                <a
                    href={`${explorerBaseUrl}/address/${marketId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text/60 hover:text-text flex items-center gap-1"
                >
                    <ExternalLink size={12} />
                    Explorer
                </a>
            </div>
        </div>
    </div>
);
