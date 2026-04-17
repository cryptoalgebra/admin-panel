import { Link, NavLink, matchPath, useLocation } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";
import IntegralLogo from "@/assets/algebra-logo.svg";
import { truncateHash } from "@/utils/common/truncateHash";
import { useAppKit, useAppKitNetwork } from "@reown/appkit/react";
import { Button } from "@/components/ui/button";
import { ChevronDown, WalletIcon } from "lucide-react";
import { formatAmount } from "@/utils/common/formatAmount";
import { formatUnits } from "viem";
import { enabledModules } from "config/app-modules";
import AdminAccount from "../AdminAccount";

const Account = () => {
    const { open } = useAppKit();

    const { caipNetwork: currentNetwork } = useAppKitNetwork();

    const { address: account } = useAccount();

    const { data: balance } = useBalance({
        address: account,
    });

    const formattedBalance = balance ? formatAmount(formatUnits(balance.value, balance.decimals), 4) : null;

    return (
        <div className="flex h-full justify-end max-h-[64px] gap-4 whitespace-nowrap items-center">
            <div className="flex gap-2 h-full items-center">
                <Button variant={"secondary"} size={"sm"} onClick={() => open({ view: "Networks" })}>
                    <img src={currentNetwork?.assets?.imageUrl} width={20} height={20} /> <ChevronDown size={20} />
                </Button>
                <Button onClick={() => open()} variant={account ? "secondary" : "primary"} size={"sm"}>
                    <WalletIcon size={16} className="md:hidden" />
                    {account ? (
                        <>
                            <span className="max-md:hidden">{`${formattedBalance} ${balance?.symbol}`}</span>
                            <span className="max-md:hidden">{truncateHash(account)}</span>
                        </>
                    ) : (
                        <span className="max-md:hidden">Connect Wallet</span>
                    )}
                </Button>
            </div>
        </div>
    );
};

const PATHS = {
    POOLS: "/pools",
    POOL: "/pools/:id",
    FARMS: "/farms",
    FARM: "/farms/:id",
    GAUGES: "/gauges",
    GAUGE: "/gauges/:id",
    PREDICTIONS: "/predictions",
    PREDICTION_MARKET: "/predictions/:market",
};

const menuItems = [
    {
        title: "Pools",
        link: "/pools",
        active: [PATHS.POOLS, PATHS.POOL],
    },
    enabledModules.FarmingModule && {
        title: "Farms",
        link: "/farms",
        active: [PATHS.FARMS, PATHS.FARM],
    },
    enabledModules.Ve33Module && {
        title: "Gauges",
        link: "/gauges",
        active: [PATHS.GAUGES, PATHS.GAUGE],
    },
    enabledModules.PredictionModule && {
        title: "Predictions",
        link: "/predictions",
        active: [PATHS.PREDICTIONS, PATHS.PREDICTION_MARKET],
    },
].filter(Boolean) as { title: string; link: string; active: string[] }[];

const Header = () => {
    const { pathname } = useLocation();

    const setNavlinkClasses = (paths: string[]) =>
        paths.some((path) => matchPath(path, pathname)) ? "text-primary" : "text-black/50 hover:text-black/70";

    return (
        <header className="fixed flex flex-col left-0 w-full top-0 bg-card z-10">
            <AdminAccount />
            <div className="flex gap-4 p-4 w-full max-w-[1280px] mx-auto">
                <Link to={"/"} className="font-bold flex gap-2 items-center">
                    <img src={IntegralLogo} alt="Integral Logo" className="inline-block mr-2 w-8 h-8" />
                    <span className="max-md:hidden">Admin Panel</span>
                </Link>
                <nav className="mr-auto">
                    <ul className="flex justify-center gap-1 rounded-full font-semibold whitespace-nowrap">
                        {menuItems.map((item) => (
                            <NavLink
                                key={`nav-item-${item.link}`}
                                to={item.link}
                                className={`${setNavlinkClasses(item.active)} py-2 px-4 rounded-lg  select-none duration-200`}
                            >
                                {item.title}
                            </NavLink>
                        ))}
                    </ul>
                </nav>
                <Account />
            </div>
        </header>
    );
};

export default Header;
