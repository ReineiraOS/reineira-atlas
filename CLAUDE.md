# Reineira Atlas — Builder Operating System

> **Start here:** Read @.claude/SYSTEM.md for phase, conventions, and dispatch logic.
>
> Reineira Atlas is the startup operating system for teams building on ReineiraOS — open settlement
> infrastructure for confidential programmable finance.
>
> Last updated: 2026-03-20

## Version

- **Atlas version:** 0.1.0
- **Platform version:** 0.1
- **Version config:** `reineira.json` at project root

Platform version is led by smart contract interfaces. When platform bumps (0.1 → 0.2), breaking
changes in contract interfaces mean this Atlas version may be incompatible. Check MCP for current
platform version before advising on contract patterns.

## Operating System

- **@.claude/SYSTEM.md** — Master config. Phase, conventions, dispatch logic. READ FIRST.
- **@.claude/agents/\_dispatch.md** — Routes prompts to agent chains.
- **@.claude/docs/intelligence/METRICS.md** — KPI dashboard. Check before any recommendation.
- **@.claude/docs/execution/SPRINT_LOG.md** — What was done, what was learned.
- **@.claude/docs/execution/ACTION_ITEMS.md** — Open/closed items.

---

## Ecosystem Repos

| Repo                           | Purpose                                                 | Stack                         |
| ------------------------------ | ------------------------------------------------------- | ----------------------------- |
| **reineira-atlas** (this repo) | Startup OS — strategy, ops, growth, agents              | Markdown + Claude Code agents |
| **reineira-code**              | Smart contract development — resolvers, policies        | Hardhat + Solidity + cofhejs  |
| **platform-modules**           | Plug-and-play app starters — backend, frontend, invoice | See below                     |

### platform-modules

| Module          | Stack                                                       | Purpose                                     |
| --------------- | ----------------------------------------------------------- | ------------------------------------------- |
| `backend/`      | TypeScript + Clean Architecture (Vercel-ready, DB-agnostic) | Backend API                                 |
| `app/`          | Vue 3 + Vite + Pinia + TailwindCSS + ZeroDev                | Platform app (smart accounts, passkeys)     |
| `payment-link/` | Vue 3 + Vite + TailwindCSS + Wagmi + RainbowKit             | Shareable payment link for external parties |

---

## Protocol — ReineiraOS

Confidential settlement infrastructure on Arbitrum using Fhenix CoFHE (Fully Homomorphic
Encryption).

### Contract Addresses

**Do not hardcode addresses.** Query them from the ReineiraOS MCP server or the protocol
documentation at `reineira.xyz/docs/reference/contracts`.

The MCP server provides live contract addresses per network (testnet / mainnet). Agents should use
`mcp__reineira__get_contracts` when they need addresses.

For offline reference, see the deployed contracts page in the web-landing-app docs:
`web-landing-app/src/app/docs/reference/contracts/`

### Plugin System

Builders extend the protocol through two interfaces:

**IConditionResolver** — controls when escrows release funds

```
isConditionMet(escrowId) → bool     // view, called on every redeem
onConditionSet(escrowId, data)      // called once at escrow creation
```

**IUnderwriterPolicy** — evaluates risk and judges disputes (FHE-encrypted)

```
evaluateRisk(escrowId, proof) → euint64    // encrypted risk score 0-10000 bps
judge(coverageId, proof) → ebool           // encrypted dispute verdict
```

### Verification Sources

| Source        | What It Proves                                                | Contract             |
| ------------- | ------------------------------------------------------------- | -------------------- |
| Reclaim zkTLS | HTTPS endpoint returned expected data (PayPal, Stripe, banks) | ReclaimConditionBase |
| Chainlink     | Asset prices, market data                                     | Direct feed reads    |
| UMA Oracle    | Binary/numeric outcome resolution                             | Optimistic Oracle V3 |
| Multi-sig     | N-of-M human approval                                         | Custom resolver      |
| Time lock     | Deadline passed                                               | Custom resolver      |

---

## Builder Journey

```
1. Clone reineira-atlas       → fill brief.md, get your startup OS
2. Clone reineira-code        → build custom resolver/policy for your use case
3. Pick from platform-modules → backend, app, payment-link (or all three)
4. Atlas agents guide you     → /deploy, /integrate, /pitch-prep
```

---

## Tech Stack

### Protocol-level (every builder uses)

- **Contracts:** Solidity ^0.8.24 + Hardhat + cofhejs
- **Encryption:** Fhenix CoFHE (FHE on EVM)
- **Settlement:** Stablecoin-agnostic escrow (IFHERC20) — supports any wrapped stablecoin
- **Cross-chain:** Circle CCTP v2 (USDC cross-chain transfers)
- **Chain:** Arbitrum (L2)

### Module-level (from platform-modules — customizable)

- **Platform app:** Vue 3 + Vite + Pinia + TailwindCSS + ZeroDev (smart accounts, passkeys)
- **Payment link:** Vue 3 + Vite + Wagmi + RainbowKit (external wallet connection)
- **Backend:** TypeScript + Clean Architecture (Vercel-ready, DB-agnostic)
- **Wallet (primary):** ZeroDev — ERC-4337 smart accounts, passkey auth, session keys
- **Wallet (secondary):** Supports any wallet via RainbowKit/WalletConnect
- **Deploy:** Hardhat (contracts), Vercel (apps, fastest path)
- **Tests:** Vitest (frontend), Jest (backend), Hardhat + chai (contracts)

---

## Agent Roles (see .claude/skills/)

| Skill prefix | Domain                                                |
| ------------ | ----------------------------------------------------- |
| `protocol-*` | Smart contract development, resolver/policy design    |
| `product-*`  | Frontend + backend development on platform-modules    |
| `strategy`   | Business model, pricing, tokenomics, roadmap          |
| `growth-*`   | Community, content, partnerships, developer relations |
| `ops`        | Sprint planning, weekly reviews, coordination         |
| `legal`      | Crypto compliance, MiCA, AML/KYC                      |
| `pitch`      | Investor prep, pitch deck, fund intro readiness       |

---

## Strategy Documents

- @.claude/docs/strategy/BUSINESS_MODEL.md — revenue model, pricing, assumptions
- @.claude/docs/strategy/ROADMAP.md — feature phases, go/no-go gates
- @.claude/docs/strategy/TOKENOMICS.md — token design, incentive alignment
- @.claude/docs/execution/SPRINT_LOG.md — what was done, what was learned
- @.claude/docs/execution/ACTION_ITEMS.md — open/closed items
- @.claude/docs/product/ARCHITECTURE.md — tech stack, system diagram
- @.claude/docs/product/PROTOCOL_INTEGRATION.md — how your app connects to ReineiraOS
- @.claude/docs/growth/COMMUNITY_STRATEGY.md — channels, developer relations, first 100 users
- @.claude/docs/intelligence/METRICS.md — KPI dashboard, targets
- @.claude/docs/intelligence/COMPETITIVE_LANDSCAPE.md — competitors, positioning
- @.claude/docs/legal/COMPLIANCE.md — MiCA, AML/KYC, data privacy

---

## Conventions

| Thing        | Convention                         | Example                          |
| ------------ | ---------------------------------- | -------------------------------- |
| Agent files  | `{domain}-{role}.md`               | `protocol-resolver.md`           |
| Doc files    | `SCREAMING_SNAKE.md` in domain dir | `docs/strategy/TOKENOMICS.md`    |
| Skill files  | `{verb}/{noun}/SKILL.md`           | `skills/build/resolver/SKILL.md` |
| Data files   | `YYYY-MM-DD.md` in stream dir      | `data/decisions/2026-03-20.md`   |
| System files | `_prefix.md`                       | `agents/_dispatch.md`            |

### Cross-References

Use `@` syntax: `@doc:STRATEGY`, `@agent:protocol-resolver`, `@skill:deploy`, `@data:decisions`.

---

## Data Flow Rules

1. **Before any recommendation:** Check `docs/intelligence/METRICS.md`
2. **After any strategic change:** Log to `data/decisions/YYYY-MM-DD.md`
3. **After any metric update:** Update `data/metrics/YYYY-MM-DD.md`
4. **Docs are source of truth.** Agents read docs. Only agents update docs.
5. **Data is append-only.** Never edit past entries.
