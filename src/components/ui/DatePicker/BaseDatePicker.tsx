"use client";
import { DatePicker, DatePickerProps } from "antd";

export default function BaseDatePicker({
  placeholder = "เลือกวันที่",
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
      className={`h-9! text-sm! w-full! ${className}`.trim()}
      onClick={onClick}
      onChange={onChange}
      readOnly={readOnly}
      disabled={disabled}
      {...props}
    />
  );
}
