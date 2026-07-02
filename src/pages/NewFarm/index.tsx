import PageContainer from "@/components/common/PageContainer";
import FarmingModule from "@/modules/FarmingModule";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const { CreateFarm } = FarmingModule.components;

const NewFarmPage = () => {
    return (
        <PageContainer>
            <Link to={"/farms"} className="flex items-center gap-2 mb-4 hover:text-black/70">
                <ArrowLeft size={16} />
                <span>Back</span>
            </Link>
            <div className="font-bold text-2xl mb-8">New Farm</div>
            <CreateFarm />
        </PageContainer>
    );
};

export default NewFarmPage;
