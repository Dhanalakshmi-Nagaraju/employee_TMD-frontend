import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, fetchTaskById,fetchTasks, TaskListParams, updateTask, updateTaskStatus } from "@/api/tasks.api";
import { TaskRequest, TaskStatus } from "@/types/task.types";


export function useTasks(params: TaskListParams) {
    return useQuery({
        queryKey: ["tasks",params],
        queryFn: () => fetchTasks(params),
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
        queryClient.invalidateQueries({ queryKey: ["task", variables.id] });
        queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
      },
    });
  }