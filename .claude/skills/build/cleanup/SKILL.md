---
name: cleanup
description: 'Remove sample entities and UI not present in the brief'
agent: _builder
argument-hint: ''
---

# /cleanup — Remove Sample Code

## What It Does

Compares brief.md entities/features with template code. Removes UI components, routes, stores,
and services for sample entities NOT in the brief.

**Always preserved (backend):** escrow, withdrawal, auth, credential, business-profile, fhe, nonce,
webhook, user, balance — these are protocol-level primitives.

**Candidates for removal (frontend only):**
- `src/components/features/transaction-*` — if "transactions" not in brief features
- `src/components/features/withdrawal-*` — if "withdrawals" not in brief features
- `src/components/features/balance-card.*` — if "balance" not in brief features
- `src/stores/transaction-store.*` — matching store
- `src/stores/withdrawal-store.*` — matching store
- `src/services/TransactionService.*` — matching service
- `src/services/WithdrawalService.*` — matching service
- `src/routes/_authenticated/` — remove sample routes not in brief
- Navbar links to removed pages

## How

1. Read brief.md — list all entities and features
2. Scan `src/components/features/`, `src/stores/`, `src/services/`, `src/routes/_authenticated/`
3. For each sample file not matching a brief entity — delete it
4. Update navbar to remove dead links
5. Update route tree if needed

## Acceptance Criteria

- [ ] No UI for entities not mentioned in brief
- [ ] No broken imports (removed components not referenced anywhere)
- [ ] Backend protocol entities untouched
- [ ] Build still passes after cleanup
