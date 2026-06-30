import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the calendar to pick a valid date")
    .refine((val) => {
      const [y, m, d] = val.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      return (
        date.getFullYear() === y &&
        date.getMonth() === m - 1 &&
        date.getDate() === d
      );
    }, "Enter a valid date")
    .refine((val) => {
      const due = new Date(`${val}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return due > today;
    }, "Due date must be in the future"),
  assignedEmployeeId: z.coerce
    .number()
    .int()
    .positive("Please select an employee"),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
