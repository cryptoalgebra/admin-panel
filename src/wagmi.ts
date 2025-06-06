import { defineChain } from 'viem'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { publicProvider } from 'wagmi/providers/public'

export const ronin = defineChain({
  id: 2020,
  name: 'Ronin',
  network: 'ronin',
  nativeCurrency: { name: 'RON', symbol: 'RON', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://api.roninchain.com/rpc'],
    },
    public: {
      http: ['https://api.roninchain.com/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Ronin Explorer',
      url: 'https://app.roninchain.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 26023535,
    },
  },
})

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ronin],
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