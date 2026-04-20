---
name: claude-design
description: 'Token-only design polish for landing: accent scale check, optional font / radius overrides in design.ts'
agent: _builder
argument-hint: '<venture-name>'
---

# /claude-design — Polish Landing Design (tokens-only, canonical structure)

> Runs **after** `/scaffold-landing`. Canonical-structure policy means this skill **only** touches
> the token system — never layout, never component markup, never page set.

## What It Does

1. **Verify `branding.accent`** — ensure it's a valid hex. If not set, abort with error.
2. **Accent scale smoke** — render a test, confirm `--accent`, `--accent-hover`, `--accent-bg`,
   `--accent-border`, `--accent-glow` all render on the page via `accentCssOverrides(hex)` in
   `src/lib/accent-scale.ts`.
3. **Optional token overrides in `design.ts`:**
   - `overrides.borderRadius.{button, block, xl}` — only when brief explicitly requests a
     different radius language (sharper corners, pill vs slab, etc.).
   - `overrides.borderWidth` — only when brief requests a thicker/thinner border aesthetic.
   - `overrides.fontSans` / `overrides.fontMono` — only when brief specifies a non-default font
     stack (the default is the Apple system font stack).
4. **Write a rationale sentence** in `design.ts` explaining any overrides chosen, or stating
   "defaults — brief gave no token-level direction."

## Hard rules — do NOT

- Change the set of pages or the order of components on any page.
- Edit any file under `src/components/*`, `src/app/*`, `src/lib/*`, or `globals.css`.
- Add `showSectionNumbers`, `noiseOpacity`, `accentOrbOpacity`, or any other layout-affecting
  knob to `design.overrides`. Those fields no longer exist in the schema.
- Log "dropped brief content" or otherwise record excess-content decisions.
- Attempt to improve "visual polish" by adding new UI flourishes. Editorial flourishes, if any,
  are inherent to the canonical components and not tunable per-venture.

## Accent hex → token injection

Given `branding.accent = "#168e8e"`:
- `src/lib/accent-scale.ts` `accentCssOverrides(hex)` emits a `:root` block overriding both
  `--accent*` (generic) and `--accent-teal*` (back-compat) names.
- `src/app/layout.tsx` injects this block inline via `<style dangerouslySetInnerHTML>`.
- All components read via `var(--accent-teal)` / `bg-accent-teal` class / etc. — no edits needed.

The 9-step `buildAccentScale()` helper is available for any future component that needs a full
scale; current canonical components use the 6 derived tokens.

## `design.ts` shape

```ts
import type { DesignConfig } from './design'

export const design: DesignConfig = {
  rationale:
    '<venture-name> — canonical structure. Accent #<hex> derived from brief. No token overrides — default Apple font stack, default radii.',
  // overrides: {
  //   borderRadius: { button: '9999px', block: '16px', xl: '28px' },
  //   borderWidth: '1px',
  //   fontSans: '"Inter", sans-serif',
  //   fontMono: '"JetBrains Mono", monospace',
  // },
}
```

## Acceptance Criteria

- [ ] `design.ts` exists with a one-sentence `rationale`.
- [ ] `branding.accent` is a valid hex.
- [ ] `overrides` contains **only** `borderRadius`, `borderWidth`, `fontSans`, `fontMono` (or is
      omitted entirely).
- [ ] `pnpm tsc --noEmit` exits 0.
- [ ] `pnpm build` exits 0.
- [ ] `pnpm dev` responds 200 at `localhost:3000` and on every canonical route.
- [ ] Token swap test: flipping `branding.accent` to a very different hex (e.g. `#2e7d4a`)
      rebuilds with no layout change — only accent-colored elements shift.

## What this skill does NOT do

- Pick page structure (that's `scaffold-landing`'s job, and it's canonical there).
- Edit any component code.
- Fabricate content.
- Add new direction presets or visual treatments.

## Self-containment check

```bash
grep -E "Skill\(" SKILL.md
```

Should return zero matches. No external skill dependencies.
