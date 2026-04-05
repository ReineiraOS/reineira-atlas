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

> From `brief.md` to startup OS + working application.
> Phase 1: `_starter` (docs, agents, skills). Phase 2: `_builder` (code via pipeline skills).

---

## Prerequisites

1. `brief.md` filled out (venture name, features, entities, branding)
2. `../platform-modules/` exists

---

## Phase 1: Startup OS (_starter)

1. Read `brief.md`
2. Select agent roster by stage
3. Generate docs in `.claude/docs/`
4. Generate skills for selected agents
5. Update `SYSTEM.md` with venture numbers
6. Seed `data/decisions/` and `data/metrics/`

**Gate:** `docs/product/ARCHITECTURE.md` must be populated.

## Phase 2: Working Application (_builder pipeline)

Execute skills in order:

```
/scaffold <venture-name>    — copy template, rebrand
/brand                      — apply colors, typography, mode
/cleanup                    — remove sample UI not in brief
/gen-entity <Entity1>       — first entity vertical slice
/gen-entity <Entity2>       — second entity
/gen-entity <EntityN>       — ...for each entity in brief
/gen-dashboard              — dashboard with Recent blocks
/verify                     — build, test, report
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
