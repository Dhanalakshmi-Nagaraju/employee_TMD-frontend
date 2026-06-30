import { apiClient, unwrapData } from "@/api/client";
import type { DashboardStats, EmployeeDashboardStats } from "@/types/dashboard.types";

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await apiClient.get("/api/dashboard/stats");
  return unwrapData<DashboardStats>(response);
}


export async function fetchEmployeeDashboardStats(
  employeeId: number
): Promise<EmployeeDashboardStats> {
  const response = await apiClient.get("/api/dashboard/employee-stats", {
    params: { employeeId },
  });
  return unwrapData<EmployeeDashboardStats>(response);
}