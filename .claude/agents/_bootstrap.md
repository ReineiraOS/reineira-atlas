---
name: bootstrap
description: 'One-command venture setup: startup OS + working application from brief.md'
tools: [Read, Write, Edit, Bash, Glob, Grep, Agent]
role: system
depends-on: [brief.md]
updates: [agents/*, docs/*, skills/*, data/*]
triggers: ['bootstrap', 'setup', 'initialize', 'start project', 'create venture']
last-reviewed: 2026-04-05
---

# Bootstrap — One Command Setup

> From `brief.md` to startup OS + working application in `../<venture-name>/`.
> Atlas stays clean — all venture artifacts go into the new project directory.

---

## Output Directory

**Everything goes into `../<venture-name>/`** — a sibling directory to atlas.

```
../<venture-name>/
├── packages/backend/       ← API with entity CRUD
├── packages/app/           ← React 19 frontend with pages
├── .claude/docs/           ← Strategy, architecture, metrics (from brief)
├── .claude/agents/         ← AI agents for this venture's stage
├── .claude/data/           ← Decisions, metrics snapshots
└── CLAUDE.md               ← Venture-specific context
```

Atlas (`reineira-atlas/`) is NOT modified. It remains a reusable template.

---

## Prerequisites

1. `brief.md` filled out (venture name, features, entities, branding)
2. `../platform-modules/` exists as sibling directory

---

## Phase 1: Startup OS (_starter)

1. Read `brief.md`
2. Scaffold venture directory first (rsync from platform-modules)
3. Copy `.claude/docs/` templates from atlas → venture project
4. Fill docs with venture-specific content from the brief
5. Generate agent files in venture project's `.claude/agents/`
6. Seed `venture/.claude/data/decisions/` and `data/metrics/`

**Gate:** `../<venture-name>/.claude/docs/product/ARCHITECTURE.md` must be populated.

## Phase 2: Working Application (_builder pipeline)

Execute in the venture project (`../<venture-name>/`):

```
scaffold     — copy template, rebrand (already done in Phase 1)
brand        — apply colors, typography, mode
cleanup      — remove sample UI not in brief
gen-entity   — one entity vertical slice (called per entity)
gen-dashboard — dashboard with Recent blocks
verify       — build, test, report
```

## Phase 3: Summary

```
Bootstrap complete for <Venture Name>!

OS:  ✓ agents  ✓ docs  ✓ skills
App: ✓ entities  ✓ endpoints  ✓ pages  ✓ dashboard  ✓ branding

cd ../<venture-name> && pnpm dev:backend  # port 3000
cd ../<venture-name> && pnpm dev:app      # port 4831
```

---

## Error Handling

- Phase 1 fails → stop. No code gen without docs.
- /scaffold fails → stop.
- /gen-entity fails → fix and retry that entity before next.
- /verify fails → report issues, suggest fixes.

## Update Mode

If `../<venture-name>/` exists: add new entities only, don't overwrite customized code.
