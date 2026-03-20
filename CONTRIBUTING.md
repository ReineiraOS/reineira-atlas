# Contributing to Reineira Atlas

Thank you for your interest in contributing. This document explains how to contribute to
`reineira-atlas`.

## Before You Start

By submitting a contribution, you agree to the [Contributor License Agreement](CLA.md).

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automatic
versioning and changelog generation.

```
feat: add partnership outreach agent
fix: correct metrics dashboard template
docs: update brief.md with new stablecoin guidance
chore: update skill index

BREAKING CHANGE: restructure agent naming from product-* to build-*
```

| Prefix             | Version bump          | When to use                           |
| ------------------ | --------------------- | ------------------------------------- |
| `feat:`            | Minor (0.1.0 → 0.2.0) | New agent, skill, doc template        |
| `fix:`             | Patch (0.1.0 → 0.1.1) | Bug fix, correction                   |
| `docs:`            | No bump               | Documentation only                    |
| `chore:`           | No bump               | Tooling, structure                    |
| `BREAKING CHANGE:` | Major (0.1.0 → 1.0.0) | Agent interface change, platform bump |

## Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/reineira-atlas.git
cd reineira-atlas

# 2. Create a branch
git checkout -b feat/new-agent

# 3. Make changes
# Add agents to .claude/agents/
# Add skills to .claude/skills/
# Add docs to .claude/docs/

# 4. Commit with conventional format
git commit -m "feat: add devops deployment agent"

# 5. Push and open PR
git push origin feat/new-agent
```

## Pull Request Process

1. Use conventional commit messages
2. Update `_dispatch.md` if adding new agents
3. Update `skills/_index.md` if adding new skills
4. Reference any related issues
5. One feature per PR — keep PRs focused

## What to Contribute

- New agent definitions (.claude/agents/)
- New slash command skills (.claude/skills/)
- Doc template improvements (.claude/docs/)
- Brief.md improvements
- Dispatch routing refinements
- Bug fixes in existing agents

## Platform Compatibility

All contributions must be compatible with the platform version declared in `reineira.json`. Agent
guidance must match current protocol interfaces.

## Questions?

- [Telegram](https://t.me/ReineiraOS)
- [Documentation](https://reineira.xyz/docs)
