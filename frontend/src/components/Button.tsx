import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-bold tracking-tight transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-teal disabled:pointer-events-none disabled:opacity-50 btn-sweep active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-brand-teal text-bg-primary shadow-[0_0_15px_rgba(0,229,160,0.3)] hover:bg-brand-teal-dim hover:shadow-[0_0_20px_rgba(0,229,160,0.5)]",
        destructive: "bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline:
          "border border-text-muted/30 bg-bg-secondary/50 backdrop-blur-md text-text-primary hover:border-brand-teal hover:text-brand-teal hover:bg-brand-teal/5",
        secondary:
          "bg-brand-gold text-bg-primary shadow-[0_0_15px_rgba(245,166,35,0.3)] hover:bg-brand-gold-dim hover:shadow-[0_0_20px_rgba(245,166,35,0.5)]",
        ghost: "hover:bg-brand-teal/5 hover:text-brand-teal",
        link: "text-brand-teal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
