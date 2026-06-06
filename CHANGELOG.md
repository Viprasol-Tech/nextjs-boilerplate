# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/); versioning
follows [SemVer](https://semver.org/).

## [0.2.0] - 2025

### Added
- Light / dark / system theme: `lib/theme` resolution helpers, a `ThemeProvider`
  context, a `ThemeToggle` button, class-based Tailwind dark mode, and a
  no-flash inline script in the root layout.
- Typed `fetch` wrapper in `lib/fetcher` with request timeouts (AbortController),
  JSON parsing, a structured `HttpError`, and a `withQuery` builder.
- Formatting utilities in `lib/format`: `slugify`, `truncate`, `capitalize`,
  `pluralize`, `formatBytes`, and `formatDate`.
- Health-check shaping in `lib/health` plus a `GET /api/health` route handler
  and a server-rendered `/status` page.
- Expanded SEO helpers: keyword merging, robots directives, a Twitter creator
  handle, and a `buildWebSiteJsonLd` schema.org generator. URL validation via
  `requireUrl` in `lib/env`.
- New UI components: `Card` and `Badge`, both dark-mode aware.
- App Router special files: `error.tsx`, `loading.tsx`, and `not-found.tsx`.

### Changed
- Home and About pages refreshed with the new components and dark-mode styles.
- Roughly tripled the test suite (90 tests) covering the new lib modules and
  component render behavior.

## [0.1.0] - 2025

### Added
- Initial release of nextjs-boilerplate: Production-ready Next.js (App Router) + TypeScript + Tailwind starter.
