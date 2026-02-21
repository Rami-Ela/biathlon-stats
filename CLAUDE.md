# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server with Turbopack
yarn build      # Production build
yarn lint       # ESLint
```

No test suite is configured. Use `yarn build` to catch TypeScript and build errors.

## Environment

The app requires `DOMAIN_URL` in `.env.local` (e.g. `http://localhost:3000`). This is used by server components and API routes to make internal fetch calls.

## Architecture

**Next.js 15 App Router** with React 19. The app displays IBU biathlon results fetched from the public `biathlonresults.com` Sport API.

### Data flow

All external API calls go through `src/lib/api/` functions, which are called by:
- **Next.js API routes** (`src/app/api/`) — act as a proxy layer, re-exposing IBU data with query param handling
- **Server components** — call internal API routes via `process.env.DOMAIN_URL` (not `lib/api/` directly, to leverage Next.js caching)

### Route structure

- `/` — Home page: next event highlight + top 10 men/women rankings
- `/(seasonSelect)/events` — Event list (uses `SeasonSelect` dropdown)
- `/(seasonSelect)/events/[id]` — Event detail with competition list
- `/(seasonSelect)/ranking` — Full season ranking
- `/competitions/[id]` — Race result table
- `/competitions/[id]/shootingResult` — Shooting stats table
- `/competitions/[id]/skiResult` — Ski time stats table

The `(seasonSelect)` route group adds a `SeasonSelect` dropdown that persists `?seasonId=` as a URL search param across navigation.

### Season handling

Season IDs are 4-char strings (e.g. `"2425"` = 2024-25 season). `DEFAULT_SEASON` and `sortedSeasons` are exported from `src/types/competitions.ts`. The `SeasonSelect` component reads/writes `?seasonId` via `useSearchParams` + `router.push`.

### Key types

- `src/types/competitions.ts` — `Competition`, `RaceResult`, `RaceDetail`, `SkiResult`, `ShootingResult`, `SeasonIds`, `DEFAULT_SEASON`
- `src/types/events.ts` — `Event`
- `src/types/rankings.ts` — `CupRanking`

### UI

Components use shadcn/ui (`src/components/ui/`) built on Radix UI primitives + Tailwind. Country flags use the `flag-icons` CSS library via `src/utils/flags.tsx`.

Points attribution follows the official IBU system (top 40 finishers) — see `src/utils/competitionPoints.ts`.
