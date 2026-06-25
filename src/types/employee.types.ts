/** Matches backend EmployeeResponse */
export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  createdAt: string;
}

/** Matches backend EmployeeRequest */
export interface EmployeeRequest {
  name: string;
  email: string;
  department: string;
}

/** Matches backend EmployeeOptionResponse (task assignee dropdown) */
export interface EmployeeOption {
  id: number;
  name: string;
}
