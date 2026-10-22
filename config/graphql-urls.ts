import { ChainId } from "@cryptoalgebra/integral-sdk";

export const INFO_GRAPH_URL = {
    [ChainId.BSC]: "https://api.goldsky.com/api/public/project_cmvix0gy4l0xs01wu9tobhqwe/subgraphs/analytics/v1.0.0/gn",
};

export const FARMING_GRAPH_URL = {
    [ChainId.BSC]: "https://api.goldsky.com/api/public/project_cmvix0gy4l0xs01wu9tobhqwe/subgraphs/farmings/v1.0.0/gn",
};

export const PREDICTION_GRAPH_URL = {
    [ChainId.BSC]:
        "https://gateway.thegraph.com/api/4d7b59e4fd14365ae609945af85f3938/deployments/id/QmTa4fTLDjaELTMNkKiQW2Ejqaj6TNtB4RhpCuBk2UTdaG",
};
