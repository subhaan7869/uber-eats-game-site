# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Uber Eats Delivery Driver Game (`artifacts/uber-eats-game`)
React + Vite + TypeScript game simulating being a food delivery driver.

**Features:**
- Account system: name, password, auto-generated driver code (DRV-XXXXXX), stored in localStorage
- Login screen: enter driver code to log in; existing profile is remembered across sessions
- Progress persistence: deliveries, earnings, and level saved to localStorage
- Verification system: every 3 deliveries, user must re-enter driver code (3 attempts allowed)
- Document expiry: after 5 logins, user must re-enter name+password with a processing countdown
- Wallet: shows earnings in HUD; Cash Out button resets balance and shows confirmation toast
- Full animated driving game: animated road, city skyline, order flow (accept → pickup → deliver)
- Rank progression: Blue → Gold → Platinum → Diamond based on trip count
- Sound effects, incoming order countdown timer, tip tracking

**Key files:**
- `src/App.tsx` — auth flow (signup, login, doc expiry, game routing)
- `src/pages/Onboarding.tsx` — 5-step signup with password + driver code generation
- `src/pages/Login.tsx` — driver code login screen
- `src/pages/DocExpiry.tsx` — document renewal flow with countdown
- `src/pages/Game.tsx` — main game with persistence, verification modal, cash out

**Security overrides** (root `package.json`):
- lodash → ^4.18.0, path-to-regexp → ^8.4.0, picomatch → ^4.0.4
