import { PluginFlags } from '@/types/pool-plugin-flags';
import { useMemo } from 'react';

export function usePluginConfig(flags: PluginFlags | null): number {
    return useMemo(() => {
        if (!flags) return 0;

        let updatedPluginConfig = 0;
        updatedPluginConfig |= flags.BEFORE_SWAP_FLAG;
        updatedPluginConfig |= flags.AFTER_SWAP_FLAG << 1;
        updatedPluginConfig |= flags.BEFORE_POSITION_MODIFY_FLAG << 2;
        updatedPluginConfig |= flags.AFTER_POSITION_MODIFY_FLAG << 3;
        updatedPluginConfig |= flags.BEFORE_FLASH_FLAG << 4;
        updatedPluginConfig |= flags.AFTER_FLASH_FLAG << 5;
        updatedPluginConfig |= flags.AFTER_INIT_FLAG << 6;
        updatedPluginConfig |= flags.DYNAMIC_FEE_FLAG << 7;

        return updatedPluginConfig;
    }, [flags]);
}
