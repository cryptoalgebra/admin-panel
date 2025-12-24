import CurrencyLogo from "@/components/common/CurrencyLogo";
import EnterAmountCard from "@/components/common/EnterAmountCard";
import Loader from "@/components/common/Loader";
import TokenSelectorModal from "@/components/modals/TokenSelectorModal";
import { Button } from "@/components/ui/button";
import { useWriteVotingRewardIncentivize } from "@/generated";
import { useApprove } from "@/hooks/common/useApprove";
import { useCurrency } from "@/hooks/common/useCurrency";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import { useWhitelistForGauge } from "@/hooks/gauges/useWhitelistForGauge";
import { ApprovalState } from "@/types/approve-state";
import { RewardToken, VotingPool } from "@/types/gauge";
import { Currency, CurrencyAmount } from "@cryptoalgebra/integral-sdk";
import { Gift } from "lucide-react";
import { useEffect, useState } from "react";
import { Address, formatUnits, parseUnits } from "viem";

export function GaugeRewards({ votingPool, refetch }: { votingPool: VotingPool; refetch: () => void }) {
    const filteredRewards = votingPool.rewardTokenList.filter((rewardToken) => rewardToken.amount > 0n);
    return (
        <div className="flex flex-col p-6 bg-card border border-border rounded-lg transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-bg-200 rounded-xl">
                    <Gift size={18} className="text-text" />
                </div>
                <h3 className="font-semibold text-lg text-text">Current Incentives</h3>
            </div>

            {filteredRewards.length > 0 ? (
                <div className="flex flex-col gap-3 mb-6">
                    {filteredRewards.map((rewardToken) => (
                        <div key={rewardToken.address}>
                            <GaugeRewardToken rewardToken={rewardToken} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center w-full min-h-32 bg-bg-200 border border-border rounded-lg mb-6">
                    <p className="text-sm text-text/50">No active incentives</p>
                </div>
            )}

            <div className="h-px bg-border mb-6" />

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

    const { writeContract, data: hash, isPending } = useWriteVotingRewardIncentivize();

    const onSubmit = () => {
        if (selectedToken && parsedValue) {
            writeContract({
                address: votingReward,
                args: [selectedToken.wrapped.address as Address, parsedValue],
            });
        }
    };

    const { isLoading, isSuccess } = useTransactionAwait(hash, { title: "New incentive" });

    useEffect(() => {
        if (isSuccess) {
            refetch();
            setSelectedToken(undefined);
            setTokenValue("");
            setIsOpen(false);
        }
    }, [isSuccess, refetch]);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-text/50 uppercase tracking-wider">New Incentive</p>
                {selectedToken && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedToken(undefined)} className="h-auto py-1 px-3 text-xs">
                        Change token
                    </Button>
                )}
            </div>
            {selectedToken ? (
                <>
                    <EnterAmountCard currency={selectedToken} value={tokenValue} handleChange={setTokenValue} />
                    {approvalState === ApprovalState.APPROVED && whitelistState === ApprovalState.APPROVED ? (
                        <Button onClick={onSubmit} disabled={isLoading || isPending} className="w-full">
                            {isLoading || isPending ? <Loader size={18} /> : "Submit"}
                        </Button>
                    ) : approvalState === ApprovalState.APPROVED ? (
                        <Button onClick={whitelistCallback} disabled={whitelistState === ApprovalState.PENDING} className="w-full">
                            {whitelistState === ApprovalState.PENDING ? <Loader size={18} /> : "Whitelist for Voter"}
                        </Button>
                    ) : (
                        <Button onClick={approvalCallback} disabled={approvalState === ApprovalState.PENDING} className="w-full">
                            {approvalState === ApprovalState.PENDING ? <Loader size={18} /> : "Approve for Voter"}
                        </Button>
                    )}
                </>
            ) : (
                <TokenSelectorModal isOpen={isOpen} setIsOpen={setIsOpen} onSelect={setSelectedToken} otherCurrency={selectedToken}>
                    <Button variant="outline" className="w-full">
                        + Add incentive
                    </Button>
                </TokenSelectorModal>
            )}
        </div>
    );
};

const GaugeRewardToken = ({ rewardToken }: { rewardToken: RewardToken }) => {
    const currency = useCurrency(rewardToken.address as Address);

    return (
        <div className="flex p-3 gap-4 bg-bg-200 border border-border items-center rounded-lg">
            <CurrencyLogo currency={currency} size={40} />
            <div className="flex flex-col gap-0 items-start">
                <span className="text-sm font-medium text-text">
                    {formatUnits(rewardToken.amount, rewardToken.decimals)} {currency?.symbol}
                </span>
                <span className="text-xs text-text/50">${rewardToken.amountUsd.toFixed(4)}</span>
            </div>
        </div>
    );
};
