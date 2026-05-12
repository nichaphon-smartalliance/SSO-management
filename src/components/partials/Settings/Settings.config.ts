export const SETTINGS_CONFIG = {
  title: "การตั้งค่าระบบ",
  description: "กำหนดค่าและนโยบายความปลอดภัยของระบบ",
} as const;

export const SETTINGS_TABS = [
  { key: "password", label: "รหัสผ่าน" },
  { key: "mfa",      label: "MFA" },
  { key: "token",    label: "Token" },
  { key: "thaid",    label: "ThaID" },
  { key: "titles",   label: "ยศ/คำนำหน้า" },
] as const;

// ─── Default State Values ─────────────────────────────────────────────────────

export const DEFAULT_PASSWORD_POLICY = {
  minLength:           "12",
  passwordExpiry:      "90",
  passwordHistory:     "5",
  requireUppercase:    true,
  requireLowercase:    true,
  requireNumbers:      true,
  requireSpecialChars: true,
};

export const DEFAULT_MFA_POLICY = {
  enforceMfa:     true,
  mfaMethod:      "totp",
  allowedMethods: ["totp"] as string[],
};

export const DEFAULT_SESSION_POLICY = {
  sessionTimeout:          "30",
  inactivityTimeout:       "15",
  maxConcurrentSessions:   "3",
  rememberDevice:          true,
};

export const DEFAULT_TOKEN_POLICY = {
  accessTokenExpiry:  "3600",
  refreshTokenExpiry: "2592000",
  idTokenExpiry:      "3600",
  allowRefreshToken:  true,
};

export const DEFAULT_THAID_SETTINGS = {
  enabled:          true,
  clientId:         "sso-gov-production",
  environment:      "production",
  autoLinkAccounts: false,
};
