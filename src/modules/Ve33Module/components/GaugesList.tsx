import { useAllGauges, FormattedGauge } from "../hooks/useAllGauges";
import { formatAmount } from "@/utils/common/formatAmount";
import { customPoolDeployerTitleByAddress } from "config/custom-pool-deployer";
import { Link } from "react-router-dom";
import { Address } from "viem";

const GaugeHeader = () => (
    <div className="hidden md:grid grid-cols-6 text-xs font-medium text-text/50 uppercase tracking-wider px-4 py-3 bg-bg-200 border-b border-border">
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
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-0 w-full text-left px-4 py-4 bg-card border-b border-border hover:bg-bg-200 transition-colors items-center">
            {gauge.pair.token0 && gauge.pair.token1 && (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Gauge</div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-text">{`${gauge.pair.token0.symbol} / ${gauge.pair.token1.symbol}`}</span>
                        <span className="bg-bg-200 text-xs text-text/70 rounded px-2 py-0.5 border border-border">{`${gauge.fee}%`}</span>
                    </div>
                </div>
            )}
            {gauge.deployer && (
                <div className="flex w-full justify-between">
                    <div className="md:hidden text-xs text-text/50 font-medium">Deployer</div>
                    <div className="text-sm text-text">{customPoolDeployerTitleByAddress[gauge.deployer as Address]}</div>
                </div>
            )}
            {gauge.tvlUSD ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">TVL</div>
                    <div className="text-sm text-text">{`$${formatAmount(gauge.tvlUSD)}`}</div>
                </div>
            ) : (
                <div className="text-sm text-text">$0</div>
            )}
            {gauge.volume24USD ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">Volume 24H</div>
                    <div className="text-sm text-text">{`$${formatAmount(gauge.volume24USD)}`}</div>
                </div>
            ) : (
                <div className="text-sm text-text">$0</div>
            )}
            {gauge.apr ? (
                <div className="flex w-full justify-between md:justify-start">
                    <div className="md:hidden text-xs text-text/50 font-medium">APR</div>
                    <div className="text-sm text-text">{gauge.apr}</div>
                </div>
            ) : (
                <div className="text-sm text-text">0</div>
            )}

            <div className="text-right">
                <Link
                    to={`/gauges/${gauge.id}`}
                    className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                    Manage →
                </Link>
            </div>
        </div>
    );
};

const GaugesList = () => {
    const { data: gauges, isLoading } = useAllGauges();

    return (
        <div className="w-full text-left bg-card border border-border rounded-lg overflow-hidden">
            {isLoading ? (
                <div className="flex items-center justify-center p-8">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-5 h-5 border-2 border-border border-t-text rounded-full animate-spin" />
                        <span className="text-sm text-text/50">Loading gauges...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <GaugeHeader />
                    <div>
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
