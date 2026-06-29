import { cn } from "@/lib/utils";
import type { Priority, TaskStatus } from "@/types/task.types";

const STATUS_STYLES: Record<TaskStatus, string> = {
  PENDING: "bg-orange-500/15 text-orange-500",
  IN_PROGRESS: "bg-blue-500/15 text-blue-500",
  COMPLETED: "bg-emerald-500/15 text-emerald-500",
};

const PRIORITY_STYLES: Record<Priority, string> = {
  LOW: "bg-muted text-muted-foreground",
  MEDIUM: "bg-violet-500/15 text-violet-500",
  HIGH: "bg-red-500/15 text-red-500",
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

interface TaskPriorityBadgeProps {
  priority: Priority;
}

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
        PRIORITY_STYLES[priority]
      )}
    >
      {priority.toLowerCase()}
    </span>
  );
}
