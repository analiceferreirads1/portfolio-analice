# 3. Daily keep-alive cron with least privilege

- **Date:** 2026-11-18
- **Status:** Accepted

## Context

Supabase free-tier projects are paused after one week without activity (see ADR 0001). A portfolio site can easily go a week without a contact form submission, and a paused project would make the next submission fail, losing exactly the contact the form exists for.

## Decision

Vercel Cron calls `GET /api/keep-alive` once a day (`0 12 * * *`, declared in `vercel.json`). The route:

1. Rejects any request without `Authorization: Bearer <CRON_SECRET>` (401), so strangers cannot trigger it.
2. Runs a minimal read: `select id ... limit 1` on `contact_messages`.

The server key received `SELECT` on the `id` column only (migration `20261118000000`). It still cannot read names, emails or messages.

## Alternatives considered

- **Supabase Pro plan (US$ 25/month):** no pausing, but a recurring cost for a single contact form.
- **GitHub Actions scheduled workflow:** free, but scheduled workflows in public repositories are disabled after 60 days without repository activity, and the Supabase key would also need to be stored in GitHub.
- **Insert a "ping" row every day:** works with the existing INSERT permission, but fills the table with fake rows mixed with real contacts.
- **Grant SELECT on the whole table:** simpler, but a leaked key would expose every contact's personal data.

## Consequences

- **Better:** the database stays active at no cost; the route is authenticated; a leaked key still cannot read contact data. Verified in Vercel request logs: 401 without the secret, 200 from Vercel Cron.
- **Worse:** on the Hobby plan the cron runs at most once a day, with up to 59 minutes of delay. Vercel lists Cron Jobs as a legacy feature that will migrate to Schedules, so this may need updating.