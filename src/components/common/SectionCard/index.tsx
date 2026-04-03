import { cn } from "@/utils/common/cn";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface SectionCardProps {
    title: string;
    icon?: LucideIcon;
    children: ReactNode;
    className?: string;
}

export const SectionCard = ({ title, icon: Icon, children, className }: SectionCardProps) => (
    <div className={cn("bg-card border border-border rounded-lg p-6", className)}>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            {Icon && <Icon size={18} className="text-text/50" />}
            <h2 className="font-semibold text-text">{title}</h2>
        </div>
        {children}
    </div>
);
