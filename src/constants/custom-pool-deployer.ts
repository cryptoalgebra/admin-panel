import { ADDRESS_ZERO } from "@cryptoalgebra/custom-pools-and-sliding-fee-sdk";
import { ALGEBRA_STUB_PLUGIN } from "./addresses";

export const CUSTOM_POOL_DEPLOYER_TITLES: { [key: string]: string } = {
    [ALGEBRA_STUB_PLUGIN.toLowerCase()]: "NO PLUGIN",
    ["0x80968dCD8e9bFA7E4c0332E4a3220C69C2F244D8".toLowerCase()]: "All-Inclusive",
    [ADDRESS_ZERO]: "BASE",
};
