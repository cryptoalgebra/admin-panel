import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from '@/components/ui/credenza';
import { Input } from '@/components/ui/input';
import {
    useAlgebraFactoryDefaultCommunityFee,
    useAlgebraFactoryDefaultTickspacing,
    usePrepareAlgebraFactorySetDefaultCommunityFee,
    usePrepareAlgebraFactorySetDefaultTickspacing,
    usePreparePluginFactorySetDefaultFeeConfiguration,
} from '@/generated';
import { useTransitionAwait } from '@/hooks/common/useTransactionAwait';
import { usePluginFactoryFeeConfiguration } from '@/hooks/pools/useDefaultFeeConfiguration';
import { cn } from '@/lib/utils';
import { FeeConfiguration } from '@/types/pool-settings';
import { useState } from 'react';
import { useContractWrite } from 'wagmi';

interface IPoolsDefaultSettingsModal {
    title: string;
    children: React.ReactNode;
}

enum SettingsKeys {
    COMMUNITY_FEE = 'Community Fee',
    FEE = 'Fee',
    TICK_SPACING = 'Tick Spacing',
}

interface Settings {
    [SettingsKeys.COMMUNITY_FEE]: number;
    [SettingsKeys.FEE]: FeeConfiguration;
    [SettingsKeys.TICK_SPACING]: number;
}

const PoolsDefaultSettingsModal = ({
    title,
    children,
}: IPoolsDefaultSettingsModal) => {
    const defaultFeeConfiguration = usePluginFactoryFeeConfiguration();

    const { data: defaultCommunityFee } =
        useAlgebraFactoryDefaultCommunityFee();

    const { data: defaultTickSpacing } = useAlgebraFactoryDefaultTickspacing();

    const [settingsData, setSettingsData] = useState<Settings>({
        [SettingsKeys.COMMUNITY_FEE]: defaultCommunityFee || 0,
        [SettingsKeys.FEE]: defaultFeeConfiguration,
        [SettingsKeys.TICK_SPACING]: defaultTickSpacing || 0,
    });

    /* Set Default Community Fee */
    const { config: defaultCommunityFeeConfig } =
        usePrepareAlgebraFactorySetDefaultCommunityFee({
            args: [settingsData[SettingsKeys.COMMUNITY_FEE]],
        });

    const { data: communityFeeHash, write: setDefaultCommunityFee } =
        useContractWrite(defaultCommunityFeeConfig);

    /* Set Default Fee */
    const { config: defaultFeeConfig } =
        usePreparePluginFactorySetDefaultFeeConfiguration({
            args: [settingsData[SettingsKeys.FEE]],
        });

    const { data: feeHash, write: setDefaultFeeConfiguration } =
        useContractWrite(defaultFeeConfig);

    /* Set Tick Spacing */
    const { config: tickSpacingConfig } =
        usePrepareAlgebraFactorySetDefaultTickspacing({
            args: [settingsData[SettingsKeys.TICK_SPACING]] || undefined,
        });

    const { data: tickSpacingHash, write: setDefaultTickSpacing } =
        useContractWrite(tickSpacingConfig);

    const { isLoading: feeLoading } = useTransitionAwait(
        feeHash?.hash,
        'Set Default Fee'
    );
    const { isLoading: communityFeeLoading } = useTransitionAwait(
        communityFeeHash?.hash,
        'Set Community Fee'
    );
    const { isLoading: tickSpacingLoading } = useTransitionAwait(
        tickSpacingHash?.hash,
        'Set Tick Spacing'
    );

    const handleSubmit = (e: React.FormEvent, key: SettingsKeys) => {
        e.preventDefault();
        switch (key) {
            case SettingsKeys.COMMUNITY_FEE:
                console.log('Com fee');
                console.log(settingsData[SettingsKeys.COMMUNITY_FEE]);
                setDefaultCommunityFee?.();
                break;
            case SettingsKeys.FEE:
                console.log('Fee');
                console.log(settingsData[SettingsKeys.FEE]);
                setDefaultFeeConfiguration?.();
                break;
            case SettingsKeys.TICK_SPACING:
                console.log('Tick Spacing');
                console.log(settingsData[SettingsKeys.TICK_SPACING]);
                setDefaultTickSpacing?.();
                break;
            default:
                break;
        }
    };

    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white !rounded-3xl w-[600px]">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className="flex flex-col gap-4">
                    <form className="flex flex-col gap-4 items-center">
                        {Object.entries(settingsData as Settings).map(
                            ([key, value]) => (
                                <label
                                    className={cn(
                                        'gap-2 mb-2 w-full',
                                        key === SettingsKeys.FEE
                                            ? 'grid grid-cols-2'
                                            : 'flex flex-col'
                                    )}
                                    key={key}
                                >
                                    <h4 className="w-full font-semibold col-span-2">
                                        {key}
                                    </h4>
                                    {key === SettingsKeys.FEE ? (
                                        Object.entries(
                                            settingsData[
                                                key
                                            ] as FeeConfiguration
                                        ).map(([feeCfg, feeValue]) => (
                                            <label
                                                className="flex flex-col"
                                                key={feeCfg}
                                            >
                                                {feeCfg}
                                                <Input
                                                    className="w-full"
                                                    key={feeCfg}
                                                    onChange={(e) =>
                                                        setSettingsData({
                                                            ...settingsData,
                                                            [key]: {
                                                                ...settingsData[
                                                                    key
                                                                ],
                                                                [feeCfg]:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        })
                                                    }
                                                    value={feeValue}
                                                    type={'number'}
                                                />
                                            </label>
                                        ))
                                    ) : (
                                        <Input
                                            key={key}
                                            onChange={(e) =>
                                                setSettingsData({
                                                    ...settingsData,
                                                    [key]: e.target.value,
                                                })
                                            }
                                            value={value}
                                            type={'number'}
                                        />
                                    )}
                                    <button
                                        disabled={
                                            feeLoading ||
                                            communityFeeLoading ||
                                            tickSpacingLoading
                                        }
                                        onClick={(e) =>
                                            handleSubmit(e, key as SettingsKeys)
                                        }
                                        className="flex col-span-2 justify-center w-full p-2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 disabled:bg-blue-400"
                                    >
                                        {feeLoading ||
                                        communityFeeLoading ||
                                        tickSpacingLoading
                                            ? 'Changing...'
                                            : 'Confirm'}
                                    </button>
                                </label>
                            )
                        )}
                    </form>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default PoolsDefaultSettingsModal;
