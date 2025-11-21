import { algebraPoolABI } from "@/abis";
import Loader from "@/components/common/Loader";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import {
    useAlgebraPoolFee,
    useAlgebraPoolGlobalState,
    useAlgebraPoolPlugin,
    useAlgebraPoolTickSpacing,
    useAlgebraBasePluginSBaseFee,
    usePrepareAlgebraBasePluginSetBaseFee,
} from "@/generated";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import { useEffect, useState } from "react";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";

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

    const { data: poolGlobalState } = useAlgebraPoolGlobalState({
        address: poolId,
        enabled: functionName === "setCommunityFee",
    });

    const { data: initialTickSpacing } = useAlgebraPoolTickSpacing({
        address: poolId,
        enabled: functionName === "setTickSpacing",
    });

    const { data: initialStaticFee } = useAlgebraPoolFee({
        address: poolId,
        enabled: functionName === "setFee",
    });

    const initialCommunityFee = poolGlobalState?.[4];

    const { data: pluginId } = useAlgebraPoolPlugin({
        address: poolId,
    });

    const { config } = usePrepareContractWrite({
        address: poolId,
        abi: algebraPoolABI,
        functionName,
        args: value !== undefined ? [value] : undefined,
        enabled: Boolean(!isAdaptiveFee && value),
    });

    const { data, write } = useContractWrite(config);

    const { isLoading } = useTransitionAwait(data?.hash, title);

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

    const { data: initialBaseFee } = useAlgebraBasePluginSBaseFee({ address: pluginId });
    const [baseFee, setBaseFee] = useState<number>();

    const { config: baseFeeConfig } = usePrepareAlgebraBasePluginSetBaseFee({
        address: pluginId,
        args: baseFee ? [baseFee] : undefined,
        enabled: Boolean(baseFee),
    });

    const { data: feeHash, write: setFee } = useContractWrite(baseFeeConfig);

    const { isLoading: isFeeLoading } = useTransitionAwait(feeHash?.hash, title);

    useEffect(() => {
        console.log("initialBaseFee", initialBaseFee, pluginId);
        if (initialBaseFee) {
            setBaseFee(initialBaseFee);
        }
    }, [initialBaseFee]);

    const handleConfirm = () => {
        if (isAdaptiveFee) {
            setFee?.();
        } else {
            write?.();
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
                            type="number"
                            required
                            value={baseFee}
                            placeholder="Enter fee"
                            onChange={(e) => {
                                setBaseFee(Number(e.target.value));
                            }}
                        />
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
                        className="flex col-span-2 justify-center w-full py-2 px-4 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 disabled:bg-neutral-400 transition-colors"
                    >
                        {isLoading ? <Loader color="currentColor" /> : "Confirm"}
                    </button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ManagePoolSettingsModal;
