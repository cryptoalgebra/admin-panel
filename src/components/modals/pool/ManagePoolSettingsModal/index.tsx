import { algebraPoolABI } from "config/abis";
import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { useReadAlgebraPoolFee, useReadAlgebraPoolGlobalState, useReadAlgebraPoolPlugin, useReadAlgebraPoolTickSpacing } from "@/generated";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useWriteContract } from "wagmi";

type ManageFunctions = "setFee" | "setCommunityFee" | "setTickSpacing";

interface IManagePoolSettingsModal {
    title: string;
    functionName?: ManageFunctions;
    children: React.ReactNode;
    poolId: Address;
    isAdaptiveFee?: boolean;
}

const ManagePoolSettingsModal = ({ title, functionName, children, poolId, isAdaptiveFee = false }: IManagePoolSettingsModal) => {
    /* Single values */
    const [value, setValue] = useState<number>();

    const { data: poolGlobalState } = useReadAlgebraPoolGlobalState({
        address: poolId,
    });

    const { data: initialTickSpacing } = useReadAlgebraPoolTickSpacing({
        address: poolId,
    });

    const { data: initialStaticFee } = useReadAlgebraPoolFee({
        address: poolId,
    });

    const initialCommunityFee = poolGlobalState?.[4];

    const { data: pluginId } = useReadAlgebraPoolPlugin({
        address: poolId,
    });

    const { data, writeContract, isPending } = useWriteContract();

    const { isLoading } = useTransactionAwait(data, { title });

    useEffect(() => {
        switch (functionName) {
            case "setFee":
                setValue(initialStaticFee);
                break;
            case "setCommunityFee":
                setValue(initialCommunityFee);
                break;
            case "setTickSpacing":
                setValue(initialTickSpacing);
                break;
            default:
                setValue(undefined);
        }
    }, [functionName, initialStaticFee, initialCommunityFee, initialTickSpacing]);

    // const { data: initialBaseFee } = useReadAlgebraBasePluginSBaseFee({ address: pluginId });
    const [baseFee, setBaseFee] = useState<number>();

    // const { data: feeHash, writeContract: writeFee, isPending: isFeePending } = useWriteContract();

    // const { isLoading: isFeeLoading } = useTransactionAwait(feeHash, title);

    // useEffect(() => {
    //     console.log("initialBaseFee", initialBaseFee, pluginId);
    //     if (initialBaseFee) {
    //         setBaseFee(initialBaseFee);
    //     }
    // }, [initialBaseFee]);

    const handleConfirm = () => {
        if (isAdaptiveFee && baseFee && pluginId) {
            // writeFee({
            //     address: pluginId,
            //     abi: algebraBasePluginABI,
            //     functionName: "setBaseFee",
            //     args: [baseFee],
            // });
        } else if (functionName && value !== undefined) {
            writeContract({
                address: poolId,
                abi: algebraPoolABI,
                functionName,
                args: [value],
            });
        }
    };

    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white rounded-lg">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className={"flex flex-col gap-4"}>
                    {isAdaptiveFee ? (
                        <Input
                            required
                            value={baseFee}
                            placeholder="Enter fee"
                            onUserInput={(v) => {
                                setBaseFee(Number(v));
                            }}
                        />
                    ) : (
                        <Input
                            required
                            value={value}
                            placeholder="Enter amount"
                            onUserInput={(v) => {
                                setValue(Number(v));
                            }}
                        />
                    )}
                    <Button disabled={isLoading || isPending} onClick={handleConfirm} className="w-full">
                        {isLoading || isPending ? <Loader color="currentColor" /> : "Confirm"}
                    </Button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ManagePoolSettingsModal;
