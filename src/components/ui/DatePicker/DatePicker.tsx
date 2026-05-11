"use client";

import * as React from "react";
import { Calendar } from "lucide-react";
import { cn } from "../utils";

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ date, onDateChange, placeholder = "เลือกวันที่", className, disabled }, ref) => {
    const value = date ? date.toISOString().split("T")[0] : "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      onDateChange?.(val ? new Date(val + "T00:00:00") : undefined);
    };

    return (
      <div className={cn("relative", className)}>
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
        <input
          ref={ref}
          type="date"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          data-slot="date-picker"
          className={cn(
            "flex h-9 w-full rounded-md border border-slate-200 bg-[#f3f3f5] pl-10 pr-3 py-1 text-sm text-slate-900 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !value && "text-slate-400",
          )}
        />
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
