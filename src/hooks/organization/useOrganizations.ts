import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrganizations,
  getOrganizationById,
  addOrganization,
  editOrganization,
  removeOrganization,
} from "@/services/organization.service";
import type { Organization } from "@/types/app";

export const ORGANIZATIONS_QUERY_KEY = ["organizations"] as const;

export const useOrganizations = (initialData?: Organization[]) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ORGANIZATIONS_QUERY_KEY,
    queryFn: getOrganizations,
    initialData,
  });
  return { data, isLoading, error };
};

export const useOrganizationById = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [...ORGANIZATIONS_QUERY_KEY, id],
    queryFn: () => getOrganizationById(id),
    enabled: !!id,
  });
  return { data, isLoading };
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Omit<Organization, "id">) => addOrganization(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY }),
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<Organization> }) => editOrganization(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY }),
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeOrganization(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY }),
  });
};
