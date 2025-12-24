import { defineChain } from "viem";
import { configureChains, createConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { publicProvider } from "wagmi/providers/public";

const baseSepoliaChain = /*#__PURE__*/ defineChain({
    id: 84532,
    network: "baseSepolia",
    name: "Base Sepolia",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://base-sepolia-rpc.publicnode.com"],
        },
        public: {
            http: ["https://base-sepolia-rpc.publicnode.com"],
        },
    },
    blockExplorers: {
        default: {
            name: "Basescan",
            url: "https://sepolia.basescan.org",
        },
        etherscan: {
            name: "Basescan",
            url: "https://sepolia.basescan.org",
        },
    },
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 1059647,
        },
    },
});

const { chains, publicClient, webSocketPublicClient } = configureChains([baseSepoliaChain], [publicProvider()]);

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
