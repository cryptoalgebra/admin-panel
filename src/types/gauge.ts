import { Token } from "@cryptoalgebra/custom-pools-and-sliding-fee-sdk";
import { Address } from "wagmi";

export interface RewardToken {
    address: Address;
    amount: bigint;
    amountUsd: number;
    decimals: number;
}

export interface AlgebraGauge {
    gauge: Address;
    votingReward: Address;
    vault: Address;
    isAlgebra: boolean;
    isAlive: boolean;
}

export interface VotingPool extends AlgebraGauge {
    pool: Address;
    token0: Token;
    token1: Token;
    poolVotesDeposited: bigint;
    rewardTokenList: RewardToken[];
}
