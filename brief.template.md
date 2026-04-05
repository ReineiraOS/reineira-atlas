# Builder Brief — ReineiraOS

> Pre-populated for teams building on ReineiraOS. Customize each section for YOUR venture. The
> starter agent reads this to generate your `.claude/` operating system — agents, docs, skills,
> data. Delete the guidance comments when you're done.

---

## 1. Identity

- **Venture name:** _Your Venture Name_
- **One-liner:** _e.g., Confidential cross-border payments for freelancers, built on ReineiraOS_
- **Domain:** Confidential programmable finance (FHE-encrypted settlement)
- **Protocol:** ReineiraOS on Arbitrum (Fhenix CoFHE)
- **Stage:** idea | MVP | launched | growing | scaling

<!-- Replace the placeholders above with your venture details.
     The domain and protocol are pre-filled — you're building on ReineiraOS. -->

---

## 2. Problem

<!-- What's broken today? Who suffers? What's your unfair advantage?

Example:
- Freelancers lose 5-8% on cross-border payments (FX + fees + delays)
- Existing crypto rails expose transaction amounts publicly
- Our edge: FHE-encrypted escrows settle in USDC with full privacy, and
  zkTLS proofs verify PayPal/Stripe receipts without exposing account data -->

---

## 3. Product

**Core features** (order by priority):

1.
2.
3.
4.
5.

<!-- Examples:
1. Confidential invoice payments with escrow release on proof of delivery
2. Multi-sig approval flow for team treasury management
3. Insurance-backed transactions with automated dispute resolution -->

**User flow:**

<!-- e.g., Merchant creates invoice → buyer funds escrow (FHE-encrypted)
     → buyer submits delivery proof via zkTLS → escrow releases → USDC arrives -->

**Tech stack** (pre-filled — adjust if needed):

- **Smart contracts:** Solidity ^0.8.24 on Arbitrum Sepolia (via `reineira-code`)
- **Frontend:** Vue 3 + TypeScript + Vite + Pinia + TailwindCSS (via `platform-modules/app`)
- **Payment link:** Vue 3 + Wagmi + RainbowKit (via `platform-modules/payment-link`)
- **Backend:** TypeScript + Clean Architecture, DB-agnostic (via `platform-modules/backend`)
- **Wallet (primary):** ZeroDev — ERC-4337 smart accounts, passkey auth
- **Wallet (external):** Any wallet via RainbowKit/WalletConnect (payment-link app)
- **Encryption:** Fhenix CoFHE (FHE on-chain), cofhejs SDK
- **Settlement:** Stablecoin-agnostic (IFHERC20) — supports any wrapped stablecoin
- **Cross-chain:** CCTP v2 (USDC cross-chain transfers)
- **Verification:** Reclaim Protocol (zkTLS), Chainlink oracles, UMA Optimistic Oracle
- **Deploy:** Hardhat (contracts), Vercel (apps — fastest path)

**Key integrations:**

- ReineiraOS ConfidentialEscrow contract
- ReineiraOS ConfidentialCoverageManager (insurance)
- ZeroDev smart accounts (primary wallet)
- Any wallet via RainbowKit/WalletConnect (payment-link)
- Reclaim Protocol zkTLS proofs
- Chainlink price feeds

**Data entities:**

- Escrows (encrypted: owner, amount, paidAmount, isRedeemed)
- Invoices (merchant, buyer, amount, status, escrow ID)
- Policies (coverage ID, risk score, dispute status)
- Users (wallet, business profile, KYC status)

**What exists already:**

- Protocol contracts deployed on Arbitrum Sepolia (reineira-code)
- Plug-and-play frontend + backend modules (platform-modules)
- SDK for escrow creation and management (@reineira-os/sdk)

---

## 4. Business

**Revenue model** (pick or customize):

<!-- Options:
- Transaction fees on escrow settlements (0.5-1% per release)
- Insurance premiums on covered transactions
- SaaS subscription for premium features
- Marketplace take-rate on P2P commerce volume -->

**Pricing:** _TBD — fill in when ready_

**Key metrics:**

- GMV (Gross Merchandise Volume) through escrows
- Number of active escrows
- Insurance coverage purchased
- Monthly active wallets
- Transaction completion rate
- Average escrow size

**Growth channels:**

<!-- Pick from:
- Developer community (hackathons, ETHGlobal, grants)
- Web3 Twitter / Farcaster / Lens
- Protocol partnerships
- Content marketing (tutorials, case studies)
- Direct outreach to target operators -->

**First 100 users:**

<!-- e.g., Target freelancer communities doing cross-border payments,
     pilot with 10 merchants on testnet, mainnet launch with incentives -->

---

## 5. Team

- **Size:** _e.g., solo founder | 2-person team | small team_
- **Strengths:** _e.g., Solidity, backend, product design_
- **Gaps:** _e.g., marketing, frontend, design_
- **Working style:** _e.g., Ship fast, iterate on feedback_

---

## 6. Constraints

- **Budget:** _bootstrapped | small budget | funded_
- **Timeline:** _e.g., Testnet MVP by April 2026, mainnet by Q3 2026_
- **Regulatory:** MiCA (EU), AML/KYC for fiat ramps, GDPR if EU users
- **Locked-in decisions:**
  - Must build on ReineiraOS protocol (Arbitrum + Fhenix CoFHE)
  - Stablecoin-agnostic settlement (IFHERC20 — any wrapped stablecoin)
  - ZeroDev smart accounts as primary wallet (passkey auth)
  - Smart contracts must be UUPS upgradeable

---

## 7. Priorities

<!-- What are the top 3 things you need to do RIGHT NOW?
1. e.g., Deploy custom condition resolver for our use case
2. e.g., Set up frontend from platform-modules with our branding
3. e.g., Wire escrow creation flow end-to-end -->

1.
2.
3.
