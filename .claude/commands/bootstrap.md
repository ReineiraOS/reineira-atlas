You are the bootstrap agent for ReineiraOS ventures.

Your input: $ARGUMENTS

## Argument Parsing

- No args or brief path → full bootstrap (OS + dev)
- `os` or `os <brief-path>` → Phase 1 only (startup OS)
- `dev` or `dev <brief-path>` → Phase 2 only (working app)
- `entity <EntityName>` → single entity vertical slice
- Path to brief file → use that file instead of `brief.md`

Examples:
```
/bootstrap                              → full bootstrap using brief.md
/bootstrap test-briefs/freelance-shield.md  → full bootstrap using specific brief
/bootstrap os                           → only generate startup OS
/bootstrap dev                          → only generate working app
/bootstrap entity Invoice               → add one entity to existing app
```

## Brief Resolution

If arguments contain a `.md` file path, use that as the brief.
Otherwise use `brief.md` from project root (created by the user from `brief.template.md`).

If `brief.md` does not exist, tell the user:
```
brief.md not found. Create it first:
  cp brief.template.md brief.md
  # then fill in your venture details
```

---

## Phase 1: Startup OS (skip if argument is `dev` or `entity`)

Read the brief, then execute the `_starter.md` process.

**IMPORTANT: All venture-specific artifacts go into `../<venture-name>/`, NOT into atlas.**
Atlas stays as a reusable template with `{placeholder}` docs.

1. Scaffold the venture project first (Phase 2 Step 1) if it doesn't exist yet
2. Copy `.claude/docs/` templates from atlas into `../<venture-name>/.claude/docs/`
3. Fill docs with venture-specific content from the brief
4. Copy relevant agent files into `../<venture-name>/.claude/agents/`
5. Seed `../<venture-name>/.claude/data/decisions/` and `data/metrics/`

---

## Phase 2: Working Application (skip if argument is `os`)

Read the brief. Extract: venture_name (kebab-case), entities, features, branding.

Execute pipeline steps IN ORDER. Each step is compact — do it inline, don't delegate to sub-agents.

### Step 1: Scaffold
```bash
rsync -a --exclude='node_modules' --exclude='.git' ../platform-modules/ ../<venture-name>/
```
Then rebrand — find and replace in these files ONLY:
- `package.json` → name: `@<venture-name>/monorepo`
- `reineira.json` → name: `<venture-name>`, type: `venture`
- `packages/backend/package.json` → name: `@<venture-name>/backend`
- `packages/app/package.json` → name: `@<venture-name>/app`
- `packages/app/index.html` → `<title>` tag
- `CLAUDE.md` → first heading and description
- `README.md` → first heading and description

### Step 1b: Scaffold Landing
```bash
rsync -a --exclude='node_modules' --exclude='.next' \
  ../reineira-atlas/.claude/templates/landing/ \
  ../<venture-name>/packages/landing/
```
Then populate `packages/landing/src/content/site.ts` from the brief. Only fill sections that the
brief actually describes — leave everything else `null` / empty so the component stays hidden.

Minimum fields to populate: `meta.brandName`, `meta.title`, `meta.description`, `branding.accent`
(HEX from brief section 7), `branding.faviconInitial` (first letter of brandName), `home.hero`,
`home.problem` (if brief has problem statement), `home.features` (3-5 items).

Assemble `site.header.nav` and `site.footer.groups` from active pages only. If the brief
describes unique themes not covered by `/business`, `/mobile`, `/pricing`, `/contact`, add them
to `site.customPages[]` (up to 2 extras).

Update `packages/landing/package.json` name to `@<venture-name>/landing`.

See full mapping table in `.claude/skills/build/scaffold-landing/SKILL.md`.

### Step 1c: Polish Landing Design
Run `/claude-design <venture-name>`. This skill audits content (brief vs site.ts), picks a
BOLD aesthetic direction via the global `frontend-design` plugin skill, then extracts a full
Tailwind v4 `@theme` token set via `tailwind-design-system` plugin skill. Applies to
`packages/landing/src/app/globals.css` and records rationale to `packages/landing/src/content/design.ts`.

See `.claude/skills/build/claude-design/SKILL.md`.

### Step 2: Brand
Read Section 7 (Branding) from brief. Edit `packages/app/src/styles/main.css` — replace CSS custom property values:
```css
--color-primary: <from brief>;
--color-secondary: <from brief>;
--color-accent: <from brief>;
--background: <from brief>;
--surface: <from brief>;
```
Update app name in navbar component. Set default theme mode.

### Step 3: Cleanup
Remove frontend files for sample entities NOT in brief. Typical candidates:
- `src/components/features/transaction-*`
- `src/components/features/withdrawal-*`
- `src/components/features/balance-card*`
- `src/stores/transaction-store*`, `withdrawal-store*`
- `src/services/TransactionService*`, `WithdrawalService*`
- Related route files in `src/routes/_authenticated/`

Update navbar — remove links to deleted pages. Keep ALL backend code (protocol primitives).

### Step 4: Gen Entities
For EACH entity in the brief, generate a vertical slice. Before starting, read these files ONCE:
- `packages/app/src/components/ui/dialog.tsx` → understand Dialog API
- `packages/backend/src/infrastructure/container.ts` → understand wiring
- `packages/backend/src/infrastructure/repository/memory/index.ts` → understand exports

Then for each entity, create these files (use the existing escrow entity as pattern):

**Backend (7 files + 2 updates):**
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

**Frontend (5 files + 1 update):**
- `src/services/<Entity>Service.ts`
- `src/stores/<entity>-store.ts`
- `src/components/features/<entity>-list.tsx`
- `src/components/features/<entity>-form.tsx`
- `src/routes/_authenticated/<entities>.tsx`
- UPDATE navbar — add link

Rules: `.js` extensions on backend imports. snake_case API fields. Use Dialog's actual API (title prop, not DialogHeader).

### Step 5: Dashboard
Update dashboard route with:
- Summary card per entity (count + status)
- "Recent" block per entity (last 5 items with Badge)
- Quick action buttons

### Step 6: Verify
```bash
cd ../<venture-name> && pnpm install && pnpm build
```
Check for template remnants:
- `grep -r "reineira-os/modules" --include="*.ts" --include="*.json"`
- `grep -r "Privara\|privara" packages/landing/src/ packages/landing/public/` (landing must be
  free of Privara-branded content)
Report results.

---

## Token Optimization Rules

- Do NOT read platform-modules files for patterns — read from the VENTURE's own codebase (it's a copy)
- Read each reference file ONCE, then generate all entities from memory
- Do NOT generate detail components (entity-detail.tsx) — list + form is enough for MVP
- Keep all generated files minimal — no JSDoc, no comments, no extra type annotations
- Batch container.ts and index.ts updates — do one edit per file with all entities, not one per entity
