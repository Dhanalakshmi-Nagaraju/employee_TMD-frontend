"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, fetchTaskById,fetchTasks, TaskListParams, updateTask, updateTaskStatus, fetchMyTasks, MyTasksListParams } from "@/api/tasks.api";
import { TaskRequest, TaskStatus } from "@/types/task.types";
import { keepPreviousData } from "@tanstack/react-query";


export function useTasks(params: TaskListParams) {
    return useQuery({
        queryKey: ["tasks",params],
        queryFn: () => fetchTasks(params),
        placeholderData: keepPreviousData,
    });
}

export function useTask(id: number | null) {
    return useQuery({
        queryKey: ["task", id],
        queryFn: () => fetchTaskById(id!),
        enabled: id != null,
    });
}

export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: TaskRequest) => createTask(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey : ["tasks"]});
            queryClient.invalidateQueries({ queryKey : ["dashboard", "stats"]});
        },
    });
}


export function useUpdateTask() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, payload }: { id: number; payload: TaskRequest }) =>
        updateTask(id, payload),
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["task", variables.id] });
        queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
      },
    });
  }


  export function useDeleteTask() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id: number) => deleteTask(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
      },
    });
  }

  export function useUpdateTaskStatus() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, status }: { id: number; status: TaskStatus }) =>
        updateTaskStatus(id, { status }),
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
        queryClient.invalidateQueries({ queryKey: ["task", variables.id] });
        queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard", "employee-stats"] });
      },
    });
  }

  export function useMyTasks(
    employeeId: number | null,
    params: MyTasksListParams
  ) {
    return useQuery({
      queryKey: ["my-tasks", employeeId, params],
      queryFn: () => fetchMyTasks(employeeId!, params),
      placeholderData: keepPreviousData,
      enabled: employeeId != null,
    });
  }
