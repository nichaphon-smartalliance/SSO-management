import { fetchAuditLogs } from "@/lib/api/api-main";
import type { AuditLog } from "@/types/app";

export const getAuditLogs = async (params?: Record<string, unknown>): Promise<AuditLog[]> => {
  const res = await fetchAuditLogs(params);
  return res.data;
};
