import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/common/cn";

const buttonVariants = cva(
    "inline-flex cursor-pointer items-center gap-2 justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground hover:opacity-90",
                outline: "border border-border text-text bg-card hover:bg-bg-200",
                secondary: "bg-bg-200 text-text hover:bg-bg-300 border border-border",
                ghost: "hover:bg-bg-200 text-text",
                destructive: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
                success: "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3 py-2",
                lg: "h-12 px-6 py-3 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp type="button" className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
