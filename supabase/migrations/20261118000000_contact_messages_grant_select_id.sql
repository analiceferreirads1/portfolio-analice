-- O cron /api/keep-alive faz uma leitura diária para o projeto não pausar.
-- Só a coluna id: o servidor continua sem acesso a nome, e-mail e mensagem.
grant select (id) on table public.contact_messages to service_role;