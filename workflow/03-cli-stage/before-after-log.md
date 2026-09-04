# Stage 3 — Before/After Log

This is real output, captured while closing the gap in this project (not a
hypothetical). It's the evidence for the "Functionality" and "Efficiency"
evaluation criteria.

## BEFORE (state handed off from Stage 2 / IDE)

```
$ npm run lint
...
app/checkout/page.tsx
  35:50  error  Cannot call impure function during render (Math.random) — react-hooks/purity

app/confirmation/page.tsx
  17:9  error  Calling setState synchronously within an effect — react-hooks/set-state-in-effect

components/cart-provider.tsx
  87:5  error  Calling setState synchronously within an effect — react-hooks/set-state-in-effect

✖ 6 problems (3 errors, 3 warnings)
```

```
$ npm run build
...
Error: Turbopack build failed with 2 errors:
next/font: error: Failed to fetch `Geist` from Google Fonts.
next/font: error: Failed to fetch `Geist Mono` from Google Fonts.
Build error occurred
```

**Interpretation:** the app the IDE stage produced looked correct in a
browser with an open internet connection, but it did not actually meet
Stage 1's non-functional requirements. Neither ChatGPT nor Copilot caught
this, because neither ran the actual toolchain — they generate code, they
don't verify it. That verification gap is precisely what a CLI stage is for.

## AFTER (Stage 3 fixes applied — see prompt.md for the three fixes)

```
$ npm run lint
✖ 3 problems (0 errors, 3 warnings)
```
(remaining 3 are non-blocking `<img>` vs `next/image` optimization warnings)

```
$ npm run build
✓ Compiled successfully in 7.9s
✓ Generating static pages using 1 worker (13/13)
```

## Efficiency note

Fixing these three issues by hand (root-causing an ESLint rule name, a
React render-purity rule, and a Next.js font-loader network dependency)
would typically cost a developer unfamiliar with these specific rules
15–30 minutes of searching/debugging. Scripting the check + handing the
exact error text to a CLI AI agent turns that into a single automated pass,
which is the "meaningfully reduces manual effort" criterion in concrete
terms rather than an assertion.
