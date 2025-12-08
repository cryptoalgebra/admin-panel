import { Currency, CurrencyAmount } from "@cryptoalgebra/integral-sdk";
import { useNeedAllowance } from "./useNeedAllowance";
import { ApprovalState, ApprovalStateType } from "@/types/approve-state";
import { useEffect, useMemo, useState } from "react";
import { Address, erc20Abi } from "viem";
import { useWriteContract } from "wagmi";
import { useTransactionAwait } from "./useTransactionAwait";
import { formatCurrency } from "@/utils/common/formatCurrency";

export function useApprove(
    amountToApprove: CurrencyAmount<Currency> | undefined,
    spender: Address
) {
    const token = amountToApprove?.currency?.isToken ? amountToApprove.currency : undefined;
    const [shouldPolling, setShouldPolling] = useState(false);

    const needAllowance = useNeedAllowance(token, amountToApprove, spender, shouldPolling);

    const approvalState: ApprovalStateType = useMemo(() => {
        if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
        if (amountToApprove.currency.isNative) return ApprovalState.APPROVED;

        return needAllowance ? ApprovalState.NOT_APPROVED : ApprovalState.APPROVED;
    }, [amountToApprove, needAllowance, spender]);

    const config = amountToApprove
        ? {
              address: amountToApprove.currency.wrapped.address as Address,
              abi: erc20Abi,
              functionName: "approve" as const,
              args: [spender, BigInt(amountToApprove.quotient.toString())] as [Address, bigint],
          }
        : undefined;

    const { data: approvalData, writeContract: approve, isPending } = useWriteContract();

    const { isLoading, isSuccess } = useTransactionAwait(
        approvalData,
        `Approve ${formatCurrency.format(Number(amountToApprove?.toSignificant()))} ${amountToApprove?.currency.symbol}`
    );

    useEffect(() => {
        if (!needAllowance && shouldPolling) {
            setShouldPolling(false);
        }
    }, [needAllowance, shouldPolling]);

    const approvalCallback = () => {
        if (config) {
            setShouldPolling(true);
            approve(config);
        }
    };

    return {
        approvalState:
            isLoading || isPending
                ? ApprovalState.PENDING
                : isSuccess && approvalState === ApprovalState.APPROVED
                  ? ApprovalState.APPROVED
                  : approvalState,
        approvalCallback,
    };
}
