import { ADDRESS_ZERO } from "@cryptoalgebra/custom-pools-and-sliding-fee-sdk";
import { ALGEBRA_STUB_PLUGIN } from "./addresses";

export const CUSTOM_POOL_DEPLOYER_TITLES: { [key: string]: string } = {
    [ALGEBRA_STUB_PLUGIN.toLowerCase()]: "NO PLUGIN",
    ["0x05d4bcB4940397C5fBA7C4E01a48Af882e84E214".toLowerCase()]: "All-Inclusive",
    [ADDRESS_ZERO]: "BASE",
};
