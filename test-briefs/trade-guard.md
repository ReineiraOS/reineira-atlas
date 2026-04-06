# Builder Brief — ReineiraOS

---

## 1. Identity

- **Venture name:** TradeGuard
- **One-liner:** Cross-chain trade insurance for B2B commodity deals with FHE-encrypted risk scoring
- **Domain:** Confidential programmable finance (FHE-encrypted settlement)
- **Protocol:** ReineiraOS on Arbitrum (Fhenix CoFHE)
- **Stage:** MVP

---

## 2. Problem

- B2B commodity trades ($5T+ market) rely on letters of credit — slow (2-4 weeks), expensive
  (1.5-3%), paper-heavy
- Trade credit insurance is accessible only to large corporates ($50M+ annual volume)
- Small-medium exporters face 60-90 day payment terms with zero protection
- Insurance underwriters have no way to price risk on-chain without exposing competitive data
- Our edge: FHE-encrypted risk scoring + parametric insurance triggered by shipping proofs, making
  trade insurance accessible to any B2B deal size

---

## 3. Product

**Core features** (order by priority):

1. Trade order creation with escrow-backed payment guarantee
2. Shipment proof submission via zkTLS (track shipping APIs, customs docs)
3. Parametric insurance coverage with FHE-encrypted risk evaluation
4. Automated claim processing when shipment conditions are not met
5. Cross-chain USDC settlement for international trades via CCTP v2

**User flow:**

Exporter creates trade order → Importer funds escrow → Exporter purchases insurance coverage →
Exporter ships goods → submits zkTLS shipment proof → escrow releases on delivery confirmation → If
shipment fails/delayed → exporter files insurance claim → FHE-encrypted dispute evaluation → payout
from insurance pool

**Tech stack** (pre-filled — adjust if needed):

- **Smart contracts:** Solidity ^0.8.24 on Arbitrum Sepolia (via `reineira-code`)
- **Frontend:** React 19 + TypeScript + Vite + Zustand + TanStack Router + TailwindCSS (via
  `platform-modules/app`)
- **Backend:** TypeScript + Clean Architecture, DB-agnostic (via `platform-modules/backend`)
- **Wallet (primary):** ZeroDev — ERC-4337 smart accounts, passkey auth
- **Encryption:** Fhenix CoFHE (FHE on-chain), cofhejs SDK
- **Settlement:** Stablecoin-agnostic (IFHERC20) — supports any wrapped stablecoin
- **Cross-chain:** CCTP v2 (USDC cross-chain transfers)
- **Verification:** Reclaim Protocol (zkTLS) for shipment tracking, Chainlink for commodity prices
- **Deploy:** Hardhat (contracts), Vercel (apps — fastest path)

**Key integrations:**

- ReineiraOS ConfidentialEscrow contract
- ReineiraOS ConfidentialCoverageManager (insurance)
- ReineiraOS PoolFactory (insurance pools)
- ZeroDev smart accounts (primary wallet)
- Reclaim Protocol zkTLS proofs (shipping APIs, customs)
- Chainlink price feeds (commodity pricing)
- CCTP v2 (cross-chain settlement)

**Data entities:**

- TradeOrders (exporter, importer, commodity, quantity, unit price, total, incoterm, status, escrow
  ID)
- ShipmentProofs (trade order ID, carrier, tracking number, proof type, proof URL, verified, status)
- CoveragePolicies (trade order ID, premium, coverage amount, risk score, pool ID, status)
- InsuranceClaims (coverage policy ID, trade order ID, reason, evidence, verdict, payout amount,
  status)
- Escrows (encrypted: owner, amount, paidAmount, isRedeemed) — from protocol
- Users (wallet, business profile, KYC status) — from protocol

**What exists already:**

- Protocol contracts deployed on Arbitrum Sepolia (reineira-code)
- Plug-and-play frontend + backend modules (platform-modules)
- SDK for escrow creation and management (@reineira-os/sdk)

---

## 4. Business

**Revenue model:**

- Insurance premium commission: 15% of premium paid to underwriter pools
- Transaction fee: 0.5% on escrow settlement
- Cross-chain surcharge: 0.2% on CCTP transfers

**Pricing:**

- Insurance: 2-5% of trade value (risk-dependent, FHE-priced)
- Settlement fee: 0.5% flat
- Cross-chain: 0.2% surcharge

**Key metrics:**

- GMV (trade volume) through escrows
- Insurance premiums collected
- Claims ratio (target: <15%)
- Average trade size
- Cross-chain transaction volume
- Active exporters and importers
- Pool TVL (total value locked in insurance pools)

**Growth channels:**

- Trade finance conferences and B2B partnerships
- Freight forwarder and logistics partnerships
- Content marketing (trade finance education)
- Protocol partnerships (Chainlink, Circle)
- Direct outreach to SME exporters

**First 100 users:**

Target small-medium exporters in electronics and textile supply chains. Partner with 2-3 freight
forwarders for shipment tracking integration. Testnet pilot with simulated trades.

---

## 5. Team

- **Size:** small team (3 people)
- **Strengths:** Solidity, trade finance domain, backend
- **Gaps:** frontend design, marketing
- **Working style:** Methodical, compliance-first

---

## 6. Constraints

- **Budget:** small budget (pre-seed)
- **Timeline:** Testnet MVP by June 2026, mainnet by October 2026
- **Regulatory:** MiCA (EU), AML/KYC required, trade finance regulations, sanctions screening
- **Locked-in decisions:**
  - Must build on ReineiraOS protocol (Arbitrum + Fhenix CoFHE)
  - Stablecoin-agnostic settlement (IFHERC20 — any wrapped stablecoin)
  - ZeroDev smart accounts as primary wallet (passkey auth)
  - Smart contracts must be UUPS upgradeable
  - Insurance must use ConfidentialCoverageManager + PoolFactory

---

## 7. Branding

- **App name:** TradeGuard
- **Tagline:** Insure your global trade
- **Colors:**
  - Primary: #0EA5E9
  - Secondary: #0284C7
  - Accent: #F97316
  - Background: #020617
  - Surface: #0F172A
  - Success: #22C55E
  - Error: #DC2626
  - Warning: #EAB308
- **Typography:** Inter
- **Border radius:** 8px
- **Mode:** dark
- **Logo:** (none — use text logo)

---

## 8. Priorities

1. Build trade order + shipment proof CRUD with backend vertical slices
2. Set up frontend with trade dashboard, order creation, shipment tracking
3. Implement insurance coverage flow (coverage policy creation, claim submission)
