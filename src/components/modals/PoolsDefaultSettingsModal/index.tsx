import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { ALGEBRA_FACTORY, PLUGIN_FACTORY } from "config/contract-addresses";
import { DEFAULT_CHAIN_ID } from "config/default-chain";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { useEffect, useState } from "react";
import { useReadContracts, useWriteContract } from "wagmi";
import { algebraFactoryABI, pluginFactoryABI } from "config/abis";

interface IPoolsDefaultSettingsModal {
    title: string;
    children: React.ReactNode;
}

enum SettingsKeys {
    COMMUNITY_FEE = "Community Fee",
    FEE = "Fee",
    TICK_SPACING = "Tick Spacing",
}

type Settings = Record<SettingsKeys, number>;

const PoolsDefaultSettingsModal = ({ title, children }: IPoolsDefaultSettingsModal) => {
    const [settingsData, setSettingsData] = useState<Settings>({
        [SettingsKeys.COMMUNITY_FEE]: 0,
        [SettingsKeys.FEE]: 0,
        [SettingsKeys.TICK_SPACING]: 0,
    });

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
                functionName: "defaultFee",
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
            [SettingsKeys.FEE]: Number(results[1]),
            [SettingsKeys.TICK_SPACING]: Number(results[2]),
        };

        setSettingsData(defaultSettings);
    }, [defaultSettingsResults]);

    /* Set Default Community Fee */
    const { data: communityFeeHash, writeContract: setDefaultCommunityFee, isPending: isCommunityFeePending } = useWriteContract();

    /* Set Default Fee */
    const { data: feeHash, writeContract: setDefaultFeeConfiguration, isPending: isFeePending } = useWriteContract();

    /* Set Tick Spacing */
    const { data: tickSpacingHash, writeContract: setDefaultTickSpacing, isPending: isTickSpacingPending } = useWriteContract();

    const { isLoading: feeLoading } = useTransactionAwait(feeHash, { title: "Set Default Fee" });
    const { isLoading: communityFeeLoading } = useTransactionAwait(communityFeeHash, { title: "Set Community Fee" });
    const { isLoading: tickSpacingLoading } = useTransactionAwait(tickSpacingHash, { title: "Set Tick Spacing" });

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
            case SettingsKeys.FEE:
                setDefaultFeeConfiguration({
                    address: PLUGIN_FACTORY[DEFAULT_CHAIN_ID],
                    abi: pluginFactoryABI,
                    functionName: "setDefaultBaseFee",
                    args: [settingsData[SettingsKeys.FEE]],
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

    const isLoading =
        feeLoading || communityFeeLoading || tickSpacingLoading || isFeePending || isCommunityFeePending || isTickSpacingPending;

    const isButtonLoading = (key: SettingsKeys): boolean => {
        switch (key) {
            case SettingsKeys.COMMUNITY_FEE:
                return communityFeeLoading || isCommunityFeePending;
            case SettingsKeys.FEE:
                return feeLoading || isFeePending;
            case SettingsKeys.TICK_SPACING:
                return tickSpacingLoading || isTickSpacingPending;
            default:
                return false;
        }
    };

    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white rounded-lg w-[600px]">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className="flex flex-col gap-4">
                    <form className="flex flex-col gap-4 items-center">
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
                    </form>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default PoolsDefaultSettingsModal;
