import { ADDRESS_ZERO } from "@cryptoalgebra/custom-pools-and-sliding-fee-sdk";

export const CUSTOM_POOL_DEPLOYER_TITLES: { [key: string]: string } = {
    "0x7e3387e0595552e992ede4476417704703866e5a": "HAVE PLUGIN",
    "0xbb75acad36f08201a49a6dd077229d95f4e7bd50": "NO PLUGIN",
    ["0xFD209C7e6b19131B2C36550950c66F0E4EbccfF0".toLowerCase()]: "All-Inclusive",
    [ADDRESS_ZERO]: "BASE",
};
