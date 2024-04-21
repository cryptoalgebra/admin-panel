import PoolsList from '@/components/pools/PoolsList';
import PageContainer from '../../components/common/PageContainer';
import PoolsDefaultSettingsModal from '@/components/modals/PoolsDefaultSettingsModal';

const PoolsPage = () => {
    return (
        <PageContainer>
            <div className="flex justify-between w-full mb-4">
                <div className="font-bold text-2xl">Pools</div>
                <PoolsDefaultSettingsModal title="Default Settings">
                    <button className="py-2 px-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400">
                        Default settings
                    </button>
                </PoolsDefaultSettingsModal>
            </div>
            <PoolsList />
        </PageContainer>
    );
};

export default PoolsPage;
