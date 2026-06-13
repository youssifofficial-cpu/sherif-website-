# Sherif Al Kady — Website

A React + Vite single-page site for Sherif Al Kady, built inside a **pnpm
workspace monorepo**. The site lives in `artifacts/sherif-alkady`; shared API
client / schema / db packages live under `lib/`, and supporting services live
under `artifacts/`.

## Requirements

- **Node.js** 20+ (developed against Node 22/24)
- **pnpm** 10+ (`corepack enable` will provide it, or `npm i -g pnpm`)

## Repository layout

```
.
├── artifacts/
│   ├── sherif-alkady/     # the website (React + Vite + Tailwind)
│   ├── api-server/        # Express 5 API server
│   └── mockup-sandbox/    # sandbox app
├── lib/                   # shared workspace packages
│   ├── api-client-react/  # generated React Query hooks
│   ├── api-spec/          # OpenAPI spec + codegen
│   ├── api-zod/           # generated Zod schemas
│   └── db/                # Drizzle ORM schema
├── attached_assets/       # images used by the site (referenced only)
├── scripts/               # workspace tooling
└── pnpm-workspace.yaml     # workspace + dependency catalog
```

## Setup

```bash
pnpm install
```

This installs dependencies for every package in the workspace. The workspace
enforces a 1-day minimum release age on npm packages as a supply-chain
safeguard (see `pnpm-workspace.yaml`); do not disable it.

## Run the website (dev)

```bash
pnpm --filter @workspace/sherif-alkady run dev
```

By default the dev server listens on **port 5173** at base path **`/`**. Both
are configurable via environment variables:

```bash
PORT=8080 BASE_PATH=/sherif/ pnpm --filter @workspace/sherif-alkady run dev
```

## Build & preview

```bash
# Production build → artifacts/sherif-alkady/dist/public
pnpm --filter @workspace/sherif-alkady run build

# Preview the production build
pnpm --filter @workspace/sherif-alkady run serve
```

## Other useful commands

```bash
pnpm run typecheck                                   # typecheck all packages
pnpm run build                                       # typecheck + build everything
pnpm --filter @workspace/api-server run dev          # run the API server locally
pnpm --filter @workspace/api-spec run codegen        # regenerate API hooks + Zod schemas
```

## Notes

- `PORT` and `BASE_PATH` have sensible defaults (`5173` and `/`), so the site
  builds and runs anywhere without extra environment setup.
- `node_modules/` and build output (`dist/`) are git-ignored.
