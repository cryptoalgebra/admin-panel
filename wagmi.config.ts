import { ContractConfig, defineConfig } from "@wagmi/cli";
import { actions, react } from "@wagmi/cli/plugins";
import {
    algebraBasePluginABI,
    algebraFactoryABI,
    algebraPoolABI,
    eternalFarmingABI,
    farmingCenterABI,
    pluginFactoryABI,
    algebraStubPluginABI,
    algebraVirtualPoolABI,
    voterABI,
    votingRewardABI,
} from "./src/abis";
import {
    ALGEBRA_FARMING_CENTER,
    ALGEBRA_ETERNAL_FARMING,
    ALGEBRA_FACTORY,
    PLUGIN_FACTORY,
    ALGEBRA_STUB_PLUGIN,
    VOTER,
} from "./src/constants/addresses";

const contracts: ContractConfig[] = [
    {
        address: ALGEBRA_FARMING_CENTER,
        name: "FarmingCenter",
        abi: farmingCenterABI,
    },
    {
        address: ALGEBRA_ETERNAL_FARMING,
        name: "EternalFarming",
        abi: eternalFarmingABI,
    },
    {
        address: ALGEBRA_FACTORY,
        name: "AlgebraFactory",
        abi: algebraFactoryABI,
    },
    {
        address: PLUGIN_FACTORY,
        name: "PluginFactory",
        abi: pluginFactoryABI,
    },
    {
        name: "AlgebraPool",
        abi: algebraPoolABI,
    },
    {
        name: "AlgebraBasePlugin",
        abi: algebraBasePluginABI,
    },
    {
        name: "AlgebraStubPlugin",
        abi: algebraStubPluginABI,
        address: ALGEBRA_STUB_PLUGIN,
    },
    {
        name: "AlgebraVirtualPool",
        abi: algebraVirtualPoolABI,
    },
    {
        name: "Voter",
        abi: voterABI,
        address: VOTER,
    },
    {
        name: "VotingReward",
        abi: votingRewardABI,
    },
];

export default defineConfig({
    out: "src/generated.ts",
    contracts,
    plugins: [
        actions({
            watchContractEvent: false,
        }),
        react({
            useContractEvent: false,
            useContractItemEvent: false,
        }),
    ],
});
