# Startup Boilerplate

## Getting Started

- Install Docker or Rancher Desktop ([recommended](https://codeengineered.com/blog/2022/docker-desktop-vs-rancher-desktop/))
- Install package manager. pnpm ([recommended](https://www.atatus.com/blog/npm-vs-yarn-vs-pnpm/))
  - `npm install -g pnpm`
- Copy `.env.example` to `.env` and edit variables

## Development mode

- `docker compose up -d`
- `pnpm install`
- `pnpm dev`

## Features

🔥 React + Graphql + Prisma + Tailwind

### Frontend

- ⚡ [Next.js](https://nextjs.org) Fullstack react framework with SWC
  -💎 [Tailwind CSS](https://tailwindcss.com) composable utility classes
- 💖 [Apollo Client](https://www.apollographql.com/docs/react/) graphql (state management, subscriptions, etc)
  - Graphql code generation with [client preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client)
- 🔒 [NextAuth.js](https://authjs.dev/) authentication with jwt (vs database session for best latency)
- react-hook-form for simple and high performance forms

#### Todo

- mantine layout, forms
- error logging - sentry (see src/pages/\_app.js)
- e2e testing - Playwright
- unit testing - ViTest (ViTest ui for convenient dev coverage review)
- deployment - AWS App Runner. quick and easy

### Backend

- ⚡ [Next.js](https://nextjs.org) API routes. Fullstack and serverless friendly
- [TypeGraphQL](https://typegraphql.com/) "code first" typesafe graphql
- [CockroachDB](https://www.prisma.io/docs/guides/database/cockroachdb) database feels like a next gen postgres
- [Prisma](https://www.prisma.io/) ORM
  - See prisma/schema.prisma for intuitive DB mapping
  - schema migrations with [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- 💉 [typedi](https://docs.typestack.community/typedi/) Dependency Injection

### Features

- ✅ [TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript) Strict
- 📏 [ESLint and Prettier](https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged) on commit with Husky
- ⚙️ [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- 💡 Absolute Imports using `@` prefix
- [fixpack](https://github.com/henrikjoreteg/fixpack) package.json consistency
- 🚓 commit messages validated with Commitlint

#### TODO

- 🦺 Unit Testing with ViTest and React Testing Library
- 🧪 E2E Testing with Playwright
- 👷 Run tests on pull request with GitHub Actions
- 🎉 Storybook for UI development
- 🎁 Automatic changelog generation with Semantic Release
- 🤖 SEO metadata, JSON-LD and Open Graph tags with Next SEO
- 🗺️ Sitemap.xml and robots.txt with next-sitemap
- validation - YEP is lightweight for client bundles
- email templating - mjml
- typesafe routes
- PWA service worker config

## TODO

### Technical

- graphql endpoint post uses csrf
- optimistic actions - app performs instant despite slow network
- service worker - PWA, temporary offline support
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
