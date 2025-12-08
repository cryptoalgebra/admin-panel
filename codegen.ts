import { INFO_GRAPH_URL, FARMING_GRAPH_URL, DEFAULT_CHAIN_ID } from "./config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: [INFO_GRAPH_URL[DEFAULT_CHAIN_ID], FARMING_GRAPH_URL[DEFAULT_CHAIN_ID]],
    documents: "src/graphql/queries/!(*.d).{ts,tsx}",
    generates: {
        "src/graphql/generated/graphql.tsx": {
            plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
            config: {
                withHooks: true,
                withResultType: true,
            },
        },
    },
};

export default config;
