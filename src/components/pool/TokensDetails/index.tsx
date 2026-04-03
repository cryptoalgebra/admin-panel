import { DataRow } from "@/components/common/DataRow";
import Loader from "@/components/common/Loader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatBox } from "@/components/common/StatBox";
import { useSinglePoolQuery } from "@/graphql/generated/graphql";
import { useBlockExplorerUrl } from "@/hooks/common/useBlockExplorerUrl";
import { Coins } from "lucide-react";
import { useMemo } from "react";
import { Address } from "viem";

interface ITokenDetails {
    name: string;
    poolId: Address;
}

const TokenDetails = ({ name, poolId }: ITokenDetails) => {
    const explorerBaseUrl = useBlockExplorerUrl();

    const { data: pool } = useSinglePoolQuery({
        variables: {
            poolId,
        },
    });

    const formattedPool = useMemo(() => {
        if (!pool?.pool) return;

        return {
            token0To1Rate: Number(pool.pool.token1Price).toFixed(6),
            token1To0Rate: Number(pool.pool.token0Price).toFixed(6),
        };
    }, [pool]);

    const token0 = pool?.pool?.token0;
    const token1 = pool?.pool?.token1;

    if (!token0 || !token1) {
        return (
            <SectionCard title={name} icon={Coins}>
                <div className="flex items-center justify-center py-8">
                    <Loader color="currentColor" />
                </div>
            </SectionCard>
        );
    }

    return (
        <SectionCard title={name} icon={Coins}>
            <div className="grid grid-cols-2 gap-3 pb-4">
                <StatBox label={`${token0.symbol} → ${token1.symbol}`} value={formattedPool ? `1 = ${formattedPool.token0To1Rate}` : "-"} />
                <StatBox label={`${token1.symbol} → ${token0.symbol}`} value={formattedPool ? `1 = ${formattedPool.token1To0Rate}` : "-"} />
            </div>
            <div className="divide-y divide-border">
                <DataRow label="Pool Address" copyable={poolId} link={`${explorerBaseUrl}/address/${poolId}`} />
                <DataRow label={`${token0.symbol} Address`} copyable={token0.id} link={`${explorerBaseUrl}/address/${token0.id}`} />
                <DataRow label={`${token1.symbol} Address`} copyable={token1.id} link={`${explorerBaseUrl}/address/${token1.id}`} />
            </div>
        </SectionCard>
    );
};

export default TokenDetails;
