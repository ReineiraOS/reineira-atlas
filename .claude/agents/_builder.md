---
name: builder
description: 'Compact orchestrator: reads brief.md, dispatches skills to generate a working app'
tools: [Read, Write, Edit, Bash, Glob, Grep, Agent]
role: system
depends-on: [brief.md]
triggers: ['build app', 'generate app', 'bootstrap code', 'create project']
last-reviewed: 2026-04-05
---

# Builder — Orchestrator

> Reads `brief.md` and dispatches skills to generate a complete application.
> Each step is a separate skill that can also be called independently.

---

## Pipeline

```
/scaffold         → copy platform-modules template (backend + app + landing), rebrand
/populate-landing → fill packages/landing/src/content/site.ts from brief
/claude-design    → polish landing: content audit + aesthetic direction + tokens
/brand            → apply color palette, typography, mode (to app + landing)
/cleanup          → remove sample entities not in brief
/gen-entity       → one entity vertical slice (BE + FE) — called per entity
/gen-dashboard    → dashboard page with Recent blocks per entity
/verify           → build + test + report
```

## Execution

### 1. Parse brief.md

Extract:
- `venture_name` (kebab-case), `display_name`, `tagline`
- `entities[]` — each with name, fields, statuses, operations
- `features[]` — pages and flows
- `branding` — accent hex, typography, border-radius, mode, logo
- `sample_to_remove[]` — entities from template NOT in brief (e.g., transactions, withdrawals UI)
- **Landing-specific fields** (consumed by `/populate-landing`):
  - `hero_title`, `hero_subtitle`, `hero_cta`
  - `metrics[]` — 3-5 pitch KPIs (value/label/caption)
  - `problem` — sharp restatement + 2-3 sentence body
  - `product_features[]` — for home features section
  - `protocol_flow[]` — 3-5 step mechanics
  - `business_model[]` — segment/fee/volume rows
  - `five_year_arc[]` — year/milestone/target
  - `competitive_advantage[]` — claim/proof pairs
  - `contacts` — email, social channels for `/contact`
  - `custom_pages[]` — unique thematic routes (regulatory, research, integrations) if the brief has such content

### 2. Run pipeline

Execute skills in order. Each skill reads brief.md itself for context.

```
1. /scaffold <venture_name>
2. /populate-landing <venture_name>
3. /claude-design <venture_name>
4. /brand
5. /cleanup
6. For each entity in brief:
     /gen-entity <EntityName>
7. /gen-dashboard
8. /verify
```

### 3. Report

Output: what was created, how to run, next steps.

---

## Entity Inference

If brief lists features but no explicit entities, infer:
- "Invoice payments" → Invoice entity
- "Milestone tracking" → Milestone entity
- "Dispute resolution" → Dispute entity

Protocol entities (escrow, withdrawal, auth, credential) are ALWAYS preserved in backend.
Their UI components may be removed by /cleanup if not in the brief's features.

---

## Known Pitfalls

### Navigation flicker
TanStack Router + Zustand stores cause screen flash on tab navigation if:
1. Router has no preloading — fix: `defaultPreload: 'intent'` in `createRouter()` config
2. Stores set `loading: true` on every re-mount — fix: add `initialized` flag, only set
   `loading: true` on first fetch (see gen-entity SKILL.md for the store pattern)

### Button asChild + Link
Do NOT use `<Button asChild><Link to="...">text</Link></Button>` — Radix `Slot` and
TanStack Router `Link` are incompatible (`React.Children.only` error). Use
`<Link to="..."><Button>text</Button></Link>` instead.

---

## What This Agent Does NOT Do

- Design resolvers/policies → `protocol-resolver` / `protocol-policy`
- Wire FHE/SDK calls → `product-integrator`
- Generate smart contracts → `reineira-code`
- Create strategy docs → `_starter`
