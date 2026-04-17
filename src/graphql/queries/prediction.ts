import { gql } from "@apollo/client";

export const MARKET_MANAGER_FRAGMENT = gql`
    fragment MarketManagerFields on MarketManager {
        accruedFees
        activeUserCount
        marketCount
        id
        maxLoss
        openInterest
        openMarketCount
        seededMarketCount
        resolvedMarketCount
        totalFeesWithdrawn
        totalFeesCollected
        totalRedeemed
        totalLeftoverWithdrawn
        totalVolume
        totalTrades
        tvl
    }
`;

export const MARKET_FRAGMENT = gql`
    fragment MarketFields on Market {
        id
        pool
        marketToken
        quoteToken
        collateralToken
        tradingDeadline
        plannedResolutionTimestamp
        mark
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
        question
        accountedCollateral
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

export const MARKETS_WITH_FEES_LIST = gql`
    query MarketsWithFeesList {
        markets(where: { accruedFees_gt: "0" }) {
            ...MarketFields
        }
    }
`;

export const ALL_MARKETS_LIST = gql`
    query AllMarketsList($where: Market_filter, $first: Int, $skip: Int, $orderBy: Market_orderBy, $orderDirection: OrderDirection) {
        markets(where: $where, first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
            ...MarketFields
        }
    }
`;

export const SINGLE_MARKET = gql`
    query SingleMarket($marketId: ID!) {
        market(id: $marketId) {
            ...MarketFields
        }
    }
`;

export const MARKET_MANAGER_DATA = gql`
    query MarketManagerData($address: ID!) {
        marketManager(id: $address) {
            ...MarketManagerFields
        }
    }
`;
