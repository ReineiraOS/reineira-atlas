---
name: scaffold-landing
description: 'Copy anonymized landing template and populate content from brief.md'
agent: _builder
argument-hint: '<venture-name>'
---

# /scaffold-landing — Set Up Landing Page

## What It Does

1. Copy `../reineira-atlas/.claude/templates/landing/` → `../<venture-name>/packages/landing/`
2. Populate `packages/landing/src/content/site.ts` from `brief.md` — only sections that exist
   in the brief are filled; unfilled sections render nothing
3. Apply Branding (accent color, fonts, favicon initial) into `site.branding`
4. Assemble `site.header.nav` and `site.footer.groups` from the subset of pages that actually
   have data (no dangling links)
5. If the brief contains unique themes not covered by standard pages, create a custom page
   at `site.customPages[]` (routes resolve under `/p/<slug>/`)
6. Update `package.json` name to `@<venture-name>/landing`

## How

```bash
rsync -a --exclude='node_modules' --exclude='.next' \
  ../reineira-atlas/.claude/templates/landing/ \
  ../<venture-name>/packages/landing/
```

Then use Read on `brief.md` and Edit on `packages/landing/src/content/site.ts`.

### Content rule

- Section in brief → fill `site.home.<section>` / `site.pages.<page>`
- Section not in brief → leave as `null` / empty array (component returns `null`, navigation
  hides the link)
- Never invent content. Never leave a placeholder. If you cannot fill it from brief, skip it.

### Mapping brief.md → site.ts

| brief.md section | site.ts target |
|---|---|
| Identity → venture_name | `meta.brandName`, `branding.faviconInitial` (first letter) |
| Identity → one-liner | `meta.description`, `home.hero.subtitle` |
| Problem | `home.problem` (eyebrow "Problem", title = sharp restatement, body = 2-3 sentences) |
| Product → features | `home.features` (max 5, first is hero feature) |
| Product → user flow | `home.howItWorks` (3-5 steps) |
| Metrics (new) | `home.metrics` (3-5 items, mono values like "$12M GMV") |
| Protocol Flow (new) | `home.protocolFlow` (3-5 steps, protocol-level mechanics) |
| Business Model (new) | `home.businessModel` rows (segment / fee / volume / notes) |
| Five-Year Arc (new) | `home.fiveYearArc` items |
| Competitive Advantage (new) | `home.competitiveAdvantage` items (claim/proof pairs) |
| Business → segments | `pages.business` (only if brief articulates enterprise-specific angle) |
| Product → mobile/SDK | `pages.mobile` (only if brief mentions it) |
| Business → pricing | `pages.pricing` (only if brief has pricing model) |
| Team → contacts | `pages.contact` (only if email/social provided) |
| Legal content | `pages.privacy` / `pages.terms` — if no legal copy in brief, leave null |
| Unique theme | `customPages[]` — slug in kebab-case, up to 2 sheets |
| Branding section | `branding.accent` (hex), `branding.fontSans`, `branding.fontMono` |

### Design rules

- **No photos.** Features use default `DEFAULT_GRADIENTS` array (leave `feature.gradient: null`).
- **Icons optional.** Only set `feature.icon` when the mapping is obvious:
  `escrow → vault`, `FHE/privacy → lock` or `shield-check`, `ML → brain`, `agro → plant`,
  `freight → truck`, `stablecoin → currency`, `dev API → code`, `growth → chart`.
  If unsure, leave icon `null`.
- **Accent color.** Take HEX from brief Branding. Compute soft/border/glow variants by
  rgba(r, g, b, 0.12) / 0.22 / 0.18 respectively.
- **Fonts.** Use what brief specifies. Default `Inter` + `JetBrains Mono` is fine if brief is
  silent.

### Navigation

`site.header.nav` and `site.footer.groups` reflect only active routes. If `pages.mobile === null`,
do not add a "Mobile" link anywhere. Same for all other pages.

Keep top-level nav to ≤5 items. Group by semantic meaning, not by literal page names.

---

## Page structure decision

**Never hardcode a canonical page set.** Decide single-page vs multi-page — and the actual
route names — from the brief. Two ventures with same-size briefs can need different splits
because they have different logical clusters. Follow these five steps before touching `site.ts`.

### Step 1 — estimate brief density

Count how many `SectionBlock[]` entries the brief realistically supports, using this mapping:

| Brief artifact | Block |
|---|---|
| Table (feature vs value, tier vs price) | `data-grid` |
| Numbered sequence of steps/phases | `steps` |
| Comparison/matrix across competitors | `comparison` |
| KPI row (numbers with short labels) | `stat-strip` |
| Bulleted list with 2-sentence items | `bullets` |
| Long connected paragraph | `prose` |
| Year/milestone roadmap | `timeline` |
| Contact channels list | `contact` |
| FAQ pairs | `faq` |

### Step 2 — decide single-page vs multi-page

| Estimated blocks | Default decision |
|---|---|
| ≤6 | **Single-page.** Hero + 4-5 blocks + CTA. No `site.pages`. Nav = minimal (2-3 anchors or CTA only). |
| 7–12 | **Single-page with anchor nav.** Anchors point to eyebrow sections. Sticky header + scroll-progress already in template. |
| 13–20 | **Depends on Step 3 clusters.** If ≥3 coherent clusters each ≥4 blocks → split. Otherwise single-page (consider trimming weak blocks). |
| ≥20 | **Almost always split.** Verify clusters in Step 3. |

This matrix is a default, not a rule. Density alone doesn't decide; clusters do.

### Step 3 — find logical clusters in the brief

Walk the brief and group blocks by **meaning**, not form. Clues a group is a real cluster:
- All blocks answer one reader question ("how does it work?", "what does it cost?", "who is this for?", "what's under the hood?", "why you?").
- All blocks target one reader persona (investor / operator / developer / regulator / buyer).
- All blocks form a narrative arc that reads standalone — doesn't require context from another cluster.

A cluster earns a dedicated page only if:
- ≥4 blocks belong to it.
- It has its own hero message — the reader arriving on that route gets a clear "this page is about X" feeling.
- It ends on a CTA that logically leads somewhere next (another page or external action).

If a potential cluster has <4 blocks or can't articulate its own hero — merge it back into home.

### Step 4 — derive route names from the brief

Route names are **not canonical.** They emerge from the cluster's own message.

Examples of how clusters map to names (examples, not a template):

| Cluster theme | Example route names |
|---|---|
| Mechanics, process, verification flow | `/how-it-works`, `/product`, `/protocol`, `/flow` |
| Economics, pricing, market sizing | `/business`, `/pricing`, `/economics` |
| Positioning, competitors, differentiation | `/competitive`, `/why-us` |
| Technical architecture, research | `/technology`, `/research`, `/under-the-hood` |
| Developer-facing integration | `/docs`, `/integrations`, `/api` |
| Regulatory, security, compliance | `/compliance`, `/security`, `/trust` |
| Team, case studies, customers | `/about`, `/case-studies`, `/customers` |
| Calls to partner/invest/participate | `/participate`, `/partners`, `/invest` |

Naming rules:
- **kebab-case**, 1 short word or 2-word compound (e.g. `/how-it-works`, not `/monetization-and-market-analysis`).
- **If the brief names the section explicitly** ("Protocol Layer", "For Builders", "Compliance by Design"), use that name kebab-cased. Don't reinvent.
- **Reflect the cluster's main message**, not the rubric ("business" beats "monetization").
- **Max 4 internal pages + home.**

### Step 5 — assemble pages and nav

For each cluster that earns a page:
1. Write a `hero` with `title` and `subtitle` that state the page's focus (not a copy of home hero).
2. Put the cluster's blocks in `sections: SectionBlock[]`.
3. End with a `cta` block pointing to the next logical page or external action — sequential narrative across routes.

On home (`/`):
- Hero (venture-level pitch)
- 1-2 "what is this" blocks (problem/solution overview, not full depth)
- 1 "how it works" overview block (not the full flow)
- CTA pointing to the most important internal page

Navigation:
- **Header nav:** ≤5 items. Each item = active internal page (`href: '/page'`) OR, at most, 1 anchor on `/`. Primary CTA → page where the actual action lives.
- **Footer groups:** 2–3 groups reflecting the actual page set + legal.
- **Single-page case:** nav items are anchors to real eyebrow'd sections — short, matching real division points.

### Anti-patterns the skill must avoid

- **Empty page** — a route with <3 blocks. Return those blocks to home.
- **Split for split's sake** — if two pages share the same reader and narrative, that's one page.
- **Canonical names unrelated to the brief** — `/how-it-works` for a venture whose brief is actually about compliance.
- **Nav with 8 items** — above 5 is visual noise; group into dropdown or move to footer.

### Record the decision in `design.ts.rationale`

The rationale must explain the structure:

> "Brief has ~18 blocks across 3 clusters (mechanics, economics, positioning). Chose 4-page
> split: `/` (pitch), `/how-it-works` (mechanics), `/economics` (revenue + market), `/why-us`
> (positioning + defensibility). `/how-it-works` used over `/product` because brief's own
> Section 4 is titled 'How It Works'."

Without rationale, future audits can't tell if the split was deliberate or accidental.

### Favicon

Do not ship a Privara favicon. The template includes a generic `public/favicon.svg` that uses
`branding.accent` and `branding.faviconInitial`. If the brief provides a logo file, place it in
`public/` and update `layout.tsx` metadata.icons to point at it.

## Acceptance Criteria

- [ ] `grep -r "Privara\|privara" ../<venture-name>/packages/landing/src/` returns nothing
- [ ] `grep -r "Privara" ../<venture-name>/packages/landing/public/` returns nothing
- [ ] `package.json.name` equals `@<venture-name>/landing`
- [ ] `site.meta.brandName` is set; `site.branding.accent` is a valid hex
- [ ] `site.home.hero` is filled (minimum viable landing)
- [ ] Navigation only lists pages with non-null data in `site.pages`
- [ ] **Page structure decided per the 5-step procedure above; decision written to `design.ts.rationale`**
- [ ] **Route names derived from brief content, not a fixed canon** (check: can the name be traced to a phrase/cluster in the brief?)
- [ ] **No `PageConfig` has <3 sections** (otherwise blocks should live on home)
- [ ] **Every `PageConfig` with sections has its own `hero.title` and `hero.subtitle`** stating that page's focus
- [ ] **Header nav ≤5 items** and no `#anchor` links duplicate routes moved to internal pages
- [ ] **Each page ends with a CTA** pointing to the next logical page or external action
- [ ] **Pre-build typecheck:** `cd ../<venture-name>/packages/landing && pnpm tsc --noEmit` exits 0
- [ ] **Full build:** `cd ../<venture-name>/packages/landing && pnpm install && pnpm build` exits 0 (catches prerender errors that typecheck misses)
- [ ] **Dev smoke:** `pnpm dev` and `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` returns `200`
- [ ] **Each internal page smoke:** `curl localhost:3000/<page>` returns `200` for every active route

## Common failures to watch for

- **`Element type is invalid`** at prerender → server component imported a client-side
  `Context.Provider`. Fix: wrap the Provider usage in a client component (see
  `components/blocks/SectionList.tsx` as the canonical pattern).
- **Static export fails on `[slug]`** → `generateStaticParams` returning empty array without
  `dynamicParams = false`. Fix: if venture has no custom pages, the `_placeholder` slug handler
  in the template already covers this — don't remove it.
- **Phosphor icon crash in server component** → Icon components from `@phosphor-icons/react`
  use React context internally and must be rendered from `'use client'` files only.
