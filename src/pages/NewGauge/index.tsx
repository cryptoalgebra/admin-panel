import PageContainer from "@/components/common/PageContainer";
import CreateGauge from "@/components/gauges/CreateGauge";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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
