import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Link, NavLink, matchPath, useLocation } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import SophonLogo from "@/assets/sophon-logo.png";
import { truncateHash } from "@/utils/common/truncateHash";

const Connect = () => {
    const { connector, isConnected, address } = useAccount();
    const { connect, connectors, isLoading, pendingConnector } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <div>
            <div>
                {isConnected ? (
                    <button
                        className="w-fit h-10 px-3 py-2 text-sm bg-primary rounded-lg border-none text-white"
                        onClick={() => disconnect()}
                    >
                        {address ? truncateHash(address) : "Disconnect"}
                    </button>
                ) : (
                    <Select
                        onValueChange={(v) =>
                            connect({
                                connector: connectors.find((connector) => connector.name === v),
                            })
                        }
                    >
                        <SelectTrigger className="w-fit bg-primary rounded-lg border-none text-sm text-white">Connect</SelectTrigger>
                        <SelectContent>
                            {connectors
                                .filter((x) => x.ready && x.id !== connector?.id)
                                .map((x) => (
                                    <SelectItem key={`connector-${x.name}`} value={x.name}>
                                        {x.name}
                                        {isLoading && x.id === pendingConnector?.id && " (connecting)"}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                )}
            </div>
        </div>
    );
};

const PATHS = {
    FARMS: "/farms",
    POOLS: "/pools",
};

const menuItems = [
    {
        title: "Farms",
        link: "/farms",
        active: [PATHS.FARMS],
    },
    {
        title: "Pools",
        link: "/pools",
        active: [PATHS.POOLS],
    },
];

const Header = () => {
    const { pathname } = useLocation();

    const setNavlinkClasses = (paths: string[]) =>
        paths.some((path) => matchPath(path, pathname)) ? "text-primary" : "text-black/50 hover:text-black/70";

    return (
        <header className="sticky top-4 mt-4 z-10 flex justify-between items-center rounded-xl gap-4">
            <Link to={"/"} className="font-bold flex gap-2 items-center">
                <img src={SophonLogo} alt="Sophon Logo" className="inline-block mr-2 w-12 h-12" />
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
            <Connect />
        </header>
    );
};

export default Header;
