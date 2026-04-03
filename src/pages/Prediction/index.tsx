import PageContainer from "@/components/common/PageContainer";
import PredictionModule from "@/modules/PredictionModule";

const { PredictionMarketsList, PredictionSummary } = PredictionModule.components;

const PredictionPage = () => {
    return (
        <PageContainer>
            <div className="flex justify-between w-full mb-6">
                <div className="font-bold text-2xl">Prediction Markets</div>
            </div>

            <PredictionSummary />
            <PredictionMarketsList />
        </PageContainer>
    );
};

export default PredictionPage;
