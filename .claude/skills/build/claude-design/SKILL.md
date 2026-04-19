---
name: claude-design
description: 'Polish landing design after scaffold: audit brief vs site.ts, pick aesthetic direction, refine tokens, tune composition'
agent: _builder
argument-hint: '<venture-name>'
---

# /claude-design — Polish Landing Design

> Runs **after** `/scaffold-landing`. This is an orchestrator skill — it delegates aesthetic
> decisions to `frontend-design` and token work to `tailwind-design-system`, then applies
> results to the landing's `site.ts`, `globals.css`, and (optionally) `design.ts`.

## What It Does

1. **Content audit** — walk `site.ts` `home.sections[]` and each `pages[slug].sections[]`. For
   every block, verify the content matches the brief's depth. Signal three outcomes per section:
   - `ok` — content is rich enough, structure matches brief
   - `thin` — in brief there is more; pull it in OR convert to a visual form (paragraph → bullets)
   - `weak` — nothing substantial in brief; remove section entirely
2. **Aesthetic direction** — invoke `frontend-design` skill (Skill tool, `skill=frontend-design`).
   Pass: venture domain, one-liner, target audience, existing accent. Receive one BOLD direction
   name (editorial / brutalist / organic / luxury / playful / minimal / industrial) + typography
   pairing + motion guidance.
3. **Design tokens** — invoke `tailwind-design-system` skill (Skill tool,
   `skill=tailwind-design-system`). Pass: accent HEX, chosen direction, dark/light mode. Receive:
   full token scale (50→900 for accent), surface palette, spacing scale, `@theme` block.
4. **Apply tokens** — replace the top `@theme inline` block in `globals.css` with the new token
   set. Keep component-level utility classes untouched.
5. **Composition tuning** — alternate `tone: 'default'` and `tone: 'elevated'` in
   `SectionFrame` usage across home.sections to produce visual rhythm. Avoid 3 consecutive
   default-tone sections.
6. **Record decisions** — write `src/content/design.ts` next to `site.ts`:
   ```ts
   export const design = {
     direction: 'editorial',
     typography: { sans: 'Inter', mono: 'JetBrains Mono', hero: 'display' },
     accent: { hex: '#2e7d4a', scale: { 50: '...', 500: '...', 900: '...' } },
     rationale: 'Agri-finance venture, institutional tone — editorial chosen over brutalist...',
   }
   ```

## How to Invoke Global Skills

Use the native Skill tool:

```
Skill(skill: "frontend-design", args: "
  Venture: {venture_name}
  Domain: {one-liner from brief}
  Audience: {from brief}
  Accent: {HEX from branding}
  Task: choose a BOLD aesthetic direction from the options in your skill doc.
  Return: direction name + 2-sentence rationale + typography pair + motion guidance.
")
```

```
Skill(skill: "tailwind-design-system", args: "
  Accent HEX: {accent}
  Direction: {from previous skill}
  Mode: dark
  Task: generate Tailwind v4 @theme block with full accent scale (50-900),
        surface palette (3 elevation levels), spacing, typography scale.
  Return: the @theme block ready to paste into globals.css.
")
```

## Rules

- **Do not rewrite components.** Only touch `site.ts` (content), `globals.css` (tokens),
  `design.ts` (rationale record). The block primitives stay as-is.
- **Do not invent content.** If the brief has no data for a section, remove that block from
  `home.sections`. Never fabricate text.
- **Keep the bold direction consistent.** If `frontend-design` picks "editorial", every
  decision (typography, spacing, motion) follows. No mixing.
- **Never touch `page.tsx` or primitive components.** Those are stable.
- **Accent fallback.** If brief has no accent HEX, default to `#3b8bff` and pick direction
  "minimal".
- **Dark mode first.** Landing is dark by default unless brief explicitly says otherwise.

## Acceptance Criteria

- [ ] `site.ts` `home.sections[]` has no `thin`/`weak` blocks remaining
- [ ] `globals.css` `@theme inline` block has full accent scale (50-900) matching brief accent
- [ ] `src/content/design.ts` exists with direction + rationale
- [ ] Alternating tone rhythm — no 3 consecutive `default`-tone SectionFrame sections
- [ ] `pnpm build` succeeds, visual smoke test on `pnpm dev` shows coherent aesthetic

## What This Skill Does NOT Do

- Writing new block primitives → already in `components/blocks/`, use those
- Inventing brand identity → that comes from `frontend-design` + brief
- Generating imagery → out of scope for landing v1
- Changing page layout structure → that's `scaffold-landing`'s job
