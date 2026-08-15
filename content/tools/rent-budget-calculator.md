---
title: "Rent Budget Calculator"
slug: "rent-budget-calculator"
description: "Estimate how much rent you can afford based on your income and see the total cost of moving in."
date: 2026-08-10
lastmod: 2026-08-10
layout: "single-wide"
eyebrow: "Tool"
aliases: ["/tools/rent-budget-checker"]
---

# Rent Budget Calculator

Enter your monthly gross income and a few estimated costs to see what rent level fits your budget.

<div class="tool-form max-w-2xl mt-8">
  <label for="income">Monthly gross income</label>
  <input id="income" type="number" min="0" step="100" placeholder="4000" inputmode="numeric">

  <label for="rent-rule">Rent rule</label>
  <select id="rent-rule">
    <option value="0.30">30% of gross income (common guideline)</option>
    <option value="0.25">25% of gross income (conservative)</option>
    <option value="0.35">35% of gross income (stretch)</option>
  </select>

  <label for="deposit-months">Security deposit (months of rent)</label>
  <select id="deposit-months">
    <option value="1">1 month</option>
    <option value="2">2 months</option>
    <option value="0.5">Half month</option>
  </select>

  <label for="other-costs">Estimated one-time move-in costs (moving, fees, etc.)</label>
  <input id="other-costs" type="number" min="0" step="50" placeholder="500" inputmode="numeric">

  <button id="calc-rent" class="btn btn-primary w-full">Calculate budget</button>

  <div id="rent-result" class="tool-result hidden">
    <p class="text-sm text-muted mb-1">Recommended max monthly rent</p>
    <p id="rent-max" class="tool-result-number"></p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
      <div>
        <span class="text-muted">Move-in total</span>
        <p id="movein-total" class="font-semibold"></p>
      </div>
      <div>
        <span class="text-muted">Deposit</span>
        <p id="deposit-total" class="font-semibold"></p>
      </div>
    </div>
  </div>
</div>

<div class="callout callout-tip mt-8">
  <svg class="callout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
  <div class="callout-content">
    <p class="callout-title">Remember</p>
    <p>This is an estimate. Your actual budget depends on debt, savings, and local rent prices. Read our full guide on <a href="/blog/how-much-rent-can-i-afford/">how much rent you can afford</a>.</p>
  </div>
</div>

<script>
(function() {
  var income = document.getElementById('income');
  var rule = document.getElementById('rent-rule');
  var depositMonths = document.getElementById('deposit-months');
  var otherCosts = document.getElementById('other-costs');
  var btn = document.getElementById('calc-rent');
  var result = document.getElementById('rent-result');
  var rentMax = document.getElementById('rent-max');
  var moveinTotal = document.getElementById('movein-total');
  var depositTotal = document.getElementById('deposit-total');

  function fmt(n) {
    return '$' + Math.round(n).toLocaleString();
  }

  function calc() {
    var inc = parseFloat(income.value) || 0;
    if (inc <= 0) return;
    var maxRent = inc * parseFloat(rule.value);
    var dep = maxRent * parseFloat(depositMonths.value);
    var other = parseFloat(otherCosts.value) || 0;
    var moveIn = maxRent + dep + other;

    rentMax.textContent = fmt(maxRent) + '/mo';
    depositTotal.textContent = fmt(dep);
    moveinTotal.textContent = fmt(moveIn);
    result.classList.remove('hidden');
  }

  btn.addEventListener('click', calc);
  [income, rule, depositMonths, otherCosts].forEach(function(el) {
    el.addEventListener('keypress', function(e) { if (e.key === 'Enter') calc(); });
  });
})();
</script>

## Related guides

- <a href="/blog/how-much-rent-can-i-afford/">How Much Rent Can I Afford?</a>
- <a href="/blog/hidden-apartment-fees/">Hidden Apartment Fees</a>
- <a href="/blog/proof-of-income-for-apartments/">Proof of Income for Apartments</a>
