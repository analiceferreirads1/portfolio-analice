-- Registro da tabela que já existia no projeto Supabase "Flowmind" (não reaplicar: usa IF NOT EXISTS).
-- Recebe as mensagens do formulário de contato do site via rota /api/contato.
create table if not exists public.contact_messages (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) >= 1 and char_length(name) <= 120),
  email      text not null check (char_length(email) <= 200),
  subject    text check (char_length(subject) <= 80),
  message    text not null check (char_length(message) >= 1 and char_length(message) <= 4000),
  page       text check (char_length(page) <= 500)
);

-- RLS ligado e sem policies: anon/authenticated não leem nem escrevem.
alter table public.contact_messages enable row level security;
