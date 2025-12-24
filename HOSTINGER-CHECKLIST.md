# Hostinger Deployment Checklist

Use this checklist to ensure smooth deployment to Hostinger Node.js hosting.

## Pre-Deployment ?

### Local Testing
- [ ] Run `npm install` successfully
- [ ] Run `npm run build` without errors
- [ ] Test locally with `npm start`
- [ ] All pages load correctly at http://localhost:3000
- [ ] Images display properly
- [ ] Tools/calculators work
- [ ] No console errors in browser

### Code Quality
- [ ] All files committed to Git (if using Git deployment)
- [ ] No sensitive data in code (API keys, passwords)
- [ ] `.env` files in `.gitignore`
- [ ] Build output shows no warnings

### Configuration Files
- [ ] `package.json` - Has engines defined
- [ ] `next.config.js` - Output set to 'standalone'
- [ ] `server.js` - Custom server file exists
- [ ] `.htaccess-hostinger` - Template exists
- [ ] `.env.production.example` - Template exists

---

## Hostinger Setup ?

### Account & Hosting
- [ ] Hostinger Business/Premium plan active
- [ ] Domain pointed to hosting
- [ ] SSL certificate enabled (in hPanel ? SSL)
- [ ] SSH access enabled
- [ ] Node.js available in hPanel

### hPanel Configuration
- [ ] Logged into https://hpanel.hostinger.com
- [ ] Selected correct hosting plan
- [ ] Navigate to Advanced ? Node.js
- [ ] Node.js version 18.x or 20.x selected

---

## File Upload ?

### Option A: Git Deployment (Recommended)
- [ ] Repository pushed to GitHub/GitLab
- [ ] SSH into Hostinger server
- [ ] Navigate to `domains/yourdomain.com`
- [ ] Clone repository: `git clone YOUR_REPO_URL`
- [ ] Files in correct location

### Option B: FTP/SFTP Upload
- [ ] Connected to FTP (ftp.yourdomain.com)
- [ ] Uploaded all source files to `domains/yourdomain.com/`
- [ ] Uploaded: app/, components/, lib/, public/
- [ ] Uploaded: package.json, next.config.js, server.js
- [ ] Uploaded: All config files
- [ ] NOT uploaded: node_modules/, .next/, .git/

---

## Server Configuration ?

### SSH Commands
```bash
ssh u123456789@yourdomain.com
cd domains/yourdomain.com
```

- [ ] Successfully SSH'd into server
- [ ] Navigated to project directory
- [ ] Confirmed files present: `ls -la`

### Install Dependencies
```bash
npm install --production
```
- [ ] Dependencies installed successfully
- [ ] No error messages
- [ ] node_modules/ folder created

### Build Application
```bash
npm run build
```
- [ ] Build completed successfully
- [ ] .next/ folder created
- [ ] No build errors

### Setup .htaccess
```bash
cp .htaccess-hostinger .htaccess
```
- [ ] .htaccess file created
- [ ] Update port number if needed (line 11)

---

## Node.js Application Setup ?

### Create Application in hPanel
- [ ] Go to Advanced ? Node.js
- [ ] Click "Create Application"
- [ ] Configure settings:
  - [ ] Application mode: **Production**
  - [ ] Node.js version: **18.x or 20.x**
  - [ ] Application root: `domains/yourdomain.com`
  - [ ] Application URL: `https://yourdomain.com`
  - [ ] Application startup file: `server.js`
- [ ] Click "Create"

### Environment Variables
In Node.js app settings ? Edit ? Environment Variables:
- [ ] `NODE_ENV` = `production`
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
- [ ] Other variables as needed

### Start Application
- [ ] Click "Start" or "Restart" in hPanel
- [ ] Status shows "Running" (green indicator)
- [ ] Port assigned (usually 3000-4000)

---

## Testing & Verification ?

### Application Status
- [ ] hPanel shows app running
- [ ] No errors in Node.js logs
- [ ] Port assigned and active

### Website Testing
- [ ] Visit https://yourdomain.com
- [ ] Home page loads
- [ ] All navigation links work
- [ ] Blog posts load
- [ ] Tools/calculators functional
- [ ] Images display
- [ ] Mobile responsive
- [ ] HTTPS working (green padlock)

### Performance Check
- [ ] Page loads in < 3 seconds
- [ ] No broken links
- [ ] No 404 errors
- [ ] No console errors
- [ ] Lighthouse score > 80

### Browser Testing
- [ ] Chrome - Works
- [ ] Firefox - Works
- [ ] Safari - Works
- [ ] Mobile browsers - Work

---

## Post-Deployment ?

### DNS & SSL
- [ ] SSL certificate active
- [ ] HTTP redirects to HTTPS
- [ ] www redirects to non-www (or vice versa)
- [ ] DNS propagation complete

### Monitoring Setup
- [ ] Google Analytics added (optional)
- [ ] Google Search Console setup
- [ ] Sitemap submitted: `https://yourdomain.com/sitemap.xml`
- [ ] robots.txt accessible: `https://yourdomain.com/robots.txt`

### Documentation
- [ ] .env.production created with actual values
- [ ] Deployment notes documented
- [ ] Hostinger credentials saved securely
- [ ] SSH keys backed up

### Backups
- [ ] Code pushed to Git repository
- [ ] Database backed up (if applicable)
- [ ] Hostinger automatic backups enabled
- [ ] Local copy of production .env file (secure location)

---

## Troubleshooting Guide ?

### If App Won't Start
```bash
# Check logs
cd domains/yourdomain.com
cat logs/error.log

# Or in hPanel ? Node.js ? View Logs
```
- [ ] Checked error logs
- [ ] Identified issue
- [ ] Applied fix
- [ ] Restarted app

### If Build Fails
```bash
# Clear and rebuild
rm -rf .next node_modules
npm install
npm run build
```
- [ ] Cleared cache
- [ ] Reinstalled dependencies
- [ ] Rebuilt successfully

### If Port Conflict
- [ ] Check assigned port in hPanel
- [ ] Update .htaccess with correct port
- [ ] Restart application

### If Images Don't Load
```bash
# Check permissions
chmod -R 755 public/
```
- [ ] Fixed file permissions
- [ ] Confirmed next.config.js image domains
- [ ] Verified public folder uploaded

---

## Updating Site (Future) ?

### Git Method
```bash
ssh u123456789@yourdomain.com
cd domains/yourdomain.com
git pull origin main
npm install  # if package.json changed
npm run build
# Restart in hPanel
```

### FTP Method
- [ ] Upload changed files
- [ ] SSH in
- [ ] Run `npm install` if needed
- [ ] Run `npm run build`
- [ ] Restart in hPanel

---

## Support Resources ?

- [ ] Bookmarked: https://hpanel.hostinger.com
- [ ] Bookmarked: Hostinger support chat
- [ ] Saved: SSH credentials
- [ ] Saved: FTP credentials
- [ ] Read: HOSTINGER-DEPLOY.md

---

## Final Checks ?

- [ ] Website accessible at production URL
- [ ] All features working
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] SEO basics in place
- [ ] Analytics tracking (if configured)
- [ ] Error monitoring active
- [ ] Backup strategy in place

---

## Deployment Date: _______________

**Deployed by:** _______________

**Notes:**
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

**Congratulations! Your site is live on Hostinger! ??**

Remember to:
- Monitor performance regularly
- Keep dependencies updated
- Back up regularly
- Renew SSL certificates (usually auto)
- Monitor resource usage in hPanel
