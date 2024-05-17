import Loader from "@/components/common/Loader";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { useAlgebraVirtualPoolRateLimits, usePrepareEternalFarmingSetDynamicRateLimits } from "@/generated";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import { usePool } from "@/hooks/pools/usePool";
import { IncentiveKey } from "@/types/incentive-key";
import { ADDRESS_ZERO } from "@cryptoalgebra/integral-sdk";
import { useState, useEffect } from "react";
import { formatUnits } from "viem";
import { Address, useContractWrite } from "wagmi";

interface IManageRateLimitsModal {
    title: string;
    incentiveKey: IncentiveKey;
    children: React.ReactNode;
    virtualPool: Address;
}

const ManageRateLimitsModal = ({ title, incentiveKey, virtualPool, children }: IManageRateLimitsModal) => {
    const { data: initialRateLimits } = useAlgebraVirtualPoolRateLimits({
        address: virtualPool,
    });

    const [maxRate0, setMaxRate0] = useState<string>("");
    const [maxRate1, setMaxRate1] = useState<string>("");
    const [minRate0, setMinRate0] = useState<string>("");
    const [minRate1, setMinRate1] = useState<string>("");

    const [, pool] = usePool(incentiveKey.pool);

    const isSingleReward = incentiveKey.bonusRewardToken === ADDRESS_ZERO;

    const token0Symbol = pool?.token0.symbol;
    const token1Symbol = pool?.token1.symbol;

    const { config } = usePrepareEternalFarmingSetDynamicRateLimits({
        args: [
            incentiveKey,
            BigInt(Number(maxRate0) * 10 ** (pool?.token0.decimals || 0)),
            BigInt(Number(maxRate1) * 10 ** (pool?.token1.decimals || 0)),
            BigInt(Number(minRate0) * 10 ** (pool?.token0.decimals || 0)),
            BigInt(Number(minRate1) * 10 ** (pool?.token1.decimals || 0)),
        ],
    });

    const { data, write } = useContractWrite(config);

    const { isLoading } = useTransitionAwait(data?.hash, title);

    useEffect(() => {
        if (initialRateLimits && pool && pool.token0 && pool.token1) {
            const [maxRate0, maxRate1, minRate0, minRate1] = initialRateLimits;
            setMaxRate0(formatUnits(maxRate0, pool.token0.decimals));
            setMaxRate1(formatUnits(maxRate1, pool.token1.decimals));
            setMinRate0(formatUnits(minRate0, pool.token0.decimals));
            setMinRate1(formatUnits(minRate1, pool.token1.decimals));
        }
    }, [initialRateLimits, pool]);

    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white !rounded-3xl">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className={"flex flex-col gap-2"}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="text-sm mb-2">{token0Symbol} Rate Limits</p>
                            <label className="w-full flex gap-2">
                                <Input
                                    id="minRate0"
                                    placeholder={`Enter min. ${token0Symbol} Rate`}
                                    type="string"
                                    name="minRate0"
                                    value={minRate0}
                                    onUserInput={setMinRate0}
                                />
                                <Input
                                    id="maxRate0"
                                    placeholder={`Enter max. ${token0Symbol} Rate`}
                                    type="string"
                                    name="maxRate0"
                                    value={maxRate0}
                                    onUserInput={setMaxRate0}
                                />
                            </label>
                        </div>
                        {!isSingleReward && (
                            <div>
                                <p className="text-sm mb-2">{token1Symbol} Rate Limits </p>
                                <label className="w-full flex gap-2">
                                    <Input
                                        id="minRate1"
                                        placeholder={`Enter min. ${token1Symbol} Rate`}
                                        type="string"
                                        name="minRate1"
                                        value={minRate1}
                                        onUserInput={setMinRate1}
                                    />
                                    <Input
                                        id="maxRate1"
                                        placeholder={`Enter max. ${token1Symbol} Rate`}
                                        type="string"
                                        name="maxRate1"
                                        value={maxRate1}
                                        onUserInput={setMaxRate1}
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => write?.()}
                        className="flex items-center justify-center mt-2 py-2 px-4 w-full bg-blue-500 text-white font-bold rounded-xl disabled:bg-blue-400 hover:bg-blue-400"
                    >
                        {isLoading ? <Loader /> : "Confirm"}
                    </button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ManageRateLimitsModal;
