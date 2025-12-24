import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { ALGEBRA_ETERNAL_FARMING } from "config/contract-addresses";
import { DEFAULT_CHAIN_ID } from "config/default-chain";
import { useAllDepositsOnFarmingQuery } from "@/graphql/generated/graphql";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { IncentiveKey } from "@/types/incentive-key";
import { useWriteContract } from "wagmi";
import { useClients } from "@/hooks/graphql/useClients";
import { Address } from "viem";
import { algebraEternalFarmingABI } from "config/abis";
import { Info } from "lucide-react";

interface IFarmDetails {
    id: string;
    incentiveKey: IncentiveKey;
    isDeactivated: boolean;
    minimalPositionWidth: number;
    poolDeployer: Address;
}

const FarmDetails = ({ id, incentiveKey, isDeactivated, minimalPositionWidth, poolDeployer }: IFarmDetails) => {
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

    const { isLoading } = useTransactionAwait(data, { title: "Deactivate Farm" });

    const handleDeactivate = () => {
        writeContract({
            address: ALGEBRA_ETERNAL_FARMING[DEFAULT_CHAIN_ID],
            abi: algebraEternalFarmingABI,
            functionName: "deactivateIncentive",
            args: [incentiveKey, poolDeployer],
        });
    };

    return (
        <div className="flex flex-col text-left p-6 bg-card border border-border rounded-lg transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-bg-200 rounded-xl">
                    <Info size={18} className="text-text" />
                </div>
                <h3 className="font-semibold text-lg text-text">Farm Details</h3>
            </div>

            <div className="flex flex-col gap-5 flex-1">
                {/* Farm Info */}
                <div>
                    <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Farm ID</p>
                    <p className="text-sm text-text break-all">{id}</p>
                </div>

                <div className="h-px bg-border" />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-bg-200 rounded-lg border border-border">
                        <p className="text-xs text-text/50 mb-0.5">Min Position Width</p>
                        <p className="text-lg font-semibold text-text">{minimalPositionWidth}</p>
                    </div>
                    <div className="p-3 bg-bg-200 rounded-lg border border-border">
                        <p className="text-xs text-text/50 mb-0.5">Deposits</p>
                        <p className="text-lg font-semibold text-text">{depositsOnFarm !== undefined ? depositsOnFarm : "-"}</p>
                    </div>
                </div>
            </div>

            {/* Deactivate Button */}
            {!isDeactivated && (
                <div className="mt-6 pt-4 border-t border-border">
                    <Button disabled={isLoading || isPending} onClick={handleDeactivate} variant="destructive" className="w-full">
                        {isLoading || isPending ? <Loader color="currentColor" /> : "Deactivate Farm"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FarmDetails;
