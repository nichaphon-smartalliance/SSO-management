import {
  fetchClients,
  fetchClientById,
  createClient,
  updateClient,
  deleteClient,
} from "@/lib/api/api-main";
import type { Client } from "@/types/app";

export const getClients = async (params?: Record<string, unknown>): Promise<Client[]> => {
  const res = await fetchClients(params);
  return res.data;
};

export const getClientById = async (id: string): Promise<Client> => {
  const res = await fetchClientById(id);
  return res.data;
};

export const addClient = async (body: Omit<Client, "id">): Promise<Client> => {
  const res = await createClient(body);
  return res.data;
};

export const editClient = async (id: string, body: Partial<Client>): Promise<Client> => {
  const res = await updateClient(id, body);
  return res.data;
};

export const removeClient = async (id: string): Promise<void> => {
  await deleteClient(id);
};
