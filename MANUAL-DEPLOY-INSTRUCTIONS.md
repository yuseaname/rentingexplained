# Manual Deployment Instructions

## ✅ Deployment Package Ready!

File: `manual-deploy.zip` (6 MB)
Location: `D:\repos\rentingexplained.com\manual-deploy.zip`

---

## 📤 Step 1: Upload to Hostinger

### Option A: Using Hostinger File Manager (Easiest)

1. Log into Hostinger hPanel
2. Go to **Files** → **File Manager**
3. Navigate to your home directory or create an `uploads` folder
4. Click **Upload** button
5. Select `manual-deploy.zip` from `D:\repos\rentingexplained.com\`
6. Wait for upload to complete

### Option B: Using FileZilla (Faster for large files)

1. Open FileZilla
2. Connect to Hostinger:
   - **Host**: Your Hostinger SFTP host (check hPanel → SSH Access)
   - **Username**: Your Hostinger username
   - **Password**: Your Hostinger password
   - **Port**: 22
3. Navigate to `/home/YOUR_USERNAME/uploads/` (or create this folder)
4. Drag and drop `manual-deploy.zip` to upload

---

## 🔧 Step 2: SSH into Hostinger and Deploy

### Connect via SSH

**Windows (PowerShell):**
```powershell
ssh YOUR_USERNAME@YOUR_HOSTINGER_HOST
```

**If you have SSH key:**
```powershell
ssh -i C:\Users\YOUR_USER\.ssh\hostinger_deploy YOUR_USERNAME@YOUR_HOSTINGER_HOST
```

### Deploy Commands

Once connected to Hostinger, run these commands:

```bash
# Navigate to your domain directory
cd ~/domains/rentingexplained.com/public_html

# Backup current deployment (just in case)
if [ -d "current" ]; then
  mv current backup-manual-$(date +%Y%m%d-%H%M%S)
  echo "✓ Backed up current deployment"
fi

# Create new current directory
mkdir -p current

# Extract the uploaded ZIP
# Note: Adjust the path if you uploaded to a different location
unzip -q ~/uploads/manual-deploy.zip -d current/

# Or if you uploaded to File Manager root:
# unzip -q ~/manual-deploy.zip -d current/

echo "✓ Extracted deployment package"

# Verify static files are present
ls -la current/.next/static/

# Should see: chunks/, css/, and a build ID folder
echo "✓ Static files verified"

# Set proper permissions
chmod -R 755 current
echo "✓ Set permissions"

# Navigate to app directory
cd current

# Stop existing PM2 process (if any)
pm2 delete rentingexplained 2>/dev/null || echo "No existing process to delete"

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

echo "✓ Application restarted with PM2"

# Check status
pm2 status

# View logs
pm2 logs rentingexplained --lines 20
```

---

## ✅ Step 3: Verify Deployment

### On Hostinger (SSH):

```bash
# Check PM2 status - should show "online"
pm2 status

# View recent logs - should see "Ready on http://0.0.0.0:3000"
pm2 logs rentingexplained --lines 30

# Test locally on server
curl http://localhost:3000

# Should return HTML content

# Test static file
curl -I http://localhost:3000/_next/static/css/a9919ff15d616d12.css

# Should return: HTTP/1.1 200 OK
```

### In Your Browser:

1. Visit: **https://rentingexplained.com**
2. Open Developer Console (F12)
3. Check for errors:
   - ✅ No 404 errors for `_next/static/*` files
   - ✅ No MIME type errors
   - ✅ CSS and JS loading correctly
4. Navigate between pages to ensure everything works

---

## 🔍 Troubleshooting

### If PM2 shows "errored" status:

```bash
# View error logs
pm2 logs rentingexplained --err --lines 50

# Common fixes:

# 1. Wrong working directory - restart from app directory
cd ~/domains/rentingexplained.com/public_html/current
pm2 delete rentingexplained
pm2 start ecosystem.config.js --env production

# 2. Port already in use
# Check what port Hostinger assigned in hPanel → Application Settings
# Update .env.production with correct port

# 3. Missing dependencies (shouldn't happen with standalone, but just in case)
npm ci --omit=dev
pm2 restart rentingexplained
```

### If static files still 404:

```bash
# Verify files exist
ls -la ~/domains/rentingexplained.com/public_html/current/.next/static/

# Should see CSS and JS files

# Check permissions
chmod -R 755 ~/domains/rentingexplained.com/public_html/current/.next/

# Restart
pm2 restart rentingexplained
```

### If site shows old version:

```bash
# Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

# Check PM2 is using correct directory
pm2 show rentingexplained

# Look for "cwd" - should be: ~/domains/rentingexplained.com/public_html/current
```

---

## 🎯 Quick Verification Checklist

After deployment:

- [ ] SSH connected successfully
- [ ] ZIP file uploaded to Hostinger
- [ ] Extracted to `current/` directory
- [ ] Static files exist: `ls current/.next/static/` shows files
- [ ] PM2 status shows "online"
- [ ] PM2 logs show "Ready on http://0.0.0.0:3000"
- [ ] `curl http://localhost:3000` returns HTML
- [ ] Browser loads site without 404 errors
- [ ] Browser console shows no MIME type errors
- [ ] All pages navigate correctly

---

## 📝 Post-Deployment Cleanup

After verifying everything works:

```bash
# On Hostinger:

# Remove uploaded ZIP to save space
rm ~/uploads/manual-deploy.zip

# Optional: Remove old backups (keep last 2-3)
cd ~/domains/rentingexplained.com/public_html
ls -t | grep backup | tail -n +4 | xargs -r rm -rf
```

**On your local machine:**

```bash
# Clean up temp files
Remove-Item -Recurse -Force deploy-temp
Remove-Item -Force manual-deploy.zip
```

---

## 🚀 Next Steps

After this manual fix works:

1. **Commit the code fixes** to prevent this issue in future deployments:
   ```bash
   git add .github/workflows/deploy.yml server.js ecosystem.config.js
   git commit -m "fix: resolve static files 404 errors"
   git push origin main
   ```

2. **Future deployments** will work automatically via GitHub Actions with the fixed workflow

---

## 📞 Need Help?

If you encounter issues:

1. Check PM2 logs: `pm2 logs rentingexplained --err`
2. Verify file structure: `tree -L 3 current/` or `find current/ -maxdepth 3`
3. Check the main docs: `HOSTINGER-NODEJS-CONFIG.md`

**The deployment package is ready to upload!** 🎉
