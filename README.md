<div align="center">
  <img src="docs/assets/logo.png" alt="Viprasol Tech" width="120" />

  <h1>nextjs-boilerplate</h1>

  <p><strong>Production-ready Next.js (App Router) + TypeScript + Tailwind starter.</strong></p>

  <p>Built and maintained by Viprasol Tech.</p>

  <p>
    <a href="https://github.com/Viprasol-Tech/nextjs-boilerplate/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-boilerplate"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-boilerplate"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white" /></a>
  </p>
</div>

---

A clean, minimal Next.js App Router starter you can build on. Strict TypeScript,
Tailwind CSS, a small component library, and genuinely-testable logic in `lib/`
covered by Vitest. No bloat, no opinionated framework on top of the framework.

## Features

- **App Router** — server components, nested layouts, and file-based routing.
- **TypeScript (strict)** — strict compiler settings with `@/*` path aliases.
- **Tailwind CSS** — utility-first styling with a small, themeable token set.
- **Reusable UI** — a styled, accessible `<Button>` and a layout `<Container>`.
- **Typed env access** — `lib/env.ts` validates `process.env` and fails fast.
- **SEO helper** — `lib/seo.ts` builds Next.js `Metadata` (canonical, OG, Twitter).
- **Tested** — Vitest unit tests for `lib/` plus a `<Button>` render test (jsdom).

## Quickstart

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Edit `app/page.tsx` and the page hot-reloads.

### Useful scripts

```bash
npm run dev        # start the dev server
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
npm test           # vitest run
```

## What's included

```
app/
  layout.tsx        # root layout: header, footer, global metadata
  page.tsx          # home page
  about/page.tsx    # /about route with per-page metadata
  globals.css       # Tailwind directives + base styles
components/
  Button.tsx        # variant/size button, forwards native props
  Container.tsx     # centered max-width content wrapper
lib/
  env.ts            # typed, validated environment access
  seo.ts            # buildMetadata() + url/title helpers
  site.ts           # site-wide SEO config from env
  cn.ts             # tiny className joiner
tests/
  env.test.ts       # env helper unit tests
  seo.test.ts       # SEO helper unit tests
  Button.test.tsx   # component render test
```

### Environment variables

All optional — sensible defaults are applied. Set them in `.env.local`:

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Base URL for canonical/OG links |
| `NEXT_PUBLIC_SITE_NAME` | `Next.js Boilerplate` | Site name in metadata |

## Contributing

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
