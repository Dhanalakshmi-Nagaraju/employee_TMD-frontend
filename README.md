# Employee TMD — Frontend

Next.js 15 frontend for the Employee Task Management Dashboard.

## Part 1 (current) — Config + API foundation

This commit includes project setup and shared types/client only. No auth, pages, or feature APIs yet.

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

### What's included

| Area | Files |
|------|-------|
| Config | `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `components.json`, `.env.example` |
| App shell | `src/app/layout.tsx`, `providers.tsx`, `globals.css`, placeholder `page.tsx` |
| Utilities | `src/lib/utils.ts` (`cn` helper for shadcn) |
| API layer | `src/api/client.ts`, `src/types/api.types.ts` |
| Domain types | `src/types/employee.types.ts`, `src/types/task.types.ts` |

### API proxy

Frontend calls `/api/...` on the same origin. Next.js rewrites those to Spring Boot (`NEXT_PUBLIC_API_URL`).

### Next (Part 2)

Login flow: `auth.types.ts`, `AuthContext`, login page, `auth.api.ts`.
