"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { DeleteTaskDialog } from "@/components/features/tasks/DeleteTaskDialog";
import { TaskFormModal } from "@/components/features/tasks/TaskFormModal";
import { TaskTable } from "@/components/features/tasks/TaskTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { useTasks, useUpdateTaskStatus } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Priority, Task, TaskStatus } from "@/types/task.types";

const filterSelectClass =
  "h-8 rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export default function TasksPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "">("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, error, refetch } = useTasks({
    page,
    size: 10,
    search: debouncedSearch,
    status: statusFilter || undefined,
    priority: priorityFilter || undefined,
  });

  const statusMutation = useUpdateTaskStatus();

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const openDeleteDialog = (task: Task) => {
    setDeletingTask(task);
  };

  const handleTaskDeleted = () => {
    if (data && data.content.length === 1 && page > 0) {
      setPage(page - 1);
    }
  };

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-muted-foreground">
            Create and manage tasks assigned to employees.
          </p>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Tasks</h1>
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-muted-foreground">
            Create and manage tasks assigned to employees.
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="size-4" />
          Add Task
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by title or description"
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
          title="No tasks found"
          description={
            hasFilters
              ? "Try adjusting your search or filters."
              : "Get started by creating your first task."
          }
        />
      ) : (
        <TaskTable
          tasks={data.content}
          page={data.number}
          totalPages={data.totalPages}
          onPageChange={setPage}
          onEdit={openEditModal}
          onDelete={openDeleteDialog}
          onStatusChange={handleStatusChange}
          statusUpdatingId={statusUpdatingId}
        />
      )}

      <TaskFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        task={editingTask}
      />

      <DeleteTaskDialog
        open={Boolean(deletingTask)}
        onOpenChange={(open) => {
          if (!open) setDeletingTask(null);
        }}
        task={deletingTask}
        onDeleted={handleTaskDeleted}
      />
    </div>
  );
}
