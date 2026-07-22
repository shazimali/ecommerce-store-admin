# Stage 1: Build stage
FROM node:24-alpine AS build-stage

WORKDIR /app

# Copy package lock and configuration
COPY package*.json ./

# Install dependencies
RUN npm ci --ignore-scripts

# Copy full application code
COPY . .

# Build arguments for Vite environment variables
ARG VITE_API_URL
ARG VITE_PUSHER_APP_KEY
ARG VITE_PUSHER_APP_CLUSTER

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_PUSHER_APP_KEY=$VITE_PUSHER_APP_KEY
ENV VITE_PUSHER_APP_CLUSTER=$VITE_PUSHER_APP_CLUSTER

# Build icons and production static assets
RUN npm run build:icons
RUN npm run build

# Stage 2: Production Nginx stage
FROM nginx:alpine AS production-stage

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
