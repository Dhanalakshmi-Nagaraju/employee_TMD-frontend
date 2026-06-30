"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateEmployee, useUpdateEmployee } from "@/hooks/useEmployees";
import { employeeSchema, type EmployeeFormValues } from "@/schemas/employee.schema";
import type { Employee } from "@/types/employee.types";


interface EmployeeFormModalProps {
    open : boolean;
    onOpenChange : (open:boolean) => void;
    employee?: Employee | null;
}

export function EmployeeFormModal({
    open,
    onOpenChange,
    employee,
  }: EmployeeFormModalProps) {

    const isEditing = Boolean(employee);
    const createMutation = useCreateEmployee();
    const updateMutation = useUpdateEmployee();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: { name: "", email: "", department: "" },
      });

      useEffect(() => {
        if (!open) return;
        reset({
          name: employee?.name ?? "",
          email: employee?.email ?? "",
          department: employee?.department ?? "",
        });
      }, [open, employee, reset]);

      const onSubmit = async (values: EmployeeFormValues) => {
        try {
          if (isEditing && employee) {
            await updateMutation.mutateAsync({ id: employee.id, payload: values });
            toast.success("Employee updated successfully");
          } else {
            await createMutation.mutateAsync(values);
            toast.success("Employee created successfully");
          }
          onOpenChange(false);
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Failed to save employee");
        }
      };

      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Employee" : "Add Employee"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Update employee details." : "Enter details for the new employee."}
              </DialogDescription>
            </DialogHeader>
      
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* name, email, department fields — copy pattern from login page */}
            
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" className="bg-background" {...register("name")} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" className="bg-background" {...register("department")} />
                {errors.department && <p className="text-sm text-destructive">{errors.department.message}</p>}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {isEditing ? "Update" : "Create"}
                </Button>
              </DialogFooter>

            </form>
          </DialogContent>
        </Dialog>
      );
  }