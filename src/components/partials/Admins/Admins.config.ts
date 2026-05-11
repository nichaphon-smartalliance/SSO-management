export const ADMINS_CONFIG = {
  title: "จัดการผู้ดูแลระบบ",
  description: "จัดการบัญชีผู้ดูแลระบบและสิทธิ์การใช้งาน",
} as const;

export const ADMIN_ROLE_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "super_admin", label: "Super Admin" },
  { value: "org_admin", label: "Org Admin" },
] as const;
