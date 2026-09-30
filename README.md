# Void-UI

![GitHub stars](https://img.shields.io/github/stars/holyarsenic/Void-UI?style=for-the-badge&logo=github) ![GitHub forks](https://img.shields.io/github/forks/holyarsenic/Void-UI?style=for-the-badge&logo=github) ![GitHub issues](https://img.shields.io/github/issues/holyarsenic/Void-UI?style=for-the-badge&logo=github) ![Last commit](https://img.shields.io/github/last-commit/holyarsenic/Void-UI?style=for-the-badge&logo=github) ![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

## Description

Void UI — builds UI components from simple prompts, turn your ideas into polished interfaces instantly.

## Tech Stack

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Notable libraries:** NextAuth, Zod

## Quick Start

```bash

# 1. Clone the repository
git clone https://github.com/holyarsenic/Void-UI.git

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

## Key Dependencies

```
@auth/prisma-adapter: ^2.11.3
@base-ui/react: ^1.7.0
@google/genai: ^2.21.0
@prisma/adapter-pg: ^7.10.0
@prisma/client: ^7.10.0
@prisma/orm-postgres: 8.0.0-rc.8
class-variance-authority: ^0.7.1
clsx: ^2.1.1
date-fns: ^4.4.0
dodopayments: ^2.49.0
dotenv: ^17.4.2
esbuild-wasm: ^0.28.2
lucide-react: ^1.33.0
motion: ^13.1.1
next: 16.3.1
```

## Available Scripts

- **dev** — `npm run dev`
- **build** — `npm run build`
- **start** — `npm run start`
- **lint** — `npm run lint`
- **typecheck** — `npm run typecheck`
- **prepare** — `npm run prepare`
- **postinstall** — `npm run postinstall`
- **contract:emit** — `npm run contract:emit`

## API Endpoints

Detected endpoints (best-effort scan):

```
/api/auth/[...nextauth]
/api/billing/checkout
/api/billing/webhook
/api/generate
/api/projects/[id]/pin
/api/projects/[id]
/api/projects
```

## Project Structure

```
.
├── .husky
│   └── pre-commit
├── Dockerfile
├── LICENSE
├── README.Docker.md
├── components.json
├── compose.yaml
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── prisma-next.md
├── prisma.config.ts
├── public
│   ├── Logo.svg
│   ├── Showcase.mp4
│   ├── Void.jpg
│   └── default-profile.jpg
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       └── ...
│   │   │   ├── billing
│   │   │   │   ├── checkout
│   │   │   │   │   └── ...
│   │   │   │   └── webhook
│   │   │   │       └── ...
│   │   │   ├── generate
│   │   │   │   └── route.ts
│   │   │   └── projects
│   │   │       ├── [id]
│   │   │       │   └── ...
│   │   │       └── route.ts
│   │   ├── auth
│   │   │   └── login
│   │   │       └── page.tsx
│   │   ├── dashboard
│   │   │   ├── generate
│   │   │   │   └── page.tsx
│   │   │   ├── history
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── projects
│   │   │   │   ├── generate
│   │   │   │   │   └── ...
│   │   │   │   └── page.tsx
│   │   │   ├── settings
│   │   │   │   └── page.tsx
│   │   │   └── upgrade
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── icon.svg
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── assets
│   │   ├── Icons
│   │   │   ├── Google.tsx
│   │   │   └── blackhole.tsx
│   │   └── Logo
│   │       └── Logo.tsx
│   ├── components
│   │   ├── Auth
│   │   │   └── LoginPage.tsx
│   │   ├── Dashboard
│   │   │   ├── GenerateComponents
│   │   │   │   ├── GenerateComp.tsx
│   │   │   │   ├── LivePreview.tsx
│   │   │   │   └── RecentGenerations.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── Landing
│   │   │   ├── Enroll.tsx
│   │   │   ├── Feature.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── ShowCase.tsx
│   │   ├── Loading
│   │   │   ├── AuthLoading.tsx
│   │   │   └── GenerateCompLoader.tsx
│   │   └── ui
│   │       ├── Navbar.tsx
│   │       ├── WorkFlow.tsx
│   │       ├── button.tsx
│   │       ├── interactive-hover-button.tsx
│   │       └── light-lines.tsx
│   ├── generated
│   │   ├── browser.ts
│   │   ├── client.ts
│   │   ├── commonInputTypes.ts
│   │   ├── enums.ts
│   │   ├── internal
│   │   │   ├── class.ts
│   │   │   ├── prismaNamespace.ts
│   │   │   └── prismaNamespaceBrowser.ts
│   │   ├── models
│   │   │   ├── Account.ts
│   │   │   ├── Generation.ts
│   │   │   ├── Project.ts
│   │   │   ├── Session.ts
│   │   │   └── User.ts
│   │   └── models.ts
│   ├── lib
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   └── utils.ts
│   ├── prisma
│   │   ├── migrations
│   │   │   ├── 20260907051401_add_projects_generations
│   │   │   │   └── migration.sql
│   │   │   ├── 20260907065443_add_password
│   │   │   │   └── migration.sql
│   │   │   ├── 20260908064344_add_razorpay_billing
│   │   │   │   └── migration.sql
│   │   │   ├── 20260909134735_add_billing
│   │   │   │   └── migration.sql
│   │   │   ├── 20260914052407_make_password_optional
│   │   │   │   └── migration.sql
│   │   │   ├── 20260914062222_add_google_fields
│   │   │   │   └── migration.sql
│   │   │   ├── 20260916131857_remove_password
│   │   │   │   └── migration.sql
│   │   │   ├── 20260916134053_add_nextauth_models
│   │   │   │   └── migration.sql
│   │   │   ├── 20260930062740_add_project_pinning
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   └── schema.prisma
│   ├── prompt
│   │   └── systemPrompt.ts
│   ├── proxy.ts
│   └── schemas
│       ├── Billing.schema.ts
│       ├── CheckOut.schema.ts
│       ├── Generate.schema.ts
│       ├── Project.schema.ts
│       └── User.schema.ts
└── tsconfig.json
```

## Development Setup

### Node.js / JavaScript
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` (or `yarn` / `pnpm install` / `bun install`)
3. Start the dev server: see the **Quick Start** above

### Docker
1. `docker build -t my-app .`
2. `docker run -p 3000:3000 my-app`

## Deployment

### Docker
```bash
docker build -t void-ui .
docker run -p 3000:3000 void-ui
```

## Contributing

Contributions are welcome! Here's the standard flow:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/holyarsenic/Void-UI.git`
3. **Branch**: `git checkout -b feature/your-feature`
4. **Commit**: `git commit -m 'feat: add some feature'`
5. **Push**: `git push origin feature/your-feature`
6. **Open** a pull request

Please follow the existing code style and include tests for new behavior where applicable.

## License

This project is licensed under the **MIT** License.

---
