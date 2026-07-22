import { ChainId } from "@cryptoalgebra/integral-sdk";

export const INFO_GRAPH_URL = {
    [ChainId.Hemi]: "https://api.studio.thegraph.com/query/50593/hemi-analytics/version/latest",
};

export const FARMING_GRAPH_URL = {
    [ChainId.Hemi]: "https://api.studio.thegraph.com/query/50593/hemi-farmings/version/latest",
};

export const PREDICTION_GRAPH_URL = {
    [ChainId.Hemi]:
        "https://gateway.thegraph.com/api/4d7b59e4fd14365ae609945af85f3938/deployments/id/QmTa4fTLDjaELTMNkKiQW2Ejqaj6TNtB4RhpCuBk2UTdaG",
};
