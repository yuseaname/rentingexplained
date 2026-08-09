/**
 * Minimal JS for adsense-base Hugo theme
 * - Mobile nav toggle
 * - Nav shadow on scroll
 * - Lazy image polyfill fallback
 */

(function () {
  'use strict';

  // ── Mobile nav toggle ──
  var toggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var hamburger = document.getElementById('hamburger-icon');
  var closeIcon = document.getElementById('close-icon');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      var isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      hamburger.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // ── Nav shadow on scroll ──
  var nav = document.getElementById('main-nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 10) {
        nav.classList.add('shadow-sm');
      } else {
        nav.classList.remove('shadow-sm');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Lazy image loading polyfill ──
  if (!('loading' in HTMLImageElement.prototype)) {
    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            img.src = img.src; // trigger load
            observer.unobserve(img);
          }
        });
      });
      lazyImages.forEach(function (img) { observer.observe(img); });
    } else {
      lazyImages.forEach(function (img) { img.removeAttribute('loading'); });
    }
  }

  // ── Reading progress bar ──
  var progress = document.querySelector('.progress-bar');
  if (progress) {
    var updateProgress = function () {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrolled = window.scrollY;
      var pct = docHeight > 0 ? Math.min((scrolled / docHeight) * 100, 100) : 0;
      progress.style.width = pct.toFixed(1) + '%';
      progress.setAttribute('aria-valuenow', Math.round(pct));
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  // ── Scroll reveal (orchestrated, purposeful) ──
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  // ── Active section highlight in the TOC (predictive wayfinding) ──
  var tocLinks = document.querySelectorAll('.toc-nav a');
  if (tocLinks.length) {
    var headingRefs = [];
    tocLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        // getElementById (not querySelector) so IDs starting with a digit don't throw
        var h = document.getElementById(id.slice(1));
        if (h) headingRefs.push({ link: link, el: h });
      }
    });
    if (headingRefs.length) {
      var setActive = function (link) {
        tocLinks.forEach(function (l) { l.classList.remove('toc-active'); });
        if (link) link.classList.add('toc-active');
      };
      // Use scroll position: find the last heading whose top is above the trigger line.
      // This is more robust than intersection bands across viewport/scroll jumps.
      var triggerLine = function () { return window.innerHeight * 0.28; };
      var updateActive = function () {
        var line = triggerLine();
        var current = null;
        for (var i = 0; i < headingRefs.length; i++) {
          if (headingRefs[i].el.getBoundingClientRect().top <= line) {
            current = headingRefs[i].link;
          } else {
            break;
          }
        }
        setActive(current);
      };
      window.addEventListener('scroll', updateActive, { passive: true });
      window.addEventListener('resize', updateActive, { passive: true });
      updateActive();
    }
  }
})();
