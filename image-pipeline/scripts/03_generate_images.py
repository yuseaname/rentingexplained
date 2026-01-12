from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

sys.path.append(str(Path(__file__).resolve().parents[1]))
from typing import Dict, List, Tuple

from lib.io_utils import apply_env_overrides, load_config, read_json, slugify, write_json
from lib.openai_images import ALLOWED_SIZES, generate_image
from lib.image_postprocess import write_image_files


def load_slots(slots_dir: Path) -> List[Dict]:
    slots = []
    for meta_path in sorted(slots_dir.glob("*/meta.json")):
        slot = read_json(meta_path)
        if slot:
            slot["_meta_path"] = meta_path
            slots.append(slot)
    return slots


def priority_key(slot: Dict) -> tuple:
    is_home = slot.get("page_path", "") in {"/index.html", "/index.htm", "/index.md", "/"}
    return (
        0 if slot.get("slot_key") == "hero" else 1,
        0 if is_home else 1,
        slot.get("priority_level", 2),
        slot.get("page_path", ""),
    )


def map_size(requested: str, model: str) -> Tuple[str, str]:
    if requested == "auto":
        return "1024x1024", "1024x1024"
    if model.startswith("dall-e-"):
        if requested in {"1792x1024", "1024x1792", "1024x1024"}:
            return requested, requested
        if requested in {"1536x1024", "1600x900"}:
            return "1792x1024", "1536x1024"
        if requested == "1024x1536":
            return "1024x1792", "1024x1536"
        return "1792x1024", requested
    if requested in ALLOWED_SIZES:
        return requested, requested
    if requested == "1600x900":
        return "1536x1024", requested
    return "1536x1024", requested


def manifest_lookup(manifest: Dict) -> Dict[str, Dict]:
    items = manifest.get("images", [])
    return {item.get("slot_id"): item for item in items}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--report-priority", action="store_true")
    parser.add_argument("--max-slots", type=int, default=None)
    parser.add_argument("--budget-guard", type=int, default=None)
    parser.add_argument("--debug-api", action="store_true")
    parser.add_argument("--priority-only", action="store_true")
    parser.add_argument("--model", type=str, default=None)
    parser.add_argument("--quality", type=str, default=None)
    parser.add_argument("--size", type=str, default=None)
    parser.add_argument("--force", action="store_true")
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

    if args.report_priority:
        for slot in slots[:20]:
            print(f"{slot['slot_id']} {slot['page_path']} {slot['slot_key']}")
        return

    locked = read_json(pipeline_root / "ledger" / "locked_slots.json") or {"locked": []}
    locked_ids = set(locked.get("locked", []))

    manifest_path = pipeline_root / "generated" / "manifest.json"
    manifest = read_json(manifest_path) or {"images": []}
    manifest_index = manifest_lookup(manifest)

    model = args.model or config.get("default_model", "gpt-image-1")
    quality = args.quality or config.get("default_quality", "medium")
    requested_size = args.size or config.get("default_size", "1536x1024")
    if model.startswith("dall-e-"):
        if quality in {"low", "medium", "auto"}:
            quality = "standard"
        elif quality == "high":
            quality = "hd"
    generated_size, target_size = map_size(requested_size, model)

    output_entries = []
    budget = args.budget_guard

    for slot in slots:
        slot_id = slot["slot_id"]
        prompt = slot.get("prompt")
        prompt_hash = slot.get("prompt_hash")
        if not prompt:
            output_entries.append({"slot_id": slot_id, "status": "failed", "reason": "missing_prompt"})
            continue
        if slot_id in locked_ids and not args.force:
            output_entries.append({"slot_id": slot_id, "status": "skipped_locked"})
            continue

        existing = manifest_index.get(slot_id)
        slot_dir = pipeline_root / "generated" / "images" / "slots" / slot_id
        meta_generated_path = slot_dir / "meta.generated.json"
        existing_meta = read_json(meta_generated_path) if meta_generated_path.exists() else None
        if (
            existing
            and existing.get("prompt_hash") == prompt_hash
            and existing_meta
            and existing_meta.get("model") == model
            and existing_meta.get("quality") == quality
            and existing_meta.get("size") == target_size
            and not args.force
        ):
            output_entries.append({"slot_id": slot_id, "status": "existing_valid", "prompt_hash": prompt_hash})
            continue
        if existing and existing.get("prompt_hash") and existing.get("prompt_hash") != prompt_hash and not args.force:
            output_entries.append({"slot_id": slot_id, "status": "stale", "prompt_hash": prompt_hash})
            continue

        if budget is not None:
            if budget <= 0:
                output_entries.append({"slot_id": slot_id, "status": "skipped_not_selected"})
                continue
            budget -= 1

        if args.dry_run:
            output_entries.append({"slot_id": slot_id, "status": "skipped_not_selected"})
            continue

        try:
            image_bytes = generate_image(
                prompt=prompt,
                model=model,
                size=generated_size,
                quality=quality,
                log_path=pipeline_root / "generated" / "logs.jsonl",
            )
        except Exception as exc:
            output_entries.append({
                "slot_id": slot_id,
                "status": "failed",
                "prompt_hash": prompt_hash,
                "reason": str(exc),
            })
            continue

        page_slug = slugify(slot.get("page_path", "page"))
        site_slug = slugify(config.get("brand", {}).get("site_slug", "site"))
        meta = write_image_files(
            image_bytes,
            slot_dir,
            site_slug,
            page_slug,
            slot.get("slot_key", "inline"),
            slot_id,
            target_size,
            config.get("output_formats", ["webp", "png"]),
        )
        meta["prompt_hash"] = prompt_hash
        meta["model"] = model
        meta["quality"] = quality
        meta["size"] = target_size
        write_json(meta_generated_path, meta)

        output_entries.append({
            "slot_id": slot_id,
            "status": "success",
            "prompt_hash": prompt_hash,
            "model": model,
            "quality": quality,
            "size": target_size,
        })

    manifest["images"] = output_entries
    write_json(manifest_path, manifest)

    print(f"slots processed: {len(output_entries)}")


if __name__ == "__main__":
    main()
