import { defineChain } from 'viem'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { publicProvider } from 'wagmi/providers/public'

export const tac = defineChain({
  id: 239,
  name: 'TAC',
  network: 'tac-mainnet',
  nativeCurrency: { name: 'TAC', symbol: 'TAC', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/tac'],
    },
    public: {
      http: ['https://rpc.ankr.com/tac'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://tac.blockscout.com',
    },
    native: {
      name: 'TAC Explorer',
      url: 'https://explorer.tac.build',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 0,
    },
  },
})
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [tac],
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