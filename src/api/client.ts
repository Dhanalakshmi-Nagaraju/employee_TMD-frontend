import axios, { type AxiosResponse } from "axios";
import type { GenericResponse } from "@/types/api.types";

/**
 * baseURL is empty so requests use Next.js rewrites (/api/* → Spring Boot).
 * See next.config.ts and NEXT_PUBLIC_API_URL in .env
 */
export const apiClient = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ?? error.message ?? "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

/** Unwrap GenericResponse<T> and throw if success is false */
export function unwrapData<T>(response: AxiosResponse<GenericResponse<T>>): T {
  const { success, message, data } = response.data;

  if (!success) {
    throw new Error(message);
  }

  return data;
}
