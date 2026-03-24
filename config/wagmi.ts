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

const kite = defineChain({
    id: 2366,
    network: "kite",
    name: "KiteAI",
    nativeCurrency: {
        name: "KITE",
        symbol: "KITE",
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ["https://rpc-virginia.gokite.ai"],
        },
        public: {
            http: ["https://rpc-virginia.gokite.ai"],
        },
    },
    blockExplorers: {
        default: {
            name: "KiteScan",
            url: "https://kitescan.ai",
        },
    },
    contracts: {
        multicall3: {
            address: "0xE3104A157cc4C0d3c7C3a8c655092668D068c149",
            blockCreated: 29260,
        },
    },
});

/* configure supported networks here */
export const wagmiNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [kite];

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
