# Builder Brief — ReineiraOS

---

## 1. Identity

- **Venture name:** InvoiceShield
- **One-liner:** Confidential milestone-based invoicing with escrow settlement and chargeback protection
- **Domain:** Confidential programmable finance (FHE-encrypted settlement)
- **Protocol:** ReineiraOS on Arbitrum (Fhenix CoFHE)
- **Stage:** MVP

---

## 2. Problem

- Service providers lose money to non-paying clients — 29% of freelancers and contractors report unpaid invoices
- Clients fear paying upfront with no guarantee of delivery
- Existing escrow solutions (Escrow.com, PayPal) expose transaction amounts and take 5-8% fees
- Dispute resolution is slow, opaque, and expensive
- Our edge: FHE-encrypted milestone escrows release on zkTLS proof of delivery, with invoice amounts hidden from everyone except the parties involved

---

## 3. Product

**Core features** (order by priority):

1. Milestone-based invoice creation with encrypted amounts
2. Proof-of-delivery via zkTLS (verify GitHub commits, Figma exports, Google Drive uploads)
3. Automated escrow release when milestones are verified
4. Dispute flow with time-locked resolution
5. Provider dashboard with earnings analytics

**User flow:**

Provider creates invoice with milestones → Client funds escrow (FHE-encrypted total) → Provider completes milestone → submits zkTLS proof → escrow releases milestone amount → repeat until contract complete → Client can dispute within 48h window

**Tech stack** (pre-filled — adjust if needed):

- **Smart contracts:** Solidity ^0.8.24 on Arbitrum Sepolia (via `reineira-code`)
- **Frontend:** React 19 + TypeScript + Vite + Zustand + TanStack Router + TailwindCSS (via `platform-modules/app`)
- **Backend:** TypeScript + Clean Architecture, DB-agnostic (via `platform-modules/backend`)
- **Wallet (primary):** ZeroDev — ERC-4337 smart accounts, passkey auth
- **Encryption:** Fhenix CoFHE (FHE on-chain), cofhejs SDK
- **Settlement:** Stablecoin-agnostic (IFHERC20) — supports any wrapped stablecoin
- **Cross-chain:** CCTP v2 (USDC cross-chain transfers)
- **Verification:** Reclaim Protocol (zkTLS) for proof of delivery
- **Deploy:** Hardhat (contracts), Vercel (apps — fastest path)

**Key integrations:**

- ReineiraOS ConfidentialEscrow contract
- ZeroDev smart accounts (primary wallet)
- Reclaim Protocol zkTLS proofs (GitHub, Figma, Google Drive)

**Data entities:**

- Invoices (provider, client, title, total amount, currency, status, deadline)
- Milestones (invoice ID, title, description, amount, proof type, status, due date)
- Disputes (invoice ID, milestone ID, reason, evidence URL, resolution, status)
- Escrows (encrypted: owner, amount, paidAmount, isRedeemed) — from protocol
- Users (wallet, business profile, KYC status) — from protocol

**What exists already:**

- Protocol contracts deployed on Arbitrum Sepolia (reineira-code)
- Plug-and-play frontend + backend modules (platform-modules)
- SDK for escrow creation and management (@reineira-os/sdk)

---

## 4. Business

**Revenue model:**

- Transaction fee: 1% on each milestone release
- Premium tier: $19/mo for analytics, priority disputes, custom branding

**Pricing:** 1% per milestone release, free tier up to $1,000/mo volume

**Key metrics:**

- GMV (total milestone volume) through escrows
- Number of active contracts
- Monthly active providers
- Dispute rate (target: <3%)
- Average contract size
- Milestone completion rate

**Growth channels:**

- Service provider communities (agencies, freelancer DAOs, contractor networks)
- Web3 Twitter / Farcaster
- Content marketing (tutorials for invoice protection)
- Direct outreach to B2B service providers

**First 100 users:**

Target web3 service providers (dev shops, designers, agencies) doing cross-border work. Pilot with 10 providers on testnet. Mainnet launch with zero-fee first month.

---

## 5. Team

- **Size:** 2-person team
- **Strengths:** Solidity, backend, product
- **Gaps:** marketing, design
- **Working style:** Ship fast, iterate on feedback

---

## 6. Constraints

- **Budget:** bootstrapped
- **Timeline:** Testnet MVP by May 2026, mainnet by August 2026
- **Regulatory:** MiCA (EU), AML/KYC for fiat ramps, GDPR if EU users
- **Locked-in decisions:**
  - Must build on ReineiraOS protocol (Arbitrum + Fhenix CoFHE)
  - Stablecoin-agnostic settlement (IFHERC20 — any wrapped stablecoin)
  - ZeroDev smart accounts as primary wallet (passkey auth)
  - Smart contracts must be UUPS upgradeable

---

## 7. Branding

- **App name:** InvoiceShield
- **Tagline:** Protect every invoice, from milestone to payout
- **Colors:**
  - Primary: #2563EB
  - Secondary: #1E40AF
  - Accent: #10B981
  - Background: #0F172A
  - Surface: #1E293B
  - Success: #10B981
  - Error: #EF4444
  - Warning: #F59E0B
- **Typography:** Inter
- **Border radius:** 12px
- **Mode:** dark
- **Logo:** (none — use text logo)

---

## 8. Priorities

1. Build invoice + milestone CRUD with backend vertical slices
2. Set up frontend with provider dashboard, invoice creation, milestone tracking
3. Wire escrow creation flow end-to-end (frontend → backend → protocol)
