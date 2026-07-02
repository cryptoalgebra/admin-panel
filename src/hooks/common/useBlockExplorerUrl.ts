import { useAppKitNetwork } from "@reown/appkit/react";

export function useBlockExplorerUrl() {
    const { caipNetwork } = useAppKitNetwork();
    return caipNetwork?.blockExplorers?.default.url || "https://sepolia.basescan.org";
}
