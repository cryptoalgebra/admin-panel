import { Currency } from "@cryptoalgebra/integral-sdk";
import React from "react";
import { Address } from "wagmi";
import USDRLogo from "@/assets/tokens/usdr.png";
import USDCLogo from "@/assets/tokens/usdc.svg";
import { cn } from "@/lib/utils";

interface CurrencyLogoProps {
    currency: Currency | undefined | null;
    size: number;
    className?: string;
    style?: React.CSSProperties;
}

export const specialTokens: {
    [key: Address]: { symbol: string; logo: string };
} = {
    ["0x0000000000000000000000000000000000000400"]: {
        symbol: "USDr",
        logo: USDRLogo,
    },
    ["0x7fb2491d015f6c0271fdfcbb7712feeb43ebe50e"]: {
        symbol: "USDC",
        logo: USDCLogo,
    },
};

const CurrencyLogo = ({ currency, size, className, style = {} }: CurrencyLogoProps) => {
    if (!currency) return;
    // if (!currency) return <Skeleton className={cn(`flex rounded-full bg-card`, className)} style={{ minWidth: `${size}px`, minHeight: `${size}px`, width: `${size}px`, height: `${size}px`, ...style }} />

    const address = currency.wrapped.address.toLowerCase() as Address;

    const classString = cn(`w-[${size}px] h-[${size}px] min-w-[${size}px] min-h-[${size}px] bg-card-dark rounded-full`, className);

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
                src={USDRLogo}
                alt={"USDR"}
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
