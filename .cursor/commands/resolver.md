# Condition Resolver Design

Design a condition resolver for escrow release on ReineiraOS. Apply this guidance to the user's request.

## Before Starting

Read `.claude/docs/product/PROTOCOL_INTEGRATION.md` for protocol context.

## Process

1. **Identify the condition** — what must be true for funds to release?
2. **Select verification source** — zkTLS (Reclaim), Chainlink, UMA, multi-sig, or time lock
3. **Design the storage** — what does `onConditionSet` need to store?
4. **Define the check** — what does `isConditionMet` evaluate?
5. **Security review** — replay protection, input validation, gas bounds
6. **Spec the output** — resolver name, struct layout, data encoding

## Acceptance Criteria

- [ ] Design matches the venture's use case
- [ ] Verification source selected and justified
- [ ] Security checklist addressed
- [ ] Data encoding specified for resolverData
- [ ] Builder knows where to implement (reineira-code)

## Output

Return: resolver specification with interface, storage, condition logic, and implementation path in reineira-code.
