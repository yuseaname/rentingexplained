from __future__ import annotations

import re
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, Iterable, List, Tuple

from .io_utils import normalize_path, read_text, stable_hash


@dataclass
class Heading:
    tag: str
    text: str
    index: int


class HeadingParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self._current_tag = None
        self._buffer: List[str] = []
        self.headings: List[Heading] = []
        self._index = 0

    def handle_starttag(self, tag: str, attrs) -> None:
        if tag in {"h1", "h2", "h3"}:
            self._current_tag = tag
            self._buffer = []

    def handle_endtag(self, tag: str) -> None:
        if self._current_tag == tag:
            text = "".join(self._buffer).strip()
            if text:
                self.headings.append(Heading(tag=tag, text=text, index=self._index))
                self._index += 1
            self._current_tag = None
            self._buffer = []

    def handle_data(self, data: str) -> None:
        if self._current_tag:
            self._buffer.append(data)


def detect_site_types(files: Iterable[Path]) -> List[str]:
    types = set()
    for path in files:
        ext = path.suffix.lower()
        if ext in {".html", ".htm"}:
            types.add("HTML")
        elif ext in {".md", ".markdown"}:
            types.add("MD")
        elif ext == ".mdx":
            types.add("MDX")
        elif ext in {".jsx", ".tsx"}:
            types.add("JSX")
        elif ext in {".js", ".ts"}:
            types.add("JS")
    return sorted(types)


def extract_headings(path: Path) -> List[Heading]:
    text = read_text(path)
    ext = path.suffix.lower()
    if ext in {".html", ".htm"}:
        parser = HeadingParser()
        parser.feed(text)
        return parser.headings
    if ext in {".md", ".markdown"}:
        headings = []
        index = 0
        for line in text.splitlines():
            if line.startswith("#"):
                level = len(line.split(" ")[0])
                tag = f"h{min(level, 3)}"
                heading_text = line.lstrip("#").strip()
                if heading_text:
                    headings.append(Heading(tag=tag, text=heading_text, index=index))
                    index += 1
        return headings
    if ext in {".mdx", ".jsx", ".tsx", ".js", ".ts"}:
        headings = []
        index = 0
        for match in re.finditer(r"<h([1-3])[^>]*>(.*?)</h\1>", text, re.IGNORECASE | re.DOTALL):
            heading_text = re.sub(r"<[^>]+>", "", match.group(2)).strip()
            if heading_text:
                tag = f"h{match.group(1)}"
                headings.append(Heading(tag=tag, text=heading_text, index=index))
                index += 1
        return headings
    return []


def compute_risk(text: str, headings: List[Heading], slot_tag: str) -> Tuple[int, List[str]]:
    risk_factors = []
    word_count = len(re.findall(r"\w+", text))
    image_count = len(re.findall(r"<img\b", text, re.IGNORECASE))
    if word_count < 300:
        risk_factors.append("thin_content")
    if image_count > 10:
        risk_factors.append("image_heavy")
    if slot_tag == "h1":
        risk_factors.append("above_fold")
    risk_score = len(risk_factors)
    return risk_score, risk_factors


def build_slot_id(page_path: str, anchor_selector: str, anchor_index: int, insertion_mode: str, slot_key: str) -> str:
    raw = "|".join([page_path.lower(), anchor_selector.lower(), str(anchor_index), insertion_mode, slot_key])
    return stable_hash(raw)


def discover_slots(repo_root: Path, files: Iterable[Path], ad_patterns: List[str] | None = None) -> List[Dict[str, object]]:
    slots: List[Dict[str, object]] = []
    ad_patterns = [p.lower() for p in (ad_patterns or [])]
    for path in files:
        page_path = normalize_path(path, repo_root)
        text = read_text(path)
        headings = extract_headings(path)
        if not headings:
            continue
        for idx, heading in enumerate(headings):
            slot_key = "hero" if idx == 0 else f"inline-{idx}"
            insertion_mode = "after"
            anchor_selector = heading.tag
            anchor_index = heading.index
            slot_id = build_slot_id(page_path, anchor_selector, anchor_index, insertion_mode, slot_key)
            risk_score, risk_factors = compute_risk(text, headings, heading.tag)
            ad_proximity_risk = any(pat in heading.text.lower() for pat in ad_patterns)
            slots.append({
                "slot_id": slot_id,
                "page_path": page_path,
                "anchor_text": heading.text,
                "anchor_selector": anchor_selector,
                "anchor_index": anchor_index,
                "insertion_mode": insertion_mode,
                "slot_key": slot_key,
                "priority_level": 1 if slot_key == "hero" else 2,
                "risk_score": risk_score,
                "risk_factors": risk_factors,
                "ad_proximity_risk": ad_proximity_risk,
            })
    return slots
