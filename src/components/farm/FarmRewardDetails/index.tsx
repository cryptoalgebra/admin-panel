import Loader from "@/components/common/Loader";
import ManageRewardsModal from "@/components/modals/farm/ManageRewardsModal";
import { useEthersSigner } from "@/hooks/common/useEthersProvider";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import { cn } from "@/lib/utils";
import { IncentiveKey, PartialIncentiveKey } from "@/types/incentive-key";
import { addRewardTokenToDistributor, getTokenRewardAddresses, getVaultsByPool } from "@cryptoalgebra/alm-sdk";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import { Address, useAccount, useChainId } from "wagmi";
import { FetchTokenResult } from "wagmi/actions";

interface IFarmRewardDetails {
    token: FetchTokenResult;
    rate: number | undefined;
    reward: string;
    incentiveKey: PartialIncentiveKey;
    rewardRates: [{ value: bigint; decimals: number }, { value: bigint; decimals: number }];
    isDeactivated: boolean;
    isBonus?: boolean;
}

const RewardRateSpan = {
    SECOND: "SECOND",
    DAY: "DAY",
    MONTH: "MONTH",
};

const RewardLeftForSpan = {
    MINUTES: "MINUTES",
    HOURS: "HOURS",
    DAYS: "DAYS",
};

const FarmRewardDetails = ({ token, rate, reward, incentiveKey, isBonus, rewardRates, isDeactivated }: IFarmRewardDetails) => {
    const [rewardRateSpan, setRewardRateSpan] = useState(RewardRateSpan.SECOND);
    const [rewardLeftForSpan, setRewardLeftForSpan] = useState(RewardLeftForSpan.MINUTES);

    const rewardRate = useMemo(() => {
        const ratePerSecond = rate || 0;
        const ratePerDay = ((rate || 0) * 60 * 60 * 24).toFixed(2);
        const ratePerMonth = (+ratePerDay * 30).toFixed(2);

        switch (rewardRateSpan) {
            case RewardRateSpan.SECOND:
                return `${ratePerSecond} ${token.symbol} per sec`;
            case RewardRateSpan.DAY:
                return `${ratePerDay} ${token.symbol} per day`;
            case RewardRateSpan.MONTH:
                return `${ratePerMonth} ${token.symbol} per month`;
            default:
                return `${ratePerSecond} ${token.symbol} per sec`;
        }
    }, [rewardRateSpan, token, rate]);

    const rewardLeftFor = useMemo(() => {
        const leftForMinutes = (Number(reward) / Number(rate || 0) / 60).toFixed(0);
        const leftForHours = (+leftForMinutes / 60).toFixed(0);
        const leftForDays = (+leftForHours / 24).toFixed(0);

        switch (rewardLeftForSpan) {
            case RewardLeftForSpan.MINUTES:
                return `${leftForMinutes} min`;
            case RewardLeftForSpan.HOURS:
                return `${leftForHours} hr`;
            case RewardLeftForSpan.DAYS:
                return `${leftForDays} days`;
        }

        return;
    }, [rewardLeftForSpan, rate, reward]);

    const { address: account } = useAccount();
    const chainId = useChainId();
    const ethersProvider = useEthersSigner();

    const { data: isRewardEnabledForALM, isLoading: isRewardEnabledForALMLoading, error: almError } = useSWR(
        [`isReward${reward}Enabled`, incentiveKey, chainId, token, ethersProvider],
        async () => {
            if (!incentiveKey.pool || !token || !ethersProvider) throw new Error("No incentive key or provider");
            const pool = incentiveKey.pool;
            const vaultAddresses: string[] = await getVaultsByPool(pool, chainId);

            const tokenRewardAddresses = await getTokenRewardAddresses(vaultAddresses[0], ethersProvider);

            return tokenRewardAddresses.includes(token.address);
        }
    );

    const [almTxHash, setAlmTxHash] = useState<Address>();

    const onEnableAlmFarming = useCallback(async () => {
        if (!ethersProvider || !incentiveKey?.pool || !account || !token) return;
        const pool = incentiveKey.pool;

        const vaultAddresses: string[] = await getVaultsByPool(pool, chainId);

        const tx = await addRewardTokenToDistributor(account, vaultAddresses[0], token.address, ethersProvider);
        setAlmTxHash(tx.hash as Address);
    }, [account, chainId, ethersProvider, incentiveKey.pool, token]);

    const { isLoading: isLoadingAlm } = useTransitionAwait(almTxHash, `Add reward to ALM Farming Distributor`);

    return (
        <div className="text-left p-4 border rounded-xl">
            <div className="flex items-center justify-between mb-4">
                <div className="font-bold">{`${token.symbol} Reward`}</div>
                <div className="text-gray-600">{isBonus ? "Reward 2" : "Reward 1"}</div>
            </div>
            <div className="text-xl font-bold mb-4">{`${reward} ${token.symbol}`}</div>
            {!isDeactivated && (
                <>
                    <div className="mb-4">
                        <div className="font-semibold text-sm mb-2">Distribution Rate</div>
                        <div className="flex items-center justify-between">
                            <div>{rewardRate}</div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setRewardRateSpan(RewardRateSpan.SECOND)}
                                    className={cn(
                                        "py-1 px-2 rounded-md",
                                        rewardRateSpan === RewardRateSpan.SECOND ? "bg-blue-500 text-white font-bold border" : "border"
                                    )}
                                >
                                    Sec
                                </button>
                                <button
                                    onClick={() => setRewardRateSpan(RewardRateSpan.DAY)}
                                    className={cn(
                                        "py-1 px-2 rounded-md",
                                        rewardRateSpan === RewardRateSpan.DAY ? "bg-blue-500 text-white font-bold border" : "border"
                                    )}
                                >
                                    Day
                                </button>
                                <button
                                    onClick={() => setRewardRateSpan(RewardRateSpan.MONTH)}
                                    className={cn(
                                        "py-1 px-2 rounded-md",
                                        rewardRateSpan === RewardRateSpan.MONTH ? "bg-blue-500 text-white font-bold border" : "border"
                                    )}
                                >
                                    Month
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-sm mb-2">Rewards left for</div>
                        <div className="flex items-center justify-between">
                            <div>{rewardLeftFor}</div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setRewardLeftForSpan(RewardLeftForSpan.MINUTES)}
                                    className={cn(
                                        "py-1 px-2 rounded-md",
                                        rewardLeftForSpan === RewardLeftForSpan.MINUTES
                                            ? "bg-blue-500 text-white font-bold border"
                                            : "border"
                                    )}
                                >
                                    Min
                                </button>
                                <button
                                    onClick={() => setRewardLeftForSpan(RewardLeftForSpan.HOURS)}
                                    className={cn(
                                        "py-1 px-2 rounded-md",
                                        rewardLeftForSpan === RewardLeftForSpan.HOURS ? "bg-blue-500 text-white font-bold border" : "border"
                                    )}
                                >
                                    Hour
                                </button>
                                <button
                                    onClick={() => setRewardLeftForSpan(RewardLeftForSpan.DAYS)}
                                    className={cn(
                                        "py-1 px-2 rounded-md",
                                        rewardLeftForSpan === RewardLeftForSpan.DAYS ? "bg-blue-500 text-white font-bold border" : "border"
                                    )}
                                >
                                    Day
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="flex gap-4 w-full mt-8 text-white">
                {!isDeactivated && (
                    <ManageRewardsModal
                        title={"Refill"}
                        functionName={"addRewards"}
                        incentiveKey={incentiveKey as IncentiveKey}
                        rewardRates={rewardRates}
                        isBonus={isBonus}
                    >
                        <button className="w-full p-2 bg-blue-500 font-bold rounded-xl hover:bg-blue-400">Refill</button>
                    </ManageRewardsModal>
                )}
                <ManageRewardsModal
                    title={"Withdraw"}
                    functionName={"decreaseRewardsAmount"}
                    incentiveKey={incentiveKey as IncentiveKey}
                    rewardRates={rewardRates}
                    isBonus={isBonus}
                >
                    <button className="w-full p-2 bg-blue-500 font-bold rounded-xl hover:bg-blue-400">Withdraw</button>
                </ManageRewardsModal>
                {!isDeactivated && (
                    <ManageRewardsModal
                        title={"Change Rate per second"}
                        functionName={"setRates"}
                        incentiveKey={incentiveKey as IncentiveKey}
                        rewardRates={rewardRates}
                        isBonus={isBonus}
                    >
                        <button className="w-full p-2 bg-blue-500 font-bold rounded-xl hover:bg-blue-400">Change Rate</button>
                    </ManageRewardsModal>
                )}
            </div>
            {!almError && (
                <button
                    onClick={onEnableAlmFarming}
                    disabled={isRewardEnabledForALM || isLoadingAlm || isRewardEnabledForALMLoading}
                    className="w-full p-2 mt-4 border flex items-center justify-center border-blue-500 font-bold rounded-xl hover:bg-blue-500 hover:text-white disabled:opacity-60 disabled:hover:bg-white disabled:hover:text-black"
                >
                    {isLoadingAlm || isRewardEnabledForALMLoading ? (
                        <Loader color="black" />
                    ) : isRewardEnabledForALM ? (
                        "Enabled for alm"
                    ) : (
                        "Enable for ALM"
                    )}
                </button>
            )}
        </div>
    );
};

export default FarmRewardDetails;
