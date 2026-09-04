# Stage 3 — Before/After Log (real terminal output)

`verify_output_raw.log`.

## BEFORE (state handed off from Stage 2)

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

```
$ npm test
npm error missing script: test
```
(there was no test script or test suite at all)

**Interpretation:** the app Stage 2 produced looked correct when viewed in
a browser with an open internet connection, but did not meet Stage 1's
own non-functional requirements, and had zero automated test coverage.

## AFTER (Stage 3 fixes applied — see prompt.md)

Full raw output in `verify_output_raw.log`. Summary:

```
$ npm run lint      -> 0 errors, 3 non-blocking warnings
$ npm test          -> 5 passed (5)
$ npm run build     -> Compiled successfully, 13/13 static pages generated
RESULT: workflow requirement satisfied (lint + tests + build all clean)
```

Exit code of `verify.sh`: `0`.

## Efficiency note

Root-causing an unfamiliar ESLint rule name, a React render-purity error,
and a Next.js font-loader network dependency by hand typically costs
15–30 minutes for a developer who hasn't hit these specific rules before.
Scripting the check and handing the exact compiler/linter output to a CLI
agent turns that into one automated pass (`verify.sh`, ~15 seconds locally,
now also enforced on every push via CI) — a concrete, checkable version of
"meaningfully reduces manual effort" rather than a named-but-unmeasured
objective.
