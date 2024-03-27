import { TokenFieldsFragment } from '@/graphql/generated/graphql';
import { Address } from 'wagmi';

interface Pair {
    token0: TokenFieldsFragment;
    token1: TokenFieldsFragment;
}

export interface FormattedPool {
    id: Address;
    pair: Pair;
    fee: number;
    tvlUSD: number;
    volume24USD: number;
    apr: number;
}
