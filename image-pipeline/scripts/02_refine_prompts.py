from __future__ import annotations

import argparse
from pathlib import Path
import sys

sys.path.append(str(Path(__file__).resolve().parents[1]))
from typing import Dict, List

from lib.io_utils import apply_env_overrides, load_config, read_json, write_csv, write_json
from lib.prompt_engine import build_prompt, compute_prompt_hash


def load_slots(slots_dir: Path) -> List[Dict]:
    slots = []
    for meta_path in sorted(slots_dir.glob("*/meta.json")):
        slot = read_json(meta_path)
        if slot:
            slot["_meta_path"] = meta_path
            slots.append(slot)
    return slots


def priority_key(slot: Dict) -> tuple:
    is_home = slot.get("page_path", "/") in {"/index.html", "/index.htm", "/index.md", "/"}
    return (
        0 if slot.get("slot_key") == "hero" else 1,
        0 if is_home else 1,
        slot.get("priority_level", 2),
        slot.get("page_path", ""),
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--priority-only", action="store_true")
    parser.add_argument("--max-slots", type=int, default=None)
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[2]
    pipeline_root = repo_root / "image-pipeline"
    config = apply_env_overrides(load_config(pipeline_root / "config.yaml"))

    slots = load_slots(pipeline_root / "prompts" / "slots")
    slots = sorted(slots, key=priority_key)

    max_slots = args.max_slots
    if args.priority_only and not max_slots:
        max_slots = config.get("pipeline", {}).get("top_n", 20)

    if max_slots:
        slots = slots[: max_slots]

    index_rows = []
    for slot in slots:
        prompt, injected = build_prompt(slot, config)
        prompt_hash = compute_prompt_hash(prompt)
        slot["prompt"] = prompt
        slot["prompt_hash"] = prompt_hash
        if injected:
            slot["injected_constraints"] = injected
        meta_path = Path(slot["_meta_path"])
        slot.pop("_meta_path", None)
        write_json(meta_path, slot)
        index_rows.append({
            "slot_id": slot["slot_id"],
            "page_path": slot["page_path"],
            "slot_key": slot["slot_key"],
            "anchor_text": slot["anchor_text"],
            "prompt_hash": prompt_hash,
            "status": "PROMPT_READY",
        })

    write_json(pipeline_root / "prompts" / "index.json", {"slots": index_rows})
    write_csv(
        pipeline_root / "prompts" / "index.csv",
        index_rows,
        ["slot_id", "page_path", "slot_key", "anchor_text", "prompt_hash", "status"],
    )

    print(f"slots refined: {len(slots)}")


if __name__ == "__main__":
    main()
