# Startup Boilerplate

## Getting Started
- `npm install -g pnpm`
- Copy `.env.example` to `.env`

## Development mode
- `docker compose up -d`
- `pnpm install`
- `pnpm dev`

### Features

-  ⚡ [Next.js](https://nextjs.org) 
- 🔥 Type checking [TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- 💎 [Tailwind CSS](https://tailwindcss.com)
- ✅ Strict Mode for TypeScript and React 18
- 📏 Linter with [ESLint](https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged) on commit
- 💖 Code Formatter with [Prettier](https://nextjs.org/docs/app/building-your-application/configuring/eslint)
- 🦊 Husky for Git Hooks
- 💡 Absolute Imports using `@` prefix
- ⚙️ [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

#### TODO
- 🚓 Lint git commit with Commitlint
- 📓 Write standard compliant commit messages with Commitizen
- 🦺 Unit Testing with Jest and React Testing Library
- 🧪 E2E Testing with Cypress
- 👷 Run tests on pull request with GitHub Actions
- 🎉 Storybook for UI development
- 🎁 Automatic changelog generation with Semantic Release
- 🔍 Visual testing with Percy (Optional)
- 🤖 SEO metadata, JSON-LD and Open Graph tags with Next SEO
- 🗺️ Sitemap.xml and robots.txt with next-sitemap

## About this project
### Frontend
* React with Next.js - very powerful constantly improving framework.
* Typescript - hoping this is a given in our day and age if using javascript.  
* API - Graphql provides a typesafe interface out of the box.  Apollo Server/Client add
  significant features like cache, optimistic responses on top of that interface.
  * [graphql-codegen](https://the-guild.dev/graphql/codegen/docs/guides/react-vue) provides auto generated types and hooks 
* Authentication - Auth.js with Google OAuth.  Cose effective, secure, scalable.
* validation - YEP is lightweight for client bundles
* CSS - Tailwind for composable utility classes

#### Todo
* error logging - sentry (see src/pages/_app.js)
* forms - react-hook-form makes forms simple and high performance
* e2e testing - Cypress
* unit testing - Jest (majestic ui for convenient dev coverage review)
* deployment - Vercel is quick and easy but demo only.  backend api routes are slow, and db connections have no persistence

### Backend
* backend framework - Next.js backend serverless api routes provide easy node.js starting point.
* database - postgres is the safe choice though I have had my eye on FaunaDB
* ORM - Prisma 
  * See prisma/schema.prisma for mapping
  * DB schema migrations 

#### Todo
* email templating - mjml
* validation - YEP. 

### Other
* fixpack for package.json consistency
* eslint/prettier to normalize and validate formatting

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

