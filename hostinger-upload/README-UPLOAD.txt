================================================================================
  HOSTINGER UPLOAD PACKAGE - RentingExplained.com
================================================================================

This folder contains ONLY the files you need to upload to Hostinger.

================================================================================
  UPLOAD INSTRUCTIONS
================================================================================

METHOD 1: FTP/SFTP Upload
--------------------------
1. Connect to: ftp.yourdomain.com (or use SFTP on port 22)
2. Navigate to: domains/yourdomain.com/
3. Upload ALL files and folders from this directory
4. Make sure folder structure is preserved

METHOD 2: Git Deployment (Recommended)
---------------------------------------
1. You don't need this folder - just push to GitHub
2. SSH to Hostinger and clone your repository
3. See ../HOSTINGER-README.md for details

================================================================================
  WHAT'S INCLUDED
================================================================================

FOLDERS:
  ? app/              - All Next.js pages and routes
  ? components/       - All React components
  ? content/          - Blog article content
  ? lib/              - Utilities and data
  ? public/           - Static files (currently empty - add images here)
  ? types/            - TypeScript type definitions

CONFIGURATION FILES:
  ? package.json           - Dependencies list
  ? package-lock.json      - Dependency lock file
  ? next.config.js         - Next.js configuration
  ? tsconfig.json          - TypeScript configuration
  ? tailwind.config.js     - Tailwind CSS configuration
  ? postcss.config.js      - PostCSS configuration
  ? next-env.d.ts          - Next.js TypeScript declarations

HOSTINGER-SPECIFIC:
  ? server.js              - Custom Node.js server (REQUIRED!)
  ? .htaccess              - Apache configuration (already renamed)

================================================================================
  WHAT'S NOT INCLUDED (Install/Build on Server)
================================================================================

  ? node_modules/          - Run: npm install --production
  ? .next/                 - Run: npm run build
  ? .env files             - Set in Hostinger hPanel instead

================================================================================
  AFTER UPLOAD - SSH COMMANDS
================================================================================

ssh your-username@yourdomain.com
cd domains/yourdomain.com

# Install dependencies
npm install --production

# Build the application
npm run build

# Verify critical files
ls -la server.js
ls -la .htaccess

================================================================================
  HOSTINGER hPANEL CONFIGURATION
================================================================================

Go to: https://hpanel.hostinger.com
Navigate to: Advanced ? Node.js ? Create Application

Settings:
  - Node.js version: 18.x or 20.x
  - Application mode: Production
  - Application root: domains/yourdomain.com
  - Application URL: https://yourdomain.com
  - Startup file: server.js          ? CRITICAL!

Environment Variables:
  NODE_ENV=production
  NEXT_PUBLIC_SITE_URL=https://yourdomain.com

Then click "Start"

================================================================================
  FILE COUNT VERIFICATION
================================================================================

After upload, you should have approximately:
  - 23 files in app/ folder
  - 19 files in components/ folder
  - 5 files in content/ folder
  - 4 files in lib/ folder
  - 1 file in types/ folder
  - 8 configuration files in root
  - 1 server.js in root
  - 1 .htaccess in root

Total: ~60 files + folders

================================================================================
  TROUBLESHOOTING
================================================================================

App won't start?
  ? Check hPanel logs
  ? Verify server.js is set as startup file
  ? Ensure you ran "npm run build"

Build fails?
  ? Run: rm -rf .next node_modules
  ? Run: npm install
  ? Run: npm run build

Images not loading?
  ? Run: chmod -R 755 public/
  ? Add images to public/ folder

================================================================================
  NEED MORE HELP?
================================================================================

See the following files in the parent directory:
  ../HOSTINGER-README.md       - Quick 5-minute guide
  ../HOSTINGER-DEPLOY.md       - Complete deployment guide
  ../HOSTINGER-CHECKLIST.md    - Step-by-step checklist
  ../HOSTINGER-QUICKREF.md     - Quick reference card

Hostinger Support: 24/7 live chat in hPanel

================================================================================
  READY TO UPLOAD!
================================================================================

This package contains everything you need. Simply upload all files and
folders to your Hostinger server at: domains/yourdomain.com/

Good luck! ??

================================================================================
