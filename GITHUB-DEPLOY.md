# GitHub to Hostinger Deployment Guide

## 🚀 Automated Deployment Setup

This guide will help you set up automated deployments from GitHub to your Hostinger Node.js hosting.

---

## ✅ Prerequisites

Before starting, ensure you have:

- [x] GitHub repository connected: `https://github.com/yuseaname/rentingexplained.git`
- [ ] Hostinger Business or Premium plan with Node.js support
- [ ] SSH access enabled on Hostinger
- [ ] Domain configured and pointing to Hostinger

---

## 📋 Step 1: Configure Hostinger SSH Access

### 1.1 Enable SSH Access on Hostinger

1. Log into your Hostinger control panel (hPanel)
2. Go to **Advanced** → **SSH Access**
3. Enable SSH access
4. Note your SSH details:
   - **Hostname**: (usually ssh.hostinger.com or similar)
   - **Port**: (usually 22 or custom)
   - **Username**: Your Hostinger username

### 1.2 Generate SSH Key Pair

On your local machine:

```bash
# Generate new SSH key for Hostinger deployment
ssh-keygen -t ed25519 -C "github-deploy-rentingexplained" -f ~/.ssh/hostinger_deploy

# This creates:
# - ~/.ssh/hostinger_deploy (private key - keep secret!)
# - ~/.ssh/hostinger_deploy.pub (public key)
```

### 1.3 Add Public Key to Hostinger

```bash
# View your public key
cat ~/.ssh/hostinger_deploy.pub
```

Copy the output and:
1. In Hostinger hPanel → **SSH Access**
2. Add the public key to **Authorized Keys**
3. Save changes

### 1.4 Test SSH Connection

```bash
ssh -i ~/.ssh/hostinger_deploy your-username@your-hostname

# If successful, you should see Hostinger welcome message
```

---

## 🔐 Step 2: Configure GitHub Secrets

You need to add these secrets to your GitHub repository:

### 2.1 Navigate to Repository Settings

1. Go to your GitHub repository: `https://github.com/yuseaname/rentingexplained`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### 2.2 Add Required Secrets

Add the following secrets one by one:

#### `HOSTINGER_SSH_HOST`
- **Value**: Your Hostinger SSH hostname (e.g., `ssh.hostinger.com`)

#### `HOSTINGER_SSH_USER`
- **Value**: Your Hostinger username

#### `HOSTINGER_SSH_KEY`
- **Value**: Your private SSH key
```bash
# Get the private key content:
cat ~/.ssh/hostinger_deploy
# Copy the ENTIRE output including:
# -----BEGIN OPENSSH PRIVATE KEY-----
# ... key content ...
# -----END OPENSSH PRIVATE KEY-----
```

#### `HOSTINGER_REMOTE_PATH`
- **Value**: Path where deployment archive will be uploaded
- **Example**: `/home/u123456789/uploads` or `/tmp`

#### `HOSTINGER_APP_PATH`
- **Value**: Path where your application will run
- **Example**: `/home/u123456789/domains/rentingexplained.com/public_html`
- **Note**: This is where PM2 will run your app from

#### `SITE_URL`
- **Value**: Your production site URL
- **Example**: `https://rentingexplained.com`

#### `HOSTINGER_PORT` (Optional)
- **Value**: The port Hostinger assigns to your Node.js app
- **Example**: `3000` (or check Hostinger hPanel → Application Settings)
- **Note**: If not set, defaults to 3000

---

## 📦 Step 3: Prepare Hostinger Environment

### 3.1 Connect to Hostinger via SSH

```bash
ssh -i ~/.ssh/hostinger_deploy your-username@your-hostname
```

### 3.2 Create Application Directory Structure

```bash
# Navigate to your domain directory
cd ~/domains/rentingexplained.com/public_html

# Create necessary directories
mkdir -p current logs uploads

# Verify Node.js is available
node --version  # Should show v18.x or higher
npm --version

# Install PM2 globally (if not already installed)
npm install -g pm2

# Verify PM2
pm2 --version
```

### 3.3 Set Up PM2 Startup

```bash
# Configure PM2 to start on server reboot
pm2 startup

# Follow the instructions it provides
# Save PM2 process list
pm2 save
```

---

## 🎯 Step 4: Deploy from GitHub

### Option A: Automatic Deployment (on push to main)

Simply push your code to the `main` branch:

```bash
# Make sure you're on main branch
git checkout main

# Add all changes
git add .

# Commit
git commit -m "feat: enable automated deployment to Hostinger"

# Push to GitHub
git push origin main
```

The GitHub Action will automatically:
1. ✅ Build your Next.js application
2. ✅ Create deployment package
3. ✅ Upload to Hostinger via SFTP
4. ✅ Extract and install dependencies
5. ✅ Restart application with PM2
6. ✅ Perform health check

### Option B: Manual Deployment Trigger

1. Go to GitHub repository → **Actions** tab
2. Select **Deploy to Hostinger** workflow
3. Click **Run workflow** → **Run workflow**

---

## 🔍 Step 5: Monitor Deployment

### 5.1 View GitHub Actions Progress

1. Go to **Actions** tab in your GitHub repository
2. Click on the running workflow
3. Monitor each step's progress

### 5.2 Check Application Status on Hostinger

```bash
# SSH into Hostinger
ssh -i ~/.ssh/hostinger_deploy your-username@your-hostname

# Check PM2 status
pm2 status

# View application logs
pm2 logs rentingexplained

# View last 50 lines
pm2 logs rentingexplained --lines 50

# View only errors
pm2 logs rentingexplained --err
```

### 5.3 Verify Site is Live

```bash
# Check if site responds
curl -I https://rentingexplained.com

# Expected: HTTP/2 200 OK
```

Or simply visit: **https://rentingexplained.com** in your browser

---

## 🛠️ Troubleshooting

### Deployment Fails at SSH Connection

**Problem**: "Permission denied (publickey)"

**Solution**:
```bash
# Verify private key is correct in GitHub secrets
# Check SSH key format (should include BEGIN/END markers)
# Test SSH connection manually:
ssh -i ~/.ssh/hostinger_deploy -v your-username@your-hostname
```

### Deployment Succeeds but Site Shows Error

**Problem**: Site shows 502/503 error

**Solution**:
```bash
# SSH into Hostinger
ssh -i ~/.ssh/hostinger_deploy your-username@your-hostname

# Check PM2 logs
pm2 logs rentingexplained --err

# Common issues:
# 1. Port already in use
pm2 delete rentingexplained
pm2 start ecosystem.config.js --env production

# 2. Missing dependencies
cd ~/domains/rentingexplained.com/public_html/current
npm ci --omit=dev

# 3. Memory issues
pm2 restart rentingexplained
```

### Build Fails on GitHub

**Problem**: "Build failed" in Actions

**Solution**:
```bash
# Test build locally first
npm ci
npm run build

# Check for TypeScript errors
npm run lint

# Review build logs in GitHub Actions for specific errors
```

### Application Restarts Frequently

**Problem**: PM2 shows many restarts

**Solution**:
```bash
# Check error logs
pm2 logs rentingexplained --err --lines 100

# Increase memory limit in ecosystem.config.js
# Edit: max_memory_restart: '3G'

# Restart with new config
pm2 restart ecosystem.config.js --env production
```

---

## 📚 Useful PM2 Commands

```bash
# View all processes
pm2 list

# View detailed info
pm2 show rentingexplained

# Monitor resources
pm2 monit

# Restart app
pm2 restart rentingexplained

# Stop app
pm2 stop rentingexplained

# Delete app from PM2
pm2 delete rentingexplained

# View logs (live)
pm2 logs rentingexplained

# Flush logs
pm2 flush

# Save PM2 process list
pm2 save

# Resurrect saved processes
pm2 resurrect
```

---

## 🔄 Manual Deployment (Without GitHub Actions)

If you prefer to deploy manually:

### Using the deployment scripts:

**Windows:**
```bash
.\deploy-hostinger.bat
```

**Mac/Linux:**
```bash
chmod +x deploy-hostinger.sh
./deploy-hostinger.sh
```

Then upload the generated ZIP file via Hostinger File Manager.

---

## ✅ Deployment Checklist

Before your first deployment:

- [ ] SSH key pair generated
- [ ] Public key added to Hostinger
- [ ] SSH connection tested successfully
- [ ] All 6 GitHub secrets configured
- [ ] Application directory created on Hostinger
- [ ] PM2 installed globally on Hostinger
- [ ] PM2 startup configured
- [ ] `.env.production` values verified
- [ ] Domain DNS pointing to Hostinger
- [ ] SSL certificate active

After deployment:

- [ ] GitHub Action completed successfully
- [ ] PM2 shows app running
- [ ] Site loads at production URL
- [ ] No console errors in browser
- [ ] All pages accessible
- [ ] Forms working correctly
- [ ] Images loading properly

---

## 📊 Deployment Flow

```
Developer Push
      ↓
GitHub Receives Push
      ↓
GitHub Actions Triggered
      ↓
Build Next.js App (npm run build)
      ↓
Create Deployment Package
      ↓
Upload via SFTP to Hostinger
      ↓
SSH into Hostinger
      ↓
Extract Package
      ↓
Install Dependencies (npm ci --omit=dev)
      ↓
Restart with PM2
      ↓
Health Check
      ↓
✅ Live on Production
```

---

## 🎯 Quick Reference

| Action | Command |
|--------|---------|
| Deploy automatically | `git push origin main` |
| Deploy manually | Click "Run workflow" in GitHub Actions |
| Check deployment logs | GitHub → Actions → Latest workflow |
| View app status | `pm2 status` |
| View app logs | `pm2 logs rentingexplained` |
| Restart app | `pm2 restart rentingexplained` |
| SSH to Hostinger | `ssh -i ~/.ssh/hostinger_deploy user@host` |

---

## 📞 Support Resources

- **Hostinger Support**: [https://www.hostinger.com/contact](https://www.hostinger.com/contact)
- **GitHub Actions Docs**: [https://docs.github.com/actions](https://docs.github.com/actions)
- **PM2 Documentation**: [https://pm2.keymetrics.io/docs](https://pm2.keymetrics.io/docs)
- **Next.js Deployment**: [https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

## 🔒 Security Notes

1. **Never commit** your private SSH key to the repository
2. **Keep secrets secure** in GitHub repository settings
3. **Rotate SSH keys** periodically (every 6-12 months)
4. **Use environment variables** for sensitive configuration
5. **Review GitHub Actions logs** - they hide secrets automatically
6. **Enable 2FA** on your GitHub and Hostinger accounts

---

**✨ You're all set!** Push to `main` branch and watch your site deploy automatically! 🚀
