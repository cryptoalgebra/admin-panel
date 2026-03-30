import { gql } from "@apollo/client";

export const MARKET_FRAGMENT = gql`
    fragment MarketFields on Market {
        id
        pool
        token0
        token1
        collateralToken
        tradingDeadline
        plannedResolutionTimestamp
        mark
        marketToken
        condition
        seeded
        seedAmount
        outcome
        qYes
        qNo
        accruedFees
        totalVolume
        totalTrades
        activeUsers
        createdAt
    }
`;

export const USER_POSITION_FRAGMENT = gql`
    fragment UserPositionFields on UserPosition {
        id
        user {
            id
        }
        market {
            ...MarketFields
        }
        yesShares
        noShares
        totalYesBought
        totalNoBought
        totalYesSold
        totalNoSold
        totalSpent
        totalReceived
        totalFeesPaid
        redeemed
        redeemedAmount
    } 
`;

export const TRADE_FRAGMENT = gql`
    fragment TradeFields on Trade {
        id
        market {
            ...MarketFields
        }
        user {
            id
        }
        type
        shares
        cost
        fee
        timestamp
        txHash
    }
`;

export const USER_FRAGMENT = gql`
    fragment UserFields on User {
        positions {
            ...UserPositionFields
        }
        trades {
            ...TradeFields
        }
    }
`;

export const MARKET_FIVE_MINUTE_FRAGMENT = gql`
    fragment MarketFiveMinuteFields on MarketFiveMinuteData {
        id
        market {
            ...MarketFields
        }
        date
        qYes
        qNo
        priceYes
        volume
        fees
        txCount
    }
`;

export const ALL_OPEN_MARKETS_LIST = gql`
    query AllOpenMarketsList {
        markets(where: { seeded: true, outcome: 0 }) {
            ...MarketFields
        }
    }
`;
