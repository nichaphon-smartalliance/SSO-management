export const ORGANIZATIONS_CONFIG = {
  title: "จัดการหน่วยงาน",
  description: "จัดการข้อมูลหน่วยงานในระบบ",
} as const;

export const ORG_STATUS_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "active", label: "ใช้งาน" },
  { value: "inactive", label: "ไม่ใช้งาน" },
  { value: "suspended", label: "ระงับ" },
] as const;
