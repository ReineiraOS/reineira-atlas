---
name: scaffold
description: 'Copy platform-modules template and rebrand all files for the venture'
agent: _builder
argument-hint: '<venture-name>'
---

# /scaffold — Copy & Rebrand Template

## What It Does

1. Copy `../platform-modules/` → `../<venture-name>/` (excluding node_modules, .git)
2. Rebrand ALL identity files:
   - Root `package.json` — name, description
   - Root `reineira.json` — name, description, type: "venture"
   - `packages/backend/package.json` — name to `@<venture-name>/backend`
   - `packages/app/package.json` — name to `@<venture-name>/app`
   - `CLAUDE.md` — update title, description, venture name throughout
   - `README.md` — update title, description
3. Update `packages/app/index.html` — `<title>` tag with venture display name
4. Update `packages/app/src/App.tsx` — add `defaultPreload: 'intent'` to `createRouter()` config
   (prevents screen flicker on tab navigation)
5. Run `pnpm install` in the new directory

## How

```bash
rsync -a --exclude='node_modules' --exclude='.git' ../platform-modules/ ../<venture-name>/
```

Then use Edit tool to find-and-replace all branding references.

## Acceptance Criteria

- [ ] No reference to "platform-modules", "Reineira Modules", or "@reineira-os/modules" remains
- [ ] All package.json names use `@<venture-name>/` prefix
- [ ] `pnpm install` succeeds
