"use client";

import {useEffect, useState } from "react";
import { EmployeeTable } from "@/components/features/employees/EmployeeTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { useEmployees } from "@/hooks/useEmployees";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";


export default function EmployeesPage() {
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 300);
    return () =>clearTimeout(timer);
    }, [search]);

  const { data, isLoading, isError, error } = useEmployees({
    page,
    size: 10,
    search: debouncedSearch
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

      <div className="relative max-w-md">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {data.empty ? (
        <EmptyState
          title="No employees found"
          description={
            debouncedSearch
              ? "Try a different search term."
              : "Get started by adding your first employee."
          }
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
