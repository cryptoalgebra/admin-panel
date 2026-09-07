import { ChainId } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

/* Algebra Core */
export const ALGEBRA_FACTORY: Record<number, Address> = {
    [ChainId.Robinhood]: "0xf03875b5Ec5eAc83cab83A6c2ab17844304AA7a0",
};

/* Plugins */
export const PLUGIN_FACTORY: Record<number, Address> = {
    [ChainId.Robinhood]: "0x888B035e6f64b1C1Aebcd6DDf0C9fd7aEBeA39ED",
};

export const SECURITY_REGISTRY: Record<number, Address> = {
    [ChainId.Robinhood]: "0xd3EB4f63257480E3269653bAf373df85D31Ab438",
};

/* Farming */
export const ALGEBRA_ETERNAL_FARMING: Record<number, Address> = {
    [ChainId.Robinhood]: "0xc8A85FD6511bf875646B3632Aedd60d5752610BC",
};

export const FARMING_CENTER: Record<number, Address> = {
    [ChainId.Robinhood]: "0xE416C0C29DBDb4Fa25870b835ad904c1E8478CDc",
};

/* Ve 3.3 */
/* not deployed — Ve33Module is disabled in app-modules.ts */
export const VOTER: Record<number, Address> = {
    [ChainId.Robinhood]: "0x1B79491D453FFb4eFf2B75b106052B1670AC8b27",
};

/* Prediction */
/* not deployed — PredictionModule is disabled in app-modules.ts */
export const BINARY_LMSR_MARKET_MANAGER: Record<number, Address> = {
    [ChainId.Robinhood]: "0xf04604de76eb31004F2331bd0701b6eBF8ffdCB1",
};
