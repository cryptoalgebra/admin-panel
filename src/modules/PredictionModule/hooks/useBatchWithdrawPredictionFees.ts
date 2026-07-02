import { useWriteBinaryLmsrMarketManagerBatchWithdrawFees } from "@/generated";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { Address } from "viem";
import { PredictionMarket } from "../types";

export function useBatchWithdrawPredictionFees(onSuccess?: () => void) {
    const { writeContract: withdrawBatch, data: hash, isPending } = useWriteBinaryLmsrMarketManagerBatchWithdrawFees();

    const { isLoading: isConfirming } = useTransactionAwait(hash, {
        title: "Claim All Fees",
        description: "Withdrawing protocol fees from all eligible prediction markets",
        callback: onSuccess,
    });

    function withdrawFees(markets: PredictionMarket[], recipient: Address) {
        const eligibleMarkets = markets.filter((market) => BigInt(market.accruedFees || 0) > 0n);
        if (eligibleMarkets.length === 0) return;

        withdrawBatch({
            args: [
                eligibleMarkets.map((market) => market.index),
                eligibleMarkets.map(() => recipient),
                eligibleMarkets.map((market) => BigInt(market.accruedFees || 0)),
            ],
        });
    }

    return {
        withdrawFees,
        isLoading: isPending || isConfirming,
    };
}
