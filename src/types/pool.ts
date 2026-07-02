import { TokenFieldsFragment } from '@/graphql/generated/graphql';
import { Address } from 'viem';

interface Pair {
    token0: TokenFieldsFragment;
    token1: TokenFieldsFragment;
}

export interface FormattedPool {
    id: Address;
    pair: Pair;
    deployer: string;
    fee: number;
    overrideFee: number;
    tvlUSD: number;
    volume24USD: number;
    apr: number;
}
