# ?? Quick Hostinger Deployment

## Prerequisites
- Hostinger Business or Premium plan with Node.js support
- Domain configured
- SSH access enabled

---

## ?? Quick Start (5 Minutes)

### 1. Prepare Locally
```bash
# Windows
deploy-hostinger.bat

# Mac/Linux
bash deploy-hostinger.sh
```

### 2. Upload to Hostinger

**Option A - Git (Easiest)**
```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# SSH to Hostinger
ssh your-username@yourdomain.com
cd domains/yourdomain.com
git clone YOUR_REPO_URL .
```

**Option B - FTP**
- Use FileZilla or similar
- Upload all files to `domains/yourdomain.com/`
- Don't upload: node_modules/, .next/, .git/

### 3. Configure on Server

**SSH Commands:**
```bash
ssh your-username@yourdomain.com
cd domains/yourdomain.com
npm install --production
npm run build
```

**hPanel Setup:**
1. Go to https://hpanel.hostinger.com
2. Advanced ? Node.js ? Create Application
3. Settings:
   - Node.js version: **18.x** or **20.x**
   - Application mode: **Production**
   - Application root: `domains/yourdomain.com`
   - Startup file: `server.js`
4. Add environment variables:
   - `NODE_ENV=production`
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
5. Click **Start**

### 4. Verify
Visit https://yourdomain.com

---

## ?? Important Files

| File | Purpose |
|------|---------|
| `server.js` | Custom Node.js server for Hostinger |
| `.htaccess-hostinger` | Apache configuration template |
| `.env.production.example` | Environment variables template |
| `HOSTINGER-DEPLOY.md` | Detailed deployment guide |
| `HOSTINGER-CHECKLIST.md` | Step-by-step checklist |

---

## ?? Common Issues

### Build fails?
```bash
rm -rf .next node_modules
npm install
npm run build
```

### App won't start?
- Check Node.js logs in hPanel
- Verify `server.js` is set as startup file
- Ensure port matches in `.htaccess`

### Images not loading?
```bash
chmod -R 755 public/
```

---

## ?? Documentation

- **Full Guide:** [HOSTINGER-DEPLOY.md](./HOSTINGER-DEPLOY.md)
- **Checklist:** [HOSTINGER-CHECKLIST.md](./HOSTINGER-CHECKLIST.md)
- **Hostinger Support:** https://support.hostinger.com

---

## ?? Need Help?

1. Check [HOSTINGER-DEPLOY.md](./HOSTINGER-DEPLOY.md) for detailed instructions
2. Review [HOSTINGER-CHECKLIST.md](./HOSTINGER-CHECKLIST.md)
3. Contact Hostinger support (24/7 live chat)
4. Check application logs in hPanel ? Node.js ? View Logs

---

## ? Quick Commands

```bash
# Build for production
npm run build

# Start locally
npm start

# Deploy via SSH
ssh user@domain.com
cd domains/yourdomain.com
git pull && npm install && npm run build
# Then restart in hPanel

# Check logs
tail -f logs/*.log
```

---

## ? Deployment Checklist

- [ ] Local build successful
- [ ] Files uploaded to Hostinger
- [ ] Dependencies installed on server
- [ ] Built on server (`npm run build`)
- [ ] Node.js app created in hPanel
- [ ] Startup file set to `server.js`
- [ ] Environment variables configured
- [ ] Application started
- [ ] Website accessible at domain
- [ ] SSL certificate active
- [ ] All pages working

---

**Ready to deploy? Run the deployment script and follow the prompts!**

```bash
# Windows
deploy-hostinger.bat

# Mac/Linux  
bash deploy-hostinger.sh
```
