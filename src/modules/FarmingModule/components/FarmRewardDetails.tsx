import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import ManageRewardsModal from "./ManageRewardsModal";
import { useEthersSigner } from "@/hooks/common/useEthersProvider";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { IncentiveKey, PartialIncentiveKey } from "@/types/incentive-key";
import { addRewardTokenToDistributor, getTokenRewardAddresses, getVaultsByPool } from "@cryptoalgebra/alm-sdk";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import { useAccount, useChainId } from "wagmi";
import { Address } from "viem";
import { Gift } from "lucide-react";

interface FetchTokenResult {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
}

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

    const { isLoading: isLoadingAlm } = useTransactionAwait(almTxHash, { title: "Add reward to ALM Farming Distributor" });

    return (
        <div className="flex flex-col text-left p-6 bg-card border border-border rounded-lg transition-colors">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-bg-200 rounded-xl">
                        <Gift size={18} className="text-text" />
                    </div>
                    <h3 className="font-semibold text-lg text-text">{token.symbol} Reward</h3>
                </div>
                <span className="text-xs font-medium text-text/50 bg-bg-200 px-2 py-1 rounded-full">
                    {isBonus ? "Reward 2" : "Reward 1"}
                </span>
            </div>

            {/* Reward Amount */}
            <div className="p-4 bg-bg-200 rounded-lg border border-border mb-6">
                <p className="text-xs text-text/50 mb-1">Total Reward</p>
                <p className="text-2xl font-semibold text-text">
                    {reward} {token.symbol}
                </p>
            </div>

            {!isDeactivated && (
                <>
                    {/* Distribution Rate */}
                    <div className="mb-5">
                        <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-2">Distribution Rate</p>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-text">{rewardRate}</p>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant={rewardRateSpan === RewardRateSpan.SECOND ? "primary" : "outline"}
                                    onClick={() => setRewardRateSpan(RewardRateSpan.SECOND)}
                                    className="h-7 px-2 text-xs"
                                >
                                    Sec
                                </Button>
                                <Button
                                    size="sm"
                                    variant={rewardRateSpan === RewardRateSpan.DAY ? "primary" : "outline"}
                                    onClick={() => setRewardRateSpan(RewardRateSpan.DAY)}
                                    className="h-7 px-2 text-xs"
                                >
                                    Day
                                </Button>
                                <Button
                                    size="sm"
                                    variant={rewardRateSpan === RewardRateSpan.MONTH ? "primary" : "outline"}
                                    onClick={() => setRewardRateSpan(RewardRateSpan.MONTH)}
                                    className="h-7 px-2 text-xs"
                                >
                                    Month
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Rewards Left */}
                    <div>
                        <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-2">Rewards Left For</p>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-text">{rewardLeftFor}</p>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant={rewardLeftForSpan === RewardLeftForSpan.MINUTES ? "primary" : "outline"}
                                    onClick={() => setRewardLeftForSpan(RewardLeftForSpan.MINUTES)}
                                    className="h-7 px-2 text-xs"
                                >
                                    Min
                                </Button>
                                <Button
                                    size="sm"
                                    variant={rewardLeftForSpan === RewardLeftForSpan.HOURS ? "primary" : "outline"}
                                    onClick={() => setRewardLeftForSpan(RewardLeftForSpan.HOURS)}
                                    className="h-7 px-2 text-xs"
                                >
                                    Hour
                                </Button>
                                <Button
                                    size="sm"
                                    variant={rewardLeftForSpan === RewardLeftForSpan.DAYS ? "primary" : "outline"}
                                    onClick={() => setRewardLeftForSpan(RewardLeftForSpan.DAYS)}
                                    className="h-7 px-2 text-xs"
                                >
                                    Day
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 w-full mt-6 pt-4 border-t border-border">
                {!isDeactivated && (
                    <ManageRewardsModal
                        title={"Refill"}
                        functionName={"addRewards"}
                        incentiveKey={incentiveKey as IncentiveKey}
                        rewardRates={rewardRates}
                        isBonus={isBonus}
                    >
                        <Button className="flex-1">Refill</Button>
                    </ManageRewardsModal>
                )}
                <ManageRewardsModal
                    title={"Withdraw"}
                    functionName={"decreaseRewardsAmount"}
                    incentiveKey={incentiveKey as IncentiveKey}
                    rewardRates={rewardRates}
                    isBonus={isBonus}
                >
                    <Button variant="outline" className="flex-1">
                        Withdraw
                    </Button>
                </ManageRewardsModal>
                {!isDeactivated && (
                    <ManageRewardsModal
                        title={"Change Rate per second"}
                        functionName={"setRates"}
                        incentiveKey={incentiveKey as IncentiveKey}
                        rewardRates={rewardRates}
                        isBonus={isBonus}
                    >
                        <Button variant="outline" className="flex-1">
                            Change Rate
                        </Button>
                    </ManageRewardsModal>
                )}
            </div>

            {/* ALM Integration */}
            {!almError && (
                <Button
                    onClick={onEnableAlmFarming}
                    disabled={isRewardEnabledForALM || isLoadingAlm || isRewardEnabledForALMLoading}
                    variant="outline"
                    className="w-full mt-4"
                >
                    {isLoadingAlm || isRewardEnabledForALMLoading ? (
                        <Loader color="currentColor" />
                    ) : isRewardEnabledForALM ? (
                        "Enabled for ALM"
                    ) : (
                        "Enable for ALM"
                    )}
                </Button>
            )}
        </div>
    );
};

export default FarmRewardDetails;
