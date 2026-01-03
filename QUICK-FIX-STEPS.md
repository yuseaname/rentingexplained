# DEPLOYMENT FAILED - QUICK FIX

## The Problem
Static files (_next/static/*) are returning 404 on your live site.

## The Solution (5 Steps)

### Step 1: Upload the ZIP
1. Open Hostinger **File Manager** (in hPanel)
2. Navigate to your home directory
3. Click **Upload**
4. Select `manual-deploy.zip` from: `D:\repos\rentingexplained.com\`
5. Wait for upload to complete (6 MB, ~1-2 minutes)

### Step 2: Connect via SSH
Open PowerShell and connect:
```powershell
ssh YOUR_USERNAME@ssh.hostinger.com
# Replace YOUR_USERNAME with your actual Hostinger username
```

*Don't have SSH access? Enable it in hPanel → Advanced → SSH Access*

### Step 3: Extract the Files
Copy and paste these commands one by one:

```bash
# Go to your app directory
cd ~/domains/rentingexplained.com/public_html

# Backup current version (if exists)
mv current backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true

# Create fresh directory
mkdir -p current

# Extract the uploaded ZIP
unzip ~/manual-deploy.zip -d current/

# Verify static files are there
ls -la current/.next/static/

# You should see: chunks/, css/, and other folders
```

### Step 4: Restart PM2
```bash
# Go into the app directory
cd current

# Stop old process
pm2 delete rentingexplained 2>/dev/null || true

# Start fresh
pm2 start ecosystem.config.js --env production

# Save configuration
pm2 save

# Check it's running
pm2 status
```

### Step 5: Verify It's Working
```bash
# Should show "online" status
pm2 logs rentingexplained --lines 20

# Should see: "Ready on http://0.0.0.0:3000"
```

Then open your browser:
- Visit: https://rentingexplained.com
- Press F12 (open console)
- Hard refresh: Ctrl+Shift+R
- Check: No more 404 errors! ✅

---

## If Something Goes Wrong

### Error: "unzip: command not found"
```bash
# Try with jar instead
cd ~/domains/rentingexplained.com/public_html
jar -xf ~/manual-deploy.zip
mv .next package.json server.js ecosystem.config.js current/
```

### Error: "pm2: command not found"
```bash
npm install -g pm2
# Then continue with Step 4
```

### Error: ZIP file not found
```bash
# Check where you uploaded it
find ~ -name "manual-deploy.zip"

# Use the path it shows, for example:
# unzip ~/public_html/manual-deploy.zip -d current/
```

### Still Getting 404s After Deploy
```bash
# Check if static files really exist
ls -la ~/domains/rentingexplained.com/public_html/current/.next/static/

# If empty, the extraction failed - try re-uploading
# If files are there, check PM2 working directory:
pm2 show rentingexplained | grep cwd

# Should show: /home/YOUR_USER/domains/rentingexplained.com/public_html/current
```

---

## Alternative: Use FileZilla Instead of File Manager

If File Manager upload is slow or timing out:

1. Download FileZilla: https://filezilla-project.org/
2. Connect:
   - Host: `sftp://YOUR_HOST` (from hPanel SSH settings)
   - Username: Your Hostinger username
   - Password: Your Hostinger password
   - Port: 22
3. Navigate left side: `D:\repos\rentingexplained.com\`
4. Navigate right side: Your home directory
5. Drag `manual-deploy.zip` from left to right
6. Continue with Step 2 above

---

## Need More Help?

Run the diagnostic script on Hostinger:
```bash
# Upload emergency-fix.sh to Hostinger first, then:
chmod +x emergency-fix.sh
./emergency-fix.sh
```

Or open: `HOSTINGER-SSH-COMMANDS.txt` for more diagnostic commands.
