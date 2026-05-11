export const USERS_CONFIG = {
  title: "จัดการผู้ใช้งาน",
  description: "จัดการบัญชีผู้ใช้งานและสิทธิ์การเข้าถึง",
} as const;

export const USER_STATUS_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "active", label: "ใช้งาน" },
  { value: "inactive", label: "ไม่ใช้งาน" },
  { value: "locked", label: "ถูกล็อค" },
] as const;
