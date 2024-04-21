import { algebraPoolABI } from '@/abis';
import Loader from '@/components/common/Loader';
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
    useAlgebraPoolFee,
    useAlgebraPoolGlobalState,
    useAlgebraPoolPlugin,
    useAlgebraPoolTickSpacing,
    usePrepareAlgebraBasePluginChangeFeeConfiguration,
} from '@/generated';
import { useTransitionAwait } from '@/hooks/common/useTransactionAwait';
import { useBasePluginFeeConfiguration } from '@/hooks/pools/useDefaultFeeConfiguration';
import { FeeConfiguration } from '@/types/pool-settings';
import { useEffect, useState } from 'react';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';

type ManageFunctions = 'setFee' | 'setCommunityFee' | 'setTickSpacing';

interface IManagePoolSettingsModal {
    title: string;
    functionName?: ManageFunctions;
    children: React.ReactNode;
    poolId: Address;
    isDynamicFee?: boolean;
}

const ManagePoolSettingsModal = ({
    title,
    functionName,
    children,
    poolId,
    isDynamicFee = false,
}: IManagePoolSettingsModal) => {
    /* Single values */
    const [value, setValue] = useState<number>();

    const { data: poolGlobalState } = useAlgebraPoolGlobalState({
        address: poolId,
        enabled: functionName === 'setCommunityFee',
    });

    const { data: initialTickSpacing } = useAlgebraPoolTickSpacing({
        address: poolId,
        enabled: functionName === 'setTickSpacing',
    });

    const { data: initialStaticFee } = useAlgebraPoolFee({
        address: poolId,
        enabled: functionName === 'setFee',
    });

    const initialCommunityFee = poolGlobalState?.[4];

    const { data: pluginId } = useAlgebraPoolPlugin({
        address: poolId,
        enabled: !isDynamicFee,
    });

    const { config } = usePrepareContractWrite({
        address: poolId,
        abi: algebraPoolABI,
        functionName,
        args: value !== undefined ? [value] : undefined,
        enabled: Boolean(!isDynamicFee && value),
    });

    const { data, write } = useContractWrite(config);

    const { isLoading } = useTransitionAwait(data?.hash, title);

    useEffect(() => {
        switch (functionName) {
            case 'setFee':
                setValue(initialStaticFee);
                break;
            case 'setCommunityFee':
                setValue(initialCommunityFee);
                break;
            case 'setTickSpacing':
                setValue(initialTickSpacing);
                break;
            default:
                setValue(undefined);
        }
    }, [
        functionName,
        initialStaticFee,
        initialCommunityFee,
        initialTickSpacing,
    ]);

    /* Multi values (Dynamic fee) */
    const initialDynamicFee = useBasePluginFeeConfiguration({ poolId });

    const [dynamicFee, setDynamicFee] = useState<FeeConfiguration | undefined>(
        initialDynamicFee
    );

    const { config: dynamicFeeConfig } =
        usePrepareAlgebraBasePluginChangeFeeConfiguration({
            address: pluginId,
            args: dynamicFee && [dynamicFee],
            enabled: Boolean(dynamicFee && pluginId),
        });

    const { data: feeHash, write: setFeeConfiguration } =
        useContractWrite(dynamicFeeConfig);

    const { isLoading: isFeeLoading } = useTransitionAwait(
        feeHash?.hash,
        title
    );

    const handleConfirm = () => {
        if (isDynamicFee) {
            console.log(dynamicFee);
            setFeeConfiguration?.();
        } else {
            console.log(functionName, value);
            write?.();
        }
    };

    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white !rounded-3xl">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody
                    className={
                        isDynamicFee
                            ? 'grid grid-cols-2 gap-4'
                            : 'flex flex-col gap-4'
                    }
                >
                    {isDynamicFee && dynamicFee ? (
                        Object.entries(dynamicFee).map(([key, feeValue]) => (
                            <label key={key} className="">
                                <h4 className="">{key}</h4>
                                <Input
                                    key={key}
                                    className="w-full"
                                    type="number"
                                    required
                                    value={feeValue}
                                    placeholder="Enter amount"
                                    onChange={(e) => {
                                        setDynamicFee((prev) => {
                                            if (!prev) return;
                                            return {
                                                ...prev,
                                                [key]: Number(e.target.value),
                                            };
                                        });
                                    }}
                                />{' '}
                            </label>
                        ))
                    ) : !dynamicFee || value === undefined ? (
                        'Loading...'
                    ) : (
                        <Input
                            type="number"
                            required
                            value={value}
                            placeholder="Enter amount"
                            onChange={(e) => {
                                setValue(Number(e.target.value));
                            }}
                        />
                    )}
                    <button
                        disabled={isLoading || isFeeLoading}
                        onClick={handleConfirm}
                        className="flex col-span-2 justify-center w-full p-2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 disabled:bg-blue-400"
                    >
                        {isLoading ? (
                            <Loader color="currentColor" />
                        ) : (
                            'Confirm'
                        )}
                    </button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ManagePoolSettingsModal;
