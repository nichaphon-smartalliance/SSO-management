import * as React from "react";
import { cn } from "../utils";

type BadgeVariant = "default" | "success" | "warning" | "destructive" | "secondary" | "outline";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-indigo-100 text-indigo-700",
  success: "bg-green-100 text-green-700 border border-green-300",
  warning: "bg-amber-100 text-amber-700",
  destructive: "bg-red-100 text-red-700",
  secondary: "bg-slate-100 text-slate-600",
  outline: "border border-slate-300 text-slate-600 bg-transparent",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
