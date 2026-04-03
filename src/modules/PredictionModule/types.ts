import { Address } from "viem";
import { MarketFieldsFragment } from "@/graphql/generated/graphql";

export type PredictionMarket = MarketFieldsFragment & {
    id: Address;
    pool: Address;
    token0: Address;
    token1: Address;
    collateralToken: Address;
    marketToken: Address;
};

export enum MarketStatus {
    Active = "Active",
    TradingClosed = "Trading Closed",
    Resolved = "Resolved",
}

export enum MarketOutcome {
    Unresolved = 0,
    Yes = 1,
    No = 2,
}
