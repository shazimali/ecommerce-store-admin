#!/bin/bash

# Exit script immediately if a command fails
set -e

echo "=========================================="
echo "🚀 Starting Deployment for everydaygroup.co"
echo "=========================================="

# 1. Pull the latest Docker image from Docker Hub
echo "📥 Pulling latest image from Docker Hub..."
docker compose pull

# 2. Re-create and restart the container in background
echo "🔄 Updating & restarting container..."
docker compose up -d

# 3. Clean up dangling/old images to save VPS disk space
echo "🧹 Pruning old unused images..."
docker image prune -f

echo "=========================================="
echo "✅ Deployment successful! Application is live."
echo "=========================================="
