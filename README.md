# nextjs-boilerplate

- place to prototype how new technologies might be used optimally
- catch issues/errors with interactions in other tech.
- reference template for personal/professional projects

Demo: https://nextjs-boilerplate-adam-lane.vercel.app/

## Getting Started

- Install [node](https://nodejs.org/en/download) lts+. Node necessary to build/run next.js
- Install Docker engine. Rancher Desktop ([recommended](https://codeengineered.com/blog/2022/docker-desktop-vs-rancher-desktop/))
- Install package manager. bun ([recommended](https://bun.sh/))
  - `npm install -g bun`
- Copy `.env.example` to `.env.local` and edit variables (app should come up with default values but you will need real values for auth to work)
- `bun dev`

## Development

- `bun dev` - package check, docker (db), migrations, graphql codegen watcher, `next dev`
- `bun dev:init` - just the next.js dev server

## Testing

- `bun run test` - vitest unit tests, playwright e2e tests

## Features

🔥 React + Graphql + Drizzle (Migrate + ORM) + Tailwind

### Frontend

- ⚡ [Next.js](https://nextjs.org) Fullstack react framework with SWC
  - - ✅ [TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript) Strict
  - ts-reset library for extra type safety
  - 📏 [ESLint and Prettier](https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged) on commit with Husky
  - ⚙️ [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) after new dependencies to make sure client size is as expected
  - 🎯 [Absolute imports](https://nextjs.org/docs/pages/building-your-application/configuring/absolute-imports-and-module-aliases) - No more spaghetti imports
    -💎 [Tailwind CSS](https://tailwindcss.com) composable utility classes
  - [next-secure](https://github.com/Enalmada/next-secure) secure headers helper for next.config.js
  - [env-valibot](https://github.com/Enalmada/env-valibot) environment variable validation using valibot
- 💖 [Urql Client](https://formidable.com/open-source/urql/) graphql (state management, subscriptions, etc)
  - Graphql code generation with [client preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client)
- 🔒 [firebase auth](https://github.com/awinogrodzki/next-firebase-auth-edge) edge compatible
- [react-hook-form](https://react-hook-form.com/) for simple and high performance forms
- 🤖 SEO, JSON-LD and Open Graph tags with Next metadata
- [NextUI](https://nextui.org/) react component library
  - [NextUI-Admin](https://github.com/Enalmada/nextui-admin) admin layout and table components
  - [Tailwind Variants](https://www.tailwind-variants.org/) - Create reusable css (css-in-js alternative)
- 🎉 [Storybook](https://storybook.js.org/) for component driven UI development
- [next-pwa](https://github.com/DuCanhGH/next-pwa) service worker with optimized configuration
- [next-intl](https://next-intl-docs.vercel.app/) localization with app directory and [middleware](/src/middleware.ts)
- File Upload via GraphQL

### Backend

- ⚡ [Next.js](https://nextjs.org) API routes. Fullstack and serverless friendly
- Graphql
  - [yoga-server](https://the-guild.dev/graphql/yoga-server) serverless/edge compatible
  - [Pothos](https://pothos-graphql.dev/) "code first" typesafe graphql models
  - [Graphql Armor](https://escape.tech/graphql-armor/) security defaults
- Database
  - [drizzle](https://orm.drizzle.team/) db migrations and typesafe sql query builder
    - [drizzle-helpers](https://github.com/Enalmada/drizzle-helpers) optimized connection, migration, and ORM functions
  - [postgres.js](https://github.com/porsager/postgres) fast postgres driver over traditional pg
  - [CockroachDB](https://www.sprinkledata.com/blogs/cockroachdb-vs-postgresql-a-comprehensive-comparison) free tier, scalable, production ready.

### Dev Ops

- error logging - sentry (see src/pages/\_app.js)
- local and test db running in docker container
- 🛠️ ️[fixpack](https://github.com/henrikjoreteg/fixpack) package.json normalization
- 🚓 commit messages validated with Commitlint
- [Playwright](https://playwright.dev/) e2e tests
- [ViTest](https://vitest.dev/) unit tests
- [GitHub Actions](https://github.com/features/actions) tests

### TODO (potentially)

- [ ] catch FirebaseError: Firebase: Error (auth/popup-closed-by-user).
- [ ] switch hasty todo list to github tracking
- [ ] strict-dynamic CSP in middleware vs next.config.js headers
  - remove static from auth pages so it gets dynamic csp headers
- [ ] better env file handling between a team than .env.local. There must be something better.
- [ ] error handling [review](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [ ] email templating with mjml
- [ ] typesafe routes vs strings
  - kinda started in routes.js but needs more work
  - may already be handled by next-intl
- [ ] graphql enhancements
  - [ ] endpoint post uses csrf
  - [ ] graphql subscriptions (multi device real time)
  - [ ] persisted queries
- [ ] analytics
- [ ] Sitemap.xml and robots.txt with [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)
- [ ] Cloudflare next-on-pages verification. Had sentry bugs that [issue](https://github.com/cloudflare/next-on-pages/issues/420) says is fixed now.
- [ ] figure out a good way for demo to get into /admin side of things
- [ ] setup dependency checking on github actions with Renovate
- [ ] playwright tests

  - [ ] running with github actions
  - [ ] on admin

- [ ] vitest with bun vs node. There were bugs that are [being worked on](https://github.com/oven-sh/bun/issues/4145#issuecomment-1725759116).
  - blocked by [module mock](https://github.com/oven-sh/bun/issues/5394) support
- [ ] playwright tests using bun - blocked

## Alternatives and Inspiration

- [BisonApp](https://github.com/echobind/bisonapp) - Worth reading [why they use tRPC](https://echobind.com/post/why-we-ditched-graphql-for-trpc). I believe gql is still better for corporate projects and [this](https://wundergraph.com/blog/trpc_vs_graphql) is worth a read..
- [T3 App](https://create.t3.gg/) - highly recommended starting point until you understand the pros/cons of other tech options
- [next-13-app-router-with-trpc](https://github.com/solaldunckel/next-13-app-router-with-trpc) - some patterns to consider.
- [BaseJump](https://github.com/Enalmada/basejump) supabase starter

## Notes

### Turbo

Waiting for it to work

- issues with middleware https://github.com/vercel/next.js/issues/42921
- issues with next-intl https://github.com/amannn/next-intl/issues/250
- general https://github.com/vercel/next.js/issues/49174

### Bun vs pnpm

Recommend pnpm for projects that need stability.  
Bun is worth trying out for personal R&D and may be the future of node in a year.

### Deployments

Strongly recommend deploying to Vercel until the cost at scale is prohibitive.
When you need other solutions:

- [Cloud Run](https://cloud.google.com/run) serverless containerized deployment

  - see [cloudbuild.yaml](/cloudbuild.yaml) and [Dockerfile](/Dockerfile)

- [SST](https://docs.sst.dev/start/nextjs)

  - for those already in and experienced with AWS.
  - next.js releases seem to constantly break latest SST release in ways that are not clearly announced.

- Cloudflare [Next-On-Pages](https://github.com/cloudflare/next-on-pages)
  - ideal for static marketing sites in single language. Still maturing rapidly for anything beyond that, check their github issues.
  - next-on-pages deployed on special workers so capabilities are not always comparable to workers
  - bun [limited support](https://community.cloudflare.com/t/no-bun-support-how/554291)
  - apollo client next.js needs some tweaking [issue](https://github.com/apollographql/apollo-client-nextjs/issues/102)
  - links don't seem to work unless page was SSR generated in latest testing. Possibly related to [issue](https://github.com/cloudflare/next-on-pages/issues/469#issuecomment-1736301503)

### Graphql playground

http://localhost:3000/api/graphql
To connect authenticated: `Connection Settings > Edit > Include Cookies > on`

### Database type

CockroachDB was chosen for combination of free tier, postgres compatability, and ultimate scalability.
Some cons

- it doesn't offer edge compatability
- it [isn't officially supported in drizzle yet](https://github.com/drizzle-team/drizzle-orm/issues/845). Migrations with `DO $$` need to be manually converted to `IF NOT EXISTS`
  until [issue](https://github.com/cockroachdb/cockroach/issues/107345) is fixed.

Alternatives:

- Supabase - Wanted something beyond vanilla postgres on backend.
- Neon - love the serverless, branching model, and edge support. Doesn't yet offer in place version upgrades and not interested in doing export/import in production.
- Cloudflare D1 - waiting until it is GA and offers bottomless storage for further consideration.

### To allow the same kube context to work on the host and the container:

Add this to hosts `127.0.0.1 kubernetes.docker.internal`

### Auth

To switch to firebaseui this might be relevant: https://github.com/firebase/firebaseui-web-react/pull/173

Alternatives:

- Next-Auth - Doesn't seem to work cross-platform like React-Native which is critical to me for future safety.
- Clerk - didn't work for me out of the box. [issue](https://github.com/clerkinc/clerk-next-app-router-starter/issues/4#issuecomment-1681753103)
- Supabase - didn't feel comfortable proceeding with it. Here is a [post](https://bombillazo.medium.com/why-i-cannot-fully-recommend-supabase-yet-f8e994201804) with some similar feelings for consideration.

### Favicon

this is what I use to generate quick ones: https://realfavicongenerator.net/
I was using next.js [app directory conversion](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons) but it was adding startup time.

## pg module instead of postgres.js

If you do want pg, note this issue that needed manual patching at time of writing:
https://github.com/brianc/node-postgres/issues/2980#issuecomment-1658765692

# Git branches cleanup

To cleanup branches, I am using this alias: `git config --global alias.branch-prune '!git fetch -p && for b in $(git for-each-ref --format='\''%(if:equals=[gone])%(upstream:track)%(then)%(refname:short)%(end)'\'' refs/heads); do git branch -d $b; done'`

Then run this to delete them safely `git branch-prune`

Reference https://stackoverflow.com/a/61204370/1502448

## Contributing

Feel free to PR anything that you feel is best practice. Please include [changeset](https://github.com/changesets/changesets) with any PR.
