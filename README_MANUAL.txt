
SPOFSTATS — PAINEL PÚBLICO DO SPOTIFY (ANO CORRENTE, APROX.) • VITE + REACT • VERCEL + ADSENSE
============================================================================================

✅ O que é o Spofstats
- Um painel público onde QUALQUER pessoa pode logar com o Spotify e ver:
  • Artistas mais ouvidos
  • Músicas mais ouvidas
  • Tempo estimado ouvido no ano corrente (aprox.)
- 100% client-side (SPA), sem backend e sem banco de dados.
- Compatível com Google AdSense.
- HTTPS local automático (sem precisar de OpenSSL) usando @vitejs/plugin-basic-ssl.

-----------------------------
1) Instalação local
-----------------------------
1. Entre na pasta do projeto no terminal:
   cd spofstats

2. Instale as dependências:
   npm install

3. Rode em modo desenvolvimento com HTTPS:
   npm run dev

   Abra: https://localhost:5173/

   OBS: o navegador pode avisar que o certificado não é confiável (é normal em ambiente local).
   Clique em "Avançado → Continuar mesmo assim".

-----------------------------
2) Configuração do Spotify Developer
-----------------------------
1. Acesse https://developer.spotify.com/dashboard e faça login.
2. Crie um novo app (Create app):
   - Nome: Spofstats
   - Descrição: Painel público com estatísticas do Spotify no ano corrente (aprox.).
3. No app, vá em: Edit Settings → Redirect URIs
   Adicione EXATAMENTE estas URLs:
   - https://localhost:5173/
   - https://spotfstats.vercel.app/
4. Salve.
5. Copie o CLIENT ID (Client ID do aplicativo).

6. No projeto, abra o arquivo: src/api.js
   Substitua a linha:
     export const SPOTIFY_CLIENT_ID = "SEU_CLIENT_ID_AQUI";
   pelo seu Client ID, entre aspas, por exemplo:
     export const SPOTIFY_CLIENT_ID = "1234567890abcdef1234567890abcdef";

-----------------------------
3) Configuração do Google AdSense
-----------------------------
1. Em index.html, substitua todas as ocorrências de:
   - ca-pub-SEU_ID_AQUI
   pelo seu Publisher ID real do AdSense, ex.: ca-pub-1234567890123456

2. Em public/ads.txt, substitua:
   google.com, pub-SEU_ID_AQUI, DIRECT, f08c47fec0942fa0
   por:
   google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0

3. Certifique-se de que o domínio spotfstats.vercel.app está adicionado na sua conta AdSense.

-----------------------------
4) Deploy na Vercel
-----------------------------
1. Faça o build local (opcional, a Vercel pode fazer isso sozinha):
   npm run build

2. Suba o projeto para um repositório (GitHub, GitLab ou Bitbucket), ou use o ZIP direto pela Vercel.

3. Na Vercel:
   - Clique em "New Project" → importe o repositório ou faça upload.
   - Framework: Vite (detectado automaticamente).
   - Build Command: npm run build
   - Output Directory: dist

4. Após o deploy, a Vercel vai gerar o domínio:
   https://spotfstats.vercel.app/
   (ou você pode ajustá-lo nas configurações do projeto).

5. Confirme que esse domínio está cadastrado como Redirect URI no Spotify (já previsto neste manual).

-----------------------------
5) Como o "Ano Corrente" funciona (aprox.)
-----------------------------
- A API do Spotify não oferece um filtro exato de "Year-to-Date".
- O Spofstats usa:
  • Top artistas/músicas com time_range=medium_term (~6 meses) como aproximação do ano corrente.
  • Tempo ouvido: usa o endpoint "recently-played", filtrando somente as execuções cujo ano do played_at
    é igual ao ano atual (dentro da janela que o Spotify retorna).
- Por isso, o rótulo "Ano corrente (aprox.)" aparece na interface, por transparência.

-----------------------------
6) Scripts disponíveis
-----------------------------
  npm run dev     # Desenvolvimento com HTTPS local
  npm run build   # Gera a versão pronta para produção em /dist
  npm run preview # Pré-visualiza o build localmente

-----------------------------
7) Segurança e privacidade
-----------------------------
- Somente o Client ID é usado (público); não usamos Client Secret.
- Tokens de acesso do Spotify são mantidos apenas no navegador do usuário e expiram automaticamente.
- O Spofstats não persiste dados pessoais em servidores.
