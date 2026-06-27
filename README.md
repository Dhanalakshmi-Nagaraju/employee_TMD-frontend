# Employee TMD — Frontend

Next.js 15 frontend for the Employee Task Management Dashboard.

## Part 2 (current) — Login flow

Mock auth with `localStorage`. No password — email only, matching the backend.

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
| Part 1 | Config, `api/client.ts`, employee/task types |
| Auth types | `src/types/auth.types.ts` |
| Auth API | `src/api/auth.api.ts` |
| Auth state | `src/context/AuthContext.tsx`, `src/hooks/useAuth.ts` |
| Login UI | `src/app/auth/login/page.tsx`, shadcn card/button/input/label |
| Routing | `src/app/page.tsx` redirects by role |
| Placeholders | `manager/dashboard`, `employee/dashboard` (logout only) |

### Next (Part 3)

`AuthGuard`, `AppShell`, sidebar/topbar, protected layouts.
