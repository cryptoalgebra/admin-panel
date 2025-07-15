import { defineChain } from 'viem'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { publicProvider } from 'wagmi/providers/public'

const hyperEvmTestnet = defineChain({
  id: 998,
  network: "hyperEVM-testnet",
  name: "Hyperliquid EVM Testnet",
  nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 18 },
  rpcUrls: {
      default: {
          http: ["https://998.rpc.thirdweb.com/c12d40e08559e44221f53ce0a23b7e67"],
      },
      public: {
        http: ["https://998.rpc.thirdweb.com/c12d40e08559e44221f53ce0a23b7e67"],
    },
  },
  blockExplorers: {
      default: {
          name: "Purrsec",
          url: "https://testnet.purrsec.com",
      },
  },
  testnet: true,
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [hyperEvmTestnet],
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