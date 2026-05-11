"use client";
import { DatePicker, DatePickerProps } from "antd";

export default function BaseDatePicker({
  placeholder = "Select date",
  onClick,
  onChange,
  disabled = false,
  readOnly = false,
  variant = "outlined",
  size = "middle",
  className = "",
  ...props
}: DatePickerProps) {
  return (
    <DatePicker
      placeholder={placeholder}
      variant={variant}
      size={size}
      className={`h-10! text-sm! ${className}`.trim()}
      onClick={onClick}
      onChange={onChange}
      readOnly={readOnly}
      disabled={disabled}
      {...props}
    />
  );
}
