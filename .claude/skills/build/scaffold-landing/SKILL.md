---
name: scaffold-landing
description: 'Copy canonical landing template and populate content slots from brief.md'
agent: _builder
argument-hint: '<venture-name>'
---

# /scaffold-landing — Set Up Landing Page (Canonical)

## What It Does

1. Copy `../reineira-atlas/.claude/templates/landing/` → `../<venture-name>/packages/landing/`.
2. Populate `site.ts`:
   - `meta` (brand name, tagline, description, URLs, emails, social, keywords) from brief.
   - `branding.accent` (hex from brief), optional `fontSans`/`fontMono`/`borderRadius`/`borderWidth`.
   - Every `home.*`, `mobile.*`, `business.*`, `pricing.*`, `blog.*`, `contact.*`, `privacy`,
     `terms` slot that the brief supplies.
   - Leave untouched: page set, component sequence, and everything in `src/components/*`,
     `src/app/*`, `src/lib/*`, `globals.css`.
3. Update `package.json.name` to `@<venture-name>/landing`.

## How

```bash
rsync -a --exclude='node_modules' --exclude='.next' --exclude='out' \
  ../reineira-atlas/.claude/templates/landing/ \
  ../<venture-name>/packages/landing/
```

Then Edit only `src/content/site.ts` (and `design.ts` if token-level overrides are needed).

---

## Canonical structure — non-negotiable

| Route | Component sequence |
|---|---|
| `/` | TopBanner → Header → Hero → TrustStats → Products → TrustedBy → ModernTeamsSection → PrivacyInfraSection → ComplianceSection → Blog → PricingPlans → ForWhoSection → FAQ → CTA → Footer |
| `/mobile` | TopBanner → Header → MobileHero → MobileFeatures → HowItWorks → MobileFAQ → MobileCTA → Footer |
| `/business` | TopBanner → BusinessHeader → BusinessHero → ForWhoSection → ModernTeamsSection → PrivacyInfraSection → ComplianceSection → TrustStats → BusinessFAQ → BusinessCTA → Footer |
| `/pricing` | TopBanner → Header → PricingHero → PricingPlans → PricingFeatures → PricingFAQ → Footer |
| `/blog` | TopBanner → Header → BlogHero → BlogGrid → Footer |
| `/contact` | TopBanner → Header → Departments grid → Footer |
| `/privacy`, `/terms` | Header (simple) → `legal-content` markdown → Footer |

**Never** add, remove, reorder, rename, or modify these components. Every venture gets the same
skeleton. Only text, images, and token values differ.

---

## Filling rules

1. **Data present in brief** → populate the matching slot in `site.ts`.
2. **Text missing** → `lorem('headline' | 'subhead' | 'eyebrow' | 'paragraph' | 'item-title' |
   'item-description' | 'cta-label' | 'stat-value' | 'stat-label' | 'faq-question' | 'faq-answer'
   | 'nav-label' | 'brand-name')` from `@/lib/lorem`. Lorem output is bracketed (`[LOREM: ...]`)
   so reviewers can see unfilled slots at a glance.
3. **Image missing** → leave `{ src: null, alt, description }`. Components render
   `<ImagePlaceholder description="..." />` automatically.
4. **Excess content in brief** → **silently ignore**. Do not log to `design.ts.rationale`. Do not
   stretch list slots beyond their schema cardinality. Landing-page conversion beats content
   fidelity (colleague directive: "data overload could create worse results for our customers").

### Mapping brief.md → site.ts

| brief.md field | site.ts target |
|---|---|
| Identity → venture_name | `meta.brandName`, `branding.faviconInitial` (first letter) |
| Identity → one-liner / tagline | `meta.tagline`, `meta.description`, `home.hero.subtitle` |
| Identity → URL | `meta.siteUrl`, `header.primaryCta.href` (app URL) |
| Identity → emails | `meta.email.{support,sales,media,dev}`, `contact.departments[].email` |
| Identity → socials | `meta.social[]`, `footer.social[]` |
| Identity → Twitter handle | `meta.twitterHandle` |
| Problem / narrative | `home.privacyInfra` (ProseSlot) |
| Features | `home.features.items` (max 5), `mobile.features.items` if mobile-specific |
| User flow / steps | `home.howItWorks.steps`, `mobile.howItWorks.steps` |
| Metrics | `home.trustStats.items` (3–4 value/label pairs) |
| Business model | `home.pricing.plans`, `pricing.plans.plans` |
| Pricing tiers | `home.pricing.plans`, `pricing.plans.plans`, `pricing.features.items` |
| For-whom segments | `home.forWho.items`, `business.forWho.items` |
| Compliance claims | `home.compliance.items`, `business.compliance.items` |
| FAQ pairs | `home.faq.items`, `mobile.faq.items`, `pricing.faq.items`, `business.faq.items` |
| Blog-style posts | `home.blog.posts`, `blog.grid.posts` |
| Legal text (privacy/ToS) | `privacy.markdown`, `terms.markdown` (HTML-in-string; each `<section><h2>…</h2><p>…</p></section>`) |
| Branding → accent HEX | `branding.accent` |
| Branding → fonts | `branding.fontSans`, `branding.fontMono` |
| Branding → radii / border | `branding.borderRadius`, `branding.borderWidth` |

### Text fit — UI/UX writing rules

UI slots have fixed visual proportions. Text that does not fit the slot's visual role breaks layout
and hurts conversion. When populating any slot from `brief.md`, apply these rules:

**Hero (`hero.title`, `hero.subtitle`)**
- `hero.title` is a full-width `<h1>` at ~64 px, centered. It should fit 1–2 lines max.
  If the brief supplies a long headline, **rewrite it as a short punchy claim** (4–7 words).
  Example: "Confidential stablecoin payment infrastructure for modern B2B" → "Payments without the paper trail."
- `hero.subtitle` sits below at ~22 px, max-w-2xl. One sentence, two at most.
  If the brief has a paragraph here, **distill it to the single strongest idea**.

**Section titles and subtitles (`title`, `subtitle`, `eyebrow`)**
- `eyebrow` is a small uppercase badge — one short noun phrase, no verbs.
- `title` should be a tight claim or question, not a description. Rewrite verbose headlines.
- `subtitle` is one sentence. If you have two ideas, pick the more powerful one.

**Cards and list items (`items[].title`, `items[].description`)**
- Cards sit side-by-side in a grid. Their body text must be visually even across all cards —
  if one description is three times longer than the others, **shorten it to match**.
- `items[].title` is a label, not a sentence — 2–4 words.
- `items[].description` is one sentence. Write it as a benefit, not a feature list.

**Stats (`items[].value`, `items[].label`)**
- `value` must be a compact number/symbol: `"$1B+"`, `"99.9%"`, `"< 2 s"`. Never prose.
- `label` is a short noun phrase below the number — no verbs.

**FAQ, pricing, prose**
- `faq[].answer` — 2–3 sentences max. If longer, cut to the most direct answer.
- `pricing plan.description` — one sentence, outcome-focused.
- `prose paragraphs[]` — each paragraph is one idea. Split or trim rather than run on.

**General principle:** if you find yourself copying text directly from the brief into a UI slot,
stop and ask: *does this read as a UI label or as a document?* If it reads like a document,
rewrite it shorter and sharper before filling the slot.

### Icons

Component `icon` fields are **strings** resolved via `@/lib/icons.ts`. Use whitelisted names:
`ShieldCheck`, `Wallet`, `CurrencyCircleDollar`, `Lightning`, `Code`, `Monitor`, `DeviceMobile`,
`Article`, `EnvelopeSimple`, `BookOpen`, `GithubLogo`, `Browser`, `Users`, `Buildings`,
`ChartLine`, `Handshake`, `Briefcase`, `Globe`, `User`, `Lifebuoy`, `Check`, `Scales`,
`ClipboardText`, `Lock`, `Fingerprint`, `Info`, `Circle`.

If no close match → leave `icon: undefined` (renders `Circle` fallback). Do not add new icon
imports to components.

### Favicon

Template ships with generic `public/favicon.svg`. `branding.faviconInitial` drives the text-based
`Logo` component (first letter of brand). If the brief supplies a real logo, drop it into
`public/` and update `app/layout.tsx` metadata.icons.

---

## Acceptance Criteria

- [ ] `grep -r "Privara\|privara\|PrivaraXYZ\|privara\.xyz" ../<venture-name>/packages/landing/src/` returns nothing.
- [ ] `package.json.name` equals `@<venture-name>/landing`.
- [ ] `site.meta.brandName` and `site.branding.accent` are set to brief values.
- [ ] `site.home.hero.{title,subtitle,primaryCta}` are populated.
- [ ] No component file under `src/components/*` or `src/app/*` was edited (only `site.ts`,
      `design.ts`, `package.json`).
- [ ] **Pre-build typecheck:** `cd ../<venture-name>/packages/landing && pnpm tsc --noEmit` exits 0.
- [ ] **Build:** `pnpm install && pnpm build` exits 0.
- [ ] **Dev smoke:** `pnpm dev` and `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`
      returns `200`.
- [ ] **Every route smoke:** `curl localhost:3000/{,mobile/,business/,pricing/,blog/,contact/,privacy/,terms/}`
      each returns `200`.
- [ ] **Token swap test:** temporarily change `site.branding.accent` to a different hex
      (e.g. `#2e7d4a`), rebuild, confirm accent-colored elements re-color with no layout change.

## Common failures

- **`Element type is invalid`** at prerender → a server component imported a client-side
  `Context.Provider`. Fix: ensure any Provider use happens inside a `'use client'` file.
- **Phosphor icon crash** → component using an icon without `'use client'`. All pages in this
  template are already client-marked where they render icons. Do not touch.
- **Static export fails on `[slug]`** → `generateStaticParams` returning an empty array without
  `dynamicParams = false`. The `_placeholder` fallback in `/blog/[slug]/page.tsx` covers this —
  don't remove it.

## What this skill does NOT do

- Add, remove, rename, or reorder pages or components.
- Invent new components or sections to accommodate extra brief content.
- Log "dropped content" in `design.ts.rationale`.
- Edit files outside `src/content/site.ts`, `src/content/design.ts`, `package.json`, `public/`
  (when replacing favicon / adding real images).
