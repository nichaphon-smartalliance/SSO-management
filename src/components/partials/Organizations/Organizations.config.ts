export const ORGANIZATIONS_CONFIG = {
  title: "จัดการหน่วยงาน",
  description: "จัดการข้อมูลหน่วยงานราชการทั้งหมด",
} as const;

export const ORG_STATUS_OPTIONS = [
  { value: "all", label: "สถานะทั้งหมด" },
  { value: "active", label: "ใช้งาน" },
  { value: "inactive", label: "ไม่ใช้งาน" },
  { value: "suspended", label: "ระงับ" },
] as const;
