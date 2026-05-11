import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRequests,
  getRequestById,
  approveAccessRequest,
  rejectAccessRequest,
} from "@/services/request.service";
import type { AccessRequest } from "@/types/app";

export const REQUESTS_QUERY_KEY = ["requests"] as const;

export const useRequests = (params?: Record<string, unknown>, initialData?: AccessRequest[]) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [...REQUESTS_QUERY_KEY, params],
    queryFn: () => getRequests(params),
    initialData,
  });
  return { data, isLoading, error };
};

export const useRequestById = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [...REQUESTS_QUERY_KEY, id],
    queryFn: () => getRequestById(id),
    enabled: !!id,
  });
  return { data, isLoading };
};

export const useApproveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveAccessRequest(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEY }),
  });
};

export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => rejectAccessRequest(id, reason),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEY }),
  });
};
