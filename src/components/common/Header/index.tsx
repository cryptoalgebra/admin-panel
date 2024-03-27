import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { Link, NavLink, matchPath, useLocation } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const Connect = () => {
    const { connector, isConnected } = useAccount();
    const { connect, connectors, isLoading, pendingConnector } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <div>
            <div>
                {isConnected ? (
                    <button
                        className="w-fit h-10 px-3 py-2 bg-blue-500 rounded-xl border-none text-white"
                        onClick={() => disconnect()}
                    >
                        Disconnect
                    </button>
                ) : (
                    <Select
                        onValueChange={(v) =>
                            connect({
                                connector: connectors.find(
                                    (connector) => connector.name === v
                                ),
                            })
                        }
                    >
                        <SelectTrigger className="w-fit bg-blue-500 rounded-xl border-none text-lg text-white">
                            Connect
                        </SelectTrigger>
                        <SelectContent>
                            {connectors
                                .filter(
                                    (x) => x.ready && x.id !== connector?.id
                                )
                                .map((x) => (
                                    <SelectItem
                                        key={`connector-${x.name}`}
                                        value={x.name}
                                    >
                                        {x.name}
                                        {isLoading &&
                                            x.id === pendingConnector?.id &&
                                            ' (connecting)'}
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
    FARMS: '/farms',
    POOLS: '/pools',
};

const menuItems = [
    {
        title: 'Farms',
        link: '/farms',
        active: [PATHS.FARMS],
    },
    {
        title: 'Pools',
        link: '/pools',
        active: [PATHS.POOLS],
    },
];

const Header = () => {
    const { pathname } = useLocation();

    const setNavlinkClasses = (paths: string[]) =>
        paths.some((path) => matchPath(path, pathname))
            ? 'text-primary-text bg-blue-400'
            : 'hover:bg-blue-100';

    return (
        <header className="sticky top-4 z-10 flex justify-between items-center py-3 px-8 bg-card border border-card-border rounded-3xl gap-4">
            <Link to={'/'} className="font-bold">
                Integral Admin Panel
            </Link>
            <nav>
                <ul className="flex justify-center gap-1 rounded-full whitespace-nowrap">
                    {menuItems.map((item) => (
                        <NavLink
                            key={`nav-item-${item.link}`}
                            to={item.link}
                            className={`${setNavlinkClasses(
                                item.active
                            )} py-2 px-4 rounded-3xl font-semibold select-none duration-200`}
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
