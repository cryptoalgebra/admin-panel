import Loader from "@/components/common/Loader";
import { ALGEBRA_ETERNAL_FARMING } from "config/contract-addresses";
import { DEFAULT_CHAIN_ID } from "config/default-chain";
import { eternalFarmingABI } from "config/abis";
import { useAllDepositsOnFarmingQuery } from "@/graphql/generated/graphql";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { IncentiveKey } from "@/types/incentive-key";
import { useWriteContract } from "wagmi";
import { useClients } from "@/hooks/graphql/useClients";

interface IFarmDetails {
    id: string;
    incentiveKey: IncentiveKey;
    isDeactivated: boolean;
}

const FarmDetails = ({ id, incentiveKey, isDeactivated }: IFarmDetails) => {
    const { farmingClient } = useClients();
    const { data: deposits } = useAllDepositsOnFarmingQuery({
        skip: !id || isDeactivated,
        client: farmingClient,
        variables: {
            farmId: id || "",
        },
    });

    const depositsOnFarm = deposits ? deposits.deposits.length : undefined;

    const { data, writeContract, isPending } = useWriteContract();

    const { isLoading } = useTransactionAwait(data, "Deactivate Farm");

    const handleDeactivate = () => {
        writeContract({
            address: ALGEBRA_ETERNAL_FARMING[DEFAULT_CHAIN_ID],
            abi: eternalFarmingABI,
            functionName: "deactivateIncentive",
            args: [incentiveKey],
        });
    };

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
                        disabled={isLoading || isPending}
                        onClick={handleDeactivate}
                        className="flex justify-center w-full py-2 px-4 border border-red-200 text-red-500 font-medium text-sm rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    >
                        {isLoading || isPending ? <Loader color="currentColor" /> : "Deactivate"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FarmDetails;
