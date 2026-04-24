# Builder Brief — ReineiraOS

## 1. Identity

- **Venture name:** Blindference
- **One-liner:** A private marketplace where ML model owners and compute providers trade inference without revealing prompts or weights
- **Domain:** Confidential programmable finance
- **Protocol:** ReineiraOS on Arbitrum (Fhenix CoFHE)
- **Stage:** idea

---

## 2. Problem

Title: Running an ML model publicly leaks more than it earns.
Body: Every paid inference today leaks either the prompt (to the compute host) or the weights (to
the requester). There is no clean way to pay for model output where both sides stay private.
Existing "private inference" stacks rely on trusted hardware, not math.

---

## 3. Product

Core features:

1. Encrypted inference orders — prompt and weights never leave the FHE boundary
2. ERC-8004 model identity per inference provider, with reputation score
3. Per-inference escrow that releases only if the compute operator proves correctness
4. Revenue split between model owner and compute host, settled in stablecoin
5. Reputation-gated request routing (clients choose by score, not by address)

User flow:
Model owner registers weights (encrypted) → compute operator bonds stake → client sends encrypted
prompt with payment → operator runs inference inside FHE circuit → returns encrypted output →
client decrypts, escrow releases split of funds to model owner + operator.

Data entities: Model, Operator, InferenceOrder, ProofSubmission, ReputationScore.

---

## 4. Business

Revenue model: 2% of every inference payment goes to the protocol; split of 0.5% each from model
owner side and operator side.

Pricing: per-inference (depends on model), free for testnet.

Key metrics: inference volume, avg latency, operator slash rate, active models, client retention.

Growth channels: HuggingFace community, ETHGlobal, AI privacy Twitter, research papers.

First 100 users: AI research groups with confidential datasets (pharma, legal AI).

---

## 5. Team

- Size: solo founder with 2 advisors
- Strengths: cryptography, ML
- Gaps: product, community, sales
- Working style: deep-work weeks, paper-driven

---

## 6. Constraints

- Budget: bootstrapped
- Timeline: testnet by August 2026, mainnet research preview Q1 2027
- Regulatory: EU AI Act, MiCA for payments
- Locked-in: FHE for compute, ERC-8004 for identity

---

## 7. Branding

- Accent colour: **#8b5cf6** (violet)
- Font sans: Inter
- Font mono: JetBrains Mono
- Mode: dark
- Favicon initial: B

---

## 8. Landing Sections

### Hero

- Title: Private inference, with receipts.
- Subtitle: A marketplace where prompts and weights never leave the FHE boundary, and every
  payment settles on chain.
- Primary CTA: Request testnet | mailto:testnet@blindference.example
- Secondary CTA: Read the paper | /p/research

### Metrics

| Value | Label | Caption |
|---|---|---|
| 12 | Registered models | Research preview |
| 4 | Compute operators | Bonded on testnet |
| 38ms | Avg FHE overhead | For 7B-param model forward |

### Problem

- Title: Running an ML model publicly leaks more than it earns.
- Body: Every paid inference today leaks either the prompt or the weights. There is no clean way
  to pay for output where both sides stay private — existing stacks rely on trusted hardware, not
  math.

### Product features

| Title | Description | Icon hint |
|---|---|---|
| FHE inference boundary | Prompt and weights are never in plaintext outside the client. | FHE/privacy |
| ERC-8004 model identity | Each model carries a portable, on-chain identity. | code |
| Per-inference escrow | Operator is paid only when correctness is proven. | escrow |
| Dual revenue split | Model owner + operator settle in the same transaction. | stack |

### How it works

| Step title | Description |
|---|---|
| Register a model | Owner uploads encrypted weights and declares the inference contract. |
| Bond an operator | Operators stake ETH and advertise throughput. |
| Send an encrypted prompt | Client escrows payment, sends ciphertext. |
| Run inside FHE | Operator computes without seeing inputs or weights. |
| Settle | Client decrypts output; escrow splits stablecoin to owner + operator. |

### Protocol flow

| Step title | Description |
|---|---|
| Open inference escrow | ConfidentialEscrow locks client stablecoin. |
| Submit ciphertext prompt | Client posts FHE ciphertext with nonce. |
| Operator computes | FHE circuit runs on encrypted weights and prompt. |
| Proof submission | Operator posts correctness proof to resolver. |
| Resolve and split | Escrow releases split to model owner and operator, updates reputation. |

### Competitive advantage

| Claim | Proof |
|---|---|
| Mathematical privacy, not hardware trust | FHE end-to-end — no TEE assumptions |
| Model identity survives operator churn | ERC-8004 identity persists across operators |
| Private by default, public by choice | Clients may opt to publish outputs, owners cannot |

### FAQ

- Q: Which models does Blindference support?
- A: Testnet supports small transformers (<7B params) and classical ML. Scaling to 70B is
  research-dependent on CoFHE coprocessor throughput.

- Q: Who can read the prompt?
- A: Only the client's local process. Operators only see ciphertext.

- Q: How is correctness verified?
- A: The resolver checks a succinct proof emitted by the FHE circuit. Operators are slashed on
  invalid submissions.

### Main CTA

- Title: Build inference that respects both sides.
- Subtitle: Testnet slots open for research teams with confidential workloads.
- Primary CTA: Request access | mailto:testnet@blindference.example
- Secondary CTA: Read the paper | /p/research

---

## 9. Landing Pages

### /contact

- Hero title: Talk to Blindference.
- Hero subtitle: Testnet access, research collaborations, integrations.
- Channels:
  - Label: Testnet / Value: testnet@blindference.example / href: mailto:testnet@blindference.example / Icon: envelope
  - Label: Research / Value: research@blindference.example / href: mailto:research@blindference.example / Icon: book
  - Label: Source / Value: github.com/blindference / href: https://github.com/blindference / Icon: github

### /privacy

_(standard short privacy notice)_

---

## 10. Custom pages

### Page 1

- Slug: research
- Label: Research
- Hero title: The math behind Blindference.
- Hero subtitle: Our approach to FHE inference, operator slashing, and correctness proofs.
- Sections:
  - text: "One-line thesis" / body: "Privacy and pay-per-inference can coexist if we replace
    trusted hardware with trusted math. Blindference runs inference inside a Fhenix CoFHE
    circuit where neither the operator nor the protocol ever touches plaintext."
  - cards: "Three pillars" / items: [
      {title: "FHE boundary", description: "Prompt and weights stay ciphertext end-to-end."},
      {title: "Correctness proof", description: "Operator emits a proof that the output matches the declared circuit."},
      {title: "Slashing", description: "Invalid proofs cost the operator its bond; model owner is paid."}
    ]
  - steps: "Paper reading order" / items: [
      {title: "FHE inference intro", description: "Why FHE beats TEEs for multi-tenant ML pay-as-you-go."},
      {title: "CoFHE coprocessor", description: "Fhenix's model for keeping latency sane."},
      {title: "ERC-8004 identities", description: "Portable model and operator identities."}
    ]

---

## 11. Priorities

1. Testnet circuit for one 7B model + one classical model
2. Operator slashing contract
3. Research paper v0.2
