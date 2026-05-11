export interface Organization {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  type: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  clientCount: number;
  userCount: number;
}

export interface Admin {
  id: string;
  username: string;
  titleId?: string;
  fullName: string;
  email: string;
  phone: string;
  role: "super_admin" | "org_admin";
  organizationId?: string;
  organizationName?: string;
  mfaEnabled: boolean;
  status: "active" | "inactive";
  lastLogin: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  citizenId: string;
  titleId?: string;
  fullName: string;
  email: string;
  phone: string;
  organizationId: string;
  organizationName: string;
  thaidLinked: boolean;
  thaidLinkedAt?: string;
  status: "active" | "inactive" | "locked";
  lastLogin: string;
  loginCount: number;
  createdAt: string;
}

export interface Client {
  id: string;
  clientId: string;
  clientName: string;
  organizationId: string;
  organizationName: string;
  redirectUris: string[];
  scopes: string[];
  grantTypes: string[];
  effectiveDate: string;
  expiryDate: string;
  status: "active" | "inactive" | "expired";
  createdAt: string;
  lastUsed?: string;
}

export interface AccessRequest {
  id: string;
  requestNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  organizationId: string;
  organizationName: string;
  clientId: string;
  clientName: string;
  requestedRole: string;
  requestedScopes: string[];
  reason: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNote?: string;
  effectiveDate?: string;
  expiryDate?: string;
}

export interface Permission {
  id: string;
  userId: string;
  userName: string;
  clientId: string;
  clientName: string;
  organizationId: string;
  organizationName: string;
  role: string;
  scopes: string[];
  effectiveDate: string;
  expiryDate: string;
  status: "active" | "expired" | "revoked";
}

export interface AuditLog {
  id: string;
  timestamp: string;
  eventType: string;
  severity: "info" | "warning" | "error" | "critical";
  actor: string;
  actorRole: string;
  action: string;
  resource: string;
  resourceId: string;
  ipAddress: string;
  userAgent: string;
  status: "success" | "failure";
  details: string;
}

export interface Title {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
