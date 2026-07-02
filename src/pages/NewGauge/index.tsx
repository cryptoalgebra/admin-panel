import PageContainer from "@/components/common/PageContainer";
import Ve33Module from "@/modules/Ve33Module";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const { CreateGauge } = Ve33Module.components;

const NewGaugePage = () => {
    return (
        <PageContainer>
            <Link to={"/gauges"} className="flex items-center gap-2 mb-4 hover:text-black/70">
                <ArrowLeft size={16} />
                <span>Back</span>
            </Link>
            <div className="font-bold text-2xl mb-8">New Gauge</div>
            <CreateGauge />
        </PageContainer>
    );
};

export default NewGaugePage;
