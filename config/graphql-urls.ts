import { ChainId } from "@cryptoalgebra/integral-sdk";

export const INFO_GRAPH_URL = {
    [ChainId.BaseSepolia]:
        "https://gateway.thegraph.com/api/42cc232fae3835266ca697c702804a32/subgraphs/id/8fjuLTUz3S5ZpSr2Vx2Ws7HZLijfSwbjSwU2M6WwjciZ",
};

export const FARMING_GRAPH_URL = {
    [ChainId.BaseSepolia]: "https://api.studio.thegraph.com/query/50593/base-testnet-farms/v0.0.2",
};

export const PREDICTION_GRAPH_URL = {
    [ChainId.BaseSepolia]:
        "https://gateway.thegraph.com/api/4d7b59e4fd14365ae609945af85f3938/deployments/id/QmTa4fTLDjaELTMNkKiQW2Ejqaj6TNtB4RhpCuBk2UTdaG",
};
