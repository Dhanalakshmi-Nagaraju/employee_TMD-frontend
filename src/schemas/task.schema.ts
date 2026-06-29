import { z } from "zod";

export const taskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    dueDate: z.string().min(1, "Due date is required"),
    assignedEmployeeId: z.coerce
      .number()
      .int()
      .positive("Please select an employee"),
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(data.dueDate);
      return due > today;
    },
    { message: "Due date must be in the future", path: ["dueDate"] }
  );

export type TaskFormValues = z.infer<typeof taskSchema>;
