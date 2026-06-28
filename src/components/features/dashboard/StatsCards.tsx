import { CheckCircle2, ClipboardList, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStats } from "@/types/dashboard.types";

interface StatsCardsProps {
  stats: DashboardStats;
}

const statItems = [
  { key: "totalEmployees" as const, label: "Total Employees", icon: Users },
  { key: "totalTasks" as const, label: "Total Tasks", icon: ClipboardList },
  { key: "pendingTasks" as const, label: "Pending Tasks", icon: Clock },
  { key: "completedTasks" as const, label: "Completed Tasks", icon: CheckCircle2 },
] as const;

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statItems.map(({ key, label, icon: Icon }) => (
        <Card key={key}>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon className="size-4 shrink-0 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                {label}
              </span>
            </div>
            <p className="text-3xl font-semibold">{stats[key]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
