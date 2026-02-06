import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { ALGEBRA_FACTORY } from "config/contract-addresses";
import { DEFAULT_CHAIN_ID } from "config/default-chain";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { useEffect, useState } from "react";
import { useReadContracts, useWriteContract } from "wagmi";
import { algebraFactoryABI } from "config/abis";
import { cn } from "@/utils/common/cn";
import { useReadSecurityRegistryGlobalStatus, useWriteSecurityRegistrySetGlobalStatus } from "@/generated";
import PoolsDefaultFeeConfigurationModal from "@/components/modals/PoolsDefaultFeeConfigurationModal";

interface IPoolsDefaultSettingsModal {
    title: string;
    children: React.ReactNode;
}

enum SettingsKeys {
    COMMUNITY_FEE = "Community Fee",
    TICK_SPACING = "Tick Spacing",
}

type Settings = Record<SettingsKeys, number>;

enum PoolSecurityStatus {
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

const PoolsDefaultSettingsModal = ({ title, children }: IPoolsDefaultSettingsModal) => {
    const [activeTab, setActiveTab] = useState<"new" | "existing">("new");
    const [settingsData, setSettingsData] = useState<Settings>({
        [SettingsKeys.COMMUNITY_FEE]: 0,
        [SettingsKeys.TICK_SPACING]: 0,
    });

    const [selectedGlobalStatus, setSelectedGlobalStatus] = useState<PoolSecurityStatus | null>(null);

    /* Get Default Settings */
    const { data: defaultSettingsResults } = useReadContracts({
        contracts: [
            {
                address: ALGEBRA_FACTORY[DEFAULT_CHAIN_ID],
                abi: algebraFactoryABI,
                functionName: "defaultCommunityFee",
            },
            {
                address: ALGEBRA_FACTORY[DEFAULT_CHAIN_ID],
                abi: algebraFactoryABI,
                functionName: "defaultTickspacing",
            },
        ],
    });

    useEffect(() => {
        if (!defaultSettingsResults) return;
        const results = defaultSettingsResults.map((d) => d.result);
        if (!results.length) return;

        const defaultSettings: Settings = {
            [SettingsKeys.COMMUNITY_FEE]: Number(results[0]),
            [SettingsKeys.TICK_SPACING]: Number(results[1]),
        };

        setSettingsData(defaultSettings);
    }, [defaultSettingsResults]);

    /* Set Default Community Fee */
    const { data: communityFeeHash, writeContract: setDefaultCommunityFee, isPending: isCommunityFeePending } = useWriteContract();

    /* Set Tick Spacing */
    const { data: tickSpacingHash, writeContract: setDefaultTickSpacing, isPending: isTickSpacingPending } = useWriteContract();

    const { isLoading: communityFeeLoading } = useTransactionAwait(communityFeeHash, { title: "Set Community Fee" });
    const { isLoading: tickSpacingLoading } = useTransactionAwait(tickSpacingHash, { title: "Set Tick Spacing" });

    const {
        data: globalStatus,
        isLoading: isGlobalStatusLoading,
        refetch: refetchGlobalStatus,
    } = useReadSecurityRegistryGlobalStatus();

    const { data: globalStatusHash, writeContract: setGlobalStatus, isPending: isGlobalStatusPending } =
        useWriteSecurityRegistrySetGlobalStatus();

    const { isLoading: isGlobalStatusTxLoading } = useTransactionAwait(globalStatusHash, {
        title: "Update Global Security Status",
        callback: refetchGlobalStatus,
    });

    const handleSubmit = (key: SettingsKeys) => {
        switch (key) {
            case SettingsKeys.COMMUNITY_FEE:
                setDefaultCommunityFee({
                    address: ALGEBRA_FACTORY[DEFAULT_CHAIN_ID],
                    abi: algebraFactoryABI,
                    functionName: "setDefaultCommunityFee",
                    args: [settingsData[SettingsKeys.COMMUNITY_FEE]],
                });
                break;
            case SettingsKeys.TICK_SPACING:
                setDefaultTickSpacing({
                    address: ALGEBRA_FACTORY[DEFAULT_CHAIN_ID],
                    abi: algebraFactoryABI,
                    functionName: "setDefaultTickspacing",
                    args: [settingsData[SettingsKeys.TICK_SPACING]],
                });
                break;
            default:
                break;
        }
    };

    const isLoading = communityFeeLoading || tickSpacingLoading || isCommunityFeePending || isTickSpacingPending;

    const isButtonLoading = (key: SettingsKeys): boolean => {
        switch (key) {
            case SettingsKeys.COMMUNITY_FEE:
                return communityFeeLoading || isCommunityFeePending;
            case SettingsKeys.TICK_SPACING:
                return tickSpacingLoading || isTickSpacingPending;
            default:
                return false;
        }
    };

    const handleGlobalStatusConfirm = () => {
        if (selectedGlobalStatus !== null) {
            setGlobalStatus({
                args: [selectedGlobalStatus],
            });
        }
    };

    const currentGlobalStatus = globalStatus as PoolSecurityStatus | undefined;
    const isGlobalLoading = isGlobalStatusLoading || isGlobalStatusTxLoading || isGlobalStatusPending;

    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white rounded-lg w-[600px]">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 rounded-lg border border-border p-1">
                        <button
                            onClick={() => setActiveTab("new")}
                            className={cn(
                                "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                activeTab === "new" ? "bg-bg-200 text-text" : "text-text/60 hover:bg-bg-100"
                            )}
                        >
                            New Pools
                        </button>
                        <button
                            onClick={() => setActiveTab("existing")}
                            className={cn(
                                "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                activeTab === "existing" ? "bg-bg-200 text-text" : "text-text/60 hover:bg-bg-100"
                            )}
                        >
                            Existing Pools
                        </button>
                    </div>

                    {activeTab === "new" ? (
                        <div className="flex flex-col gap-4 items-center">
                            <label className="gap-2 mb-2 w-full flex flex-col">
                                <h4 className="w-full text-sm font-medium col-span-2">Fee</h4>
                                <PoolsDefaultFeeConfigurationModal>
                                    <Button className="w-full" variant="outline">
                                        Manage Fee Settings
                                    </Button>
                                </PoolsDefaultFeeConfigurationModal>
                            </label>
                            {Object.entries(settingsData as Settings).map(([key, value]) => (
                                <label className="gap-2 mb-2 w-full flex flex-col" key={key}>
                                    <h4 className="w-full text-sm font-medium col-span-2">{key}</h4>
                                    <Input
                                        key={key}
                                        onUserInput={(v) =>
                                            setSettingsData({
                                                ...settingsData,
                                                [key]: v,
                                            })
                                        }
                                        value={value}
                                    />
                                    <Button disabled={isLoading} onClick={() => handleSubmit(key as SettingsKeys)} className="w-full">
                                        {isButtonLoading(key as SettingsKeys) ? <Loader /> : "Confirm"}
                                    </Button>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {isGlobalLoading ? (
                                <div className="flex justify-center py-4">
                                    <Loader size={20} />
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <p className="text-xs text-text/50 mb-2">Current Global Status</p>
                                        {currentGlobalStatus !== undefined && (
                                            <div
                                                className={cn(
                                                    "inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-medium",
                                                    STATUS_COLORS[currentGlobalStatus]
                                                )}
                                            >
                                                {STATUS_LABELS[currentGlobalStatus]}
                                            </div>
                                        )}
                                        {currentGlobalStatus !== undefined && (
                                            <p className="text-xs text-text/50 mt-2">{STATUS_DESCRIPTIONS[currentGlobalStatus]}</p>
                                        )}
                                        {currentGlobalStatus === PoolSecurityStatus.ENABLED && (
                                            <p className="text-xs text-text/50 mt-1">
                                                Enabled means no global override; each pool can have its own status.
                                            </p>
                                        )}
                                    </div>

                                    <hr className="border-border" />

                                    <div>
                                        <p className="text-xs text-text/50 mb-3">Select New Status</p>
                                        <div className="flex flex-col gap-2">
                                            {[
                                                PoolSecurityStatus.ENABLED,
                                                PoolSecurityStatus.BURN_ONLY,
                                                PoolSecurityStatus.DISABLED,
                                            ].map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => setSelectedGlobalStatus(status)}
                                                    className={cn(
                                                        "flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer",
                                                        selectedGlobalStatus === status
                                                            ? "border-text bg-bg-200"
                                                            : "border-border hover:border-text/50 hover:bg-bg-100"
                                                    )}
                                                >
                                                    <div className="flex-1 text-left">
                                                        <p className="text-sm font-medium text-text">{STATUS_LABELS[status]}</p>
                                                        <p className="text-xs text-text/50 mt-1">{STATUS_DESCRIPTIONS[status]}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <Button
                                        variant="destructive"
                                        onClick={handleGlobalStatusConfirm}
                                        disabled={selectedGlobalStatus === null || isGlobalStatusTxLoading || isGlobalStatusPending}
                                        className="w-full"
                                    >
                                        {isGlobalStatusTxLoading || isGlobalStatusPending ? <Loader color="red" size={16} /> : "Confirm"}
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default PoolsDefaultSettingsModal;
