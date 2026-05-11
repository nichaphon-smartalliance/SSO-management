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

export interface Title {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
