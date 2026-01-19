import { defineChain } from 'viem'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { publicProvider } from 'wagmi/providers/public'

const citreaChain = /*#__PURE__*/ defineChain({
  id: 4114,
  network: "citrea",
  name: "Citrea",
  nativeCurrency: { name: "WCBTC", symbol: "WCBTC", decimals: 18 },
  rpcUrls: {
      default: {
          http: ["https://rpc.mainnet.citrea.xyz"],
      },
      public: {
          http: ["https://rpc.mainnet.citrea.xyz"],
      },
  },
  blockExplorers: {
      default: {
          name: "Citrea Explorer",
          url: "https://explorer.mainnet.citrea.xyz",
      }
  }
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [citreaChain],
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