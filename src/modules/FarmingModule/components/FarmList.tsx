import { Checkbox } from "@/components/ui/checkbox";
import { FarmingFieldsFragment, useAllFarmsQuery } from "@/graphql/generated/graphql";
import { useFarmData } from "../hooks/useFarmData";
import { useClients } from "@/hooks/graphql/useClients";
import { formatAmount } from "@/utils/common/formatAmount";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Toolbar = ({ changeShowDeactivated }: { changeShowDeactivated: (state: boolean) => void }) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Checkbox id="showDeactivated" onCheckedChange={changeShowDeactivated} />
                <label htmlFor="showDeactivated" className="text-sm font-medium text-text leading-none cursor-pointer">
                    Show deactivated
                </label>
            </div>
        </div>
    );
};

const FarmHeader = () => (
    <div className="hidden md:grid grid-cols-4 text-xs font-medium text-text/50 uppercase tracking-wider px-4 py-3 bg-bg-200 border-b border-border">
        <div>Pool</div>
        <div>Rewards</div>
        <div>Bonus Rewards</div>
        <div></div>
    </div>
);

const FarmRow = (farm: FarmingFieldsFragment) => {
    const { token0, token1, reward, bonusReward, rewardToken, bonusRewardToken } = useFarmData(farm);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 w-full text-left px-4 py-4 bg-card border-b border-border hover:bg-bg-200 transition-colors items-center">
            {token0 && token1 ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Pool</div>
                    <div className="font-medium text-sm text-text">{`${token0.symbol} / ${token1.symbol}`}</div>
                </div>
            ) : (
                <div></div>
            )}
            {rewardToken && reward ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Rewards</div>
                    <div className="text-sm text-text">{`${formatAmount(reward)} ${rewardToken.symbol}`}</div>
                </div>
            ) : (
                <div></div>
            )}
            {bonusRewardToken && bonusReward ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Bonus Rewards</div>
                    <div className="text-sm text-text">{`${formatAmount(bonusReward)} ${bonusRewardToken.symbol}`}</div>
                </div>
            ) : (
                <div></div>
            )}

            <div className="text-right">
                <Link
                    to={`/farms/${farm.id}`}
                    state={farm}
                    className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                    Manage →
                </Link>
            </div>
        </div>
    );
};

const FarmList = () => {
    const [showDeactivated, setShowDeactivated] = useState(false);

    const { farmingClient } = useClients();

    const { data: farms, loading } = useAllFarmsQuery({
        client: farmingClient,
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
                <div className="flex items-center justify-center p-8">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-5 h-5 border-2 border-border border-t-text rounded-full animate-spin" />
                        <span className="text-sm text-text/50">Loading farms...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="text-lg font-semibold text-text mb-4">Active Farms</div>
                    <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
                        <FarmHeader />
                        <div>
                            {activeFarms.map((farm) => (
                                <FarmRow key={farm.id} {...farm} />
                            ))}
                        </div>
                    </div>
                    {showDeactivated ? (
                        <>
                            <div className="text-lg font-semibold text-text mb-4">Deactivated Farms</div>
                            <div className="bg-card border border-border rounded-lg overflow-hidden">
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
