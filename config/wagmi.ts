import { ContractConfig } from "@wagmi/cli";
import { AppKitNetwork } from "@reown/appkit/networks";
import {
    algebraBasePluginV1ABI,
    algebraFactoryABI,
    algebraPoolABI,
    algebraVirtualPoolABI,
    algebraEternalFarmingABI,
    farmingCenterABI,
    pluginFactoryABI,
    voterABI,
    votingRewardABI,
    securityRegistryAbi,
} from "./abis";
import { ALGEBRA_ETERNAL_FARMING, ALGEBRA_FACTORY, FARMING_CENTER, PLUGIN_FACTORY, SECURITY_REGISTRY, VOTER } from "./contract-addresses";
import { defineChain } from "viem";
import { slidingFeePluginAbi } from "./abis/plugins/slidingFeePlugin";

export const megaeth = /*#__PURE__*/ defineChain({
    id: 4326,
    blockTime: 1_000,
    name: 'MegaETH',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://mainnet.megaeth.com/rpc'],
            webSocket: ['wss://mainnet.megaeth.com/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Etherscan',
            url: 'https://mega.etherscan.io',
            apiUrl: 'https://api.etherscan.io/v2/api',
        },
        blockscout: {
            name: 'Etherscan',
            url: 'https://mega.etherscan.io',
            apiUrl: 'https://api.etherscan.io/v2/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 0,
        },
    },
})

export const megaethTestnet = /*#__PURE__*/ defineChain({
    id: 6343,
    blockTime: 1_000,
    name: 'MegaETH Testnet',
    nativeCurrency: {
        name: 'MegaETH Testnet Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://carrot.megaeth.com/rpc'],
            webSocket: ['wss://carrot.megaeth.com/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Etherscan',
            url: 'https://testnet-mega.etherscan.io',
            apiUrl: 'https://api.etherscan.io/v2/api',
        },
        blockscout: {
            name: 'Blockscout',
            url: 'https://megaeth-testnet-v2.blockscout.com',
            apiUrl: 'https://megaeth-testnet-v2.blockscout.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 0,
        },
    },
    testnet: true,
});

/* configure supported networks here */
export const wagmiNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [megaeth, megaethTestnet];

const rawContracts = [
    { name: "AlgebraFactory", abi: algebraFactoryABI },
    { name: "AlgebraPool", abi: algebraPoolABI },
    { name: "AlgebraBasePlugin", abi: algebraBasePluginV1ABI },
    { name: "AlgebraEternalFarming", abi: algebraEternalFarmingABI },
    { name: "FarmingCenter", abi: farmingCenterABI },
    { name: "PluginFactory", abi: pluginFactoryABI },
    { name: "AlgebraVirtualPool", abi: algebraVirtualPoolABI },
    { name: "Voter", abi: voterABI },
    { name: "VotingReward", abi: votingRewardABI },
    { name: "SlidingFeePlugin", abi: slidingFeePluginAbi },
    { name: "SecurityRegistry", abi: securityRegistryAbi },
];

const contractAddresses = {
    AlgebraFactory: ALGEBRA_FACTORY,
    AlgebraEternalFarming: ALGEBRA_ETERNAL_FARMING,
    FarmingCenter: FARMING_CENTER,
    PluginFactory: PLUGIN_FACTORY,
    Voter: VOTER,
    SecurityRegistry: SECURITY_REGISTRY,
};

export const wagmiContracts: ContractConfig[] = rawContracts.map((contract) => ({
    name: contract.name,
    abi: contract.abi,
    address: contractAddresses[contract.name as keyof typeof contractAddresses],
}));
