import { useAlgebraPoolGlobalState } from '@/generated';
import { PluginFlags } from '@/types/pool-plugin-flags';
import { useMemo } from 'react';
import { Address } from 'wagmi';

export function usePluginFlags(poolId: Address): PluginFlags | null {
    const { data: globalState, isLoading } = useAlgebraPoolGlobalState({
        address: poolId,
    });

    return useMemo(() => {
        if (!globalState || isLoading) return null;

        const tempPluginConfig = globalState[3];

        return {
            BEFORE_SWAP_FLAG: tempPluginConfig & 1,
            AFTER_SWAP_FLAG: (tempPluginConfig >> 1) & 1,
            BEFORE_POSITION_MODIFY_FLAG: (tempPluginConfig >> 2) & 1,
            AFTER_POSITION_MODIFY_FLAG: (tempPluginConfig >> 3) & 1,
            BEFORE_FLASH_FLAG: (tempPluginConfig >> 4) & 1,
            AFTER_FLASH_FLAG: (tempPluginConfig >> 5) & 1,
            AFTER_INIT_FLAG: (tempPluginConfig >> 6) & 1,
            DYNAMIC_FEE_FLAG: (tempPluginConfig >> 7) & 1,
        };
    }, [globalState, isLoading]);
}
