#!/usr/bin/env python3
"""Quick test to verify OpenAI configuration"""
from pathlib import Path
import os
from dotenv import load_dotenv

# Load .env
repo_root = Path(__file__).parent
load_dotenv(repo_root / ".env")

# Check key
key = os.getenv("OPENAI_API_KEY", "")
if not key:
    print("❌ OPENAI_API_KEY is not set")
    exit(1)
if key.startswith("put_your"):
    print("❌ OPENAI_API_KEY is still the placeholder value")
    exit(1)

# Display config
prefix = key[:7]
suffix = key[-4:]
print(f"✅ OPENAI_API_KEY loaded: {prefix}...{suffix}")
print(f"✅ Model: {os.getenv('OPENAI_IMAGE_MODEL')}")
print(f"✅ Quality: {os.getenv('OPENAI_IMAGE_QUALITY')}")
print(f"✅ Size: {os.getenv('OPENAI_IMAGE_SIZE')}")
print("\nConfiguration looks good! Ready to run 03_generate_images.py")
