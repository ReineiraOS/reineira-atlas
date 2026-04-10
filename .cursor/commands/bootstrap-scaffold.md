# Bootstrap Phase 2: Scaffold & Brand

Copy the app template and apply venture branding.

## Prerequisites

- Phase 1 complete (check `pipeline_state.md` for `PHASE_1_DOCS=COMPLETE`)
- `../platform-modules/` must exist as sibling directory
- `brief.md` for branding info

## Steps

### Step 1: Scaffold
```bash
rsync -a --exclude='node_modules' --exclude='.git' ../platform-modules/ ../<venture-name>/
```

### Step 2: Rebrand
Find and replace in these files ONLY:
- `package.json` → name: `@<venture-name>/monorepo`
- `reineira.json` → name: `<venture-name>`, type: `venture`
- `packages/backend/package.json` → name: `@<venture-name>/backend`
- `packages/app/package.json` → name: `@<venture-name>/app`
- `packages/app/index.html` → `<title>` tag
- `CLAUDE.md` → first heading and description
- `README.md` → first heading and description

### Step 3: Brand
Read Section 7 (Branding) from brief. Edit `packages/app/src/styles/main.css`:
```css
--color-primary: <from brief>;
--color-secondary: <from brief>;
--color-accent: <from brief>;
--background: <from brief>;
--surface: <from brief>;
```
Update app name in navbar component. Set default theme mode.

### Step 4: Cleanup
Remove frontend files for sample entities NOT in brief:
- `src/components/features/transaction-*`
- `src/components/features/withdrawal-*`
- `src/stores/transaction-store*`, `withdrawal-store*`
- `src/services/TransactionService*`, `WithdrawalService*`
- Related route files

Update navbar — remove links to deleted pages. Keep ALL backend code.

### Step 5: Update pipeline_state.md
```
PHASE_2_SCAFFOLD=COMPLETE
```

## Acceptance Criteria

- [ ] App template copied and rebranded
- [ ] CSS variables match brief branding
- [ ] Unused sample entities removed from frontend
- [ ] Navbar updated
- [ ] pipeline_state.md updated

## Next Step

Tell the user to run `/bootstrap-entities` for Phase 3.
