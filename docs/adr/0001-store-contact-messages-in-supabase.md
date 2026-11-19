# 1. Store contact form messages in Supabase

- **Date:** 2026-11-12
- **Status:** Accepted

## Context

The contact form sent submissions to an n8n webhook. n8n needs an instance running at all times (a self-hosted server or a paid cloud plan), and the webhook URL had no authentication. I wanted the site to work on its own, with messages stored somewhere I can browse later.

## Decision

The `/api/contato` route validates each submission and inserts it directly into a Supabase table (`public.contact_messages`) using a server-only secret key. Row Level Security is enabled with no public policies.

## Alternatives considered

- **Keep n8n and add a shared secret header:** fixes authentication, but keeps the dependency on a running n8n instance.
- **WhatsApp Cloud API (official):** requires a verified business account, approved message templates and per-message pricing. Too much overhead for a portfolio contact form.
- **Evolution API (unofficial WhatsApp):** needs a paid always-on server and carries a risk of the phone number being banned. Kept as a possible future project for notifications.

## Consequences

- **Better:** one less service to run; messages are stored, queryable and protected by RLS and least privilege; the schema is versioned in `supabase/migrations/`.
- **Worse:** there is no notification for new messages, so I need to check the Supabase dashboard.
- **New constraint:** free-tier projects pause after a week without activity, which required a daily keep-alive cron (see ADR 0003).