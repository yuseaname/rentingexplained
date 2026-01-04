# Hostinger Node.js Configuration

## IMPORTANT: No .htaccess Needed!

For Hostinger Node.js hosting, **DO NOT use .htaccess**. Your Node.js server handles all requests.

## Setup Steps on Hostinger

### 1. In hPanel → Application Settings

Set the following:

**Application Root:**
```
/domains/rentingexplained.com/public_html/current
```

**Application Startup File:**
```
server.js
```

**Application Entry Point (PM2):**
```
server.js
```

**Node.js Version:**
```
18.x or higher
```

### 2. Environment Variables in hPanel

Go to **Application Settings → Environment Variables**

Add:
```
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

**Note:** Hostinger may assign a specific port - use that instead of 3000 if required.

### 3. Application URL Configuration

In hPanel → **Application Settings**:

**Document Root:** Leave empty or set to `/`
**Application URL:** Your domain (e.g., `https://rentingexplained.com`)

### 4. Force HTTPS (Optional)

If Hostinger doesn't auto-redirect to HTTPS:

Go to **Advanced → Force HTTPS** and enable it globally for your domain.

## Directory Structure on Hostinger

```
/home/uXXXXXX/domains/rentingexplained.com/public_html/
├── current/              ← Active deployment
│   ├── server.js        ← Entry point
│   ├── .next/
│   │   ├── static/      ← Static assets (CSS, JS)
│   │   └── ...
│   ├── public/          ← Public files (images, etc.)
│   ├── ecosystem.config.js
│   └── .env.production
├── logs/                ← PM2 logs
└── backup-YYYYMMDD-HHMMSS/  ← Previous deployments
```

## PM2 Process Management

### Start Application
```bash
cd ~/domains/rentingexplained.com/public_html/current
pm2 start ecosystem.config.js --env production
```

### Configure Auto-Start on Reboot
```bash
pm2 startup
# Copy and run the command it provides
pm2 save
```

### Common PM2 Commands
```bash
pm2 status                    # Check status
pm2 logs rentingexplained     # View logs
pm2 restart rentingexplained  # Restart app
pm2 stop rentingexplained     # Stop app
pm2 delete rentingexplained   # Remove from PM2
```

## Troubleshooting 404 for Static Files

### Issue: _next/static/* files return 404

**Cause:** Static files not in correct location or PM2 working directory wrong

**Solution:**
```bash
cd ~/domains/rentingexplained.com/public_html/current

# Verify static files exist
ls -la .next/static/

# Check PM2 working directory
pm2 show rentingexplained

# If "cwd" is wrong, restart from correct directory:
pm2 delete rentingexplained
pm2 start ecosystem.config.js --env production
```

### Issue: MIME type errors (text/html instead of text/css)

**Cause:** Server returning HTML error page instead of static file

**Solution:**
```bash
# Check PM2 logs for errors
pm2 logs rentingexplained --err

# Common fixes:
# 1. Restart PM2
pm2 restart rentingexplained

# 2. Rebuild if static files are missing
npm run build
pm2 restart rentingexplained

# 3. Check file permissions
chmod -R 755 .next/static/
```

## Port Configuration

Hostinger assigns ports automatically. To find your assigned port:

1. Check hPanel → **Application Settings** → **Port**
2. Update `.env.production`:
   ```
   PORT=ASSIGNED_PORT
   ```
3. Restart: `pm2 restart rentingexplained`

## Testing Locally

Before deploying, test the standalone build locally:

```bash
# Build
npm run build

# The standalone build is in .next/standalone/
cd .next/standalone

# Copy static files
cp -r ../.next/static .next/
cp -r ../../public ./public

# Copy your server.js
cp ../../server.js ./

# Run
PORT=3000 NODE_ENV=production node server.js

# Test
curl http://localhost:3000
curl http://localhost:3000/_next/static/css/...  # Should return CSS
```

## Security Notes

1. **Never commit** `.env.production` with real values
2. **Keep secrets** in Hostinger environment variables
3. **File permissions:** Ensure 755 for directories, 644 for files
4. **PM2 logs:** Review regularly for errors

## Performance Tips

1. **Enable compression** - Already configured in server.js
2. **Use CDN** - Cloudflare free tier works with Hostinger
3. **Monitor memory** - PM2 auto-restarts if >2GB (configured)
4. **Clean old deployments** - Keep only last 3 backups

## Quick Deployment Checklist

After each deployment:

- [ ] SSH into Hostinger
- [ ] Verify extraction: `ls -la ~/domains/rentingexplained.com/public_html/current`
- [ ] Check static files: `ls -la .next/static/`
- [ ] Restart PM2: `pm2 restart rentingexplained`
- [ ] Check logs: `pm2 logs rentingexplained --lines 50`
- [ ] Test site: `curl https://rentingexplained.com`
- [ ] Check browser: Open site and verify no console errors

## Need Help?

- **PM2 logs:** `pm2 logs rentingexplained`
- **System logs:** Check hPanel → Error Logs
- **Test locally:** Build and run standalone to debug
- **GitHub Actions logs:** Check workflow output for deployment issues
