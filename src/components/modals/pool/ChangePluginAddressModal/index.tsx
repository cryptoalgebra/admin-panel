import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { algebraPoolABI } from "config";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { useState } from "react";
import { Address, isAddress } from "viem";
import { useWriteContract } from "wagmi";

interface IChangePluginAddressModal {
    title: string;
    children: React.ReactNode;
    poolId: Address;
}

const ChangePluginAddressModal = ({ title, children, poolId }: IChangePluginAddressModal) => {
    const [value, setValue] = useState<string>("");
    const [isAddressValid, setIsAddressValid] = useState<boolean>(false);

    const { data, writeContract, isPending } = useWriteContract();

    const { isLoading } = useTransactionAwait(data, { title });

    const handleConfirm = () => {
        if (isAddress(value)) {
            setIsAddressValid(false);
            writeContract({
                address: poolId,
                abi: algebraPoolABI,
                functionName: "setPlugin",
                args: [value as Address],
            });
        } else {
            setIsAddressValid(true);
        }
    };
    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white rounded-lg">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className={"flex flex-col gap-2"}>
                    <Input
                        placeholder="Enter plugin address"
                        type="text"
                        name="address"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    {isAddressValid && <p className="text-red-500 text-sm">Incorrect address!</p>}
                    <Button disabled={isLoading || isPending} onClick={handleConfirm} className="w-full mt-2">
                        {isLoading || isPending ? <Loader /> : "Confirm"}
                    </Button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ChangePluginAddressModal;
