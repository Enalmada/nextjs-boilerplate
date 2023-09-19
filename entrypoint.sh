#!/bin/sh

# Create .env.production.local with all environment variables
printenv > /app/.env.production.local

# Run DB migrations (db url is currently runtime parameter)
bun run drizzle:migrate:prod

# Start Next.js server bound to all network interfaces
# If you use custom server.js, make sure it binds to 0.0.0.0
HOST=0.0.0.0 exec node server.js
