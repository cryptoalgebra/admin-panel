import { Clock } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { DataRow } from "@/components/common/DataRow";
import { PredictionMarket } from "../../types";
import { formatTimestamp, isDeadlinePassed } from "../../utils";

interface MarketTimelinesProps {
    market: PredictionMarket;
}

export const MarketTimelines = ({ market }: MarketTimelinesProps) => (
    <SectionCard title="Timelines" icon={Clock}>
        <div className="divide-y divide-border">
            <DataRow label="Created At" value={formatTimestamp(market.createdAt)} />
            <DataRow
                label="Trading Deadline"
                value={
                    <span className={isDeadlinePassed(market.tradingDeadline) ? "text-text/50" : ""}>
                        {isDeadlinePassed(market.tradingDeadline) ? "Ended" : formatTimestamp(market.tradingDeadline)}
                    </span>
                }
            />
            <DataRow label="Planned Resolution" value={formatTimestamp(market.plannedResolutionTimestamp)} />
        </div>
    </SectionCard>
);
