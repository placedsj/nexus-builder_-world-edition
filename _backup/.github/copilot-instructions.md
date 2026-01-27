## Project Snapshot

- Stack: React + TypeScript (TS 5.x), Vite, TailwindCSS.
- Backend: AWS Amplify (local outputs in `amplify_outputs.json`, backend defined in `amplify/backend.ts`).
- AI integration: Google Gemini via `services/geminiService.ts` (env var: `VITE_GEMINI_API_KEY`).

## Big Picture

- Single-page React app (entry: `index.tsx`, root component `App.tsx`).
- UI is organized in `components/` (notably `EnterpriseBuilder.tsx` — core configurator). `constants.tsx` and `types.ts` hold domain data and shapes.
- Amplify is configured at runtime from `amplify_outputs.json` (`Amplify.configure(outputs)` in `index.tsx` and `App.tsx`). The generated Data client is used from `lib/amplify.ts` (`generateClient`).
- Data flow example: user changes in `EnterpriseBuilder` -> `generateConfigFromPrompt` in `services/geminiService.ts` for AI suggestions -> update `spec` state -> persist via `client.models.ShedDesign.create` (see `EnterpriseBuilder.tsx`).

## Developer workflows & commands

- Local dev: `npm install` then `npm run dev` (Vite). See `package.json` scripts: `dev`, `build` (runs `tsc && vite build`), `preview`.
- Env: client-side API keys must be prefixed with `VITE_`. Set `VITE_GEMINI_API_KEY` in `.env.local` (or match README instructions `GEMINI_API_KEY` mapping if present).
- Amplify: this repo uses static `amplify_outputs.json` for local config. Do not overwrite without syncing with real Amplify deployments.

## Project-specific conventions & patterns

- Branding toggles: `config/branding.ts` controls which landing components and features are enabled (e.g., `showShedBuilder`, `showRoofingProcess`). Use these to detect feature flags.
- Domain constants: `constants.tsx` contains `SHED_DB`, `SHOWROOM_ITEMS`, `UPGRADES` — treat these as source-of-truth for UI lists and pricing.
- AI responses are expected to be strict JSON: `services/geminiService.ts` enforces a `responseSchema` and returns parsed JSON. AI callers must pass `currentSpec` context and expect to merge the returned JSON into the spec state.
- Persistence: use the generated `client` (`lib/amplify.ts`) models (e.g., `client.models.ShedDesign.create`) — do not directly call REST endpoints.
- Auth: `@aws-amplify/ui-react` Authenticator is used in components (see `EnterpriseBuilder.tsx`). When saving, code checks `useAuthenticator`'s `user` and shows login UI if unauthenticated.

## Integration points & important files

- AI: `services/geminiService.ts` — system instruction + schema. Update carefully; changes change the contract with the front-end `LUNAI` UI.
- Core UI: `components/EnterpriseBuilder.tsx` — orchestrates spec state, calls AI, computes costs, and writes to `client`.
- Amplify wiring: `lib/amplify.ts` (client generation) and `amplify/backend.ts` (backend definition). Runtime config loaded from `amplify_outputs.json` in `index.tsx`/`App.tsx`.
- Entry points: `index.tsx`, `App.tsx`.

## Quick examples for an AI agent

- To suggest a configuration change via AI: call `generateConfigFromPrompt(prompt, currentSpec)` (see `EnterpriseBuilder.tsx` usage), then merge returned keys into the current `spec`.
- To save a design: call `client.models.ShedDesign.create({...})` (fields: `style`, `width`, `depth`, `wallColor`, `sidingType`, `addonsJson`, `specJson`, `name`).
- To read pricing/catalog: consult `constants.tsx` (e.g., `SHED_DB[spec.style].price`, `SHOWROOM_ITEMS`).

## Safety notes for agents

- The Gemini service expects `application/json` responses per schema; do not assume free-form text. If AI output fails to parse, `generateConfigFromPrompt` returns `null` and callers show fallback messages.
- Do not embed secrets into commits. Use `.env.local` (dev) and `VITE_` prefix for client-side environment variables.

## If you need more context

- Inspect `components/EnterpriseBuilder.tsx`, `services/geminiService.ts`, `lib/amplify.ts`, `constants.tsx`, and `config/branding.ts` for the most relevant patterns.

---
If this looks good, I can refine any section (add examples, expand AI schema notes, or merge into an existing doc you prefer). Please tell me what to adjust.
