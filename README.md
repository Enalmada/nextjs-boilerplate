# Startup Boilerplate

## Getting Started

- Install [node](https://nodejs.org/en/download)
- Install Docker or Rancher Desktop ([recommended](https://codeengineered.com/blog/2022/docker-desktop-vs-rancher-desktop/))
- Install package manager. pnpm ([recommended](https://www.atatus.com/blog/npm-vs-yarn-vs-pnpm/))
  - `npm install -g pnpm`
- Copy `.env.example` to `.env.local` and edit variables

## Development mode

- `pnpm dev:init` - brings up docker and graphql codegen watcher in addition to `pnpm dev`
- `pnpm dev` - just the next.js dev experience

## Features

🔥 React + Graphql + Prisma Migrate + Kysely ORM + Tailwind

### Frontend

- ⚡ [Next.js](https://nextjs.org) Fullstack react framework with SWC
  - - ✅ [TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript) Strict
  - ts-reset library for extra type safety
  - 📏 [ESLint and Prettier](https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged) on commit with Husky
  - ⚙️ [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
  - 🎯 [Absolute imports](https://nextjs.org/docs/pages/building-your-application/configuring/absolute-imports-and-module-aliases) - No more spaghetti imports
    -💎 [Tailwind CSS](https://tailwindcss.com) composable utility classes
- 💖 [Apollo Client](https://www.apollographql.com/docs/react/) graphql (state management, subscriptions, etc)
  - Graphql code generation with [client preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client)
- 🔒 [firebase auth](https://github.com/awinogrodzki/next-firebase-auth-edge) edge compatible
- react-hook-form for simple and high performance forms
- 🤖 SEO, JSON-LD and Open Graph tags with Next metadata
- [NextUI](https://nextui.org/) react component library

### Backend

- ⚡ [Next.js](https://nextjs.org) API routes. Fullstack and serverless friendly
- Graphql
  - [yoga-server](https://the-guild.dev/graphql/yoga-server) serverless/edge compatible
  - [Pothos](https://pothos-graphql.dev/) "code first" typesafe graphql
  - [Graphql Armor](https://escape.tech/graphql-armor/) security defaults
- Database
  - schema migrations with [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
  - [drizzle](https://kysely.dev/) typesafe sql query builder
  - [postgres.js](https://github.com/porsager/postgres) fast postgres driver
  - [CockroachDB](https://www.prisma.io/docs/guides/database/cockroachdb) database (a next gen postgres)

### Dev Ops

- error logging - sentry (see src/pages/\_app.js)
- local and test db running in docker container
- 🛠️ ️[fixpack](https://github.com/henrikjoreteg/fixpack) package.json normalization
- 🚓 commit messages validated with Commitlint
- ChatGPT Integration
  - file review `pnpm review <file>`
  - file improve `pnpm improve <file>`
  - [PR code review](https://github.com/anc95/ChatGPT-CodeReview)

### TODO

- https://nextjs.org/docs/app/building-your-application/routing/error-handling
- e2e testing - Playwright
- unit testing - ViTest (ViTest ui for convenient dev coverage review)
- 💎 [Tailwind Variants](https://www.tailwind-variants.org/) - Create reusable css (css-in-js alternative)
- 🦺 Unit Testing with ViTest and React Testing Library
- 🧪 E2E Testing with Playwright
- 👷 Run tests on pull request with GitHub Actions
- 🎉 Storybook for UI development
- 🎁 Automatic changelog generation with Semantic Release
- email templating - mjml
- typesafe routes
- PWA service worker config
- graphql endpoint post uses csrf
- graphql subscriptions (multi device real time)
- analytics
- localization - easier if everyone keeps english out of templates from the start
- deployment - AWS App Runner or [Cloudflare pages](https://github.com/cloudflare/next-on-pages)
- release-please https://github.com/googleapis/release-please
- 🗺️ Sitemap.xml and robots.txt with [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)
- 💉 [tsyringe](https://github.com/microsoft/tsyringe) Dependency Injection
-

## Notes

### Deployments

Currently deployable to vercel.
Probably works on https://docs.sst.dev/start/nextjs but needs confirmation
Cloudflare pages is waiting on:

- https://github.com/awinogrodzki/next-firebase-auth-edge/issues/69

### Graphql playground

http://localhost:3000/graphql
to connect authenticated: `Connection Settings > Edit > Include Cookies > on`

### CockroachDB

cockroachdb with docker setup: https://gist.github.com/dbist/ebb1f39f580ad9d07c04c3a3377e2bff
admin-ui: http://127.0.0.1:8080

### To allow the same kube context to work on the host and the container:

Add this to hosts `127.0.0.1 kubernetes.docker.internal`

### Firebase

To switch to firebaseui - read this https://github.com/firebase/firebaseui-web-react/pull/173

### AI Code review

To review all staged files https://medium.com/@samho1996/how-do-i-make-use-of-chatgpt-to-review-my-code-33efd8f42178
Note on windows you will need to set: `npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"`
https://stackoverflow.com/questions/23243353/how-to-set-shell-for-npm-run-scripts-in-windows

### Favicon

use this site to generate: https://realfavicongenerator.net/

## pg module instead of postgres.js

patches/pg@8.11.1.patch is to make it work for now
https://github.com/brianc/node-postgres/issues/2980#issuecomment-1658765692

## Edge firebase auth

Currently getting error locally. Windows bug

- error Error: Invariant: Method expects to have requestAsyncStorage, none available
  at ServerAuthProvider (./src/lib/firebase/auth/server-auth-provider.tsx:36:162)
  at stringify (<anonymous>)
  https://github.com/vercel/next.js/issues/52176#issuecomment-1670113973

## Cloudflare

Run intellij from wsl
https://www.reddit.com/r/IntelliJIDEA/comments/t5l3s6/comment/isdbh2y/?utm_source=share&utm_medium=web2x&context=3

# Git

To cleanup branches, run this to create an alias that will find them:
`git config --global alias.branch-prune '!git fetch -p && for b in $(git for-each-ref --format='\''%(if:equals=[gone])%(upstream:track)%(then)%(refname:short)%(end)'\'' refs/heads); do git branch -d $b; done'`
Then run this to delete them safely
`git branch-prune`
