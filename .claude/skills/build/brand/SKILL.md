---
name: brand
description: 'Apply color palette, typography, logo, and visual branding from brief'
agent: _builder
argument-hint: ''
---

# /brand — Apply Visual Branding

## What It Does

Reads Section 8 (Branding) from `brief.md` and applies to the venture's app:

1. **CSS Variables** — update `packages/app/src/styles/main.css` (or equivalent) with:
   - `--color-primary`, `--color-secondary`, `--color-accent`
   - `--color-background`, `--color-surface`
   - `--color-success`, `--color-error`, `--color-warning`
   - `--border-radius` (from brief)
   - `--font-family` (from brief)
2. **Tailwind Config** — extend theme with brief colors if using tailwind.config
3. **Dark/Light Mode** — set default mode from brief
4. **App Title** — navbar, browser tab, meta tags
5. **Tagline** — login/welcome screen if exists
6. **Logo** — copy logo file to `public/` and reference in navbar

## How

Read brief.md Section 8. Read existing CSS/config files. Edit CSS custom properties.

## Acceptance Criteria

- [ ] App uses brief's color palette (no default blue/purple from template)
- [ ] Font family matches brief
- [ ] Dark/light mode matches brief preference
- [ ] App name appears in navbar and browser tab
