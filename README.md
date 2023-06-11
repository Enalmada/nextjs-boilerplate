# Startup Boilerplate

## Getting Started
- `npm install -g pnpm`
- Copy `.env.example` to `.env`

## Development mode
- `docker compose up -d`
- `pnpm install`
- `pnpm run dev`

## About this project
### Frontend
* React with Next.js - very powerful constantly improving framework.
* Typescript - hoping this is a given in our day and age if using javascript.  
* API - Graphql provides a typesafe interface out of the box.  Apollo Server/Client add
  significant features like cache, optimistic responses on top of that interface.
  * graphql-codegen provides auto generated types and hooks 
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

