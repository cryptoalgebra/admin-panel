import {
  Currency,
  CurrencyAmount,
} from "@cryptoalgebra/integral-sdk";
import { useNeedAllowance } from "./useNeedAllowance";
import { ApprovalState, ApprovalStateType } from "@/types/approve-state";
import { useMemo } from "react";
import {
  Address,
  erc20ABI,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useTransitionAwait } from "./useTransactionAwait";
import { formatCurrency } from "@/utils/common/formatCurrency";

export function useApprove(
  amountToApprove: CurrencyAmount<Currency> | undefined,
  spender: Address
) {
  const token = amountToApprove?.currency?.isToken
    ? amountToApprove.currency
    : undefined;
  const needAllowance = useNeedAllowance(token, amountToApprove, spender);

  const approvalState: ApprovalStateType = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
    if (amountToApprove.currency.isNative) return ApprovalState.APPROVED;

    return needAllowance ? ApprovalState.NOT_APPROVED : ApprovalState.APPROVED;
  }, [amountToApprove, needAllowance, spender]);

  const { config } = usePrepareContractWrite({
    address: amountToApprove
      ? (amountToApprove.currency.wrapped.address as Address)
      : undefined,
    abi: erc20ABI,
    functionName: "approve",
    args: [
      spender,
      amountToApprove ? BigInt(amountToApprove.quotient.toString()) : 0,
    ] as [Address, bigint],
  });

  const { data: approvalData, writeAsync: approve } = useContractWrite(config);

  const { isLoading, isSuccess } = useTransitionAwait(
    approvalData?.hash,
    `Approve ${formatCurrency.format(
      Number(amountToApprove?.toSignificant())
    )} ${amountToApprove?.currency.symbol}`
  );

  return {
    approvalState: isLoading
      ? ApprovalState.PENDING
      : isSuccess && approvalState === ApprovalState.APPROVED
      ? ApprovalState.APPROVED
      : approvalState,
    approvalCallback: approve,
  };
}
