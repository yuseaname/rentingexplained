from __future__ import annotations

import re
from pathlib import Path
from typing import Dict, List, Tuple

from .io_utils import hash_prompt, read_text


PROMPT_TEMPLATE = (
    "Photorealistic {slot_type} image for RentingExplained.com, a rental housing website helping tenants with apartment renting, lease agreements, and tenant rights.\n"
    "Topic: {anchor_text}\n"
    "{context_block}"
    "Visual scenario: {rental_scenario}\n"
    "First, interpret the topic within the rental housing context. Then create a realistic moment showing someone in this rental-related situation.\n"
    "The scene must depict a believable, real-life rental scenario where the topic would naturally apply: "
    "apartment hunting, lease review, move-in inspection, budgeting for rent, dealing with maintenance, tenant-landlord interactions, etc.\n"
    "Show a single, specific moment that clearly relates to apartment renting or being a tenant "
    "(viewing an apartment, reading a lease, inspecting a unit, reviewing rental costs, talking with landlord, etc.).\n"
    "Include subtle rental context cues: apartment interiors, lease documents (no readable text), keys, rental applications, maintenance issues, moving boxes, etc.\n"
    "Avoid generic office/desk setups unrelated to renting.\n"
    "Camera:\n"
    "Full-frame camera, 35mm lens. Natural perspective, slight imperfections allowed. Human eye-level or contextual angle (not overhead).\n"
    "Lighting:\n"
    "Natural or practical indoor lighting typical of apartments. Time-of-day cues allowed. No dramatic, cinematic, or studio lighting.\n"
    "Strict constraints:\n"
    "• No visible text.\n"
    "• No UI elements or readable screens.\n"
    "• No diagrams, icons, or symbols.\n"
    "• No branding, logos, or overlays.\n"
    "• No symmetry-heavy or stock-photo compositions.\n"
    "Style:\n"
    "Strict photorealism. No CGI, no illustration, no surreal elements.\n"
    "The image should feel like a real photograph taken during an authentic rental-related moment, clearly understandable without explanation.\n"
    "Unique composition guardrail:\n"
    "Do not reuse visual compositions, object groupings, or scene layouts from previous images. Each image must feel like a different household and a different moment.\n"
)


def _extract_page_metadata(page_path: str, repo_root: Path) -> Dict[str, str]:
    """Extract metadata description from Next.js page file."""
    full_path = repo_root / page_path.lstrip('/')
    if not full_path.exists():
        return {}
    
    try:
        content = read_text(full_path)
        # Look for metadata export with description
        # Pattern: export const metadata = genMeta({ ... description: '...', ... })
        metadata_match = re.search(r"description:\s*['\"]([^'\"]+)['\"]", content, re.DOTALL)
        if metadata_match:
            return {"description": metadata_match.group(1)}
    except Exception:
        pass
    
    return {}


def _map_rental_scenario(page_path: str, anchor_text: str) -> str:
    """Map page path and heading to specific rental scenario."""
    path_lower = page_path.lower()
    anchor_lower = anchor_text.lower()
    
    # Map page paths to rental scenarios
    if "tour" in path_lower or "tour" in anchor_lower or "viewing" in anchor_lower:
        return "A person viewing an apartment for the first time, inspecting the space critically"
    elif "approval" in path_lower or "application" in anchor_lower:
        return "Someone reviewing a rental application or discussing approval requirements"
    elif "lease" in path_lower or "lease" in anchor_lower or "contract" in anchor_lower:
        return "A person carefully reading through a lease agreement, highlighting important sections"
    elif "cost" in path_lower or "budget" in anchor_lower or "afford" in anchor_lower or "save" in anchor_lower:
        return "Someone budgeting for rent and expenses, reviewing financial documents or using a calculator"
    elif "move" in path_lower or "checklist" in anchor_lower:
        return "A person during move-in or move-out, surrounded by moving boxes in an apartment"
    elif "utility" in path_lower or "utilities" in anchor_lower:
        return "Someone setting up utilities or reviewing utility bills in their apartment"
    elif "breaking" in path_lower or "penalty" in anchor_lower or "terminate" in anchor_lower:
        return "A person reviewing their lease with concern, considering breaking it early"
    elif "deposit" in path_lower or "security" in anchor_lower:
        return "Someone documenting apartment condition for security deposit, taking photos of walls or fixtures"
    elif "maintenance" in path_lower or "repair" in anchor_lower:
        return "A tenant reporting or dealing with a maintenance issue in their apartment"
    elif "rights" in path_lower or "law" in anchor_lower or "legal" in anchor_lower:
        return "Someone researching tenant rights or reviewing legal documents"
    elif "contact" in path_lower or "help" in anchor_lower or "guide" in anchor_lower:
        return "A person seeking help with rental questions, looking reassured while getting guidance"
    elif "about" in path_lower:
        return "A friendly, welcoming scene showing someone finding helpful rental information and feeling relieved"
    else:
        # Default: general apartment renting scenario
        return "A person navigating the apartment rental process, looking for answers and information"


def _should_inject_alarm_constraints(text: str, config: Dict) -> bool:
    alarms = config.get("domain_constraints", {}).get("alarms", {})
    if not alarms.get("enabled", False):
        return False
    keywords = alarms.get("keywords", [])
    lowered = text.lower()
    return any(keyword in lowered for keyword in keywords)


def build_prompt(slot_meta: Dict, config: Dict) -> Tuple[str, str]:
    slot_type = "hero" if slot_meta.get("slot_key") == "hero" else "inline"
    anchor_text = slot_meta.get("anchor_text", "").strip() or "the topic"
    page_path = slot_meta.get("page_path", "")
    
    # Extract page metadata for context
    repo_root = Path(__file__).resolve().parents[2]  # Go up from lib/ to image-pipeline/ to repo root
    metadata = _extract_page_metadata(page_path, repo_root)
    
    # Build context block
    context_block = ""
    if metadata.get("description"):
        context_block = f"Page context: {metadata['description']}\n"
    
    # Map to rental scenario
    rental_scenario = _map_rental_scenario(page_path, anchor_text)
    
    # Format the prompt
    prompt = PROMPT_TEMPLATE.format(
        slot_type=slot_type,
        anchor_text=anchor_text,
        context_block=context_block,
        rental_scenario=rental_scenario
    )
    
    injected = ""
    if _should_inject_alarm_constraints(anchor_text, config):
        constraints = config.get("domain_constraints", {}).get("alarms", {}).get("constraints", [])
        if constraints:
            injected = "Alarm constraints:\n" + "\n".join([f"• {item}" for item in constraints]) + "\n"
            prompt = prompt + "\n" + injected
    
    return prompt.strip(), injected


def compute_prompt_hash(prompt: str) -> str:
    return hash_prompt(prompt)

