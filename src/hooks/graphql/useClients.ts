import { infoClient, farmingClient } from "@/graphql/clients";
import { useChainId } from "wagmi";

export function useClients() {
    const chainId = useChainId();

    return {
        infoClient: infoClient[chainId],
        farmingClient: farmingClient[chainId],
    };
}
