import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { PluginFlags } from "@/types/pool-plugin-flags";
import { cn } from "@/utils/common/cn";
import { AlertTriangle, ArrowRight, Check, X } from "lucide-react";

export type PluginConfigModuleKey =
    | "DYNAMIC_FEE"
    | "FARMING_PROXY"
    | "VOLATILITY_ORACLE"
    | "ALM"
    | "LIMIT_ORDER"
    | "SECURITY";

type HookKey =
    | "beforeSwap"
    | "afterSwap"
    | "beforePositionModify"
    | "afterPositionModify"
    | "beforeFlash"
    | "afterFlash"
    | "afterInit"
    | "dynamicFee";

type ModuleStatus = "ENABLED" | "DISABLED" | "PARTIAL";

const HOOKS: { key: HookKey; flag: keyof PluginFlags }[] = [
    { key: "beforeSwap", flag: "BEFORE_SWAP_FLAG" },
    { key: "afterSwap", flag: "AFTER_SWAP_FLAG" },
    { key: "beforePositionModify", flag: "BEFORE_POSITION_MODIFY_FLAG" },
    { key: "afterPositionModify", flag: "AFTER_POSITION_MODIFY_FLAG" },
    { key: "beforeFlash", flag: "BEFORE_FLASH_FLAG" },
    { key: "afterFlash", flag: "AFTER_FLASH_FLAG" },
    { key: "afterInit", flag: "AFTER_INIT_FLAG" },
    { key: "dynamicFee", flag: "DYNAMIC_FEE_FLAG" },
];

const MODULE_DEFINITIONS: { key: PluginConfigModuleKey; label: string; requiredHooks: HookKey[] }[] = [
    { key: "DYNAMIC_FEE", label: "Dynamic Fee", requiredHooks: ["beforeSwap", "dynamicFee"] },
    { key: "FARMING_PROXY", label: "Farming", requiredHooks: ["afterSwap"] },
    { key: "VOLATILITY_ORACLE", label: "Volatility Oracle", requiredHooks: ["beforeSwap", "afterInit"] },
    { key: "ALM", label: "ALM", requiredHooks: ["afterSwap"] },
    { key: "LIMIT_ORDER", label: "Limit Order", requiredHooks: ["afterSwap"] },
    { key: "SECURITY", label: "Security", requiredHooks: ["beforeSwap", "beforePositionModify", "beforeFlash"] },
];

const SECURITY_FUNCTIONALITY: Record<HookKey, string> = {
    beforeSwap: "swap protection",
    afterSwap: "swap post-check",
    beforePositionModify: "position modify protection",
    afterPositionModify: "position modify post-check",
    beforeFlash: "flash protection",
    afterFlash: "flash post-check",
    afterInit: "initialization post-check",
    dynamicFee: "dynamic fee updates",
};

interface IManagePluginConfigModal {
    title: string;
    children: React.ReactNode;
    flags: PluginFlags;
    onChange: (flag: keyof PluginFlags) => void;
    pluginConfig: number;
    isLoading: boolean;
    onConfirm: () => void;
    onReset: () => void;
    activeModuleKeys: PluginConfigModuleKey[];
    onOpenChange?: (open: boolean) => void;
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
    activeModuleKeys,
    onOpenChange,
}: IManagePluginConfigModal) => {
    const isHookEnabled = (hookKey: HookKey): boolean => {
        const hook = HOOKS.find((item) => item.key === hookKey);
        if (!hook) return false;

        return Boolean(flags[hook.flag]);
    };

    const getModuleStatus = (
        moduleKey: PluginConfigModuleKey,
        requiredHooks: HookKey[]
    ): { status: ModuleStatus; partialDescription?: string } => {
        const enabledHooks = requiredHooks.filter((hook) => isHookEnabled(hook));
        if (moduleKey === "DYNAMIC_FEE") {
            const isBeforeSwapEnabled = isHookEnabled("beforeSwap");
            const isDynamicFeeEnabled = isHookEnabled("dynamicFee");

            if (isBeforeSwapEnabled && isDynamicFeeEnabled) {
                return { status: "ENABLED" };
            }

            if (isBeforeSwapEnabled && !isDynamicFeeEnabled) {
                return { status: "DISABLED" };
            }

            if (!isBeforeSwapEnabled && isDynamicFeeEnabled) {
                return { status: "PARTIAL" };
            }

            return { status: "DISABLED" };
        }
        if (moduleKey === "VOLATILITY_ORACLE") {
            const isBeforeSwapEnabled = isHookEnabled("beforeSwap");
            const isAfterInitEnabled = isHookEnabled("afterInit");

            if (isBeforeSwapEnabled && isAfterInitEnabled) {
                return { status: "ENABLED" };
            }

            return { status: "DISABLED" };
        }

        if (moduleKey === "SECURITY") {
            if (enabledHooks.length === 0) {
                return { status: "DISABLED" };
            }

            if (enabledHooks.length === requiredHooks.length) {
                return { status: "ENABLED" };
            }

            const enabledFunctionalities = enabledHooks.map((hook) => SECURITY_FUNCTIONALITY[hook]).join(", ");
            return {
                status: "PARTIAL",
                partialDescription: `Enabled functionality: ${enabledFunctionalities}.`,
            };
        }

        if (enabledHooks.length === requiredHooks.length) {
            return { status: "ENABLED" };
        }

        if (enabledHooks.length === 0) {
            return { status: "DISABLED" };
        }

        return { status: "PARTIAL" };
    };

    const renderStatusIcon = (status: ModuleStatus) => {
        if (status === "ENABLED") {
            return <Check size={18} className="text-emerald-600" />;
        }

        if (status === "DISABLED") {
            return <X size={18} className="text-red-600" />;
        }

        return <AlertTriangle size={18} className="text-amber-600" />;
    };

    const activeModules = MODULE_DEFINITIONS.filter((module) => activeModuleKeys.includes(module.key));

    return (
        <Credenza onOpenChange={onOpenChange}>
            <CredenzaTrigger asChild>{children}</CredenzaTrigger>
            <CredenzaContent className="bg-white rounded-lg w-full max-w-4xl max-h-[85vh] overflow-y-auto lg:overflow-hidden">
                <CredenzaHeader>
                    <CredenzaTitle className="text-2xl">{title}</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className={"flex flex-col gap-3 lg:overflow-hidden"}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-text/50 mb-1">Plugin Config (uint8)</p>
                            <p className="text-sm">{pluginConfig}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={onReset}>
                            Reset
                        </Button>
                    </div>
                    <hr className="border-border" />

                    <div className="grid gap-3 items-start lg:grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)]">
                        <div className="rounded-lg border border-border bg-bg-200 p-3">
                            <h4 className="text-lg font-semibold text-text mb-3">Hooks</h4>
                            <div className="flex flex-col gap-2">
                                {HOOKS.map((hook) => {
                                    const checked = isHookEnabled(hook.key);

                                    return (
                                        <button
                                            key={hook.key}
                                            type="button"
                                            aria-pressed={checked}
                                            onClick={() => onChange(hook.flag)}
                                            className={cn(
                                                "flex items-center gap-2.5 rounded-md px-2 py-1 transition-colors text-left",
                                                checked ? "hover:bg-primary/5" : "hover:bg-black/5"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "h-6 w-6 rounded-full flex items-center justify-center border",
                                                    checked
                                                        ? "bg-primary border-primary text-white"
                                                        : "bg-neutral-200 border-neutral-200 text-neutral-400"
                                                )}
                                            >
                                                {checked && <Check size={14} />}
                                            </span>
                                            <span className="text-base leading-none text-text">{hook.key}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex items-center justify-center h-8 lg:h-full">
                            <ArrowRight size={22} className="text-text/25 rotate-90 lg:rotate-0" />
                        </div>

                        <div className="rounded-lg border border-border p-3 lg:overflow-hidden">
                            <h4 className="text-lg font-semibold text-text mb-3">Modules</h4>
                            {activeModules.length === 0 ? (
                                <p className="text-sm text-text/50">No active modules from subgraph</p>
                            ) : (
                                <div className="flex flex-col gap-3 lg:max-h-[300px] lg:overflow-y-auto lg:pr-1">
                                    {activeModules.map((module) => {
                                        const { status, partialDescription } = getModuleStatus(module.key, module.requiredHooks);

                                        return (
                                            <div key={module.key}>
                                                <div className="flex items-start gap-2">
                                                    <div className="mt-0.5">{renderStatusIcon(status)}</div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <p className="text-base font-medium text-text">{module.label}</p>
                                                            <span
                                                                className={cn(
                                                                    "px-2 py-0.5 text-xs font-medium rounded-full border",
                                                                    status === "ENABLED" &&
                                                                        "bg-emerald-50 text-emerald-700 border-emerald-200",
                                                                    status === "DISABLED" && "bg-red-50 text-red-700 border-red-200",
                                                                    status === "PARTIAL" &&
                                                                        "bg-amber-50 text-amber-700 border-amber-200"
                                                                )}
                                                            >
                                                                {status}
                                                            </span>
                                                        </div>

                                                        <div className="mt-2 flex flex-col gap-1">
                                                            {module.requiredHooks.map((hook) => {
                                                                const checked = isHookEnabled(hook);

                                                                return (
                                                                    <div
                                                                        key={hook}
                                                                        className={cn(
                                                                            "flex items-center gap-1.5 text-sm",
                                                                            checked ? "text-text" : "text-text/40"
                                                                        )}
                                                                    >
                                                                        {checked ? (
                                                                            <Check size={13} className="text-emerald-600" />
                                                                        ) : (
                                                                            <X size={13} className="text-red-500" />
                                                                        )}
                                                                        <span>{hook}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>

                                                        {status === "PARTIAL" && partialDescription && (
                                                            <p className="mt-2 text-xs text-amber-700">{partialDescription}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <Button disabled={isLoading} onClick={onConfirm} className="w-full">
                        {isLoading ? <Loader /> : "Confirm"}
                    </Button>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ManagePluginConfigModal;
