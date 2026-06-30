export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export type Priority = "LOW" | "MEDIUM" | "HIGH";

/** Matches backend TaskResponse */
export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  assignedEmployeeId: number;
  assignedEmployeeName: string;
  createdAt: string;
}

/** Matches backend TaskRequest */
export interface TaskRequest {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  assignedEmployeeId: number;
}

/** Matches backend TaskStatusUpdateRequest */
export interface TaskStatusUpdateRequest {
  status: TaskStatus;
}
