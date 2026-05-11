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
