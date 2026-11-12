# DEPLOY — SAVE (save-estoque)

Sistema de Análise de Validade e Estoque.
Trabalho acadêmico — Desenvolvimento Web, Ciência da Computação, 2026.

## Diferenças em relação ao padrão CODE SYSTEM

Este projeto **não** segue a stack completa da casa, e isso é intencional:

| Padrão CODE SYSTEM | Aqui | Motivo |
|---|---|---|
| TypeScript em `src/` | não existe | o sistema usa JavaScript simples no navegador |
| Neon Postgres | não existe | a persistência é feita no localStorage do navegador |
| `SCHEMA.sql` / `SEED.sql` | não existem | não há banco |
| Cloudflare Workers + `public/` | mantido | hospedagem igual aos outros sistemas |

O que foi mantido: nome do Worker em kebab-case, estáticos em `public/`,
deploy por `wrangler` e este arquivo de deploy.

## Publicar

```bash
npm install
npx wrangler login      # abre o navegador, só na primeira vez
npm run deploy
```

A URL sai no final do deploy, no formato:

```
https://save-estoque.<seu-subdominio>.workers.dev
```

## Rodar local antes de publicar

```bash
npm run dev
```

Abre em `http://localhost:8787`.

Sem Node instalado, dá para testar abrindo `public/index.html` direto no
navegador — o sistema não depende de servidor.

## Estrutura

```
save-estoque-worker/
├── public/          # 8 páginas HTML + estilo.css + script.js
├── DEPLOY.md
├── package.json
└── wrangler.toml
```

## Observação sobre a fonte

As páginas carregam a tipografia Inter do Google Fonts. Sem internet, o
navegador usa Arial como alternativa e o sistema continua funcionando.
