---
title: "Move-Out Checklist"
slug: "move-out-checklist"
description: "An interactive checklist to protect your security deposit and document the condition of your rental when you leave."
date: 2026-08-10
lastmod: 2026-08-10
layout: "single-wide"
eyebrow: "Tool"
---

# Move-Out Checklist

Use this interactive checklist to document your move-out and improve your chances of getting your full security deposit back.

<div class="tool-form max-w-3xl mt-8">
  <div id="checklist-app"></div>
</div>

<script>
(function() {
  var container = document.getElementById('checklist-app');
  var items = [
    { id: 'notice', label: 'Gave proper written move-out notice' },
    { id: 'photos', label: 'Took dated photos/videos of every room' },
    { id: 'damage', label: 'Documented pre-existing damage and normal wear' },
    { id: 'cleaning', label: 'Cleaned unit to the standard in your lease' },
    { id: 'walls', label: 'Filled small nail holes and touched up paint if required' },
    { id: 'keys', label: 'Returned all keys, fobs, and garage remotes' },
    { id: 'forward', label: 'Set up mail forwarding with USPS' },
    { id: 'utilities', label: 'Scheduled utility shutoff/transfer' },
    { id: 'address', label: 'Provided landlord your forwarding address' },
    { id: 'inspection', label: 'Requested a final walk-through inspection' }
  ];

  var title = document.createElement('h2');
  title.className = 'font-display text-xl font-semibold mb-4';
  title.textContent = 'Before you leave';
  container.appendChild(title);

  var progress = document.createElement('div');
  progress.className = 'mb-4';
  progress.innerHTML = '<div class="w-full bg-[var(--color-border)] rounded-full h-2"><div id="checklist-bar" class="bg-[var(--color-sage)] h-2 rounded-full transition-all" style="width:0%"></div></div><p class="text-sm text-muted mt-2"><span id="checklist-count">0</span> of ' + items.length + ' completed</p>';
  container.appendChild(progress);

  var list = document.createElement('ul');
  list.className = 'space-y-2';
  container.appendChild(list);

  var checked = {};

  function update() {
    var done = Object.keys(checked).filter(function(k) { return checked[k]; }).length;
    var pct = Math.round((done / items.length) * 100);
    document.getElementById('checklist-bar').style.width = pct + '%';
    document.getElementById('checklist-count').textContent = done;
  }

  items.forEach(function(item) {
    var li = document.createElement('li');
    li.className = 'flex items-start gap-3';
    var id = 'chk-' + item.id;
    li.innerHTML = '<input type="checkbox" id="' + id + '" class="mt-1 w-5 h-5 accent-[var(--color-sage)]"> <label for="' + id + '" class="text-[var(--color-text)] cursor-pointer">' + item.label + '</label>';
    list.appendChild(li);
    var cb = li.querySelector('input');
    cb.addEventListener('change', function() {
      checked[item.id] = cb.checked;
      update();
    });
  });

  var reset = document.createElement('button');
  reset.className = 'btn btn-ghost mt-6';
  reset.textContent = 'Reset checklist';
  reset.addEventListener('click', function() {
    list.querySelectorAll('input').forEach(function(cb) { cb.checked = false; });
    Object.keys(checked).forEach(function(k) { checked[k] = false; });
    update();
  });
  container.appendChild(reset);
})();
</script>

## After you move out

- Your landlord must return your deposit (minus lawful deductions) within the timeframe set by your state.
- If deductions seem unfair, request an itemized list and compare it to your move-in and move-out photos.
- Learn your state's rules on our <a href="/state-laws/">State Laws</a> page.

## Related guides

- <a href="/blog/apartment-move-out-checklist/">Apartment Move-Out Checklist</a>
- <a href="/blog/how-to-get-security-deposit-back/">How to Get Your Security Deposit Back</a>
- <a href="/blog/notice-to-vacate-letter-template/">Notice to Vacate Letter Template</a>
- <a href="/blog/security-deposit-return-timeline/">Security Deposit Return Timeline</a>
