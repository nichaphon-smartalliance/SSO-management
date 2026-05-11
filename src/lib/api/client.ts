import axios from "axios";
import { setupAuthInterceptor } from "./interceptor";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

export const googleApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GOOGLE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const googleAuthClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GOOGLE_AUTH_API_URL,
  headers: { "Content-Type": "application/json" },
});

// ติดตั้ง auth interceptor สำหรับ API หลัก
setupAuthInterceptor(apiClient);
