# Stage 3 — CLI AI (Claude Code CLI / any CLI-based tool)

**Input:** the working tree produced by Stage 2, plus the non-functional
requirements from Stage 1's spec.
**Output:** a codebase that actually satisfies those requirements, with a
machine-checkable pass/fail result — not just "looks right in the browser."

This is the stage the original submission was missing entirely. The lab's
prerequisites and required-tools sections both call out a CLI-based AI tool
specifically, and it's the natural third link: an IDE tool is optimized for
interactive, file-by-file editing with a human watching; a CLI tool is
optimized for unattended, scriptable verification — exactly what "does this
build/lint cleanly" needs.

## How it's run

```bash
# from the project root, with Claude Code CLI installed and authenticated
claude -p "Run `npm run lint` and `npm run build`. For every error (not
warning) reported, fix the underlying code so the command exits 0. Do not
change application behavior. Explain each fix in one sentence."
```

`workflow/03-cli-stage/verify.sh` is the tool-agnostic version of the same
check: it doesn't care whether a human, Copilot, or a CLI agent made the
last change — it just proves the requirement is actually met, which is what
makes the workflow's "Functionality" claim verifiable instead of asserted.

## What it found and fixed in this project

See `before-after-log.md` for the full run. Summary:

| # | File | Problem | Fix |
|---|---|---|---|
| 1 | `app/checkout/page.tsx` | `Math.random()` called during render (React purity rule) → lint error | Moved order-id generation into the submit handler, so it only runs on the actual user action |
| 2 | `app/confirmation/page.tsx` | `setState` called synchronously inside a `useEffect` → lint error | Confirmed as an intentional one-time localStorage read on mount (documented, narrowly suppressed) |
| 3 | `app/layout.tsx` | `next/font/google` fetches fonts from `fonts.googleapis.com` at build time → build fails with no network egress | Swapped to system font stacks via CSS variables; same variable names, zero external dependency |

After these fixes: `npm run lint` → 0 errors, `npm run build` → succeeds,
with no reliance on external network access.
