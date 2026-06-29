/** Matches backend DashboardStatsResponse */
export interface DashboardStats {
  totalEmployees: number;
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  statusDistribution: Record<string, number>;
}

/** Matches backend EmployeeDashboardStatsResponse */
export interface EmployeeDashboardStats {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  statusDistribution: Record<string, number>;
}
