import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClients, getClientById, addClient, editClient, removeClient } from "@/services/client.service";
import type { Client } from "@/types/app";

export const CLIENTS_QUERY_KEY = ["clients"] as const;

export const useClients = (params?: Record<string, unknown>, initialData?: Client[]) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [...CLIENTS_QUERY_KEY, params],
    queryFn: () => getClients(params),
    initialData,
  });
  return { data, isLoading, error };
};

export const useClientById = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [...CLIENTS_QUERY_KEY, id],
    queryFn: () => getClientById(id),
    enabled: !!id,
  });
  return { data, isLoading };
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Omit<Client, "id">) => addClient(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY }),
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<Client> }) => editClient(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY }),
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeClient(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY }),
  });
};
