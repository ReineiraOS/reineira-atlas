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

Keep top-level nav to 3-4 items max. Group by semantic meaning, not by literal page names.

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
- [ ] **Pre-build typecheck:** `cd ../<venture-name>/packages/landing && pnpm tsc --noEmit` exits 0
- [ ] **Full build:** `cd ../<venture-name>/packages/landing && pnpm install && pnpm build` exits 0 (catches prerender errors that typecheck misses)
- [ ] **Dev smoke:** `pnpm dev` and `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` returns `200`

## Common failures to watch for

- **`Element type is invalid`** at prerender → server component imported a client-side
  `Context.Provider`. Fix: wrap the Provider usage in a client component (see
  `components/blocks/SectionList.tsx` as the canonical pattern).
- **Static export fails on `[slug]`** → `generateStaticParams` returning empty array without
  `dynamicParams = false`. Fix: if venture has no custom pages, the `_placeholder` slug handler
  in the template already covers this — don't remove it.
- **Phosphor icon crash in server component** → Icon components from `@phosphor-icons/react`
  use React context internally and must be rendered from `'use client'` files only.
