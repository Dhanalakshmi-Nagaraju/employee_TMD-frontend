import { apiClient, unwrapData } from "./client";
import { Page } from "@/types/api.types";
import { Employee, EmployeeRequest, EmployeeOption } from "@/types/employee.types";

export interface EmployeeListParams {
  search?: string;
  page? :number;
  size?: number;
}

export async function fetchEmployees(
  params: EmployeeListParams = {}
): Promise<Page<Employee>> {
  const response = await apiClient.get("/api/employees", {
    params: {
      search: params.search || undefined,
      page: params.page ?? 0,
      size: params.size ?? 10,
      sort: "name,asc",
    },
  });
  return unwrapData<Page<Employee>>(response);
}


export async function createEmployee(
  payload: EmployeeRequest
): Promise<Employee> {
  const response = await apiClient.post("/api/employees", payload);
  return unwrapData<Employee>(response);
}


export async function updateEmployee(
  id: number,
  payload: EmployeeRequest
): Promise<Employee> {
  const response = await apiClient.put(`/api/employees/${id}`, payload);
  return unwrapData<Employee>(response);
}

export async function deleteEmployee(id: number): Promise<void> {
  const response = await apiClient.delete(`/api/employees/${id}`);
  return unwrapData<void>(response);
}

export async function fetchEmployeeOptions(): Promise<EmployeeOption[]> {
  const response = await apiClient.get("/api/employees/options");
  return unwrapData<EmployeeOption[]>(response);
}