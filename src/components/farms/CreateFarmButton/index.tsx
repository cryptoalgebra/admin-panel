import { eternalFarmingABI } from "@/abis";
import Loader from "@/components/common/Loader";
import { ALGEBRA_ETERNAL_FARMING } from "@/constants/addresses";
import { useAlgebraPoolPlugin } from "@/generated";
import { useApprove } from "@/hooks/common/useApprove";
import { useCurrency } from "@/hooks/common/useCurrency";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import { ApprovalState } from "@/types/approve-state";
import { PartialIncentiveKey } from "@/types/incentive-key";
import { IRewards } from "@/types/rewards";
import { tryParseAmount } from "@cryptoalgebra/integral-sdk";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

interface ICreateFarmButton {
    hasSecondReward: boolean;
    incentiveKey: PartialIncentiveKey;
    rewards: IRewards;
}

const CreateFarmButton = ({
    hasSecondReward,
    incentiveKey: { rewardToken, bonusRewardToken, pool, nonce },
    rewards: { reward, rewardBn, rewardRateBn, bonusReward, bonusRewardBn, bonusRewardRateBn },
}: ICreateFarmButton) => {
    const navigate = useNavigate();

    const { data: plugin } = useAlgebraPoolPlugin({
        address: pool,
    });

    const isKeyReady = rewardToken && pool && plugin && nonce !== undefined && (hasSecondReward ? Boolean(bonusRewardToken) : true);

    const areRewardsReady = rewardBn && rewardRateBn && (hasSecondReward ? Boolean(bonusRewardBn && bonusRewardRateBn) : true);

    const rewardCurrency = useCurrency(rewardToken);
    const bonusRewardCurrency = useCurrency(bonusRewardToken);

    const [parsedRewardAmount, parsedBonusRewardAmount] = [
        tryParseAmount(reward, rewardCurrency),
        tryParseAmount(bonusReward, bonusRewardCurrency),
    ];

    const { approvalState: approvalStateReward, approvalCallback: approvalCallbackReward } = useApprove(
        parsedRewardAmount,
        ALGEBRA_ETERNAL_FARMING
    );
    const { approvalState: approvalStateBonusReward, approvalCallback: approvalCallbackBonusReward } = useApprove(
        parsedBonusRewardAmount,
        ALGEBRA_ETERNAL_FARMING
    );

    const showApproveReward = approvalStateReward === ApprovalState.NOT_APPROVED || approvalStateReward === ApprovalState.PENDING;
    const showApproveBonusReward =
        approvalStateBonusReward === ApprovalState.NOT_APPROVED || approvalStateBonusReward === ApprovalState.PENDING;

    const { config } = usePrepareContractWrite({
        address: ALGEBRA_ETERNAL_FARMING,
        abi: eternalFarmingABI,
        functionName: "createEternalFarming",
        args:
            isKeyReady && areRewardsReady && !showApproveReward && !showApproveBonusReward
                ? [
                      {
                          rewardToken,
                          bonusRewardToken: bonusRewardToken || "0x0000000000000000000000000000000000000000",
                          pool,
                          nonce,
                      },
                      {
                          reward: rewardBn,
                          rewardRate: rewardRateBn,
                          bonusReward: bonusRewardBn || 0n,
                          bonusRewardRate: bonusRewardRateBn || 0n,
                          minimalPositionWidth: 0,
                      },
                      plugin,
                  ]
                : undefined,
    });

    const { data, write: onCreate } = useContractWrite(config);

    const { isLoading, isSuccess } = useTransitionAwait(data?.hash, `Create Farm`);

    useEffect(() => {
        if (isSuccess) {
            navigate("/farms");
        }
    }, [isSuccess, navigate]);

    const isDisabled = !isKeyReady || !areRewardsReady || !onCreate || isLoading;

    if (showApproveReward)
        return (
            <button
                disabled={approvalStateReward !== ApprovalState.NOT_APPROVED}
                onClick={() => approvalCallbackReward && approvalCallbackReward()}
                className="flex justify-center py-3 px-4 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors"
            >
                {approvalStateReward === ApprovalState.PENDING ? (
                    <Loader />
                ) : approvalStateReward === ApprovalState.APPROVED ? (
                    "Approved"
                ) : (
                    `Approve ${rewardCurrency?.symbol}`
                )}
            </button>
        );

    if (showApproveBonusReward)
        return (
            <button
                disabled={approvalStateBonusReward !== ApprovalState.NOT_APPROVED}
                onClick={() => approvalCallbackBonusReward && approvalCallbackBonusReward()}
                className="flex justify-center py-3 px-4 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors"
            >
                {approvalStateBonusReward === ApprovalState.PENDING ? (
                    <Loader />
                ) : approvalStateBonusReward === ApprovalState.APPROVED ? (
                    "Approved"
                ) : (
                    `Approve ${bonusRewardCurrency?.symbol}`
                )}
            </button>
        );

    return (
        <button
            disabled={isDisabled}
            onClick={() => onCreate && onCreate()}
            type={"submit"}
            className="flex justify-center py-3 px-4 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors"
        >
            {isLoading ? <Loader color="currentColor" /> : "Create Farm"}
        </button>
    );
};

export default CreateFarmButton;
