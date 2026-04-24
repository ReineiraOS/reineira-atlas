# Builder Brief — ReineiraOS

## 1. Identity

- **Venture name:** FreightVault
- **One-liner:** Escrowed freight settlements with confidential pricing and cargo insurance, on any stablecoin
- **Domain:** Confidential programmable finance
- **Protocol:** ReineiraOS on Arbitrum (Fhenix CoFHE)
- **Stage:** MVP

---

## 2. Problem

Title: Freight is settled on trust, late, and in public.
Body: Shippers and carriers still reconcile on emails and PDFs. Factoring companies take 2-4%
for paying early. The few on-chain settlement networks publish every shipment value and
counterparty, which enterprise logistics cannot accept. Cargo insurance is still faxed.

---

## 3. Product

Core features:

1. Per-shipment escrow with confidential invoice amount and payment terms
2. Parametric cargo insurance (delay, damage, total loss) with oracle-fed triggers
3. Instant settlement in USDC/USDT when delivery proof lands
4. Factoring liquidity pool where lenders underwrite shippers at encrypted risk score
5. Multi-chain ports via CCTP v2 (carrier gets paid on their chain of choice)

User flow:
Shipper posts a shipment → carrier accepts → FreightVault escrow opens with FHE-encrypted
amount → at pickup, carrier submits sealed manifest attestation → at delivery, Reclaim zkTLS
proof from TMS unlocks the escrow → USDC settles to carrier.

Data entities: Shipment, Carrier, Shipper, FactoringPosition, InsuranceCover, Event.

---

## 4. Business

Revenue model: 0.65% on settlement, 1.2% of notional on insurance premium, 0.3% on factoring.

Pricing: flat for shippers, volume discounts for TMS integrations.

Key metrics: GMV settled, active shipments, on-time settlement rate, insurance loss ratio,
factoring APY.

Growth channels: TMS partnerships (Project44, FourKites), 3PL forums, freight Twitter,
container alliance hackathons.

First 100 users: 10 mid-size US shippers + 50 owner-operators via a regional TMS partner.

---

## 5. Team

- Size: 3-person team
- Strengths: supply-chain SaaS, Solidity, FHE
- Gaps: enterprise sales, insurance actuarial
- Working style: weekly sprint, monthly shipper demo

---

## 6. Constraints

- Budget: seed
- Timeline: testnet by May 2026, partner pilot Q3 2026
- Regulatory: MiCA EU, US state money transmitter considerations, IMO cargo rules
- Locked-in: stablecoin-agnostic, FHE escrow for every shipment

---

## 7. Branding

- Accent colour: **#e26b1f** (freight orange)
- Font sans: Inter
- Font mono: JetBrains Mono
- Mode: dark
- Favicon initial: F

---

## 8. Landing Sections

### Hero

- Title: Settle freight the moment it arrives.
- Subtitle: Confidential escrows, parametric insurance, stablecoin payout — all in one contract per
  shipment.
- Primary CTA: Open dispatch | https://app.freightvault.example
- Secondary CTA: Talk to ops | /contact

### Metrics

| Value | Label | Caption |
|---|---|---|
| 3,482 | Shipments settled | Since Feb 2026 testnet |
| 97.4% | On-time settlements | Delivery proof → pay in <4h |
| 0.65% | Protocol fee | Vs 2-4% typical factoring |
| $12.4M | Open factoring | Across 3 pools |

### Problem

- Title: Freight is settled on trust, late, and in public.
- Body: Shippers and carriers still reconcile on emails. Existing settlement networks publish
  every shipment value. Enterprise logistics cannot accept that exposure.

### Product features

| Title | Description | Icon hint |
|---|---|---|
| Per-shipment escrow | FHE-encrypted amount, terms, and delivery attestation. | escrow |
| Parametric insurance | Oracles settle delay, damage, and total-loss claims automatically. | insurance |
| Instant stablecoin payout | USDC and USDT land in the carrier wallet on proof of delivery. | stablecoin |
| Encrypted factoring | Pool lenders see risk score, not counterparties. | FHE/privacy |
| Multi-chain port | Carrier chooses Arbitrum, Base, Polygon — we bridge via CCTP. | globe |

### How it works

| Step title | Description |
|---|---|
| Post shipment | Shipper creates a confidential shipment with amount and destination. |
| Carrier accepts | Carrier signs, escrow opens with FHE-encrypted value. |
| Delivery proof | Reclaim zkTLS reads TMS delivery event. |
| Settlement | Stablecoin lands in the carrier's preferred chain within minutes. |

### Protocol flow

| Step title | Description |
|---|---|
| Open escrow | ConfidentialEscrow locks shipper stablecoin with resolver address. |
| Attest pickup | Carrier posts sealed manifest + GPS oracle ping. |
| Attest delivery | zkTLS proof from TMS (Project44, FourKites, McLeod) lands on-chain. |
| Resolve | Condition resolver flips to "met" — escrow releases. |
| Settle + bridge | USDC routes to carrier's target chain via CCTP v2. |

### Business model

| Segment | Fee | Volume assumption | Notes |
|---|---|---|---|
| Settlement | 0.65% | $600M GMV Y2 | Charged to shipper |
| Insurance premium | 1.2% notional | 80M coverage Y2 | Pool operator share |
| Factoring origination | 0.3% | 120M capital Y2 | Charged to pool |
| Cross-chain surcharge | 15 bps | — | CCTP bridge |

### Five-year arc

| Year | Milestone | Target |
|---|---|---|
| Y1 | TMS partner pilot | 10k shipments, $50M GMV |
| Y2 | European expansion | 100k shipments, $600M GMV |
| Y3 | Underwriter marketplace | 6 pools, $200M capacity |
| Y4 | Ocean + air parity | $3B GMV |
| Y5 | Global settlement standard | Set freight payment benchmark |

### Competitive advantage

| Claim | Proof |
|---|---|
| Nobody sees your rate card | FHE-encrypted amount and terms per escrow |
| Carriers are paid the moment delivery proof is read | zkTLS + instant CCTP payout |
| No factoring middleman | Direct pool underwriting, open book |

### FAQ

- Q: What stablecoin can the carrier receive?
- A: Any wrapped stablecoin (IFHERC20). Default is USDC on Arbitrum; the carrier can request a
  bridge to Base, Polygon or Optimism in one click.

- Q: Do you integrate with my TMS?
- A: Native integration with Project44, FourKites, and McLeod. Others supported via Reclaim zkTLS
  in under a day.

- Q: What's the insurance claim process?
- A: Claims are parametric. When the oracle reports delay or damage, the policy fires — no forms,
  no adjuster visits.

### Main CTA

- Title: Stop reconciling. Start settling.
- Subtitle: Open a dispatch today, pay carriers in minutes.
- Primary CTA: Start dispatching | https://app.freightvault.example
- Secondary CTA: Book a demo | https://cal.com/freightvault

---

## 9. Landing Pages

### /business

- Hero title: FreightVault for enterprise logistics.
- Hero subtitle: Settlement, insurance, and factoring on one protocol — integrated with your TMS.
- Segments:
  - Shippers — confidential invoice terms, instant carrier payouts. Icon: stack
  - 3PLs — balance sheet relief via factoring pools. Icon: handshake
  - Insurance brokers — underwrite parametric cover with encrypted loss data. Icon: scales
- Trust stats:
  - 97% — on-time settlement rate
  - 42 — TMS integrations live
  - 11 — enterprise shippers in pilot
- Compliance bullets:
  - IMO-compliant cargo reporting kept off-chain; hash only on-chain
  - MiCA CASP application in Netherlands (Q4 2026)
  - SOC 2 Type I scheduled Q3 2026

### /pricing

- Hero title: Pricing built for ops.
- Hero subtitle: Only pay when cargo lands.
- Plans:
  - name: Starter / price: 0.65% / priceSuffix: per settlement / description: For
    shippers testing one lane. / features: ["Confidential escrow", "Instant USDC payout",
    "Basic parametric cover"] / cta: Start free | /contact
  - name: Growth / price: $199 / priceSuffix: /mo + 0.5% / description: For scale-up
    shippers. / features: ["Everything in Starter", "TMS integrations", "Factoring access",
    "Dedicated ops channel"] / cta: Talk to sales | mailto:sales@freightvault.example / featured: true
  - name: Enterprise / price: Custom / priceSuffix: — / description: For global
    3PLs and brokerage networks. / features: ["Everything in Growth", "Bespoke resolver",
    "Custom insurance pool", "24/7 support"] / cta: Contact ops | mailto:enterprise@freightvault.example

### /contact

- Hero title: Talk to FreightVault.
- Hero subtitle: Shippers, carriers, TMS teams — pick your line.
- Channels:
  - Label: Sales / Value: sales@freightvault.example / href: mailto:sales@freightvault.example / Icon: envelope
  - Label: Operations / Value: ops@freightvault.example / href: mailto:ops@freightvault.example / Icon: truck
  - Label: Community / Value: t.me/freightvault / href: https://t.me/freightvault / Icon: telegram
  - Label: X / Value: @freightvault / href: https://x.com/freightvault / Icon: x

### /privacy

_(standard short privacy notice)_

### /terms

_(standard short terms notice)_

---

## 10. Custom pages

### Page 1

- Slug: integrations
- Label: Integrations
- Hero title: Plug into your TMS in a day.
- Hero subtitle: Native connectors for the TMS platforms your team already uses.
- Sections:
  - cards: "Native integrations" / items: [
      {title: "Project44", description: "Real-time visibility events + rate confirmation webhooks."},
      {title: "FourKites", description: "ETA, dwell time, and delivery events into the escrow resolver."},
      {title: "McLeod LoadMaster", description: "Dispatch, accessorial and delivery docs for on-chain hashes."},
      {title: "MercuryGate", description: "Bespoke connector, two-way status sync."}
    ]
  - text: "zkTLS for anything else" / body: "If your TMS exposes HTTPS, we can read delivery
    events via Reclaim Protocol zkTLS in under a day, without any additional integration work."

---

## 11. Priorities

1. Ship dispatch UI v1 with one TMS partner (Project44)
2. Underwriter dashboard for factoring pool operators
3. MiCA CASP advisor package
