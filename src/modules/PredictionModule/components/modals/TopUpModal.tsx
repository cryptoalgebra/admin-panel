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
import { truncateHash } from "@/utils/common/truncateHash";
import { Address, erc20Abi, parseUnits } from "viem";
import { useState } from "react";
import { useSendTransaction, useWriteContract } from "wagmi";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useBlockExplorerUrl } from "@/hooks/common/useBlockExplorerUrl";
import { Currency, Native } from "@cryptoalgebra/integral-sdk";
import EnterAmountCard from "@/components/common/EnterAmountCard";
import { DEFAULT_CHAIN_ID } from "config/default-chain";

interface TopUpModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    protocolAddress: Address | undefined;
    children: React.ReactNode;
}

export const TopUpModal = ({ open, onOpenChange, protocolAddress, children }: TopUpModalProps) => {
    const blockExplorerUrl = useBlockExplorerUrl();
    const [copied, setCopied] = useState(false);

    const [selectedToken, setSelectedToken] = useState<Currency>(Native.onChain(DEFAULT_CHAIN_ID, "ETH", "ETH"));
    const [tokenValue, setTokenValue] = useState<string>("");

    const { sendTransaction, data: nativeHash, isPending: isNativePending } = useSendTransaction();
    const { writeContract, data: erc20Hash, isPending: isErc20Pending } = useWriteContract();

    const txHash = selectedToken.isNative ? nativeHash : erc20Hash;
    const isPending = isNativePending || isErc20Pending;

    const { isLoading: isConfirming } = useTransactionAwait(txHash, {
        title: "Top Up Treasury",
        description: `Sending ${selectedToken?.symbol || "tokens"} to the protocol`,
        callback: () => {
            setTokenValue("");
        },
    });

    const handleCopy = () => {
        if (!protocolAddress) return;
        navigator.clipboard.writeText(protocolAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSend = () => {
        if (!protocolAddress || !tokenValue || !selectedToken) return;
        try {
            const value = parseUnits(tokenValue, selectedToken.decimals);
            if (selectedToken.isNative) {
                sendTransaction({ to: protocolAddress, value });
            } else {
                writeContract({
                    abi: erc20Abi,
                    address: selectedToken.wrapped.address as Address,
                    functionName: "transfer",
                    args: [protocolAddress, value],
                });
            }
        } catch (e) {
            console.error("Invalid amount", e);
        }
    };

    const isLoading = isPending || isConfirming;
    const isValid = !!tokenValue && Number(tokenValue) > 0 && !!protocolAddress && !!selectedToken;

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
                                <button onClick={handleCopy} className="p-1 rounded hover:bg-bg-300">
                                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-text/50" />}
                                </button>
                            </div>
                        ) : (
                            <span className="text-sm text-text/50">Loading...</span>
                        )}
                    </div>

                    <EnterAmountCard
                        currency={selectedToken}
                        value={tokenValue}
                        handleChange={setTokenValue}
                        onCurrencySelect={setSelectedToken}
                        showTokenSelector={true}
                        label="Send Amount"
                    />
                </CredenzaBody>
                <CredenzaFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSend} disabled={!isValid || isLoading}>
                        {isLoading ? "Sending..." : `Send${selectedToken ? ` ${selectedToken.symbol}` : ""}`}
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
};
