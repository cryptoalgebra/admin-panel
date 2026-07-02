import { ReactNode } from "react";
import { cn } from "@/utils/common/cn";

interface StatBoxProps {
    label: string;
    value: ReactNode;
    subValue?: string;
    highlight?: "green" | "red" | "blue" | "yellow";
}

const highlightColors = {
    green: "border-green-500/30 bg-green-500/5",
    red: "border-red-500/30 bg-red-500/5",
    blue: "border-blue-500/30 bg-blue-500/5",
    yellow: "border-yellow-500/30 bg-yellow-500/5",
};

export const StatBox = ({ label, value, subValue, highlight }: StatBoxProps) => (
    <div className={cn("p-3 rounded-lg border border-border bg-card-hover", highlight && highlightColors[highlight])}>
        <div className="text-xs text-text/50 mb-1">{label}</div>
        <div className="text-lg font-semibold text-text">{value}</div>
        {subValue && <div className="text-xs text-text/40 mt-0.5">{subValue}</div>}
    </div>
);
