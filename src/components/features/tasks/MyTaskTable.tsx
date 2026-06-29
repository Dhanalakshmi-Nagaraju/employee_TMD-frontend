import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TaskPriorityBadge } from "@/components/features/tasks/TaskStatusBadge";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types/task.types";

interface MyTaskTableProps {
  tasks: Task[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onStatusChange: (task: Task, status: TaskStatus) => void;
  statusUpdatingId?: number | null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

export function MyTaskTable({
  tasks,
  page,
  totalPages,
  onPageChange,
  onStatusChange,
  statusUpdatingId,
}: MyTaskTableProps) {
  return (
    <>
      <div className="rounded-xl ring-1 ring-foreground/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <div className="max-w-md">
                    <p className="font-medium">{task.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <TaskPriorityBadge priority={task.priority} />
                </TableCell>
                <TableCell>
                  <select
                    value={task.status}
                    disabled={statusUpdatingId === task.id}
                    onChange={(e) =>
                      onStatusChange(task, e.target.value as TaskStatus)
                    }
                    className={cn(
                      "h-8 rounded-lg border border-input bg-background px-2 text-xs outline-none focus-visible:border-ring disabled:opacity-50"
                    )}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell>{formatDate(task.dueDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page + 1} of {Math.max(totalPages, 1)}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page + 1 >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
