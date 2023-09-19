#!/bin/sh

# Create .env.production.local with all environment variables
printenv > /app/.env.production.local

# Start Next.js server bound to all network interfaces
# If you use custom server.js, make sure it binds to 0.0.0.0
HOST=0.0.0.0 exec bun server.js
