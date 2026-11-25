# 4. Rate limit the contact form with the Vercel Firewall

- **Date:** 2026-11-25
- **Status:** Accepted

## Context

The honeypot field stops simple bots, but a bot that skips it can submit the form thousands of times, filling the free-tier database (500 MB) and burying real messages. Vercel runs the API route as serverless functions: each request may hit a different instance, so a counter kept in memory would reset constantly and not limit anything.

## Decision

A Vercel WAF rate limiting rule (`contact-rate-limit`) applies to `/api/contato`: **5 requests per IP per 10-minute fixed window**. Extra requests receive `429 Too Many Requests` at the edge, before reaching the function or the database.

The rule is configured in the Vercel dashboard (Firewall), not in the repository.

## Alternatives considered

- **In-memory counter in the route:** simplest code, but does not work on serverless (state is not shared between instances).
- **Counter in Upstash Redis or Supabase:** works across instances, but adds code, a dependency, and another service or table to maintain for a single form.
- **CAPTCHA:** strong against bots, but adds friction for real visitors and a third-party script that the Content-Security-Policy would need to allow.

## Consequences

- **Better:** no code and no cost (the Hobby plan includes one rate limiting rule and 1,000,000 allowed requests per month); blocked requests never run the function or touch the database. Verified in production: requests 1–5 reached the route, requests 6–7 returned 429.
- **Worse:** the rule lives outside the repository, so it is documented here and in the README. Hobby allows only one rate limiting rule per project; different limits for other routes would require the Pro plan or a code-based limiter. Visitors sharing one IP (an office network, for example) share the same limit.
