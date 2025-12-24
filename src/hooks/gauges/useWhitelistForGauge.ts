import { ApprovalState, ApprovalStateType } from "@/types/approve-state";
import { useCallback, useMemo } from "react";
import { Address } from "viem";
import { useReadVoterIsWhitelisted, useWriteVoterSetTokenStatus } from "@/generated";
import { useTransactionAwait } from "../common/useTransactionAwait";

export function useWhitelistForGauge(tokenAddress: Address | undefined) {
    const { data: isWhitelisted } = useReadVoterIsWhitelisted({
        args: [tokenAddress] as [Address],
    });

    const approvalState: ApprovalStateType = useMemo(() => {
        return !isWhitelisted ? ApprovalState.NOT_APPROVED : ApprovalState.APPROVED;
    }, [isWhitelisted]);

    const { writeContractAsync, data: hash, isPending } = useWriteVoterSetTokenStatus();

    const onApprove = useCallback(async () => {
        if (!tokenAddress) return;

        await writeContractAsync({
            args: [tokenAddress, true],
        });
    }, [tokenAddress, writeContractAsync]);

    const { isLoading, isSuccess } = useTransactionAwait(hash, { title: "Whitelist for Gauge" });

    return {
        approvalState:
            isLoading || isPending
                ? ApprovalState.PENDING
                : isSuccess || approvalState === ApprovalState.APPROVED
                ? ApprovalState.APPROVED
                : approvalState,
        approvalCallback: onApprove,
    };
}
