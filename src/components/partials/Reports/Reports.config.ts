import { Users, AppWindow, Building2, TrendingUp } from "lucide-react";
import { mockOrganizations, mockUsers, mockClients } from "@/data/mockData";

export const REPORTS_CONFIG = {
  title: "รายงาน",
  description: "สถิติและข้อมูลการใช้งานระบบ",
} as const;

export const USER_GROWTH_DATA = [
  { month: "ม.ค.", users: 120 },
  { month: "ก.พ.", users: 180 },
  { month: "มี.ค.", users: 250 },
  { month: "เม.ย.", users: 310 },
  { month: "พ.ค.", users: mockUsers.length * 10 },
];

export const LOGIN_TREND_DATA = [
  { month: "ม.ค.", logins: 4200 },
  { month: "ก.พ.", logins: 5100 },
  { month: "มี.ค.", logins: 4800 },
  { month: "เม.ย.", logins: 6300 },
  { month: "พ.ค.", logins: 5900 },
];

export const TOP_CLIENTS_DATA = mockClients.map((c, i) => ({ name: c.clientName, value: [450, 320, 280, 190][i] ?? 100 }));
export const PIE_COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"] as const;

export const ORG_USAGE_DATA = mockOrganizations.slice(0, 5).map((o) => ({
  org: o.code,
  users: o.userCount,
  logins: o.userCount * 3,
}));

export const REPORT_STAT_CARDS = [
  { label: "ผู้ใช้ทั้งหมด", getValue: () => mockUsers.length, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "การเข้าสู่ระบบ/เดือน", getValue: () => "5,900", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  { label: "ระบบงาน", getValue: () => mockClients.length, icon: AppWindow, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "หน่วยงาน", getValue: () => mockOrganizations.length, icon: Building2, color: "text-red-600", bg: "bg-red-50" },
];
