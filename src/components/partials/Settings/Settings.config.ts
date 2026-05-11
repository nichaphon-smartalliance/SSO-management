export const SETTINGS_CONFIG = {
  title: "การตั้งค่าระบบ",
  description: "กำหนดนโยบายและการตั้งค่าความปลอดภัย",
} as const;

export const SETTINGS_TABS = [
  { key: "password", label: "รหัสผ่าน" },
  { key: "mfa", label: "MFA" },
  { key: "session", label: "Session" },
  { key: "token", label: "Token" },
  { key: "thaid", label: "ThaID" },
  { key: "titles", label: "คำนำหน้า" },
] as const;
