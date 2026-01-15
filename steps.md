GitHub Copilot: # Enterprise-Grade MERN Stack Deployment on GCP (Non-Kubernetes)

I'll provide you with a complete enterprise production deployment guide using **GCP Compute Engine with Managed Instance Groups (MIGs)**, **Cloud Load Balancer**, **Cloud SQL**, and all security best practices.

---

## 🏗️ Architecture Overview

```
                    ┌─────────────────────────────────────────────────────────────┐
                    │                        INTERNET                              │
                    └─────────────────────────────────────────────────────────────┘
                                              │
                                              ▼
                    ┌─────────────────────────────────────────────────────────────┐
                    │              Cloud DNS (your-domain.com)                     │
                    └─────────────────────────────────────────────────────────────┘
                                              │
                                              ▼
                    ┌─────────────────────────────────────────────────────────────┐
                    │           Cloud Armor (WAF/DDoS Protection)                  │
                    └─────────────────────────────────────────────────────────────┘
                                              │
                                              ▼
                    ┌─────────────────────────────────────────────────────────────┐
                    │      Global HTTPS Load Balancer (SSL Certificate)            │
                    └─────────────────────────────────────────────────────────────┘
                              │                                    │
                              ▼                                    ▼
               ┌──────────────────────────┐         ┌──────────────────────────┐
               │   Frontend MIG (React)    │         │   Backend MIG (Node.js)   │
               │   Auto-scaling 2-10       │         │   Auto-scaling 2-10       │
               └──────────────────────────┘         └──────────────────────────┘
                                                               │
                                                               ▼
                                            ┌─────────────────────────────────────┐
                                            │    MongoDB Atlas / Cloud Memorystore │
                                            └─────────────────────────────────────┘
```

---

## 📋 PHASE 1: GCP Account & Project Setup

### Step 1.1: Access Google Cloud Console

1. Open browser → Go to **https://console.cloud.google.com**
2. Sign in with your Google account that has the $300 credit
3. You'll see the GCP Console Dashboard

### Step 1.2: Create a New Project

1. Click the **project dropdown** at the top left (next to "Google Cloud" logo)
2. Click **"NEW PROJECT"** button (top right of popup)
3. Enter:
   - **Project name**: `healthcard-production`
   - **Project ID**: Auto-generated (or customize like `healthcard-prod-2026`)
   - **Billing account**: Select your billing account with $300 credit
   - **Location**: Leave as "No organization" or select if you have one
4. Click **"CREATE"**
5. Wait 30-60 seconds for project creation
6. Click **"SELECT PROJECT"** when notification appears

### Step 1.3: Enable Required APIs

1. Go to **Navigation Menu (☰)** → **APIs & Services** → **Library**
2. Search and enable each of these APIs (click each, then click "ENABLE"):
   - **Compute Engine API**
   - **Cloud DNS API**
   - **Cloud Load Balancing API** (included in Compute)
   - **Cloud Armor API**
   - **Secret Manager API**
   - **Cloud Monitoring API**
   - **Cloud Logging API**
   - **Identity and Access Management (IAM) API**
   - **VPC Access API**
   - **Cloud Build API**

### Step 1.4: Set Up Billing Alerts

1. Go to **Navigation Menu (☰)** → **Billing**
2. Click your billing account
3. Click **"Budgets & alerts"** in left sidebar
4. Click **"CREATE BUDGET"**
5. Configure:
   - **Name**: `healthcard-budget`
   - **Projects**: Select `healthcard-production`
   - **Budget amount**: `$250` (to leave buffer)
   - **Alert thresholds**: 50%, 75%, 90%, 100%
   - **Email notifications**: Enable
6. Click **"FINISH"**

---

## 📋 PHASE 2: VPC Network & Security Setup

### Step 2.1: Create Custom VPC Network

1. Go to **Navigation Menu (☰)** → **VPC network** → **VPC networks**
2. Click **"CREATE VPC NETWORK"**
3. Configure:
   - **Name**: `healthcard-vpc`
   - **Description**: `Production VPC for HealthCard application`
   - **Subnet creation mode**: **Custom**
4. Add First Subnet (for backend):
   - Click **"ADD SUBNET"**
   - **Name**: `backend-subnet`
   - **Region**: `us-central1` (or your preferred region)
   - **IP address range**: `10.0.1.0/24`
   - **Private Google Access**: **On**
   - **Flow logs**: **On** (for monitoring)
5. Add Second Subnet (for frontend):
   - Click **"ADD SUBNET"**
   - **Name**: `frontend-subnet`
   - **Region**: `us-central1`
   - **IP address range**: `10.0.2.0/24`
   - **Private Google Access**: **On**
   - **Flow logs**: **On**
6. Add Third Subnet (for database/internal):
   - Click **"ADD SUBNET"**
   - **Name**: `data-subnet`
   - **Region**: `us-central1`
   - **IP address range**: `10.0.3.0/24`
   - **Private Google Access**: **On**
   - **Flow logs**: **On**
7. **Firewall rules**: Select **"Create custom firewall rules later"**
8. **Dynamic routing mode**: **Regional**
9. Click **"CREATE"**

### Step 2.2: Create Firewall Rules

#### Rule 1: Allow SSH from IAP (Secure SSH)

1. Go to **VPC network** → **Firewall**
2. Click **"CREATE FIREWALL RULE"**
3. Configure:
   - **Name**: `allow-ssh-iap`
   - **Network**: `healthcard-vpc`
   - **Priority**: `1000`
   - **Direction**: **Ingress**
   - **Action**: **Allow**
   - **Targets**: **Specified target tags**
   - **Target tags**: `allow-ssh`
   - **Source filter**: **IPv4 ranges**
   - **Source IPv4 ranges**: `35.235.240.0/20` (Google IAP range)
   - **Protocols and ports**: **Specified protocols and ports**
   - **TCP**: `22`
4. Click **"CREATE"**

#### Rule 2: Allow Health Checks

1. Click **"CREATE FIREWALL RULE"**
2. Configure:
   - **Name**: `allow-health-checks`
   - **Network**: `healthcard-vpc`
   - **Priority**: `1000`
   - **Direction**: **Ingress**
   - **Action**: **Allow**
   - **Targets**: **All instances in the network**
   - **Source filter**: **IPv4 ranges**
   - **Source IPv4 ranges**: `130.211.0.0/22, 35.191.0.0/16`
   - **Protocols and ports**: **Specified protocols and ports**
   - **TCP**: `80, 443, 3000, 5173`
3. Click **"CREATE"**

#### Rule 3: Allow Load Balancer to Backend

1. Click **"CREATE FIREWALL RULE"**
2. Configure:
   - **Name**: `allow-lb-backend`
   - **Network**: `healthcard-vpc`
   - **Priority**: `1000`
   - **Direction**: **Ingress**
   - **Action**: **Allow**
   - **Targets**: **Specified target tags**
   - **Target tags**: `backend-server`
   - **Source filter**: **IPv4 ranges**
   - **Source IPv4 ranges**: `130.211.0.0/22, 35.191.0.0/16`
   - **TCP**: `3000`
3. Click **"CREATE"**

#### Rule 4: Allow Load Balancer to Frontend

1. Click **"CREATE FIREWALL RULE"**
2. Configure:
   - **Name**: `allow-lb-frontend`
   - **Network**: `healthcard-vpc`
   - **Priority**: `1000`
   - **Direction**: **Ingress**
   - **Action**: **Allow**
   - **Targets**: **Specified target tags**
   - **Target tags**: `frontend-server`
   - **Source filter**: **IPv4 ranges**
   - **Source IPv4 ranges**: `130.211.0.0/22, 35.191.0.0/16`
   - **TCP**: `80`
3. Click **"CREATE"**

#### Rule 5: Internal Communication

1. Click **"CREATE FIREWALL RULE"**
2. Configure:
   - **Name**: `allow-internal`
   - **Network**: `healthcard-vpc`
   - **Priority**: `1000`
   - **Direction**: **Ingress**
   - **Action**: **Allow**
   - **Targets**: **All instances in the network**
   - **Source filter**: **IPv4 ranges**
   - **Source IPv4 ranges**: `10.0.0.0/8`
   - **Protocols and ports**: **Allow all**
3. Click **"CREATE"**

#### Rule 6: Deny All Other Ingress (Default Deny)

1. Click **"CREATE FIREWALL RULE"**
2. Configure:
   - **Name**: `deny-all-ingress`
   - **Network**: `healthcard-vpc`
   - **Priority**: `65534`
   - **Direction**: **Ingress**
   - **Action**: **Deny**
   - **Targets**: **All instances in the network**
   - **Source filter**: **IPv4 ranges**
   - **Source IPv4 ranges**: `0.0.0.0/0`
   - **Protocols and ports**: **Allow all**
3. Click **"CREATE"**

---

## 📋 PHASE 3: Create Service Accounts

### Step 3.1: Create Backend Service Account

1. Go to **Navigation Menu (☰)** → **IAM & Admin** → **Service Accounts**
2. Click **"CREATE SERVICE ACCOUNT"**
3. Configure:
   - **Service account name**: `healthcard-backend-sa`
   - **Service account ID**: Auto-generated
   - **Description**: `Service account for backend instances`
4. Click **"CREATE AND CONTINUE"**
5. Add roles (click "ADD ANOTHER ROLE" for each):
   - **Logging** → **Logs Writer**
   - **Monitoring** → **Monitoring Metric Writer**
   - **Secret Manager** → **Secret Manager Secret Accessor**
6. Click **"CONTINUE"** → **"DONE"**

### Step 3.2: Create Frontend Service Account

1. Click **"CREATE SERVICE ACCOUNT"**
2. Configure:
   - **Service account name**: `healthcard-frontend-sa`
   - **Service account ID**: Auto-generated
   - **Description**: `Service account for frontend instances`
3. Click **"CREATE AND CONTINUE"**
4. Add roles:
   - **Logging** → **Logs Writer**
   - **Monitoring** → **Monitoring Metric Writer**
5. Click **"CONTINUE"** → **"DONE"**

---

## 📋 PHASE 4: Set Up Secret Manager (For Sensitive Data)

### Step 4.1: Store MongoDB Connection String

1. Go to **Navigation Menu (☰)** → **Security** → **Secret Manager**
2. Click **"CREATE SECRET"**
3. Configure:
   - **Name**: `mongodb-connection-string`
   - **Secret value**: Your MongoDB Atlas connection string (we'll set up Atlas later)
   - **Regions**: **Automatically replicate**
4. Click **"CREATE SECRET"**

### Step 4.2: Store JWT Secret

1. Click **"CREATE SECRET"**
2. Configure:
   - **Name**: `jwt-secret`
   - **Secret value**: Generate a strong random string (64+ characters)
   - Use this to generate: `openssl rand -base64 64`
3. Click **"CREATE SECRET"**

### Step 4.3: Store Other Secrets

Create secrets for any other sensitive configuration:

- `stripe-api-key` (if using Stripe)
- `email-api-key` (if using email service)

---

## 📋 PHASE 5: Set Up MongoDB Atlas (Database)

### Step 5.1: Create MongoDB Atlas Account

1. Go to **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"**
3. Sign up with Google or email
4. Complete the onboarding questionnaire

### Step 5.2: Create a Cluster

1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier (or M10 for production - ~$57/month)
   - For enterprise: Select **"M10"** or higher
3. Select provider: **Google Cloud**
4. Select region: **us-central1** (same as GCP)
5. Cluster name: `healthcard-cluster`
6. Click **"Create"**

### Step 5.3: Create Database User

1. In Security section, click **"Database Access"**
2. Click **"ADD NEW DATABASE USER"**
3. Configure:
   - **Authentication Method**: Password
   - **Username**: `healthcard-admin`
   - **Password**: Generate strong password (save this!)
   - **Database User Privileges**: **Atlas admin**
4. Click **"Add User"**

### Step 5.4: Configure Network Access

1. Click **"Network Access"** in left sidebar
2. Click **"ADD IP ADDRESS"**
3. For production, you'll need to add GCP NAT IP (we'll configure this later)
4. For now, click **"ALLOW ACCESS FROM ANYWHERE"** (we'll restrict later)
5. Click **"Confirm"**

### Step 5.5: Get Connection String

1. Click **"Database"** in left sidebar
2. Click **"Connect"** on your cluster
3. Select **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://healthcard-admin:<password>@healthcard-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Go back to GCP Secret Manager and update the `mongodb-connection-string` secret with this value

---

## 📋 PHASE 6: Prepare Application for Production

### Step 6.1: Update Backend Configuration

First, let me check your current backend configuration:

Read [](file:///d%3A/Projects/HealthCard/backend/app.js)

Read [](file:///d%3A/Projects/HealthCard/backend/package.json)

Read [](file:///d%3A/Projects/HealthCard/backend/src/config/db.js)

Read [](file:///d%3A/Projects/HealthCard/frontend/package.json#1-1), lines 1 to 50

Now let me check the frontend vite config:

Read [](file:///d%3A/Projects/HealthCard/frontend/vite.config.js)

Now let me create production-ready configuration files for your application:

Created [](file:///d%3A/Projects/HealthCard/backend/ecosystem.config.js)

Created [](file:///d%3A/Projects/HealthCard/backend/.env.production)

Using "Replace String in File"

```

```

Using "Replace String in File"

```

```

Now update package.json with production dependencies and scripts:

Using "Replace String in File"

```

```

Now update the frontend for production:

Using "Replace String in File"

```

```

Created [](file:///d%3A/Projects/HealthCard/frontend/.env.production)

Created [](file:///d%3A/Projects/HealthCard/frontend/nginx.conf)

Now create the deployment scripts:

Created [](file:///d%3A/Projects/HealthCard/deployment/backend-startup-script.sh)

Created [](file:///d%3A/Projects/HealthCard/deployment/frontend-startup-script.sh)

Now I'll provide you with the complete step-by-step guide to continue the deployment on GCP:

---

## 📋 PHASE 7: Create Cloud Storage Bucket for Deployment

### Step 7.1: Create Storage Bucket

1. Go to **Navigation Menu (☰)** → **Cloud Storage** → **Buckets**
2. Click **"CREATE"**
3. Configure:
   - **Name**: `healthcard-deployment-bucket-[YOUR-PROJECT-ID]` (must be globally unique)
   - **Location type**: **Region**
   - **Location**: `us-central1`
   - **Default storage class**: **Standard**
   - **Access control**: **Uniform**
   - **Protection tools**: Leave default
4. Click **"CREATE"**

### Step 7.2: Upload Application Code

You'll need to upload your application to this bucket. First, let's build and prepare it locally.

---

## 📋 PHASE 8: Build and Upload Application

### Step 8.1: Build Frontend Locally

Run these commands in your local terminal:

Ran terminal command: cd "d:\Projects\HealthCard\frontend"; npm install

Ran terminal command: npm run build

Ran terminal command: npm install terser --save-dev

Ran terminal command: npm run build

The frontend built successfully. Now let's install backend dependencies:

Ran terminal command: cd "d:\Projects\HealthCard\backend"; npm install

Now I'll continue with the complete deployment guide:

---

## 📋 PHASE 8 (Continued): Upload to GCP Cloud Storage

### Step 8.2: Install and Configure Google Cloud SDK (On Your Local Machine)

1. **Download Google Cloud SDK**:

   - Go to: https://cloud.google.com/sdk/docs/install
   - Download the Windows installer
   - Run the installer, keep all defaults

2. **Initialize gcloud**:

   - Open **PowerShell** or **Command Prompt**
   - Run: `gcloud init`
   - Select **"Create a new configuration"**
   - Log in with your Google account (browser will open)
   - Select your project: `healthcard-production`
   - Select default region: `us-central1-a`

3. **Authenticate**:
   ```powershell
   gcloud auth login
   gcloud config set project healthcard-production
   ```

### Step 8.3: Upload Application to Cloud Storage

After gcloud is configured, run these commands:

```powershell
# Navigate to your project
cd D:\Projects\HealthCard

# Upload backend folder (excluding node_modules)
gsutil -m rsync -r -x "node_modules|coverage|.env" backend gs://healthcard-deployment-bucket-[YOUR-PROJECT-ID]/backend/

# Upload frontend dist folder
gsutil -m rsync -r frontend/dist gs://healthcard-deployment-bucket-[YOUR-PROJECT-ID]/frontend/dist/
```

---

## 📋 PHASE 9: Create Instance Templates

### Step 9.1: Create Backend Instance Template

1. Go to **Navigation Menu (☰)** → **Compute Engine** → **Instance templates**
2. Click **"CREATE INSTANCE TEMPLATE"**
3. Configure:

**Basic Configuration:**

- **Name**: `healthcard-backend-template`
- **Location**: **Regional** → `us-central1`
- **Machine configuration**:
  - **Series**: `E2` (cost-effective)
  - **Machine type**: `e2-small` (2 vCPU, 2 GB memory) - can scale later

**Boot Disk:** 4. Click **"CHANGE"** under Boot disk

- **Operating system**: **Ubuntu**
- **Version**: **Ubuntu 22.04 LTS**
- **Boot disk type**: **Balanced persistent disk**
- **Size**: **20 GB**

5. Click **"SELECT"**

**Identity and API access:** 6. **Service account**: Select `healthcard-backend-sa@healthcard-production.iam.gserviceaccount.com` 7. **Access scopes**: **Set access for each API**

- **Cloud Platform**: **Enabled**

**Firewall:** 8. Leave unchecked (we're using custom VPC firewall rules)

**Advanced Options:** 9. Expand **"Advanced options"** 10. Expand **"Networking"** - **Network tags**: `backend-server, allow-ssh` - **Network interfaces**: Click the edit icon - **Network**: `healthcard-vpc` - **Subnetwork**: `backend-subnet` - **External IPv4 address**: **None** (instances will be behind load balancer) - Click **"Done"**

11. Expand **"Management"**
    - Under **"Automation"** → **"Startup script"**, paste the content from backend-startup-script.sh:

```bash
#!/bin/bash
set -e
exec > >(tee -a /var/log/startup-script.log) 2>&1
echo "Starting backend instance setup at $(date)"

apt-get update
apt-get upgrade -y
apt-get install -y curl git nginx

curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2

useradd -m -s /bin/bash healthcard || true
mkdir -p /var/www/healthcard/backend
mkdir -p /var/log/healthcard
chown -R healthcard:healthcard /var/www/healthcard
chown -R healthcard:healthcard /var/log/healthcard

apt-get install -y apt-transport-https ca-certificates gnupg
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
apt-get update
apt-get install -y google-cloud-sdk

PROJECT_ID=$(curl -s "http://metadata.google.internal/computeMetadata/v1/project/project-id" -H "Metadata-Flavor: Google")
MONGODB_URL=$(gcloud secrets versions access latest --secret="mongodb-connection-string" --project="$PROJECT_ID")
JWT_SECRET=$(gcloud secrets versions access latest --secret="jwt-secret" --project="$PROJECT_ID")

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

gsutil -m cp -r gs://healthcard-deployment-bucket-YOUR-PROJECT-ID/backend/* /var/www/healthcard/backend/ || echo "Bucket copy failed"
chown -R healthcard:healthcard /var/www/healthcard/backend

cd /var/www/healthcard/backend
sudo -u healthcard npm ci --production

sudo -u healthcard pm2 startup systemd -u healthcard --hp /home/healthcard || true
sudo -u healthcard pm2 start ecosystem.config.js --env production
sudo -u healthcard pm2 save

curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
bash add-google-cloud-ops-agent-repo.sh --also-install
systemctl enable google-cloud-ops-agent
systemctl start google-cloud-ops-agent

echo "Backend instance setup completed at $(date)"
```

⚠️ **IMPORTANT**: Replace `healthcard-deployment-bucket-YOUR-PROJECT-ID` with your actual bucket name!

12. Click **"CREATE"**

### Step 9.2: Create Frontend Instance Template

1. Click **"CREATE INSTANCE TEMPLATE"**
2. Configure:

**Basic Configuration:**

- **Name**: `healthcard-frontend-template`
- **Location**: **Regional** → `us-central1`
- **Machine configuration**:
  - **Series**: `E2`
  - **Machine type**: `e2-micro` (2 vCPU, 1 GB memory - frontend is lighter)

**Boot Disk:** 3. Click **"CHANGE"**

- **Operating system**: **Ubuntu**
- **Version**: **Ubuntu 22.04 LTS**
- **Boot disk type**: **Balanced persistent disk**
- **Size**: **10 GB**

4. Click **"SELECT"**

**Identity and API access:** 5. **Service account**: `healthcard-frontend-sa@healthcard-production.iam.gserviceaccount.com` 6. **Access scopes**: **Set access for each API** → **Cloud Platform**: **Enabled**

**Advanced Options:** 7. Expand **"Advanced options"** → **"Networking"**

- **Network tags**: `frontend-server, allow-ssh`
- **Network interfaces**: Edit
  - **Network**: `healthcard-vpc`
  - **Subnetwork**: `frontend-subnet`
  - **External IPv4 address**: **None**
- Click **"Done"**

8. Expand **"Management"** → **"Automation"** → **"Startup script"**:

```bash
#!/bin/bash
set -e
exec > >(tee -a /var/log/startup-script.log) 2>&1
echo "Starting frontend instance setup at $(date)"

apt-get update
apt-get upgrade -y
apt-get install -y curl git nginx

useradd -m -s /bin/bash healthcard || true
mkdir -p /var/www/healthcard/frontend
chown -R healthcard:healthcard /var/www/healthcard

gsutil -m cp -r gs://healthcard-deployment-bucket-YOUR-PROJECT-ID/frontend/dist/* /var/www/healthcard/frontend/ || echo "Bucket copy failed"
chown -R healthcard:healthcard /var/www/healthcard/frontend

cat > /etc/nginx/sites-available/healthcard << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/healthcard/frontend;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json;
    gzip_disable "MSIE [1-6]\.";

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    location ~ /\. {
        deny all;
    }
}
EOF

ln -sf /etc/nginx/sites-available/healthcard /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl restart nginx

curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
bash add-google-cloud-ops-agent-repo.sh --also-install
systemctl enable google-cloud-ops-agent
systemctl start google-cloud-ops-agent

echo "Frontend instance setup completed at $(date)"
```

⚠️ **IMPORTANT**: Replace `healthcard-deployment-bucket-YOUR-PROJECT-ID` with your actual bucket name!

9. Click **"CREATE"**

---

## 📋 PHASE 10: Create Health Checks

### Step 10.1: Create Backend Health Check

1. Go to **Navigation Menu (☰)** → **Compute Engine** → **Health checks**
2. Click **"CREATE HEALTH CHECK"**
3. Configure:
   - **Name**: `healthcard-backend-health-check`
   - **Protocol**: **HTTP**
   - **Port**: `3000`
   - **Request path**: `/health`
   - **Check interval**: `10` seconds
   - **Timeout**: `5` seconds
   - **Healthy threshold**: `2` consecutive successes
   - **Unhealthy threshold**: `3` consecutive failures
4. Click **"CREATE"**

### Step 10.2: Create Frontend Health Check

1. Click **"CREATE HEALTH CHECK"**
2. Configure:
   - **Name**: `healthcard-frontend-health-check`
   - **Protocol**: **HTTP**
   - **Port**: `80`
   - **Request path**: `/health`
   - **Check interval**: `10` seconds
   - **Timeout**: `5` seconds
   - **Healthy threshold**: `2` consecutive successes
   - **Unhealthy threshold**: `3` consecutive failures
3. Click **"CREATE"**

---

## 📋 PHASE 11: Create Managed Instance Groups (MIGs)

### Step 11.1: Create Backend MIG

1. Go to **Navigation Menu (☰)** → **Compute Engine** → **Instance groups**
2. Click **"CREATE INSTANCE GROUP"**
3. Choose **"New managed instance group (stateless)"**
4. Configure:

**Basic Configuration:**

- **Name**: `healthcard-backend-mig`
- **Instance template**: `healthcard-backend-template`
- **Location**: **Single zone**
- **Zone**: `us-central1-a`

**Autoscaling:** 5. **Autoscaling mode**: **On: add and remove instances to the group** 6. **Minimum number of instances**: `2` 7. **Maximum number of instances**: `10` 8. **Autoscaling signals**: Click **"ADD SIGNAL"**

- **Signal type**: **CPU utilization**
- **Target CPU utilization**: `60%`
- Click **"DONE"**

**Auto-healing:** 9. **Health check**: Select `healthcard-backend-health-check` 10. **Initial delay**: `300` seconds (5 minutes for startup)

**Port mapping:** 11. Click **"ADD PORT MAPPING"** - **Port name**: `http` - **Port number**: `3000`

12. Click **"CREATE"**

### Step 11.2: Create Frontend MIG

1. Click **"CREATE INSTANCE GROUP"**
2. Choose **"New managed instance group (stateless)"**
3. Configure:

**Basic Configuration:**

- **Name**: `healthcard-frontend-mig`
- **Instance template**: `healthcard-frontend-template`
- **Location**: **Single zone**
- **Zone**: `us-central1-a`

**Autoscaling:** 4. **Autoscaling mode**: **On: add and remove instances to the group** 5. **Minimum number of instances**: `2` 6. **Maximum number of instances**: `10` 7. **Autoscaling signals**: Click **"ADD SIGNAL"**

- **Signal type**: **CPU utilization**
- **Target CPU utilization**: `60%`
- Click **"DONE"**

**Auto-healing:** 8. **Health check**: Select `healthcard-frontend-health-check` 9. **Initial delay**: `180` seconds (3 minutes)

**Port mapping:** 10. Click **"ADD PORT MAPPING"** - **Port name**: `http` - **Port number**: `80`

11. Click **"CREATE"**

---

## 📋 PHASE 12: Set Up Cloud NAT (for Outbound Internet)

Since our instances don't have external IPs, they need Cloud NAT for outbound connections (to npm, MongoDB, etc.)

### Step 12.1: Create Cloud Router

1. Go to **Navigation Menu (☰)** → **Network Connectivity** → **Cloud Routers**
2. Click **"CREATE ROUTER"**
3. Configure:
   - **Name**: `healthcard-router`
   - **Network**: `healthcard-vpc`
   - **Region**: `us-central1`
4. Click **"CREATE"**

### Step 12.2: Create Cloud NAT

1. Go to **Navigation Menu (☰)** → **Network Connectivity** → **Cloud NAT**
2. Click **"CREATE CLOUD NAT GATEWAY"**
3. Configure:
   - **Gateway name**: `healthcard-nat-gateway`
   - **Select Cloud Router**: `healthcard-router`
   - **NAT mapping**:
     - **Source**: **All subnets' primary IP ranges**
   - **NAT IP addresses**: **Automatic**
4. Click **"CREATE"**

### Step 12.3: Get NAT IP for MongoDB Atlas Whitelist

1. After creating, go to **Cloud NAT** → **healthcard-nat-gateway**
2. Note the **NAT IP addresses** assigned
3. Go to MongoDB Atlas → **Network Access** → **ADD IP ADDRESS**
4. Add each NAT IP address
5. Remove "Allow from anywhere" rule

---

## 📋 PHASE 13: Reserve Static IP Addresses

### Step 13.1: Reserve Global Static IP

1. Go to **Navigation Menu (☰)** → **VPC network** → **IP addresses**
2. Click **"RESERVE EXTERNAL STATIC ADDRESS"**
3. Configure:
   - **Name**: `healthcard-global-ip`
   - **Network Service Tier**: **Premium**
   - **IP version**: **IPv4**
   - **Type**: **Global**
4. Click **"RESERVE"**
5. Note the IP address for DNS configuration

---

## 📋 PHASE 14: Set Up Cloud Load Balancer

### Step 14.1: Create Backend Services

#### Backend Service for API:

1. Go to **Navigation Menu (☰)** → **Network services** → **Load balancing**
2. Click **"BACKENDS"** tab
3. Click **"CREATE BACKEND SERVICE"**
4. Configure:
   - **Name**: `healthcard-api-backend`
   - **Backend type**: **Instance group**
   - **Protocol**: **HTTP**
   - **Named port**: `http`
   - **Timeout**: `30` seconds
5. Under **Backends**, click **"ADD BACKEND"**:

   - **Instance group**: `healthcard-backend-mig`
   - **Port numbers**: `3000`
   - **Balancing mode**: **Utilization**
   - **Maximum utilization**: `80%`
   - **Capacity**: `100%`
   - Click **"DONE"**

6. **Health check**: Select `healthcard-backend-health-check`
7. Click **"CREATE"**

#### Backend Service for Frontend:

1. Click **"CREATE BACKEND SERVICE"**
2. Configure:

   - **Name**: `healthcard-frontend-backend`
   - **Backend type**: **Instance group**
   - **Protocol**: **HTTP**
   - **Named port**: `http`
   - **Timeout**: `30` seconds

3. Under **Backends**, click **"ADD BACKEND"**:

   - **Instance group**: `healthcard-frontend-mig`
   - **Port numbers**: `80`
   - **Balancing mode**: **Utilization**
   - **Maximum utilization**: `80%`
   - **Capacity**: `100%`
   - Click **"DONE"**

4. **Health check**: Select `healthcard-frontend-health-check`
5. Click **"CREATE"**

### Step 14.2: Create URL Map (Routing Rules)

1. Go to **Load balancing** → **"CREATE LOAD BALANCER"**
2. Choose **"Application Load Balancer (HTTP/S)"**
3. Choose **"From Internet to my VMs or serverless services"**
4. Choose **"Global external Application Load Balancer"**
5. Click **"CONFIGURE"**

6. **Name**: `healthcard-lb`

7. **Frontend configuration**:

   - Click **"ADD FRONTEND IP AND PORT"**
   - **Name**: `healthcard-https-frontend`
   - **Protocol**: **HTTPS**
   - **Network Service Tier**: **Premium**
   - **IP address**: Select `healthcard-global-ip`
   - **Port**: `443`
   - **Certificate**: We'll create one (click **"CREATE A NEW CERTIFICATE"**)
     - **Name**: `healthcard-ssl-cert`
     - Choose **"Create Google-managed certificate"**
     - **Domains**: Enter your domain (e.g., `healthcard.yourdomain.com, api.healthcard.yourdomain.com`)
     - Click **"CREATE"**
   - **Enable HTTP to HTTPS Redirect**: **Enabled**
   - Click **"DONE"**

8. **Backend configuration**:

   - Click **"Backend services & backend buckets"**
   - Select `healthcard-frontend-backend` as default

9. **Routing rules** (Host and path rules):

   - Click **"ADD HOST AND PATH RULE"**
   - **Host**: `api.healthcard.yourdomain.com` (or `your-domain.com/api`)
   - **Path**: `/*`
   - **Backend**: `healthcard-api-backend`

10. Click **"CREATE"**

---

## 📋 PHASE 15: Set Up Cloud DNS

### Step 15.1: Create DNS Zone

1. Go to **Navigation Menu (☰)** → **Network services** → **Cloud DNS**
2. Click **"CREATE ZONE"**
3. Configure:
   - **Zone type**: **Public**
   - **Zone name**: `healthcard-zone`
   - **DNS name**: `yourdomain.com` (your actual domain)
   - **DNSSEC**: **On** (recommended for security)
4. Click **"CREATE"**

### Step 15.2: Add DNS Records

1. In your zone, click **"ADD STANDARD"**

**Record 1 - Main Domain:**

- **DNS name**: Leave empty (for root domain) or `www`
- **Resource record type**: **A**
- **TTL**: `300`
- **IPv4 Address**: Your `healthcard-global-ip` address
- Click **"CREATE"**

**Record 2 - API Subdomain:**

- Click **"ADD STANDARD"**
- **DNS name**: `api`
- **Resource record type**: **A**
- **TTL**: `300`
- **IPv4 Address**: Same `healthcard-global-ip` address
- Click **"CREATE"**

### Step 15.3: Update Domain Registrar NS Records

1. In Cloud DNS, note the **NS records** for your zone
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Update nameservers to GCP's nameservers (shown in Cloud DNS)

---

## 📋 PHASE 16: Set Up Cloud Armor (WAF & DDoS Protection)

### Step 16.1: Create Security Policy

1. Go to **Navigation Menu (☰)** → **Network Security** → **Cloud Armor policies**
2. Click **"CREATE POLICY"**
3. Configure:

   - **Name**: `healthcard-security-policy`
   - **Policy type**: **Backend security policy**

4. **Default rule action**: **Allow**

5. Add rules by clicking **"ADD RULE"**:

**Rule 1 - Rate Limiting:**

- **Description**: `rate-limit-all`
- **Mode**: **Basic mode**
- **Match**: `true` (matches all)
- **Action**: **Rate-based ban**
- **Rate limit threshold count**: `1000`
- **Rate limit threshold interval**: `60` seconds
- **Ban duration**: `120` seconds
- **Priority**: `1000`
- Click **"ADD"**

**Rule 2 - Block Bad Bots:**

- Click **"ADD RULE"**
- **Description**: `block-bad-user-agents`
- **Mode**: **Advanced mode**
- **Match expression**:

```
request.headers['user-agent'].contains('sqlmap') || request.headers['user-agent'].contains('nikto') || request.headers['user-agent'].contains('nmap')
```

- **Action**: **Deny**
- **Response code**: `403`
- **Priority**: `900`
- Click **"ADD"**

**Rule 3 - Block Known Bad IPs (OWASP Rules):**

- Click **"ADD RULE"**
- **Description**: `owasp-crs-v330-sqli`
- **Mode**: **Advanced mode**
- **Match**: `evaluatePreconfiguredExpr('sqli-v33-stable')`
- **Action**: **Deny**
- **Response code**: `403`
- **Priority**: `800`
- Click **"ADD"**

**Rule 4 - XSS Protection:**

- Click **"ADD RULE"**
- **Description**: `owasp-crs-v330-xss`
- **Mode**: **Advanced mode**
- **Match**: `evaluatePreconfiguredExpr('xss-v33-stable')`
- **Action**: **Deny**
- **Response code**: `403`
- **Priority**: `801`
- Click **"ADD"**

6. Click **"CREATE POLICY"**

### Step 16.2: Attach Policy to Backend Services

1. Go to **Network services** → **Load balancing**
2. Click on `healthcard-lb`
3. Click **"EDIT"**
4. Go to **Backend configuration**
5. Click on `healthcard-api-backend`
6. Click **"EDIT"**
7. Under **Cloud Armor security policy**, select `healthcard-security-policy`
8. Click **"UPDATE"**
9. Repeat for `healthcard-frontend-backend`
10. Click **"UPDATE"** on the load balancer

---

## 📋 PHASE 17: Set Up Cloud Monitoring & Alerting

### Step 17.1: Create Uptime Checks

1. Go to **Navigation Menu (☰)** → **Monitoring** → **Uptime checks**
2. Click **"CREATE UPTIME CHECK"**

**API Health Check:**

- **Title**: `healthcard-api-uptime`
- **Protocol**: **HTTPS**
- **Resource Type**: **URL**
- **Hostname**: `api.yourdomain.com`
- **Path**: `/health`
- **Check Frequency**: `1 minute`
- **Regions**: Select multiple regions
- **Response validation**:
  - Status code: `200`
  - Content: Contains `healthy`
- Click **"CREATE"**

**Frontend Health Check:**

- Click **"CREATE UPTIME CHECK"**
- **Title**: `healthcard-frontend-uptime`
- **Protocol**: **HTTPS**
- **Resource Type**: **URL**
- **Hostname**: `yourdomain.com`
- **Path**: `/`
- **Check Frequency**: `1 minute`
- Click **"CREATE"**

### Step 17.2: Create Alert Policies

1. Go to **Monitoring** → **Alerting**
2. Click **"CREATE POLICY"**

**Alert 1 - High CPU:**

- **Add Condition**: Click **"ADD CONDITION"**
- **Target**:
  - Resource type: `VM Instance`
  - Metric: `CPU utilization`
- **Configuration**:
  - Condition: **is above**
  - Threshold: `80%`
  - Duration: `5 minutes`
- Click **"ADD"**

**Notification:**

- Click **"ADD NOTIFICATION CHANNEL"**
- Create Email channel with your email
- Select it
- **Policy name**: `high-cpu-alert`
- Click **"CREATE POLICY"**

Create similar alerts for:

- **Memory usage** > 80%
- **Disk usage** > 80%
- **Uptime check failures**

### Step 17.3: Create Dashboard

1. Go to **Monitoring** → **Dashboards**
2. Click **"CREATE DASHBOARD"**
3. **Name**: `HealthCard Production Dashboard`
4. Add widgets:
   - **CPU utilization** (line chart)
   - **Memory utilization** (line chart)
   - **Network traffic** (line chart)
   - **Request count** (line chart)
   - **Error rate** (line chart)
   - **Latency** (line chart)

---

## 📋 PHASE 18: Set Up Cloud Logging

### Step 18.1: Create Log-Based Metrics

1. Go to **Navigation Menu (☰)** → **Logging** → **Logs Explorer**
2. Create filter for errors:
   ```
   resource.type="gce_instance"
   severity>=ERROR
   ```
3. Click **"CREATE METRIC"**
4. **Name**: `healthcard-error-count`
5. Click **"CREATE"**

### Step 18.2: Create Log Sink for Long-term Storage

1. Go to **Logging** → **Log Router**
2. Click **"CREATE SINK"**
3. Configure:
   - **Sink name**: `healthcard-logs-archive`
   - **Sink destination**: **Cloud Storage bucket**
   - Create new bucket: `healthcard-logs-archive-[PROJECT-ID]`
4. Click **"CREATE SINK"**

---

## 📋 PHASE 19: IAP Setup for SSH (Secure Access)

### Step 19.1: Enable IAP for SSH

1. Go to **Navigation Menu (☰)** → **Security** → **Identity-Aware Proxy**
2. Enable **IAP** for your project if not enabled

### Step 19.2: Grant IAP Access

1. Go to **IAM & Admin** → **IAM**
2. Click **"GRANT ACCESS"**
3. Add principal: Your email
4. Role: **IAP-secured Tunnel User**
5. Click **"SAVE"**

### Step 19.3: SSH to Instances

To SSH to instances securely:

```bash
gcloud compute ssh INSTANCE_NAME --zone=us-central1-a --tunnel-through-iap
```

Or use GCP Console:

1. Go to **Compute Engine** → **VM instances**
2. Click **"SSH"** dropdown on any instance
3. Select **"Open in browser window"**

---

## 📋 PHASE 20: Deployment Pipeline (CI/CD with Cloud Build)

### Step 20.1: Create Cloud Build Trigger

1. Go to **Navigation Menu (☰)** → **Cloud Build** → **Triggers**
2. Click **"CREATE TRIGGER"**
3. Configure:
   - **Name**: `healthcard-deploy`
   - **Event**: **Push to a branch**
   - **Source**: Connect your GitHub/GitLab repository
   - **Branch**: `^main$`
   - **Configuration**: **Cloud Build configuration file (yaml)**
4. Click **"CREATE"**

### Step 20.2: Create Build Configuration

Create this file in your repository root:

Created [](file:///d%3A/Projects/HealthCard/cloudbuild.yaml)

---

## 📋 PHASE 21: Final Configuration Updates

### Step 21.1: Update Frontend API URL

Check your frontend for API URL configuration:

Searched for regex `axios|api|localhost:3000|API_URL|baseURL` (`**/frontend/src/**/*.js*`), 20 results

I can see the frontend is using hardcoded `localhost:3000`. Let me create an API configuration file:

Created [](file:///d%3A/Projects/HealthCard/frontend/src/config/api.js)

Now create a comprehensive README with deployment instructions:

Created [](file:///d%3A/Projects/HealthCard/DEPLOYMENT.md)

---

## 📋 PHASE 22: Final Checklist & Go-Live

### Pre-Launch Checklist

| Item                        | Status | Notes                                |
| --------------------------- | ------ | ------------------------------------ |
| ☐ VPC Network created       |        | `healthcard-vpc`                     |
| ☐ Subnets created           |        | backend, frontend, data              |
| ☐ Firewall rules configured |        | SSH via IAP, health checks, internal |
| ☐ Service accounts created  |        | backend-sa, frontend-sa              |
| ☐ Secrets in Secret Manager |        | mongodb-url, jwt-secret              |
| ☐ MongoDB Atlas configured  |        | Cluster, user, network access        |
| ☐ Cloud Storage bucket      |        | Code uploaded                        |
| ☐ Instance templates        |        | backend, frontend                    |
| ☐ Health checks             |        | backend, frontend                    |
| ☐ Managed Instance Groups   |        | Auto-scaling configured              |
| ☐ Cloud NAT                 |        | For outbound internet                |
| ☐ Static IP reserved        |        | For load balancer                    |
| ☐ Backend services          |        | api, frontend                        |
| ☐ Load balancer             |        | HTTPS with SSL cert                  |
| ☐ Cloud DNS                 |        | A records configured                 |
| ☐ Domain NS updated         |        | At registrar                         |
| ☐ Cloud Armor               |        | WAF rules attached                   |
| ☐ Monitoring dashboards     |        | Created                              |
| ☐ Alert policies            |        | CPU, memory, uptime                  |
| ☐ Log sinks                 |        | Archive to storage                   |
| ☐ Cloud Build trigger       |        | CI/CD configured                     |

### Step 22.1: SSL Certificate Verification

1. Go to **Network services** → **Load balancing**
2. Click your load balancer
3. Check **Certificate status** - should say "ACTIVE"
4. If "PROVISIONING", wait 15-60 minutes

### Step 22.2: DNS Propagation Check

Use: https://www.whatsmydns.net/

- Check your domain resolves to the correct IP globally

### Step 22.3: Final Tests

1. **Test Frontend**: Open `https://your-domain.com`
2. **Test API**: `curl https://api.your-domain.com/health`
3. **Test Authentication**: Try login/register
4. **Test Protected Routes**: Access appointments, reports, etc.
5. **Test Load Balancing**:
   ```bash
   for i in {1..10}; do curl -s https://api.your-domain.com/health; done
   ```

---

## 📋 PHASE 23: Cost Optimization Tips

### Committed Use Discounts

1. Go to **Compute Engine** → **Committed use discounts**
2. If you plan to run for 1+ year, purchase committed use
3. Saves up to 57% on compute costs

### Preemptible/Spot VMs (for non-critical workloads)

- Can reduce costs by 60-91%
- Not recommended for production, but good for dev/staging

### Right-sizing

1. Go to **Compute Engine** → **VM instances**
2. Click **"Recommendations"** tab
3. Follow right-sizing recommendations

---

## 📊 Summary of What You've Built

```
✅ Enterprise-Grade Infrastructure:
   ├── Custom VPC with 3 isolated subnets
   ├── Zero-trust firewall rules (deny by default)
   ├── IAP for secure SSH access (no bastion host needed)
   └── Private instances (no public IPs)

✅ High Availability:
   ├── Managed Instance Groups with auto-healing
   ├── Auto-scaling (2-10 instances per tier)
   ├── Global load balancer with health checks
   └── Multi-zone capability ready

✅ Security:
   ├── SSL/TLS encryption (Google-managed certs)
   ├── Cloud Armor WAF with OWASP rules
   ├── DDoS protection (built into GCP)
   ├── Rate limiting
   ├── Secret Manager for credentials
   └── Separate service accounts per tier

✅ Observability:
   ├── Cloud Monitoring dashboards
   ├── Uptime checks with alerting
   ├── Centralized logging
   ├── Log-based metrics
   └── Ops Agent on all instances

✅ CI/CD:
   ├── Cloud Build pipeline
   ├── Automatic deployment on git push
   └── Rolling updates (zero-downtime)

✅ Cost Controls:
   ├── Budget alerts configured
   ├── Regional deployment (lower egress costs)
   └── Right-sized instances
```

---

## 🔴 IMPORTANT: Things You Need to Replace

Before deploying, replace these placeholders:

| Placeholder                                    | Replace With                        |
| ---------------------------------------------- | ----------------------------------- |
| `YOUR-PROJECT-ID`                              | Your actual GCP project ID          |
| `healthcard-deployment-bucket-YOUR-PROJECT-ID` | Your actual bucket name             |
| `your-domain.com`                              | Your actual domain                  |
| `api.your-domain.com`                          | Your API subdomain                  |
| `healthcard.yourdomain.com`                    | Your frontend domain                |
| MongoDB connection string                      | Your actual Atlas connection string |
| JWT secret                                     | Generated secure string             |

---

## 🆘 Need Help?

If you encounter issues:

1. Check startup script logs: `/var/log/startup-script.log`
2. Check PM2 logs: `pm2 logs`
3. Check Nginx logs: `/var/log/nginx/error.log`
4. Use Cloud Logging for centralized logs

This setup gives you a truly enterprise-grade production environment with:

- **99.9% SLA** capability
- **Auto-scaling** for traffic spikes
- **Security** that meets compliance standards
- **Observability** for troubleshooting
- **CI/CD** for rapid deployments
