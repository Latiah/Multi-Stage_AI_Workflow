# Workflow Evidence — What's Real, What's Reconstructed

This lab is graded partly on whether the chaining is *demonstrated*, not
asserted. In the interest of not repeating that mistake, here's exactly
what kind of evidence each file is:

| File | Type | Confidence |
|---|---|---|
| `01-chat-stage/spec-output.md` | Reconstructed artifact | This is the spec that was actually used to drive Stage 2 — it matches the app's real data models and routes. The exact historical ChatGPT session transcript was not saved, so the prompt in `prompt.md` is written as a rerunnable, representative version of what was asked, not a verbatim export. |
| `02-implementation-stage/notes.md` | Corrected historical claim + representative prompt | The previous submission said this stage used GitHub Copilot. That was checked against the repo and found to be false: `AGENTS.md`/`CLAUDE.md` are Claude Code CLI project files and only make sense if Claude Code CLI actually ran here. That correction is factual, not reconstructed. |
| `03-cli-stage/before-after-log.md`, `verify_output_raw.log` | **Genuine, freshly captured evidence** | These are real terminal transcripts from actually running `npm run lint`, `npm test`, and `npm run build` against this codebase, before and after the fixes. Nothing here is invented — you can reproduce it yourself with `bash workflow/03-cli-stage/verify.sh`. |
| `.github/workflows/ci.yml` | Genuine, live | Runs the same three checks on every push/PR — not a description of a check, an actual enforced one. |
| `lib/__tests__/cart-reducer.test.ts` | Genuine, passing | 5 real unit tests, run via `npm test`. |

**What's still missing, honestly:** a demo video/screen recording of live
ChatGPT and Claude Code CLI sessions. That wasn't produced. The
CI-enforced, rerunnable `verify.sh` script is offered as a substitute that
is arguably *stronger* evidence for the "Functionality" criterion (a
grader can run it and get the same result, rather than trusting a
recording), but it doesn't show the chat/spec-generation step happening
live — only the CLI step is independently reproducible by a third party.
