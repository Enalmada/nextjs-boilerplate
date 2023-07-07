# Startup Boilerplate

## Getting Started
- Install [node](https://nodejs.org/en/download)
- Install Docker or Rancher Desktop ([recommended](https://codeengineered.com/blog/2022/docker-desktop-vs-rancher-desktop/))
- Install package manager. pnpm ([recommended](https://www.atatus.com/blog/npm-vs-yarn-vs-pnpm/))
  - `npm install -g pnpm`
- Copy `.env.example` to `.env.local` and edit variables

## Development mode
- `pnpm dev`

## Features

🔥 React + Graphql + Prisma + Tailwind

### Frontend

- ⚡ [Next.js](https://nextjs.org) Fullstack react framework with SWC
  -💎 [Tailwind CSS](https://tailwindcss.com) composable utility classes
- 💖 [Apollo Client](https://www.apollographql.com/docs/react/) graphql (state management, subscriptions, etc)
  - Graphql code generation with [client preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client)
  - optimistic actions - instant update while network in process
- 🔒 [firebase auth](https://github.com/awinogrodzki/next-firebase-auth-edge) edge compatible
- react-hook-form for simple and high performance forms
- 🗺️ Sitemap.xml and robots.txt with [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)

#### Todo

- error logging - sentry (see src/pages/\_app.js)
- e2e testing - Playwright
- unit testing - ViTest (ViTest ui for convenient dev coverage review)
- deployment - AWS App Runner or Cloudflare pages
- 💎 [CVA](https://cva.style/docs) - Create reusable css (css-in-js alternative)

### Backend

- ⚡ [Next.js](https://nextjs.org) API routes. Fullstack and serverless friendly
- [TypeGraphQL](https://typegraphql.com/) "code first" typesafe graphql
- [CockroachDB](https://www.prisma.io/docs/guides/database/cockroachdb) database feels like a next gen postgres
- [Prisma](https://www.prisma.io/) ORM
  - See prisma/schema.prisma for intuitive DB mapping
  - schema migrations with [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- 💉 [tsyringe](https://github.com/microsoft/tsyringe) Dependency Injection

### Features

- ✅ [TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript) Strict
  - ts-reset library for extra type safety
- 📏 [ESLint and Prettier](https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged) on commit with Husky
- ⚙️ [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- 🎯 [Absolute imports](https://nextjs.org/docs/pages/building-your-application/configuring/absolute-imports-and-module-aliases) - No more spaghetti imports
- 🛠️ ️[fixpack](https://github.com/henrikjoreteg/fixpack) package.json normalization
- 🚓 commit messages validated with Commitlint

#### TODO

- 🦺 Unit Testing with ViTest and React Testing Library
- 🧪 E2E Testing with Playwright
- 👷 Run tests on pull request with GitHub Actions
- 🎉 Storybook for UI development
- 🎁 Automatic changelog generation with Semantic Release
- 🤖 SEO metadata, JSON-LD and Open Graph tags with Next SEO
- validation - YEP is lightweight for client bundles
- email templating - mjml
- typesafe routes
- PWA service worker config
- release-please https://github.com/googleapis/release-please
- graphql endpoint post uses csrf
- graphql subscriptions (multi device real time)
- analytics
- localization - easier if everyone keeps english out of templates from the start

## Notes

### Graphql playground

http://localhost:3000/graphql
to connect authenticated: `Connection Settings > Edit > Include Cookies > on`

### CockroachDB

cockroachdb with docker setup: https://gist.github.com/dbist/ebb1f39f580ad9d07c04c3a3377e2bff
admin-ui: http://127.0.0.1:8080

### To allow the same kube context to work on the host and the container:

127.0.0.1 kubernetes.docker.internal

### Firebase

To switch to firebaseui - read this https://github.com/firebase/firebaseui-web-react/pull/173

### AI Code review

To review all staged files https://medium.com/@samho1996/how-do-i-make-use-of-chatgpt-to-review-my-code-33efd8f42178
Note on windows you will need to set: `npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"`
https://stackoverflow.com/questions/23243353/how-to-set-shell-for-npm-run-scripts-in-windows

### Favicon

use this site to generate: https://realfavicongenerator.net/
