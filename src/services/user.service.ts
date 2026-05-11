import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/api/api-main";
import type { User } from "@/types/app";

export const getUsers = async (params?: Record<string, unknown>): Promise<User[]> => {
  const res = await fetchUsers(params);
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await fetchUserById(id);
  return res.data;
};

export const addUser = async (body: Omit<User, "id">): Promise<User> => {
  const res = await createUser(body);
  return res.data;
};

export const editUser = async (id: string, body: Partial<User>): Promise<User> => {
  const res = await updateUser(id, body);
  return res.data;
};

export const removeUser = async (id: string): Promise<void> => {
  await deleteUser(id);
};
