# Startup Boilerplate

## Getting Started
- `npm install -g pnpm`
- Copy `.env.example` to `.env`

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
- 🔒 [Auth.js](https://authjs.dev/) authentication  

#### Todo
- [stailwc](https://github.com/arlyon/stailwc) tailwind with the power of css-in-js
* error logging - sentry (see src/pages/_app.js)
* forms - react-hook-form makes forms simple and high performance
* e2e testing - Playwright
* unit testing - ViTest (ViTest ui for convenient dev coverage review)
* deployment - AWS App Runner. quick and easy

### Backend
- ⚡ [Next.js](https://nextjs.org) API routes.  Fullstack and serverless friendly
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

#### TODO
- 🚓 Lint git commit with Commitlint
- 📓 Write standard compliant commit messages with Commitizen
- 🦺 Unit Testing with ViTest and React Testing Library
- 🧪 E2E Testing with Playwright
- 👷 Run tests on pull request with GitHub Actions
- 🎉 Storybook for UI development
- 🎁 Automatic changelog generation with Semantic Release
- 🔍 Visual testing with Percy (Optional)
- 🤖 SEO metadata, JSON-LD and Open Graph tags with Next SEO
- 🗺️ Sitemap.xml and robots.txt with next-sitemap
- validation - YEP is lightweight for client bundles
- email templating - mjml



## TODO
### Technical
* graphql endpoint post uses csrf and server cookie
* optimistic actions - app performs instant despite slow network
* service worker - PWA, temporary offline support
* graphql subscriptions (multi device real time)
* full coverage of Jest and Cypress testing
* analytics
* localization - easier if everyone keeps english out of templates from the start


## Notes

