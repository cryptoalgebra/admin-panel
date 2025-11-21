import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import { PoolFieldsFragment } from "@/graphql/generated/graphql";
import { Address } from "wagmi";

interface IPoolDetails {
    poolId: Address;
    pool: PoolFieldsFragment;
}

const PoolDetails = ({ pool, poolId }: IPoolDetails) => {
    console.log(pool);
    return (
        <div className="flex flex-col text-left p-6 bg-white border border-neutral-200 rounded-lg">
            <div className="font-semibold text-lg mb-6">Pool Details</div>
            <div className="flex flex-col gap-4">
                <div>
                    <p className="text-xs text-neutral-500 mb-1">Pool address</p>
                    <DataWithCopyButton data={poolId} />
                </div>
                <div>
                    <p className="text-xs text-neutral-500 mb-1">Deployer</p>
                    <DataWithCopyButton data={pool.deployer} />
                </div>
                <div>
                    <p className="text-xs text-neutral-500 mb-1">TVL USD</p>
                    <p className="text-sm">{pool.totalValueLockedUSD} $</p>
                </div>
                <div>
                    <p className="text-xs text-neutral-500 mb-1">Volume USD</p>
                    <p className="text-sm">{pool.volumeUSD} $</p>
                </div>
                <div>
                    <p className="text-xs text-neutral-500 mb-1">Fee</p>
                    <p className="text-sm">{pool.fee}</p>
                </div>
                <div>
                    <p className="text-xs text-neutral-500 mb-1">Fees USD</p>
                    <p className="text-sm">{pool.feesUSD} $</p>
                </div>
                <div>
                    <p className="text-xs text-neutral-500 mb-1">Untracked Fees USD</p>
                    <p className="text-sm">{pool.untrackedFeesUSD} $</p>
                </div>
                <div>
                    <p className="text-xs text-neutral-500 mb-1">Current Tick Spacing</p>
                    <p className="text-sm">{pool.tickSpacing}</p>
                </div>
                <div>
                    <p className="text-xs text-neutral-500 mb-1">Current Tick</p>
                    <p className="text-sm">{pool.tick}</p>
                </div>
            </div>
        </div>
    );
};

export default PoolDetails;
