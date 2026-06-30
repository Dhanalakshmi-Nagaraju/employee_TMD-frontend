import { AuthGuard } from "@/components/auth/AuthGuard";
import { AppShell } from "@/components/layout/AppShell";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard role="MANAGER">
      <AppShell role="MANAGER">{children}</AppShell>
    </AuthGuard>
  );
}
