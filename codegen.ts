import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    "https://api.goldsky.com/api/public/project_cmcxkn8h7pwwc01x30a5e6t39/subgraphs/kitten-analytics/1.0.0/gn",
    "https://api.goldsky.com/api/public/project_cmcxkn8h7pwwc01x30a5e6t39/subgraphs/kitten-blocks/1.0.0/gn",
    "https://api.goldsky.com/api/public/project_cmcxkn8h7pwwc01x30a5e6t39/subgraphs/kitten-farming/1.0.0/gn",
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
