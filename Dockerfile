# Base stage
FROM node:20-alpine AS base
WORKDIR /app

# Dependencies stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
COPY .npmrc ./
RUN pnpm i --frozen-lockfile --ignore-scripts

# Builder stage
FROM base AS builder

ARG REDIRECT_URL
ENV NEXT_PUBLIC_REDIRECT_URL=${REDIRECT_URL}

ARG FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}

ARG FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_API_KEY=${FIREBASE_API_KEY}

ARG FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${FIREBASE_AUTH_DOMAIN}

ARG FIREBASE_DATABASE_URL
ENV NEXT_PUBLIC_FIREBASE_DATABASE_URL=${FIREBASE_DATABASE_URL}

ARG FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${FIREBASE_MESSAGING_SENDER_ID}

ARG AXIOM_TOKEN
ENV NEXT_PUBLIC_AXIOM_TOKEN=${AXIOM_TOKEN}

ARG AXIOM_DATASET
ENV NEXT_PUBLIC_AXIOM_DATASET=${AXIOM_DATASET}

WORKDIR /app

USER root
RUN printenv > .env.production.local

RUN apk add --no-cache libc6-compat && npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN SKIP_ENV_VALIDATION=1 pnpm run build

# Runner stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Next.js seems to insist on only seeing variables in a .env file rather than process
USER root
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
RUN touch /app/.env.production.local && chown nextjs:nodejs /app/.env.production.local

USER nextjs

# Copy build artifacts from the builder stage
# Note that you must copy public and static into standalone manually
# https://github.com/vercel/next.js/issues/50931#issuecomment-1581481834
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Additional Copies
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./standalone/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./standalone/public

ENV PORT 3000
EXPOSE 3000
ENV HOSTNAME 0.0.0.0

ENTRYPOINT ["./entrypoint.sh"]
