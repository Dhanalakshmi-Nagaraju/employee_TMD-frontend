import { Page } from "@/types/api.types";
import { Priority, Task, TaskStatus, TaskRequest, TaskStatusUpdateRequest } from "@/types/task.types";
import { apiClient, unwrapData } from "./client";


export interface TaskListParams {
    page? : number;
    size? : number;
    search?: string;
    status?: TaskStatus;
    priority?: Priority;
    assignedEmployeeId?: number;
}

export async function fetchTasks(
    params: TaskListParams ={}
    ): Promise<Page<Task>> {
        const response = await apiClient.get("/api/tasks", {
            params: {
                page: params.page ?? 0,
                size: params.size?? 10,
                search: params.search || undefined,
                status: params.status || undefined,
                priority: params.priority || undefined,
                assignedEmployeeId : params.assignedEmployeeId ?? undefined,
                sort: "dueDate,asc",
            },
        });

        return unwrapData<Page<Task>>(response);
    }

    export async function fetchTaskById(id: number): Promise<Task> {
        const response = await apiClient.get(`/api/tasks/${id}`);
        return unwrapData<Task>(response);
    }

    export async function createTask(payload: TaskRequest) : Promise<Task> {
        const response = await apiClient.post("/api/tasks", payload);
        return unwrapData<Task>(response);
    }

    export async function updateTask(
        id: number,
        payload: TaskRequest
      ): Promise<Task> {
        const response = await apiClient.put(`/api/tasks/${id}`, payload);
        return unwrapData<Task>(response);
      }

    export async function deleteTask(id: number): Promise<void> {
    const response = await apiClient.delete(`/api/tasks/${id}`);
    return unwrapData<void>(response);
    }

    export async function updateTaskStatus(
        id: number,
        payload: TaskStatusUpdateRequest
      ): Promise<Task> {
        const response = await apiClient.patch(`/api/tasks/${id}/status`, payload);
        return unwrapData<Task>(response);
      }



      export interface MyTasksListParams {
        page?: number;
        size?: number;
        search?: string;
        status?: TaskStatus;
        priority?: Priority;
      }
      
      export async function fetchMyTasks(
        employeeId: number,
        params: MyTasksListParams = {}
      ): Promise<Page<Task>> {
        return fetchTasks({
          page: params.page,
          size: params.size,
          search: params.search,
          status: params.status,
          priority: params.priority,
          assignedEmployeeId: employeeId,
        });
      }