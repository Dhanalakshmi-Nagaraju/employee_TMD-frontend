export type Role = "MANAGER" | "EMPLOYEE";

/** Matches backend LoginResponse */
export interface LoginResponse {
  email: string;
  role: Role;
  employeeId: number | null;
  name: string;
}

/** Stored in localStorage after login */
export type AuthUser = LoginResponse;
