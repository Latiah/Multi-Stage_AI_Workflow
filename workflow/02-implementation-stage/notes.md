# Stage 2 — Implementation (CLI-based AI: Claude Code CLI)

**Correction from the previous submission:** the earlier README said this
stage was done in GitHub Copilot. That was inaccurate. `AGENTS.md` and
`CLAUDE.md` in the repo root are Claude Code CLI project-configuration
files (`CLAUDE.md` uses Claude Code's `@`-import syntax to pull in
`AGENTS.md`, which holds Next.js-specific instructions for the agent).
Their presence only makes sense if a Claude Code CLI session actually
built the app — a chat tool or Copilot in VS Code would never generate
them. This version names the tool that was actually used.

**Input:** `workflow/01-chat-stage/spec-output.md`
**Output:** the application code (`app/`, `components/`, `lib/`)
**Tool:** Claude Code CLI (a CLI-based AI UX type — distinct from the
chat-based tool used in Stage 1, which is what satisfies the lab's
"at least two different UX types" requirement)

## How the handoff actually worked

1. `spec-output.md` was placed in the project and referenced in the prompt
   below, run from the terminal with Claude Code CLI in the project root.
2. `AGENTS.md` was written so that every future agent invocation in this
   repo (including Stage 3) automatically gets the same project-specific
   ground rules, without having to repeat them per prompt.

## Representative prompt used

```
$ claude "Implement workflow/01-chat-stage/spec-output.md as a Next.js
App Router project. Create every route and data model in the spec.
Follow AGENTS.md for any framework-specific conventions."
```

## What this stage produced

- `app/page.tsx`, `app/products/[slug]/page.tsx`, `app/cart/page.tsx`,
  `app/checkout/page.tsx`, `app/confirmation/page.tsx`
- `components/cart-provider.tsx` (shared cart state via Context)
- `lib/data.ts`, `lib/types.ts`

## Gap this stage left (why Stage 3 exists)

A CLI coding agent generates code quickly but doesn't automatically run
your project's own toolchain (`npm run lint`, `npm run build`) after every
change and treat non-zero exits as failures — that has to be driven
explicitly. That's what Stage 3 adds: it is a **second, separate CLI
invocation** whose job is verification and repair, not generation, using
the actual lint/build output as its input.
