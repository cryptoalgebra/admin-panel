import TokenSelectorModal from "@/components/modals/TokenSelectorModal";
import { useMemo, useState } from "react";
import { Currency, Token } from "@cryptoalgebra/custom-pools-and-sliding-fee-sdk";
import { Control, Controller, SubmitHandler, useForm } from "react-hook-form";
import { ChevronRight, X } from "lucide-react";
import { useAccount, useBalance } from "wagmi";
import { Address, parseUnits } from "viem";
import { formatCurrency } from "@/utils/common/formatCurrency";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActiveFarmingForPoolQuery, useAllPoolsQuery, useCustomPoolDeployerQuery } from "@/graphql/generated/graphql";
import CurrencyLogo from "@/components/common/CurrencyLogo";
import { DEFAULT_CHAIN_ID } from "@/constants/default-chain-id";
import { farmsClient } from "@/graphql/clients";
import Loader from "@/components/common/Loader";
import CreateFarmButton from "../CreateFarmButton";
import { PartialIncentiveKey } from "@/types/incentive-key";
import { useEternalFarmingNumOfIncentives } from "@/generated";
import { IRewards } from "@/types/rewards";
import { cn } from "@/lib/utils";
import { CUSTOM_POOL_DEPLOYER_TITLES } from "@/constants/custom-pool-deployer";

interface IFormState {
    pool: string | undefined;
    rewardToken: Currency | undefined;
    bonusRewardToken: Currency | undefined;
    rewardAmount: string | undefined;
    bonusRewardAmount: string | undefined;
    rewardRate: string | undefined;
    bonusRewardRate: string | undefined;
    minimalPositionWidth: string | undefined;
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

const InputNumber = ({
    title,
    name,
    control,
    disabled,
    isRequired,
    maxDecimals = 18,
}: {
    title: string;
    name: keyof IFormState;
    control: Control<IFormState>;
    disabled?: boolean;
    isRequired?: boolean;
    maxDecimals?: number;
}) => (
    <Controller
        name={name}
        disabled={disabled}
        control={control}
        rules={{
            required: isRequired ? `Enter ${title}` : false,
            validate: {
                required: () => `Enter ${title}`,
            },
        }}
        render={({ field: { onChange, value }, fieldState: { invalid } }) => (
            <div
                className={cn(
                    "flex items-end w-full h-[62px] relative group bg-white rounded-2xl border border-solid border-[#eaeaea] focus-within:bg-white focus-within:border-[#8248E5]",
                    disabled ? "opacity-30 pointer-events-none" : ""
                )}
            >
                <input
                    id={name}
                    required={isRequired}
                    autoComplete="off"
                    autoCorrect="off"
                    className="w-full h-[42px] px-4 text-[18px] peer outline-none rounded-2xl bg-inherit"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    spellCheck="false"
                    inputMode="decimal"
                    minLength={1}
                    maxLength={100}
                    value={value as string}
                    onChange={(e) => {
                        if (disabled) return;
                        let value = e.target.value.replace(/,/g, ".");
                        value = value.indexOf(".") >= 0 ? value.slice(0, value.indexOf(".") + maxDecimals + 1) : value;
                        if (value === "" || inputRegex.test(value.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))) {
                            onChange(value === "." ? "0." : value);
                        }
                    }}
                />
                <label
                    htmlFor={name}
                    className={
                        (isRequired && value) || (!isRequired && value)
                            ? "transform transition-all absolute top-0 left-0 h-full flex items-center pl-5 text-[16px] cursor-text group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-[0px] group-focus-within:translate-x-[16px] peer-valid:-translate-y-[0px] peer-valid:translate-x-[16px] group-focus-within:opacity-40 peer-valid:opacity-40 group-focus-within:pl-0 peer-valid:pl-0"
                            : `transform transition-all absolute top-0 left-0 h-full flex items-center pl-5 text-[16px] cursor-text group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-[0px] group-focus-within:translate-x-[16px] group-focus-within:opacity-40 group-focus-within:pl-0`
                    }
                >
                    {title}
                </label>
                {isRequired && !value && <span className="absolute text-red-500 top-4 right-5 text-[22px]">*</span>}
                {!invalid && !disabled && value?.toString().trim() !== "" && (
                    <span className="absolute text-[#DB0170] top-5 right-5 text-[22px]">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 11L9.5 16.5L19.5 6.5"
                                stroke="#1AA842"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                )}
            </div>
        )}
    />
);

export const InputToggle = ({
    title,
    name,
    control,
    disabled,
    isRequired,
}: {
    title: string;
    name: keyof IFormState;
    control: Control<IFormState>;
    disabled?: boolean;
    isRequired?: boolean;
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: isRequired ? `Select ${title}` : false,
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div
                    className={cn(
                        "flex items-center gap-2 p-5 bg-white rounded-2xl border border-[#eaeaea]",
                        disabled ? "opacity-30 pointer-events-none" : ""
                    )}
                >
                    <label htmlFor={name} className="flex-1 cursor-pointer">
                        {title}
                        {isRequired && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <Switch id={name} checked={!!value} onCheckedChange={onChange} disabled={disabled} />
                    {error && <span className="text-red-500 text-xs absolute -bottom-4 right-0">{error.message}</span>}
                </div>
            )}
        />
    );
};

const RewardRate = ({
    title,
    name,
    control,
    isRequired,
    maxDecimals,
    disabled,
}: {
    title: string;
    name: keyof IFormState;
    control: Control<IFormState>;
    isRequired?: boolean;
    maxDecimals?: number;
    disabled?: boolean;
}) => (
    <div>
        <InputNumber title={title} name={name} control={control} isRequired={isRequired} maxDecimals={maxDecimals} disabled={disabled} />
    </div>
);

const Reward = ({ control, name }: { control: Control<IFormState>; name: "rewardToken" | "bonusRewardToken" }) => {
    const { address: account } = useAccount();

    const [isOpen, setIsOpen] = useState(false);
    const [currency, setCurrency] = useState<Currency>();

    const { data: balance } = useBalance({
        address: account,
        token: currency ? (currency.wrapped.address as Address) : undefined,
    });

    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: "Select Token",
                validate: {
                    required: () => "Select Token",
                },
            }}
            render={({ field: { onChange, value } }) => (
                <>
                    <div className="flex w-full gap-4">
                        <TokenSelectorModal
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            onSelect={(currency) => {
                                setIsOpen(false);
                                onChange(currency);
                                setCurrency(currency);
                            }}
                        >
                            <button
                                className={`flex items-center justify-between gap-2 w-full px-4 py-3 border rounded-2xl text-left hover:bg-gray-50`}
                                onClick={() => setIsOpen(true)}
                            >
                                <span className="inline-flex items-center gap-2">
                                    {value && <CurrencyLogo currency={value} size={20} />}
                                    <span>{value ? value.symbol : `Select Token`}</span>
                                    {value && balance && (
                                        <span className="px-2 bg-gray-100 rounded-xl">{`${formatCurrency.format(
                                            +balance.formatted
                                        )}`}</span>
                                    )}
                                </span>
                                <span>
                                    <ChevronRight size={14} />
                                </span>
                            </button>
                        </TokenSelectorModal>
                        {value && (
                            <button
                                onClick={() => {
                                    onChange(undefined);
                                    setCurrency(undefined);
                                }}
                            >
                                <X color={"red"} size={16} />
                            </button>
                        )}
                    </div>
                </>
            )}
        />
    );
};

const CreateFarm = () => {
    const { handleSubmit, reset, watch, control, setValue } = useForm<IFormState>();

    const onSubmit: SubmitHandler<IFormState> = (data) => console.log(data);

    const [hasSecondReward, setHasSecondReward] = useState(true);

    const handleSecondRewardToggle = () => {
        setHasSecondReward(!hasSecondReward);
        setValue("bonusRewardToken", undefined);
        setValue("bonusRewardAmount", undefined), setValue("bonusRewardRate", undefined);
    };

    const rewardToken = watch("rewardToken");
    const bonusRewardToken = watch("bonusRewardToken");
    const poolAddress = watch("pool");

    const rewardAmount = watch("rewardAmount");
    const rewardRate = watch("rewardRate");
    const bonusRewardAmount = watch("bonusRewardAmount");
    const bonusRewardRate = watch("bonusRewardRate");

    const minimalPositionWidth = watch("minimalPositionWidth");

    const { data: poolDeployer } = useCustomPoolDeployerQuery({
        variables: {
            poolId: poolAddress?.toLowerCase() || "",
        },
    });

    const { data: activeFarming, loading: isFarmingLoading } = useActiveFarmingForPoolQuery({
        skip: Boolean(!poolAddress),
        client: farmsClient,
        variables: {
            poolId: poolAddress,
        },
    });

    const isPoolAvailable =
        !isFarmingLoading && activeFarming && activeFarming.eternalFarmings.length === 0 && poolDeployer?.pool?.deployer;

    const { data: nonce } = useEternalFarmingNumOfIncentives();

    const incentveKey: PartialIncentiveKey = {
        rewardToken: rewardToken ? (rewardToken.wrapped.address as Address) : undefined,
        bonusRewardToken: bonusRewardToken ? (bonusRewardToken.wrapped.address as Address) : undefined,
        pool: poolAddress ? (poolAddress as Address) : undefined,
        nonce,
    };

    const rewards: IRewards = {
        reward: rewardAmount,
        rewardBn: rewardAmount && rewardToken ? parseUnits(rewardAmount as `${number}`, rewardToken.decimals) : undefined,
        rewardRate: rewardRate,
        rewardRateBn: rewardRate && rewardToken ? parseUnits(rewardRate as `${number}`, rewardToken.decimals) : undefined,
        bonusReward: bonusRewardAmount,
        bonusRewardBn:
            bonusRewardAmount && bonusRewardToken ? parseUnits(bonusRewardAmount as `${number}`, bonusRewardToken.decimals) : undefined,
        bonusRewardRate: bonusRewardRate,
        bonusRewardRateBn:
            bonusRewardRate && bonusRewardToken ? parseUnits(bonusRewardRate as `${number}`, bonusRewardToken.decimals) : undefined,
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 w-full">
            <div className="flex flex-col gap-4 p-8 -mx-8 md:mx-0 h-fit md:border md:rounded-xl">
                <label className="text-lg font-semibold">1. Select a pool</label>
                <PoolSelector control={control} reset={reset} />
                {poolAddress ? (
                    isFarmingLoading ? (
                        <Loader size={18} color="currentColor" />
                    ) : isPoolAvailable ? (
                        <span className="text-green-500">Pool is available</span>
                    ) : (
                        <span className="text-red-500">This pool already has active farming</span>
                    )
                ) : null}
            </div>

            {isPoolAvailable && (
                <div className="p-8 -mx-8 md:mx-0 md:border rounded-xl">
                    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="text-lg font-semibold">2. Add rewards</div>
                                <div className="flex items-center gap-2 text-sm">
                                    <label htmlFor="secondReward">Second reward</label>
                                    <Switch id="secondReward" checked={hasSecondReward} onCheckedChange={handleSecondRewardToggle} />
                                </div>
                            </div>
                        </div>

                        <Reward control={control} name={"rewardToken"} />

                        <InputNumber
                            control={control}
                            name={"rewardAmount"}
                            title={`Enter ${rewardToken?.symbol || "Reward"} Amount`}
                            isRequired
                            maxDecimals={rewardToken?.decimals}
                            disabled={!rewardToken}
                        />

                        <RewardRate
                            control={control}
                            name={"rewardRate"}
                            title={`Enter ${rewardToken?.symbol || "Reward"} Distirbution Rate per second`}
                            isRequired
                            maxDecimals={rewardToken?.decimals}
                            disabled={!rewardToken || !rewardAmount}
                        />

                        {hasSecondReward && (
                            <>
                                <div className="text-base font-bold">Second Reward</div>

                                <Reward control={control} name={"bonusRewardToken"} />

                                <InputNumber
                                    control={control}
                                    name={"bonusRewardAmount"}
                                    title={`Enter ${bonusRewardToken?.symbol || "Bonus Reward"} Amount`}
                                    isRequired
                                    maxDecimals={bonusRewardToken?.decimals}
                                    disabled={!bonusRewardToken || !hasSecondReward}
                                />

                                <RewardRate
                                    control={control}
                                    name={"bonusRewardRate"}
                                    title={`Enter ${bonusRewardToken?.symbol || "Bonus Reward"} Distirbution Rate per second`}
                                    isRequired
                                    maxDecimals={bonusRewardToken?.decimals}
                                    disabled={!bonusRewardToken || !bonusRewardAmount || !hasSecondReward}
                                />
                            </>
                        )}
                        <div className="flex flex-col gap-4">
                            <div className="text-lg font-semibold">3. Configure</div>

                            <InputNumber
                                control={control}
                                name={"minimalPositionWidth"}
                                title={`Minimal position width`}
                                isRequired={false}
                                maxDecimals={0}
                            />

                            {/* <InputToggle title="Enable farming for ALM" name={"enableAlmFarming"} control={control} isRequired={false} /> */}
                        </div>

                        <CreateFarmButton
                            hasSecondReward={hasSecondReward}
                            incentiveKey={incentveKey}
                            rewards={rewards}
                            minimalPositionWidth={Number(minimalPositionWidth || 0)}
                            poolDeployer={poolDeployer.pool?.deployer}
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export const PoolSelector = ({ control, reset }: { control: Control<IFormState>; reset: () => void }) => {
    const { data: pools } = useAllPoolsQuery();

    const formattedPools = useMemo(() => {
        if (!pools?.pools) return [];

        return pools.pools.map((pool) => ({
            id: pool.id,
            token0: pool.token0,
            token1: pool.token1,
            deployer: pool.deployer,
            name: `${pool.token0.symbol} / ${pool.token1.symbol}`,
        }));
    }, [pools]);

    return (
        <Controller
            control={control}
            name={"pool"}
            rules={{
                required: "Select Pool",
                validate: {
                    required: () => "Select Pool",
                },
            }}
            render={({ field: { onChange } }) => (
                <Select
                    onValueChange={(v) => {
                        reset();
                        setTimeout(() => onChange(v), 0);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a pool" />
                    </SelectTrigger>
                    <SelectContent>
                        {formattedPools.map((pool) => (
                            <SelectItem key={pool.id} value={pool.id} className="px-2">
                                <div className="flex w-full gap-1">
                                    <CurrencyLogo currency={new Token(DEFAULT_CHAIN_ID, pool.token0.id, +pool.token0.decimals)} size={20} />
                                    <CurrencyLogo currency={new Token(DEFAULT_CHAIN_ID, pool.token1.id, +pool.token1.decimals)} size={20} />
                                    <span className="ml-2">{pool.name}</span>
                                    <span className="ml-2">{CUSTOM_POOL_DEPLOYER_TITLES[pool.deployer]}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        />
    );
};

export default CreateFarm;
