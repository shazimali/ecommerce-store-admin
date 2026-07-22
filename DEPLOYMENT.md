# Docker Hub CI/CD & VPS Deployment Guide

This guide explains how to configure GitHub Secrets, trigger automatic Docker image builds via GitHub Actions, and deploy/pull the container on your VPS for **everydaygroup.co** on port **85**.

---

## 1. Configure GitHub Secrets

Go to your GitHub repository:
**Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret**

Add the following Secrets:

### Docker Hub Credentials

| Secret Name | Description |
| :--- | :--- |
| `DOCKER_HUB_USERNAME` | Your Docker Hub account username (e.g. `shazimali`) |
| `DOCKER_HUB_TOKEN` | Docker Hub Access Token generated from [Docker Hub Settings -> Security](https://hub.docker.com/settings/security) |
| `DOCKER_HUB_IMAGE` | Docker Hub repository name (e.g. `shazimali/ecommerce-store-admin`) |

### Application Build Secrets (Vite Environment Variables)

| Secret Name | Description / Example Value |
| :--- | :--- |
| `VITE_API_URL` | `https://everydayplastic.co/api/admin` |
| `VITE_PUSHER_APP_KEY` | Pusher App Key |
| `VITE_PUSHER_APP_CLUSTER` | `ap2` |

---

## 2. Automatic Build & Push

Once secrets are configured on GitHub, pushing code to your `main` or `master` branch will automatically trigger `.github/workflows/docker-build-push.yml`.

The workflow will:
1. Safely inject `VITE_*` secrets as build arguments into the Vite compiler (`npm run build`).
2. Package the built static dist inside a lightweight Nginx container (`nginx:alpine`).
3. Push two tags to Docker Hub:
   - `${DOCKER_HUB_IMAGE}:latest`
   - `${DOCKER_HUB_IMAGE}:<git-commit-sha>`

---

## 3. Deployment on VPS (Host Port 85)

### Using `deploy.sh` (1-Click Deployment)

1. **SSH into your VPS** and clone/copy the project files.
2. Create a `.env` file in the project folder on your VPS:
   ```bash
   echo "DOCKER_HUB_IMAGE=yourdockerhubusername/your-repository-name" > .env
   ```
3. Authenticate with Docker Hub on your VPS (if private):
   ```bash
   docker login -u yourdockerhubusername
   ```
4. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

The script automatically pulls the latest image, swaps the container with zero downtime, and cleans up old unused Docker images.

---

## 4. VPS Host VirtualHost Setup (`000-default.conf`)

To connect domain `everydaygroup.co` (HTTP/HTTPS ports 80/443) to your Docker container running on port **85**, copy the included `000-default.conf` configuration file to your web server:

### For Nginx Host Server:
```bash
sudo cp 000-default.conf /etc/nginx/sites-available/000-default.conf
sudo ln -sf /etc/nginx/sites-available/000-default.conf /etc/nginx/sites-enabled/000-default.conf
sudo nginx -t
sudo systemctl reload nginx
```

### For Apache Host Server:
Enable required modules and copy config:
```bash
sudo a2enmod proxy proxy_http
sudo cp 000-default.conf /etc/apache2/sites-available/000-default.conf
sudo a2ensite 000-default.conf
sudo systemctl reload apache2
```

### Free SSL Certificate Setup (Certbot)
```bash
sudo certbot --nginx -d everydaygroup.co -d www.everydaygroup.co
# Or for Apache:
# sudo certbot --apache -d everydaygroup.co -d www.everydaygroup.co
```

---

## 5. Updating Production Application

Whenever new code is pushed to GitHub, simply run on your VPS:
```bash
./deploy.sh
```
