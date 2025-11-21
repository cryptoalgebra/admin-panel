import { defineChain } from 'viem'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { publicProvider } from 'wagmi/providers/public'

export const plasma = defineChain({
    id: 531050204,
    network: "sophon-os-testnet",
    name: "SophonOSTestnet",
    nativeCurrency: { name: "SOPH", symbol: "SOPH", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://zksync-os-testnet-sophon.zksync.dev"],
        },
        public: {
            http: ["https://zksync-os-testnet-sophon.zksync.dev"],
        },
    },
    blockExplorers: {
        default: {
            name: "SophonOSTestnet",
            url: "https://block-explorer.zksync-os-testnet-sophon.zksync.dev",
        },
    },
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 1468,
        },
    },
})

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [plasma],
  [
    publicProvider(),
  ],
)

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({ chains, options: { projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID, metadata: { name: 'Algebra Integral Admin Panel', description: 'Admin Panel', url: 'https://admin.algebra.finance', icons: [''] }  } }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})