import GaugesList from "@/components/gauges/GaugesList";
import PageContainer from "../../components/common/PageContainer";
import { voterABI } from "@/generated";
import { useTransitionAwait } from "@/hooks/common/useTransactionAwait";
import Loader from "@/components/common/Loader";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { VOTER } from "@/constants/addresses";
import { Link } from "react-router-dom";

const GaugesPage = () => {
    const { config: distributeAllConfig, isError } = usePrepareContractWrite({
        address: VOTER,
        abi: voterABI,
        functionName: "distributeAll",
    });

    const { write: distributeAll, data: distributeAllHash, isLoading: distributeAllPending } = useContractWrite(distributeAllConfig);

    const { isLoading: distributeAllLoading } = useTransitionAwait(distributeAllHash?.hash, "Distribute All");

    const isDistributing = distributeAllPending || distributeAllLoading;

    return (
        <PageContainer>
            <div className="flex justify-between w-full mb-4">
                <div className="font-bold text-2xl">Gauges</div>
                <div className="flex gap-2">
                    <button
                        onClick={() => distributeAll?.()}
                        disabled={isDistributing || isError}
                        className="py-2 px-4 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 disabled:opacity-60 disabled:pointer-events-none"
                    >
                        {isDistributing ? <Loader /> : "Distribute All Rewards"}
                    </button>
                    <Link to={"/new-gauge"} className="py-2 px-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400">
                        + New Gauge
                    </Link>
                </div>
            </div>
            <GaugesList />
        </PageContainer>
    );
};

export default GaugesPage;
