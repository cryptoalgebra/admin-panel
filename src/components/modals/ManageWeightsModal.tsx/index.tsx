import Loader from "@/components/common/Loader";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza"
import { Input } from "@/components/ui/input";
import { usePrepareEternalFarmingSetWeights } from "@/generated";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import { usePool } from "@/hooks/pools/usePool";
import { IncentiveKey } from "@/types/incentive-key";
import { useState } from "react";
import { useContractWrite } from "wagmi";

interface IManageWeightsModal {
    title: string;
    incentiveKey: IncentiveKey;
    children: React.ReactNode;
}

const ManageWeightsModal = ({ title,  incentiveKey, children }: IManageWeightsModal) => {

    const [weight0, setWeight0] = useState<number>(0)
    const [weight1, setWeight1] = useState<number>(0)

    const [,pool] = usePool(incentiveKey.pool);

    const token0Symbol = pool?.token0.symbol;
    const token1Symbol = pool?.token1.symbol;

    const { config } = usePrepareEternalFarmingSetWeights({
        args: [incentiveKey, weight0 * 10, weight1 * 10],
    })

    const { data, write } = useContractWrite(config)

    const { isLoading } = useTransitionAwait(data?.hash, title)

    return <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white !rounded-3xl">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className={'flex flex-col gap-2'}>
                    <div className="flex justify-between items-center gap-2">
                        <label className="w-full">
                            <p className="text-sm mb-2">{token0Symbol ? token0Symbol : 'Token 0'}'s weight, %</p>
                            <Input
                                id="weight0"
                                placeholder="Enter weight0, %"
                                type="number"
                                name="weight0"
                                value={weight0 || ''}
                                onChange={(e) => {
                                    if(Number(e.target.value) >= 100) {
                                        setWeight0(100);
                                        setWeight1(0);
                                        return;
                                    }
                                    if(Number(e.target.value) <= 0) {
                                        setWeight0(0)
                                        setWeight1(100)
                                        return;
                                    }
                                    setWeight0(Number(e.target.value))
                                    setWeight1(Number(100 - Number(e.target.value)))
                                }}
                            />
                        </label>
                        <label className="w-full">
                            <p className="text-sm mb-2">{token1Symbol ? token1Symbol : 'Token 1'}'s weight, %, %</p>
                            <Input
                                id="weight1"
                                placeholder="Enter weight1, %"
                                type="number"
                                name="weight1"
                                value={weight1 || ''}
                                onChange={(e) => {
                                    if(Number(e.target.value) >= 100) {
                                        setWeight1(100);
                                        setWeight0(0);
                                        return;
                                    }
                                    if(Number(e.target.value) <= 0) {
                                        setWeight1(0)
                                        setWeight0(100)
                                        return;
                                    }
                                    setWeight1(Number(e.target.value))
                                    setWeight0(Number(100 - Number(e.target.value)))
                                }}
                            />
                        </label>
                    </div>
                    <button
                        disabled={isLoading || (!weight0 && !weight1) || !write}
                        onClick={() => write?.()}
                        className="flex items-center justify-center mt-2 py-2 px-4 w-full bg-blue-500 text-white font-bold rounded-xl disabled:bg-blue-400 hover:bg-blue-400"
                    >
                        {isLoading ? <Loader /> : 'Confirm'}
                    </button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>

}

export default ManageWeightsModal