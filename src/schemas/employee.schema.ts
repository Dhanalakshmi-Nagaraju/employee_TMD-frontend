import { z } from "zod";

export const employeeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email:z.string().min(1, "email is required").email("Enter a valid email"),
    department: z.string().min(1, "Department is required"),
});


export type EmployeeFormValues = z.infer<typeof employeeSchema>;