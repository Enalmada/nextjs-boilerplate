# Startup Boilerplate

## Getting Started

- Install [node](https://nodejs.org/en/download) (necessary to build/run next.js)
- Install Docker or Rancher Desktop ([recommended](https://codeengineered.com/blog/2022/docker-desktop-vs-rancher-desktop/))
- Install package manager. bun ([recommended](https://bun.sh/))
  - `npm install -g bun`
- Copy `.env.example` to `.env.local` and edit variables

## Development mode

- `bun dev` - brings up docker and graphql codegen watcher in addition to `bun dev`
- `pnpm dev:init` - just the next.js dev experience

## Features

🔥 React + Graphql + Drizzle (Migrate + ORM) + Tailwind

### Frontend

- ⚡ [Next.js](https://nextjs.org) Fullstack react framework with SWC
  - - ✅ [TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript) Strict
  - ts-reset library for extra type safety
  - 📏 [ESLint and Prettier](https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged) on commit with Husky
  - ⚙️ [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
  - 🎯 [Absolute imports](https://nextjs.org/docs/pages/building-your-application/configuring/absolute-imports-and-module-aliases) - No more spaghetti imports
  -💎 [Tailwind CSS](https://tailwindcss.com) composable utility classes
  - [next-secure](https://github.com/Enalmada/next-secure) secure header settings
  - [env-valibot](https://github.com/Enalmada/env-valibot) environment variable validation
- 💖 [Apollo Client](https://www.apollographql.com/docs/react/) graphql (state management, subscriptions, etc)
  - Graphql code generation with [client preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client)
- 🔒 [firebase auth](https://github.com/awinogrodzki/next-firebase-auth-edge) edge compatible
- react-hook-form for simple and high performance forms
- 🤖 SEO, JSON-LD and Open Graph tags with Next metadata
- [NextUI](https://nextui.org/) react component library
  - [NextUI-Admin](https://github.com/Enalmada/nextui-admin) admin layout and table components
  - [Tailwind Variants](https://www.tailwind-variants.org/) - Create reusable css (css-in-js alternative)
- 🎉 [Storybook](https://storybook.js.org/) for component driven UI development
- [next-pwa](https://github.com/DuCanhGH/next-pwa) service worker with optimized configuration
- [next-intl](https://next-intl-docs.vercel.app/) localization with app directory and [middleware](/src/middleware.ts)

### Backend

- ⚡ [Next.js](https://nextjs.org) API routes. Fullstack and serverless friendly
- Graphql
  - [yoga-server](https://the-guild.dev/graphql/yoga-server) serverless/edge compatible
  - [Pothos](https://pothos-graphql.dev/) "code first" typesafe graphql models
  - [Graphql Armor](https://escape.tech/graphql-armor/) security defaults
- Database
  - [drizzle](https://orm.drizzle.team/) db migrations and typesafe sql query builder
    - [drizzle-helpers](https://github.com/Enalmada/drizzle-helpers) optimized connection, migration, and ORM functions
  - [postgres.js](https://github.com/porsager/postgres) fast postgres driver
  - [CockroachDB](https://www.sprinkledata.com/blogs/cockroachdb-vs-postgresql-a-comprehensive-comparison)

### Dev Ops

- error logging - sentry (see src/pages/\_app.js)
- local and test db running in docker container
- 🛠️ ️[fixpack](https://github.com/henrikjoreteg/fixpack) package.json normalization
- 🚓 commit messages validated with Commitlint
- ChatGPT Integration
  - file review `pnpm review <file>`
  - file improve `pnpm improve <file>`
  - [PR code review](https://github.com/anc95/ChatGPT-CodeReview)
- [Playwright](https://playwright.dev/) e2e tests
- [ViTest](https://vitest.dev/) unit tests
- [GitHub Actions](https://github.com/features/actions) tests

### TODO (potentially)

- error handling [review](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- Automatic changelog generation with Semantic Release
- email templating with mjml
- typesafe routes (may already be done through next-intl)
- graphql enhancements
  - endpoint post uses csrf
  - graphql subscriptions (multi device real time)
  - persisted queries
- analytics
- Sitemap.xml and robots.txt with [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)

## Notes

### Deployments

Strongly recommend deploying to Vercel until the cost at scale is prohibitive.
When you need other solutions:

- [Cloud Run](https://cloud.google.com/run) serverless containerized deployment
  - see [cloudbuild.yaml](/cloudbuild.yaml) and [Dockerfile](/Dockerfile)

- [SST](https://docs.sst.dev/start/nextjs)
  - for those already in and experienced with AWS.
  - next.js releases seem to constantly break latest SST release in ways that are not clearly announced. 

- Cloudflare [Next-On-Pages](https://github.com/cloudflare/next-on-pages)
  - ideal for marketing sites.  Still maturing rapidly for anything beyond that, check their github issues.
  - Sentry not supported at time of writing (but discussions are in progress).
  - next-on-pages deployed on special workers so capabilities are not always comparable to workers 

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
