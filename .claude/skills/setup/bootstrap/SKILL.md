---
agent: _bootstrap
argument-hint: '[optional: path to brief.md]'
---

# /bootstrap — Full Venture Setup

One command to go from `brief.md` to a working application.

## What It Does

**Phase 1 — Startup OS** (what `_starter.md` does):
1. Reads `brief.md` — extracts identity, stage, features, entities
2. Selects agent roster based on stage
3. Generates docs (business model, roadmap, architecture, compliance, etc.)
4. Creates skills and seeds initial data

**Phase 2 — Working Application** (what `_builder.md` does):
5. Copies `platform-modules/` into `../<venture-name>/`
6. Generates backend vertical slices for each entity
7. Generates frontend stores, services, routes, components
8. Verifies everything builds

## Prerequisites

- `brief.md` must be filled out (at minimum: venture name, core features, data entities)
- `platform-modules/` must exist as a sibling directory

## Output

1. Populated `.claude/` operating system (agents, docs, skills, data)
2. New directory `../<venture-name>/` with a complete, buildable application

## After Bootstrap

- `cd ../<venture-name> && pnpm install && pnpm dev:backend` — start backend
- `cd ../<venture-name> && pnpm dev:app` — start frontend
- `/integrate` — wire protocol-specific logic (escrow, FHE, SDK)
- `/dev-backend`, `/dev-frontend` — extend features
- `/strategy` — business decisions
