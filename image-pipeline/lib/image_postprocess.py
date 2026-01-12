from __future__ import annotations

from datetime import datetime
from io import BytesIO
from pathlib import Path
from typing import Dict, List, Tuple

from PIL import Image

from .io_utils import ensure_dir


def parse_size(size_str: str) -> Tuple[int, int]:
    parts = size_str.lower().split("x")
    if len(parts) != 2:
        raise ValueError(f"Invalid size '{size_str}'.")
    return int(parts[0]), int(parts[1])


def crop_to_aspect(image: Image.Image, target_ratio: float) -> Image.Image:
    width, height = image.size
    current_ratio = width / height
    if abs(current_ratio - target_ratio) < 0.001:
        return image
    if current_ratio > target_ratio:
        new_width = int(height * target_ratio)
        left = (width - new_width) // 2
        return image.crop((left, 0, left + new_width, height))
    new_height = int(width / target_ratio)
    top = (height - new_height) // 2
    return image.crop((0, top, width, top + new_height))


def save_outputs(
    image: Image.Image,
    output_dir: Path,
    site_slug: str,
    page_slug: str,
    slot_key: str,
    slot_id: str,
    target_size: str,
    formats: List[str],
) -> Dict:
    ensure_dir(output_dir)

    target_w, target_h = parse_size(target_size)
    image = crop_to_aspect(image, target_w / target_h)
    image = image.resize((target_w, target_h), Image.LANCZOS)
    if image.mode not in {"RGB", "RGBA"}:
        image = image.convert("RGB")

    base_name = f"{site_slug}-{page_slug}-{slot_key}-{slot_id}"
    outputs = {}
    for fmt in formats:
        out_path = output_dir / f"{base_name}.{fmt}"
        if fmt == "png":
            image.save(out_path, format="PNG")
        elif fmt == "webp":
            image.save(out_path, format="WEBP", quality=90, method=6)
        else:
            image.save(out_path)
        outputs[fmt] = str(out_path)

    return {
        "slot_id": slot_id,
        "outputs": outputs,
        "width": target_w,
        "height": target_h,
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }


def write_image_files(
    image_bytes: bytes,
    output_dir: Path,
    site_slug: str,
    page_slug: str,
    slot_key: str,
    slot_id: str,
    target_size: str,
    formats: List[str],
) -> Dict:
    ensure_dir(output_dir)
    image = Image.open(BytesIO(image_bytes))
    image.load()
    return save_outputs(
        image,
        output_dir,
        site_slug,
        page_slug,
        slot_key,
        slot_id,
        target_size,
        formats,
    )
