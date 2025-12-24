import PoolsList from "@/components/pools/PoolsList";
import { Button } from "@/components/ui/button";
import PageContainer from "../../components/common/PageContainer";
import PoolsDefaultSettingsModal from "@/components/modals/PoolsDefaultSettingsModal";
import { Settings } from "lucide-react";

const PoolsPage = () => {
    return (
        <PageContainer>
            <div className="flex justify-between w-full mb-4">
                <div className="font-bold text-2xl">Pools</div>
                <PoolsDefaultSettingsModal title="Default Settings">
                    <Button variant="outline">
                        <Settings size={18} />
                        Default settings
                    </Button>
                </PoolsDefaultSettingsModal>
            </div>
            <PoolsList />
        </PageContainer>
    );
};

export default PoolsPage;
