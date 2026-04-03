import { Address, formatUnits } from "viem";
import { Info } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { DataRow } from "@/components/common/DataRow";
import { StatBox } from "@/components/common/StatBox";
import { MarketOutcome } from "@/modules/PredictionModule/types";
import { PredictionMarket } from "@/modules/PredictionModule/types";
import { formatAmount } from "@/utils/common/formatAmount";
import { MarketState } from "../../hooks";
import { Currency } from "@cryptoalgebra/integral-sdk";
import { OutcomeBadge } from "../common/Badge";

interface MarketOverviewProps {
    market: PredictionMarket;
    marketState: MarketState | undefined;
    collateralToken: Currency | null | undefined;
    outcome: MarketOutcome;
    marketId: Address;
    explorerBaseUrl: string;
}

export const MarketOverview = ({ market, marketState, collateralToken, outcome, marketId, explorerBaseUrl }: MarketOverviewProps) => (
    <SectionCard title="Overview" icon={Info}>
        <div className="grid grid-cols-3 gap-3 pb-4">
            <StatBox
                label="Volume"
                value={`${formatAmount(formatUnits(BigInt(market.totalVolume || 0), collateralToken?.decimals || 0))} ${
                    collateralToken?.symbol
                }`}
            />
            <StatBox label="Trades" value={market.totalTrades || 0} />
            <StatBox label="Users" value={market.activeUsers || 0} />
        </div>
        <div className="divide-y divide-border">
            <DataRow label="Market Address" copyable={marketId} link={`${explorerBaseUrl}/address/${marketId}`} />
            <DataRow label="Pool Address" copyable={market.pool} link={`${explorerBaseUrl}/address/${market.pool}`} />
            <DataRow
                label="Protocol Address"
                copyable={marketState?.protocol}
                link={marketState?.protocol ? `${explorerBaseUrl}/address/${marketState.protocol}` : undefined}
            />
            <DataRow label="Collateral Token" value={collateralToken?.symbol} />
            <DataRow label="Outcome" value={outcome === MarketOutcome.Unresolved ? "Unresolved" : <OutcomeBadge outcome={outcome} />} />
        </div>
    </SectionCard>
);
