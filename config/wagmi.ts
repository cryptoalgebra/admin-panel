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

const pharosTestnetChain = /*#__PURE__*/ defineChain({
    id: 688689,
    network: "pharosTestnet",
    name: "Pharos Testnet",
    nativeCurrency: { name: "Pharos", symbol: "PHRS", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://atlantic.dplabs-internal.com"],
        },
        public: {
            http: ["https://atlantic.dplabs-internal.com"],
        },
    },
    blockExplorers: {
        default: {
            name: "Pharos Scan",
            url: "https://atlantic.pharosscan.xyz/",
        },
        etherscan: {
            name: "Pharos Scan",
            url: "https://atlantic.pharosscan.xyz/",
        },
    },
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11"
        },
    },
});

/* configure supported networks here */
export const wagmiNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [pharosTestnetChain];

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
