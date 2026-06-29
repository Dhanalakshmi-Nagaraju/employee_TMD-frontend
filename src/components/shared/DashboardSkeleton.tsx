import { Card, CardContent, CardHeader } from "@/components/ui/card";

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className ?? ""}`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <SkeletonBlock className="h-8 w-48" />
        <SkeletonBlock className="h-4 w-72" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="py-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <SkeletonBlock className="h-3 w-24" />
                  <SkeletonBlock className="h-10 w-16" />
                </div>
                <SkeletonBlock className="size-11 rounded-xl" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <SkeletonBlock className="h-4 w-40" />
        </CardHeader>
        <CardContent>
          <SkeletonBlock className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
