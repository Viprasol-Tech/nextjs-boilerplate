<div align="center">
  <img src="docs/assets/logo.png" alt="Viprasol Tech" width="120" />

  <h1>nextjs-boilerplate</h1>

  <p><strong>A clean, production-ready Next.js (App Router) + TypeScript + Tailwind starter with dark mode, tested utilities, and a small component library.</strong></p>

  <p><em>Built and maintained by Viprasol Tech</em></p>

  <p>
    <a href="https://github.com/Viprasol-Tech/nextjs-boilerplate/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-boilerplate"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-boilerplate"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-boilerplate"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss&logoColor=white" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-boilerplate"><img alt="Tests" src="https://img.shields.io/badge/tests-90%20passing-brightgreen" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-boilerplate"><img alt="Version" src="https://img.shields.io/badge/version-0.2.0-blue" /></a>
  </p>
</div>

---

A minimal Next.js App Router starter you can actually build on. Strict TypeScript,
Tailwind CSS with light/dark/system theming, a small accessible component library,
and genuinely-testable logic in `lib/` — all covered by Vitest. No bloat, no
opinionated framework on top of the framework.

## ✨ Features

- 🧭 **App Router** — server components, nested layouts, and file-based routing.
- 🔒 **TypeScript (strict)** — strict compiler settings with `@/*` path aliases.
- 🎨 **Tailwind + dark mode** — class-based light / dark / system theme with a
  one-click toggle and a no-flash-on-load script.
- 🧱 **Reusable UI** — accessible `<Button>`, `<Card>`, `<Badge>`, `<Container>`,
  and a `<ThemeToggle>`.
- 🌱 **Typed, validated env** — `lib/env.ts` reads `process.env`, validates URLs,
  and fails fast with clear messages.
- 🔎 **SEO toolkit** — `lib/seo.ts` builds Next.js `Metadata` (canonical, OG,
  Twitter, robots, keywords) plus a JSON-LD `WebSite` schema.
- 🌐 **API route + fetch lib** — a `GET /api/health` route handler, a typed
  `fetchJson` wrapper with timeouts, and a server-rendered `/status` page.
- 🧰 **Format helpers** — `slugify`, `truncate`, `pluralize`, `formatBytes`, and more.
- 🧯 **Robust UX** — `error.tsx`, `loading.tsx`, and `not-found.tsx` out of the box.
- ✅ **Tested** — 90 Vitest tests across `lib/` units and component renders (jsdom).

## 🚀 Quickstart

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Edit `app/page.tsx` and the page hot-reloads.
Visit `/status` to see the typed health payload, or hit `/api/health` directly.

### Useful scripts

```bash
npm run dev        # start the dev server
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
npm test           # vitest run
```

## 📦 What's included

```
app/
  layout.tsx           # root layout: theme provider, header/footer, metadata, JSON-LD
  page.tsx             # home page (feature cards)
  about/page.tsx       # /about route with per-page metadata
  status/page.tsx      # /status route rendering the health payload
  api/health/route.ts  # GET /api/health route handler
  error.tsx            # route error boundary
  loading.tsx          # route loading skeleton
  not-found.tsx        # 404 page
  globals.css          # Tailwind directives + light/dark base styles
components/
  Button.tsx           # variant/size button, forwards native props
  Card.tsx             # bordered content surface (dark-mode aware)
  Badge.tsx            # status pill with tone variants
  Container.tsx        # centered max-width content wrapper
  ThemeProvider.tsx    # theme context + document class sync
  ThemeToggle.tsx      # light/dark/system cycle button
lib/
  env.ts               # typed, validated environment access (+ requireUrl)
  seo.ts               # buildMetadata(), JSON-LD, keyword/handle helpers
  site.ts              # site-wide SEO config from env
  theme.ts             # pure theme resolution helpers
  fetcher.ts           # typed fetch wrapper with timeouts + HttpError
  format.ts            # slugify / truncate / pluralize / formatBytes / ...
  health.ts            # health-check payload shaping
  cn.ts                # tiny className joiner
tests/
  *.test.ts(x)         # 90 unit + component tests (Vitest, jsdom)
```

### 🖼️ Screenshots

> The home page renders a responsive feature grid; the header includes a theme
> toggle that cycles light → dark → system. Run `npm run dev` to see it live —
> theming, the `/status` page, and the error/404 states all work out of the box.

### Environment variables

All optional — sensible defaults are applied. Set them in `.env.local`
(see [`.env.example`](.env.example)):

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Base URL for canonical/OG links |
| `NEXT_PUBLIC_SITE_NAME` | `Next.js Boilerplate` | Site name in metadata |

## 🗺️ Roadmap

- [x] App Router, strict TypeScript, Tailwind
- [x] Light / dark / system theme with no-flash script
- [x] Typed env validation and SEO/JSON-LD helpers
- [x] API route handler + typed fetch wrapper
- [x] error / loading / not-found segments
- [ ] Authentication example (middleware + protected route)
- [ ] Optional ESLint + Prettier config preset
- [ ] Playwright end-to-end smoke tests
- [ ] CI matrix across Node LTS versions

## ❓ FAQ

**Does dark mode flash on first paint?**
No. A tiny inline script in the root layout applies the stored/`prefers-color-scheme`
theme before hydration, so there is no flash of the wrong theme.

**How do I add a protected env variable?**
Use `requireEnv` / `requireUrl` from `lib/env.ts` inside `readEnv` — they throw a
clear error at startup if the value is missing or malformed.

**Why is logic split into `lib/` and components into `components/`?**
Pure functions in `lib/` are framework-agnostic and trivially unit-testable; the
React glue stays thin. The `/status` page and `/api/health` route both consume
the same `lib/health` shaper.

**Can I run only the type check or only tests?**
Yes — `npm run typecheck` and `npm test` are independent.

## 🤝 Contributing

Contributions are welcome. Please open an issue to discuss substantial changes
first, keep PRs focused, and make sure `npm run typecheck` and `npm test` both
pass before submitting. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Contact — Viprasol Tech Private Limited

- Website: [viprasol.com](https://viprasol.com)
- Email: [support@viprasol.com](mailto:support@viprasol.com)
- Telegram: [t.me/viprasol_help](https://t.me/viprasol_help) | WhatsApp: +91 96336 52112
- GitHub: [@Viprasol-Tech](https://github.com/Viprasol-Tech) | [LinkedIn](https://www.linkedin.com/in/viprasol/) | X [@viprasol](https://twitter.com/viprasol)

## License

[MIT](LICENSE) (c) 2025 Viprasol Tech Private Limited
