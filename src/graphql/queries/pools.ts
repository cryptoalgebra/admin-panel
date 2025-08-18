import { gql } from "@apollo/client";

export const POOL_FRAGMENT = gql`
    fragment PoolFields on Pool {
        id
        fee
        sqrtPrice
        liquidity
        tick
        tickSpacing
        deployer
        totalValueLockedUSD
        volumeUSD
        feesUSD
        untrackedFeesUSD
        token0Price
        token1Price
        token0 {
            ...TokenFields
        }
        token1 {
            ...TokenFields
        }
    }
`;

export const SINGLE_POOL = gql`
    query SinglePool($poolId: ID!) {
        pool(id: $poolId) {
            ...PoolFields
        }
    }
`;

export const ALL_POOLS = gql`
    query AllPools {
        pools {
            ...PoolFields
        }
    }
`;

export const CUSTOM_POOL_DEPLOYER = gql`
    query CustomPoolDeployer($poolId: ID!) {
        pool(id: $poolId) {
            deployer
        }
    }
`;
