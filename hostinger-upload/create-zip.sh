#!/bin/bash
# ========================================================================
#  Create ZIP file for Hostinger Easy Deploy
# ========================================================================

echo "========================================================================"
echo "  Creating ZIP file for Hostinger Easy Deploy"
echo "========================================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "[ERROR] package.json not found!"
    echo "Please run this script from the hostinger-upload directory"
    exit 1
fi

echo "[Step 1/2] Creating rentingexplained.zip..."
echo ""

# Create ZIP file in parent directory
zip -r ../rentingexplained.zip . -x "*.git*" -x "*.DS_Store" -x "create-zip.*"

if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to create ZIP file"
    exit 1
fi

echo "[OK] ZIP file created successfully!"
echo ""

# Get file size
filesize=$(ls -lh ../rentingexplained.zip | awk '{print $5}')

echo "[Step 2/2] ZIP file details:"
echo "  Location: $(pwd)/../rentingexplained.zip"
echo "  Size: $filesize"
echo ""

echo "========================================================================"
echo "  ZIP FILE READY FOR UPLOAD!"
echo "========================================================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Find the ZIP file here:"
echo "   $(pwd)/../rentingexplained.zip"
echo ""
echo "2. Log in to Hostinger hPanel:"
echo "   https://hpanel.hostinger.com"
echo ""
echo "3. Go to: Files ? File Manager"
echo ""
echo "4. Navigate to: domains/yourdomain.com/"
echo ""
echo "5. Upload the ZIP file"
echo ""
echo "6. Right-click ZIP ? Extract Here"
echo ""
echo "7. Configure Node.js app:"
echo "   - Advanced ? Node.js ? Create Application"
echo "   - Startup file: server.js"
echo "   - Node version: 18.x"
echo ""
echo "8. Start the application"
echo ""
echo "For detailed instructions, see EASY-DEPLOY-GUIDE.txt"
echo ""
