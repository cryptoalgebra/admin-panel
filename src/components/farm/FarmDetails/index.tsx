import Loader from "@/components/common/Loader";
import { ALGEBRA_ETERNAL_FARMING } from "@/constants/addresses";
import { eternalFarmingABI } from "@/generated";
import { farmsClient } from "@/graphql/clients";
import { useAllDepositsOnFarmingQuery } from "@/graphql/generated/graphql";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import { IncentiveKey } from "@/types/incentive-key";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";

interface IFarmDetails {
    id: string;
    incentiveKey: IncentiveKey;
    isDeactivated: boolean;
    minimalPositionWidth: number;
    poolDeployer: Address;
}

const FarmDetails = ({ id, incentiveKey, isDeactivated, minimalPositionWidth, poolDeployer }: IFarmDetails) => {
    const { data: deposits } = useAllDepositsOnFarmingQuery({
        skip: !id || isDeactivated,
        client: farmsClient,
        variables: {
            farmId: id || "",
        },
    });

    const depositsOnFarm = deposits ? deposits.deposits.length : undefined;

    const { config } = usePrepareContractWrite({
        address: ALGEBRA_ETERNAL_FARMING,
        abi: eternalFarmingABI,
        functionName: "deactivateIncentive",
        args: [incentiveKey, poolDeployer],
    });

    const { data, write } = useContractWrite(config);

    const { isLoading } = useTransitionAwait(data?.hash, "Deactivate Farm");

    return (
        <div className="flex flex-col text-left p-4 border rounded-xl">
            <div className="font-bold mb-4">Farm Details</div>
            <div className="flex flex-col gap-4">
                <div>
                    <div className="font-semibold text-sm">Farm ID</div>
                    <div>{id}</div>
                </div>
                <div>
                    <div className="font-semibold text-sm">Minimal position width</div>
                    <div>{minimalPositionWidth}</div>
                </div>
                <div>
                    <div className="font-semibold text-sm">Deposits</div>
                    {depositsOnFarm !== undefined ? <div>{depositsOnFarm}</div> : <div></div>}
                </div>
            </div>
            <div className="w-full mt-auto">
                {!isDeactivated && (
                    <button
                        disabled={isLoading || !write}
                        onClick={() => write && write()}
                        className="flex justify-center w-full py-2 px-4 border border-red-200 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white"
                    >
                        {isLoading ? <Loader color="currentColor" /> : "Deactivate"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FarmDetails;
