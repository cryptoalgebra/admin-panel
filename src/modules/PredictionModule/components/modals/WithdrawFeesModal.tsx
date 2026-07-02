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
import { formatAmount } from "@/utils/common/formatAmount";
import { Address, formatUnits, parseUnits } from "viem";
import { useState } from "react";
import { useWithdrawPredictionFees } from "../../hooks/useWithdrawPredictionFees";
import { Token } from "@cryptoalgebra/integral-sdk";
import { PredictionMarket } from "../../types";

interface WithdrawFeesModalProps {
    market: PredictionMarket | undefined;
    collateralToken: Token | null | undefined;
    accruedFees: bigint;
    recipient: Address | undefined;
    onSuccess: () => void;
    children?: React.ReactNode;
}

export const WithdrawFeesModal = ({ market, collateralToken, accruedFees, recipient, onSuccess, children }: WithdrawFeesModalProps) => {
    const [open, onOpenChange] = useState(false);
    const [amount, setAmount] = useState("");
    const maxFeesFormatted = formatUnits(accruedFees, collateralToken?.decimals || 6);

    const { withdrawFees, isLoading } = useWithdrawPredictionFees(market, () => {
        setAmount("");
        onSuccess();
        onOpenChange(false);
    });

    const handleMax = () => {
        setAmount(maxFeesFormatted);
    };

    const handleWithdraw = () => {
        if (!recipient || !amount) return;
        const parsedAmount = parseUnits(amount, collateralToken?.decimals || 6);
        if (parsedAmount <= 0n || parsedAmount > accruedFees) return;
        withdrawFees(recipient, parsedAmount);
    };

    const parsedAmount = (() => {
        try {
            return parseUnits(amount || "0", collateralToken?.decimals || 6);
        } catch {
            return 0n;
        }
    })();

    const isValid = parsedAmount > 0n && parsedAmount <= accruedFees && !!recipient;

    return (
        <Credenza open={open} onOpenChange={onOpenChange}>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="max-w-md">
                <CredenzaHeader>
                    <CredenzaTitle>Withdraw Fees</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className="space-y-4">
                    <div className="bg-card-hover rounded-lg p-3 border border-border">
                        <div className="flex justify-between text-sm">
                            <span className="text-text/60">Available Fees</span>
                            <span className="text-text font-medium">
                                {formatAmount(maxFeesFormatted)} {collateralToken?.symbol}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-text/60 mb-1.5 block">Amount</label>
                        <div className="flex gap-2">
                            <Input type="text" placeholder="0.0" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <Button variant="outline" size="sm" onClick={handleMax}>
                                Max
                            </Button>
                        </div>
                        {parsedAmount > accruedFees && <p className="text-xs text-red-500 mt-1">Amount exceeds available fees</p>}
                    </div>
                </CredenzaBody>
                <CredenzaFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleWithdraw} disabled={!isValid || isLoading}>
                        {isLoading ? "Processing..." : `Withdraw ${formatAmount(amount || "0")} ${collateralToken?.symbol}`}
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
};
