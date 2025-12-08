import { ChainId } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

/* Algebra Core */
export const ALGEBRA_FACTORY: Record<number, Address> = {
    [ChainId.SophonOSTestnet]: "0x10253594A832f967994b44f33411940533302ACb",
};

/* Plugin Factory */
export const PLUGIN_FACTORY: Record<number, Address> = {
    [ChainId.SophonOSTestnet]: "0xFe3BEcd788320465ab649015F34F7771220A88b2",
};

/* Farming */
export const ALGEBRA_ETERNAL_FARMING: Record<number, Address> = {
    [ChainId.SophonOSTestnet]: "0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA",
};

export const FARMING_CENTER: Record<number, Address> = {
    [ChainId.SophonOSTestnet]: "0x658E287E9C820484f5808f687dC4863B552de37D",
};

/* Stub Plugin */
export const ALGEBRA_STUB_PLUGIN: Record<number, Address> = {
    [ChainId.SophonOSTestnet]: "0x955B95b8532fe75DDCf2161f61127Be74A768158",
};
