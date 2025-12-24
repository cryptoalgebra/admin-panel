import { useCallback, useMemo } from "react";
import { Address, formatUnits } from "viem";
import { useAllTokens } from "@/hooks/tokens/useAllTokens";
import {
    useReadAlgebraPoolToken0,
    useReadAlgebraPoolToken1,
    useReadVoterGetCurrentPeriod,
    useReadVoterGetGauge,
    useReadVotingRewardGetRewardList,
    useReadVotingRewardTotalVotesInPeriod,
} from "@/generated";
import { useContractReads } from "wagmi";
import { useNativePriceUSD } from "../common/useNativePriceUSD";
import { RewardToken, VotingPool } from "@/types/gauge";
import { useCurrency } from "../common/useCurrency";
import { votingRewardABI } from "config/abis";

export function useVotingPool(poolAddress: Address | undefined) {
    const { tokens, isLoading: tokensLoading } = useAllTokens();

    const { data: gauge, refetch: refetchGauge } = useReadVoterGetGauge({
        args: poolAddress ? [poolAddress] : undefined,
        // enabled: !!poolAddress,
    });

    const { data: currentPeriod, isLoading: currentPeriodLoading } = useReadVoterGetCurrentPeriod();

    const nextPeriod = currentPeriod ? currentPeriod + 1n : 0n;

    const { data: totalVotesInPeriod, isLoading: totalVotesInPeriodLoading } = useReadVotingRewardTotalVotesInPeriod({
        address: gauge?.votingReward,
        args: [nextPeriod ?? 0n],
    });

    const { data: rewardList, isLoading: rewardListLoading } = useReadVotingRewardGetRewardList({
        address: gauge?.votingReward,
    });

    const { data: rewardsForPeriodResults, isLoading: rewardTokensLoading, refetch: refetchRewardTokens } = useContractReads({
        contracts: rewardList?.map((reward) => ({
            address: gauge?.votingReward,
            abi: votingRewardABI,
            functionName: "rewardForPeriod",
            args: [nextPeriod ?? 0n, reward],
        })),
        // enabled: rewardList && rewardList.length > 0,
    });

    const rewardsForPeriod = useMemo(() => rewardsForPeriodResults?.map((d) => d?.result as bigint), [rewardsForPeriodResults]);

    const { nativePriceUSD } = useNativePriceUSD();

    const formattedRewards: RewardToken[] = useMemo(() => {
        if (!rewardList || !rewardsForPeriod) return [];

        // helper
        const getDecimalsByTokenAddress = (tokenAddress: Address) => {
            const token = tokens.find((t) => t.id.toLowerCase() === tokenAddress.toLowerCase());
            return Number(token?.decimals || 18);
        };

        // helper
        const getPriceByTokenAddress = (tokenAddress: Address) => {
            const token = tokens.find((t) => t.id.toLowerCase() === tokenAddress.toLowerCase());
            return Number(token?.derivedMatic || 0) * nativePriceUSD;
        };

        return rewardList.map((token, i) => {
            const amount = rewardsForPeriod[i] ?? 0n;
            const decimals = getDecimalsByTokenAddress(token);
            const amountUsd = getPriceByTokenAddress(token) * Number(formatUnits(amount, decimals));

            return {
                address: token,
                amount,
                decimals,
                amountUsd,
            };
        });
    }, [nativePriceUSD, rewardList, rewardsForPeriod, tokens]);

    const { data: token0Address, isLoading: isLoadingToken0 } = useReadAlgebraPoolToken0({
        address: poolAddress,
    });
    const { data: token1Address, isLoading: isLoadingToken1 } = useReadAlgebraPoolToken1({
        address: poolAddress,
    });

    const token0 = useCurrency(token0Address);
    const token1 = useCurrency(token1Address);

    const votingPool: VotingPool | null = useMemo(() => {
        if (!gauge || !poolAddress || !token0 || !token1 || totalVotesInPeriod === undefined || !formattedRewards) return null;
        return {
            ...gauge,
            pool: poolAddress,
            token0: token0.wrapped,
            token1: token1.wrapped,
            poolVotesDeposited: totalVotesInPeriod ?? 0n,
            rewardTokenList: formattedRewards,
        };
    }, [gauge, poolAddress, token0, token1, totalVotesInPeriod, formattedRewards]);

    const isLoading =
        tokensLoading ||
        currentPeriodLoading ||
        rewardTokensLoading ||
        totalVotesInPeriodLoading ||
        isLoadingToken0 ||
        isLoadingToken1 ||
        rewardListLoading;

    const refetch = useCallback(() => {
        refetchGauge();
        refetchRewardTokens();
    }, [refetchGauge, refetchRewardTokens]);

    return { data: votingPool, isLoading, refetch };
}
