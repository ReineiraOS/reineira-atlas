# Landing Template — Conventions

> Generated project conventions. Copied into `<venture>/packages/landing/` on `/scaffold-landing`.

## Server / client boundary rules (Next.js App Router)

This template uses Next.js 16 with static export (`output: 'export'`). Mistakes here only show
up at `pnpm build` time (prerender), not at dev-time, so always run a full build before
declaring a task done.

### Rules

1. **`Context.Provider` only from client files.** If you create a React Context to share state,
   you must consume it from a `'use client'` component. Using `<MyContext.Provider>` inside a
   server component (e.g. `page.tsx`, `layout.tsx`) throws `Element type is invalid` at
   prerender. Canonical pattern: extract the Provider loop into a separate client component
   (see `src/components/blocks/SectionList.tsx`).

2. **Phosphor icons are client-only.** `@phosphor-icons/react` uses `createContext` internally.
   Any component that renders an icon must have `'use client'` at the top.

3. **Animation hooks are client-only.** `useInView`, `useReducedMotion`, `useMotionValue`,
   `useScroll` from `framer-motion` — `'use client'` required.

4. **Dynamic routes need `generateStaticParams`.** For `app/[slug]/page.tsx` under
   `output: 'export'`, return at least one entry. When the venture has no custom pages, the
   template returns `[{ slug: '_placeholder' }]` + `dynamicParams = false`. Don't remove that
   unless replacing with real slugs.

5. **Metadata goes in `layout.tsx`, not client pages.** `export const metadata`,
   `export const viewport` — only from server components. Leave `layout.tsx` as server.

### Verify before claiming done

```bash
pnpm tsc --noEmit    # type errors
pnpm build           # prerender errors (THIS catches server/client boundary bugs)
pnpm dev             # runtime check — curl localhost:3000 returns 200
```

## Content conventions

- All content lives in `src/content/site.ts` — do not hardcode strings elsewhere.
- `home.sections: SectionBlock[]` — order matters, section-numbering derived from array index.
- A section with no eyebrow does NOT get a section number.
- Empty arrays / null fields = section doesn't render (condition at block component level).
- `design.ts` is the editorial-only decision record; no `direction` field.

## Page structure is dynamic

The set of internal pages (`site.pages`) and the route names are **decided by
`/scaffold-landing`** based on brief density and logical clusters — not from a fixed
canon. A venture with a compliance-heavy brief gets `/compliance`; a dev-tool gets
`/docs` or `/integrations`; a research protocol may have no `/business` page at all.

**Do not rename routes manually** without updating `design.ts.rationale` to reflect
the new intent. The rationale is the audit trail for why this site has exactly these
pages with exactly these names. Breaking the connection between rationale and routes
makes the next regeneration of the site nondeterministic.

If you need a new page, add it to `site.pages` with ≥3 blocks and its own hero; drop
a one-line note in `design.ts.rationale` explaining the cluster that produced it.

## Brand tokens flow

`src/content/site.ts` `branding.accent` (hex) →
`src/lib/accent-scale.ts` derives 9 shades →
`src/app/layout.tsx` injects `--accent-50` ... `--accent-900` CSS vars into `:root` →
components consume via `var(--accent)` etc.

Change accent in one place (`branding.accent`). Never edit `globals.css` just to recolor.
