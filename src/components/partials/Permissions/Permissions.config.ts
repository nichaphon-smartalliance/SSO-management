import { Shield, Clock, XCircle } from "lucide-react";

export const PERMISSIONS_CONFIG = {
  title: "สิทธิ์การเข้าถึง",
  description: "จัดการสิทธิ์การเข้าถึงระบบงานของผู้ใช้",
} as const;

export const PERMISSION_STATUS_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "active", label: "ใช้งาน" },
  { value: "expired", label: "หมดอายุ" },
  { value: "revoked", label: "ถูกเพิกถอน" },
] as const;

export const PERMISSION_STAT_CARDS = [
  { key: "active", label: "สิทธิ์ที่ใช้งาน", icon: Shield, color: "text-green-600", bg: "bg-green-50" },
  { key: "expired", label: "สิทธิ์ที่หมดอายุ", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { key: "revoked", label: "สิทธิ์ที่ถูกเพิกถอน", icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
] as const;
