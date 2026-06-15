# User authentication 

It is important to know how authentication works under the hood. 
Importante saber como uma autenticação funciona por baixo dos panos. 
No dia a dia em uma empresa é normal usar integraçoes para isso, mas é importante conhecer a fundo. 

- Needed to install an adapter so prisma on v7.8 could work 

## Visão geral

API simples de autenticação e gerenciamento de usuários usando Prisma + Postgres.

Principais responsabilidades implementadas no repositório:
- Modelo `User` definido em `prisma/schema.prisma` (campo `id` é `Int`).
- Conexão com o banco via `src/database/prisma.js`.
- Rotas e módulos separados: `src/modules/user/*`, `src/routes/*` e `src/middleware/*`.
- Operações básicas de usuário: registro, listagem e remoção (endpoints em `src/routes/user.routes.js`).

## Como rodar

1. Copie o `.env` com `DATABASE_URL` configurado.
2. Instale dependências:

```bash
npm install
```

3. Inicie em modo dev:

```bash
npm run dev
```

## O que foi desenvolvido (resumo)

- Estrutura modular com `controllers`, `services` e `repository` para separar responsabilidades.
- Uso de `Prisma` como ORM e `bcrypt` para hashing de senhas.
- Rotas organizadas em `src/routes` e middleware de autenticação localizado em `src/middleware`.

## Próximas melhorias (to-do)

Lista inicial de prioridades:

1. Adicionar validação de entrada (ex.: `zod`/`express-validator`) para todas as rotas.
2. Implementar o fluxo de `refresh token` (armazenamento seguro e rotação de tokens).
3. Empacotar a aplicação em container e adicionar pipeline CI/CD (Dockerfile + GitHub Actions/GitLab CI).

--
Arquivo principal: [README.md](README.md)