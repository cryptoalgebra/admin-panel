import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { ALGEBRA_ETERNAL_FARMING } from "config/contract-addresses";
import { DEFAULT_CHAIN_ID } from "config/default-chain";
import { useApprove } from "@/hooks/common/useApprove";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { ApprovalState } from "@/types/approve-state";
import { IncentiveKey } from "@/types/incentive-key";
import { Token, tryParseAmount } from "@cryptoalgebra/integral-sdk";
import { useState } from "react";
import { parseUnits } from "viem";
import { useWriteContract } from "wagmi";
import { algebraEternalFarmingABI } from "config/abis";

type ManageFunctions = "addRewards" | "setRates" | "decreaseRewardsAmount";

interface IManageRewardsModal {
    title: string;
    functionName: ManageFunctions;
    incentiveKey: IncentiveKey;
    rewardRates: [{ value: bigint; decimals: number }, { value: bigint; decimals: number }];
    isBonus?: boolean;
    children: React.ReactNode;
}

const ManageRewardsModal = ({ title, functionName, incentiveKey, rewardRates, isBonus = false, children }: IManageRewardsModal) => {
    const [value, setValue] = useState<string>("");

    const args =
        functionName === "setRates"
            ? isBonus
                ? [rewardRates[0].value, parseUnits(value as `${number}`, rewardRates[1].decimals)]
                : [parseUnits(value as `${number}`, rewardRates[0].decimals), rewardRates[1].value]
            : isBonus
              ? [0n, parseUnits(value as `${number}`, rewardRates[1].decimals)]
              : [parseUnits(value as `${number}`, rewardRates[0].decimals), 0n];

    const parsedRewardAmount = tryParseAmount(
        value,
        new Token(
            DEFAULT_CHAIN_ID,
            isBonus ? incentiveKey.bonusRewardToken : incentiveKey.rewardToken,
            isBonus ? rewardRates[1].decimals : rewardRates[0].decimals
        )
    );

    const { approvalState: approvalStateReward, approvalCallback: approvalCallbackReward } = useApprove(
        parsedRewardAmount,
        ALGEBRA_ETERNAL_FARMING[DEFAULT_CHAIN_ID]
    );

    const showApproveReward =
        (functionName === "addRewards" && approvalStateReward === ApprovalState.NOT_APPROVED) ||
        approvalStateReward === ApprovalState.PENDING;

    const { data, writeContract, isPending } = useWriteContract();

    const { isLoading } = useTransactionAwait(data, { title });

    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white rounded-lg">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className="flex flex-col gap-4">
                    <input
                        required
                        autoComplete="off"
                        autoCorrect="off"
                        className="w-full h-[42px] px-4 text-sm border border-border outline-none rounded-lg bg-inherit focus:border-text/40 transition-colors"
                        pattern="^[0-9]*[.,]?[0-9]*$"
                        spellCheck="false"
                        inputMode="decimal"
                        minLength={1}
                        maxLength={100}
                        value={value}
                        placeholder="Enter amount"
                        onChange={(e) => {
                            let value = e.target.value.replace(/,/g, ".");
                            value =
                                value.indexOf(".") >= 0
                                    ? value.slice(0, value.indexOf(".") + (isBonus ? rewardRates[1].decimals : rewardRates[0].decimals) + 1)
                                    : value;
                            if (
                                value === "" ||
                                RegExp(`^\\d*(?:\\\\[.])?\\d*$`).test(value.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
                            ) {
                                setValue(value === "." ? "0." : value);
                            }
                        }}
                    />
                    {showApproveReward ? (
                        <Button
                            disabled={approvalStateReward !== ApprovalState.NOT_APPROVED}
                            onClick={() => approvalCallbackReward && approvalCallbackReward()}
                            className="w-full"
                        >
                            {approvalStateReward === ApprovalState.PENDING ? <Loader /> : `Approve`}
                        </Button>
                    ) : (
                        <Button
                            disabled={!value || isLoading || isPending}
                            onClick={() =>
                                writeContract({
                                    address: ALGEBRA_ETERNAL_FARMING[DEFAULT_CHAIN_ID],
                                    abi: algebraEternalFarmingABI,
                                    functionName,
                                    args: [incentiveKey, args[0], args[1]],
                                })
                            }
                            className="w-full"
                        >
                            {isLoading || isPending ? <Loader color="currentColor" /> : "Confirm"}
                        </Button>
                    )}
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ManageRewardsModal;
