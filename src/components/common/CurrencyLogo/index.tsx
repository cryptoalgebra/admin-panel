import { Currency, WNATIVE } from "@cryptoalgebra/integral-sdk";
import React from "react";
import { Address } from "viem";
import USDCLogo from "@/assets/tokens/usdc.svg";
import EthLogo from "@/assets/tokens/ether.svg";
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
        logo: EthLogo,
    },
    ["0x95e325a85b9e6cb4dea2ccd96218e5f8365e0b0f"]: {
        symbol: "USDC",
        logo: USDCLogo,
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
                src={EthLogo}
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
