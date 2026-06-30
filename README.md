# Employee TMD — Frontend

Next.js 15 frontend for the Employee Task Management Dashboard.

## Part 4 (current) — Manager dashboard

Live stats and chart from `GET /api/dashboard/stats`.

### Prerequisites

- Node.js 18+
- Backend running at `http://localhost:8080`

### Setup

```bash
cd frontend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), sign in as `manager@test.com`.

### Expected dashboard data (seeded backend)

| Metric | Example value |
|--------|---------------|
| Total Employees | 3 |
| Total Tasks | 4 |
| Pending Tasks | 2 |
| Completed Tasks | 1 |
| Status chart | PENDING: 2, IN_PROGRESS: 1, COMPLETED: 1 |

### What's included

| Area | Files |
|------|-------|
| Part 1–3 | Config, auth, layout, guards |
| Types | `src/types/dashboard.types.ts` |
| API | `src/api/dashboard.api.ts` |
| Hook | `src/hooks/useDashboard.ts` |
| UI | `StatsCards`, `StatusChart`, `DashboardSkeleton` |
| Page | `src/app/manager/dashboard/page.tsx` |

### Next (Part 5)

Employee CRUD table at `/manager/employees`.
