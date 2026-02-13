import { ChainId } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

/* Algebra Core */
export const ALGEBRA_FACTORY: Record<number, Address> = {
    [ChainId.MegaethMainnet]: "0xAbAc6f23fdf1313FC2E9C9244f666157CcD32990",
    [ChainId.MegaethTestnet]: "0x10253594A832f967994b44f33411940533302ACb",
};

/* Plugins */
export const PLUGIN_FACTORY: Record<number, Address> = {
    [ChainId.MegaethMainnet]: "0xE416C0C29DBDb4Fa25870b835ad904c1E8478CDc",
    [ChainId.MegaethTestnet]: "0xE63AEf68c9C80C06d241d44B3C21Da4da2E582Bd",
};

export const SECURITY_REGISTRY: Record<number, Address> = {
    [ChainId.MegaethMainnet]: "0x8AF2f4aF29431a4c21397e42A99eb16Df5887332",
    [ChainId.MegaethTestnet]: "0x7064C7Bb85979f008212877c4CE41285ddf5374C",
};

/* Farming */
export const ALGEBRA_ETERNAL_FARMING: Record<number, Address> = {
    [ChainId.MegaethMainnet]: "0xe34ee083B4154F2624ECCb9A80E188b83944c2d5",
    [ChainId.MegaethTestnet]: "0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F",
};

export const FARMING_CENTER: Record<number, Address> = {
    [ChainId.MegaethMainnet]: "0x16d379f3458bf6DBF6A0dbC5696Be4ab9137cfd4",
    [ChainId.MegaethTestnet]: "0xB4F9b6b019E75CBe51af4425b2Fc12797e2Ee2a1",
};

/* Ve 3.3 */
export const VOTER: Record<number, Address> = {
    [ChainId.MegaethMainnet]: "0x1B79491D453FFb4eFf2B75b106052B1670AC8b27",
    [ChainId.MegaethTestnet]: "0x1B79491D453FFb4eFf2B75b106052B1670AC8b27",
};
