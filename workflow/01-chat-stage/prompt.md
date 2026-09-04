# Stage 1 — Chat AI (ChatGPT / any chat-based tool)

**Role in the pipeline:** turn a one-line business problem into a structured,
implementation-ready technical specification. Nothing here is tool-specific —
any chat model (ChatGPT, Gemini, Claude chat, etc.) can run this prompt.

## Prompt used

```
You are a technical product analyst. I need to build a small e-commerce
storefront called "ShopEase" as a learning project.

Produce a technical specification an engineer could implement directly,
in this exact structure:

1. Tech stack (framework, language, styling)
2. Pages/routes required, with one-line purpose for each
3. Core data models (as TypeScript-style interfaces)
4. State-management requirements (what must persist across pages, e.g. cart)
5. Non-functional requirements (must build/lint cleanly, must not depend on
   external network calls at build time, must be usable with keyboard/screen
   reader)
6. Out-of-scope items (explicitly list what NOT to build, e.g. real payments,
   auth, backend API)

Output only the specification, in Markdown, no commentary.
```
