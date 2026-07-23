#!/bin/bash

# Exit script immediately if a command fails
set -e

COMPOSE_FILE="/var/www/everyday_shop/admin/docker-compose.yml"

echo "=========================================="
echo "🚀 Starting Deployment for everydaygroup.co"
echo "=========================================="

# 1. Pull the latest Docker image from Docker Hub
echo "📥 Pulling latest image from Docker Hub..."
docker compose -f $COMPOSE_FILE pull

# 2. Re-create and restart the container in background
echo "🔄 Updating & restarting container..."
docker compose -f $COMPOSE_FILE up -d

# 3. Clean up dangling/old images to save VPS disk space
echo "🧹 Pruning old unused images..."
docker image prune -f

echo "=========================================="
echo "✅ Deployment successful! Application is live."
echo "=========================================="
