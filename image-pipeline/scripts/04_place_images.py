from __future__ import annotations

import argparse
import re
import shutil
from pathlib import Path, PureWindowsPath
import sys

sys.path.append(str(Path(__file__).resolve().parents[1]))
from typing import Dict, List

from lib.io_utils import apply_env_overrides, list_files, load_config, read_json, write_json, write_text


def find_nth_heading_html(text: str, tag: str, index: int) -> re.Match | None:
    pattern = re.compile(rf"(<{tag}[^>]*>.*?</{tag}>)", re.IGNORECASE | re.DOTALL)
    matches = list(pattern.finditer(text))
    if index < len(matches):
        return matches[index]
    return None


def find_nth_heading_markdown(text: str, level: int, index: int) -> re.Match | None:
    pattern = re.compile(rf"^(#{{{level}}})\s+(.+)$", re.MULTILINE)
    matches = list(pattern.finditer(text))
    if index < len(matches):
        return matches[index]
    return None


def find_nth_heading_any_html(text: str, index: int) -> re.Match | None:
    pattern = re.compile(r"(<h[1-3][^>]*>.*?</h[1-3]>)", re.IGNORECASE | re.DOTALL)
    matches = list(pattern.finditer(text))
    if index < len(matches):
        return matches[index]
    return None


def find_nth_heading_any_markdown(text: str, index: int) -> re.Match | None:
    pattern = re.compile(r"^(#{1,3})\s+(.+)$", re.MULTILINE)
    matches = list(pattern.finditer(text))
    if index < len(matches):
        return matches[index]
    return None


def filename_from_path(path_str: str) -> str:
    if "\\" in path_str or ":" in path_str:
        return PureWindowsPath(path_str).name
    return Path(path_str).name


def build_picture_tag(slot_id: str, src_webp: str, src_png: str, width: int, height: int, eager: bool) -> str:
    loading = "eager" if eager else "lazy"
    decoding = "auto" if eager else "async"
    fetchpriority = "fetchpriority=\"high\"" if eager else ""
    sizes = "(min-width: 960px) 960px, 100vw"
    return (
        f"<picture data-slot-id=\"{slot_id}\">"
        f"<source type=\"image/webp\" srcset=\"{src_webp}\" sizes=\"{sizes}\" />"
        f"<img src=\"{src_png}\" width=\"{width}\" height=\"{height}\" loading=\"{loading}\" decoding=\"{decoding}\" {fetchpriority} />"
        f"</picture>"
    )


def select_dest_dir(repo_root: Path, candidates: List[str]) -> Path:
    for candidate in candidates:
        path = repo_root / candidate
        if path.exists():
            return path
    return repo_root / candidates[0]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--debug", action="store_true")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[2]
    pipeline_root = repo_root / "image-pipeline"
    config = apply_env_overrides(load_config(pipeline_root / "config.yaml"))
    ad_patterns = [pat.lower() for pat in config.get("ad_marker_patterns", [])]

    manifest = read_json(pipeline_root / "generated" / "manifest.json") or {"images": []}
    slots_dir = pipeline_root / "prompts" / "slots"

    html_files = list_files(
        repo_root,
        [".html", ".htm", ".mdx", ".md", ".jsx", ".tsx", ".js", ".ts"],
        config.get("exclude_dirs", []),
    )

    placements = []
    debug_counts = {
        "skipped_status": 0,
        "missing_meta": 0,
        "missing_generated": 0,
        "missing_target": 0,
        "ad_filtered": 0,
        "no_match": 0,
        "missing_sources": 0,
    }
    count = 0
    for entry in manifest.get("images", []):
        if entry.get("status") not in {"success", "existing_valid"}:
            debug_counts["skipped_status"] += 1
            continue
        slot_id = entry.get("slot_id")
        meta_path = slots_dir / slot_id / "meta.json"
        generated_meta_path = pipeline_root / "generated" / "images" / "slots" / slot_id / "meta.generated.json"
        slot_dir = generated_meta_path.parent
        if not meta_path.exists() or not generated_meta_path.exists():
            if not meta_path.exists():
                debug_counts["missing_meta"] += 1
            if not generated_meta_path.exists():
                debug_counts["missing_generated"] += 1
            continue
        slot_meta = read_json(meta_path)
        gen_meta = read_json(generated_meta_path)
        page_path = slot_meta.get("page_path")
        target_path = repo_root / page_path.lstrip("/")
        if target_path not in html_files:
            debug_counts["missing_target"] += 1
            continue

        anchor_selector = slot_meta.get("anchor_selector", "h2")
        anchor_index = slot_meta.get("anchor_index", 0)
        slot_key = slot_meta.get("slot_key")
        eager = slot_key == "hero"
        anchor_text = (slot_meta.get("anchor_text") or "").lower()
        if any(pat in anchor_text for pat in ad_patterns):
            debug_counts["ad_filtered"] += 1
            continue

        text = target_path.read_text(encoding="utf-8", errors="ignore")
        match = None
        ext = target_path.suffix.lower()
        if ext in {".html", ".htm", ".jsx", ".tsx", ".js", ".ts", ".mdx"}:
            match = find_nth_heading_html(text, anchor_selector, anchor_index)
        if not match and ext in {".md", ".mdx"}:
            level = int(anchor_selector.replace("h", "")) if anchor_selector.startswith("h") else 2
            match = find_nth_heading_markdown(text, level, anchor_index)
        if not match and ext in {".html", ".htm", ".jsx", ".tsx", ".js", ".ts", ".mdx"}:
            match = find_nth_heading_any_html(text, anchor_index)
        if not match and ext in {".md", ".mdx"}:
            match = find_nth_heading_any_markdown(text, anchor_index)
        if not match:
            debug_counts["no_match"] += 1
            continue

        dest_dir = select_dest_dir(repo_root, config.get("images_dest_candidates", ["public/images"]))
        if args.apply:
            dest_dir.mkdir(parents=True, exist_ok=True)

        outputs = gen_meta.get("outputs", {})
        src_webp = outputs.get("webp")
        src_png = outputs.get("png") or src_webp
        if not src_webp or not src_png:
            continue

        src_webp_path = Path(src_webp)
        src_png_path = Path(src_png)
        if not src_webp_path.exists():
            src_webp_path = slot_dir / filename_from_path(src_webp)
        if not src_png_path.exists():
            src_png_path = slot_dir / filename_from_path(src_png)
        if not src_webp_path.exists() or not src_png_path.exists():
            debug_counts["missing_sources"] += 1
            continue
        dest_webp = dest_dir / src_webp_path.name
        dest_png = dest_dir / src_png_path.name

        if args.apply:
            shutil.copy2(src_webp_path, dest_webp)
            shutil.copy2(src_png_path, dest_png)

        # For Next.js, public/images/ should be referenced as /images/
        public_prefix_path = dest_dir.relative_to(repo_root).as_posix().strip("/")
        if public_prefix_path.startswith("public/"):
            public_prefix = "/" + public_prefix_path.replace("public/", "", 1)
        else:
            public_prefix = "/" + public_prefix_path
        src_webp_url = f"{public_prefix}/{dest_webp.name}"
        src_png_url = f"{public_prefix}/{dest_png.name}"

        picture = build_picture_tag(
            slot_id=slot_id,
            src_webp=src_webp_url,
            src_png=src_png_url,
            width=gen_meta.get("width", 1024),
            height=gen_meta.get("height", 768),
            eager=eager,
        )

        planned_text = text[: match.end()] + "\n" + picture + text[match.end() :]

        placements.append({
            "slot_id": slot_id,
            "page_path": page_path,
            "html_path": str(target_path),
            "apply": args.apply,
            "slot_key": slot_key,
            "picture": picture,
        })

        if args.apply:
            backup_path = target_path.with_suffix(target_path.suffix + ".bak")
            if not backup_path.exists():
                backup_path.write_text(text, encoding="utf-8")
            target_path.write_text(planned_text, encoding="utf-8")

        count += 1
        if args.limit and count >= args.limit:
            break

    plan_lines = ["# Placement Plan", "", f"Placements: {len(placements)}", ""]
    for item in placements:
        plan_lines.append(f"- {item['slot_id']} -> {item['page_path']}")

    write_text(pipeline_root / "generated" / "PLACEMENT_PLAN.md", "\n".join(plan_lines) + "\n")
    write_json(pipeline_root / "generated" / "placement-report.json", {"placements": placements})

    print(f"placements planned: {len(placements)}")
    if args.debug:
        print(debug_counts)


if __name__ == "__main__":
    main()
