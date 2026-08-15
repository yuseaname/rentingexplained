---
title: "State Renting Laws"
slug: "state-laws"
description: "Find your state's rules on security deposits, landlord entry, notice to vacate, rent control, and tenant rights resources."
date: 2026-08-10
lastmod: 2026-08-10
layout: "single-wide"
eyebrow: "Reference"
aliases: ["/laws"]
---

# State renting laws

Renter-landlord law in the United States is mostly state law — and often city law on top of that. Choose your state to see the key rules and where to go next.

<div class="mb-8">
  <img src="/images/makeover/newsletter-hero.webp" alt="Mailbox with an envelope" class="w-full max-h-[200px] object-cover rounded-2xl shadow-md">
</div>

<div class="callout callout-warning mt-6">
  <svg class="callout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
  </svg>
  <div class="callout-content">
    <p class="callout-title">Important</p>
    <p>This is a general reference, not legal advice. Laws change, and local ordinances may add stronger protections. For your exact situation, contact a local tenant-rights organization or a qualified attorney.</p>
  </div>
</div>

<div class="mt-8">
  <form class="search-form mb-6" role="search" onsubmit="return false;">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
    <label for="state-search" class="visually-hidden">Search states</label>
    <input id="state-search" type="search" placeholder="Search states..." autocomplete="off">
  </form>

  <div id="state-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
    {{ range sort .Site.Data.state_laws "name" }}
      <a href="{{ "/state-laws/" | relURL }}{{ .abbr | lower }}/" class="state-card" data-name="{{ .name }} {{ .abbr }}">
        <span class="state-card-name">{{ .name }}</span>
        <span class="state-card-meta">{{ .abbr }}</span>
      </a>
    {{ end }}
  </div>

  <p id="state-empty" class="hidden text-center text-muted mt-6">No states match your search.</p>
</div>

<script>
(function() {
  var input = document.getElementById('state-search');
  var grid = document.getElementById('state-grid');
  var cards = grid.querySelectorAll('.state-card');
  var empty = document.getElementById('state-empty');

  input.addEventListener('input', function() {
    var q = input.value.trim().toLowerCase();
    var visible = 0;
    cards.forEach(function(card) {
      var name = card.getAttribute('data-name').toLowerCase();
      var show = !q || name.indexOf(q) !== -1;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    empty.classList.toggle('hidden', visible > 0);
  });
})();
</script>

## What these pages cover

Each state page summarizes:

- **Security deposit limit** — how much a landlord can typically charge
- **Notice to enter** — what notice a landlord must give before entering
- **Notice to vacate** — how much notice you usually must give to end a month-to-month tenancy
- **Rent control / increase rules** — whether increases are limited
- **Where to get help** — tenant-rights organizations, legal aid, and court self-help resources

## Can't find what you need?

- Browse our <a href="/categories/legal-rights/">Legal Rights guides</a>
- Use our <a href="/tools/lease-red-flag-scanner/">Lease Red-Flag Scanner</a>
- Read our <a href="/editorial-policy/">editorial policy</a> to understand how we source this information
