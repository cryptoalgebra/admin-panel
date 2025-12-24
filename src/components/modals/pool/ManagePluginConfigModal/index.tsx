import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
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
                            <p className="text-xs text-text/50 mb-1">Plugin Config (uint8)</p>
                            <p className="text-sm">{pluginConfig}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={onReset}>
                            reset
                        </Button>
                    </div>
                    <hr className="border-border" />
                    {Object.entries(flags).map(([flag, value]) => (
                        <label className="flex justify-between items-center" key={flag}>
                            <span className="text-sm">
                                {flag} = {value}
                            </span>
                            <Switch onCheckedChange={() => onChange(flag as keyof PluginFlags)} checked={Boolean(value)} />
                        </label>
                    ))}
                    <Button disabled={isLoading} onClick={onConfirm} className="w-full">
                        {isLoading ? <Loader /> : "Confirm"}
                    </Button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ManagePluginConfigModal;
