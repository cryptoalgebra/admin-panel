import FarmPoolDetails from '@/components/farm/FarmPoolDetails';
import { Address } from 'wagmi';

interface ITokenDetails {
    name: string;
    poolId: Address;
}

const TokenDetails = ({ name, poolId }: ITokenDetails) => {
    return <FarmPoolDetails name={name} id={poolId} />;
};

export default TokenDetails;
