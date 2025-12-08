import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { createApolloClient } from "../utils/createApolloClient";
import { INFO_GRAPH_URL, FARMING_GRAPH_URL } from "config/graphql-urls";

export const infoClient: Record<number, ApolloClient<NormalizedCacheObject>> = Object.fromEntries(
    Object.entries(INFO_GRAPH_URL).map(([chainId, url]) => [Number(chainId), createApolloClient(url)])
);

export const farmingClient: Record<number, ApolloClient<NormalizedCacheObject>> = Object.fromEntries(
    Object.entries(FARMING_GRAPH_URL).map(([chainId, url]) => [Number(chainId), createApolloClient(url)])
);
