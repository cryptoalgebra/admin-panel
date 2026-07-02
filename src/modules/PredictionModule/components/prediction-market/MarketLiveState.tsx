import { formatUnits } from "viem";
import { Activity } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { DataRow } from "@/components/common/DataRow";
import { StatBox } from "@/components/common/StatBox";
import { formatAmount } from "@/utils/common/formatAmount";
import { MarketState } from "../../hooks";
import { Currency } from "@cryptoalgebra/integral-sdk";

interface MarketLiveStateProps {
    marketState: MarketState | undefined;
    collateralBalance: bigint | undefined;
    collateralToken: Currency | null | undefined;
    accruedFeesFormatted: string;
}

export const MarketLiveState = ({ marketState, collateralBalance, collateralToken, accruedFeesFormatted }: MarketLiveStateProps) => (
    <SectionCard title="Live Market State" icon={Activity}>
        <div className="grid grid-cols-2 gap-3 mb-4">
            <StatBox
                label="YES Price"
                value={`${marketState?.priceYes ? (Number(formatUnits(marketState.priceYes, 18)) * 100).toFixed(1) : "0"}%`}
                highlight="green"
            />
            <StatBox
                label="NO Price"
                value={`${marketState?.priceNo ? (Number(formatUnits(marketState.priceNo, 18)) * 100).toFixed(1) : "0"}%`}
                highlight="red"
            />
        </div>
        <div className="divide-y divide-border">
            <DataRow label="Liquidity (b)" value={marketState?.b?.toString()} />
            <DataRow
                label="qYes"
                value={marketState?.qYes ? formatAmount(formatUnits(marketState.qYes, collateralToken?.decimals || 0), 6) : "0"}
            />
            <DataRow
                label="qNo"
                value={marketState?.qNo ? formatAmount(formatUnits(marketState.qNo, collateralToken?.decimals || 0), 6) : "0"}
            />
            <DataRow
                label="Collateral Balance"
                value={`${collateralBalance ? formatAmount(formatUnits(collateralBalance, collateralToken?.decimals || 0)) : "0"} ${
                    collateralToken?.symbol
                }`}
            />
            <DataRow
                label="Max Loss"
                value={`${marketState?.maxLoss ? formatAmount(formatUnits(marketState.maxLoss, collateralToken?.decimals || 0)) : "0"} ${
                    collateralToken?.symbol
                }`}
            />
            <DataRow label="Accrued Fees" value={`${accruedFeesFormatted} ${collateralToken?.symbol}`} />
        </div>
    </SectionCard>
);
