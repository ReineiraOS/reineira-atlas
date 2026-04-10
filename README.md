# Reineira Atlas

[![Platform](https://img.shields.io/badge/ReineiraOS-v0.1-blue)](https://reineira.xyz)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Startup operating system for ventures building on ReineiraOS — open settlement infrastructure for
confidential programmable finance.

## What you can do with Atlas

Atlas is a **one-command launcher** for building on ReineiraOS. Fill in a brief, run `/bootstrap`,
and get a working application with backend API, frontend app, strategy docs, and AI agents — all
configured for your venture.

## Quick start

### 1. Set up the workspace

```bash
mkdir my-workspace && cd my-workspace

# Clone atlas (this repo) and the app template
git clone https://github.com/ReineiraOS/reineira-atlas.git
git clone https://github.com/ReineiraOS/platform-modules.git

# They must be siblings:
# my-workspace/
# ├── reineira-atlas/
# └── platform-modules/
```

### 2. Create your venture brief

```bash
cd reineira-atlas
cp brief.template.md brief.md
# Edit brief.md — venture name, features, entities, branding
```

See `test-briefs/freelance-shield.md` for a complete example.

### 3. Create external accounts

Before running bootstrap, set up accounts for services used by the app:

| Service | What it's for | Where to sign up | Required? |
| ------- | ------------- | ---------------- | --------- |
| **ZeroDev** | Smart account wallets (passkey auth) | [dashboard.zerodev.app](https://dashboard.zerodev.app) | Yes — get project ID, bundler URL, passkey server URL. Enable **gas sponsorship** in project settings (otherwise users pay gas themselves) |
| **Vercel** | Deploy backend + frontend | [vercel.com](https://vercel.com) | For deploy (not needed for local dev) |
| **Neon** | Postgres database | [neon.tech](https://neon.tech) | For deploy (local dev uses in-memory) |

Optional (protocol-level, needed when wiring escrow flow):

| Service | What it's for | Where to sign up | Required? |
| ------- | ------------- | ---------------- | --------- |
| **QuickNode** | Blockchain webhooks for escrow events | [quicknode.com](https://www.quicknode.com) | When integrating escrow |
| **Reclaim Protocol** | zkTLS proofs (proof of delivery) | [reclaimprotocol.org](https://reclaimprotocol.org) | If using zkTLS verification |

### 4. Bootstrap

Open `reineira-atlas/` in Claude Code, then:

```
/bootstrap
```

**Output:** a new `../my-venture/` directory (name from your brief):

```
my-venture/
├── packages/backend/     ← API with CRUD for your entities (Vercel-ready)
├── packages/app/         ← React 19 + ZeroDev frontend
├── .claude/docs/         ← Strategy, architecture, metrics — filled from brief
└── .claude/agents/       ← AI agents for your stage
```

### 5. Configure environment

```bash
cd ../my-venture

# Backend — only JWT_SECRET is required for local dev
cp packages/backend/.env.example packages/backend/.env
# Set JWT_SECRET (any random 32+ char string)

# Frontend — ZeroDev credentials are required for wallet auth
cp packages/app/.env.example packages/app/.env
# Set VITE_ZERODEV_PROJECT_ID, VITE_ZERODEV_BUNDLER_URL, VITE_ZERODEV_PASSKEY_SERVER_URL
```

### 6. Run locally

```bash
pnpm install
pnpm dev:backend    # http://localhost:3000
pnpm dev:app        # http://localhost:4831
```

### 7. Deploy to Vercel

Both packages are Vercel-ready out of the box:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend (has vercel.json with API rewrites)
cd packages/backend
vercel --prod
# Set env vars in Vercel dashboard: JWT_SECRET, DATABASE_URL (Neon), ALLOWED_ORIGINS

# Deploy frontend
cd ../app
vercel --prod
# Set env vars: VITE_API_BASE_URL (your backend URL), VITE_ZERODEV_* credentials
```

The backend uses Vercel serverless functions (`api/` directory) — no Express/Fastify server needed in production.

## Granular bootstrap options

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
| [platform-modules](https://github.com/ReineiraOS/platform-modules) | App template — backend, platform app | 0.1 |

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

## Using with Cursor IDE

Atlas fully supports Cursor IDE alongside Claude Code. Open `reineira-atlas/` in Cursor and rules
load automatically.

### Bootstrap (phased)

Bootstrap is split into 5 sequential commands for reliability in Cursor:

| Command                | Phase                         |
| ---------------------- | ----------------------------- |
| `/bootstrap`           | Check progress, next step     |
| `/bootstrap-docs`      | Phase 1: Generate OS docs     |
| `/bootstrap-scaffold`  | Phase 2: Scaffold & brand app |
| `/bootstrap-entities`  | Phase 3: Generate entities    |
| `/bootstrap-dashboard` | Phase 4: Build dashboard      |
| `/bootstrap-verify`    | Phase 5: Verify build         |

Run them in order. Each phase creates a checkpoint in `pipeline_state.md`.

### Regular commands

| Command       | What it does                          |
| ------------- | ------------------------------------- |
| `/resolver`   | Design a condition resolver           |
| `/strategy`   | Strategic analysis and recommendation |
| `/integrate`  | Wire protocol to app end-to-end       |
| `/weekly-plan` | Weekly sprint review                 |
| `/pitch-prep` | Investor readiness assessment         |
| `/content`    | Create tutorials, blogs, threads      |
| `/compliance` | Crypto regulatory review              |

### How it works

- `.cursor/rules/00-system.mdc` loads automatically (project context, protocol, conventions)
- Domain rules (protocol, product, strategy, etc.) activate based on your prompt keywords
- All tools share the same docs in `.claude/docs/` and data in `.claude/data/`

## Structure

```
reineira-atlas/
├── reineira.json          ← Platform version
├── CLAUDE.md              ← Protocol context, ecosystem, tech stack
├── AGENTS.md              ← Cross-tool entry point (Cursor, Zed, etc.)
├── brief.template.md      ← Venture brief template (copy to brief.md)
├── test-briefs/           ← Example briefs for reference
├── .claude/               ← Claude Code config
│   ├── SYSTEM.md          ← Phase, conventions, economy roles
│   ├── agents/            ← Agent definitions (12 roles)
│   ├── commands/          ← Slash command entry points
│   ├── skills/            ← Skill implementations
│   ├── docs/              ← Doc TEMPLATES with {placeholders}
│   └── data/              ← Data templates
└── .cursor/               ← Cursor IDE config
    ├── rules/             ← MDC rules (system + 10 domain rules)
    └── commands/          ← Slash commands (bootstrap phases + 7 regular)
```

## Compatibility

| Component        | Requirement                                              |
| ---------------- | -------------------------------------------------------- |
| Platform         | ReineiraOS 0.1                                           |
| AI Tool          | Claude Code or Cursor IDE                                |
| platform-modules | Sibling directory (`../platform-modules/`)               |
| Node.js          | 18+                                                      |
| pnpm             | 9+                                                       |

## License

MIT
