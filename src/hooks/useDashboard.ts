import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats, fetchEmployeeDashboardStats } from "@/api/dashboard.api";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchDashboardStats,
  });
}

export function useEmployeeDashboard(employeeId: number | null) {
  return useQuery({
    queryKey: ["dashboard", "employee-stats", employeeId],
    queryFn: () => fetchEmployeeDashboardStats(employeeId!),
    enabled: employeeId != null,
  });
}
