from __future__ import annotations

import csv
import hashlib
import json
import os
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional

import yaml


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


def write_text(path: Path, content: str) -> None:
    ensure_dir(path.parent)
    path.write_text(content, encoding="utf-8")


def write_json(path: Path, data: Any) -> None:
    ensure_dir(path.parent)
    path.write_text(json.dumps(data, indent=2, sort_keys=True), encoding="utf-8")


def write_csv(path: Path, rows: Iterable[Dict[str, Any]], fieldnames: List[str]) -> None:
    ensure_dir(path.parent)
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def load_config(config_path: Path) -> Dict[str, Any]:
    if not config_path.exists():
        return {}
    data = yaml.safe_load(config_path.read_text(encoding="utf-8"))
    return data or {}


def apply_env_overrides(config: Dict[str, Any]) -> Dict[str, Any]:
    model = os.getenv("OPENAI_IMAGE_MODEL")
    quality = os.getenv("OPENAI_IMAGE_QUALITY")
    size = os.getenv("OPENAI_IMAGE_SIZE")
    if model:
        config["default_model"] = model
    if quality:
        config["default_quality"] = quality
    if size:
        config["default_size"] = size
    return config


def normalize_path(path: Path, root: Path) -> str:
    return "/" + str(path.relative_to(root)).replace("\\", "/")


def slugify(value: str) -> str:
    cleaned = []
    for ch in value.lower().strip():
        if ch.isalnum():
            cleaned.append(ch)
        elif ch in {" ", "-", "_"}:
            cleaned.append("-")
    slug = "".join(cleaned)
    slug = "-".join([part for part in slug.split("-") if part])
    return slug or "item"


def stable_hash(value: str, length: int = 12) -> str:
    return hashlib.sha1(value.encode("utf-8")).hexdigest()[:length]


def hash_prompt(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def list_files(root: Path, extensions: Iterable[str], exclude_dirs: Iterable[str]) -> List[Path]:
    ext_set = {ext.lower() for ext in extensions}
    exclude_set = {e.strip("/") for e in exclude_dirs}
    results: List[Path] = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in exclude_set]
        for name in filenames:
            path = Path(dirpath) / name
            if path.suffix.lower() in ext_set:
                results.append(path)
    return sorted(results)


def read_json(path: Path) -> Any:
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))
