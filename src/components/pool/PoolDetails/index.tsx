import DataWithCopyButton from '@/components/common/DataWithCopyButton';
import { PoolFieldsFragment } from '@/graphql/generated/graphql';
import { Address } from 'wagmi';

interface IPoolDetails {
    poolId: Address;
    pool: PoolFieldsFragment;
}

const PoolDetails = ({ pool, poolId }: IPoolDetails) => {
    console.log(pool);
    return (
        <div className="flex flex-col text-left p-4 border rounded-xl">
            <div className="font-bold mb-4">Pool Details</div>
            <div className="flex flex-col gap-4">
                <div>
                    <p className="font-semibold text-sm">Pool address</p>
                    <DataWithCopyButton data={poolId} />
                </div>
                <div>
                    <p className="font-semibold text-sm">TVL USD</p>
                    <p>{pool.totalValueLockedUSD} $</p>
                </div>
                <div>
                    <p className="font-semibold text-sm">Volume USD</p>
                    <p>{pool.volumeUSD} $</p>
                </div>
                <div>
                    <p className="font-semibold text-sm">Fee</p>
                    <p>{pool.fee}</p>
                </div>
                <div>
                    <p className="font-semibold text-sm">Fees USD</p>
                    <p>{pool.feesUSD} $</p>
                </div>
                <div>
                    <p className="font-semibold text-sm">Untracked Fees USD</p>
                    <p>{pool.untrackedFeesUSD} $</p>
                </div>
                <div>
                    <p className="font-semibold text-sm">
                        Current Tick Spacing
                    </p>
                    <p>{pool.tickSpacing}</p>
                </div>
                <div>
                    <p className="font-semibold text-sm">Current Tick</p>
                    <p>{pool.tick}</p>
                </div>
            </div>
        </div>
    );
};

export default PoolDetails;
