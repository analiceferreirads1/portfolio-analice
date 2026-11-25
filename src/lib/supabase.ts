// Acesso ao Supabase (REST) para as rotas do servidor. Não importar em componentes do navegador:
// a chave secreta só existe no servidor.
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;

  // Chaves novas (sb_secret_...) vão só no header apikey; a legada service_role (JWT) também precisa do Bearer.
  const headers: Record<string, string> = { apikey: key };
  if (!key.startsWith('sb_')) headers.Authorization = `Bearer ${key}`;

  return { restUrl: `${url.replace(/\/+$/, '')}/rest/v1`, headers };
}
