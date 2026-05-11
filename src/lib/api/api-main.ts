import { apiClient } from "./client";
import type { Organization, User, Client, AccessRequest, AuditLog, Admin } from "@/types/app";

// ── Organizations ──────────────────────────────────────────────
export const fetchOrganizations = () =>
  apiClient.get<Organization[]>("/organizations");

export const fetchOrganizationById = (id: string) =>
  apiClient.get<Organization>(`/organizations/${id}`);

export const createOrganization = (body: Omit<Organization, "id">) =>
  apiClient.post<Organization>("/organizations", body);

export const updateOrganization = (id: string, body: Partial<Organization>) =>
  apiClient.put<Organization>(`/organizations/${id}`, body);

export const deleteOrganization = (id: string) =>
  apiClient.delete(`/organizations/${id}`);

// ── Users ──────────────────────────────────────────────────────
export const fetchUsers = (params?: Record<string, unknown>) =>
  apiClient.get<User[]>("/users", { params });

export const fetchUserById = (id: string) =>
  apiClient.get<User>(`/users/${id}`);

export const createUser = (body: Omit<User, "id">) =>
  apiClient.post<User>("/users", body);

export const updateUser = (id: string, body: Partial<User>) =>
  apiClient.put<User>(`/users/${id}`, body);

export const deleteUser = (id: string) =>
  apiClient.delete(`/users/${id}`);

// ── Clients ────────────────────────────────────────────────────
export const fetchClients = (params?: Record<string, unknown>) =>
  apiClient.get<Client[]>("/clients", { params });

export const fetchClientById = (id: string) =>
  apiClient.get<Client>(`/clients/${id}`);

export const createClient = (body: Omit<Client, "id">) =>
  apiClient.post<Client>("/clients", body);

export const updateClient = (id: string, body: Partial<Client>) =>
  apiClient.put<Client>(`/clients/${id}`, body);

export const deleteClient = (id: string) =>
  apiClient.delete(`/clients/${id}`);

// ── Access Requests ────────────────────────────────────────────
export const fetchRequests = (params?: Record<string, unknown>) =>
  apiClient.get<AccessRequest[]>("/requests", { params });

export const fetchRequestById = (id: string) =>
  apiClient.get<AccessRequest>(`/requests/${id}`);

export const approveRequest = (id: string) =>
  apiClient.post(`/requests/${id}/approve`);

export const rejectRequest = (id: string, reason?: string) =>
  apiClient.post(`/requests/${id}/reject`, { reason });

// ── Admins ────────────────────────────────────────────────────
export const fetchAdmins = () =>
  apiClient.get<Admin[]>("/admins");

export const fetchAdminById = (id: string) =>
  apiClient.get<Admin>(`/admins/${id}`);

export const createAdmin = (body: Omit<Admin, "id">) =>
  apiClient.post<Admin>("/admins", body);

export const updateAdmin = (id: string, body: Partial<Admin>) =>
  apiClient.put<Admin>(`/admins/${id}`, body);

// ── Audit Logs ────────────────────────────────────────────────
export const fetchAuditLogs = (params?: Record<string, unknown>) =>
  apiClient.get<AuditLog[]>("/logs", { params });
