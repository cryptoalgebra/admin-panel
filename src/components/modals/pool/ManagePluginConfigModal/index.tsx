import Loader from '@/components/common/Loader';
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from '@/components/ui/credenza';
import { Switch } from '@/components/ui/switch';
import { PluginFlags } from '@/types/pool-plugin-flags';

interface IManagePluginConfigModal {
    title: string;
    children: React.ReactNode;
    flags: PluginFlags;
    onChange: (flag: keyof PluginFlags) => void;
    pluginConfig: number;
    isLoading: boolean;
    onConfirm: () => void;
}

const ManagePluginConfigModal = ({
    title,
    children,
    flags,
    onChange,
    pluginConfig,
    isLoading,
    onConfirm,
}: IManagePluginConfigModal) => {
    return (
        <Credenza>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white !rounded-3xl">
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className={'flex flex-col gap-4'}>
                    <div>
                        <p className="font-semibold text-sm">
                            Plugin Config (uint8)
                        </p>
                        <p>{pluginConfig}</p>
                    </div>
                    <hr />
                    {Object.entries(flags).map(([flag, value]) => (
                        <label className="flex justify-between" key={flag}>
                            {flag} = {value}
                            <Switch
                                onCheckedChange={() =>
                                    onChange(flag as keyof PluginFlags)
                                }
                                checked={Boolean(value)}
                            />
                        </label>
                    ))}
                    <button
                        disabled={isLoading}
                        onClick={onConfirm}
                        className="flex items-center justify-center py-2 px-4 w-full mt-auto bg-blue-500 text-white font-bold rounded-xl disabled:bg-blue-400 hover:bg-blue-400"
                    >
                        {isLoading ? <Loader /> : 'Confirm'}
                    </button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ManagePluginConfigModal;
