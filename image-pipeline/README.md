# AdSense Safe Image Pipeline (Portable v4)

This folder is self-contained. Copy `/image-pipeline/` into any repo to reuse the pipeline.

## Setup

Windows (PowerShell):
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r image-pipeline/requirements.txt
copy .env.example .env
```

macOS/Linux:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r image-pipeline/requirements.txt
cp .env.example .env
```

## Run sequence
```bash
python image-pipeline/scripts/01_discover_slots.py
python image-pipeline/scripts/02_refine_prompts.py --priority-only --max-slots 10
python image-pipeline/scripts/03_generate_images.py --priority-only --quality medium --model gpt-image-1 --size 1536x1024 --max-slots 10 --force
python image-pipeline/scripts/build_image_ledger.py --scan-html
python image-pipeline/scripts/04_place_images.py --limit 20
python image-pipeline/scripts/05_polish_audit.py
```

Notes:
- `04_place_images.py` is plan-only by default; add `--apply` to modify HTML.
- All outputs live under `/image-pipeline/generated/`.
