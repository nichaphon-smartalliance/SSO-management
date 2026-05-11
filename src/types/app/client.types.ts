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
