import { ADDRESS_ZERO, ChainId } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

/* Algebra Core */
export const ALGEBRA_FACTORY: Record<number, Address> = {
    [ChainId.Kite]: "0x10253594A832f967994b44f33411940533302ACb",
};

/* Plugins */
export const PLUGIN_FACTORY: Record<number, Address> = {
    [ChainId.Kite]: "0x149B786700d47b3007F757F76BEf01c064ed6E94",
};

export const SECURITY_REGISTRY: Record<number, Address> = {
    [ChainId.Kite]: "0x888B035e6f64b1C1Aebcd6DDf0C9fd7aEBeA39ED",
};

/* Farming */
export const ALGEBRA_ETERNAL_FARMING: Record<number, Address> = {
    [ChainId.Kite]: "0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F",
};

export const FARMING_CENTER: Record<number, Address> = {
    [ChainId.Kite]: "0xB4F9b6b019E75CBe51af4425b2Fc12797e2Ee2a1",
};

/* Ve 3.3 */
export const VOTER: Record<number, Address> = {
    [ChainId.Kite]: ADDRESS_ZERO,
};
