import { ChainId } from "@cryptoalgebra/integral-sdk";

export const CHAIN_NAME = {
    [ChainId.Kite]: "KiteAI Mainnet",
};

export const NATIVE_SYMBOL = {
    [ChainId.Kite]: "KITE",
};

export const NATIVE_NAME = {
    [ChainId.Kite]: "KITE",
};

export const CHAIN_ID = {
    [ChainId.Kite]: ChainId.Kite,
};

export const CHAIN_IMAGE = {
    [ChainId.Kite]: "https://avatars.githubusercontent.com/u/96353101?s=200&v=4",
};

export const DEFAULT_CHAIN_ID = ChainId.Kite;
export const DEFAULT_CHAIN_NAME = CHAIN_NAME[DEFAULT_CHAIN_ID];
export const DEFAULT_NATIVE_SYMBOL = NATIVE_SYMBOL[DEFAULT_CHAIN_ID];
export const DEFAULT_NATIVE_NAME = NATIVE_NAME[DEFAULT_CHAIN_ID];
