import { AuthGuard } from "@/components/auth/AuthGuard";
import { AppShell } from "@/components/layout/AppShell";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard role="EMPLOYEE">
      <AppShell role="EMPLOYEE">{children}</AppShell>
    </AuthGuard>
  );
}
