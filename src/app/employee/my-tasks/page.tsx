"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { MyTaskTable } from "@/components/features/tasks/MyTaskTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { useAuth } from "@/hooks/useAuth";
import { useMyTasks, useUpdateTaskStatus } from "@/hooks/useTasks";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Priority, Task, TaskStatus } from "@/types/task.types";

const filterSelectClass =
  "h-8 rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export default function MyTasksPage() {
  const { user } = useAuth();
  const employeeId = user?.employeeId ?? null;

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "">("");
  const [statusUpdatingId, setStatusUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, error, refetch } = useMyTasks(employeeId, {
    page,
    size: 10,
    search: debouncedSearch,
    status: statusFilter || undefined,
    priority: priorityFilter || undefined,
  });

  const statusMutation = useUpdateTaskStatus();

  const handleStatusChange = async (task: Task, status: TaskStatus) => {
    if (task.status === status) return;

    setStatusUpdatingId(task.id);
    try {
      await statusMutation.mutateAsync({ id: task.id, status });
      toast.success("Task status updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
      refetch();
    } finally {
      setStatusUpdatingId(null);
    }
  };

  if (employeeId == null) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">My Tasks</h1>
        <p className="text-destructive">No employee profile linked to this account.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">My Tasks</h1>
          <p className="text-muted-foreground">View and update tasks assigned to you.</p>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">My Tasks</h1>
        <p className="text-destructive">{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const hasFilters = Boolean(debouncedSearch || statusFilter || priorityFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Tasks</h1>
        <p className="text-muted-foreground">
          View and update tasks assigned to you.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as TaskStatus | "");
            setPage(0);
          }}
          className={cn(filterSelectClass, "sm:w-40")}
        >
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => {
            setPriorityFilter(e.target.value as Priority | "");
            setPage(0);
          }}
          className={cn(filterSelectClass, "sm:w-36")}
        >
          <option value="">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      {data.empty ? (
        <EmptyState
          title="No tasks assigned"
          description={
            hasFilters
              ? "Try adjusting your search or filters."
              : "You have no tasks assigned yet."
          }
        />
      ) : (
        <MyTaskTable
          tasks={data.content}
          page={data.number}
          totalPages={data.totalPages}
          onPageChange={setPage}
          onStatusChange={handleStatusChange}
          statusUpdatingId={statusUpdatingId}
        />
      )}
    </div>
  );
}
