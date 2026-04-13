import { ChainId } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

/* Algebra Core */
export const ALGEBRA_FACTORY: Record<number, Address> = {
    [ChainId.BSC]: "0xd9A0ffa58143CdC5C1767208dDdB64a1889D78ae",
};

/* Plugins */
export const PLUGIN_FACTORY: Record<number, Address> = {
    [ChainId.BSC]: "0x54b589aC373Aad138e3689515ff5206afCe1ad41",
};
export const SECURITY_REGISTRY: Record<number, Address> = {
    [ChainId.BSC]: "0xc9574dE8f6DB27B3E83d5aF0fB9D513213baD068",
};

/* Farming */
export const ALGEBRA_ETERNAL_FARMING: Record<number, Address> = {
    [ChainId.BSC]: "0x211BD8917d433B7cC1F4497AbA906554Ab6ee479",
};
export const FARMING_CENTER: Record<number, Address> = {
    [ChainId.BSC]: "0xCf5d80378efC08b20aCAB1Ee5F296E5cB5a8E8C2",
};

/* Ve 3.3 */
export const VOTER: Record<number, Address> = {
    [ChainId.BSC]: "0x1B79491D453FFb4eFf2B75b106052B1670AC8b27",
};
