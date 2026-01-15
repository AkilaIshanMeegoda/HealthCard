#!/bin/bash
# Backend Instance Startup Script
# This script runs when a new backend instance is created

set -e

# Log output to file
exec > >(tee -a /var/log/startup-script.log) 2>&1
echo "Starting backend instance setup at $(date)"

# Update system
apt-get update
apt-get upgrade -y

# Install required packages
apt-get install -y curl git nginx

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Create application user
useradd -m -s /bin/bash healthcard || true

# Create application directory
mkdir -p /var/www/healthcard/backend
mkdir -p /var/log/healthcard
chown -R healthcard:healthcard /var/www/healthcard
chown -R healthcard:healthcard /var/log/healthcard

# Install Google Cloud SDK (for Secret Manager)
apt-get install -y apt-transport-https ca-certificates gnupg
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
apt-get update
apt-get install -y google-cloud-sdk

# Get project ID from metadata
PROJECT_ID=$(curl -s "http://metadata.google.internal/computeMetadata/v1/project/project-id" -H "Metadata-Flavor: Google")

# Fetch secrets from Secret Manager
MONGODB_URL=$(gcloud secrets versions access latest --secret="mongodb-connection-string" --project="$PROJECT_ID")
JWT_SECRET=$(gcloud secrets versions access latest --secret="jwt-secret" --project="$PROJECT_ID")

# Create environment file
cat > /var/www/healthcard/backend/.env << EOF
NODE_ENV=production
PORT=3000
MONGODB_URL=${MONGODB_URL}
JWT_SECRET=${JWT_SECRET}
CORS_ORIGIN=https://your-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
EOF

chown healthcard:healthcard /var/www/healthcard/backend/.env
chmod 600 /var/www/healthcard/backend/.env

# Clone or copy application code
# Option 1: Clone from Git (recommended for production)
# cd /var/www/healthcard/backend
# sudo -u healthcard git clone https://github.com/your-repo/healthcard-backend.git .

# Option 2: Copy from Cloud Storage bucket
gsutil -m cp -r gs://healthcard-deployment-bucket/backend/* /var/www/healthcard/backend/ || echo "Bucket copy failed, using manual deployment"

# Set correct ownership
chown -R healthcard:healthcard /var/www/healthcard/backend

# Install dependencies
cd /var/www/healthcard/backend
sudo -u healthcard npm ci --production

# Setup PM2 to run as healthcard user
sudo -u healthcard pm2 startup systemd -u healthcard --hp /home/healthcard
sudo -u healthcard pm2 start ecosystem.config.js --env production
sudo -u healthcard pm2 save

# Install and configure ops-agent for monitoring
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
bash add-google-cloud-ops-agent-repo.sh --also-install
systemctl enable google-cloud-ops-agent
systemctl start google-cloud-ops-agent

echo "Backend instance setup completed at $(date)"
