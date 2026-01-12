from __future__ import annotations

import base64
import json
import os
import time
from pathlib import Path
from typing import Dict, Optional

import requests
from dotenv import load_dotenv

from .io_utils import ensure_dir, hash_prompt


ALLOWED_QUALITIES = {"low", "medium", "high", "standard", "hd", "auto"}
ALLOWED_SIZES = {"1024x1024", "1536x1024", "1024x1536", "1792x1024", "1024x1792", "auto"}


def validate_model(model: str) -> None:
    if model.startswith("gpt-image-"):
        return
    if model in {"dall-e-2", "dall-e-3"}:
        return
    raise ValueError("Invalid model. Allowed: gpt-image-* or dall-e-2/dall-e-3")


def validate_quality(quality: str) -> None:
    if quality not in ALLOWED_QUALITIES:
        raise ValueError(f"Invalid quality '{quality}'. Allowed: {sorted(ALLOWED_QUALITIES)}")


def validate_size(size: str) -> None:
    if size not in ALLOWED_SIZES:
        raise ValueError(f"Invalid size '{size}'. Allowed: {sorted(ALLOWED_SIZES)}")


def _log_request(log_path: Optional[Path], payload: Dict, prompt: str) -> None:
    if not log_path:
        return
    ensure_dir(log_path.parent)
    entry = {
        "model": payload.get("model"),
        "size": payload.get("size"),
        "quality": payload.get("quality"),
        "prompt_hash": hash_prompt(prompt),
    }
    with log_path.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")


def generate_image(prompt: str, model: str, size: str, quality: str, log_path: Optional[Path] = None) -> bytes:
    validate_model(model)
    validate_size(size)
    validate_quality(quality)

    load_dotenv(Path(__file__).resolve().parents[2] / ".env")
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set in the environment.")

    payload = {
        "model": model,
        "prompt": prompt,
        "size": size,
        "quality": quality,
        "n": 1,
        "response_format": "b64_json",
    }
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    _log_request(log_path, payload, prompt)

    retries = 3
    backoff = 1.5
    url = "https://api.openai.com/v1/images/generations"
    for attempt in range(retries):
        response = requests.post(url, headers=headers, json=payload, timeout=120)
        if response.status_code in {429, 500, 502, 503, 504}:
            time.sleep(backoff)
            backoff *= 2
            continue
        if response.status_code >= 400:
            raise RuntimeError(f"OpenAI API error {response.status_code}: {response.text}")
        data = response.json()
        if "data" not in data or not data["data"]:
            raise RuntimeError("No image data returned from API.")
        b64 = data["data"][0].get("b64_json")
        if not b64:
            raise RuntimeError("Image response missing base64 data.")
        return base64.b64decode(b64)

    raise RuntimeError("OpenAI API failed after retries.")
