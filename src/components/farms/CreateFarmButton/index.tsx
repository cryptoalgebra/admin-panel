import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
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
import { algebraEternalFarmingABI } from "config/abis";

interface ICreateFarmButton {
    hasSecondReward: boolean;
    incentiveKey: PartialIncentiveKey;
    rewards: IRewards;
    minimalPositionWidth: number;
    poolDeployer: Address;
}

const CreateFarmButton = ({
    hasSecondReward,
    incentiveKey: { rewardToken, bonusRewardToken, pool, nonce },
    rewards: { reward, rewardBn, rewardRateBn, bonusReward, bonusRewardBn, bonusRewardRateBn },
    minimalPositionWidth,
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

    const { isLoading, isSuccess } = useTransactionAwait(data, { title: "Create Farm" });

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
                <Button disabled className="w-full">
                    Insufficient {isRewardBalanceInsufficient ? rewardCurrency?.symbol : bonusRewardCurrency?.symbol} balance
                </Button>
            </div>
        );
    }

    if (showApproveReward)
        return (
            <Button
                disabled={approvalStateReward !== ApprovalState.NOT_APPROVED}
                onClick={() => approvalCallbackReward && approvalCallbackReward()}
                className="w-full"
            >
                {approvalStateReward === ApprovalState.PENDING ? (
                    <Loader />
                ) : approvalStateReward === ApprovalState.APPROVED ? (
                    "Approved"
                ) : (
                    `Approve ${rewardCurrency?.symbol}`
                )}
            </Button>
        );

    if (showApproveBonusReward)
        return (
            <Button
                disabled={approvalStateBonusReward !== ApprovalState.NOT_APPROVED}
                onClick={() => approvalCallbackBonusReward && approvalCallbackBonusReward()}
                className="w-full"
            >
                {approvalStateBonusReward === ApprovalState.PENDING ? (
                    <Loader />
                ) : approvalStateBonusReward === ApprovalState.APPROVED ? (
                    "Approved"
                ) : (
                    `Approve ${bonusRewardCurrency?.symbol}`
                )}
            </Button>
        );

    return (
        <Button
            disabled={isDisabled}
            onClick={() => {
                if (isKeyReady && areRewardsReady && !showApproveReward && !showApproveBonusReward) {
                    onCreate({
                        address: ALGEBRA_ETERNAL_FARMING[DEFAULT_CHAIN_ID],
                        abi: algebraEternalFarmingABI,
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
                                minimalPositionWidth,
                            },
                            plugin,
                        ],
                    });
                }
            }}
            type={"submit"}
            className="w-full"
        >
            {isLoading || isPending ? <Loader color="currentColor" /> : "Create Farm"}
        </Button>
    );
};

export default CreateFarmButton;
