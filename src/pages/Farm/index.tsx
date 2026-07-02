import PageContainer from "@/components/common/PageContainer";
import FarmingModule from "@/modules/FarmingModule";
import { useSingleFarmingQuery } from "@/graphql/generated/graphql";
import { useClients } from "@/hooks/graphql/useClients";
import { IncentiveKey, PartialIncentiveKey } from "@/types/incentive-key";
import { ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Address } from "viem";

const { FarmDetails, FarmPoolDetails, FarmRewardDetails } = FarmingModule.components;
const { useFarmData } = FarmingModule.hooks;

const FarmPage = () => {
    const { farmingClient } = useClients();
    const { farm } = useParams<{ farm: string }>();

    const { data: singleFarming } = useSingleFarmingQuery({
        skip: Boolean(!farm),
        client: farmingClient,
        variables: {
            farmId: farm || "",
        },
        pollInterval: 5000,
    });

    const {
        token0,
        token1,
        pool,
        reward,
        rewardRate,
        rewardToken,
        bonusReward,
        bonusRewardRate,
        bonusRewardToken,
        nonce,
        rewardRates,
        isDeactivated,
        minimalPositionWidth,
        poolDeployer,
    } = useFarmData(singleFarming?.eternalFarming);

    const isPoolReady = token0 && token1 && pool;

    const incentiveKey: PartialIncentiveKey = {
        rewardToken: rewardToken ? (rewardToken.address as Address) : ADDRESS_ZERO,
        bonusRewardToken: bonusRewardToken ? (bonusRewardToken.address as Address) : ADDRESS_ZERO,
        pool: pool,
        nonce,
    };

    return (
        <PageContainer>
            <Link to={"/farms"} className="flex items-center gap-2 mb-6 text-text/70 hover:text-text transition-colors">
                <ArrowLeft size={16} />
                <span>Back to Farms</span>
            </Link>
            <div className="mb-8">
                {token0 && token1 && (
                    <div className="flex items-center gap-3">
                        <h1 className="font-semibold text-2xl text-text">{`${token0.symbol} / ${token1.symbol}`}</h1>
                        {isDeactivated && (
                            <span className="text-xs font-medium px-2 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full">
                                Deactivated
                            </span>
                        )}
                    </div>
                )}
                <p className="text-sm text-text/50 mt-1">Farm Management</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                {rewardToken && reward ? (
                    <FarmRewardDetails
                        token={rewardToken}
                        rate={rewardRate}
                        reward={reward}
                        incentiveKey={incentiveKey}
                        rewardRates={rewardRates}
                        isDeactivated={isDeactivated}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full p-6 bg-card border border-border rounded-lg">
                        <p className="text-sm text-text/50">Farm doesn't have first reward</p>
                    </div>
                )}
                {bonusRewardToken && bonusReward ? (
                    <FarmRewardDetails
                        token={bonusRewardToken}
                        rate={bonusRewardRate}
                        reward={bonusReward}
                        incentiveKey={incentiveKey}
                        rewardRates={rewardRates}
                        isBonus
                        isDeactivated={isDeactivated}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full p-6 bg-card border border-border rounded-lg">
                        <p className="text-sm text-text/50">Farm doesn't have second reward</p>
                    </div>
                )}
                {isPoolReady ? <FarmPoolDetails name={`${token0.symbol} / ${token1.symbol}`} id={pool} /> : <div></div>}
                {farm && isPoolReady ? (
                    <FarmDetails
                        id={farm}
                        incentiveKey={incentiveKey as IncentiveKey}
                        isDeactivated={isDeactivated}
                        minimalPositionWidth={minimalPositionWidth}
                        poolDeployer={poolDeployer}
                    />
                ) : null}
            </div>
        </PageContainer>
    );
};

export default FarmPage;
