"use client";

import { useEmployeeOptions } from "@/hooks/useEmployees";

export default function TasksPage() {
  const { data, isLoading, isError, error } = useEmployeeOptions();

  if (isLoading) return <p>Loading employee options...</p>;
  if (isError) return <p className="text-destructive">{error.message}</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Tasks</h1>
      <p className="text-sm text-muted-foreground">
        Employee options for assignee dropdown:
      </p>
      <pre className="rounded-lg bg-muted p-4 text-xs overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}