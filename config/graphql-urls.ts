import { ChainId } from "@cryptoalgebra/integral-sdk";

export const INFO_GRAPH_URL = {
    [ChainId.Robinhood]: "https://api.goldsky.com/api/public/project_cmtligog3luwl01y36sh55iex/subgraphs/analytics/v1.0.0/gn",
};

export const FARMING_GRAPH_URL = {
    [ChainId.Robinhood]: "https://api.goldsky.com/api/public/project_cmtligog3luwl01y36sh55iex/subgraphs/farming/v1.0.0/gn",
};

/* Fake, PredictionModule sources still need its generated types even while the module is disabled */
export const PREDICTION_GRAPH_URL = {
    [ChainId.Robinhood]:
        "https://gateway.thegraph.com/api/4d7b59e4fd14365ae609945af85f3938/deployments/id/QmTa4fTLDjaELTMNkKiQW2Ejqaj6TNtB4RhpCuBk2UTdaG",
};
