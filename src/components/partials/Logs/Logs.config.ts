import { Info, AlertTriangle, AlertCircle, Flame } from "lucide-react";

export const LOGS_CONFIG = {
  title: "Logs / Audit Trail",
  description: "บันทึกกิจกรรมและการตรวจสอบระบบ",
} as const;

export const LOG_STATUS_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "success", label: "สำเร็จ" },
  { value: "failure", label: "ล้มเหลว" },
] as const;
export const SEVERITY_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
  { value: "critical", label: "Critical" },
] as const;

export const SEVERITY_CONFIG = {
  info: { label: "Info", variant: "default" as const, icon: Info, color: "text-indigo-600", bg: "bg-indigo-50" },
  warning: { label: "Warning", variant: "warning" as const, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  error: { label: "Error", variant: "destructive" as const, icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
  critical: { label: "Critical", variant: "destructive" as const, icon: Flame, color: "text-red-800", bg: "bg-red-100" },
};
