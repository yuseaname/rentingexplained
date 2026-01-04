# ? Hostinger Deployment - Quick Reference Card

## ?? Before You Start

? Hostinger Business/Premium plan  
? Node.js enabled in hPanel  
? Domain configured  
? SSL certificate active  

---

## ?? Deploy in 3 Steps

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Upload to Server
**Via Git:**
```bash
git push origin main
ssh user@domain.com
cd domains/yourdomain.com
git clone YOUR_REPO .
npm install --production
npm run build
```

**Via FTP:** Upload all files to `domains/yourdomain.com/`

### Step 3: Configure in hPanel
1. Go to **Node.js** ? **Create Application**
2. Settings:
   - Node version: **18.x**
   - App root: `domains/yourdomain.com`
   - Startup file: `server.js`
3. Add env vars: `NODE_ENV=production`
4. Click **Start**

---

## ?? Essential Commands

```bash
# Build project
npm run build

# Deploy via SSH
ssh user@domain.com
cd domains/yourdomain.com
npm install --production
npm run build

# Update site
git pull && npm install && npm run build
# Then restart in hPanel

# Check logs
tail -f logs/*.log
```

---

## ?? hPanel Settings

| Setting | Value |
|---------|-------|
| Node version | 18.x or 20.x |
| App mode | Production |
| Startup file | `server.js` |
| App root | `domains/yourdomain.com` |

**Environment Variables:**
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## ? Common Mistakes

1. ? Uploading `node_modules/` ? ? Install on server
2. ? Wrong startup file ? ? Must be `server.js`
3. ? Forgot to build ? ? Run `npm run build`
4. ? Missing env vars ? ? Set in hPanel
5. ? Port mismatch ? ? Check `.htaccess` line 11

---

## ?? Quick Fixes

**App won't start?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Images not loading?**
```bash
chmod -R 755 public/
```

**Port conflict?**
- Check assigned port in hPanel
- Update `.htaccess` line 11

---

## ?? Documentation

- **5-min guide:** HOSTINGER-README.md
- **Full guide:** HOSTINGER-DEPLOY.md  
- **Checklist:** HOSTINGER-CHECKLIST.md
- **Overview:** HOSTINGER-SUMMARY.md

---

## ? Verification Checklist

After deployment:

- [ ] App status: **Running** (green)
- [ ] Visit https://yourdomain.com
- [ ] All pages load
- [ ] Images display
- [ ] Tools work
- [ ] HTTPS active
- [ ] No console errors

---

## ?? Files on Server

```
domains/yourdomain.com/
??? app/              ? Upload
??? components/       ? Upload
??? lib/              ? Upload
??? public/           ? Upload
??? package.json      ? Upload
??? server.js         ? Upload
??? .htaccess         ? Upload
??? node_modules/     ? Install on server
??? .next/            ? Build on server
```

---

## ?? Pro Tips

1. Use **Git deployment** for easy updates
2. **Test locally** before deploying
3. **Monitor logs** in hPanel regularly
4. **Backup** before major changes
5. Keep **dependencies updated**

---

## ?? Quick Links

- hPanel: https://hpanel.hostinger.com
- Support: 24/7 chat in hPanel
- Node.js docs: Click "Node.js" in hPanel

---

**Need help? See HOSTINGER-DEPLOY.md for detailed instructions!**

Print this card and keep it handy during deployment! ??
