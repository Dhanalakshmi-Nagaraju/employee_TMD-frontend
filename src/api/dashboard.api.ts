import { apiClient, unwrapData } from "@/api/client";
import type { DashboardStats } from "@/types/dashboard.types";

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await apiClient.get("/api/dashboard/stats");
  return unwrapData<DashboardStats>(response);
}
