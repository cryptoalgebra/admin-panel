import PageContainer from "@/components/common/PageContainer"
import FarmDetails from "@/components/farm/FarmDetails"
import FarmPoolDetails from "@/components/farm/FarmPoolDetails"
import FarmRewardDetails from "@/components/farm/FarmRewardDetails"
import { farmsClient } from "@/graphql/clients"
import { useSingleFarmingQuery } from "@/graphql/generated/graphql"
import { useFarmData } from "@/hooks/farms/useFarmData"
import { IncentiveKey, PartialIncentiveKey } from "@/types/incentive-key"
import { ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Address } from "wagmi"

const FarmPage = () => {

    const { farm } = useParams<{ farm: string }>()

    const { data: singleFarming } = useSingleFarmingQuery({
        skip: Boolean(!farm),
        client: farmsClient,
        variables: {
            farmId: farm || ''
        },
        pollInterval: 5000
    })

    const { token0, token1, pool, reward, rewardRate, rewardToken, bonusReward, bonusRewardRate, bonusRewardToken, nonce, rewardRates, isDeactivated } = useFarmData(singleFarming?.eternalFarming)

    const isPoolReady = token0 && token1 && pool

    const incentiveKey: PartialIncentiveKey = {
        rewardToken: rewardToken ? rewardToken.address as Address : ADDRESS_ZERO,
        bonusRewardToken: bonusRewardToken ? bonusRewardToken.address as Address : ADDRESS_ZERO,
        pool: pool,
        nonce
    }

    return <PageContainer>
        <Link to={'/farms'} className="flex items-center gap-2 mb-4 hover:text-black/70">
            <ArrowLeft size={16}/>
            <span>Back</span>
        </Link>
        <div className="mb-8">
            { token0 && token1 && <div className="font-bold text-2xl">{`Farm for ${token0.symbol} / ${token1.symbol} pool`}{isDeactivated && <span className="text-red-500 ml-4">Deactivated</span>}</div> }
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            { rewardToken && reward ? <FarmRewardDetails token={rewardToken} rate={rewardRate} reward={reward} incentiveKey={incentiveKey} rewardRates={rewardRates} isDeactivated={isDeactivated} /> : <div className="flex items-center justify-center w-full border rounded-xl">Farm doesn't have first reward</div> }
            { bonusRewardToken && bonusReward ? <FarmRewardDetails token={bonusRewardToken} rate={bonusRewardRate} reward={bonusReward} incentiveKey={incentiveKey} rewardRates={rewardRates} isBonus isDeactivated={isDeactivated} /> : <div className="flex items-center justify-center w-full border rounded-xl">Farm doesn't have second reward</div> }
            { isPoolReady ? <FarmPoolDetails name={`${token0.symbol} / ${token1.symbol}`} id={pool} /> : <div></div> }
            { farm && isPoolReady ? <FarmDetails id={farm} incentiveKey={incentiveKey as IncentiveKey} isDeactivated={isDeactivated} /> : null }
        </div>
    </PageContainer>

}

export default FarmPage