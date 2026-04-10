# Bootstrap Phase 1: Generate Startup OS

Read the venture brief and generate the startup operating system (docs, agents, data).

## Prerequisites

- `brief.md` must exist in atlas root (copy from `brief.template.md`)

## Steps

1. **Read `brief.md`** — extract venture name, stage, priorities, entities, branding, team
2. **Create venture directory** at `../<venture-name>/` if it doesn't exist
3. **Copy `.claude/docs/` templates** from atlas into `../<venture-name>/.claude/docs/`
4. **Fill docs with venture-specific content** from the brief:
   - Replace all `{from brief}` and `{placeholder}` tokens with actual content
   - `BUSINESS_MODEL.md` — revenue streams, pricing, assumptions
   - `ROADMAP.md` — current phase, priorities, phase plan
   - `TOKENOMICS.md` — economy role, fee structure
   - `COMMUNITY_STRATEGY.md` — target audience, channels
   - `COMPETITIVE_LANDSCAPE.md` — competitors, positioning
   - `COMPLIANCE.md` — applicable regulations
   - `METRICS.md` — targets from brief
   - `ARCHITECTURE.md` — entities, tech stack
   - `PROTOCOL_INTEGRATION.md` — which primitives used
   - `SPRINT_LOG.md` — initial entry
   - `ACTION_ITEMS.md` — priorities from brief
5. **Seed data directories:**
   - Create `.claude/data/decisions/` and `.claude/data/metrics/`
6. **Create `pipeline_state.md`** in venture root:
   ```
   PHASE_1_DOCS=COMPLETE
   PHASE_2_SCAFFOLD=PENDING
   PHASE_3_ENTITIES=PENDING
   PHASE_4_DASHBOARD=PENDING
   PHASE_5_VERIFY=PENDING
   ```

## Acceptance Criteria

- [ ] All doc templates populated with venture-specific content
- [ ] No `{placeholder}` tokens remaining in docs
- [ ] pipeline_state.md created with PHASE_1_DOCS=COMPLETE
- [ ] Atlas files NOT modified (only venture project)

## Next Step

Tell the user to run `/bootstrap-scaffold` for Phase 2.
