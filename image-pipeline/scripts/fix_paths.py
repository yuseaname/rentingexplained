#!/usr/bin/env python3
"""Remove old picture tags with /public/images/ paths."""

import re
from pathlib import Path

repo_root = Path(__file__).resolve().parents[2]
app_dir = repo_root / "app"

# Pattern to match old picture tags with /public/images/
old_pattern = re.compile(
    r'<picture data-slot-id="[^"]+"><source[^>]+srcset="/public/images/[^"]+\.webp"[^>]*><img src="/public/images/[^>]+></picture>\n',
    re.MULTILINE
)

cleaned_count = 0
for tsx_file in app_dir.rglob("*.tsx"):
    content = tsx_file.read_text(encoding="utf-8")
    if "/public/images/" in content:
        new_content = old_pattern.sub("", content)
        if new_content != content:
            tsx_file.write_text(new_content, encoding="utf-8")
            cleaned_count += 1
            print(f"Cleaned: {tsx_file.relative_to(repo_root)}")

print(f"\nTotal files cleaned: {cleaned_count}")
