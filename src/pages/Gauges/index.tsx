import Ve33Module from "@/modules/Ve33Module";
import { Button } from "@/components/ui/button";
import PageContainer from "../../components/common/PageContainer";
import { useTransactionAwait } from "@/hooks/common/useTransactionAwait";
import Loader from "@/components/common/Loader";
import { useWriteVoterDistributeAll } from "@/generated";
import { Link } from "react-router-dom";

const { GaugesList } = Ve33Module.components;

const GaugesPage = () => {
    const { writeContract, data: hash, isPending, isError } = useWriteVoterDistributeAll();

    const { isLoading } = useTransactionAwait(hash, { title: "Distribute All" });

    const isDistributing = isPending || isLoading;

    return (
        <PageContainer>
            <div className="flex justify-between items-center w-full mb-6">
                <div>
                    <h1 className="font-semibold text-2xl text-text">Gauges</h1>
                    <p className="text-sm text-text/50 mt-1">Manage voting gauges</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => writeContract({})} disabled={isDistributing || isError}>
                        {isDistributing ? <Loader /> : "Distribute All"}
                    </Button>
                    <Button variant="outline" asChild>
                        <Link to={"/new-gauge"}>+ New Gauge</Link>
                    </Button>
                </div>
            </div>
            <GaugesList />
        </PageContainer>
    );
};

export default GaugesPage;
