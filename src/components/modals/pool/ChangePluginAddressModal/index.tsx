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
import { usePrepareAlgebraPoolSetPlugin } from '@/generated';
import { useTransitionAwait } from '@/hooks/common/useTransactionAwait';
import { useState } from 'react';
import { isAddress } from 'viem';
import { Address, useContractWrite } from 'wagmi';

interface IChangePluginAddressModal {
    title: string;
    children: React.ReactNode;
    poolId: Address;
}

const ChangePluginAddressModal = ({
    title,
    children,
    poolId,
}: IChangePluginAddressModal) => {
    const [value, setValue] = useState<string>('');
    const [isAddressValid, setIsAddressValid] = useState<boolean>(false);

    const { config } = usePrepareAlgebraPoolSetPlugin({
        address: poolId,
        args: [value as Address],
        enabled: isAddress(value),
    });

    const { data, write } = useContractWrite(config);

    const { isLoading } = useTransitionAwait(data?.hash, title);

    const handleConfirm = () => {
        if (isAddress(value)) {
            setIsAddressValid(false);
            write?.();
        } else {
            setIsAddressValid(true);
        }
    };
    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white !rounded-3xl">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className={'flex flex-col gap-2'}>
                    <Input
                        placeholder="Enter plugin address"
                        type="text"
                        name="address"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    {isAddressValid && (
                        <p className="text-red-500 text-sm">
                            Incorrect address!
                        </p>
                    )}
                    <button
                        disabled={isLoading}
                        onClick={handleConfirm}
                        className="flex items-center justify-center mt-2 py-2 px-4 w-full bg-blue-500 text-white font-bold rounded-xl disabled:bg-blue-400 hover:bg-blue-400"
                    >
                        {isLoading ? <Loader /> : 'Confirm'}
                    </button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ChangePluginAddressModal;
