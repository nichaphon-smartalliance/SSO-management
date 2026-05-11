import {
  fetchOrganizations,
  fetchOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "@/lib/api/api-main";
import type { Organization } from "@/types/app";

export const getOrganizations = async (): Promise<Organization[]> => {
  const res = await fetchOrganizations();
  return res.data;
};

export const getOrganizationById = async (id: string): Promise<Organization> => {
  const res = await fetchOrganizationById(id);
  return res.data;
};

export const addOrganization = async (body: Omit<Organization, "id">): Promise<Organization> => {
  const res = await createOrganization(body);
  return res.data;
};

export const editOrganization = async (id: string, body: Partial<Organization>): Promise<Organization> => {
  const res = await updateOrganization(id, body);
  return res.data;
};

export const removeOrganization = async (id: string): Promise<void> => {
  await deleteOrganization(id);
};
