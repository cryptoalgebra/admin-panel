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
import { predictionMarketABI } from "./abis/prediction";

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

/* configure supported networks here */
export const wagmiNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [baseSepoliaChain];

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
    { name: "PredictionMarket", abi: predictionMarketABI }
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
