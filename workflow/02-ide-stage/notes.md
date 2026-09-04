# Stage 2 — IDE AI (GitHub Copilot / any IDE-based tool)

**Input:** `workflow/01-chat-stage/spec-output.md`
**Output:** the working application (`app/`, `components/`, `lib/`)

## How the handoff works

1. Open the repo in VS Code with Copilot (or Cursor, JetBrains AI, etc.)
   enabled.
2. Paste `spec-output.md` into Copilot Chat with:
   ```
   Implement this specification as a Next.js App Router project. Match the
   file/route structure exactly. After generating each file, keep going
   until every route in the spec exists.
   ```
3. Accept/edit suggestions file by file, referencing the spec's data models
   (`lib/types.ts`) so every component agrees on the same shapes.
4. Run `npm run dev` locally after each major page to sanity-check in the
   browser as you go — this is the fast, interactive feedback loop an IDE
   tool is good at, which a chat tool alone can't give you.

## What this stage produced

- `app/page.tsx`, `app/products/[slug]/page.tsx`, `app/cart/page.tsx`,
  `app/checkout/page.tsx`, `app/confirmation/page.tsx`
- `components/cart-provider.tsx` (shared cart state via Context)
- `lib/data.ts`, `lib/types.ts`

## Gap found here (and why Stage 3 exists)

Manual spot-checking in the browser does **not** catch everything the spec
required — in particular "must build/lint cleanly" and "must not depend on
an external network call at build time." Those are exactly the kind of
requirement a human skimming the UI will miss, and they're what Stage 3
is for.
