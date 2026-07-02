import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { usePoolPlugins } from "@/hooks/pools/usePoolPlugins";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { algebraPoolABI, algebraBasePluginV1ABI, slidingFeePluginAbi } from "config/abis";

interface IManageFeeModal {
    children: React.ReactNode;
    poolId: Address;
}

// AdaptiveFee configuration type
interface AdaptiveFeeConfig {
    alpha1: number;
    alpha2: number;
    beta1: number;
    beta2: number;
    gamma1: number;
    gamma2: number;
    baseFee: number;
}

// SlidingFee configuration type
interface SlidingFeeConfig {
    baseFee: number;
    priceChangeFactor: number;
}

const ManageFeeModal = ({ children, poolId }: IManageFeeModal) => {
    const { pluginAddress, feePluginType, isLoading: isPluginLoading } = usePoolPlugins(poolId);

    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white rounded-lg max-w-lg">
                <CredenzaHeader>
                    <CredenzaTitle>Manage Fee Settings</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className="flex flex-col gap-4">
                    {isPluginLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader size={24} />
                        </div>
                    ) : feePluginType === "ADAPTIVE_FEE" && pluginAddress ? (
                        <AdaptiveFeeForm pluginAddress={pluginAddress} />
                    ) : feePluginType === "SLIDING_FEE" && pluginAddress ? (
                        <SlidingFeeForm pluginAddress={pluginAddress} />
                    ) : (
                        <StaticFeeForm poolId={poolId} />
                    )}
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

// ============ AdaptiveFee Form (AlgebraBasePluginV1) ============
const AdaptiveFeeForm = ({ pluginAddress }: { pluginAddress: Address }) => {
    const [config, setConfig] = useState<AdaptiveFeeConfig>({
        alpha1: 0,
        alpha2: 0,
        beta1: 0,
        beta2: 0,
        gamma1: 0,
        gamma2: 0,
        baseFee: 0,
    });

    // Read current fee configuration
    const { data: feeConfig, isLoading: isConfigLoading } = useReadContract({
        address: pluginAddress,
        abi: algebraBasePluginV1ABI,
        functionName: "feeConfig",
    });

    useEffect(() => {
        if (feeConfig) {
            setConfig({
                alpha1: Number(feeConfig[0]),
                alpha2: Number(feeConfig[1]),
                beta1: Number(feeConfig[2]),
                beta2: Number(feeConfig[3]),
                gamma1: Number(feeConfig[4]),
                gamma2: Number(feeConfig[5]),
                baseFee: Number(feeConfig[6]),
            });
        }
    }, [feeConfig]);

    const { data: hash, writeContract, isPending } = useWriteContract();
    const { isLoading } = useTransactionAwait(hash, { title: "Change Fee Configuration" });

    const handleConfirm = () => {
        writeContract({
            address: pluginAddress,
            abi: algebraBasePluginV1ABI,
            functionName: "changeFeeConfiguration",
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

    const handleChange = (field: keyof AdaptiveFeeConfig, value: string) => {
        setConfig((prev) => ({
            ...prev,
            [field]: Number(value) || 0,
        }));
    };

    if (isConfigLoading) {
        return (
            <div className="flex justify-center py-8">
                <Loader size={24} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="text-sm text-text/70 mb-2">
                <span className="font-medium text-primary">Adaptive Fee</span> - Configure dynamic fee parameters
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs text-text/50 mb-1 block">Alpha 1</label>
                    <Input type="number" value={config.alpha1} onUserInput={(v) => handleChange("alpha1", v)} placeholder="Alpha 1" />
                </div>
                <div>
                    <label className="text-xs text-text/50 mb-1 block">Alpha 2</label>
                    <Input type="number" value={config.alpha2} onUserInput={(v) => handleChange("alpha2", v)} placeholder="Alpha 2" />
                </div>
                <div>
                    <label className="text-xs text-text/50 mb-1 block">Beta 1</label>
                    <Input type="number" value={config.beta1} onUserInput={(v) => handleChange("beta1", v)} placeholder="Beta 1" />
                </div>
                <div>
                    <label className="text-xs text-text/50 mb-1 block">Beta 2</label>
                    <Input type="number" value={config.beta2} onUserInput={(v) => handleChange("beta2", v)} placeholder="Beta 2" />
                </div>
                <div>
                    <label className="text-xs text-text/50 mb-1 block">Gamma 1</label>
                    <Input type="number" value={config.gamma1} onUserInput={(v) => handleChange("gamma1", v)} placeholder="Gamma 1" />
                </div>
                <div>
                    <label className="text-xs text-text/50 mb-1 block">Gamma 2</label>
                    <Input type="number" value={config.gamma2} onUserInput={(v) => handleChange("gamma2", v)} placeholder="Gamma 2" />
                </div>
            </div>

            <div>
                <label className="text-xs text-text/50 mb-1 block">Base Fee</label>
                <Input type="number" value={config.baseFee} onUserInput={(v) => handleChange("baseFee", v)} placeholder="Base Fee" />
            </div>

            <Button disabled={isLoading || isPending} onClick={handleConfirm} className="w-full mt-2">
                {isLoading || isPending ? <Loader color="currentColor" /> : "Confirm"}
            </Button>
        </div>
    );
};

// ============ SlidingFee Form ============
const SlidingFeeForm = ({ pluginAddress }: { pluginAddress: Address }) => {
    const [config, setConfig] = useState<SlidingFeeConfig>({
        baseFee: 0,
        priceChangeFactor: 0,
    });

    // Read current base fee
    const { data: currentBaseFee, isLoading: isBaseFeeLoading } = useReadContract({
        address: pluginAddress,
        abi: slidingFeePluginAbi,
        functionName: "s_baseFee",
    });

    // Read current price change factor
    const { data: currentPriceChangeFactor, isLoading: isPriceFactorLoading } = useReadContract({
        address: pluginAddress,
        abi: slidingFeePluginAbi,
        functionName: "s_priceChangeFactor",
    });

    useEffect(() => {
        if (currentBaseFee !== undefined) {
            setConfig((prev) => ({ ...prev, baseFee: Number(currentBaseFee) }));
        }
    }, [currentBaseFee]);

    useEffect(() => {
        if (currentPriceChangeFactor !== undefined) {
            setConfig((prev) => ({ ...prev, priceChangeFactor: Number(currentPriceChangeFactor) }));
        }
    }, [currentPriceChangeFactor]);

    // Set Base Fee transaction
    const { data: baseFeeHash, writeContract: writeBaseFee, isPending: isBaseFeeWritePending } = useWriteContract();
    const { isLoading: isBaseFeeWriteLoading } = useTransactionAwait(baseFeeHash, { title: "Set Base Fee" });

    // Set Price Change Factor transaction
    const { data: priceFactorHash, writeContract: writePriceFactor, isPending: isPriceFactorWritePending } = useWriteContract();
    const { isLoading: isPriceFactorWriteLoading } = useTransactionAwait(priceFactorHash, { title: "Set Price Change Factor" });

    const handleSetBaseFee = () => {
        writeBaseFee({
            address: pluginAddress,
            abi: slidingFeePluginAbi,
            functionName: "setBaseFee",
            args: [config.baseFee],
        });
    };

    const handleSetPriceChangeFactor = () => {
        writePriceFactor({
            address: pluginAddress,
            abi: slidingFeePluginAbi,
            functionName: "setPriceChangeFactor",
            args: [config.priceChangeFactor],
        });
    };

    const isLoading = isBaseFeeLoading || isPriceFactorLoading;

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <Loader size={24} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="text-sm text-text/70 mb-2">
                <span className="font-medium text-primary">Sliding Fee</span> - Configure sliding fee parameters
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-xs text-text/50">Base Fee</label>
                <div className="flex gap-2">
                    <Input
                        type="number"
                        value={config.baseFee}
                        onUserInput={(v) => setConfig((prev) => ({ ...prev, baseFee: Number(v) || 0 }))}
                        placeholder="Base Fee"
                        className="flex-1"
                    />
                    <Button disabled={isBaseFeeWriteLoading || isBaseFeeWritePending} onClick={handleSetBaseFee} className="min-w-[100px]">
                        {isBaseFeeWriteLoading || isBaseFeeWritePending ? <Loader color="currentColor" size={16} /> : "Set"}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-xs text-text/50">Price Change Factor</label>
                <div className="flex gap-2">
                    <Input
                        type="number"
                        value={config.priceChangeFactor}
                        onUserInput={(v) => setConfig((prev) => ({ ...prev, priceChangeFactor: Number(v) || 0 }))}
                        placeholder="Price Change Factor"
                        className="flex-1"
                    />
                    <Button
                        disabled={isPriceFactorWriteLoading || isPriceFactorWritePending}
                        onClick={handleSetPriceChangeFactor}
                        className="min-w-[100px]"
                    >
                        {isPriceFactorWriteLoading || isPriceFactorWritePending ? <Loader color="currentColor" size={16} /> : "Set"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// ============ Static Fee Form ============
const StaticFeeForm = ({ poolId }: { poolId: Address }) => {
    const [fee, setFee] = useState<number>(0);

    // Read current fee
    const { data: currentFee, isLoading: isFeeLoading } = useReadContract({
        address: poolId,
        abi: algebraPoolABI,
        functionName: "fee",
    });

    useEffect(() => {
        if (currentFee !== undefined) {
            setFee(Number(currentFee));
        }
    }, [currentFee]);

    const { data: hash, writeContract, isPending } = useWriteContract();
    const { isLoading } = useTransactionAwait(hash, { title: "Set Fee" });

    const handleConfirm = () => {
        writeContract({
            address: poolId,
            abi: algebraPoolABI,
            functionName: "setFee",
            args: [fee],
        });
    };

    if (isFeeLoading) {
        return (
            <div className="flex justify-center py-8">
                <Loader size={24} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="text-sm text-text/70 mb-2">
                <span className="font-medium text-primary">Static Fee</span> - Set pool fee directly
            </div>

            <div>
                <label className="text-xs text-text/50 mb-1 block">Fee (in hundredths of a bip)</label>
                <Input type="number" value={fee} onUserInput={(v) => setFee(Number(v) || 0)} placeholder="Fee" />
                <p className="text-xs text-text/50 mt-1">
                    Current fee: {currentFee !== undefined ? `${Number(currentFee) / 10000}%` : "Loading..."}
                </p>
            </div>

            <Button disabled={isLoading || isPending} onClick={handleConfirm} className="w-full mt-2">
                {isLoading || isPending ? <Loader color="currentColor" /> : "Confirm"}
            </Button>
        </div>
    );
};

export default ManageFeeModal;
