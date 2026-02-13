import { ChainId } from "@cryptoalgebra/integral-sdk";

export const INFO_GRAPH_URL = {
    [ChainId.MegaethMainnet]: "https://api.studio.thegraph.com/query/111290/analytics-mainnet/version/latest",
    [ChainId.MegaethTestnet]: "https://api.studio.thegraph.com/query/111290/analytics-testnet/version/latest",
};

export const FARMING_GRAPH_URL = {
    [ChainId.MegaethMainnet]: "https://api.studio.thegraph.com/query/111290/farming-mainnet/version/latest",
    [ChainId.MegaethTestnet]: "https://api.studio.thegraph.com/query/111290/farming-testnet/version/latest",
};
