import { apiClient, unwrapData } from "@/api/client";
import type { LoginResponse } from "@/types/auth.types";

export async function loginWithEmail(email: string): Promise<LoginResponse> {
  const response = await apiClient.post("/api/auth/login", { email });
  return unwrapData<LoginResponse>(response);
}
