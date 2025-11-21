import Loader from "@/components/common/Loader";
import { ALGEBRA_ETERNAL_FARMING } from "@/constants/addresses";
import { eternalFarmingABI } from "@/generated";
import { farmsClient } from "@/graphql/clients";
import { useAllDepositsOnFarmingQuery } from "@/graphql/generated/graphql";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import { IncentiveKey } from "@/types/incentive-key";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

interface IFarmDetails {
    id: string;
    incentiveKey: IncentiveKey;
    isDeactivated: boolean;
}

const FarmDetails = ({ id, incentiveKey, isDeactivated }: IFarmDetails) => {
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
        args: [incentiveKey],
    });

    const { data, write } = useContractWrite(config);

    const { isLoading } = useTransitionAwait(data?.hash, "Deactivate Farm");

    return (
        <div className="flex flex-col text-left p-6 bg-white border border-neutral-200 rounded-lg">
            <div className="font-semibold text-lg mb-6">Farm Details</div>
            <div className="flex flex-col gap-4">
                <div>
                    <div className="text-xs text-neutral-500 mb-1">Farm ID</div>
                    <div className="text-sm">{id}</div>
                </div>
                <div>
                    <div className="text-xs text-neutral-500 mb-1">Deposits</div>
                    {depositsOnFarm !== undefined ? <div className="text-sm">{depositsOnFarm}</div> : <div></div>}
                </div>
            </div>
            <div className="w-full mt-auto">
                {!isDeactivated && (
                    <button
                        disabled={isLoading || !write}
                        onClick={() => write && write()}
                        className="flex justify-center w-full py-2 px-4 border border-red-200 text-red-500 font-medium text-sm rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    >
                        {isLoading ? <Loader color="currentColor" /> : "Deactivate"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FarmDetails;
