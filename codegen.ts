import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    "https://api.studio.thegraph.com/query/82608/ve-analytics/v0.0.1",
    "https://api.studio.thegraph.com/query/50593/goerli-blocks/version/latest",
    "https://api.studio.thegraph.com/query/82608/ve-farms/v0.0.1",
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
