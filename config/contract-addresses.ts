import { ChainId } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

/* Algebra Core */
export const ALGEBRA_FACTORY: Record<number, Address> = {
    [ChainId.BSC]: "0x2D071bA94C32A8a9bA594771EbF628b2b48b4389",
};

/* Plugins */
export const PLUGIN_FACTORY: Record<number, Address> = {
    [ChainId.BSC]: "0xAaB91422ad832f2a1E05ea8ab70CAFdf0DA597a1",
};

export const SECURITY_REGISTRY: Record<number, Address> = {
    [ChainId.BSC]: "0x7E7dca93606cdcA0981423D7d38793EeD6860604",
};

/* Farming */
export const ALGEBRA_ETERNAL_FARMING: Record<number, Address> = {
    [ChainId.BSC]: "0xD2BeD99625cbCD288985C610C2aC56E295FCeB44",
};

export const FARMING_CENTER: Record<number, Address> = {
    [ChainId.BSC]: "0x1FE3998dFCdE0841b144A4597F0d53beaABc5950",
};

/* Ve 3.3 */
export const VOTER: Record<number, Address> = {
    [ChainId.BSC]: "0x1B79491D453FFb4eFf2B75b106052B1670AC8b27",
};

/* Prediction */
export const BINARY_LMSR_MARKET_MANAGER: Record<number, Address> = {
    [ChainId.BSC]: "0xf04604de76eb31004F2331bd0701b6eBF8ffdCB1",
};
