from __future__ import annotations

from pathlib import Path
import sys

sys.path.append(str(Path(__file__).resolve().parents[1]))

from lib.io_utils import read_json, write_text


def main() -> None:
    repo_root = Path(__file__).resolve().parents[2]
    pipeline_root = repo_root / "image-pipeline"

    report = ["# Audit Report", ""]
    placement = read_json(pipeline_root / "generated" / "placement-report.json") or {"placements": []}

    missing_dimensions = 0
    hero_missing_priority = 0
    for item in placement.get("placements", []):
        picture_html = item.get("picture", "")
        if "width=" not in picture_html or "height=" not in picture_html:
            missing_dimensions += 1
        if item.get("slot_key") == "hero" and "fetchpriority=\"high\"" not in picture_html:
            hero_missing_priority += 1

    report.append("## CLS/LCP checks")
    report.append(f"- Placements missing width/height: {missing_dimensions}")
    report.append(f"- Hero missing fetchpriority: {hero_missing_priority}")

    report.append("")
    report.append("## Prompt safety checks")
    prompts_dir = pipeline_root / "prompts" / "slots"
    flagged = 0
    for meta_path in prompts_dir.glob("*/meta.json"):
        data = read_json(meta_path)
        prompt = (data or {}).get("prompt", "").lower()
        if "logo" in prompt or "text" in prompt or "screen" in prompt:
            flagged += 1
    report.append(f"- Prompts flagged for potential text/logo/screen content: {flagged}")

    write_text(pipeline_root / "generated" / "AUDIT_REPORT.md", "\n".join(report) + "\n")
    print("audit complete")


if __name__ == "__main__":
    main()
