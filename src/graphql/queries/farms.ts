import { gql } from "@apollo/client";

export const FARMING_FRAGMENT = gql`
    fragment FarmingFields on EternalFarming {
        id
        rewardToken
        bonusRewardToken
        reward
        bonusReward
        rewardRate
        bonusRewardRate
        pool
        virtualPool
        isDeactivated
        nonce
        minRangeLength
    }
`

export const DEPOSIT_FRAGMENT = gql`
    fragment DepositFields on Deposit {
        id
        eternalFarming
    }
`

export const ALL_FARMINGS = gql`
    query AllFarms {
        eternalFarmings {
            ...FarmingFields
        }
    }
`

export const SINGLE_FARMING = gql`
    query SingleFarming($farmId: ID!) {
        eternalFarming(id: $farmId) {
            ...FarmingFields
        }
    }
`

export const ALL_POSITIONS_ON_FARMING = gql`
    query AllDepositsOnFarming($farmId: Bytes!) {
        deposits(where: { eternalFarming: $farmId }) {
            ...DepositFields
        }
    }
`

export const ACITVE_FARMING_FOR_POOL = gql`
    query ActiveFarmingForPool($poolId: Bytes!) {
        eternalFarmings(where: { pool: $poolId, isDeactivated: false }) {
            ...FarmingFields
        }
    }
`