import { Currency, WNATIVE } from "@cryptoalgebra/integral-sdk";
import React from "react";
import { Address } from "viem";
import USDTLogo from "@/assets/tokens/usdt.png";
import BNBLogo from "@/assets/tokens/bnb.png";
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
        symbol: "WBNB",
        logo: BNBLogo,
    },
    ["0x55d398326f99059fF775485246999027B3197955".toLowerCase()]: {
        symbol: "USDT",
        logo: USDTLogo,
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
                src={BNBLogo}
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
