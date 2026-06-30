"use client";

import { StatusChart } from "@/components/features/dashboard/StatusChart";
import { StatsCards } from "@/components/features/dashboard/StatsCards";
import { DashboardSkeleton } from "@/components/shared/DashboardSkeleton";
import { useDashboard } from "@/hooks/useDashboard";

export default function ManagerDashboardPage() {
  const { data, isLoading, isError, error } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
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
          Overview of employees and tasks across the organization.
        </p>
      </div>
      <StatsCards stats={data} />
      <StatusChart statusDistribution={data.statusDistribution} />
    </div>
  );
}
