# Reineira Atlas

[![Platform](https://img.shields.io/badge/ReineiraOS-v0.1-blue)](https://reineira.xyz)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Startup operating system for ventures building on ReineiraOS — open settlement infrastructure for
confidential programmable finance.

## What you can do with Atlas

Atlas is a **one-command launcher** for building on ReineiraOS. Fill in a brief, run `/bootstrap`,
and get a working application with backend API, frontend app, strategy docs, and AI agents — all
configured for your venture.

```bash
# 1. Clone atlas
git clone https://github.com/ReineiraOS/reineira-atlas.git
cd reineira-atlas

# 2. Fill in your venture brief
cp test-briefs/freelance-shield.md brief.md   # start from example
# edit brief.md — name, features, entities, branding

# 3. Bootstrap everything (requires Claude Code + platform-modules sibling)
/bootstrap
```

**Output:** a new `../<venture-name>/` directory with:

```
<venture-name>/
├── packages/backend/     ← API with CRUD for your entities (Clean Architecture, Vercel-ready)
├── packages/app/         ← React 19 + ZeroDev frontend with pages for each entity
├── .claude/docs/         ← Strategy, architecture, metrics, compliance — filled from your brief
└── .claude/agents/       ← AI agents configured for your stage and vertical
```

Atlas itself stays clean — it's a reusable template, not modified per venture.

### Granular options

```
/bootstrap                              → full setup (OS + app)
/bootstrap os                           → Phase 1 only (docs, agents, skills)
/bootstrap dev                          → Phase 2 only (scaffold, brand, entities, dashboard)
/bootstrap entity Invoice               → add single entity to existing app
/bootstrap test-briefs/freelance-shield.md  → use specific brief file
```

## The ecosystem

| Repo | What you do there | Platform |
| ---- | ----------------- | -------- |
| **reineira-atlas** (this repo) | Launch the venture — brief → bootstrap → working app | 0.1 |
| [reineira-code](https://github.com/ReineiraOS/reineira-code) | Build smart contracts — resolvers, policies, tests, deploy | 0.1 |
| [platform-modules](https://github.com/ReineiraOS/platform-modules) | App template — backend, platform app, payment link | 0.1 |

## Slash commands

After bootstrap, use these in your venture project with Claude Code:

### Protocol

| Command      | What it does                                   |
| ------------ | ---------------------------------------------- |
| `/resolver`  | Design a condition resolver for escrow release |
| `/policy`    | Design an insurance underwriter policy         |
| `/integrate` | Wire protocol to app end-to-end                |

### Product

| Command         | What it does                                        |
| --------------- | --------------------------------------------------- |
| `/dev-frontend` | Frontend development (React 19 + ZeroDev)           |
| `/dev-backend`  | Backend development (TypeScript, Vercel-ready)      |

### Strategy & Ops

| Command        | What it does                            |
| -------------- | --------------------------------------- |
| `/strategy`    | Strategic analysis and recommendation   |
| `/tokenomics`  | Incentive design and fee structure      |
| `/pitch-prep`  | Prepare materials for fund intro        |
| `/content`     | Write tutorials, blogs, social threads  |
| `/community`   | Community building, developer relations |
| `/compliance`  | Crypto regulatory compliance review     |
| `/weekly-plan` | Weekly sprint review and planning       |

## Structure

```
reineira-atlas/
├── reineira.json          ← Platform version
├── CLAUDE.md              ← Protocol context, ecosystem, tech stack
├── brief.md               ← Your venture brief (fill this in)
├── test-briefs/           ← Example briefs for reference
└── .claude/
    ├── SYSTEM.md          ← Phase, conventions, economy roles
    ├── agents/            ← Agent definitions (12 roles)
    ├── commands/          ← Slash command entry points
    ├── skills/            ← Skill implementations (scaffold, brand, gen-entity, etc.)
    ├── docs/              ← Doc TEMPLATES with {placeholders} (populated in venture project)
    └── data/              ← Data templates (populated in venture project)
```

## Compatibility

| Component        | Requirement             |
| ---------------- | ----------------------- |
| Platform         | ReineiraOS 0.1          |
| Claude Code      | Required                |
| platform-modules | Sibling directory       |
| Node.js          | 18+                     |
| pnpm             | 9+                      |

## License

MIT
