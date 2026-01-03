#!/bin/bash
# Emergency Fix Script for Hostinger
# This will diagnose and fix the static file issue

set -e

echo "========================================"
echo "  EMERGENCY STATIC FILES FIX"
echo "========================================"
echo ""

# Configuration
APP_DIR="$HOME/domains/rentingexplained.com/public_html"
CURRENT_DIR="$APP_DIR/current"

echo "1. Checking current deployment..."
cd "$APP_DIR"

if [ ! -d "current" ]; then
    echo "ERROR: No 'current' directory found!"
    echo "Creating directory structure..."
    mkdir -p current
fi

cd current
pwd

echo ""
echo "2. Checking for .next/static files..."

if [ -d ".next/static" ]; then
    file_count=$(find .next/static -type f 2>/dev/null | wc -l)
    echo "✓ Found $file_count static files"
    
    # List what's there
    echo ""
    echo "Static file structure:"
    ls -la .next/static/
    
    if [ $file_count -lt 10 ]; then
        echo ""
        echo "⚠ WARNING: Too few static files!"
        echo "Expected ~30-40 files, found only $file_count"
        NEED_REDEPLOY=1
    fi
else
    echo "✗ .next/static directory MISSING!"
    echo ""
    echo "This is the problem - no static files deployed!"
    NEED_REDEPLOY=1
fi

echo ""
echo "3. Checking PM2 status..."

if command -v pm2 >/dev/null 2>&1; then
    pm2 list
    
    echo ""
    echo "PM2 process details:"
    pm2 show rentingexplained 2>/dev/null || echo "rentingexplained not found in PM2"
    
    # Check working directory
    PM2_CWD=$(pm2 jlist 2>/dev/null | grep -A 5 '"name":"rentingexplained"' | grep "pm_cwd" | cut -d'"' -f4)
    
    if [ -n "$PM2_CWD" ]; then
        echo ""
        echo "PM2 working directory: $PM2_CWD"
        echo "Expected directory:    $CURRENT_DIR"
        
        if [ "$PM2_CWD" != "$CURRENT_DIR" ]; then
            echo "✗ PM2 is running from WRONG directory!"
            NEED_RESTART=1
        fi
    fi
else
    echo "✗ PM2 not found!"
    echo "Install with: npm install -g pm2"
    exit 1
fi

echo ""
echo "4. Testing server response..."

PORT=${PORT:-3000}

# Test main page
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT 2>/dev/null || echo "000")

if [ "$RESPONSE" = "200" ]; then
    echo "✓ Server responding on port $PORT"
else
    echo "✗ Server not responding (HTTP $RESPONSE)"
    NEED_RESTART=1
fi

# Test static file if we have them
if [ -d ".next/static/css" ]; then
    CSS_FILE=$(find .next/static/css -name "*.css" -type f | head -n 1)
    if [ -n "$CSS_FILE" ]; then
        CSS_PATH="/${CSS_FILE}"
        STATIC_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT$CSS_PATH 2>/dev/null || echo "000")
        
        if [ "$STATIC_RESPONSE" = "200" ]; then
            echo "✓ Static files serving correctly"
        else
            echo "✗ Static files returning HTTP $STATIC_RESPONSE"
            NEED_RESTART=1
        fi
    fi
fi

echo ""
echo "========================================"
echo "  DIAGNOSIS COMPLETE"
echo "========================================"
echo ""

# Apply fixes
if [ -n "$NEED_REDEPLOY" ]; then
    echo "❌ CRITICAL: Static files are missing!"
    echo ""
    echo "You need to upload and extract manual-deploy.zip:"
    echo ""
    echo "1. Upload manual-deploy.zip to Hostinger (via File Manager or SFTP)"
    echo "2. Run these commands:"
    echo ""
    echo "   cd $APP_DIR"
    echo "   mv current backup-\$(date +%Y%m%d-%H%M%S)  # Backup current"
    echo "   mkdir current"
    echo "   unzip ~/manual-deploy.zip -d current/  # Or wherever you uploaded it"
    echo "   cd current"
    echo "   pm2 delete rentingexplained 2>/dev/null || true"
    echo "   pm2 start ecosystem.config.js --env production"
    echo "   pm2 save"
    echo ""
    exit 1
fi

if [ -n "$NEED_RESTART" ]; then
    echo "⚠ Need to restart PM2 from correct directory"
    echo ""
    read -p "Restart PM2 now? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Restarting PM2..."
        pm2 delete rentingexplained 2>/dev/null || true
        pm2 start ecosystem.config.js --env production
        pm2 save
        
        echo ""
        echo "✓ PM2 restarted"
        echo ""
        echo "Check logs:"
        pm2 logs rentingexplained --lines 20
    fi
else
    echo "✅ Everything looks good!"
    echo ""
    echo "If you're still seeing 404 errors in browser:"
    echo "1. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)"
    echo "2. Check PM2 logs: pm2 logs rentingexplained"
    echo "3. Verify URL in browser matches: https://rentingexplained.com"
fi

echo ""
