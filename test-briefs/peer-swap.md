# Builder Brief — ReineiraOS

---

## 1. Identity

- **Venture name:** PeerSwap
- **One-liner:** Confidential P2P marketplace with escrow-backed trades and chargeback protection
- **Domain:** Confidential programmable finance (FHE-encrypted settlement)
- **Protocol:** ReineiraOS on Arbitrum (Fhenix CoFHE)
- **Stage:** MVP

---

## 2. Problem

- P2P trading (crypto, gift cards, gaming assets, digital goods) is plagued by scams — buyers pay
  and sellers vanish, or sellers deliver and buyers reverse payments
- Centralized platforms (Paxful, LocalBitcoins) charge 1-5% fees, require KYC for both sides, and
  expose trade amounts publicly
- Existing P2P escrow solutions are either custodial (counterparty risk) or manual (slow dispute
  resolution)
- Sellers of gaming assets and gift cards have no way to prove delivery without exposing account
  credentials
- Our edge: FHE-encrypted escrow keeps trade amounts private, zkTLS proves payment/delivery from
  real platforms (PayPal, Revolut, Steam, Epic, gift card balances) without exposing credentials

---

## 3. Product

**Core features** (order by priority):

1. Trade listing and matching — create buy/sell offers with encrypted amounts
2. Escrow-backed trade execution — funds locked until both sides confirm
3. Proof-of-payment and proof-of-delivery via zkTLS (bank apps, payment platforms, game clients)
4. Automated escrow release when proofs are verified
5. Dispute flow with time-locked resolution and evidence submission

**User flow:**

Seller lists offer → Buyer accepts and funds escrow (FHE-encrypted amount) → Seller delivers
asset/card/crypto → Buyer submits zkTLS proof of receipt OR Seller submits zkTLS proof of delivery →
escrow releases → If disputed → evidence window (48h) → resolution

**Tech stack** (pre-filled — adjust if needed):

- **Smart contracts:** Solidity ^0.8.24 on Arbitrum Sepolia (via `reineira-code`)
- **Frontend:** React 19 + TypeScript + Vite + Zustand + TanStack Router + TailwindCSS (via
  `platform-modules/app`)
- **Backend:** TypeScript + Clean Architecture, DB-agnostic (via `platform-modules/backend`)
- **Wallet (primary):** ZeroDev — ERC-4337 smart accounts, passkey auth
- **Encryption:** Fhenix CoFHE (FHE on-chain), cofhejs SDK
- **Settlement:** Stablecoin-agnostic (IFHERC20) — supports any wrapped stablecoin
- **Cross-chain:** CCTP v2 (USDC cross-chain transfers)
- **Verification:** Reclaim Protocol (zkTLS) for proof of payment/delivery
- **Deploy:** Hardhat (contracts), Vercel (apps — fastest path)

**Key integrations:**

- ReineiraOS ConfidentialEscrow contract
- ZeroDev smart accounts (primary wallet)
- Reclaim Protocol zkTLS proofs (PayPal, Revolut, Steam, Epic, bank apps)

**Data entities:**

- Offers (seller, type, category, title, description, price, currency, payment methods, status)
- Trades (offer ID, buyer, seller, escrow ID, amount, proof type, status)
- Disputes (trade ID, reason, evidence URLs, resolution, status)
- Escrows (encrypted: owner, amount, paidAmount, isRedeemed) — from protocol
- Users (wallet, reputation score, trade count, completion rate) — from protocol

**What exists already:**

- Protocol contracts deployed on Arbitrum Sepolia (reineira-code)
- Plug-and-play frontend + backend modules (platform-modules)
- SDK for escrow creation and management (@reineira-os/sdk)

---

## 4. Business

**Revenue model:**

- Transaction fee: 0.5% on each completed trade
- Premium listings: $9/mo for featured offers and priority matching
- Dispute resolution fee: 1% of trade value (charged to losing party)

**Pricing:** 0.5% per trade, free tier up to $500/mo volume

**Key metrics:**

- GMV (total trade volume) through escrows
- Number of active trades
- Monthly active traders
- Dispute rate (target: <5%)
- Average trade size
- Trade completion rate (target: >95%)

**Growth channels:**

- P2P trading communities (Telegram groups, Discord servers)
- Web3 Twitter / Farcaster
- Gift card and gaming asset forums
- Content marketing (safe P2P trading guides)
- Direct outreach to existing P2P traders

**First 100 users:**

Target existing P2P crypto and gift card traders on Telegram. Pilot with 10 active traders on
testnet. Mainnet launch with zero-fee first month.

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

- **App name:** PeerSwap
- **Tagline:** Trade anything, trust the protocol
- **Colors:**
  - Primary: #8B5CF6
  - Secondary: #6D28D9
  - Accent: #F59E0B
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

1. Build offer listing + trade execution CRUD with backend vertical slices
2. Set up frontend with trade dashboard, offer creation, trade matching
3. Wire escrow creation flow end-to-end (frontend → backend → protocol)
