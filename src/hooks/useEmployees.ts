import {deleteEmployee, updateEmployee,createEmployee, fetchEmployees,fetchEmployeeOptions, type EmployeeListParams } from "@/api/employees.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {EmployeeRequest} from "@/types/employee.types";
import { keepPreviousData } from "@tanstack/react-query";

export function useEmployees(params:EmployeeListParams) {
    return useQuery({
        queryKey : ["employees", params],
        queryFn: () => fetchEmployees(params),
        placeholderData: keepPreviousData,
    });
}

export function useCreateEmployee() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: EmployeeRequest) => createEmployee(payload),
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey :["employees"]});
            queryClient.invalidateQueries({queryKey : ["dashboard", "stats"]});
        },
    });
}


export function useUpdateEmployee() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, payload}:{id:number, payload:EmployeeRequest}) =>
            updateEmployee(id,payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["employees"]})
        },
    });
}


export function useDeleteEmployee() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id:number) => deleteEmployee(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["employees"]});
            queryClient.invalidateQueries({queryKey:["dashboard", "stats"]});
        },
    });
}

export function useEmployeeOptions() {
    return useQuery({
      queryKey: ["employees", "options"],
      queryFn: fetchEmployeeOptions,
      staleTime: 5 * 60 * 1000, // cache 5 min — dropdown data changes rarely
    });
  }