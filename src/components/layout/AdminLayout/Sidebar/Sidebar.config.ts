import {
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  AppWindow,
  ClipboardList,
  Shield,
  ScrollText,
  BarChart3,
  Settings,
} from "lucide-react";

export const sidebarMenuItems = [
  { key: "dashboard", label: "แดชบอร์ด", href: "/dashboard", icon: LayoutDashboard, roles: ["super_admin", "org_admin"] },
  { key: "organizations", label: "จัดการหน่วยงาน", href: "/organizations", icon: Building2, roles: ["super_admin"] },
  { key: "admins", label: "จัดการผู้ดูแลระบบ", href: "/admins", icon: UserCog, roles: ["super_admin"] },
  { key: "users", label: "จัดการผู้ใช้งาน", href: "/users", icon: Users, roles: ["super_admin", "org_admin"] },
  { key: "clients", label: "จัดการระบบงาน", href: "/clients", icon: AppWindow, roles: ["super_admin", "org_admin"] },
  { key: "requests", label: "คำขอใช้งาน", href: "/requests", icon: ClipboardList, roles: ["super_admin", "org_admin"] },
  { key: "permissions", label: "สิทธิ์การเข้าถึง", href: "/permissions", icon: Shield, roles: ["super_admin", "org_admin"] },
  { key: "logs", label: "Audit Logs", href: "/logs", icon: ScrollText, roles: ["super_admin"] },
  { key: "reports", label: "รายงาน", href: "/reports", icon: BarChart3, roles: ["super_admin"] },
  { key: "settings", label: "การตั้งค่าระบบ", href: "/settings", icon: Settings, roles: ["super_admin"] },
];
