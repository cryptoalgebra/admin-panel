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
    binaryLMSRMarketManagerABI,
} from "./abis";
import {
    ALGEBRA_ETERNAL_FARMING,
    ALGEBRA_FACTORY,
    BINARY_LMSR_MARKET_MANAGER,
    FARMING_CENTER,
    PLUGIN_FACTORY,
    SECURITY_REGISTRY,
    VOTER,
} from "./contract-addresses";
import { defineChain } from "viem";
import { slidingFeePluginAbi } from "./abis/plugins/slidingFeePlugin";

const robinhoodChain = /*#__PURE__*/ defineChain({
    id: 4663,
    network: "robinhood",
    name: "Robinhood Chain",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://rpc.mainnet.chain.robinhood.com"],
        },
        public: {
            http: ["https://rpc.mainnet.chain.robinhood.com"],
        },
    },
    blockExplorers: {
        default: {
            name: "Robinhood Chain Explorer",
            url: "https://robinhoodchain.blockscout.com",
        },
        etherscan: {
            name: "Robinhood Chain Explorer",
            url: "https://robinhoodchain.blockscout.com",
        },
    },
    contracts: {
        multicall3: {
            address: "0x69D57B9D705eaD73a5d2f2476C30c55bD755cc2F",
            blockCreated: 35371485,
        },
    },
});

/* configure supported networks here */
export const wagmiNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [robinhoodChain];

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
    { name: "BinaryLMSRMarketManager", abi: binaryLMSRMarketManagerABI },
];

const contractAddresses = {
    AlgebraFactory: ALGEBRA_FACTORY,
    AlgebraEternalFarming: ALGEBRA_ETERNAL_FARMING,
    FarmingCenter: FARMING_CENTER,
    PluginFactory: PLUGIN_FACTORY,
    Voter: VOTER,
    SecurityRegistry: SECURITY_REGISTRY,
    BinaryLMSRMarketManager: BINARY_LMSR_MARKET_MANAGER,
};

export const wagmiContracts: ContractConfig[] = rawContracts.map((contract) => ({
    name: contract.name,
    abi: contract.abi,
    address: contractAddresses[contract.name as keyof typeof contractAddresses],
}));
