#!/bin/bash
# Hostinger Deployment Diagnostic Script
# Run this on Hostinger via SSH to diagnose static file issues

echo "=========================================="
echo "  HOSTINGER DEPLOYMENT DIAGNOSTICS"
echo "=========================================="
echo ""

# Get app path
APP_PATH="${1:-~/domains/rentingexplained.com/public_html/current}"

echo "📂 Checking directory: $APP_PATH"
echo ""

# Check if directory exists
if [ ! -d "$APP_PATH" ]; then
    echo "❌ ERROR: Directory does not exist!"
    echo "   Path: $APP_PATH"
    exit 1
fi

cd "$APP_PATH"

echo "✅ Directory exists"
echo ""

# Check for key files
echo "📋 Checking for key files:"
echo ""

files=("server.js" "ecosystem.config.js" ".env.production" "package.json")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ MISSING: $file"
    fi
done

echo ""

# Check .next directory
echo "📁 Checking .next directory structure:"
echo ""

if [ -d ".next" ]; then
    echo "  ✅ .next/ exists"
    
    if [ -d ".next/static" ]; then
        file_count=$(find .next/static -type f | wc -l)
        echo "  ✅ .next/static/ exists"
        echo "     Files: $file_count"
        
        # Check subdirectories
        if [ -d ".next/static/css" ]; then
            css_count=$(find .next/static/css -type f | wc -l)
            echo "     ✅ .next/static/css/ ($css_count files)"
        else
            echo "     ❌ .next/static/css/ MISSING"
        fi
        
        if [ -d ".next/static/chunks" ]; then
            chunk_count=$(find .next/static/chunks -type f | wc -l)
            echo "     ✅ .next/static/chunks/ ($chunk_count files)"
        else
            echo "     ❌ .next/static/chunks/ MISSING"
        fi
    else
        echo "  ❌ .next/static/ MISSING - THIS IS THE PROBLEM!"
    fi
else
    echo "  ❌ .next/ MISSING"
fi

echo ""

# Check PM2 status
echo "🔄 Checking PM2 status:"
echo ""

if command -v pm2 &> /dev/null; then
    pm2_status=$(pm2 jlist 2>/dev/null | grep -o '"name":"rentingexplained"' | wc -l)
    
    if [ "$pm2_status" -gt 0 ]; then
        echo "  ✅ PM2 is installed"
        echo ""
        pm2 list
        echo ""
        
        # Get working directory from PM2
        pm2_cwd=$(pm2 jlist | grep -A 10 '"name":"rentingexplained"' | grep -o '"pm_cwd":"[^"]*"' | cut -d'"' -f4)
        echo "  PM2 working directory: $pm2_cwd"
        
        if [ "$pm2_cwd" != "$APP_PATH" ]; then
            echo "  ⚠️  WARNING: PM2 cwd doesn't match current path!"
            echo "     Expected: $APP_PATH"
            echo "     Actual:   $pm2_cwd"
        fi
    else
        echo "  ❌ rentingexplained app not found in PM2"
        echo "     Run: pm2 start ecosystem.config.js --env production"
    fi
else
    echo "  ❌ PM2 is not installed"
    echo "     Run: npm install -g pm2"
fi

echo ""

# Check file permissions
echo "🔐 Checking file permissions:"
echo ""

if [ -d ".next/static" ]; then
    perm=$(stat -c %a .next/static 2>/dev/null || stat -f %A .next/static)
    echo "  .next/static permissions: $perm"
    
    if [ "$perm" -lt 755 ]; then
        echo "  ⚠️  WARNING: Permissions may be too restrictive"
        echo "     Run: chmod -R 755 .next/static"
    fi
fi

echo ""

# Test server locally
echo "🌐 Testing local server response:"
echo ""

if command -v curl &> /dev/null; then
    port="${PORT:-3000}"
    
    echo "  Testing http://localhost:$port"
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port)
    
    if [ "$response" = "200" ]; then
        echo "  ✅ Server responding (HTTP $response)"
    else
        echo "  ❌ Server not responding correctly (HTTP $response)"
    fi
    
    # Test static file
    if [ -d ".next/static/css" ]; then
        css_file=$(find .next/static/css -name "*.css" -type f | head -n 1)
        if [ -n "$css_file" ]; then
            css_path=${css_file#./}
            echo ""
            echo "  Testing static file: /$css_path"
            static_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port/$css_path)
            
            if [ "$static_response" = "200" ]; then
                echo "  ✅ Static file serving works (HTTP $static_response)"
            else
                echo "  ❌ Static file not found (HTTP $static_response)"
            fi
        fi
    fi
else
    echo "  ⚠️  curl not available, skipping server test"
fi

echo ""
echo "=========================================="
echo "  DIAGNOSTIC SUMMARY"
echo "=========================================="
echo ""

# Final recommendations
if [ ! -d ".next/static" ]; then
    echo "❌ CRITICAL: Static files are missing!"
    echo ""
    echo "🔧 TO FIX:"
    echo "   1. Upload manual-deploy.zip"
    echo "   2. Extract: unzip manual-deploy.zip -d ~/domains/rentingexplained.com/public_html/current/"
    echo "   3. Restart: pm2 restart rentingexplained"
elif [ "$pm2_status" -eq 0 ]; then
    echo "⚠️  PM2 not running"
    echo ""
    echo "🔧 TO FIX:"
    echo "   cd $APP_PATH"
    echo "   pm2 start ecosystem.config.js --env production"
else
    echo "✅ Everything looks good!"
    echo ""
    echo "If you're still seeing 404 errors:"
    echo "   1. Hard refresh browser (Ctrl+Shift+R)"
    echo "   2. Check PM2 logs: pm2 logs rentingexplained"
    echo "   3. Restart PM2: pm2 restart rentingexplained"
fi

echo ""
