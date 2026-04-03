import { useWritePredictionMarketWithdrawFees } from "@/generated";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { Address } from "viem";

export function useWithdrawPredictionFees(marketAddress: Address | undefined, onSuccess?: () => void) {
    const { writeContract: withdraw, data: hash, isPending } = useWritePredictionMarketWithdrawFees();

    const { isLoading: isConfirming } = useTransactionAwait(hash, {
        title: "Withdraw Fees",
        description: "Withdrawing protocol fees from prediction market",
        callback: onSuccess,
    });

    function withdrawFees(recipient: Address, amount: bigint) {
        if (!marketAddress) return;
        withdraw({
            address: marketAddress,
            args: [recipient, amount],
        });
    }

    return {
        withdrawFees,
        isLoading: isPending || isConfirming,
    };
}
