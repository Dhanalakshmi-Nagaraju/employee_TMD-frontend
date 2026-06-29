import { CheckCircle2, ClipboardList, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { EmployeeDashboardStats } from "@/types/dashboard.types";

interface EmployeeStatsCardsProps {
  stats: EmployeeDashboardStats;
}

const statItems = [
  {
    key: "totalTasks" as const,
    label: "My Tasks",
    icon: ClipboardList,
    iconClass: "text-violet-500",
    iconBgClass: "bg-violet-500/15",
    borderClass: "border-violet-500/20",
  },
  {
    key: "pendingTasks" as const,
    label: "Pending",
    icon: Clock,
    iconClass: "text-orange-500",
    iconBgClass: "bg-orange-500/15",
    borderClass: "border-orange-500/20",
  },
  {
    key: "completedTasks" as const,
    label: "Completed",
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    iconBgClass: "bg-emerald-500/15",
    borderClass: "border-emerald-500/20",
  },
] as const;

export function EmployeeStatsCards({ stats }: EmployeeStatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statItems.map(({ key, label, icon: Icon, iconClass, iconBgClass, borderClass }) => (
        <Card
          key={key}
          className={cn("border bg-card/90 shadow-sm", borderClass)}
        >
          <CardContent className="px-6 py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {label}
                </p>
                <p className="text-4xl font-bold tabular-nums tracking-tight">
                  {stats[key]}
                </p>
              </div>
              <div className={cn("rounded-xl p-3", iconBgClass)}>
                <Icon className={cn("size-5 shrink-0", iconClass)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}