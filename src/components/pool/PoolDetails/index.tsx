import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import { PoolFieldsFragment } from "@/graphql/generated/graphql";
import { formatAmount } from "@/utils/common/formatAmount";
import { Info } from "lucide-react";
import { Address } from "viem";

interface IPoolDetails {
    poolId: Address;
    pool: PoolFieldsFragment;
}

const PoolDetails = ({ pool, poolId }: IPoolDetails) => {
    return (
        <div className="flex flex-col text-left p-6 bg-card border border-border rounded-lg transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-bg-200 rounded-xl">
                    <Info size={18} className="text-text" />
                </div>
                <h3 className="font-semibold text-lg text-text">Pool Details</h3>
            </div>

            <div className="flex flex-col gap-5">
                {/* Addresses */}
                <div>
                    <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Pool Address</p>
                    <DataWithCopyButton data={poolId} />
                </div>
                <div>
                    <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Deployer</p>
                    <DataWithCopyButton data={pool.deployer} />
                </div>

                <div className="h-px bg-border" />

                {/* Tick Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Current Tick</p>
                        <p className="text-base text-text">{pool.tick}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-text/50 uppercase tracking-wider mb-1.5">Tick Spacing</p>
                        <p className="text-base text-text">{pool.tickSpacing}</p>
                    </div>
                </div>

                <div className="h-px bg-border" />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-bg-200 rounded-lg border border-border">
                        <p className="text-xs text-text/50 mb-0.5">TVL USD</p>
                        <p className="text-lg font-semibold text-text">${formatAmount(pool.totalValueLockedUSD)}</p>
                    </div>
                    <div className="p-3 bg-bg-200 rounded-lg border border-border">
                        <p className="text-xs text-text/50 mb-0.5">Volume USD</p>
                        <p className="text-lg font-semibold text-text">${formatAmount(pool.volumeUSD)}</p>
                    </div>
                    <div className="p-3 bg-bg-200 rounded-lg border border-border">
                        <p className="text-xs text-text/50 mb-0.5">Fee</p>
                        <p className="text-lg font-semibold text-text">AI Fee</p>
                    </div>
                    <div className="p-3 bg-bg-200 rounded-lg border border-border">
                        <p className="text-xs text-text/50 mb-0.5">Fees USD</p>
                        <p className="text-lg font-semibold text-text">${formatAmount(pool.feesUSD)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoolDetails;
