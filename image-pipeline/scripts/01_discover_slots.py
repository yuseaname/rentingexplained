from __future__ import annotations

import argparse
from pathlib import Path
import sys

sys.path.append(str(Path(__file__).resolve().parents[1]))
from typing import Dict, List

from lib.io_utils import apply_env_overrides, list_files, load_config, normalize_path, write_csv, write_json, write_text
import shutil
from lib.slot_discovery import detect_site_types, discover_slots


def build_repo_profile(repo_root: Path, files: List[Path], config: Dict) -> str:
    site_types = detect_site_types(files)
    content_roots = []
    for root in config.get("content_roots", []):
        if (repo_root / root).exists():
            content_roots.append(root)
    build_dirs = [d for d in config.get("build_dirs", []) if (repo_root / d).exists()]
    primary_pages = []
    for path in files:
        if path.name.startswith("index."):
            primary_pages.append(normalize_path(path, repo_root))
    profile_lines = [
        "# Repo Profile",
        "",
        f"Pages scanned: {len(files)}",
        f"Site types: {', '.join(site_types) if site_types else 'Unknown'}",
        f"Content roots: {', '.join(content_roots) if content_roots else 'None detected'}",
        f"Build dirs: {', '.join(build_dirs) if build_dirs else 'None detected'}",
        "",
        "## Primary pages",
    ]
    for page in primary_pages[:20]:
        profile_lines.append(f"- {page}")
    if not primary_pages:
        profile_lines.append("- None detected")
    return "\n".join(profile_lines) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--max-pages", type=int, default=None)
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[2]
    pipeline_root = repo_root / "image-pipeline"
    config = load_config(pipeline_root / "config.yaml")
    config = apply_env_overrides(config)

    extensions = [".html", ".htm", ".md", ".markdown", ".mdx", ".jsx", ".tsx", ".js", ".ts"]
    roots = []
    for root in config.get("content_roots", []):
        root_path = repo_root / root
        if root_path.exists():
            roots.append(root_path)
    if roots:
        files = []
        for root_path in roots:
            files.extend(list_files(root_path, extensions, config.get("exclude_dirs", [])))
    else:
        files = list_files(repo_root, extensions, config.get("exclude_dirs", []))
    exclude_patterns = config.get("exclude_page_path_patterns", [])
    if exclude_patterns:
        filtered = []
        for path in files:
            page_path = normalize_path(path, repo_root)
            if any(pattern in page_path for pattern in exclude_patterns):
                continue
            filtered.append(path)
        files = filtered
    if args.max_pages:
        files = files[: args.max_pages]

    profile = build_repo_profile(repo_root, files, config)
    write_text(pipeline_root / "REPO_PROFILE.md", profile)

    slots = discover_slots(repo_root, files, config.get("ad_marker_patterns", []))
    slots = sorted(slots, key=lambda s: (s["page_path"], s["priority_level"], s["slot_key"]))

    slots_index = []
    slot_ids = set()
    for slot in slots:
        slot_id = slot["slot_id"]
        slot_ids.add(slot_id)
        slot_dir = pipeline_root / "prompts" / "slots" / slot_id
        write_json(slot_dir / "meta.json", slot)
        slots_index.append({
            "slot_id": slot_id,
            "page_path": slot["page_path"],
            "slot_key": slot["slot_key"],
            "anchor_text": slot["anchor_text"],
            "prompt_hash": slot.get("prompt_hash", ""),
            "status": "DISCOVERED",
        })

    write_json(pipeline_root / "prompts" / "index.json", {"slots": slots_index})
    write_csv(
        pipeline_root / "prompts" / "index.csv",
        slots_index,
        ["slot_id", "page_path", "slot_key", "anchor_text", "prompt_hash", "status"],
    )

    slots_root = pipeline_root / "prompts" / "slots"
    if slots_root.exists():
        for child in slots_root.iterdir():
            if child.is_dir() and child.name not in slot_ids:
                shutil.rmtree(child)

    print(f"pages scanned: {len(files)}")
    print(f"slots discovered: {len(slots)}")


if __name__ == "__main__":
    main()
