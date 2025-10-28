import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    "https://api.goldsky.com/api/public/project_cmh9a894wk4de01tz0pl828jm/subgraphs/sophon-testnet-analytics/v1.0.0/gn",
    "https://api.goldsky.com/api/public/project_cmh9a894wk4de01tz0pl828jm/subgraphs/sophon-testnet-blocks/v1.0.0/gn",
    "https://api.goldsky.com/api/public/project_cmh9a894wk4de01tz0pl828jm/subgraphs/sophon-testnet-farms/v1.0.0/gn",
  ],
  documents: "src/graphql/queries/!(*.d).{ts,tsx}",
  generates: {
    "src/graphql/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withResultType: true,
      },
    },
  },
};

export default config;
