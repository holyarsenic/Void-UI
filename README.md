<p align="center">
  <img src="public/Logo.svg" alt="Void UI logo" width="72" />
</p>
<h1 align="center">Void UI</h1>

<p align="center">
  Describe an interface in plain words and get a polished, working component back.<br>
  Preview it live, keep it in a project, and ship it.
</p>

<h4 align="center">
  <a href="#showcase">Showcase</a> |
  <a href="#demo">Demo</a> |
  <a href="#quick-start">Quick start</a> |
  <a href="#how-it-works">How it works</a> |
  <a href="#features">Features</a> |
  <a href="#project-structure">Structure</a> |
  <a href="#deployment">Deployment</a> |
  <a href="#contributing">Contributing</a>
</h4>

<p align="center">
  <img src="https://img.shields.io/github/stars/holyarsenic/Void-UI?style=for-the-badge&logo=github&logoColor=white&labelColor=0d0d0d&color=3a3a3a" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/holyarsenic/Void-UI?style=for-the-badge&logo=github&logoColor=white&labelColor=0d0d0d&color=3a3a3a" alt="GitHub forks" />
  <img src="https://img.shields.io/github/issues/holyarsenic/Void-UI?style=for-the-badge&logo=github&logoColor=white&labelColor=0d0d0d&color=3a3a3a" alt="GitHub issues" />
  <img src="https://img.shields.io/github/last-commit/holyarsenic/Void-UI?style=for-the-badge&logo=github&logoColor=white&labelColor=0d0d0d&color=3a3a3a" alt="Last commit" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-3a3a3a?style=for-the-badge&labelColor=0d0d0d" alt="MIT licensed" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-1c1c1c?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-2b2b2b?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3a3a3a?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-4a4a4a?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-5a5a5a?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-6a6a6a?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

Void UI turns an idea into an interface. You write what you want in a sentence, the app sends it to Google Gemini with a tuned system prompt, and the generated component appears in a live preview next to your prompt. Happy with it? Save it to a project, pin the ones you like, and come back to them from your history.

<p align="center">
  <img src="src/components/Documentation/images/divider.svg" alt="" width="100%" />
</p>

## Demo

<!-- VIDEO SLOT: the poster below (src/components/Documentation/images/video-poster.svg) links to public/Showcase.mp4, which GitHub opens in its built-in video player.
     For an inline player instead: open this README in the GitHub web editor, drag Showcase.mp4 into it, and GitHub inserts a https://github.com/user-attachments/assets/... link.
     Paste that link on its own line in place of the poster below. -->
<p align="center">
  <a href="public/Showcase.mp4">
    <img src="src/components/Documentation/images/generate.png" alt="Watch the Void UI demo video" width="100%" />
  </a>
</p>

<p align="center">
  <sub>Click the poster to watch the full walkthrough.</sub>
</p>

## Showcase

### Dashboard

Everything lives in one workspace: generate, history, projects, settings and upgrade, one sidebar away.

<!-- IMAGE SLOT 2 (dashboard screenshot): save as src/components/Documentation/images/dashboard.png -->
<table width="100%">
  <tr>
    <td>
      <sub>&#9679; &#9679; &#9679; &nbsp;&nbsp; <b>dashboard</b></sub>
    </td>
  </tr>
  <tr>
    <td>
      <img src="src/components/Documentation/images/dashboard.png" alt="The Void UI dashboard with the sidebar and your recent work" width="100%" />
    </td>
  </tr>
</table>

### Generation

Describe a component in plain words and watch it render in the live preview.

<!-- IMAGE SLOT 3 (generation screenshot): save as src/components/Documentation/images/generate.png -->
<table width="100%">
  <tr>
    <td>
      <sub>&#9679; &#9679; &#9679; &nbsp;&nbsp; <b>generate</b></sub>
    </td>
  </tr>
  <tr>
    <td>
      <img src="src/components/Documentation/images/live-preview.png" alt="The Void UI generate page with a prompt and the live preview of the generated component" width="100%" />
    </td>
  </tr>
</table>

<p align="center">
  <img src="src/components/Documentation/images/divider.svg" alt="" width="100%" />
</p>

<p align="center">
  <img src="src/components/Documentation/images/divider.svg" alt="" width="100%" />
</p>

## Highlights

|                |                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------- |
| Prompt to UI   | Describe a component in plain language and get a finished one back                        |
| Live preview   | See the generated component render as soon as it is ready                                 |
| Projects       | Group generations into projects and pin the ones you want close                           |
| History        | Every generation is saved, so you can reopen and compare earlier results                  |
| Sign in        | Google sign-in through NextAuth, with sessions stored in PostgreSQL                       |
| Billing        | Checkout and webhook handling through Dodo Payments, with an upgrade page in the dashboard |
| Type safety    | TypeScript end to end, with Zod schemas validating every request body                     |
| Ready to ship  | Dockerfile and Compose file included                                                      |


## Quick start

```bash
# 1. Clone the repository
git clone https://github.com/holyarsenic/Void-UI.git
cd Void-UI

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Before the app can generate, sign you in, or take payments, create a `.env` file in the project root with:

- your PostgreSQL connection string for Prisma
- a NextAuth secret
- your Google OAuth client credentials
- a Google Gemini API key
- your Dodo Payments keys

<!-- Add the exact variable names from your code here, for example in a fenced env block. -->

Next.js 16 works best on a current Node.js release, so Node.js 20 or newer is recommended. The repository also includes a `pnpm-workspace.yaml`, so `pnpm install` works too.

## How it works

```mermaid
%%{init: {'theme':'base','themeVariables':{'primaryColor':'#161616','primaryTextColor':'#e5e5e5','primaryBorderColor':'#6b6b6b','lineColor':'#8a8a8a','secondaryColor':'#262626','tertiaryColor':'#0d0d0d','fontFamily':'Inter, Segoe UI, Arial, sans-serif'}}}%%
flowchart LR
    A[Prompt] --> B["POST /api/generate"]
    B --> C["Gemini + system prompt"]
    C --> D[Live preview]
    D --> E[Save to a project]
    E --> F[History and pinned projects]
```

1. **Prompt.** You describe the interface on the generate page.
2. **Generate.** The request is validated with a Zod schema and sent to `/api/generate`, which calls Google Gemini through `@google/genai` using the system prompt in `src/prompt/systemPrompt.ts`.
3. **Preview.** The result is shown right away in the live preview panel.
4. **Save.** Keep it in a project. Pin a project to keep it at the top of your list.
5. **Revisit.** Every generation is stored with your account and shows up in history.

Authentication runs through NextAuth with the Prisma adapter, and billing runs through Dodo Payments with a checkout route and a webhook route.

## Features

- **Prompt-driven generation** with a purpose-built system prompt
- **Live preview** of generated components
- **Recent generations** list on the generate page
- **Projects** with create, rename, delete and pin
- **Generation history** page
- **Settings** page for your account
- **Upgrade** page with checkout and webhook-based billing
- **Landing site** with hero, feature, showcase and sign-up sections
- **Animated interface** built with Motion and light-line effects
- **Docker support** for local runs and deployment

## Tech stack

| Area           | What is used                                                  |
| -------------- | ------------------------------------------------------------- |
| Framework      | Next.js 16 (App Router)                                       |
| Language       | TypeScript                                                    |
| Styling        | Tailwind CSS, class-variance-authority, clsx                  |
| UI             | Base UI, Lucide icons, Motion                                 |
| Database       | PostgreSQL with Prisma 7 and the `@prisma/adapter-pg` driver  |
| Auth           | NextAuth with the Prisma adapter                              |
| AI             | Google Gemini through `@google/genai`                         |
| Payments       | Dodo Payments                                                 |
| Validation     | Zod                                                           |
| Tooling        | ESLint, Husky pre-commit hook, Docker                         |

## Data model

Prisma manages five models: `User`, `Account`, `Session`, `Project` and `Generation`. Migrations live in `src/prisma/migrations`, and the schema is in `src/prisma/schema.prisma`.

## Available scripts

<details>
<summary><b>Show all scripts</b></summary>

| Script                  | What it does                              |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Starts the development server             |
| `npm run build`         | Creates a production build                |
| `npm run start`         | Runs the production build                 |
| `npm run lint`          | Runs ESLint                               |
| `npm run typecheck`     | Runs the TypeScript compiler without emit |
| `npm run prepare`       | Sets up the Husky git hooks               |
| `npm run postinstall`   | Runs automatically after install          |
| `npm run contract:emit` | Emits the Prisma contract                 |

</details>

## API endpoints

<details>
<summary><b>Show all endpoints</b></summary>

| Endpoint                   | Purpose                                  |
| :------------------------- | :--------------------------------------- |
| `/api/auth/[...nextauth]`  | NextAuth sign-in, sign-out and session   |
| `/api/generate`            | Generates a component from a prompt      |
| `/api/projects`            | Lists and creates projects               |
| `/api/projects/[id]`       | Operations on a single project           |
| `/api/projects/[id]/pin`   | Pins or unpins a project                 |
| `/api/billing/checkout`    | Starts a checkout session                |
| `/api/billing/webhook`     | Receives payment events                  |

</details>

## Project structure

<details>
<summary><b>Show the folder layout</b></summary>

```
.
├── .husky/                  pre-commit hook
├── public/                  logo, showcase video and static images
├── src/
│   ├── app/
│   │   ├── api/             auth, billing, generate and projects routes
│   │   ├── auth/login/      sign-in page
│   │   └── dashboard/       generate, history, projects, settings, upgrade
│   ├── assets/              icons and logo components
│   ├── components/
│   │   ├── Auth/            login page
│   │   ├── Dashboard/       generate, live preview, recent generations, sidebar
│   │   ├── Landing/         hero, features, showcase, enroll, footer
│   │   ├── Loading/         auth and generation loaders
│   │   └── ui/              navbar, workflow, buttons, light lines
│   ├── generated/           Prisma client output
│   ├── lib/                 auth, prisma and utils
│   ├── prisma/              schema and migrations
│   ├── prompt/              the system prompt
│   └── schemas/             Zod schemas for billing, checkout, generate, project, user
├── Dockerfile
├── compose.yaml
├── prisma.config.ts
├── next.config.ts
└── package.json
```

</details>

## Deployment

Build and run the container:

```bash
docker build -t void-ui .
docker run -p 3000:3000 --env-file .env void-ui
```

A `compose.yaml` and a `README.Docker.md` are included for Compose-based setups.

## Contributing

Contributions are welcome. The standard flow:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/<your-username>/Void-UI.git`
3. **Branch**: `git checkout -b feature/your-feature`
4. **Commit**: `git commit -m "feat: add some feature"`
5. **Push**: `git push origin feature/your-feature`
6. **Open** a pull request

Please follow the existing code style. A pre-commit hook runs on staged files, and before you open a pull request, run:

```bash
npm run lint
npm run typecheck
```

Ideas and bug reports are welcome in [issues](https://github.com/holyarsenic/Void-UI/issues).

## Star history

<a href="https://star-history.com/#holyarsenic/Void-UI&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=holyarsenic/Void-UI&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=holyarsenic/Void-UI&type=Date" />
    <img alt="Star history for holyarsenic/Void-UI" src="https://api.star-history.com/svg?repos=holyarsenic/Void-UI&type=Date" />
  </picture>
</a>

## License

Void UI is licensed under the [MIT License](LICENSE).

<p align="right">
  <sub>Made by <a href="https://github.com/holyarsenic">holyarsenic</a></sub>
</p>