import { Address } from "viem";
import { MarketFieldsFragment } from "@/graphql/generated/graphql";

export type PredictionMarket = MarketFieldsFragment & {
    index: bigint;
    id: Address;
    pool: Address;
    collateralToken: Address;
    marketToken: Address;
    quoteToken: Address;
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
