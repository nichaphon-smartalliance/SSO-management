export const CLIENTS_CONFIG = {
  title: "จัดการระบบงาน (Client)",
  description: "จัดการ OAuth 2.0 Clients ทั้งหมด",
} as const;

export const CLIENT_STATUS_OPTIONS = [
  { value: "all", label: "สถานะทั้งหมด" },
  { value: "active", label: "ใช้งาน" },
  { value: "inactive", label: "ไม่ใช้งาน" },
  { value: "expired", label: "หมดอายุ" },
] as const;
