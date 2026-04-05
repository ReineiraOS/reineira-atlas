---
name: gen-entity
description: 'Generate one complete entity vertical slice (backend + frontend)'
agent: _builder
argument-hint: '<EntityName>'
---

# /gen-entity — One Entity Vertical Slice

## What It Does

Generates a complete backend + frontend implementation for ONE entity.
Called once per entity from brief.md.

## CRITICAL: Read Before Write

Before generating ANY code:
1. Read existing patterns in the venture's codebase (not platform-modules)
2. Read ALL UI components in `src/components/ui/` to understand their exact API
3. Read `src/infrastructure/container.ts` to understand current wiring
4. Read `src/infrastructure/repository/memory/index.ts` for export pattern

## Backend Files (per entity)

| File | Pattern Source |
|---|---|
| `src/domain/<entity>/model/<entity>.ts` | Follow existing `domain/escrow/model/escrow.ts` |
| `src/domain/<entity>/model/<entity>-status.enum.ts` | Follow `escrow-status.enum.ts` |
| `src/domain/<entity>/repository/<entity>.repository.ts` | Follow `escrow.repository.ts` |
| `src/application/dto/<entity>/create-<entity>.dto.ts` | Follow `create-escrow.dto.ts` (Zod) |
| `src/application/dto/<entity>/<entity>-response.dto.ts` | Follow `escrow-response.dto.ts` |
| `src/application/use-case/<entity>/create-<entity>.use-case.ts` | Follow `create-escrow.use-case.ts` |
| `src/application/use-case/<entity>/get-<entities>.use-case.ts` | Follow `get-escrows.use-case.ts` |
| `src/application/use-case/<entity>/get-<entity>-by-id.use-case.ts` | Follow `get-escrow-by-id.use-case.ts` |
| `src/infrastructure/repository/memory/memory-<entity>.repository.ts` | Follow `memory-escrow.repository.ts` |
| `api/v1/<entities>/index.ts` | POST + GET list handler |
| `api/v1/<entities>/[id].ts` | GET by ID handler |

Then UPDATE:
- `src/infrastructure/repository/memory/index.ts` — add export
- `src/infrastructure/container.ts` — add repo instance

## Frontend Files (per entity)

| File | Pattern Source |
|---|---|
| `src/services/<Entity>Service.ts` | Follow `TransactionService.ts` |
| `src/stores/<entity>-store.ts` | Follow `transaction-store.ts` (Zustand) |
| `src/components/features/<entity>-list.tsx` | Read existing list components |
| `src/components/features/<entity>-form.tsx` | Read existing form components |
| `src/components/features/<entity>-detail.tsx` | Read existing detail components |
| `src/routes/_authenticated/<entities>.tsx` | Read existing routes + UI component APIs |

Then UPDATE:
- `src/components/layout/app-navbar.tsx` — add nav link

## Rules

- `.js` extensions on ALL backend imports (ESM)
- snake_case for API fields, camelCase for TypeScript
- Read `src/components/ui/dialog.tsx` before using Dialog — use actual exported API
- Read `src/components/ui/badge.tsx` before using Badge variants
- Do NOT modify existing entities — only ADD new ones
- Do NOT use `<Button asChild>` with TanStack Router `<Link>` — Radix Slot and Router Link
  are incompatible (`React.Children.only` error). Wrap `<Button>` inside `<Link>` instead.

## Zustand Store Pattern (CRITICAL — prevents navigation flicker)

Every entity store MUST include an `initialized` flag. On first fetch, `loading` is set to `true`
so skeletons show. On subsequent fetches (re-navigation), `loading` stays `false` so existing
data remains visible while refreshing in the background.

```typescript
interface EntityState {
  items: Entity[];
  loading: boolean;
  initialized: boolean;  // <-- required
  fetchItems: (reset?: boolean) => Promise<void>;
}

export const useEntityStore = create<EntityState>((set, get) => ({
  items: [],
  loading: false,
  initialized: false,

  fetchItems: async (reset = false) => {
    const state = get();
    if (state.loading) return;
    // Only show loading skeleton on first fetch, not on re-navigation
    set({ loading: !state.initialized });
    try {
      const result = await EntityService.list(...);
      set({ items: result.items, initialized: true });
    } finally {
      set({ loading: false });
    }
  },
}));
```

This prevents the "screen flicker" when switching between tabs — Zustand stores persist
outside the React tree, so data survives component unmount/remount.

## Acceptance Criteria

- [ ] All 11 backend files + 6 frontend files created
- [ ] container.ts and memory/index.ts updated
- [ ] Navbar updated with new link
- [ ] Zustand stores include `initialized` flag (no flicker on tab switch)
- [ ] `pnpm build` passes in both packages
