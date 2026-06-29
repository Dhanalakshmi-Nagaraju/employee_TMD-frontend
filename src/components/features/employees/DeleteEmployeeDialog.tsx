"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteEmployee } from "@/hooks/useEmployees";
import type { Employee } from "@/types/employee.types";

interface DeleteEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  onDeleted?: () => void;
}

export function DeleteEmployeeDialog({
  open,
  onOpenChange,
  employee,
  onDeleted,
}: DeleteEmployeeDialogProps) {
  const deleteMutation = useDeleteEmployee();

  const handleDelete = async () => {
    if (!employee) return;

    try {
      await deleteMutation.mutateAsync(employee.id);
      toast.success("Employee deleted successfully");
      onOpenChange(false);
      onDeleted?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete employee"
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border border-border bg-card shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete employee?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove{" "}
            <span className="font-medium text-foreground">
              {employee?.name ?? "this employee"}
            </span>
            . Employees with assigned tasks cannot be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}