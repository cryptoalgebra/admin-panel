import { DataRow } from "@/components/common/DataRow";
import Loader from "@/components/common/Loader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatBox } from "@/components/common/StatBox";
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
        <SectionCard title="Farm Details" icon={Info}>
            <div className="grid grid-cols-2 gap-3 pb-4">
                <StatBox label="Min Position Width" value={minimalPositionWidth} />
                <StatBox label="Deposits" value={depositsOnFarm !== undefined ? depositsOnFarm : "-"} />
            </div>
            <div className="divide-y divide-border">
                <DataRow label="Farm ID" value={<span className="text-xs font-mono break-all">{id}</span>} />
            </div>

            {!isDeactivated && (
                <div className="mt-4 pt-4 border-t border-border">
                    <Button disabled={isLoading || isPending} onClick={handleDeactivate} variant="destructive" className="w-full">
                        {isLoading || isPending ? <Loader color="currentColor" /> : "Deactivate Farm"}
                    </Button>
                </div>
            )}
        </SectionCard>
    );
};

export default FarmDetails;
