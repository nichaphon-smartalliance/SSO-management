import {
  fetchRequests,
  fetchRequestById,
  approveRequest,
  rejectRequest,
} from "@/lib/api/api-main";
import type { AccessRequest } from "@/types/app";

export const getRequests = async (params?: Record<string, unknown>): Promise<AccessRequest[]> => {
  const res = await fetchRequests(params);
  return res.data;
};

export const getRequestById = async (id: string): Promise<AccessRequest> => {
  const res = await fetchRequestById(id);
  return res.data;
};

export const approveAccessRequest = async (id: string): Promise<void> => {
  await approveRequest(id);
};

export const rejectAccessRequest = async (id: string, reason?: string): Promise<void> => {
  await rejectRequest(id, reason);
};
