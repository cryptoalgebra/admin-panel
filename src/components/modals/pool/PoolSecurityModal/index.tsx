import DataWithCopyButton from "@/components/common/DataWithCopyButton";
import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import {
    useReadSecurityRegistryGetPoolStatus,
    useReadSecurityRegistryGlobalStatus,
    useWriteSecurityRegistrySetPoolsStatus,
} from "@/generated";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { Address } from "viem";
import { cn } from "@/utils/common/cn";
import { useState } from "react";

export enum PoolSecurityStatus {
    ENABLED = 0,
    BURN_ONLY = 1,
    DISABLED = 2,
}

const STATUS_LABELS: Record<PoolSecurityStatus, string> = {
    [PoolSecurityStatus.ENABLED]: "Enabled",
    [PoolSecurityStatus.DISABLED]: "Disabled",
    [PoolSecurityStatus.BURN_ONLY]: "Burn Only",
};

const STATUS_DESCRIPTIONS: Record<PoolSecurityStatus, string> = {
    [PoolSecurityStatus.ENABLED]: "All pool operations are allowed (swap, mint, burn, flash)",
    [PoolSecurityStatus.DISABLED]: "All pool operations are blocked",
    [PoolSecurityStatus.BURN_ONLY]: "Only liquidity withdrawals (burns) are allowed",
};

const STATUS_COLORS: Record<PoolSecurityStatus, string> = {
    [PoolSecurityStatus.ENABLED]: "bg-emerald-50 text-emerald-700 border-emerald-200",
    [PoolSecurityStatus.DISABLED]: "bg-red-50 text-red-700 border-red-200",
    [PoolSecurityStatus.BURN_ONLY]: "bg-amber-50 text-amber-700 border-amber-200",
};

interface IPoolSecurityModal {
    title: string;
    children: React.ReactNode;
    poolId: Address;
}

const PoolSecurityModal = ({ title, children, poolId }: IPoolSecurityModal) => {
    const [selectedStatus, setSelectedStatus] = useState<PoolSecurityStatus | null>(null);

    const { data: poolStatus, isLoading: isPoolStatusLoading, refetch } = useReadSecurityRegistryGetPoolStatus({
        args: [poolId],
    });

    const { data: globalStatus, isLoading: isGlobalStatusLoading } = useReadSecurityRegistryGlobalStatus();

    const { writeContract, data: hash, isPending } = useWriteSecurityRegistrySetPoolsStatus();

    const { isLoading } = useTransactionAwait(hash, { title: "Update Pool Security Status", callback: refetch });

    const handleConfirm = () => {
        if (selectedStatus !== null) {
            writeContract({
                args: [[poolId], [selectedStatus]],
            });
        }
    };

    const currentStatus = poolStatus as PoolSecurityStatus | undefined;
    const currentGlobalStatus = globalStatus as PoolSecurityStatus | undefined;

    const effectiveStatus = currentGlobalStatus !== PoolSecurityStatus.ENABLED ? currentGlobalStatus : currentStatus;

    const isStatusLoading = isPoolStatusLoading || isGlobalStatusLoading;

    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white rounded-lg max-w-lg">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className="flex flex-col gap-4">
                    <div>
                        <p className="text-xs text-text/50 mb-1">Pool Address</p>
                        <DataWithCopyButton data={poolId} />
                    </div>

                    <hr className="border-border" />

                    {isStatusLoading ? (
                        <div className="flex justify-center py-4">
                            <Loader size={20} />
                        </div>
                    ) : (
                        <>
                            {currentGlobalStatus !== undefined && currentGlobalStatus !== PoolSecurityStatus.ENABLED && (
                                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                    <p className="text-sm text-amber-800 font-medium">⚠️ Global Status Override Active</p>
                                    <p className="text-xs text-amber-700 mt-1">
                                        Global status is set to <strong>{STATUS_LABELS[currentGlobalStatus]}</strong>. This overrides
                                        individual pool settings.
                                    </p>
                                </div>
                            )}

                            <div>
                                <p className="text-xs text-text/50 mb-2">Current Pool Status</p>
                                {effectiveStatus !== undefined && (
                                    <div
                                        className={cn(
                                            "inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-medium",
                                            STATUS_COLORS[effectiveStatus]
                                        )}
                                    >
                                        {STATUS_LABELS[effectiveStatus]}
                                    </div>
                                )}
                                {effectiveStatus !== undefined && (
                                    <p className="text-xs text-text/50 mt-2">{STATUS_DESCRIPTIONS[effectiveStatus]}</p>
                                )}
                            </div>

                            <hr className="border-border" />

                            <div>
                                <p className="text-xs text-text/50 mb-3">Select New Status</p>
                                <div className="flex flex-col gap-2">
                                    {[PoolSecurityStatus.ENABLED, PoolSecurityStatus.BURN_ONLY, PoolSecurityStatus.DISABLED].map(
                                        (status) => (
                                            <button
                                                key={status}
                                                onClick={() => setSelectedStatus(status)}
                                                className={cn(
                                                    "flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer",
                                                    selectedStatus === status
                                                        ? "border-text bg-bg-200"
                                                        : "border-border hover:border-text/50 hover:bg-bg-100"
                                                )}
                                            >
                                                <div className="flex-1 text-left">
                                                    <p className="text-sm font-medium text-text">{STATUS_LABELS[status]}</p>
                                                    <p className="text-xs text-text/50 mt-1">{STATUS_DESCRIPTIONS[status]}</p>
                                                </div>
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            <Button
                                variant="destructive"
                                onClick={handleConfirm}
                                disabled={selectedStatus === null || isLoading || isPending}
                                className="w-full"
                            >
                                {isLoading || isPending ? <Loader color="red" size={16} /> : "Confirm"}
                            </Button>
                        </>
                    )}
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default PoolSecurityModal;
