"use client";

import { useState } from "react";
import { EmployeeTable } from "@/components/features/employees/EmployeeTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { useEmployees } from "@/hooks/useEmployees";

export default function EmployeesPage() {
  const [page, setPage] = useState(0);

  const { data, isLoading, isError, error } = useEmployees({
    page,
    size: 10,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Employees</h1>
          <p className="text-muted-foreground">
            Manage team members who can be assigned tasks.
          </p>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <p className="text-destructive">{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Employees</h1>
        <p className="text-muted-foreground">
          Manage team members who can be assigned tasks.
        </p>
      </div>

      {data.empty ? (
        <EmptyState
          title="No employees found"
          description="Get started by adding your first employee."
        />
      ) : (
        <EmployeeTable
          employees={data.content}
          page={data.number}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
