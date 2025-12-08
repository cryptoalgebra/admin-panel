import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useAppKitNetwork } from "@reown/appkit/react";
import { ExternalLinkIcon } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Address } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";

export const ViewTxOnExplorer = ({ hash }: { hash: Address | undefined }) => {
    const { caipNetwork: chain } = useAppKitNetwork();

    return hash ? (
        <ToastAction altText="View on explorer" asChild>
            <Link
                to={`${chain?.blockExplorers?.default.url}/tx/${hash}`}
                target={"_blank"}
                className="border-none gap-2 hover:bg-transparent hover:text-blue-400"
            >
                View on explorer
                <ExternalLinkIcon size={16} />
            </Link>
        </ToastAction>
    ) : (
        <></>
    );
};

export function useTransactionAwait(
    hash: Address | undefined,
    title: string,
    description?: string,
    redirectPath?: string
) {
    const { toast } = useToast();

    const navigate = useNavigate();

    const { data, isError, isLoading, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isLoading && hash) {
            toast({
                title: title,
                description: description || "Transaction was sent",
                action: <ViewTxOnExplorer hash={hash} />,
            });
        }
    }, [isLoading, hash]);

    useEffect(() => {
        if (isError && hash) {
            toast({
                title: title,
                description: description || "Transaction failed",
                action: <ViewTxOnExplorer hash={hash} />,
            });
        }
    }, [isError, hash]);

    useEffect(() => {
        if (isSuccess && hash) {
            toast({
                title: title,
                description: description || "Transaction confirmed",
                action: <ViewTxOnExplorer hash={hash} />,
            });
            if (redirectPath) {
                navigate(redirectPath);
            }
        }
    }, [isSuccess, hash]);

    return {
        data,
        isError,
        isLoading,
        isSuccess,
    };
}
