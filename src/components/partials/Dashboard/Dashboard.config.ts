export const DASHBOARD_CONFIG = {
  title: "แดชบอร์ด",
  description: "ภาพรวมระบบ Single Sign - On Management",
  chartHeight: 300,
  recentUserCount: 5,
  expiryThresholdDate: "2026-12-31",
} as const;

export const LOGIN_CHART_DATA = [
  { date: "24 มี.ค.", logins: 3245, failed: 18 },
  { date: "25 มี.ค.", logins: 3456, failed: 22 },
  { date: "26 มี.ค.", logins: 3123, failed: 15 },
  { date: "27 มี.ค.", logins: 3678, failed: 28 },
  { date: "28 มี.ค.", logins: 3890, failed: 19 },
  { date: "29 มี.ค.", logins: 3567, failed: 25 },
  { date: "30 มี.ค.", logins: 3847, failed: 23 },
];

export const CLIENT_STATUS_DATA = [
  { name: "Active", value: 85, color: "#10b981" },
  { name: "Inactive", value: 9, color: "#94a3b8" },
  { name: "Expired", value: 6, color: "#ef4444" },
];

export const ORG_ACTIVITY_DATA = [
  { org: "กระทรวงมหาดไทย", users: 2847, clients: 12 },
  { org: "กระทรวงสาธารณสุข", users: 5621, clients: 15 },
  { org: "กระทรวงศึกษาธิการ", users: 8956, clients: 18 },
  { org: "กระทรวงการคลัง", users: 1523, clients: 8 },
  { org: "กระทรวง MDES", users: 987, clients: 20 },
];
