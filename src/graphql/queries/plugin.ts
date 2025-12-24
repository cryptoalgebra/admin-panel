import { gql } from "@apollo/client";

export const PLUGIN_ACTIVE_MODULES = gql`
    query PluginActiveModules($pluginId: ID!) {
        plugin(id: $pluginId) {
            activeModules
        }
    }
`;
