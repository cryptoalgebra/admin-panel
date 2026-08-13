import { ChainId } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

/* Algebra Core */
export const ALGEBRA_FACTORY: Record<number, Address> = {
    [ChainId.Robinhood]: "0x10253594A832f967994b44f33411940533302ACb",
};

/* Plugins */
export const PLUGIN_FACTORY: Record<number, Address> = {
    [ChainId.Robinhood]: "0x37A4950b4ea0C46596404895c5027B088B0e70e7",
};

export const SECURITY_REGISTRY: Record<number, Address> = {
    [ChainId.Robinhood]: "0x28DeD2af752655Df5Ee92450DC259F92a5ABe449",
};

/* Farming */
export const ALGEBRA_ETERNAL_FARMING: Record<number, Address> = {
    [ChainId.Robinhood]: "0xB4F9b6b019E75CBe51af4425b2Fc12797e2Ee2a1",
};

export const FARMING_CENTER: Record<number, Address> = {
    [ChainId.Robinhood]: "0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA",
};

/* Ve 3.3 */
export const VOTER: Record<number, Address> = {
    [ChainId.Robinhood]: "0x1B79491D453FFb4eFf2B75b106052B1670AC8b27",
};

/* Prediction */
export const BINARY_LMSR_MARKET_MANAGER: Record<number, Address> = {
    [ChainId.Robinhood]: "0xf04604de76eb31004F2331bd0701b6eBF8ffdCB1",
};
