import { ADDRESS_ZERO, ChainId } from "@cryptoalgebra/integral-sdk";
import { Address } from "viem";

export type PoolDeployerType = "BASE" | "LIMIT_ORDERS" | "ALM" | "AI";

export const CUSTOM_POOL_DEPLOYER_ADDRESSES: Record<PoolDeployerType, Record<number, Address>> = {
    BASE: {
        [ChainId.PharosTestnet]: ADDRESS_ZERO,
    },
    /* Replace with `null` to use as a stub */
    LIMIT_ORDERS: {
        [ChainId.PharosTestnet]: null,
    },
    ALM: {
        [ChainId.PharosTestnet]: null,
    },
    AI: {
        [ChainId.PharosTestnet]: null,
    },
} as const;

export const CUSTOM_POOL_DEPLOYER_TITLES: Record<PoolDeployerType, string> = {
    BASE: "Base",
    LIMIT_ORDERS: "Limit Orders",
    ALM: "ALM",
    AI: "AI",
} as const;

export const customPoolDeployerTitleByAddress: Record<Address, string> = Object.fromEntries(
    Object.entries(CUSTOM_POOL_DEPLOYER_ADDRESSES).flatMap(([key, chainMap]) =>
        Object.values(chainMap).map((address) => [
            address?.toLowerCase(),
            CUSTOM_POOL_DEPLOYER_TITLES[key as keyof typeof CUSTOM_POOL_DEPLOYER_TITLES],
        ])
    )
);
