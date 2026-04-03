import { Address } from "viem";
import { Wallet, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/common/SectionCard";
import { DataRow } from "@/components/common/DataRow";
import { AuthorizationState, MarketState } from "../../hooks";
import { Currency } from "@cryptoalgebra/integral-sdk";
import { WithdrawFeesModal } from "../modals";

interface MarketProtocolFeesProps {
    marketId: Address;
    marketState: MarketState | undefined;
    collateralToken: Currency | null | undefined;
    accruedFeesFormatted: string;
    authorization: AuthorizationState;
    userAddress: Address | undefined;
    onSuccess: () => void;
}

export const MarketProtocolFees = ({
    marketId,
    marketState,
    collateralToken,
    accruedFeesFormatted,
    authorization,
    userAddress,
    onSuccess,
}: MarketProtocolFeesProps) => (
    <SectionCard title="Protocol Fees" icon={Wallet}>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div className="divide-y divide-border">
                <DataRow label="Current Accrued Fees" value={`${accruedFeesFormatted} ${collateralToken?.symbol}`} />
                <DataRow
                    label="Wallet Authorization"
                    value={
                        authorization.isAuthorized ? (
                            <span className="text-green-400 flex items-center gap-1">
                                <CheckCircle2 size={14} /> Authorized
                            </span>
                        ) : (
                            <span className="text-yellow-400 flex items-center gap-1">
                                <AlertTriangle size={14} /> Read-only
                            </span>
                        )
                    }
                />
            </div>
            <div className="flex items-end">
                {authorization.canWithdraw ? (
                    <WithdrawFeesModal
                        marketAddress={marketId}
                        accruedFees={marketState?.accruedFees ?? 0n}
                        recipient={userAddress}
                        collateralToken={collateralToken?.wrapped}
                        onSuccess={onSuccess}
                    >
                        <Button variant="outline" className="w-full">
                            Withdraw Fees
                        </Button>
                    </WithdrawFeesModal>
                ) : (
                    <div className="w-full">
                        <Button variant="outline" className="w-full" disabled>
                            Withdraw Fees
                        </Button>
                        <p className="text-xs text-text/50 text-center mt-2">{authorization.reason}</p>
                    </div>
                )}
            </div>
        </div>
    </SectionCard>
);
