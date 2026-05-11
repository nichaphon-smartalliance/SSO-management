export const ADMINS_CONFIG = {
  title: "จัดการผู้ดูแลระบบ",
  description: "จัดการบัญชีผู้ดูแลระบบ Super Admin และ Org Admin",
} as const;

export const ADMIN_ROLE_OPTIONS = [
  { value: "all", label: "บทบาททั้งหมด" },
  { value: "super_admin", label: "Super Admin" },
  { value: "org_admin", label: "Org Admin" },
] as const;
