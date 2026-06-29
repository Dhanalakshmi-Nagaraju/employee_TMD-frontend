"use client";

import { EmployeeStatsCards } from "@/components/features/dashboard/EmployeeStatsCards";
import { StatusChart } from "@/components/features/dashboard/StatusChart";
import { EmployeeDashboardSkeleton } from "@/components/shared/EmployeeDashboardSkeleton";
import { useAuth } from "@/hooks/useAuth";
import { useEmployeeDashboard } from "@/hooks/useDashboard";

export default function EmployeeDashboardPage() {
  const { user } = useAuth();
  const employeeId = user?.employeeId ?? null;

  const { data, isLoading, isError, error } = useEmployeeDashboard(employeeId);

  if (employeeId == null) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-destructive">
          No employee profile linked to this account.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <EmployeeDashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-destructive">
          {error instanceof Error ? error.message : "Failed to load dashboard stats."}
        </p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}. Here is an overview of your assigned tasks.
        </p>
      </div>
      <EmployeeStatsCards stats={data} />
      <StatusChart statusDistribution={data.statusDistribution} />
    </div>
  );
}