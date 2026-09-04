# Stage 3 — Verification & Repair (CLI-based AI: Claude Code CLI)

**Input:** the app from Stage 2, plus the non-functional requirements from
Stage 1's spec ("must lint/build clean," "no external network at build
time")
**Output:** a codebase that provably satisfies those requirements —
checked by `verify.sh`, not asserted in a README.

This is a second, separate Claude Code CLI invocation from Stage 2 — same
UX category, different job. Stage 2 generates code; Stage 3 runs the
project's own toolchain against it and fixes whatever fails. That
distinction matters for the "Adaptability" criterion too: the pipeline
only actually needs **two different UX categories** (chat + CLI here) to
satisfy the lab, and Stage 3 shows the CLI category doing something a chat
tool structurally cannot — running and reacting to real command output.

## Prompt used

```
$ claude "Run `npm run lint`, `npm test`, and `npm run build`. For every
error (not warning), fix the underlying code so all three commands exit 0.
Do not change application behavior. Explain each fix in one sentence."
```

## What it found and fixed

| # | File | Problem | Fix |
|---|---|---|---|
| 1 | `app/checkout/page.tsx` | `Math.random()` called during render (React purity rule) → lint error | Moved order-id generation into the submit handler |
| 2 | `app/confirmation/page.tsx` | `setState` called synchronously inside a `useEffect` → lint error | Confirmed as an intentional one-time localStorage read on mount; documented and narrowly suppressed |
| 3 | `app/layout.tsx` | `next/font/google` fetches fonts from `fonts.googleapis.com` at build time → build fails with no network egress | Swapped to system font stacks via CSS variables; same variable names, zero external dependency |
| 4 (added, not a fix) | `lib/__tests__/` | No automated tests existed at all | Added a real Vitest suite for `cartReducer` (5 passing tests) so "runs end-to-end without breaking" covers logic, not just compile/lint |

See `before-after-log.md` for the actual terminal transcript.

## Reproduce it yourself

```bash
npm install
bash workflow/03-cli-stage/verify.sh
```

`.github/workflows/ci.yml` runs the identical three checks on every push,
so this isn't a one-time manual run — it's an enforced gate.
