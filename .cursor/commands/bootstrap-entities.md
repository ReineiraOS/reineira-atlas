# Bootstrap Phase 3: Generate Entity Vertical Slices

Generate backend + frontend code for each entity defined in the brief.

## Prerequisites

- Phase 2 complete (`PHASE_2_SCAFFOLD=COMPLETE` in pipeline_state.md)
- `brief.md` for entity definitions

## Before Starting

Read these files ONCE from the venture project (not atlas):
- `packages/app/src/components/ui/dialog.tsx` — understand Dialog API
- `packages/backend/src/infrastructure/container.ts` — understand wiring
- `packages/backend/src/infrastructure/repository/memory/index.ts` — understand exports

## For EACH Entity

### Backend (7 files + 2 updates)

Create these files using existing escrow entity as pattern:

- `src/domain/<entity>/model/<entity>.ts` — class with params interface
- `src/domain/<entity>/model/<entity>-status.enum.ts` — status enum
- `src/domain/<entity>/repository/<entity>.repository.ts` — interface
- `src/application/dto/<entity>/create-<entity>.dto.ts` — Zod schema
- `src/application/dto/<entity>/<entity>-response.dto.ts` — response + mapper
- `src/application/use-case/<entity>/create-<entity>.use-case.ts`
- `src/application/use-case/<entity>/get-<entities>.use-case.ts`
- `src/application/use-case/<entity>/get-<entity>-by-id.use-case.ts`
- `src/infrastructure/repository/memory/memory-<entity>.repository.ts`
- `api/v1/<entities>/index.ts` — POST + GET
- `api/v1/<entities>/[id].ts` — GET by ID
- UPDATE `container.ts` — add repo
- UPDATE `memory/index.ts` — add export

### Frontend (5 files + 1 update)

- `src/services/<Entity>Service.ts`
- `src/stores/<entity>-store.ts`
- `src/components/features/<entity>-list.tsx`
- `src/components/features/<entity>-form.tsx`
- `src/routes/_authenticated/<entities>.tsx`
- UPDATE navbar — add link

## Important Rules

- Use `.js` extensions on backend imports
- Use `snake_case` for API fields
- Use Dialog's actual API (title prop, not DialogHeader)
- Batch `container.ts` and `index.ts` updates — one edit per file with all entities
- Keep generated files minimal — no JSDoc, no comments

## After All Entities

Update `pipeline_state.md`:
```
PHASE_3_ENTITIES=COMPLETE
```

## Acceptance Criteria

- [ ] All entities from brief have backend + frontend code
- [ ] container.ts wires all repositories
- [ ] Navbar has links to all entity pages
- [ ] No unused imports or dead code

## Next Step

Tell the user to run `/bootstrap-dashboard` for Phase 4.
