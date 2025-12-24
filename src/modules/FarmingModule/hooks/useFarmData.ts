import {
    useReadAlgebraPoolToken0,
    useReadAlgebraPoolToken1,
    useReadAlgebraVirtualPoolDynamicRateActivated,
    useReadAlgebraVirtualPoolRewardRates,
    useReadAlgebraVirtualPoolRewardReserves,
} from "@/generated";
import { FarmingFieldsFragment, useCustomPoolDeployerQuery } from "@/graphql/generated/graphql";
import { ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk";
import { formatUnits, Address, erc20Abi } from "viem";
import { useReadContracts } from "wagmi";

export function useTokenInfo(address: Address | undefined) {
    const { data } = useReadContracts({
        allowFailure: false,
        contracts: address
            ? [
                  { address, abi: erc20Abi, functionName: "symbol" },
                  { address, abi: erc20Abi, functionName: "name" },
                  { address, abi: erc20Abi, functionName: "decimals" },
              ]
            : undefined,
    });

    if (!data) return undefined;

    return {
        address,
        symbol: data[0],
        name: data[1],
        decimals: data[2],
    };
}

export function useFarmData(farm: FarmingFieldsFragment | null | undefined) {
    const { pool, rewardToken, bonusRewardToken, nonce, isDeactivated, virtualPool, minRangeLength } = farm || {};

    const { data: poolDeployer } = useCustomPoolDeployerQuery({
        variables: {
            poolId: pool?.toLowerCase() || "",
        },
    });

    const { data: rates } = useReadAlgebraVirtualPoolRewardRates({
        address: virtualPool,
    });

    const { data: rewardReserves } = useReadAlgebraVirtualPoolRewardReserves({
        address: virtualPool,
    });

    const [reward, bonusReward] = rewardReserves || [0n, 0n];
    const [rewardRate, bonusRewardRate] = rates || [0n, 0n];

    const { data: _token0 } = useReadAlgebraPoolToken0({
        address: pool,
    });

    const { data: _token1 } = useReadAlgebraPoolToken1({
        address: pool,
    });

    const token0 = useTokenInfo(_token0);
    const token1 = useTokenInfo(_token1);

    const _rewardToken = useTokenInfo(rewardToken === ADDRESS_ZERO ? undefined : (rewardToken as Address));
    const _bonusRewardToken = useTokenInfo(bonusRewardToken === ADDRESS_ZERO ? undefined : (bonusRewardToken as Address));

    const { data: isDynamicRateActivated } = useReadAlgebraVirtualPoolDynamicRateActivated({
        address: virtualPool,
    });

    const formattedReward = _rewardToken ? Number(formatUnits(BigInt(reward), _rewardToken.decimals)).toFixed(3) : undefined;
    const formattedBonusReward = _bonusRewardToken
        ? Number(formatUnits(BigInt(bonusReward), _bonusRewardToken.decimals)).toFixed(3)
        : undefined;

    const formattedRewardRate = _rewardToken ? Number(formatUnits(BigInt(rewardRate), _rewardToken.decimals)) : undefined;
    const formattedBonusRewardRate = _bonusRewardToken
        ? Number(formatUnits(BigInt(bonusRewardRate), _bonusRewardToken.decimals))
        : undefined;

    const rewardRates: [{ value: bigint; decimals: number }, { value: bigint; decimals: number }] = [
        { value: BigInt(rewardRate || 0), decimals: _rewardToken?.decimals || 0 },
        {
            value: BigInt(bonusRewardRate || 0),
            decimals: _bonusRewardToken?.decimals || 0,
        },
    ];

    return {
        token0,
        token1,
        pool,
        virtualPool,
        rewardToken: _rewardToken,
        bonusRewardToken: _bonusRewardToken,
        reward: formattedReward,
        bonusReward: formattedBonusReward,
        rewardRate: formattedRewardRate,
        bonusRewardRate: formattedBonusRewardRate,
        nonce,
        rewardRates,
        isDeactivated: Boolean(isDeactivated),
        isDynamicRateActivated,
        minimalPositionWidth: minRangeLength,
        poolDeployer: poolDeployer?.pool?.deployer,
    };
}
