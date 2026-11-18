-- Só o servidor do site (chave secreta / service_role) pode inserir mensagens.
-- O navegador nunca acessa a tabela diretamente.
grant insert on table public.contact_messages to service_role;
