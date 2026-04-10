# Bootstrap Phase 5: Verify Build

Run the full build and check for issues.

## Prerequisites

- Phase 4 complete (`PHASE_4_DASHBOARD=COMPLETE` in pipeline_state.md)

## Steps

1. Install dependencies:
   ```bash
   cd ../<venture-name> && pnpm install
   ```

2. Build the project:
   ```bash
   pnpm build
   ```

3. Check for template remnants:
   ```bash
   grep -r "reineira-os/modules" --include="*.ts" --include="*.json"
   grep -r "{from brief}" --include="*.md"
   grep -r "{placeholder}" --include="*.md"
   ```

4. Fix any build errors or template remnants found

5. Update `pipeline_state.md`:
   ```
   PHASE_5_VERIFY=COMPLETE
   ```

## Acceptance Criteria

- [ ] `pnpm install` succeeds
- [ ] `pnpm build` succeeds with no errors
- [ ] No template remnants found
- [ ] All entity routes accessible

## Done!

Tell the user:
- Run `pnpm dev:backend` for backend (port 3000)
- Run `pnpm dev:app` for frontend (port 4831)
- Configure `.env` files (see README.md for required vars)
