import Loader from "@/components/common/Loader";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import {
    useAlgebraFactoryDefaultCommunityFee,
    useAlgebraFactoryDefaultTickspacing,
    useAlgebraFactoryDefaultFee,
    usePrepareAlgebraFactorySetDefaultCommunityFee,
    usePrepareAlgebraFactorySetDefaultTickspacing,
    usePreparePluginFactorySetDefaultBaseFee,
} from "@/generated";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useContractWrite } from "wagmi";

interface IPoolsDefaultSettingsModal {
    title: string;
    children: React.ReactNode;
}

enum SettingsKeys {
    COMMUNITY_FEE = "Community Fee",
    FEE = "Fee",
    TICK_SPACING = "Tick Spacing",
}

interface Settings {
    [SettingsKeys.COMMUNITY_FEE]: number;
    [SettingsKeys.FEE]: number;
    [SettingsKeys.TICK_SPACING]: number;
}

const PoolsDefaultSettingsModal = ({ title, children }: IPoolsDefaultSettingsModal) => {
    const [settingsData, setSettingsData] = useState<Settings>({
        [SettingsKeys.COMMUNITY_FEE]: 0,
        [SettingsKeys.FEE]: 0,
        [SettingsKeys.TICK_SPACING]: 0,
    });

    const { data: defaultFee } = useAlgebraFactoryDefaultFee();

    const { data: defaultCommunityFee } = useAlgebraFactoryDefaultCommunityFee();

    const { data: defaultTickSpacing } = useAlgebraFactoryDefaultTickspacing();

    useEffect(() => {
        if (defaultCommunityFee === undefined || defaultTickSpacing === undefined || defaultFee === undefined) return;
        setSettingsData({
            [SettingsKeys.COMMUNITY_FEE]: defaultCommunityFee,
            [SettingsKeys.FEE]: defaultFee,
            [SettingsKeys.TICK_SPACING]: defaultTickSpacing,
        });
    }, [defaultCommunityFee, defaultTickSpacing, defaultFee]);

    /* Set Default Community Fee */
    const { config: defaultCommunityFeeConfig } = usePrepareAlgebraFactorySetDefaultCommunityFee({
        args: [settingsData[SettingsKeys.COMMUNITY_FEE]],
    });

    const { data: communityFeeHash, write: setDefaultCommunityFee } = useContractWrite(defaultCommunityFeeConfig);

    /* Set Default Fee */
    const { config: defaultFeeConfig } = usePreparePluginFactorySetDefaultBaseFee({
        args: [settingsData[SettingsKeys.FEE]],
    });

    const { data: feeHash, write: setDefaultFeeConfiguration } = useContractWrite(defaultFeeConfig);

    /* Set Tick Spacing */
    const { config: tickSpacingConfig } = usePrepareAlgebraFactorySetDefaultTickspacing({
        args: [settingsData[SettingsKeys.TICK_SPACING]],
    });

    const { data: tickSpacingHash, write: setDefaultTickSpacing } = useContractWrite(tickSpacingConfig);

    const { isLoading: feeLoading } = useTransitionAwait(feeHash?.hash, "Set Default Fee");
    const { isLoading: communityFeeLoading } = useTransitionAwait(communityFeeHash?.hash, "Set Community Fee");
    const { isLoading: tickSpacingLoading } = useTransitionAwait(tickSpacingHash?.hash, "Set Tick Spacing");

    const handleSubmit = (e: React.FormEvent, key: SettingsKeys) => {
        e.preventDefault();
        switch (key) {
            case SettingsKeys.COMMUNITY_FEE:
                setDefaultCommunityFee?.();
                break;
            case SettingsKeys.FEE:
                setDefaultFeeConfiguration?.();
                break;
            case SettingsKeys.TICK_SPACING:
                setDefaultTickSpacing?.();
                break;
            default:
                break;
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
                            <label
                                className={cn("gap-2 mb-2 w-full", key === SettingsKeys.FEE ? "grid grid-cols-2" : "flex flex-col")}
                                key={key}
                            >
                                <h4 className="w-full text-sm font-medium col-span-2">{key}</h4>
                                <Input
                                    key={key}
                                    onChange={(e) =>
                                        setSettingsData({
                                            ...settingsData,
                                            [key]: e.target.value,
                                        })
                                    }
                                    value={value}
                                    type={"number"}
                                />
                                <button
                                    disabled={feeLoading || communityFeeLoading || tickSpacingLoading}
                                    onClick={(e) => handleSubmit(e, key as SettingsKeys)}
                                    className="flex col-span-2 justify-center w-full py-2 px-4 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 disabled:bg-neutral-400 transition-colors"
                                >
                                    {feeLoading || communityFeeLoading || tickSpacingLoading ? <Loader /> : "Confirm"}
                                </button>
                            </label>
                        ))}
                    </form>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default PoolsDefaultSettingsModal;
