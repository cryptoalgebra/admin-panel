import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { algebraPoolABI } from "config";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { Address } from "viem";
import { useWriteContract } from "wagmi";

interface IPoolActivationModal {
    title: string;
    children: React.ReactNode;
    poolId: Address;
    pluginId: Address;
    isToActivate: boolean;
}

const PoolActivationModal = ({ title, children, poolId, pluginId, isToActivate }: IPoolActivationModal) => {
    const { data, writeContract, isPending } = useWriteContract();

    const { isLoading } = useTransactionAwait(data, { title });

    const handleConfirm = () => {
        writeContract({
            address: poolId,
            abi: algebraPoolABI,
            functionName: "setPlugin",
            args: [pluginId],
        });
    };
    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white rounded-lg">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className={"flex flex-col gap-4"}>
                    <div>
                        <p className="text-xs text-text/50 mb-1">Pool address</p>
                        <DataWithCopyButton data={poolId} />
                    </div>
                    <hr className="border-border" />
                    <div className="text-sm">
                        This will change Current plugin address to {isToActivate ? "Base" : "Stub"} plugin address.
                    </div>
                    <Button
                        disabled={isLoading || isPending}
                        onClick={handleConfirm}
                        variant={isToActivate ? "success" : "destructive"}
                        className="w-full mt-2"
                    >
                        {isLoading || isPending ? <Loader /> : "Confirm"}
                    </Button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default PoolActivationModal;
