import { Shield } from "lucide-react";

export const HEADER_STYLE = {
  background: "#ffffff",
  borderColor: "#e2e8f0",
  height: "4rem",
  logoIconBg: "#4f46e5",
  logoIconColor: "#ffffff",
  titleColor: "#0f172a",
  subtitleColor: "#64748b",
  bellActiveColor: "#ef4444",
  superAdminBadgeBg: "#4f46e5",
  superAdminBadgeColor: "#ffffff",
  orgAdminBadgeBg: "#f1f5f9",
  orgAdminBadgeColor: "#334155",
} as const;

export const HEADER_LOGO_CONFIG = {
  showLogo: true,
  title: "ระบบการลงชื่อเข้าใช้ระบบสารสนเทศแบบครั้งเดียว สำหรับเจ้าหน้าที่",
  subtitle: "Single Sign - On Management",
  logoIcon: Shield,
} as const;

export const HEADER_ROLE_LABEL: Record<string, string> = {
  super_admin: "Super Admin",
  org_admin: "Admin หน่วยงาน",
};
