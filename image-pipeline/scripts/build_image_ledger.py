from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path
import sys
import re

sys.path.append(str(Path(__file__).resolve().parents[1]))
from typing import Dict, List

from lib.io_utils import list_files, load_config, read_json, write_csv, write_json, write_text


def scan_html_for_slots(repo_root: Path, config: Dict) -> set:
    html_files = list_files(repo_root, [".html", ".htm"], config.get("exclude_dirs", []))
    placed = set()
    for path in html_files:
        text = path.read_text(encoding="utf-8", errors="ignore")
        for match in re.findall(r"data-slot-id=\"([a-f0-9]+)\"", text):
            placed.add(match)
    return placed


def manifest_lookup(manifest: Dict) -> Dict[str, Dict]:
    items = manifest.get("images", [])
    return {item.get("slot_id"): item for item in items}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--scan-html", action="store_true")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[2]
    pipeline_root = repo_root / "image-pipeline"
    config = load_config(pipeline_root / "config.yaml")

    slots = []
    for meta_path in sorted((pipeline_root / "prompts" / "slots").glob("*/meta.json")):
        slot = read_json(meta_path)
        if slot:
            slots.append(slot)

    manifest = read_json(pipeline_root / "generated" / "manifest.json") or {"images": []}
    manifest_index = manifest_lookup(manifest)

    locked = read_json(pipeline_root / "ledger" / "locked_slots.json") or {"locked": []}
    locked_ids = set(locked.get("locked", []))

    placed = set()
    if args.scan_html:
        placed = scan_html_for_slots(repo_root, config)

    entries = []
    summary = {}
    for slot in slots:
        slot_id = slot.get("slot_id")
        entry = {
            "slot_id": slot_id,
            "page_path": slot.get("page_path"),
            "slot_key": slot.get("slot_key"),
            "prompt_hash": slot.get("prompt_hash"),
            "last_updated": datetime.utcnow().isoformat() + "Z",
        }
        if slot_id in locked_ids:
            entry["status"] = "LOCKED"
        elif slot_id in placed:
            entry["status"] = "PLACED"
        else:
            manifest_item = manifest_index.get(slot_id)
            if manifest_item:
                if manifest_item.get("status") == "failed":
                    entry["status"] = "FAILED_LAST_RUN"
                elif manifest_item.get("prompt_hash") and manifest_item.get("prompt_hash") != slot.get("prompt_hash"):
                    entry["status"] = "STALE_PROMPT_CHANGED"
                elif manifest_item.get("status") in {"success", "existing_valid"}:
                    entry["status"] = "GENERATED_READY_TO_PLACE"
                else:
                    entry["status"] = "NEEDS_GENERATION"
            else:
                entry["status"] = "NEEDS_GENERATION"
        entries.append(entry)
        summary[entry["status"]] = summary.get(entry["status"], 0) + 1

    write_json(pipeline_root / "ledger" / "ledger.json", {"entries": entries})
    write_csv(
        pipeline_root / "ledger" / "ledger.csv",
        entries,
        ["slot_id", "status", "page_path", "slot_key", "prompt_hash", "last_updated"],
    )
    write_json(pipeline_root / "ledger" / "summary.json", {"totals": summary})

    lines = ["# Image Ledger", "", "## Summary"]
    for status, count in sorted(summary.items()):
        lines.append(f"- {status}: {count}")
    write_text(pipeline_root / "ledger" / "LEDGER.md", "\n".join(lines) + "\n")

    print(f"ledger entries: {len(entries)}")


if __name__ == "__main__":
    main()
