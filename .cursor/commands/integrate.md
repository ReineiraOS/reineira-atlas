# Protocol Integration

Wire protocol contracts to the app end-to-end. Apply to the user's request.

## Before Starting

Read these files:
- `.claude/docs/product/PROTOCOL_INTEGRATION.md` — protocol flow, contract addresses
- `.claude/docs/product/ARCHITECTURE.md` — app architecture

## Process

1. Identify which protocol primitives to integrate (escrow, coverage, CCTP)
2. Plan the integration path: frontend → backend → protocol
3. Write integration code connecting all layers
4. Configure environment variables
5. Test the full flow on Arbitrum Sepolia testnet

## Acceptance Criteria

- [ ] Full flow works on testnet
- [ ] Error states handled at each boundary
- [ ] Environment variables documented
- [ ] No hardcoded contract addresses

## Output

Return: integration code and configuration connecting frontend → backend → protocol.
