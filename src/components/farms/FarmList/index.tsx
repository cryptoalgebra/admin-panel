import { Checkbox } from "@/components/ui/checkbox";
import { farmsClient } from "@/graphql/clients";
import { FarmingFieldsFragment, useAllFarmsQuery } from "@/graphql/generated/graphql";
import { useFarmData } from "@/hooks/farms/useFarmData";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Toolbar = ({ changeShowDeactivated }: { changeShowDeactivated: (state: boolean) => void }) => {
    return <div className="flex justify-between">
        {/* <div>
            <input 
                className="px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="Search pools or rewards"
            />
        </div> */}
        <div className="flex items-center gap-2">
            <Checkbox id="showDeactivated" onCheckedChange={changeShowDeactivated} />
            <label htmlFor="showDeactivated" className="text-sm font-medium leading-none" >Show deactivated</label>
        </div>
    </div>
}

const FarmHeader = () => <div className="hidden md:grid grid-cols-5 uppercase text-xs font-semibold text-gray-600 mb-4 pb-4 border-b border-gray-300">
    <div>Pool</div>
    <div>Rewards</div>
    <div>Bonus Rewards</div>
    <div>Dynamic Rates</div>
    <div></div>
</div>

const FarmRow = (farm: FarmingFieldsFragment) => {

    const { token0, token1, reward, bonusReward, rewardToken, bonusRewardToken, isDeactivated, isDynamicRateActivated } = useFarmData(farm)

    const isEmpty = isDeactivated && ( Number(reward) === 0 && ( Number(bonusReward) === 0 || !bonusReward ) )

    return <div className="grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-5 w-full text-left p-4 bg-gray-50 border border-gray-300 rounded-xl">
        {token0 && token1 ? <div className="flex w-full justify-between">
            <div className="md:hidden font-bold">Pool</div>
            <div>{`${token0.symbol} / ${token1.symbol}`}</div>
        </div> : <div></div>}
        { rewardToken && reward ?<div className="flex w-full justify-between">
            <div className="md:hidden font-bold">Rewards</div>
            <div>{`${reward} ${rewardToken.symbol}`}</div>
        </div> : <div></div> }
        { bonusRewardToken && bonusReward ? <div className="flex w-full justify-between">
            <div className="md:hidden font-bold">Bonus Rewards</div>
            <div>{`${bonusReward} ${bonusRewardToken.symbol}`}</div>
        </div> : <div></div> }
        { token0 && token1 ? <div className="flex w-full justify-between">
            <div className="md:hidden font-bold">Dynamic Rates</div>
            <div>{isDynamicRateActivated ? 'Yes' : 'No'}</div>
        </div> : <div></div> }
        { !isEmpty && <div className="text-right">
            <Link to={`/farms/${farm.id}`} state={farm} className="px-4 py-2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400">Manage →</Link>
        </div> }
    </div>
}

const FarmList = () => {

    const [showDeactivated, setShowDeactivated] = useState(false)

    const { data: farms, loading } = useAllFarmsQuery({
        client: farmsClient,
        pollInterval: 50000
    })

    const { activeFarms, deactivatedFarms } = useMemo(() => {

        if (!farms) return {
            activeFarms: [],
            deactivatedFarms: []
        }

        return farms.eternalFarmings.reduce<{ activeFarms: FarmingFieldsFragment[], deactivatedFarms: FarmingFieldsFragment[] }>((acc, farm) => {
            
            if (farm.isDeactivated) {
                return {
                    ...acc,
                    deactivatedFarms: [...acc.deactivatedFarms, farm]
                }
            }

            return {
                ...acc,
                activeFarms: [...acc.activeFarms, farm]
            }
            
        }, {
            activeFarms: [],
            deactivatedFarms: []
        })

    }, [farms])

    return <div className="w-full text-left">
        <div className="mb-8">
            <Toolbar changeShowDeactivated={(state) => setShowDeactivated(state)} />
        </div>
        { loading ? 'Loading' : <div>
            <div className="text-lg font-semibold mb-4">Active Farms</div>
            <FarmHeader />
            <div className="grid grid-cols-1 gap-4">
                { activeFarms.map(farm => <FarmRow {...farm} />) }
            </div>
            {
                showDeactivated ? <>
                    <div className="text-lg font-semibold my-4">Deactivated Farms</div>
                    <div className="grid grid-cols-1 gap-4">
                        { deactivatedFarms.map(farm => <FarmRow {...farm} />) }
                    </div>
                </>
                : null
            }
        </div> }
    </div>

}

export default FarmList;