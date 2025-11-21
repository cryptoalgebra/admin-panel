import { defineChain } from 'viem'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { publicProvider } from 'wagmi/providers/public'

export const mantraDuKongEVMTestnet = /*#__PURE__*/ defineChain({
  id: 5887,
  name: 'MANTRA DuKong EVM Testnet',
  network: 'mantra-dukong',
  nativeCurrency: {
    decimals: 18,
    name: 'OM',
    symbol: 'OM',
  },
  rpcUrls: {
    default: { http: ['https://evm.dukong.mantrachain.io'] },
    public: { http: ['https://evm.dukong.mantrachain.io'] },
  },
  blockExplorers: {
    default: {
      name: 'MANTRAScan',
      url: 'https://mantrascan.io/dukong',
    },
  },
  testnet: true,
})

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mantraDuKongEVMTestnet],
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