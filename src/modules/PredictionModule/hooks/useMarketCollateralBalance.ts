import { Address, erc20Abi } from "viem";
import { useReadContract } from "wagmi";

export function useMarketCollateralBalance(marketAddress: Address | undefined, collateralToken: Address | undefined) {
    const { data: balance, refetch, isLoading } = useReadContract({
        address: collateralToken,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: marketAddress ? [marketAddress] : undefined,
        query: { enabled: !!marketAddress && !!collateralToken },
    });

    return {
        balance: balance as bigint | undefined,
        refetch,
        isLoading,
    };
}
