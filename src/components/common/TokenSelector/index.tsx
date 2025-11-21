import { TokenFieldsFragment } from "@/graphql/generated/graphql";
import { useAlgebraToken } from "@/hooks/common/useAlgebraToken";
import { useCurrency } from "@/hooks/common/useCurrency";
import useDebounce from "@/hooks/common/useDebounce";
import { useFuse } from "@/hooks/common/useFuse";
import { useAllTokens } from "@/hooks/tokens/useAllTokens";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FixedSizeList } from "react-window";
import { Address, isAddress } from "viem";
import { useAccount, useBalance } from "wagmi";
import CurrencyLogo from "../CurrencyLogo";
import { ADDRESS_ZERO, Currency, ExtendedNative, Token } from "@cryptoalgebra/integral-sdk";
import { formatCurrency } from "@/utils/common/formatCurrency";
import { useTokensState } from "@/state/tokensStore";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const TokenSelectorView = {
    DEFAULT_LIST: "DEFAULT_LIST",
    IMPORT_TOKEN: "IMPORT_TOKEN",
    NOT_FOUND: "NOT_FOUND",
};

type TokenSelectorViewType = (typeof TokenSelectorView)[keyof typeof TokenSelectorView];

const Search = ({
    data,
    onSearch,
}: {
    data: TokenFieldsFragment[];
    onSearch: (matchedTokens: TokenFieldsFragment[], importToken: Token | undefined) => void;
}) => {
    const [query, setQuery] = useState<Address | string | undefined>(undefined);
    const debouncedQuery = useDebounce(query, 200);
    const tokenEntity = useAlgebraToken(debouncedQuery && isAddress(debouncedQuery) ? debouncedQuery : undefined);

    const fuseOptions = useMemo(
        () => ({
            keys: ["id", "symbol", "name"],
            threshold: 0,
        }),
        []
    );

    const { result, pattern, search } = useFuse<TokenFieldsFragment>({
        data,
        options: fuseOptions,
    });

    const handleInput = (input: string | undefined) => {
        setQuery(input);
    };

    useEffect(() => {
        search(query);
    }, [query, search]);

    useEffect(() => {
        onSearch(result, tokenEntity instanceof ExtendedNative ? undefined : tokenEntity);
    }, [result, tokenEntity, pattern, onSearch]);

    return (
        <input
            type="text"
            placeholder="Search name or paste address"
            autoComplete="off"
            className="w-full text-sm px-4 py-3 bg-white border border-neutral-200 rounded-lg outline-none focus:border-neutral-400 transition-colors"
            onChange={(e) => handleInput(e.target.value)}
        />
    );
};

const LoadingRow = () => <div className="w-full mb-4 h-[60px] text-left bg-neutral-100 rounded-lg animate-pulse"></div>;

const TokenRow = ({
    account,
    token,
    onSelect,
    otherCurrency,
    style,
}: {
    token: TokenFieldsFragment;
    account: Address | undefined;
    onSelect: (currency: Currency) => void;
    otherCurrency: Currency | null | undefined;
    style: React.CSSProperties;
}) => {
    const currency = useCurrency(token.id as Address);

    const { data: balance, isLoading } = useBalance({
        address: account,
        token: token.id === ADDRESS_ZERO ? undefined : (token.id as Address),
    });

    const lock = otherCurrency?.isNative
        ? token.id === ADDRESS_ZERO
        : token.id.toLowerCase() === otherCurrency?.wrapped.address.toLowerCase();

    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        navigator.clipboard.writeText(token.id).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
        });
    };

    return (
        <button
            disabled={lock}
            className="flex items-center justify-between w-full py-3 px-4 text-left bg-white border border-neutral-200 rounded-lg transition-colors hover:bg-neutral-50 disabled:hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => currency && onSelect(currency)}
            style={{ ...style, height: 76 - 16 }}
        >
            <div className="flex items-center gap-3">
                <div>
                    <CurrencyLogo currency={currency} size={32} />
                </div>
                <div>
                    <div className="flex gap-2 items-center text-sm font-medium">
                        <div>{token.symbol}</div>
                        <button
                            className={cn(
                                'relative transition-colors hover:text-neutral-600 after:absolute after:text-xs after:left-5 after:top-0 after:content-["Copied"] after:duration-100',
                                isCopied ? "after:block" : "after:hidden"
                            )}
                            onClick={handleCopy}
                        >
                            <Copy size={12} />
                        </button>
                    </div>
                    <div className="text-xs text-neutral-500">{token.name}</div>
                </div>
            </div>
            <div className="text-sm">{isLoading ? "Loading..." : balance ? formatCurrency.format(Number(balance.formatted)) : ""}</div>
        </button>
    );
};

const ImportTokenRow = ({ token, onImport }: { token: Token; onImport: (token: Token) => void }) => (
    <div className="flex justify-between items-center w-full text-left p-4 bg-white border border-neutral-200 rounded-lg">
        <div className="flex items-center gap-3">
            <div>
                <CurrencyLogo currency={token} size={32} />
            </div>
            <div>
                <div className="text-sm font-medium">{token.symbol}</div>
                <div className="text-xs text-neutral-500">{token.name}</div>
            </div>
        </div>
        <button
            className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors"
            onClick={() => onImport(token)}
        >
            Import
        </button>
    </div>
);

export const TokenSelector = ({
    onSelect,
    otherCurrency,
}: {
    onSelect: (currency: Currency) => void;
    otherCurrency: Currency | null | undefined;
}) => {
    const { address: account } = useAccount();

    const [selectorView, setSelectorView] = useState<TokenSelectorViewType>(TokenSelectorView.DEFAULT_LIST);

    const {
        actions: { importToken },
    } = useTokensState();

    const { tokens, isLoading } = useAllTokens();

    const [matchedTokens, setMatchedTokens] = useState<TokenFieldsFragment[]>([]);
    const [tokenForImport, setTokenForImport] = useState<Token>();

    const filteredTokens = useMemo(() => (matchedTokens.length ? matchedTokens : tokens), [tokens, matchedTokens]);

    const handleSearch = (matchedTokens: TokenFieldsFragment[], importToken: Token | undefined) => {
        if (matchedTokens.length) {
            setMatchedTokens(matchedTokens);
            setSelectorView(TokenSelectorView.DEFAULT_LIST);
        } else if (importToken) {
            setTokenForImport(importToken);
            setSelectorView(TokenSelectorView.IMPORT_TOKEN);
        } else if (!isLoading) {
            setSelectorView(TokenSelectorView.NOT_FOUND);
        }
    };

    const handleImport = (token: Token) => {
        importToken(token.address as Address, token.symbol || "Unknown", token.name || "Unknown", token.decimals, token.chainId);
        setSelectorView(TokenSelectorView.DEFAULT_LIST);
        setTokenForImport(undefined);
    };

    const Row = useCallback(
        ({ data, index, style }: { data: TokenFieldsFragment[]; index: number; style: React.CSSProperties }) => {
            const token = data[index];

            if (!token) return null;

            return <TokenRow account={account} onSelect={onSelect} token={token} otherCurrency={otherCurrency} style={style} />;
        },
        [account, onSelect, otherCurrency]
    );

    const itemKey = useCallback((index: number, data: TokenFieldsFragment[]) => {
        const currency = data[index];
        return currency.name;
    }, []);

    return (
        <div className="flex flex-col gap-6 pt-2">
            <Search data={tokens} onSearch={handleSearch} />
            {selectorView === TokenSelectorView.DEFAULT_LIST ? (
                isLoading ? (
                    <FixedSizeList height={304} itemData={[]} itemCount={4} itemSize={76} width={"100%"}>
                        {LoadingRow}
                    </FixedSizeList>
                ) : (
                    <FixedSizeList
                        width={"100%"}
                        height={304}
                        itemData={filteredTokens}
                        itemCount={filteredTokens.length}
                        itemKey={itemKey}
                        itemSize={76}
                    >
                        {Row}
                    </FixedSizeList>
                )
            ) : selectorView === TokenSelectorView.IMPORT_TOKEN && tokenForImport ? (
                <ImportTokenRow token={tokenForImport} onImport={handleImport} />
            ) : (
                <div className="flex items-center justify-center h-[304px] text-sm text-neutral-500">Token not found</div>
            )}
        </div>
    );
};
