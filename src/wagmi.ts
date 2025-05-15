import { defineChain } from 'viem'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { publicProvider } from 'wagmi/providers/public'

const prom = defineChain({
  id: 227,
  name: 'Prom',
  network: 'prom',
  nativeCurrency: { name: 'Prom', symbol: 'PROM', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.prom.io/'],
    },
    public: {
      http: ['https://rpc.prom.io/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Promscan',
      url: 'https://promscan.io',
    },
  },
})

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [prom],
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