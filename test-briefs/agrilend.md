# Builder Brief — ReineiraOS

## 1. Identity

- **Venture name:** AgriLend
- **One-liner:** Confidential farmland lending with on-chain escrow and parametric crop-loss insurance
- **Domain:** Confidential programmable finance (FHE-encrypted settlement)
- **Protocol:** ReineiraOS on Arbitrum (Fhenix CoFHE)
- **Stage:** MVP

---

## 2. Problem

Title: Farmland credit is slow, offline, and discloses every number.
Body: Agricultural lenders still rely on paper appraisals, on-site inspections and private
spreadsheets. Interest rates are anchored to local brokers rather than the borrower's on-chain
collateral. Existing DeFi rails publish every balance, every repayment, every default. Farms cannot
accept that level of exposure when neighbours, commodity buyers, and regulators read the same
blockchain.

---

## 3. Product

Core features:

1. Confidential term loans secured by tokenised farmland rights
2. Parametric crop-loss cover attached to each loan (price or yield trigger)
3. Underwriter pools funded by LPs, with encrypted risk scores
4. Stablecoin disbursement and repayment, multi-chain via CCTP v2
5. Field-day inspection attestations via Reclaim zkTLS

User flow:
Farmer stakes farmland rights NFT → AgriLend escrow opens an FHE-encrypted loan request → an
underwriter pool evaluates encrypted risk → if cleared, USDC streams to the farmer's wallet →
on harvest, Chainlink prices + UMA attestations settle the loan, coverage triggers on shortfall.

Data entities: Loan, Farmland, UnderwriterPool, CoveragePolicy, Payment, InspectionAttestation.

---

## 4. Business

Revenue model: 0.75% origination on each loan, 1.25% of premium on each policy, 15 bps AUM on
underwriter pools.

Pricing: Flat for farmers; tiered fees for pool operators.

Key metrics: GMV (total loans opened), active loans, coverage purchased, repayment rate, average
ticket, pool APY.

Growth channels: ag-tech accelerators (Farm-ng, Granular), extension offices, regional cooperative
banks, agri conferences (AGCO, World Agri-Tech), Farcaster agri niches.

First 100 users: 20-farm pilot in Spanish olive co-op + 15-farm pilot in Nebraska corn co-op.

---

## 5. Team

- Size: 4-person core team
- Strengths: Solidity, credit risk modelling, agronomy domain
- Gaps: frontend, marketing
- Working style: fortnightly deploy, weekly field call

---

## 6. Constraints

- Budget: seed-funded
- Timeline: testnet MVP by June 2026, Spanish pilot Q4 2026
- Regulatory: MiCA EU, EU Farm-to-Fork reporting, national agri credit rules
- Locked-in: FHE escrow for every loan, stablecoin-agnostic

---

## 7. Branding

- Accent colour: **#2e7d4a** (evergreen)
- Font sans: Inter
- Font mono: JetBrains Mono
- Mode: dark
- Favicon initial: A

---

## 8. Landing Sections

### Hero

- Title: Private credit for farms that pay back on harvest.
- Subtitle: On-chain loans with FHE-encrypted amounts, insured by underwriter pools, settled in
  stablecoins.
- Primary CTA: Open a loan | https://app.agrilend.example
- Secondary CTA: Talk to credit desk | /contact

### Metrics

| Value | Label | Caption |
|---|---|---|
| $18M | Loans opened | On testnet since March 2026 |
| 94% | Repayment rate | Across 62 completed loans |
| 1,240 ha | Farmland staked | 37 farms in pilot |
| 4.2% | Avg coverage premium | Vs 11% typical parametric cover |

### Problem

- Title: Farmland credit is slow, offline, and discloses every number.
- Body: Agricultural lenders still rely on paper appraisals and on-site inspections. Existing
  DeFi rails publish every repayment. Farms cannot accept that exposure.

### Product features

| Title | Description | Icon hint |
|---|---|---|
| FHE-encrypted loans | Principal, rate and repayment schedule are hidden on-chain. | FHE/privacy |
| Parametric crop cover | Coverage triggers on price or yield oracles, no claim forms. | insurance |
| Underwriter pools | LPs earn premium, policy builders earn margin-on-risk. | stack |
| Stablecoin rails | USDC disbursement and repayment, any wallet. | stablecoin |
| Field attestations | Reclaim zkTLS proofs from agronomist portals. | agro |

### How it works

| Step title | Description |
|---|---|
| Stake farmland rights | Tokenise and escrow your farmland NFT. |
| Request a confidential loan | FHE-encrypted principal, term and rate go to underwriter pool. |
| Receive USDC | Pool approves → stablecoin streams to your wallet. |
| Settle at harvest | Oracles mark the price, coverage fires if shortfall. |

### Protocol flow

| Step title | Description |
|---|---|
| Create escrow | ConfidentialEscrow locks NFT with encrypted loan intent. |
| Evaluate risk | IUnderwriterPolicy returns an encrypted risk score in bps. |
| Bind coverage | CoverageManager attaches parametric cover to the escrow. |
| Release funds | USDC streams from the pool to the farmer via CCTP. |
| Close on harvest | Chainlink feed + UMA attestation trigger repayment or payout. |

### Business model

| Segment | Fee | Volume assumption | Notes |
|---|---|---|---|
| Origination | 0.75% | 60-200M GMV year 2 | Charged to farmer |
| Premium | 1.25% of notional | 18-35M coverage year 2 | Underwriter share |
| Pool management | 15 bps AUM | 12M AUM year 2 | Charged to pool operator |
| Cross-chain | 15 bps | — | CCTP bridge surcharge |

### Five-year arc

| Year | Milestone | Target |
|---|---|---|
| Y1 | Spanish + US pilots | 100 loans, $25M GMV |
| Y2 | MiCA CASP license, EU rollout | 1,000 loans, $220M GMV |
| Y3 | Parametric cover marketplace | 10 underwriter pools, $500M AUM |
| Y4 | LATAM and SEA expansion | $1.2B GMV |
| Y5 | Farm credit benchmark rate | $3B GMV, set reference rate |

### Competitive advantage

| Claim | Proof |
|---|---|
| We keep farm balances encrypted end-to-end | FHE on every escrow storage slot |
| We underwrite with explainable policies | Underwriter policy source is open, scored on-chain |
| We settle in the farmer's preferred stablecoin | IFHERC20 supports any wrapped stablecoin |

### FAQ

- Q: Is the loan private to anyone watching Arbitrum?
- A: Yes — principal, rate and schedule are stored as FHE ciphertext. Only the farmer, the pool
  and the resolver can decrypt relevant fields.

- Q: Who pays the gas?
- A: Underwriter pools pay the gas via ERC-2771 meta-transactions. The farmer signs but never
  holds ETH.

- Q: What happens if the oracle feeds disagree?
- A: The policy defines quorum — at least 2 of 3 sources must agree. If they do not, the escrow
  enters UMA dispute and humans settle with encrypted votes.

### Main CTA

- Title: Credit built for harvest, not for headlines.
- Subtitle: Apply for a pilot loan, or underwrite one.
- Primary CTA: Apply for pilot | mailto:pilot@agrilend.example
- Secondary CTA: Underwrite a pool | mailto:capital@agrilend.example

---

## 9. Landing Pages

### /business

- Hero title: Infrastructure for agri lenders.
- Hero subtitle: Deploy loan books, insurance pools and attestation feeds on open protocol rails.
- Segments:
  - Cooperative banks — book confidential loans on behalf of members. Icon: scales
  - Agri trading houses — finance inventory with parametric cover. Icon: truck
  - Impact funds — underwrite pools, earn premium, report privately. Icon: handshake
- Trust stats:
  - $1.8T — global ag credit market
  - 62 — completed loans on testnet
  - 3 — EU co-ops in pilot
- Compliance bullets:
  - MiCA CASP classification in progress (advisor: A&O Shearman)
  - SFDR Article 8 reporting templates for underwriter pools
  - GDPR-compliant data minimisation — we never store PII on-chain

### /contact

- Hero title: Talk to the desk.
- Hero subtitle: We reply within one business day.
- Channels:
  - Label: Credit desk / Value: desk@agrilend.example / href: mailto:desk@agrilend.example / Icon: envelope
  - Label: Underwriter relations / Value: capital@agrilend.example / href: mailto:capital@agrilend.example / Icon: handshake
  - Label: Community / Value: t.me/agrilend / href: https://t.me/agrilend / Icon: telegram
  - Label: Source / Value: github.com/agrilend / href: https://github.com/agrilend / Icon: github

### /privacy

_(standard short privacy notice — generated at build time)_

### /terms

_(standard short terms notice — generated at build time)_

---

## 10. Custom pages

### Page 1

- Slug: compliance
- Label: Compliance
- Hero title: Compliance by design.
- Hero subtitle: How AgriLend meets MiCA, SFDR and national agri credit obligations without
  compromising farmer privacy.
- Sections:
  - text: "Regulatory posture" / body: "AgriLend operates under a MiCA CASP authorisation (in
    review). All stablecoin balances are held by regulated issuers (Circle, Paxos) and bridge
    volume via CCTP v2. We never custody farmer funds — escrows are UUPS upgradeable but have no
    admin withdraw path."
  - cards: "Key frameworks" / items: [
      {title: "MiCA", description: "Crypto-asset service provider rules. SFDR for underwriter pools."},
      {title: "AML/KYC", description: "Per-jurisdiction checks at wallet creation. No PII stored on-chain."},
      {title: "GDPR / UK GDPR", description: "Data minimisation + FHE for sensitive values."},
      {title: "EU Farm-to-Fork", description: "Yield + price attestations auditable without leaking farm identity."}
    ]

---

## 11. Priorities

1. Ship MiCA-friendly underwriter pool policy and publish audit
2. Spanish olive co-op pilot: onboard 20 farms, $8M GMV
3. Open underwriter dashboard for the pool operator side
