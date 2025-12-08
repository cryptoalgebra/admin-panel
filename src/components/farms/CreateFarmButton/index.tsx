import { eternalFarmingABI } from "config/abis";
import Loader from "@/components/common/Loader";
import { ALGEBRA_ETERNAL_FARMING } from "config/contract-addresses";
import { DEFAULT_CHAIN_ID } from "config/default-chain";
import { useReadAlgebraPoolPlugin } from "@/generated";
import { useApprove } from "@/hooks/common/useApprove";
import { useCurrency } from "@/hooks/common/useCurrency";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { ApprovalState } from "@/types/approve-state";
import { PartialIncentiveKey } from "@/types/incentive-key";
import { IRewards } from "@/types/rewards";
import { tryParseAmount } from "@cryptoalgebra/integral-sdk";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Address } from "viem";
import { useAccount, useBalance, useWriteContract } from "wagmi";

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
    const { address: account } = useAccount();

    const { data: plugin } = useReadAlgebraPoolPlugin({
        address: pool,
    });

    const isKeyReady = rewardToken && pool && plugin && nonce !== undefined && (hasSecondReward ? Boolean(bonusRewardToken) : true);

    const areRewardsReady = rewardBn && rewardRateBn && (hasSecondReward ? Boolean(bonusRewardBn && bonusRewardRateBn) : true);

    const rewardCurrency = useCurrency(rewardToken);
    const bonusRewardCurrency = useCurrency(bonusRewardToken);

    const { data: rewardBalance } = useBalance({
        address: account,
        token: rewardToken as Address,
    });

    const { data: bonusRewardBalance } = useBalance({
        address: account,
        token: bonusRewardToken as Address,
    });

    const isRewardBalanceInsufficient = rewardBn && rewardBalance ? rewardBn > rewardBalance.value : false;
    const isBonusRewardBalanceInsufficient =
        hasSecondReward && bonusRewardBn && bonusRewardBalance ? bonusRewardBn > bonusRewardBalance.value : false;

    const [parsedRewardAmount, parsedBonusRewardAmount] = [
        tryParseAmount(reward, rewardCurrency),
        tryParseAmount(bonusReward, bonusRewardCurrency),
    ];

    const { approvalState: approvalStateReward, approvalCallback: approvalCallbackReward } = useApprove(
        parsedRewardAmount,
        ALGEBRA_ETERNAL_FARMING[DEFAULT_CHAIN_ID]
    );
    const { approvalState: approvalStateBonusReward, approvalCallback: approvalCallbackBonusReward } = useApprove(
        parsedBonusRewardAmount,
        ALGEBRA_ETERNAL_FARMING[DEFAULT_CHAIN_ID]
    );

    const showApproveReward = approvalStateReward === ApprovalState.NOT_APPROVED || approvalStateReward === ApprovalState.PENDING;
    const showApproveBonusReward =
        approvalStateBonusReward === ApprovalState.NOT_APPROVED || approvalStateBonusReward === ApprovalState.PENDING;

    const { data, writeContract: onCreate, isPending } = useWriteContract();

    const { isLoading, isSuccess } = useTransactionAwait(data, `Create Farm`);

    useEffect(() => {
        if (isSuccess) {
            navigate("/farms");
        }
    }, [isSuccess, navigate]);

    const isDisabled =
        !isKeyReady || !areRewardsReady || isLoading || isPending || isRewardBalanceInsufficient || isBonusRewardBalanceInsufficient;

    if (isRewardBalanceInsufficient || isBonusRewardBalanceInsufficient) {
        return (
            <div className="flex flex-col gap-2">
                <button disabled className="flex justify-center py-3 px-4 bg-neutral-400 text-white text-sm rounded-lg cursor-not-allowed">
                    Insufficient {isRewardBalanceInsufficient ? rewardCurrency?.symbol : bonusRewardCurrency?.symbol} balance
                </button>
            </div>
        );
    }

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
            onClick={() => {
                if (isKeyReady && areRewardsReady && !showApproveReward && !showApproveBonusReward) {
                    onCreate({
                        address: ALGEBRA_ETERNAL_FARMING[DEFAULT_CHAIN_ID],
                        abi: eternalFarmingABI,
                        functionName: "createEternalFarming",
                        args: [
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
                        ],
                    });
                }
            }}
            type={"submit"}
            className="flex justify-center py-3 px-4 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors"
        >
            {isLoading || isPending ? <Loader color="currentColor" /> : "Create Farm"}
        </button>
    );
};

export default CreateFarmButton;
