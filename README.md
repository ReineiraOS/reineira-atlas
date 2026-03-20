# Reineira Atlas

[![Platform](https://img.shields.io/badge/ReineiraOS-v0.1-blue)](https://reineira.xyz)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Startup operating system for ventures building on ReineiraOS — open settlement infrastructure for
confidential programmable finance.

> **Platform 0.1** — Compatible with ReineiraOS contracts v0.1. Check `reineira.json` for version
> details.

## What is this?

Atlas is the non-code side of building a venture on ReineiraOS. It provides AI-powered agents for
strategy, operations, growth, compliance, and investor readiness — all tuned for confidential
finance on Arbitrum.

### The ecosystem

| Repo | What you do there | Platform |
| ---- | ----------------- | -------- |
| **reineira-atlas** (this repo) | Run the startup — strategy, ops, growth, compliance, pitch | 0.1 |
| [reineira-code](https://github.com/ReineiraOS/reineira-code) | Build smart contracts — resolvers, policies, tests, deploy | 0.1 |
| [platform-modules](https://github.com/ReineiraOS/platform-modules) | Ship the product — backend, platform app, payment link | 0.1 |

All repos declare their platform compatibility in `reineira.json`. When the platform version bumps
(e.g., 0.1 → 0.2), breaking contract interface changes may require upgrading.

## Setup

```bash
git clone https://github.com/ReineiraOS/reineira-atlas.git
cd reineira-atlas

# 1. Fill in your venture details
#    Edit brief.md

# 2. Run the starter agent
claude "Read .claude/agents/_starter.md then read brief.md and execute the full setup."

# 3. Done — your agent team is ready
```

## Usage

Open in an editor with Claude Code. Use slash commands:

### Protocol

| Command      | What it does                                   |
| ------------ | ---------------------------------------------- |
| `/resolver`  | Design a condition resolver for escrow release |
| `/policy`    | Design an insurance underwriter policy         |
| `/integrate` | Wire protocol to app end-to-end                |

### Product

| Command         | What it does                                   |
| --------------- | ---------------------------------------------- |
| `/dev-frontend` | Frontend development (Vue 3 + ZeroDev)         |
| `/dev-backend`  | Backend development (TypeScript, Vercel-ready) |

### Strategy

| Command       | What it does                          |
| ------------- | ------------------------------------- |
| `/strategy`   | Strategic analysis and recommendation |
| `/tokenomics` | Incentive design and fee structure    |
| `/pitch-prep` | Prepare materials for fund intro      |

### Growth & Operations

| Command        | What it does                            |
| -------------- | --------------------------------------- |
| `/content`     | Write tutorials, blogs, social threads  |
| `/community`   | Community building, developer relations |
| `/compliance`  | Crypto regulatory compliance review     |
| `/weekly-plan` | Weekly sprint review and planning       |

### Example

```
/resolver Design a payment verification resolver using zkTLS proof from Reclaim Protocol
```

## Structure

```
reineira-atlas/
├── reineira.json          ← Platform version + ecosystem links
├── CLAUDE.md              ← Protocol context, ecosystem, tech stack
├── brief.md               ← Your venture brief (customize this)
├── .claude/
│   ├── SYSTEM.md          ← Phase, conventions, economy roles, versioning
│   ├── agents/            ← 12 AI agents (protocol, product, strategy, growth, legal, ops)
│   ├── docs/              ← Strategy, architecture, metrics, compliance templates
│   ├── skills/            ← 12 slash commands
│   └── data/              ← Decisions, metrics, signals (append-only)
```

## Compatibility

| Component        | Requirement             |
| ---------------- | ----------------------- |
| Platform         | ReineiraOS 0.1          |
| Claude Code      | Required for AI agents  |
| reineira-code    | v0.1.x (same platform)  |
| platform-modules | v0.1.x (same platform)  |
| SDK              | @reineira-os/sdk ^0.1.0 |

## Documentation

- [ReineiraOS Docs](https://reineira.xyz/docs)
- [Quick Start](https://reineira.xyz/docs/getting-started/quick-start)
- [Condition Plugins](https://reineira.xyz/docs/develop/condition-plugins)
- [Insurance Policies](https://reineira.xyz/docs/develop/insurance-policies)
- [Telegram](https://t.me/ReineiraOS)

## License

MIT
