import { useWriteBinaryLmsrMarketManagerWithdrawFees } from "@/generated";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { Address } from "viem";
import { PredictionMarket } from "../types";

export function useWithdrawPredictionFees(market: PredictionMarket | undefined, onSuccess?: () => void) {
    const { writeContract: withdraw, data: hash, isPending } = useWriteBinaryLmsrMarketManagerWithdrawFees();

    const { isLoading: isConfirming } = useTransactionAwait(hash, {
        title: "Withdraw Fees",
        description: "Withdrawing protocol fees from prediction market",
        callback: onSuccess,
    });

    function withdrawFees(recipient: Address, amount: bigint) {
        if (!market) return;
        withdraw({
            args: [market.index, recipient, amount],
        });
    }

    return {
        withdrawFees,
        isLoading: isPending || isConfirming,
    };
}
