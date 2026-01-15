#!/bin/bash
# Frontend Instance Startup Script
# This script runs when a new frontend instance is created

set -e

# Log output to file
exec > >(tee -a /var/log/startup-script.log) 2>&1
echo "Starting frontend instance setup at $(date)"

# Update system
apt-get update
apt-get upgrade -y

# Install required packages
apt-get install -y curl git nginx

# Create application user
useradd -m -s /bin/bash healthcard || true

# Create application directory
mkdir -p /var/www/healthcard/frontend
chown -R healthcard:healthcard /var/www/healthcard

# Copy application from Cloud Storage
gsutil -m cp -r gs://healthcard-deployment-bucket/frontend/dist/* /var/www/healthcard/frontend/ || echo "Bucket copy failed, using manual deployment"

# Set correct ownership
chown -R healthcard:healthcard /var/www/healthcard/frontend

# Configure Nginx
cat > /etc/nginx/sites-available/healthcard << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/healthcard/frontend;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json;
    gzip_disable "MSIE [1-6]\.";

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/healthcard /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl enable nginx
systemctl restart nginx

# Install and configure ops-agent for monitoring
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
bash add-google-cloud-ops-agent-repo.sh --also-install
systemctl enable google-cloud-ops-agent
systemctl start google-cloud-ops-agent

echo "Frontend instance setup completed at $(date)"
