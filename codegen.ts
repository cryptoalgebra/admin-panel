import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    "https://gateway.thegraph.com/api/4d7b59e4fd14365ae609945af85f3938/subgraphs/id/AmmgvUmLbQK3k8xJd3SPHkuo989mu8J5jj4kkBhdsnMG",
    "https://api.studio.thegraph.com/query/50593/goerli-blocks/version/latest",
    "https://gateway.thegraph.com/api/4d7b59e4fd14365ae609945af85f3938/subgraphs/id/4hv4Ykhpu6Lie1JrWYpnaYzGC8gpLSd29PBz8cgbKvCC",
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
