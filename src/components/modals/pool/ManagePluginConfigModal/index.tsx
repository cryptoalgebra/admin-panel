import Loader from "@/components/common/Loader";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Switch } from "@/components/ui/switch";
import { PluginFlags } from "@/types/pool-plugin-flags";

interface IManagePluginConfigModal {
    title: string;
    children: React.ReactNode;
    flags: PluginFlags;
    onChange: (flag: keyof PluginFlags) => void;
    pluginConfig: number;
    isLoading: boolean;
    onConfirm: () => void;
    onReset: () => void;
}

const ManagePluginConfigModal = ({
    title,
    children,
    flags,
    onChange,
    pluginConfig,
    isLoading,
    onConfirm,
    onReset,
}: IManagePluginConfigModal) => {
    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white rounded-lg">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className={"flex flex-col gap-4"}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-neutral-500 mb-1">Plugin Config (uint8)</p>
                            <p className="text-sm">{pluginConfig}</p>
                        </div>
                        <button
                            onClick={onReset}
                            className="flex items-center h-fit justify-center border border-neutral-200 py-1 px-3 text-xs rounded-lg hover:bg-neutral-100 transition-colors"
                        >
                            reset
                        </button>
                    </div>
                    <hr className="border-neutral-200" />
                    {Object.entries(flags).map(([flag, value]) => (
                        <label className="flex justify-between items-center" key={flag}>
                            <span className="text-sm">
                                {flag} = {value}
                            </span>
                            <Switch onCheckedChange={() => onChange(flag as keyof PluginFlags)} checked={Boolean(value)} />
                        </label>
                    ))}
                    <button
                        disabled={isLoading}
                        onClick={onConfirm}
                        className="flex items-center justify-center py-2 px-4 w-full mt-auto bg-black text-white text-sm rounded-lg disabled:bg-neutral-400 hover:bg-neutral-800 transition-colors"
                    >
                        {isLoading ? <Loader /> : "Confirm"}
                    </button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ManagePluginConfigModal;
