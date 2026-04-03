import { Check, Copy, ExternalLink } from "lucide-react";
import { ReactNode, useState } from "react";

interface DataRowProps {
    label: string;
    value?: ReactNode;
    copyable?: string;
    link?: string;
}

export const DataRow = ({ label, value, copyable, link }: DataRowProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (copyable) {
            navigator.clipboard.writeText(copyable);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const displayValue = copyable ? `${copyable.slice(0, 6)}...${copyable.slice(-4)}` : value;

    return (
        <div className="flex items-center justify-between py-2.5 text-sm">
            <span className="text-text/60">{label}</span>
            <div className="flex items-center gap-2">
                {copyable ? (
                    <div className="flex items-center gap-1.5">
                        <span className="text-text font-mono text-xs">{displayValue}</span>
                        <button onClick={handleCopy} className="text-text/40 hover:text-text p-0.5">
                            {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                        </button>
                        {link && (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-text/40 hover:text-text p-0.5">
                                <ExternalLink size={12} />
                            </a>
                        )}
                    </div>
                ) : (
                    <span className="text-text">{value}</span>
                )}
            </div>
        </div>
    );
};
