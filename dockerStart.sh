#! /bin/bash

# Checking for container name before starting is faster than trying to start

if [ -z "$(docker ps -q -f name=crdb)" ]; then
  echo "Starting Docker containers..."
  docker compose --env-file .env.local up -d --remove-orphans
else
  echo "Docker containers already running."
fi