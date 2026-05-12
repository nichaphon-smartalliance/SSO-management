import { TrendingUp } from "lucide-react";

export const REPORTS_CONFIG = {
  title: "รายงาน",
  description: "รายงานสถิติและการใช้งานระบบ",
} as const;

// ─── Filter Options ──────────────────────────────────────────────────────────

export const REPORT_TYPE_OPTIONS = [
  { value: "overview",      label: "ภาพรวมระบบ" },
  { value: "users",         label: "รายงานผู้ใช้งาน" },
  { value: "clients",       label: "รายงานระบบงาน" },
  { value: "organizations", label: "รายงานหน่วยงาน" },
  { value: "security",      label: "รายงานความปลอดภัย" },
] as const;

// ─── Stat Cards ──────────────────────────────────────────────────────────────

export const REPORT_STAT_CARDS = [
  {
    label: "ผู้ใช้งานทั้งหมด",
    value: "18,956",
    trend: "+12.5%",
    trendUp: true,
  },
  {
    label: "การเข้าสู่ระบบ (30 วัน)",
    value: "24,156",
    trend: "+8.2%",
    trendUp: true,
  },
  {
    label: "ระบบงานที่ใช้งาน",
    value: "85",
    trend: "+5.4%",
    trendUp: true,
  },
  {
    label: "หน่วยงานที่ใช้งาน",
    value: "7",
    trend: "ไม่เปลี่ยนแปลง",
    trendUp: null,
  },
] as const;

// ─── Chart Data ──────────────────────────────────────────────────────────────

export const USER_GROWTH_DATA = [
  { month: "ม.ค. 2026", users: 15234 },
  { month: "ก.พ. 2026", users: 16123 },
  { month: "มี.ค. 2026", users: 18956 },
];

export const LOGIN_TREND_DATA = [
  { date: "1 มี.ค.",  logins: 3245 },
  { date: "5 มี.ค.",  logins: 3456 },
  { date: "10 มี.ค.", logins: 3123 },
  { date: "15 มี.ค.", logins: 3678 },
  { date: "20 มี.ค.", logins: 3890 },
  { date: "25 มี.ค.", logins: 3567 },
  { date: "30 มี.ค.", logins: 3847 },
];

export const TOP_CLIENTS_DATA = [
  { name: "ระบบบริหารทรัพยากรบุคคล",   value: 5234, color: "#4f46e5" },
  { name: "ระบบสารบรรณอิเล็กทรอนิกส์", value: 4123, color: "#10b981" },
  { name: "ระบบงบประมาณ",               value: 3456, color: "#f59e0b" },
  { name: "ระบบโรงพยาบาล",              value: 2987, color: "#ef4444" },
  { name: "อื่นๆ",                       value: 3156, color: "#94a3b8" },
];

export const ORG_USAGE_DATA = [
  { org: "กระทรวงมหาดไทย",     active: 2791, inactive: 56  },
  { org: "กระทรวงสาธารณสุข",   active: 5521, inactive: 100 },
  { org: "กระทรวงศึกษาธิการ",   active: 8756, inactive: 200 },
  { org: "กระทรวงการคลัง",      active: 1489, inactive: 34  },
  { org: "กระทรวง MDES",        active: 945,  inactive: 42  },
];

// ─── Summary Table ────────────────────────────────────────────────────────────

export const SUMMARY_TABLE_ROWS = [
  { org: "กระทรวงมหาดไทย",   users: "2,847",  systems: 12, logins: "8,234"  },
  { org: "กระทรวงสาธารณสุข", users: "5,621",  systems: 15, logins: "12,456" },
  { org: "กระทรวงศึกษาธิการ", users: "8,956", systems: 18, logins: "18,967" },
  { org: "กระทรวงการคลัง",   users: "1,523",  systems: 8,  logins: "4,123"  },
  { org: "กระทรวง MDES",      users: "987",   systems: 20, logins: "2,789"  },
] as const;

export const SUMMARY_TABLE_TOTAL = {
  users: "19,934",
  systems: 73,
  logins: "46,569",
} as const;
