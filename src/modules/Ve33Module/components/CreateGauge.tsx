import { useForm } from "react-hook-form";
import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import FarmingModule from "@/modules/FarmingModule";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWhitelistForGauge } from "../hooks/useWhitelistForGauge";
import { ApprovalState } from "@/types/approve-state";
import { useReadAlgebraPoolToken0, useReadAlgebraPoolToken1, useReadVoterGetGauge, useWriteVoterCreateAlgebraGauge } from "@/generated";
import { Address } from "viem";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";

const { PoolSelector } = FarmingModule.components;

interface IFormState {
    pool: string | undefined;
}

const CreateGauge = () => {
    const { reset, watch, control } = useForm<IFormState>();

    const poolAddress = watch("pool");

    const { data: token0Address } = useReadAlgebraPoolToken0({
        address: poolAddress as Address,
    });
    const { data: token1Address } = useReadAlgebraPoolToken1({
        address: poolAddress as Address,
    });

    const { data: gauge, isLoading: isGaugeLoading } = useReadVoterGetGauge({
        args: [poolAddress as Address],
    });

    const isExists = gauge?.isAlive;

    const navigate = useNavigate();

    const { approvalCallback: approvalCallback0, approvalState: approvalState0 } = useWhitelistForGauge(token0Address);
    const { approvalCallback: approvalCallback1, approvalState: approvalState1 } = useWhitelistForGauge(token1Address);

    const isWhitelisted0 = approvalState0 === ApprovalState.APPROVED;
    const isWhitelisted1 = approvalState1 === ApprovalState.APPROVED;

    const { data: hash, writeContract, isPending, isError } = useWriteVoterCreateAlgebraGauge();

    const onCreate = () => {
        writeContract({
            args: [poolAddress as Address],
        });
    };

    const { isLoading, isSuccess } = useTransactionAwait(hash, { title: `Create Gauge` });

    useEffect(() => {
        if (isSuccess) {
            navigate("/gauges");
        }
    }, [isSuccess, navigate]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 w-full">
            <div className="flex flex-col gap-4 p-8 -mx-8 md:mx-0 h-fit md:border border-border md:rounded-xl">
                <label className="text-lg font-semibold">1. Select a pool</label>
                <PoolSelector control={control as any} reset={reset} />
                {poolAddress ? (
                    isGaugeLoading ? (
                        <Loader size={18} color="currentColor" />
                    ) : !isExists ? (
                        <span className="text-green-500">Pool is available</span>
                    ) : (
                        <span className="text-red-500">This pool already has gauge</span>
                    )
                ) : null}

                {!isExists && poolAddress && (
                    <div className="w-full flex gap-2 items-center">
                        {!isWhitelisted0 && (
                            <Button
                                disabled={approvalState0 === ApprovalState.PENDING}
                                onClick={() => approvalCallback0?.()}
                                className="flex-1"
                            >
                                {approvalState0 === ApprovalState.PENDING ? <Loader color="currentColor" /> : `Whitelist token0`}
                            </Button>
                        )}
                        {!isWhitelisted1 && (
                            <Button
                                disabled={approvalState1 === ApprovalState.PENDING}
                                onClick={() => approvalCallback1?.()}
                                className="flex-1"
                            >
                                {approvalState1 === ApprovalState.PENDING ? <Loader color="currentColor" /> : `Whitelist token1`}
                            </Button>
                        )}
                    </div>
                )}
                {isWhitelisted0 && isWhitelisted1 && poolAddress && !isExists && (
                    <Button disabled={isError || isPending || isLoading} onClick={() => onCreate && onCreate()} className="w-full">
                        {isLoading || isPending ? <Loader color="currentColor" /> : "Create Gauge"}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CreateGauge;
