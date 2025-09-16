import { useForm } from "react-hook-form";
import Loader from "@/components/common/Loader";
import { useAlgebraPoolToken0, useAlgebraPoolToken1, useVoterGetGauge, voterABI } from "@/generated";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";
import { PoolSelector } from "@/components/farms/CreateFarm";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VOTER } from "@/constants/addresses";
import { useWhitelistForGauge } from "@/hooks/gauges/useWhitelistForGauge";
import { ApprovalState } from "@/types/approve-state";

interface IFormState {
    pool: string | undefined;
}

const CreateGauge = () => {
    const { reset, watch, control } = useForm<IFormState>();

    const poolAddress = watch("pool");

    const { data: token0Address } = useAlgebraPoolToken0({
        address: poolAddress as Address,
    });
    const { data: token1Address } = useAlgebraPoolToken1({
        address: poolAddress as Address,
    });

    const { data: gauge, isLoading: isGaugeLoading } = useVoterGetGauge({
        args: [poolAddress as Address],
    });

    const isExists = gauge?.isAlive;

    const navigate = useNavigate();

    const { approvalCallback: approvalCallback0, approvalState: approvalState0 } = useWhitelistForGauge(token0Address);
    const { approvalCallback: approvalCallback1, approvalState: approvalState1 } = useWhitelistForGauge(token1Address);

    const isWhitelisted0 = approvalState0 === ApprovalState.APPROVED;
    const isWhitelisted1 = approvalState1 === ApprovalState.APPROVED;

    const { config, isError } = usePrepareContractWrite({
        address: VOTER,
        abi: voterABI,
        functionName: "createAlgebraGauge",
        args: [poolAddress as Address],
        enabled: !!poolAddress,
    });

    const { data, write: onCreate } = useContractWrite(config);

    const { isLoading, isSuccess } = useTransitionAwait(data?.hash, `Create Gauge`);

    useEffect(() => {
        if (isSuccess) {
            navigate("/gauges");
        }
    }, [isSuccess, navigate]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 w-full">
            <div className="flex flex-col gap-4 p-8 -mx-8 md:mx-0 h-fit md:border md:rounded-xl">
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
                            <button
                                disabled={approvalState0 === ApprovalState.PENDING}
                                onClick={() => approvalCallback0?.()}
                                type={"submit"}
                                className="flex justify-center w-full py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            >
                                {approvalState0 === ApprovalState.PENDING ? <Loader color="currentColor" /> : `Whitelist token0`}
                            </button>
                        )}
                        {!isWhitelisted1 && (
                            <button
                                disabled={approvalState1 === ApprovalState.PENDING}
                                onClick={() => approvalCallback1?.()}
                                type={"submit"}
                                className="flex justify-center w-full py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            >
                                {approvalState1 === ApprovalState.PENDING ? <Loader color="currentColor" /> : `Whitelist token1`}
                            </button>
                        )}
                    </div>
                )}
                {isWhitelisted0 && isWhitelisted1 && poolAddress && !isExists && (
                    <button
                        disabled={isError}
                        onClick={() => onCreate && onCreate()}
                        type={"submit"}
                        className="flex justify-center py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader color="currentColor" /> : "Create Gauge"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CreateGauge;
