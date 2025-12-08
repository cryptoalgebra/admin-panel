import { ContractConfig } from "@wagmi/cli";
import { AppKitNetwork } from "@reown/appkit/networks";
import {
    algebraBasePluginABI,
    algebraFactoryABI,
    algebraPoolABI,
    algebraStubPluginABI,
    algebraVirtualPoolABI,
    eternalFarmingABI,
    farmingCenterABI,
    pluginFactoryABI,
} from "./abis";
import {
    ALGEBRA_ETERNAL_FARMING,
    ALGEBRA_FACTORY,
    ALGEBRA_STUB_PLUGIN,
    FARMING_CENTER,
    PLUGIN_FACTORY,
} from "./contract-addresses";
import { defineChain } from "viem";

export const sophonOSTestnet = defineChain({
    id: 531050204,
    network: "sophon-os-testnet",
    name: "SophonOSTestnet",
    nativeCurrency: { name: "SOPH", symbol: "SOPH", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://zksync-os-testnet-sophon.zksync.dev"],
        },
        public: {
            http: ["https://zksync-os-testnet-sophon.zksync.dev"],
        },
    },
    blockExplorers: {
        default: {
            name: "SophonOSTestnet",
            url: "https://block-explorer.zksync-os-testnet-sophon.zksync.dev",
        },
    },
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 1468,
        },
    },
});

/* configure supported networks here */
export const wagmiNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [sophonOSTestnet];

const rawContracts = [
    { name: "AlgebraFactory", abi: algebraFactoryABI },
    { name: "AlgebraPool", abi: algebraPoolABI },
    { name: "AlgebraBasePlugin", abi: algebraBasePluginABI },
    { name: "AlgebraEternalFarming", abi: eternalFarmingABI },
    { name: "FarmingCenter", abi: farmingCenterABI },
    { name: "PluginFactory", abi: pluginFactoryABI },
    { name: "AlgebraVirtualPool", abi: algebraVirtualPoolABI },
    { name: "AlgebraStubPlugin", abi: algebraStubPluginABI },
];

const contractAddresses = {
    AlgebraFactory: ALGEBRA_FACTORY,
    AlgebraEternalFarming: ALGEBRA_ETERNAL_FARMING,
    FarmingCenter: FARMING_CENTER,
    PluginFactory: PLUGIN_FACTORY,
    AlgebraStubPlugin: ALGEBRA_STUB_PLUGIN,
};

export const wagmiContracts: ContractConfig[] = rawContracts.map((contract) => ({
    name: contract.name,
    abi: contract.abi,
    address: contractAddresses[contract.name as keyof typeof contractAddresses],
}));
