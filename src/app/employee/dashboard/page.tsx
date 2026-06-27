"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

/** Placeholder until Part 3 (layout + AuthGuard + my-tasks features) */
export default function EmployeeDashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-semibold">Employee Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome, {user?.name ?? "Employee"} — Part 2 login works.
      </p>
      <p className="text-sm text-muted-foreground">
        My Tasks UI comes in Part 3+.
      </p>
      <Button
        variant="outline"
        onClick={() => {
          logout();
          router.replace("/auth/login");
        }}
      >
        Log out
      </Button>
    </main>
  );
}
