import { Currency, WNATIVE } from "@cryptoalgebra/integral-sdk";
import React from "react";
import { Address } from "viem";
import BTCLogo from "@/assets/tokens/wbtc.svg";
import USDCLogo from "@/assets/tokens/usdc.svg";
import EtherLogo from "@/assets/tokens/ether.svg";
import ProjectXLogo from "@/assets/tokens/project-x.jpg";
import TOKENLogo from "@/assets/algebra-logo.svg";
import { cn } from "@/utils/common/cn";
import { DEFAULT_CHAIN_ID, DEFAULT_NATIVE_SYMBOL } from "config/default-chain";

interface CurrencyLogoProps {
    currency: Currency | undefined | null;
    size: number;
    className?: string;
    style?: React.CSSProperties;
}

export const specialTokens: {
    [key: Address]: { symbol: string; logo: string };
} = {
    [WNATIVE[DEFAULT_CHAIN_ID].address.toLowerCase()]: {
        symbol: "WETH",
        logo: EtherLogo,
    },
    ["0xabac6f23fdf1313fc2e9c9244f666157ccd32990"]: {
        symbol: "USDC",
        logo: USDCLogo,
    },
    ["0x50d22384026efc4b5bd3734a7456bfab35c929a4"]: {
        symbol: "BTC",
        logo: BTCLogo,
    },
    ["0x253f3460bc16074b960f80421d72e6fa6ef786c8"]: {
        symbol: "TOKEN",
        logo: TOKENLogo,
    },
    ["0x0ebdc0b736b34207f6e8abe10c282b4003021a22"]: {
        symbol: "PROJECTX",
        logo: ProjectXLogo,
    },
};

const CurrencyLogo = ({ currency, size, className, style = {} }: CurrencyLogoProps) => {
    if (!currency) return;
    // if (!currency) return <Skeleton className={cn(`flex rounded-full bg-card`, className)} style={{ minWidth: `${size}px`, minHeight: `${size}px`, width: `${size}px`, height: `${size}px`, ...style }} />

    const address = currency.wrapped.address.toLowerCase() as Address;

    const classString = cn(`w-[${size}px] h-[${size}px] min-w-[${size}px] min-h-[${size}px] bg-black rounded-full`, className);

    if (address in specialTokens) {
        return (
            <img
                src={specialTokens[address].logo}
                alt={specialTokens[address].symbol}
                width={size}
                height={size}
                className={classString}
                style={{
                    ...style,
                    minWidth: `${size}px`,
                    minHeight: `${size}px`,
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
        );
    }

    if (currency.isNative) {
        return (
            <img
                src={EtherLogo}
                alt={DEFAULT_NATIVE_SYMBOL}
                className={classString}
                style={{
                    ...style,
                    minWidth: `${size}px`,
                    minHeight: `${size}px`,
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
        );
    }

    return (
        <div
            className={`${classString} flex items-center justify-center bg-gray-200 text-black`}
            style={{
                minWidth: `${size}px`,
                minHeight: `${size}px`,
                width: `${size}px`,
                height: `${size}px`,
                ...style,
            }}
        >
            {currency.symbol?.slice(0, 2)}
        </div>
    );
};

export default CurrencyLogo;
