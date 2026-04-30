import { defineChain } from "viem";
import { configureChains, createConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { publicProvider } from "wagmi/providers/public";

const raylsMainnet = /*#__PURE__*/ defineChain({
    id: 72957,
    network: "rayls",
    name: "Rayls",
    nativeCurrency: { name: "USDR", symbol: "USDR", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://mainnet-rpc.rayls.com"],
        },
        public: {
            http: ["https://mainnet-rpc.rayls.com"],
        },
    },
    blockExplorers: {
        default: {
            name: "RaylsScan",
            url: "https://explorer.rayls.com",
        },
    },
});

const { chains, publicClient, webSocketPublicClient } = configureChains([raylsMainnet], [publicProvider()]);

export const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new WalletConnectConnector({
            chains,
            options: {
                projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
                metadata: {
                    name: "Algebra Integral Admin Panel",
                    description: "Admin Panel",
                    url: "https://admin.algebra.finance",
                    icons: [""],
                },
            },
        }),
        new InjectedConnector({
            chains,
            options: {
                name: "Injected",
                shimDisconnect: true,
            },
        }),
    ],
    publicClient,
    webSocketPublicClient,
});
