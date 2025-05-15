import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    'https://node.graph.prom.io/subgraphs/name/analytics',
    'https://node.graph.prom.io/subgraphs/name/blocks',
    'https://node.graph.prom.io/subgraphs/name/farms',
  ],
  documents: "src/graphql/queries/!(*.d).{ts,tsx}",
  generates: {
    "src/graphql/generated/graphql.tsx": {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withResultType: true
      }
    }
  }
};

export default config;
