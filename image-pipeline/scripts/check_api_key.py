from __future__ import annotations

from pathlib import Path
import os

from dotenv import load_dotenv


def main() -> None:
    repo_root = Path(__file__).resolve().parents[2]
    env_path = repo_root / ".env"
    print(f"Using .env: {env_path} (exists={env_path.exists()})")
    load_dotenv(env_path)
    key = os.getenv("OPENAI_API_KEY", "")
    if not key:
        print("OPENAI_API_KEY is not set")
        return
    if key.startswith("put_your"):  # guard placeholder
        print("OPENAI_API_KEY is still the placeholder value")
        return
    prefix = key[:4]
    suffix = key[-4:] if len(key) >= 8 else key[-2:]
    print(f"OPENAI_API_KEY loaded: {prefix}...{suffix}")


if __name__ == "__main__":
    main()
