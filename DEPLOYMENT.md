# HealthCard Production Deployment Guide

## Architecture Overview

This application is deployed on Google Cloud Platform using:
- **Compute Engine Managed Instance Groups (MIGs)** for auto-scaling
- **Cloud Load Balancer** for traffic distribution
- **Cloud Armor** for WAF and DDoS protection
- **Cloud DNS** for domain management
- **MongoDB Atlas** for database
- **Secret Manager** for credentials
- **Cloud Monitoring** for observability

## Prerequisites

1. GCP Account with billing enabled
2. Domain name
3. MongoDB Atlas account
4. Google Cloud SDK installed locally

## Quick Start Deployment

### 1. Configure gcloud CLI
```bash
gcloud auth login
gcloud config set project YOUR-PROJECT-ID
```

### 2. Upload Application Code
```bash
# Upload backend
gsutil -m rsync -r -x "node_modules|coverage|.env" backend gs://YOUR-BUCKET/backend/

# Build and upload frontend
cd frontend
npm ci
npm run build
gsutil -m rsync -r dist gs://YOUR-BUCKET/frontend/dist/
```

### 3. Restart Instance Groups
```bash
# Restart backend instances
gcloud compute instance-groups managed rolling-action restart healthcard-backend-mig --zone=us-central1-a

# Restart frontend instances  
gcloud compute instance-groups managed rolling-action restart healthcard-frontend-mig --zone=us-central1-a
```

## Manual Deployment Steps

### SSH to Backend Instance
```bash
gcloud compute ssh INSTANCE-NAME --zone=us-central1-a --tunnel-through-iap
```

### Check Application Logs
```bash
# On backend instance
sudo -u healthcard pm2 logs healthcard-backend
```

### Restart Application
```bash
# On backend instance
sudo -u healthcard pm2 restart healthcard-backend
```

## Environment Variables

### Backend (.env)
- `NODE_ENV` - production
- `PORT` - 3000
- `MONGODB_URL` - MongoDB Atlas connection string (from Secret Manager)
- `JWT_SECRET` - JWT signing secret (from Secret Manager)
- `CORS_ORIGIN` - Frontend domain

### Frontend (.env.production)
- `VITE_API_URL` - Backend API URL (https://api.your-domain.com)

## Monitoring

### View Dashboards
- GCP Console → Monitoring → Dashboards → HealthCard Production Dashboard

### View Logs
- GCP Console → Logging → Logs Explorer
- Filter: `resource.type="gce_instance"`

### Alerts
- GCP Console → Monitoring → Alerting

## Scaling

### Manual Scaling
```bash
# Scale backend to 5 instances
gcloud compute instance-groups managed resize healthcard-backend-mig --size=5 --zone=us-central1-a
```

### Auto-scaling is configured for:
- Minimum: 2 instances
- Maximum: 10 instances
- Target CPU: 60%

## Security

### Cloud Armor Rules
- Rate limiting: 1000 req/min per IP
- SQL injection protection (OWASP CRS)
- XSS protection (OWASP CRS)
- Bad bot blocking

### Firewall Rules
- SSH only through IAP
- Load balancer health checks allowed
- Internal VPC communication allowed
- All other ingress denied

## Troubleshooting

### Instance Not Starting
1. Check startup script logs:
```bash
gcloud compute ssh INSTANCE --command "cat /var/log/startup-script.log"
```

### Health Check Failing
1. SSH to instance
2. Check if application is running:
```bash
curl localhost:3000/health  # Backend
curl localhost:80/health    # Frontend
```

### Database Connection Issues
1. Check MongoDB Atlas Network Access
2. Verify Cloud NAT IP is whitelisted
3. Check Secret Manager access

## Cost Estimation (Monthly)

| Service | Estimated Cost |
|---------|----------------|
| Compute Engine (4x e2-small) | ~$50 |
| Cloud Load Balancer | ~$18 |
| Cloud NAT | ~$32 |
| Cloud DNS | ~$0.50 |
| Cloud Armor | ~$5 |
| Cloud Storage | ~$1 |
| **Total** | **~$107/month** |

*Note: Costs may vary based on traffic and scaling*

## Support

For issues, contact: your-email@domain.com
