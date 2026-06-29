"use client";

import {useEffect, useState } from "react";
import { EmployeeTable } from "@/components/features/employees/EmployeeTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { useEmployees } from "@/hooks/useEmployees";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmployeeFormModal } from "@/components/features/employees/EmployeeFormModal";
import type { Employee } from "@/types/employee.types";



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


    const [modalOpen, setModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const openCreateModal = () => {
      setEditingEmployee(null);
      setModalOpen(true);
    };

    const openEditModal = (employee: Employee) => {
      setEditingEmployee(employee);
      setModalOpen(true);
    };

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Employees</h1>
          <p className="text-muted-foreground">
            Manage team members who can be assigned tasks.
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="size-4" />
          Add Employee
        </Button>
      </div>

      <div className="relative max-w-md">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by name, email"
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
          onEdit={openEditModal}
        />
      )}

      <EmployeeFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        employee={editingEmployee}
      />
    </div>
  );
}
