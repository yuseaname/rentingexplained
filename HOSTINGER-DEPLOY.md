# Hostinger Node.js Deployment Guide

## Prerequisites
- Hostinger Business or Premium hosting plan with Node.js support
- SSH access enabled
- Domain pointed to your hosting

---

## Step 1: Prepare Your Local Project

### 1. Build the project locally to test
```bash
npm install
npm run build
```

### 2. Create production environment file
Create `.env.production` (already in `.gitignore`):
```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Step 2: Upload to Hostinger

### Option A: Using Git (Recommended)

1. **Push your code to GitHub/GitLab**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. **SSH into Hostinger**
```bash
ssh u123456789@yourdomain.com
```

3. **Navigate to your domain directory**
```bash
cd domains/yourdomain.com
rm -rf public_html/*  # Clear default files
```

4. **Clone your repository**
```bash
git clone YOUR_REPO_URL temp
mv temp/* ./
mv temp/.* ./ 2>/dev/null || true
rm -rf temp
```

### Option B: Using FTP/SFTP

1. **Connect via FileZilla or similar**
   - Host: `ftp.yourdomain.com` or your server IP
   - Username: Your hosting username
   - Password: Your hosting password
   - Port: 21 (FTP) or 22 (SFTP)

2. **Upload files to `/domains/yourdomain.com/`**
   - Upload ALL files including:
     - `package.json`
     - `next.config.js`
     - `app/` folder
     - `components/` folder
     - `lib/` folder
     - `public/` folder
     - All config files
   - **Do NOT upload:**
     - `node_modules/`
     - `.next/`
     - `.git/`

---

## Step 3: Configure Node.js in Hostinger

### 1. Access Hostinger Control Panel
- Go to https://hpanel.hostinger.com
- Select your hosting plan

### 2. Set Up Node.js Application
1. Navigate to **Advanced** ? **Node.js**
2. Click **Create Application**
3. Configure:
   - **Node.js version**: 18.x or 20.x (LTS)
   - **Application mode**: Production
   - **Application root**: `domains/yourdomain.com`
   - **Application URL**: `https://yourdomain.com`
   - **Application startup file**: Leave empty (Next.js handles this)
   - **Port**: Will be assigned automatically (usually 3000-4000)

4. Click **Create**

### 3. Set Environment Variables
In the Node.js application settings:
1. Click **Edit** on your application
2. Add environment variables:
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Step 4: Install Dependencies via SSH

### 1. SSH into your server
```bash
ssh u123456789@yourdomain.com
```

### 2. Navigate to your project
```bash
cd domains/yourdomain.com
```

### 3. Install dependencies
```bash
npm install --production
```

### 4. Build the Next.js application
```bash
npm run build
```

---

## Step 5: Configure Application Startup

### 1. Create startup script
Create `server.js` in your project root (already included):
```bash
ls server.js  # Verify it exists
```

### 2. Update Node.js application in hPanel
1. Go back to **Node.js** settings in hPanel
2. Edit your application
3. Set **Application startup file**: `server.js`
4. Click **Update**

### 3. Start the application
In hPanel Node.js settings:
- Click **Restart** or **Start**

---

## Step 6: Configure .htaccess (For Hostinger)

Your `.htaccess` file (already included) should redirect all traffic to Node.js:

Check if it exists:
```bash
cat .htaccess
```

If not, create it with the content from `.htaccess-hostinger`.

---

## Step 7: Verify Deployment

### 1. Check application status
In hPanel ? Node.js:
- Status should show **Running** (green)
- Port should be assigned

### 2. Visit your domain
```
https://yourdomain.com
```

### 3. Check logs if issues occur
SSH into server:
```bash
cd domains/yourdomain.com
cat logs/error.log  # If available
```

Or in hPanel ? Node.js ? View Logs

---

## Troubleshooting

### Issue: "Application Not Running"

**Solution 1: Check Node version**
```bash
node --version  # Should be 18.x or higher
npm --version
```

**Solution 2: Rebuild**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Solution 3: Check port conflicts**
Make sure no other application is using the assigned port.

### Issue: "Module not found"

**Solution:**
```bash
npm install
npm run build
```

Ensure all dependencies are installed in production mode.

### Issue: "Out of Memory"

**Solution:**
Increase Node.js memory limit in `server.js` (already configured to 2GB).

If still issues, contact Hostinger support to increase memory allocation.

### Issue: Images not loading

**Solution:**
1. Check `next.config.js` has correct image domains
2. Ensure `public/` folder uploaded
3. Check file permissions:
```bash
chmod -R 755 public/
```

### Issue: Build fails

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build 2>&1 | tee build.log
```

Check `build.log` for specific errors.

---

## Performance Optimization

### 1. Enable caching in .htaccess
Already configured in `.htaccess-hostinger`

### 2. Use CDN for images
Consider using:
- Cloudflare (free)
- Hostinger's built-in CDN

### 3. Enable compression
Already enabled in Next.js config

### 4. Monitor performance
```bash
# Check memory usage
free -h

# Check disk usage
df -h

# Monitor logs
tail -f logs/access.log
```

---

## Updating Your Site

### Method 1: Git Pull (Recommended)
```bash
ssh u123456789@yourdomain.com
cd domains/yourdomain.com
git pull origin main
npm install
npm run build
# Restart via hPanel Node.js settings
```

### Method 2: FTP Upload
1. Upload changed files via FTP
2. SSH in and run:
```bash
cd domains/yourdomain.com
npm install  # If package.json changed
npm run build
# Restart via hPanel
```

---

## Useful Commands

### Restart application
Via hPanel ? Node.js ? Restart

Or via SSH with PM2 (if Hostinger uses it):
```bash
pm2 restart all
```

### View running processes
```bash
ps aux | grep node
```

### Check disk space
```bash
du -sh *
```

### Clear Next.js cache
```bash
rm -rf .next
npm run build
```

---

## Important Notes

1. **Never commit sensitive data**
   - `.env` files are in `.gitignore`
   - Set environment variables in hPanel

2. **Keep Node.js updated**
   - Hostinger allows selecting Node version
   - Use LTS versions (18.x or 20.x)

3. **Monitor resource usage**
   - Hostinger has resource limits
   - Monitor in hPanel ? Statistics

4. **Backup regularly**
   - Use hPanel backup feature
   - Keep Git repository updated

5. **SSL Certificate**
   - Enable free SSL in hPanel ? SSL
   - Force HTTPS in `.htaccess`

---

## Getting Help

### Hostinger Support
- Live chat: 24/7 available in hPanel
- Tutorials: https://support.hostinger.com
- Community: https://www.hostinger.com/tutorials/

### Application Logs
- hPanel ? Node.js ? View Logs
- Or SSH: `tail -f logs/*.log`

### Common Hostinger Limits
- Memory: 2GB (Business plan)
- CPU: Shared
- Storage: Based on plan
- Bandwidth: Usually unlimited

---

## Quick Reference

### File Structure on Server
```
domains/yourdomain.com/
??? .next/              # Built Next.js app
??? app/                # Next.js app directory
??? components/         # React components
??? lib/                # Utilities
??? public/             # Static files
??? node_modules/       # Dependencies
??? package.json        # Dependencies list
??? next.config.js      # Next.js config
??? server.js           # Startup file
??? .htaccess          # Apache config
??? .env.production     # Environment variables
```

### Environment Variables
Set in hPanel ? Node.js ? Edit Application:
- `NODE_ENV=production`
- `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
- `PORT` (auto-assigned by Hostinger)

---

**Your site is now ready for Hostinger deployment! ??**

Follow these steps carefully and your Next.js site will be running smoothly on Hostinger's Node.js hosting.
