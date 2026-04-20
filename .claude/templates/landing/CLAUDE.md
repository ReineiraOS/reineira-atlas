# Landing Template — Conventions

> Generated project conventions. Copied into `<venture>/packages/landing/` on `/scaffold-landing`.

## Page structure is canonical — never change it

This template is a **1:1 clone** of the reference landing (`web-landing-app`). The page set,
component sequence, block roles, markup, and animations are **fixed across every venture**.

**What varies per venture:**
- Token system (`branding.accent` → 9-step scale + hover/bg/border variants; `branding.fontSans`
  / `fontMono`; `branding.borderRadius`; `branding.borderWidth`).
- Text content (every string in every slot of `src/content/site.ts`).
- Image URLs (replace `src: null` → real asset, or keep `null` for `[IMAGE PLACEHOLDER]`).

**What never varies:**
- Set of pages (`/`, `/mobile`, `/business`, `/pricing`, `/blog`, `/contact`, `/privacy`,
  `/terms`).
- Order of components on each page.
- Role/goal/markup/animation of each component.
- Component internals (don't edit files in `src/components/*` — edit `site.ts`).

**Missing content** → `lorem(kind)` helper for text, `ImagePlaceholder` for images.
**Excess content in brief** → silently ignore. Data overload hurts conversion.

## Token system

`site.ts` `branding.accent` (hex) →
`src/lib/accent-scale.ts` `accentCssOverrides(hex)` →
`src/app/layout.tsx` injects `<style>` with `--accent*` + `--accent-teal*` (back-compat) →
components consume via `var(--accent)` / `bg-accent-teal` class / etc.

Change accent in one place (`site.branding.accent`). Never edit `globals.css` just to recolor.

## Server / client boundary rules

1. **Context.Provider only from client files.** Prerender fails otherwise.
2. **Phosphor icons are client-only** (`@phosphor-icons/react` uses React context).
3. **Animation hooks from framer-motion are client-only** (`useInView`, `useReducedMotion`, etc.).
4. **Dynamic routes need `generateStaticParams`** for `output: 'export'`. `/blog/[slug]` handles
   this with a `_placeholder` fallback when `site.blog.grid.posts` is empty.
5. **Metadata goes in `layout.tsx`, not client pages.**

## Verify before claiming done

```bash
pnpm tsc --noEmit    # type errors
pnpm build           # prerender errors (catches server/client boundary bugs)
pnpm dev             # runtime check — curl localhost:3000/{,mobile,business,pricing,blog,contact,privacy,terms}
```

## Content conventions

- All content lives in `src/content/site.ts` — do not hardcode strings elsewhere.
- `design.ts` only overrides token-level knobs (borderRadius, borderWidth, fonts). Never adjusts
  layout or structural behavior.
