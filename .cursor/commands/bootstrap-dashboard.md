# Bootstrap Phase 4: Build Dashboard

Create the dashboard page with entity summaries and quick actions.

## Prerequisites

- Phase 3 complete (`PHASE_3_ENTITIES=COMPLETE` in pipeline_state.md)

## Steps

1. Update the dashboard route (`src/routes/_authenticated/index.tsx`) with:
   - Summary card per entity (count + status breakdown)
   - "Recent" block per entity (last 5 items with Badge component)
   - Quick action buttons (create new entity)
2. Import entity stores and use them for data
3. Follow existing UI patterns (Badge, Card components from `src/components/ui/`)

## After Completion

Update `pipeline_state.md`:
```
PHASE_4_DASHBOARD=COMPLETE
```

## Acceptance Criteria

- [ ] Dashboard shows summary for each entity
- [ ] Recent items displayed with status badges
- [ ] Quick action buttons work
- [ ] Responsive layout

## Next Step

Tell the user to run `/bootstrap-verify` for Phase 5.
