import { ChainId } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

/* Algebra Core */
export const ALGEBRA_FACTORY: Record<number, Address> = {
    [ChainId.BaseSepolia]: "0x285C74f3d01296F96c5d3858ab482f707e8Bfdfc",
};

/* Plugins */
export const PLUGIN_FACTORY: Record<number, Address> = {
    [ChainId.BaseSepolia]: "0x54b589aC373Aad138e3689515ff5206afCe1ad41",
};

export const SECURITY_REGISTRY: Record<number, Address> = {
    [ChainId.BaseSepolia]: "0x6aa9481De990bC12F906C5e8DE70D8556ac5ba2e",
};

/* Farming */
export const ALGEBRA_ETERNAL_FARMING: Record<number, Address> = {
    [ChainId.BaseSepolia]: "0xB50E639E23C954546C75d9C15363FC0375E5E95E",
};

export const FARMING_CENTER: Record<number, Address> = {
    [ChainId.BaseSepolia]: "0x92E4eaCD3b49fa85D13E4B6E8d6bfd0CFafaeD75",
};

/* Ve 3.3 */
export const VOTER: Record<number, Address> = {
    [ChainId.BaseSepolia]: "0x1B79491D453FFb4eFf2B75b106052B1670AC8b27",
};

/* Prediction */
export const BINARY_LMSR_MARKET_FACTORY: Record<number, Address> = {
    [ChainId.BaseSepolia]: "0x26A1602908F286a668cbf7Ce23249C9835808aD7",
};

export const MULTICALL3: Record<number, Address> = {
    [ChainId.BaseSepolia]: "0xca11bde05977b3631167028862be2a173976ca11",
};
