"use client";

import { useMyTasks, useUpdateTaskStatus } from "@/hooks/useTasks";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function MyTasksPage() {
  const { user } = useAuth();
  const employeeId = user?.employeeId ?? null;

  const statusMutation = useUpdateTaskStatus();
  const { data, isLoading, isError, error } = useMyTasks(employeeId, {
    page: 0,
    size: 10,
  });

  const firstTask = data?.content[0];

  const handleStatus = async () => {
    if (!firstTask) return;
    try {
      await statusMutation.mutateAsync({
        id: firstTask.id,
        status: "IN_PROGRESS",
      });
      toast.success("Status updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  if (employeeId == null) {
    return <p className="text-destructive">No employee profile linked.</p>;
  }

  if (isLoading) return <p>Loading my tasks...</p>;
  if (isError) return <p className="text-destructive">{error.message}</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">My Tasks</h1>
      <p className="text-sm text-muted-foreground">
        {data?.totalElements ?? 0} task(s) assigned to you
      </p>
      <Button
        onClick={handleStatus}
        disabled={!firstTask || statusMutation.isPending}
      >
        {statusMutation.isPending
          ? "Updating..."
          : "Mark first task In Progress"}
      </Button>
      <pre className="rounded-lg bg-muted p-4 text-xs overflow-auto">
        {JSON.stringify(data?.content, null, 2)}
      </pre>
    </div>
  );
}