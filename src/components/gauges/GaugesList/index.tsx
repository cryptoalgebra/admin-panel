import { CUSTOM_POOL_DEPLOYER_TITLES } from "@/constants/custom-pool-deployer";
import { FormattedGauge, useAllGauges } from "@/hooks/gauges/useAllGauges";
import { Link } from "react-router-dom";

const GaugeHeader = () => (
    <div className="hidden md:grid grid-cols-6 uppercase text-xs font-semibold text-gray-600 mb-4 pb-4 border-b border-gray-300">
        <div>Gauge</div>
        <div>Deployer</div>
        <div>TVL</div>
        <div>Volume 24H</div>
        <div>APR</div>
        <div></div>
    </div>
);

const GaugeRow = (gauge: FormattedGauge) => {
    return (
        <div className="grid grid-cols-6 gap-4 md:gap-0 md:grid-cols-6 w-full text-left p-4 bg-gray-50 border border-gray-300 rounded-xl">
            {gauge.pair.token0 && gauge.pair.token1 && (
                <div className="flex w-full justify-between">
                    <div className="md:hidden font-bold">Gauge</div>
                    <div className="flex items-center gap-4">
                        <p>{`${gauge.pair.token0.symbol} / ${gauge.pair.token1.symbol}`}</p>
                        <div className="bg-blue-200 text-sm rounded-xl px-2 py-1">{`${gauge.fee}%`}</div>
                    </div>
                </div>
            )}
            {gauge.deployer && (
                <div className="flex w-full justify-between">
                    <div className="md:hidden font-bold">Deployer</div>
                    <div>{CUSTOM_POOL_DEPLOYER_TITLES[gauge.deployer]}</div>
                </div>
            )}
            {gauge.tvlUSD ? (
                <div className="flex w-full justify-between">
                    <div className="md:hidden font-bold">Gauge</div>
                    <div>{`$${gauge.tvlUSD.toFixed(2)}`}</div>
                </div>
            ) : (
                <div>$0</div>
            )}
            {gauge.volume24USD ? (
                <div className="flex w-full justify-between">
                    <div className="md:hidden font-bold">Gauge</div>
                    <div>{`$${gauge.volume24USD.toFixed(2)}`}</div>
                </div>
            ) : (
                <div>$0</div>
            )}
            {gauge.apr ? (
                <div className="flex w-full justify-between">
                    <div className="md:hidden font-bold">Gauge</div>
                    <div>{gauge.apr}</div>
                </div>
            ) : (
                <div>0</div>
            )}

            <div className="text-right">
                <Link to={`/gauges/${gauge.id}`} className="px-4 py-2 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400">
                    Manage →
                </Link>
            </div>
        </div>
    );
};

const GaugesList = () => {
    const { data: gauges, isLoading } = useAllGauges();

    return (
        <div className="w-full text-left">
            {isLoading ? (
                "Loading..."
            ) : (
                <div>
                    <GaugeHeader />
                    <div className="grid grid-cols-1 gap-4">
                        {gauges.map((gauge) => (
                            <GaugeRow key={gauge.id} {...gauge} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GaugesList;
