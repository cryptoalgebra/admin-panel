import CurrencyLogo from "@/components/common/CurrencyLogo";
import TokenSelectorModal from "@/components/modals/TokenSelectorModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatAmount } from "@/utils/common/formatAmount";
import { Currency } from "@cryptoalgebra/integral-sdk";
import { ChevronDown } from "lucide-react";
import { useCallback, useMemo } from "react";
import { Address } from "viem";
import { useAccount, useBalance } from "wagmi";

interface EnterAmountCardProps {
    currency: Currency | undefined;
    value: string;
    handleChange: (value: string) => void;
    onCurrencySelect?: (currency: Currency) => void;
    valueUsd?: number | null;
    showTokenSelector?: boolean;
    label?: string;
}

const EnterAmountCard = ({
    currency,
    value,
    handleChange,
    onCurrencySelect,
    valueUsd,
    showTokenSelector = false,
    label = "Amount",
}: EnterAmountCardProps) => {
    const { address: account } = useAccount();

    const { data: balance, isLoading } = useBalance({
        address: account,
        token: currency?.isNative ? undefined : (currency?.wrapped.address as Address),
    });

    const balanceString = useMemo(() => {
        if (isLoading) return "Loading...";
        return formatAmount(balance?.formatted || "0");
    }, [balance, isLoading]);

    const handleInput = useCallback(
        (value: string) => {
            if (value === ".") value = "0.";
            handleChange(value);
        },
        [handleChange],
    );

    function setMax() {
        handleChange(balance?.formatted || "0");
    }

    const TokenButton = (
        <Button variant="secondary" size="sm" className="flex items-center gap-2 h-9 px-3 font-medium">
            {currency ? (
                <>
                    <CurrencyLogo currency={currency} size={20} />
                    <span>{currency.symbol}</span>
                </>
            ) : (
                <span className="text-text/70">Select token</span>
            )}
            <ChevronDown size={14} className="text-text/50" />
        </Button>
    );

    return (
        <div className="bg-card-dark border border-card-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-text/50 uppercase font-medium">{label}</span>
                {currency && (
                    <div className="flex items-center gap-2 text-xs text-text/70">
                        <span>Balance: {balanceString}</span>
                        <button onClick={setMax} className="text-primary hover:text-primary/80 font-medium transition-colors">
                            MAX
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3">
                <Input
                    value={value}
                    id={`amount-${currency?.symbol}`}
                    onUserInput={handleInput}
                    className="flex-1 border-none bg-transparent text-xl font-semibold p-0 h-auto focus-visible:ring-0 placeholder:text-text/50"
                    placeholder="0.0"
                    maxDecimals={currency?.decimals}
                    disabled={!currency}
                />

                {showTokenSelector && onCurrencySelect ? (
                    <TokenSelectorModal onSelect={onCurrencySelect} otherCurrency={currency}>
                        {TokenButton}
                    </TokenSelectorModal>
                ) : currency ? (
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg h-9 px-3">
                        <CurrencyLogo currency={currency} size={20} />
                        <span className="font-medium text-sm">{currency.symbol}</span>
                    </div>
                ) : null}
            </div>

            {valueUsd !== undefined && valueUsd !== null && <div className="mt-2 text-xs text-text/50">${formatAmount(valueUsd, 2)}</div>}
        </div>
    );
};

export default EnterAmountCard;
