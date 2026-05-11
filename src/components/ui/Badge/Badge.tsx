import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap transition-colors [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        success: "border-transparent bg-success text-success-foreground [a&]:hover:bg-success/90",
        warning: "border-transparent bg-amber-100 text-amber-700",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        secondary: "border-transparent bg-slate-100 text-slate-600",
        // secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        // outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        outline: "border-slate-300 text-slate-600 bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
