# 🚀 GitHub to Hostinger Deployment - Quick Start

## What's Been Set Up

✅ **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Automated deployment on push to `main` branch
   - Builds Next.js app in production mode
   - Creates optimized deployment package
   - Uploads via SFTP to Hostinger
   - Extracts and restarts with PM2

✅ **PM2 Configuration** (`ecosystem.config.js`)
   - Process manager for Node.js on Hostinger
   - Auto-restart on crashes
   - Memory management (2GB limit)
   - Logging configuration

✅ **Updated Package Scripts** (`package.json`)
   - `npm start` - Now uses custom server.js
   - `npm run pm2:start` - Start with PM2
   - `npm run pm2:restart` - Restart app
   - `npm run pm2:logs` - View logs

✅ **Enhanced .gitignore**
   - Excludes deployment artifacts
   - Prevents SSH key commits
   - Ignores PM2 logs

✅ **Custom Server** (`server.js`)
   - Already configured for Hostinger
   - Dynamic port binding
   - Memory optimization

---

## 🎯 Next Steps (3 Simple Steps!)

### Step 1: Set Up SSH Access on Hostinger

1. Log into Hostinger hPanel
2. Go to **Advanced** → **SSH Access**
3. Enable SSH and note your credentials
4. Generate SSH key pair on your computer:
   ```bash
   ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/hostinger_deploy
   ```
5. Add public key to Hostinger authorized keys

**Detailed instructions**: See [GITHUB-DEPLOY.md](GITHUB-DEPLOY.md#-step-1-configure-hostinger-ssh-access)

### Step 2: Configure GitHub Secrets

Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**

Add these 6 secrets:

| Secret Name | Example Value | Description |
|-------------|---------------|-------------|
| `HOSTINGER_SSH_HOST` | `ssh.hostinger.com` | SSH hostname |
| `HOSTINGER_SSH_USER` | `u123456789` | Your username |
| `HOSTINGER_SSH_KEY` | `-----BEGIN OPENSSH...` | Private SSH key |
| `HOSTINGER_REMOTE_PATH` | `/home/u123456789/uploads` | Upload directory |
| `HOSTINGER_APP_PATH` | `/home/u123456789/domains/rentingexplained.com/public_html` | App directory |
| `SITE_URL` | `https://rentingexplained.com` | Production URL |

**Detailed instructions**: See [GITHUB-DEPLOY.md](GITHUB-DEPLOY.md#-step-2-configure-github-secrets)

### Step 3: Prepare Hostinger Server

SSH into Hostinger and run:

```bash
# Install PM2 globally
npm install -g pm2

# Create app directory structure
cd ~/domains/rentingexplained.com/public_html
mkdir -p current logs uploads

# Configure PM2 startup
pm2 startup
pm2 save
```

**Detailed instructions**: See [GITHUB-DEPLOY.md](GITHUB-DEPLOY.md#-step-3-prepare-hostinger-environment)

---

## 🚀 Deploy!

Once configured, simply push to GitHub:

```bash
git add .
git commit -m "feat: enable automated deployment"
git push origin main
```

Watch deployment progress:
- GitHub → **Actions** tab → View running workflow

Check your site:
- Visit https://rentingexplained.com

---

## 📖 Documentation

- **[GITHUB-DEPLOY.md](GITHUB-DEPLOY.md)** - Complete deployment guide
- **[HOSTINGER-COMPLETE.md](HOSTINGER-COMPLETE.md)** - Hostinger configuration details
- **[HOSTINGER-QUICKREF.md](HOSTINGER-QUICKREF.md)** - Command reference

---

## 🛠️ Common Commands

| Task | Command |
|------|---------|
| Deploy | `git push origin main` |
| Manual trigger | GitHub Actions → Run workflow |
| Check status | `pm2 status` |
| View logs | `pm2 logs rentingexplained` |
| Restart app | `pm2 restart rentingexplained` |

---

## ✅ Pre-Deployment Checklist

Before first deployment:

- [ ] SSH key generated and added to Hostinger
- [ ] All 6 GitHub secrets configured
- [ ] PM2 installed on Hostinger
- [ ] Application directories created
- [ ] PM2 startup configured
- [ ] Domain DNS pointing to Hostinger
- [ ] SSL certificate active

---

## 🎉 That's It!

Your deployment pipeline is ready. Follow the 3 steps above, then push your code to automatically deploy to Hostinger!

**Need help?** Check [GITHUB-DEPLOY.md](GITHUB-DEPLOY.md) for detailed instructions and troubleshooting.
