import { ApprovalState, ApprovalStateType } from "@/types/approve-state";
import { useMemo } from "react";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useVoterIsWhitelisted, voterABI } from "@/generated";
import { VOTER } from "@/constants/addresses";
import { useTransitionAwait } from "../common/useTransactionAwait";

export function useWhitelistForGauge(tokenAddress: Address | undefined) {
    const { data: isWhitelisted } = useVoterIsWhitelisted({
        args: [tokenAddress] as [Address],
    });

    const approvalState: ApprovalStateType = useMemo(() => {
        return !isWhitelisted ? ApprovalState.NOT_APPROVED : ApprovalState.APPROVED;
    }, [isWhitelisted]);

    const { config } = usePrepareContractWrite({
        address: VOTER,
        abi: voterABI,
        functionName: "setTokenStatus",
        args: [tokenAddress, true] as [Address, boolean],
        enabled: !!tokenAddress,
    });

    const { data: approvalData, writeAsync: approve, isLoading: isPending } = useContractWrite(config);

    const { isLoading, isSuccess } = useTransitionAwait(approvalData?.hash, `Whitelist for Gauge`);

    return {
        approvalState:
            isLoading || isPending
                ? ApprovalState.PENDING
                : isSuccess || approvalState === ApprovalState.APPROVED
                ? ApprovalState.APPROVED
                : approvalState,
        approvalCallback: approve,
    };
}
