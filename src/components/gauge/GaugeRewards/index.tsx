import CurrencyLogo from "@/components/common/CurrencyLogo";
import EnterAmountCard from "@/components/common/EnterAmountCard";
import TokenSelectorModal from "@/components/modals/TokenSelectorModal";
import { usePrepareVotingRewardIncentivize } from "@/generated";
import { useApprove } from "@/hooks/common/useApprove";
import { useCurrency } from "@/hooks/common/useCurrency";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import { useWhitelistForGauge } from "@/hooks/gauges/useWhitelistForGauge";
import { ApprovalState } from "@/types/approve-state";
import { RewardToken, VotingPool } from "@/types/gauge";
import { Currency, CurrencyAmount } from "@cryptoalgebra/custom-pools-and-sliding-fee-sdk";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Address, formatUnits, parseUnits } from "viem";
import { useContractWrite } from "wagmi";

export function GaugeRewards({ votingPool, refetch }: { votingPool: VotingPool; refetch: () => void }) {
    const filteredRewards = votingPool.rewardTokenList.filter((rewardToken) => rewardToken.amount > 0n);
    return (
        <div className="flex flex-col gap-4 p-4 border rounded-xl">
            <div>
                <span className="font-bold">Current Incentives </span>
            </div>
            {filteredRewards.length > 0 ? (
                filteredRewards.map((rewardToken) => (
                    <div key={rewardToken.address}>
                        <GaugeRewardToken rewardToken={rewardToken} />
                    </div>
                ))
            ) : (
                <div className="flex items-center justify-center w-full min-h-48 border rounded-lg">Gauge doesn't have rewards</div>
            )}
            <NewIncentive votingReward={votingPool.votingReward} refetch={refetch} />
        </div>
    );
}

const NewIncentive = ({ votingReward, refetch }: { votingReward: Address; refetch: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState<Currency>();
    const [tokenValue, setTokenValue] = useState<string>("");

    const parsedValue = selectedToken && parseUnits(tokenValue.toString() as any, selectedToken?.decimals);

    const { approvalCallback, approvalState } = useApprove(
        selectedToken && parsedValue ? CurrencyAmount.fromRawAmount(selectedToken, parsedValue.toString()) : undefined,
        votingReward
    );

    const { approvalCallback: whitelistCallback, approvalState: whitelistState } = useWhitelistForGauge(
        selectedToken?.wrapped.address as Address
    );

    const { config } = usePrepareVotingRewardIncentivize({
        address: votingReward,
        args: selectedToken && parsedValue ? [selectedToken.wrapped.address as Address, parsedValue] : undefined,
    });

    const { data, write, isLoading: isPending, error } = useContractWrite(config);

    const { isLoading, isSuccess } = useTransitionAwait(data?.hash, `New incentive`);

    useEffect(() => {
        if (isSuccess) {
            refetch();
            setSelectedToken(undefined);
            setTokenValue("");
            setIsOpen(false);
        }
    }, [isSuccess]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span className="font-bold">New incentive</span>
                {selectedToken && (
                    <button
                        onClick={() => setSelectedToken(undefined)}
                        className="py-1 px-3 w-fit text-sm hover:bg-gray-100 flex justify-center  border rounded-lg text-md"
                    >
                        Change token
                    </button>
                )}
            </div>
            {selectedToken ? (
                <>
                    <EnterAmountCard currency={selectedToken} value={tokenValue} handleChange={setTokenValue} />
                    {approvalState === ApprovalState.APPROVED && whitelistState === ApprovalState.APPROVED ? (
                        <button
                            onClick={() => {
                                write?.();
                                if (error) console.error(error);
                            }}
                            disabled={isLoading || isPending}
                            className="px-4 py-2 w-full text-sm flex justify-center text-white border bg-blue-500 font-bold hover:bg-blue-500 disabled:opacity-60 rounded-lg text-md"
                        >
                            {isLoading || isPending ? <Loader /> : "Submit"}
                        </button>
                    ) : approvalState === ApprovalState.APPROVED ? (
                        <button
                            onClick={whitelistCallback}
                            disabled={whitelistState === ApprovalState.PENDING}
                            className="px-4 py-2 w-full text-sm flex justify-center text-white border bg-blue-500 font-bold hover:bg-blue-500 disabled:opacity-60 rounded-lg text-md"
                        >
                            {whitelistState === ApprovalState.PENDING ? <Loader /> : "Whitelist for Voter"}
                        </button>
                    ) : (
                        <button
                            onClick={approvalCallback}
                            disabled={approvalState === ApprovalState.PENDING}
                            className="px-4 py-2 w-full text-sm flex justify-center text-white border bg-blue-500 font-bold hover:bg-blue-500 disabled:opacity-60 rounded-lg text-md"
                        >
                            {approvalState === ApprovalState.PENDING ? <Loader /> : "Approve for Voter"}
                        </button>
                    )}
                </>
            ) : (
                <TokenSelectorModal isOpen={isOpen} setIsOpen={setIsOpen} onSelect={setSelectedToken} otherCurrency={selectedToken}>
                    <button className="px-4 py-2 w-full text-sm  text-black border border-blue-500 font-bold hover:bg-blue-500 rounded-lg text-md">
                        + Add incentive
                    </button>
                </TokenSelectorModal>
            )}
        </div>
    );
};

const GaugeRewardToken = ({ rewardToken }: { rewardToken: RewardToken }) => {
    const currency = useCurrency(rewardToken.address as Address);

    return (
        <div className="flex p-3 gap-4 border items-center rounded-lg">
            <CurrencyLogo currency={currency} size={40} />
            <div className="flex flex-col gap-0 items-start">
                <span>
                    {formatUnits(rewardToken.amount, rewardToken.decimals)} {currency?.symbol}
                </span>
                <span>${rewardToken.amountUsd.toFixed(4)}</span>
            </div>
        </div>
    );
};
