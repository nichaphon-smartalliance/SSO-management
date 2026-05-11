import { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";

export function setupAuthInterceptor(client: AxiosInstance) {
  client.interceptors.request.use(async (config) => {
    const session = await getSession();
    const token = (session as any)?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // session หมดอายุ — redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
}
