import { ChainId } from "@cryptoalgebra/integral-sdk";

export const INFO_GRAPH_URL: Record<number, string> = {
    [ChainId.SophonOSTestnet]: "https://api.goldsky.com/api/public/project_cmh9a894wk4de01tz0pl828jm/subgraphs/sophon-testnet-analytics/v1.0.0/gn",
};

export const FARMING_GRAPH_URL: Record<number, string> = {
    [ChainId.SophonOSTestnet]: "https://api.goldsky.com/api/public/project_cmh9a894wk4de01tz0pl828jm/subgraphs/sophon-testnet-farms/v1.0.0/gn",
};
