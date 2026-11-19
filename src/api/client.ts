import axios from "axios";
import { clearToken, getToken } from "./auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000, // 10 second me jawab na aaye to request fail
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Response interceptor: har response aane ke baad chalta hai ----
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isLoginRequest = error.config?.url?.includes("/auth/login");

    if (status === 401 && !isLoginRequest && getToken()) {
      clearToken();
      window.location.replace("/admin/login?expired=1");
    }
    return Promise.reject(error);
  },
);

/**
 * Kisi bhi error se user ko dikhane layak message nikalta hai.
 * Backend errors { message: "..." } ki shakal me bhejta hai.
 */
export function getErrorMessage(
  err: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (axios.isAxiosError(err)) {
    if (!err.response)
      return "Cannot reach the server. Is the backend running?";
    const data = err.response.data as { message?: unknown } | undefined;
    if (typeof data?.message === "string") return data.message;
  }
  return fallback;
}

export function getFieldErrors(err: unknown): Record<string, string> | null {
  if (axios.isAxiosError(err) && err.response?.status === 400) {
    const data = err.response.data as { errors?: unknown } | undefined;
    if (data?.errors && typeof data.errors === "object") {
      return data.errors as Record<string, string>;
    }
  }
  return null;
}
