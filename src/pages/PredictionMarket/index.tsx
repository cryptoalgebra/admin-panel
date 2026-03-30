import { useReadPredictionMarketAccruedFees, useSimulatePredictionMarketWithdrawFees } from "@/generated";
import { useParams } from "react-router-dom";
import { Address } from "viem";

const PredictionMarketPage = () => {

    const { market } = useParams() as { market: Address };

    const { data: aquiredFees } = useReadPredictionMarketAccruedFees({
        address: market
    })

    const { data: withdrawnFees, error } = useSimulatePredictionMarketWithdrawFees({
        address: market,
        args: aquiredFees ? [
            "0xC298CD04E4205D70a21B37F6310eaCB72CF265a5",
            aquiredFees
        ] : undefined,
        account: "0xC298CD04E4205D70a21B37F6310eaCB72CF265a5"
    })

    console.log("withdrawnFees", aquiredFees, withdrawnFees, error)

    return <div>Prediction market {market}</div>
};

export default PredictionMarketPage;