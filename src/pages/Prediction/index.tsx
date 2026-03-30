import PageContainer from "@/components/common/PageContainer";
import PredictionModule from "@/modules/PredictionModule";

const { PredictionMarketsList } = PredictionModule.components;

const PredictionPage = () => {

    return (<PageContainer>
        <div className="flex justify-between w-full mb-4">
            <div className="font-bold text-2xl">Prediction</div>
        </div>
        <PredictionMarketsList />
    </PageContainer>
    )

};

export default PredictionPage;