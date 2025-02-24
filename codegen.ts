
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    'https://api.goldsky.com/api/public/project_cm79vkebsihxh01uv7u15c50m/subgraphs/analytics/v0.0.1/gn',
    'https://api.goldsky.com/api/public/project_cm79vkebsihxh01uv7u15c50m/subgraphs/blocks/v0.0.1/gn',
    'https://api.goldsky.com/api/public/project_cm79vkebsihxh01uv7u15c50m/subgraphs/farms/v0.0.1/gn',
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
