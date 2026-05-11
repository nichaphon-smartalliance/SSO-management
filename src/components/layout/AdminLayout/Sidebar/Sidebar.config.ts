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
  Boxes,
  FileCheck,
  FileText
} from "lucide-react";
import { TEXT_MENU } from "@/constant/text";

export const SIDEBAR_STYLE = {
  background: "#ffffff",
  borderColor: "#e2e8f0",
  width: "16rem",
  activeItemBg: "#eef2ff",
  activeItemColor: "#4f46e5",
  itemColor: "#334155",
  itemHoverBg: "#f8fafc",
  itemHoverColor: "#0f172a",
} as const;

export const sidebarMenuItems = [
  { key: "dashboard", label: TEXT_MENU.DASHBOARD, href: "/dashboard", icon: LayoutDashboard, roles: ["super_admin", "org_admin"] },
  { key: "organizations", label: TEXT_MENU.ORGANIZATIONS, href: "/organizations", icon: Building2, roles: ["super_admin"] },
  { key: "admins", label: TEXT_MENU.ADMINS, href: "/admins", icon: UserCog, roles: ["super_admin"] },
  { key: "users", label: TEXT_MENU.USERS, href: "/users", icon: Users, roles: ["super_admin", "org_admin"] },
  { key: "clients", label: TEXT_MENU.CLIENTS, href: "/clients", icon: Boxes, roles: ["super_admin", "org_admin"] },
  { key: "requests", label: TEXT_MENU.REQUESTS, href: "/requests", icon: FileCheck, roles: ["super_admin", "org_admin"] },
  { key: "permissions", label: TEXT_MENU.PERMISSIONS, href: "/permissions", icon: Shield, roles: ["super_admin", "org_admin"] },
  { key: "logs", label: TEXT_MENU.AUDIT_LOGS, href: "/logs", icon: FileText, roles: ["super_admin"] },
  { key: "reports", label: TEXT_MENU.REPORTS, href: "/reports", icon: BarChart3, roles: ["super_admin"] },
  { key: "settings", label: TEXT_MENU.SETTINGS, href: "/settings", icon: Settings, roles: ["super_admin"] },
];
