import { useMemo } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { usePredictionProtocolAddress } from "./usePredictionProtocolAddress";
import { MarketState } from "./usePredictionMarketState";

export interface AuthorizationState {
    isConnected: boolean;
    isAuthorized: boolean;
    canWithdraw: boolean;
    protocolAddress: Address | undefined;
    reason: string | undefined;
}

export function useMarketAuthorization(marketState: MarketState | undefined): AuthorizationState {
    const { address, isConnected } = useAccount();

    const { data: protocolAddress } = usePredictionProtocolAddress();

    return useMemo(() => {
        if (!isConnected || !address) {
            return {
                isConnected: false,
                isAuthorized: false,
                canWithdraw: false,
                protocolAddress: protocolAddress,
                reason: "Connect wallet to perform actions",
            };
        }

        const protocol = protocolAddress;
        if (!protocol) {
            return {
                isConnected: true,
                isAuthorized: false,
                canWithdraw: false,
                protocolAddress: undefined,
                reason: "Loading protocol address...",
            };
        }

        const isAuthorized = address.toLowerCase() === protocol.toLowerCase();
        const hasFees = marketState?.accruedFees && marketState.accruedFees > 0n;

        if (!isAuthorized) {
            return {
                isConnected: true,
                isAuthorized: false,
                canWithdraw: false,
                protocolAddress: protocol,
                reason: `Only protocol wallet (${protocol.slice(0, 6)}...${protocol.slice(-4)}) can withdraw fees`,
            };
        }

        if (!hasFees) {
            return {
                isConnected: true,
                isAuthorized: true,
                canWithdraw: false,
                protocolAddress: protocol,
                reason: "No fees available to withdraw",
            };
        }

        return {
            isConnected: true,
            isAuthorized: true,
            canWithdraw: true,
            protocolAddress: protocol,
            reason: undefined,
        };
    }, [address, isConnected, marketState, protocolAddress]);
}
