import {
    Credenza,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaBody,
    CredenzaFooter,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { truncateHash } from "@/utils/common/truncateHash";
import { Address, parseEther } from "viem";
import { useState } from "react";
import { useSendTransaction } from "wagmi";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useBlockExplorerUrl } from "@/hooks/common/useBlockExplorerUrl";

interface TopUpModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    protocolAddress: Address | undefined;
    children: React.ReactNode;
}

export const TopUpModal = ({ open, onOpenChange, protocolAddress, children }: TopUpModalProps) => {
    const blockExplorerUrl = useBlockExplorerUrl();
    const [amount, setAmount] = useState("");
    const [copied, setCopied] = useState(false);

    const { sendTransaction, data: hash, isPending } = useSendTransaction();

    const { isLoading: isConfirming } = useTransactionAwait(hash, {
        title: "Top Up Treasury",
        description: "Sending ETH to protocol treasury",
        callback: () => {
            setAmount("");
        },
    });

    const handleCopy = () => {
        if (!protocolAddress) return;
        navigator.clipboard.writeText(protocolAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSend = () => {
        if (!protocolAddress || !amount) return;
        try {
            const value = parseEther(amount);
            sendTransaction({
                to: protocolAddress,
                value,
            });
        } catch (e) {
            console.error("Invalid amount", e);
        }
    };

    const isLoading = isPending || isConfirming;
    const isValid = !!amount && Number(amount) > 0 && !!protocolAddress;

    return (
        <Credenza open={open} onOpenChange={onOpenChange}>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="max-w-md">
                <CredenzaHeader>
                    <CredenzaTitle>Top Up Protocol Balance</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className="space-y-4">
                    <div className="bg-bg-200 rounded-lg p-4">
                        <p className="text-xs text-text/50 uppercase font-medium mb-2">Recipient</p>
                        {protocolAddress ? (
                            <div className="flex items-center justify-between">
                                <a
                                    href={`${blockExplorerUrl}/address/${protocolAddress}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-mono text-text hover:text-primary transition-colors flex items-center gap-1"
                                >
                                    {truncateHash(protocolAddress as Address, 8, 6)}
                                    <ExternalLink size={12} />
                                </a>
                                <button onClick={handleCopy} className="p-1 rounded hover:bg-bg-200">
                                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-text/50" />}
                                </button>
                            </div>
                        ) : (
                            <span className="text-sm text-text/50">Loading...</span>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-text/60 mb-1.5 block">Amount (ETH)</label>
                        <Input type="text" placeholder="0.0" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <p className="text-xs text-text/40 mt-1.5">Send ETH to the protocol treasury for gas costs</p>
                    </div>
                </CredenzaBody>
                <CredenzaFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSend} disabled={!isValid || isLoading}>
                        {isLoading ? "Sending..." : "Send ETH"}
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
};
