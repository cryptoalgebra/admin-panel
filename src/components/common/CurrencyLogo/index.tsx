import { Currency } from "@cryptoalgebra/integral-sdk";
import React from "react";
import { Address } from "wagmi";
import EthLogo from "@/assets/tokens/ether.svg";
import USDTLogo from "@/assets/tokens/usdt.png";
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
  ["0xe514d9deb7966c8be0ca922de8a064264ea6bcd4"]: {
    symbol: "ETH",
    logo: EthLogo,
  },
  ["0x7d98346b3b000c55904918e3d9e2fc3f94683b01"]: {
    symbol: "USDT",
    logo: USDTLogo,
  },
  ["0x0b7007c13325c48911f73a2dad5fa5dcbf808adc"]: {
    symbol: "USDC",
    logo: USDCLogo,
  },
};

const CurrencyLogo = ({
  currency,
  size,
  className,
  style = {},
}: CurrencyLogoProps) => {
  if (!currency) return;
  // if (!currency) return <Skeleton className={cn(`flex rounded-full bg-card`, className)} style={{ minWidth: `${size}px`, minHeight: `${size}px`, width: `${size}px`, height: `${size}px`, ...style }} />

  const address = currency.wrapped.address.toLowerCase() as Address;

  const classString = cn(
    `w-[${size}px] h-[${size}px] min-w-[${size}px] min-h-[${size}px] bg-card-dark rounded-full`,
    className
  );

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
        alt={"ETH"}
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
