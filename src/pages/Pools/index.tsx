import PoolsList from "@/components/pools/PoolsList";
import PageContainer from "../../components/common/PageContainer";
import PoolsDefaultSettingsModal from "@/components/modals/PoolsDefaultSettingsModal";
import { Settings } from "lucide-react";

const PoolsPage = () => {
    return (
        <PageContainer>
            <div className="flex justify-between w-full mb-4">
                <div className="font-bold text-2xl">Pools</div>
                <PoolsDefaultSettingsModal title="Default Settings">
                    <button className="py-2 gap-2 flex items-center px-4 bg-white text-black hover:bg-neutral-100 duration-200 font-normal text-sm rounded-lg border border-border">
                        <Settings size={18} />
                        Default settings
                    </button>
                </PoolsDefaultSettingsModal>
            </div>
            <PoolsList />
        </PageContainer>
    );
};

export default PoolsPage;
