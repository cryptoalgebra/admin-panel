import { Checkbox } from "@/components/ui/checkbox";
import { farmsClient } from "@/graphql/clients";
import { FarmingFieldsFragment, useAllFarmsQuery } from "@/graphql/generated/graphql";
import { useFarmData } from "@/hooks/farms/useFarmData";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Toolbar = ({ changeShowDeactivated }: { changeShowDeactivated: (state: boolean) => void }) => {
    return (
        <div className="flex justify-between">
            {/* <div>
            <input 
                className="px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="Search pools or rewards"
            />
        </div> */}
            <div className="flex items-center gap-2">
                <Checkbox id="showDeactivated" onCheckedChange={changeShowDeactivated} />
                <label htmlFor="showDeactivated" className="text-sm font-medium leading-none">
                    Show deactivated
                </label>
            </div>
        </div>
    );
};

const FarmHeader = () => (
    <div className="hidden md:grid grid-cols-5 text-sm text-black font-semibold px-4 py-3 bg-neutral-200 border-b border-neutral-100">
        <div>Pool</div>
        <div>Rewards</div>
        <div>Bonus Rewards</div>
        <div>Dynamic Rates</div>
        <div></div>
    </div>
);

const FarmRow = (farm: FarmingFieldsFragment) => {
    const { token0, token1, reward, bonusReward, rewardToken, bonusRewardToken, isDeactivated, isDynamicRateActivated } = useFarmData(farm);

    const isEmpty = isDeactivated && Number(reward) === 0 && (Number(bonusReward) === 0 || !bonusReward);

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 w-full text-left px-4 py-4 bg-white border-b border-neutral-200 hover:bg-neutral-50 transition-colors items-center">
            {token0 && token1 ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-neutral-500 font-medium">Pool</div>
                    <div className="font-medium text-sm">{`${token0.symbol} / ${token1.symbol}`}</div>
                </div>
            ) : (
                <div></div>
            )}
            {rewardToken && reward ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-neutral-500 font-medium">Rewards</div>
                    <div className="text-sm">{`${reward} ${rewardToken.symbol}`}</div>
                </div>
            ) : (
                <div></div>
            )}
            {bonusRewardToken && bonusReward ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-neutral-500 font-medium">Bonus Rewards</div>
                    <div className="text-sm">{`${bonusReward} ${bonusRewardToken.symbol}`}</div>
                </div>
            ) : (
                <div></div>
            )}
            {token0 && token1 ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-neutral-500 font-medium">Dynamic Rates</div>
                    <div className="text-sm">{isDynamicRateActivated ? "Yes" : "No"}</div>
                </div>
            ) : (
                <div></div>
            )}
            {!isEmpty && (
                <div className="text-right">
                    <Link
                        to={`/farms/${farm.id}`}
                        state={farm}
                        className="inline-block px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                        Manage →
                    </Link>
                </div>
            )}
        </div>
    );
};

const FarmList = () => {
    const [showDeactivated, setShowDeactivated] = useState(false);

    const { data: farms, loading } = useAllFarmsQuery({
        client: farmsClient,
    });

    const { activeFarms, deactivatedFarms } = useMemo(() => {
        if (!farms)
            return {
                activeFarms: [],
                deactivatedFarms: [],
            };

        return farms.eternalFarmings.reduce<{ activeFarms: FarmingFieldsFragment[]; deactivatedFarms: FarmingFieldsFragment[] }>(
            (acc, farm) => {
                if (farm.isDeactivated) {
                    return {
                        ...acc,
                        deactivatedFarms: [...acc.deactivatedFarms, farm],
                    };
                }

                return {
                    ...acc,
                    activeFarms: [...acc.activeFarms, farm],
                };
            },
            {
                activeFarms: [],
                deactivatedFarms: [],
            }
        );
    }, [farms]);

    return (
        <div className="w-full text-left">
            <div className="mb-8">
                <Toolbar changeShowDeactivated={(state) => setShowDeactivated(state)} />
            </div>
            {loading ? (
                "Loading"
            ) : (
                <div>
                    <div className="text-lg font-semibold mb-4">Active Farms</div>
                    <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden mb-8">
                        <FarmHeader />
                        <div>
                            {activeFarms.map((farm) => (
                                <FarmRow key={farm.id} {...farm} />
                            ))}
                        </div>
                    </div>
                    {showDeactivated ? (
                        <>
                            <div className="text-lg font-semibold mb-4">Deactivated Farms</div>
                            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                                <FarmHeader />
                                <div>
                                    {deactivatedFarms.map((farm) => (
                                        <FarmRow key={farm.id} {...farm} />
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default FarmList;
