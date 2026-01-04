# 🚨 URGENT FIX: Static Files 404 Error

## Current Problem

Your site is showing MIME type errors because static files (`_next/static/*`) are returning 404.

## Root Cause

The deployment is missing static files or they're in the wrong location for standalone builds.

---

## ⚡ Immediate Fix (SSH into Hostinger)

### Step 1: SSH into Hostinger
```bash
ssh -i ~/.ssh/hostinger_deploy YOUR_USER@YOUR_HOST
```

### Step 2: Navigate to your app directory
```bash
cd ~/domains/rentingexplained.com/public_html/current
```

### Step 3: Check if static files exist
```bash
ls -la .next/static/
```

**If directory is missing or empty:**

### Step 4: Quick Fix - Copy from build

If you have the `.next` folder from a recent build:

```bash
# On your LOCAL machine, create a proper deployment package
cd D:\repos\rentingexplained.com

# Build fresh
npm run build

# Create deployment package manually
mkdir deploy-temp
cp -r .next/standalone/* deploy-temp/
cp -r .next/static deploy-temp/.next/
cp -r public deploy-temp/
cp server.js deploy-temp/
cp ecosystem.config.js deploy-temp/

# Create archive
tar -czf manual-deploy.tar.gz -C deploy-temp .

# Upload to Hostinger via SFTP
# Use FileZilla or:
scp -i ~/.ssh/hostinger_deploy manual-deploy.tar.gz YOUR_USER@YOUR_HOST:/home/YOUR_USER/uploads/
```

**Then on Hostinger:**

```bash
cd ~/domains/rentingexplained.com/public_html

# Backup current
mv current backup-manual-$(date +%Y%m%d-%H%M%S)

# Create new
mkdir current

# Extract
tar -xzf ~/uploads/manual-deploy.tar.gz -C current/

# Verify static files
ls -la current/.next/static/

# Set permissions
chmod -R 755 current

# Restart PM2
cd current
pm2 delete rentingexplained || true
pm2 start ecosystem.config.js --env production

# Save PM2 config
pm2 save
```

### Step 5: Verify it's working

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs rentingexplained --lines 20

# Test locally
curl http://localhost:3000

# Test static file
curl http://localhost:3000/_next/static/css/a9919ff15d616d12.css
```

### Step 6: Test in browser

Visit: https://rentingexplained.com

Open browser console (F12) - should see no 404 errors

---

## 🔧 Permanent Fix (Update GitHub Actions)

The GitHub Actions workflow has been updated to:
1. ✅ Properly copy static files to `.next/static`
2. ✅ Include ecosystem.config.js
3. ✅ Remove .htaccess (not needed for Node.js)
4. ✅ Use correct hostname (0.0.0.0)

**Next deployment from GitHub will work correctly.**

---

## 📋 Verification Checklist

After applying fix:

- [ ] Static directory exists: `ls .next/static/`
- [ ] CSS files exist: `ls .next/static/css/`
- [ ] JS chunks exist: `ls .next/static/chunks/`
- [ ] PM2 running: `pm2 status` shows "online"
- [ ] No errors in logs: `pm2 logs --err --lines 50`
- [ ] Site loads: `curl https://rentingexplained.com` returns HTML
- [ ] Static files serve: CSS/JS loads without 404
- [ ] Browser console: No MIME type errors

---

## 🎯 Quick Commands Reference

```bash
# Check what's deployed
ls -la ~/domains/rentingexplained.com/public_html/current/.next/

# View PM2 logs
pm2 logs rentingexplained

# Restart app
pm2 restart rentingexplained

# Stop app
pm2 stop rentingexplained

# Start app from correct directory
cd ~/domains/rentingexplained.com/public_html/current
pm2 start ecosystem.config.js --env production

# Check file permissions
ls -la .next/static/

# Fix permissions if needed
chmod -R 755 .next
chmod -R 755 public
```

---

## 🔍 Debug Info to Collect

If still having issues, collect this info:

```bash
# 1. Directory structure
tree -L 3 ~/domains/rentingexplained.com/public_html/current/

# Or without tree:
find ~/domains/rentingexplained.com/public_html/current/ -maxdepth 3 -type d

# 2. PM2 details
pm2 show rentingexplained

# 3. PM2 logs
pm2 logs rentingexplained --lines 100 --nostream > pm2-logs.txt

# 4. Test server locally
curl -I http://localhost:3000
curl -I http://localhost:3000/_next/static/css/a9919ff15d616d12.css

# 5. Check environment
pm2 env 0  # Replace 0 with your app ID from pm2 status
```

---

## Need More Help?

See:
- [HOSTINGER-NODEJS-CONFIG.md](HOSTINGER-NODEJS-CONFIG.md) - Full Hostinger configuration
- [GITHUB-DEPLOY.md](GITHUB-DEPLOY.md) - Deployment troubleshooting

**The updated files will fix this for future deployments!**
