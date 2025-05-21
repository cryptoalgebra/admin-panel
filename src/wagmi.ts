import { defineChain } from 'viem'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { publicProvider } from 'wagmi/providers/public'

export const neuraTestnet = defineChain({
  id: 267,
  name: 'Neura Testnet',
  network: 'neura-testnet',
  nativeCurrency: { name: 'ANKR', symbol: 'ANKR', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet.rpc.neuraprotocol.io'],
    },
    public: {
      http: ['https://testnet.rpc.neuraprotocol.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Neura Explorer',
      url: 'https://testnet-blockscout.infra.neuraprotocol.io',
    },
  },
  testnet: true,
})

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [neuraTestnet],
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