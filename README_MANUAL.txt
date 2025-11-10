
SPOTISTATS PUBLIC — ANO CORRENTE (Vite + React, sem backend) • VERSEL + ADSENSE
==============================================================================

✅ O que é
- App público para QUALQUER pessoa logar com Spotify e ver seu painel do ANO CORRENTE (YTD).
- 100% client-side (SPA) — sem servidor e sem armazenar dados pessoais.
- Compatível com Google AdSense (auto-ads + ads.txt incluídos).
- Deploy orientado para **Vercel** (funciona também em Hostinger/Netlify).

⚠️ Sobre "Ano Corrente" (YTD)
- A API do Spotify **não expõe YTD real** nem permite filtros por ano em /top endpoints.
- Implementamos aproximação: **Top artistas/músicas** via `time_range=medium_term` (~6 meses) e
  **tempo ouvido** a partir de `recently-played` **filtrado por ano atual** (limitado aos itens recentes que a API retorna).
- Transparência: mostramos "Ano corrente (aprox.)" na UI.

-----------------------------
1) Spotify Developer Dashboard
-----------------------------
1. Acesse https://developer.spotify.com/dashboard e crie um app (Create an app)
   Nome: SpotiStats Public YTD
2. Em **Edit Settings → Redirect URIs**, adicione:
   • http://localhost:5173/
   • https://SEU-DOMINIO.vercel.app/
   (troque SEU-DOMINIO pelo domínio real do projeto na Vercel)
3. Salve.
4. Copie o **Client ID** do app.

-------------------------
2) Onde colocar o Client ID
-------------------------
Abra `src/api.js` e substitua:
  export const SPOTIFY_CLIENT_ID = "SEU_CLIENT_ID_AQUI";

------------------------------------------
3) Google AdSense (auto-ads) + ads.txt
------------------------------------------
1. Em `index.html`, troque **ca-pub-SEU_ID_AQUI** pelo seu Publisher ID (ex.: ca-pub-123...).
2. Em `public/ads.txt`, troque **pub-SEU_ID_AQUI** pelo mesmo Publisher ID.
3. Adicione (ou edite) as páginas institucionais:
   • public/sobre.html, public/contato.html, public/politica-de-privacidade.html

--------------------
4) Rodando localmente
--------------------
  npm install
  npm run dev
  # acesse http://localhost:5173

Clique em “Entrar com Spotify” → autorize → o app lê o token no hash e mostra o painel.

----------------
5) Deploy Vercel
----------------
1. Crie um novo projeto na Vercel (Import Project) e selecione este repositório/pasta.
2. Framework: Vite; Build Command: npm run build; Output: dist
3. Após o deploy, ajuste a Redirect URI no Spotify para o domínio final (se necessário).
4. Coloque `ads.txt` no caminho raiz público (Vercel serve automaticamente de /public).

----------------
6) Dicas de SEO
----------------
• Ajuste <title> e <meta description> no index.html
• Tenha conteúdo textual útil (explicando o serviço) para evitar “baixo valor” no AdSense
• Mantenha links claros para páginas institucionais no rodapé

----------------
7) Segurança
----------------
• Implicit Grant envia o access_token no hash da URL (não atinge o servidor).
• Não salvamos tokens permanentemente; ficam apenas na aba do navegador.
• Client Secret não é usado neste fluxo (seguro para SPA).
