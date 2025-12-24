#!/bin/bash

# Hostinger Deployment Script
# This script automates the deployment process to Hostinger

echo "?? Starting Hostinger deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Are you in the project root?${NC}"
    exit 1
fi

# Step 1: Install dependencies
echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}? Dependencies installed${NC}"

# Step 2: Build the project
echo -e "${YELLOW}Step 2: Building Next.js application...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Please fix errors and try again.${NC}"
    exit 1
fi
echo -e "${GREEN}? Build successful${NC}"

# Step 3: Create .htaccess from template
echo -e "${YELLOW}Step 3: Setting up .htaccess...${NC}"
if [ -f ".htaccess-hostinger" ]; then
    cp .htaccess-hostinger .htaccess
    echo -e "${GREEN}? .htaccess created${NC}"
else
    echo -e "${YELLOW}? .htaccess-hostinger not found, skipping...${NC}"
fi

# Step 4: Create production env file
echo -e "${YELLOW}Step 4: Checking environment configuration...${NC}"
if [ ! -f ".env.production" ]; then
    if [ -f ".env.production.example" ]; then
        echo -e "${YELLOW}? .env.production not found. Creating from example...${NC}"
        cp .env.production.example .env.production
        echo -e "${YELLOW}? Please edit .env.production with your actual values${NC}"
    else
        echo -e "${YELLOW}? No .env.production file found${NC}"
    fi
else
    echo -e "${GREEN}? .env.production exists${NC}"
fi

# Step 5: Show deployment checklist
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}Build complete! Ready for Hostinger deployment${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "${YELLOW}Next steps:${NC}"
echo "1. Upload files to Hostinger via FTP/SFTP or Git"
echo "2. SSH into your server"
echo "3. Run: npm install --production"
echo "4. Configure Node.js app in Hostinger hPanel"
echo "5. Set startup file to: server.js"
echo "6. Add environment variables in hPanel"
echo "7. Start the application"
echo ""
echo -e "${YELLOW}Files to upload:${NC}"
echo "  ? All source files (app/, components/, lib/, etc.)"
echo "  ? Configuration files (package.json, next.config.js, etc.)"
echo "  ? server.js"
echo "  ? .htaccess (or .htaccess-hostinger)"
echo "  ? public/ folder"
echo ""
echo -e "${YELLOW}Do NOT upload:${NC}"
echo "  ? node_modules/ (install on server)"
echo "  ? .next/ (build on server)"
echo "  ? .git/ (unless using Git deployment)"
echo "  ? .env files (set in hPanel)"
echo ""
echo -e "${GREEN}For detailed instructions, see HOSTINGER-DEPLOY.md${NC}"
echo ""
