import { TokenFieldsFragment, useAllPoolsQuery } from "@/graphql/generated/graphql";
import { isDefined } from "@/utils/common/isDefined";
import { useMemo } from "react";
import { Address } from "viem";
import { useClients } from "@/hooks/graphql/useClients";
import { useChainId, useReadContracts } from "wagmi";
import { VOTER } from "config/contract-addresses";
import { voterABI } from "config/abis";

export interface AlgebraGauge {
    gauge: Address;
    votingReward: Address;
    vault: Address;
    isAlive: boolean;
}

interface Pair {
    token0: TokenFieldsFragment;
    token1: TokenFieldsFragment;
}

export interface FormattedGauge extends AlgebraGauge {
    id: Address;
    poolAddress: Address;
    pair: Pair;
    deployer: Address;
    fee: number;
    tvlUSD: number;
    volume24USD: number;
    apr: number;
}

export function useAllGauges() {
    const chainId = useChainId();
    const { infoClient } = useClients();
    const { data: pools, loading: poolsLoading } = useAllPoolsQuery({ client: infoClient });

    const poolsList = useMemo(() => pools?.pools ?? [], [pools]);

    // pools -> gauges
    const { data: gaugesResults, isLoading: gaugesLoading } = useReadContracts({
        contracts: poolsList.map((pool) => ({
            address: VOTER[chainId],
            abi: voterABI,
            functionName: "getGauge",
            args: [pool.id],
        })),
    });

    const gaugeList: AlgebraGauge[] = useMemo(() => gaugesResults?.map((d) => d?.result as AlgebraGauge) ?? [], [gaugesResults]);

    const formattedGauges: FormattedGauge[] = useMemo(() => {
        if (!gaugeList.length || !poolsList.length) return [];

        return poolsList
            .map(({ id, token0, token1, fee, totalValueLockedUSD, volumeUSD, deployer }, idx) => {
                const gaugeForPool = gaugeList[idx];

                if (!gaugeForPool || !gaugeForPool.isAlive) return null;

                return {
                    id: gaugeForPool.gauge as Address,
                    pair: {
                        token0,
                        token1,
                    },
                    deployer,
                    fee: Number(fee) / 10_000,
                    tvlUSD: Number(totalValueLockedUSD),
                    volume24USD: Number(volumeUSD),
                    apr: 0,
                    poolAddress: id as Address,
                    ...gaugeForPool,
                };
            })
            .filter(isDefined);
    }, [gaugeList, poolsList]);

    return {
        data: formattedGauges,
        isLoading: poolsLoading || gaugesLoading,
    };
}
