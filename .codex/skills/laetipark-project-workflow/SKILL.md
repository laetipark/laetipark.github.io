---
name: laetipark-project-workflow
description: Work safely in the Laetipark portfolio project at D:\laetipark. Use when Codex edits, reviews, or plans changes for this repo, especially React/Vite frontend work, Chat Laetus API contracts, visual design consistency, Figma-to-code rules, docs/rules updates, GitHub Pages deployment, or validation.
---

# Laetipark Project Workflow

Use this skill when working in `D:\laetipark` on the Laetipark React/Vite portfolio project. Respond in Korean by default.

## Start Here

Before changing or reviewing code, docs, styling, deployment, or API behavior:

1. Read `AGENTS.md`.
2. Read `docs/README.md`.
3. Read only the task-relevant documents under `docs/rules/`.
4. Treat `docs/` as the canonical rule source; do not duplicate detailed project rules into this skill.

## Choose Project Docs

Use the repo docs as the source of truth:

- Frontend structure, components, React/Vite patterns, or state handling: read `docs/rules/FRONTEND.md`.
- Visual tone, layout, light/dark theme, or CSS decisions: read `docs/rules/DESIGN.md`.
- Chat Laetus requests, response parsing, environment variables, or API contracts: read `docs/rules/API.md`.
- Figma MCP design transfer, component mapping, or design-to-code work: read `docs/rules/FIGMA.md`.
- GitHub Pages, GitHub Actions, build output, or deployment behavior: read `docs/rules/DEPLOYMENT.md`.

## Guardrails

- Keep changes scoped to the user request and the relevant feature surface.
- Preserve the existing React, Vite, TypeScript, and CSS Module patterns unless the task explicitly requires changing them.
- Keep project-specific rules in `docs/`; update the relevant canonical doc when behavior or workflow rules change.
- Do not touch unrelated dirty worktree changes. If existing changes affect the task, work with them instead of reverting them.
- Avoid adding extra skill resources unless a future task proves they are needed.

## Verification

Before finishing, run the narrowest useful validation for the change:

- For frontend or TypeScript changes, prefer `npm run build`.
- For lint-sensitive edits, run `npm run lint`.
- For docs-only or skill-only changes, run the relevant validator when one exists and manually inspect changed metadata.
- If a useful validation step was not run, state that clearly in the final response.
