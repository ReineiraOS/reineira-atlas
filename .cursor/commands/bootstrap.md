# Bootstrap Orchestrator

Check the current bootstrap progress and guide the user to the next phase.

## Steps

1. Look for `pipeline_state.md` in the venture project root (`../<venture-name>/`)
2. If it doesn't exist, tell the user to start with `/bootstrap-docs`
3. If it exists, read it and report which phases are complete
4. Tell the user which command to run next:

| State | Next Command |
|---|---|
| No pipeline_state.md | `/bootstrap-docs` |
| PHASE_1_DOCS not complete | `/bootstrap-docs` |
| PHASE_2_SCAFFOLD not complete | `/bootstrap-scaffold` |
| PHASE_3_ENTITIES not complete | `/bootstrap-entities` |
| PHASE_4_DASHBOARD not complete | `/bootstrap-dashboard` |
| PHASE_5_VERIFY not complete | `/bootstrap-verify` |
| All complete | Done! Run `pnpm dev` to start |

## Important

- If `brief.md` does not exist, tell the user: `cp brief.template.md brief.md` and fill it in
- The venture project lives at `../<venture-name>/` (name from brief)
- Atlas stays as a reusable template — never modify atlas files during bootstrap
