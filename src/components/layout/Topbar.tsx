"use client";

import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function Topbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-6">
      <div>
        <p className="text-sm font-medium">{user?.name ?? "User"}</p>
        <p className="text-xs text-muted-foreground">{user?.email}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {resolvedTheme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="size-4" />
          Log out
        </Button>
      </div>
    </header>
  );
}
