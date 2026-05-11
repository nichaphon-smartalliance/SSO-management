export const CLIENTS_CONFIG = {
  title: "จัดการระบบงาน (Client)",
  description: "จัดการ OAuth 2.0 Clients และการเชื่อมต่อระบบงาน",
} as const;

export const CLIENT_STATUS_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "active", label: "ใช้งาน" },
  { value: "inactive", label: "ไม่ใช้งาน" },
  { value: "expired", label: "หมดอายุ" },
] as const;
