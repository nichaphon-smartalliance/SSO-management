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
