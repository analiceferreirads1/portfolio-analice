# 2. Content-Security-Policy without nonces

- **Date:** 2026-11-18
- **Status:** Accepted

## Context

The site had no security headers. A Content-Security-Policy (CSP) limits where scripts, styles and other resources can load from, reducing the impact of cross-site scripting (XSS). The home page is statically prerendered, and most components use inline styles (`style={{ ... }}`). Next.js also injects small inline scripts that the page needs to run.

## Decision

Set the CSP in `next.config.mjs` with `'unsafe-inline'` for scripts and styles, following the "Without Nonces" approach from the Next.js documentation. `'unsafe-eval'` is added only in development, never in production. Other directives stay strict: `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` and `frame-ancestors 'none'`.

## Alternatives considered

- **Nonce-based CSP:** the strictest option, but a new nonce on every request forces dynamic rendering. The home page could no longer be prerendered and served from the CDN, adding server work on every visit for little gain on a site without logins or user-generated content.
- **No CSP:** leaves the site without protection against external scripts, clickjacking and form hijacking.

## Consequences

- **Better:** the home page stays static and fast; external scripts, framing and cross-origin form submissions are blocked; validated in production with `curl -I` and a clean browser console.
- **Worse:** `'unsafe-inline'` would allow a script injected into the page itself to run. The risk is limited because the site never renders visitor-submitted content.
- **Revisit:** moving inline styles to CSS Modules (roadmap item 22) would allow removing `'unsafe-inline'` from `style-src`.