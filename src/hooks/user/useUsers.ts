import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, getUserById, addUser, editUser, removeUser } from "@/services/user.service";
import type { User } from "@/types/app";

export const USERS_QUERY_KEY = ["users"] as const;

export const useUsers = (params?: Record<string, unknown>, initialData?: User[]) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [...USERS_QUERY_KEY, params],
    queryFn: () => getUsers(params),
    initialData,
  });
  return { data, isLoading, error };
};

export const useUserById = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [...USERS_QUERY_KEY, id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
  return { data, isLoading };
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Omit<User, "id">) => addUser(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<User> }) => editUser(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  });
};
