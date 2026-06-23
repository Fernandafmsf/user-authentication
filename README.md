# User Authentication Service — Project Summary

This repository implements a modular user authentication API built with Node.js, Express, and Prisma (PostgreSQL). It demonstrates a production-oriented architecture for authentication and user management, including database migrations, secure password handling, role support, and middleware for authorization and error handling.

### Key implementations and responsibilities:
- `prisma/schema.prisma`: `User` model defined (primary `id` as `Int`) and migrations tracked in `prisma/migrations` (including a migration that adds `role`).
- Database connection initialized in `src/database/prisma.js` using the Prisma client.
- Authentication flow implemented across `src/modules/auth/*`: registration, login (JWT issuance), and logout (token blacklist in `src/utils/tokenBlacklist.js`).
- User management endpoints in `src/modules/user/*` and `src/routes/user.routes.js`: register, list, and remove users.
- Passwords hashed with `bcrypt`; tokens managed with JWT.
- Middleware: `src/middleware/auth.js` for protected routes, `src/middleware/isAdmin.js` for role-based access, and `src/middleware/errorHandler.js` for centralized error handling.
- Project structure separates `controllers`, `services`, and `repositories` to enforce clear responsibilities and testability.
- A compatibility adapter was added so Prisma v7.8 works correctly with the project setup.

## Tech stack
- Node.js + Express
- Prisma ORM + PostgreSQL
- bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication

### How to run (development)
1. Create a `.env` file with `DATABASE_URL` pointing to your Postgres instance.
2. Install dependencies:

```bash
npm install
```

3. Start in development mode:

```bash
npm run dev
```

### Notes and decisions
- The `User.id` is implemented as `Int` in the Prisma schema to match project requirements and existing migrations.
- Role support was added via the migration `20260521012038_add_role`.
- The repository favors a clean modular layout to simplify maintenance and future extensions (e.g., OAuth providers, email verification).
- Decided to use a blacklist to revoke the tokens easier for now.

