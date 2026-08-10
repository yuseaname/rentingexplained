---
title: "Lease Red-Flag Scanner"
slug: "lease-red-flag-scanner"
description: "Paste a lease clause and quickly identify common warning signs and unfair terms."
date: 2026-08-10
lastmod: 2026-08-10
layout: "single-wide"
eyebrow: "Tool"
---

# Lease Red-Flag Scanner

Paste a lease clause below. This tool highlights common warning signs and explains why they matter. It does not replace a lawyer — it helps you ask better questions before signing.

<div class="tool-form max-w-3xl mt-8">
  <label for="lease-clause">Lease clause</label>
  <textarea id="lease-clause" rows="8" placeholder="Paste a clause here..." class="w-full p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-parchment)] text-[var(--color-text)] focus:border-[var(--color-key)] focus:outline-none"></textarea>

  <button id="scan-clause" class="btn btn-primary w-full mt-4">Scan for red flags</button>

  <div id="scan-result" class="tool-result hidden">
    <p class="text-sm text-muted mb-2">Potential issues found: <strong id="flag-count">0</strong></p>
    <ul id="flag-list" class="space-y-3"></ul>
  </div>
</div>

<script>
(function() {
  var textarea = document.getElementById('lease-clause');
  var btn = document.getElementById('scan-clause');
  var result = document.getElementById('scan-result');
  var flagCount = document.getElementById('flag-count');
  var flagList = document.getElementById('flag-list');

  var flags = [
    { pattern: /non-refundable\s+deposit|deposit\s+non[- ]?refundable/i, label: 'Non-refundable deposit', why: 'In many states, security deposits must be refundable if no damage is caused. Check your state law.' },
    { pattern: /waive.*right.*notice|landlord\s+may\s+enter\s+any/i, label: 'Waived notice for entry', why: 'Most states require landlords to give 24–48 hours notice except in emergencies.' },
    { pattern: /tenant\s+responsible\s+for\s+all\s+repairs|repairs?\s+(are\s+)?tenant/i, label: 'Tenant pays for all repairs', why: 'Landlords are generally responsible for major repairs and habitability.' },
    { pattern: /liquidated\s+damages|penalty.*break.*lease/i, label: 'High lease-break penalties', why: 'Landlords usually must mitigate damages; excessive penalties may be unenforceable.' },
    { pattern: /no\s+guests|guests?\s+(limited|restricted|not\s+allowed)/i, label: 'Guest restrictions', why: 'Overly restrictive guest rules may violate your right to quiet enjoyment.' },
    { pattern: /automatic\s+renewal|renew.*automatically/i, label: 'Automatic renewal', why: 'Auto-renewal clauses can trap you into another term unless you give early notice.' },
    { pattern: /tenant\s+pays\s+landlord.*legal\s+fees|attorneys?\s+fees.*tenant/i, label: 'Tenant pays landlord legal fees', why: 'One-sided attorney-fee clauses can be unfair; some states limit them.' },
    { pattern: /as\s+is|tenant\s+accepts\s+unit\s+as\s+is/i, label: '"As is" clause', why: 'You generally cannot waive the right to a habitable rental, even if the lease says so.' }
  ];

  function scan() {
    var text = textarea.value;
    if (!text.trim()) return;
    var found = [];
    flags.forEach(function(flag) {
      if (flag.pattern.test(text)) found.push(flag);
    });

    flagList.innerHTML = '';
    found.forEach(function(flag) {
      var li = document.createElement('li');
      li.className = 'callout callout-warning p-4';
      li.innerHTML = '<svg class="callout-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><div class="callout-content"><p class="callout-title">' + flag.label + '</p><p>' + flag.why + '</p></div>';
      flagList.appendChild(li);
    });

    if (found.length === 0) {
      flagList.innerHTML = '<li class="callout callout-tip p-4"><svg class="callout-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div class="callout-content"><p class="callout-title">No common red flags found</p><p>That does not mean the lease is perfect. Read the full guide on lease clauses before signing.</p></div></li>';
    }

    flagCount.textContent = found.length;
    result.classList.remove('hidden');
  }

  btn.addEventListener('click', scan);
  textarea.addEventListener('keypress', function(e) { if (e.key === 'Enter' && e.ctrlKey) scan(); });
})();
</script>

## What this tool checks

The scanner looks for patterns associated with common lease problems. It cannot review every clause and is not legal advice. For a full walkthrough, read our guide on <a href="/blog/understanding-a-lease-agreement/">understanding a lease agreement</a>.

## Related guides

- <a href="/blog/understanding-a-lease-agreement/">Understanding a Lease Agreement</a>
- <a href="/blog/how-to-break-lease/">How to Break a Lease</a>
- <a href="/blog/landlord-entry-notice-requirements/">Landlord Entry Notice Requirements</a>
- <a href="/blog/security-deposits-guide/">Security Deposits Guide</a>
