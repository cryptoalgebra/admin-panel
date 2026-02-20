import { ChainId } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

/* Algebra Core */
export const ALGEBRA_FACTORY: Record<number, Address> = {
    [ChainId.PharosTestnet]: "0x3B22094a64D3D6801a27Db4e58ac0B859A4C066d",
};

/* Plugins */
export const PLUGIN_FACTORY: Record<number, Address> = {
    [ChainId.PharosTestnet]: "0x4Eb881885FE22D895Ff299f6cdA6e0A8E00E66A0",
};

export const SECURITY_REGISTRY: Record<number, Address> = {
    [ChainId.PharosTestnet]: "0xd9866Fc987AFCFc0C20b22a2B04b0574735032C5",
};

/* Farming */
export const ALGEBRA_ETERNAL_FARMING: Record<number, Address> = {
    [ChainId.PharosTestnet]: "0x83D4a9Ea77a4dbA073cD90b30410Ac9F95F93E7C",
};

export const FARMING_CENTER: Record<number, Address> = {
    [ChainId.PharosTestnet]: "0xEC250E6856e14A494cb1f0abC61d72348c79F418",
};

/* Ve 3.3 */
export const VOTER: Record<number, Address> = {
    [ChainId.PharosTestnet]: "0x1B79491D453FFb4eFf2B75b106052B1670AC8b27",
};
