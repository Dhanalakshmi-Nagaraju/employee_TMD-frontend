# Employee TMD — Frontend

Next.js 15 frontend for the Employee Task Management Dashboard.

## Part 3 (current) — Layout + route protection

Protected manager and employee areas with sidebar, topbar, and role-based guards.

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

Open [http://localhost:3000](http://localhost:3000).

### Test logins

| Role | Email |
|------|-------|
| Manager | `manager@test.com` |
| Employee | Any email in the `employees` table (e.g. from `data.sql`) |

### What's included

| Area | Files |
|------|-------|
| Part 1–2 | Config, API client, login, auth context |
| Route guard | `src/components/auth/AuthGuard.tsx` |
| Layout | `AppShell`, `Sidebar`, `Topbar` |
| Layouts | `src/app/manager/layout.tsx`, `src/app/employee/layout.tsx` |
| Navigation | `src/lib/navigation.ts` |
| Pages | Dashboard, Employees, Tasks, My Tasks (placeholders) |

### Route protection

- Not logged in → `/auth/login`
- Employee opens `/manager/*` → redirected to employee dashboard
- Manager opens `/employee/*` → redirected to manager dashboard

### Next (Part 4)

Manager dashboard stats + chart from `GET /api/dashboard/stats`.
