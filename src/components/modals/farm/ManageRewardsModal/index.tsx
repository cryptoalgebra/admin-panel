import Loader from "@/components/common/Loader";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { ALGEBRA_ETERNAL_FARMING } from "@/constants/addresses";
import { DEFAULT_CHAIN_ID } from "@/constants/default-chain-id";
import { eternalFarmingABI } from "@/generated";
import { useApprove } from "@/hooks/common/useApprove";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import { ApprovalState } from "@/types/approve-state";
import { IncentiveKey } from "@/types/incentive-key";
import {
  Token,
  tryParseAmount,
} from "@cryptoalgebra/integral-sdk";
import { useState } from "react";
import { parseUnits } from "viem";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

type ManageFunctions = "addRewards" | "setRates" | "decreaseRewardsAmount";

interface IManageRewardsModal {
  title: string;
  functionName: ManageFunctions;
  incentiveKey: IncentiveKey;
  rewardRates: [
    { value: bigint; decimals: number },
    { value: bigint; decimals: number }
  ];
  isBonus?: boolean;
  children: React.ReactNode;
}

const ManageRewardsModal = ({
  title,
  functionName,
  incentiveKey,
  rewardRates,
  isBonus = false,
  children,
}: IManageRewardsModal) => {
  const [value, setValue] = useState<string>("");

  const args =
    functionName === "setRates"
      ? isBonus
        ? [
            rewardRates[0].value,
            parseUnits(value as `${number}`, rewardRates[1].decimals),
          ]
        : [
            parseUnits(value as `${number}`, rewardRates[0].decimals),
            rewardRates[1].value,
          ]
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

  const {
    approvalState: approvalStateReward,
    approvalCallback: approvalCallbackReward,
  } = useApprove(parsedRewardAmount, ALGEBRA_ETERNAL_FARMING);

  const showApproveReward =
    (functionName === "addRewards" &&
      approvalStateReward === ApprovalState.NOT_APPROVED) ||
    approvalStateReward === ApprovalState.PENDING;

  const { config } = usePrepareContractWrite({
    address: ALGEBRA_ETERNAL_FARMING,
    abi: eternalFarmingABI,
    functionName,
    args: !showApproveReward ? [incentiveKey, args[0], args[1]] : undefined,
  });

  const { data, write } = useContractWrite(config);

  const { isLoading } = useTransitionAwait(data?.hash, title);

  return (
    <Credenza>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent className="bg-white !rounded-3xl">
        <CredenzaHeader>
          <CredenzaTitle>{title}</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="flex flex-col gap-4">
          <input
            required
            autoComplete="off"
            autoCorrect="off"
            className="w-full h-[42px] px-4 text-[18px] peer border outline-none rounded-2xl bg-inherit"
            pattern="^[0-9]*[.,]?[0-9]*$"
            spellCheck="false"
            inputMode="decimal"
            minLength={1}
            maxLength={100}
            value={value}
            placeholder="Enter amount"
            // onChange={(e) => {
            //     const value = e.target.value.replace(/,/g, ".")
            //     if (value === "" || RegExp(`^\\d*(?:\\\\[.])?\\d*$`).test(value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))) {
            //         setValue(value === '.' ? '0.' : value)
            //     }
            // }}
            onChange={(e) => {
              let value = e.target.value.replace(/,/g, ".");
              value =
                value.indexOf(".") >= 0
                  ? value.slice(
                      0,
                      value.indexOf(".") +
                        (isBonus
                          ? rewardRates[1].decimals
                          : rewardRates[0].decimals) +
                        1
                    )
                  : value;
              if (
                value === "" ||
                RegExp(`^\\d*(?:\\\\[.])?\\d*$`).test(
                  value.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                )
              ) {
                setValue(value === "." ? "0." : value);
              }
            }}
          />
          {showApproveReward ? (
            <button
              disabled={approvalStateReward !== ApprovalState.NOT_APPROVED}
              onClick={() => approvalCallbackReward && approvalCallbackReward()}
              className="flex justify-center w-full p-2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 disabled:bg-blue-400"
            >
              {approvalStateReward === ApprovalState.PENDING ? (
                <Loader />
              ) : (
                `Approve`
              )}
            </button>
          ) : (
            <button
              disabled={!value || isLoading}
              onClick={() => write && write()}
              className="flex justify-center w-full p-2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 disabled:bg-blue-400"
            >
              {isLoading ? <Loader color="currentColor" /> : "Confirm"}
            </button>
          )}
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};

export default ManageRewardsModal;
