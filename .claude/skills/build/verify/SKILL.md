---
name: verify
description: 'Build, test, lint the generated application and report results'
agent: _builder
argument-hint: ''
---

# /verify — Build & Test

## What It Does

1. `pnpm install` (if not done)
2. `pnpm build` — both backend and app packages
3. `pnpm test` — if tests exist
4. `pnpm lint` — if configured
5. Check for remaining template references ("Reineira Modules", "@reineira-os/modules")
6. Check that all brief entities have complete vertical slices

## Checks

### Build
- Backend: `pnpm --filter @<venture>/backend build`
- Frontend: `pnpm --filter @<venture>/app build`

### Template remnants
```bash
grep -r "reineira-os/modules" --include="*.ts" --include="*.tsx" --include="*.json"
grep -r "Reineira Modules" --include="*.ts" --include="*.tsx" --include="*.md"
```

### Entity completeness (per entity from brief)
- Backend: domain model, status enum, repository, DTOs, use cases, memory repo, API handlers
- Frontend: service, store, list/form/detail components, route, navbar link

### Dashboard
- Has summary cards for each entity
- Has recent blocks

## Output

```
BUILD:     ✓ backend  ✓ frontend
TESTS:     ✓ passed / ⚠ skipped
BRANDING:  ✓ no template remnants / ⚠ N remnants found
ENTITIES:  ✓ N/N complete
DASHBOARD: ✓ present / ✗ missing

Issues:
  - [list any problems]

Run:
  cd ../<venture-name>
  pnpm dev:backend    # port 3000
  pnpm dev:app        # port 4831
```
