---
name: gen-dashboard
description: 'Generate dashboard page with Recent blocks for each entity from brief'
agent: _builder
argument-hint: ''
---

# /gen-dashboard — Generate Dashboard

## What It Does

Creates or updates the dashboard page with:

1. **Summary cards** — total count per entity (e.g., "12 Invoices", "5 Active Milestones")
2. **Recent blocks** — last 5 items for each entity from brief, with status badges
3. **Quick actions** — "New Invoice", "New Milestone" buttons linking to create dialogs

## How

1. Read brief.md — extract all entities
2. Read existing dashboard route (likely `src/routes/_authenticated/dashboard.tsx` or `index.tsx`)
3. For each entity:
   - Import its store
   - Add a summary Card with count
   - Add a "Recent <Entities>" section showing last 5 items
   - Add a quick action button
4. Fetch data on mount via `useEffect`

## Template

```tsx
// For each entity:
<Card className="p-4">
  <div className="flex items-center justify-between mb-3">
    <h3 className="font-semibold">Recent <Entities></h3>
    <Link to="/<entities>">View all</Link>
  </div>
  {items.slice(0, 5).map(item => (
    <div key={item.public_id} className="flex justify-between py-2 border-b last:border-0">
      <span>{item.<primary_field>}</span>
      <Badge>{item.status}</Badge>
    </div>
  ))}
  {items.length === 0 && <p className="text-muted-foreground text-sm">No <entities> yet</p>}
</Card>
```

## Acceptance Criteria

- [ ] Dashboard shows summary card per entity
- [ ] Each entity has "Recent" block with last 5 items
- [ ] Quick action buttons for creating new entities
- [ ] Data fetches on page load
- [ ] Empty states handled gracefully
