import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { PLUGIN_FACTORY } from "config/contract-addresses";
import { DEFAULT_CHAIN_ID } from "config/default-chain";
import { pluginFactoryABI } from "config/abis";
import { useEffect, useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";

interface AdaptiveFeeConfig {
    alpha1: number;
    alpha2: number;
    beta1: number;
    beta2: number;
    gamma1: number;
    gamma2: number;
    baseFee: number;
}

interface IPoolsDefaultFeeConfigurationModal {
    children: React.ReactNode;
}

const PoolsDefaultFeeConfigurationModal = ({ children }: IPoolsDefaultFeeConfigurationModal) => {
    const [config, setConfig] = useState<AdaptiveFeeConfig>({
        alpha1: 0,
        alpha2: 0,
        beta1: 0,
        beta2: 0,
        gamma1: 0,
        gamma2: 0,
        baseFee: 0,
    });

    const { data: defaultFeeConfig, isLoading: isFeeConfigLoading } = useReadContract({
        address: PLUGIN_FACTORY[DEFAULT_CHAIN_ID],
        abi: pluginFactoryABI,
        functionName: "defaultFeeConfiguration",
    });

    useEffect(() => {
        if (!defaultFeeConfig) return;
        setConfig({
            alpha1: Number(defaultFeeConfig.alpha1),
            alpha2: Number(defaultFeeConfig.alpha2),
            beta1: Number(defaultFeeConfig.beta1),
            beta2: Number(defaultFeeConfig.beta2),
            gamma1: Number(defaultFeeConfig.gamma1),
            gamma2: Number(defaultFeeConfig.gamma2),
            baseFee: Number(defaultFeeConfig.baseFee),
        });
    }, [defaultFeeConfig]);

    const { data: hash, writeContract, isPending } = useWriteContract();
    const { isLoading } = useTransactionAwait(hash, { title: "Set Default Fee Configuration" });

    const handleChange = (field: keyof AdaptiveFeeConfig, value: string) => {
        setConfig((prev) => ({
            ...prev,
            [field]: Number(value) || 0,
        }));
    };

    const handleConfirm = () => {
        writeContract({
            address: PLUGIN_FACTORY[DEFAULT_CHAIN_ID],
            abi: pluginFactoryABI,
            functionName: "setDefaultFeeConfiguration",
            args: [
                {
                    alpha1: config.alpha1,
                    alpha2: config.alpha2,
                    beta1: config.beta1,
                    beta2: config.beta2,
                    gamma1: config.gamma1,
                    gamma2: config.gamma2,
                    baseFee: config.baseFee,
                },
            ],
        });
    };

    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white rounded-lg max-w-lg">
                <CredenzaHeader>
                    <CredenzaTitle>Default Fee Settings</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody>
                    {isFeeConfigLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader size={24} />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-text/50 mb-1 block">Alpha 1</label>
                                    <Input type="number" value={config.alpha1} onUserInput={(v) => handleChange("alpha1", v)} />
                                </div>
                                <div>
                                    <label className="text-xs text-text/50 mb-1 block">Alpha 2</label>
                                    <Input type="number" value={config.alpha2} onUserInput={(v) => handleChange("alpha2", v)} />
                                </div>
                                <div>
                                    <label className="text-xs text-text/50 mb-1 block">Beta 1</label>
                                    <Input type="number" value={config.beta1} onUserInput={(v) => handleChange("beta1", v)} />
                                </div>
                                <div>
                                    <label className="text-xs text-text/50 mb-1 block">Beta 2</label>
                                    <Input type="number" value={config.beta2} onUserInput={(v) => handleChange("beta2", v)} />
                                </div>
                                <div>
                                    <label className="text-xs text-text/50 mb-1 block">Gamma 1</label>
                                    <Input type="number" value={config.gamma1} onUserInput={(v) => handleChange("gamma1", v)} />
                                </div>
                                <div>
                                    <label className="text-xs text-text/50 mb-1 block">Gamma 2</label>
                                    <Input type="number" value={config.gamma2} onUserInput={(v) => handleChange("gamma2", v)} />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-text/50 mb-1 block">Base Fee</label>
                                <Input type="number" value={config.baseFee} onUserInput={(v) => handleChange("baseFee", v)} />
                            </div>

                            <Button disabled={isLoading || isPending} onClick={handleConfirm} className="w-full mt-2">
                                {isLoading || isPending ? <Loader color="currentColor" /> : "Confirm"}
                            </Button>
                        </div>
                    )}
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default PoolsDefaultFeeConfigurationModal;
