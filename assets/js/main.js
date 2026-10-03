(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // ---- Mobile navigation ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // ---- Reveal on scroll ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---- Publication filters ----
  var pubRoot = document.querySelector('[data-pubs]');
  if (!pubRoot) return;

  var state = { type: 'all', tag: 'all', q: '' };
  var items = Array.prototype.slice.call(pubRoot.querySelectorAll('.pub'));
  var sections = pubRoot.querySelectorAll('.pub-section');
  var empty = pubRoot.querySelector('.empty');
  var search = document.getElementById('pub-search');

  function apply() {
    var q = state.q.trim().toLowerCase();
    items.forEach(function (li) {
      var okType = state.type === 'all' || li.dataset.type === state.type;
      var okTag = state.tag === 'all' || (' ' + li.dataset.tags + ' ').indexOf(' ' + state.tag + ' ') !== -1;
      var okQ = !q || li.textContent.toLowerCase().indexOf(q) !== -1;
      li.hidden = !(okType && okTag && okQ);
    });
    var total = 0;
    sections.forEach(function (sec) {
      var n = sec.querySelectorAll('.pub:not([hidden])').length;
      sec.hidden = n === 0;
      var counter = sec.querySelector('.n');
      if (counter) counter.textContent = '(' + n + ')';
      total += n;
    });
    if (empty) empty.hidden = total !== 0;
  }

  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var key = group.getAttribute('data-filter-group');
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      group.querySelectorAll('.filter-btn').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      state[key] = btn.getAttribute('data-value');
      apply();
    });
  });

  if (search) {
    search.addEventListener('input', function () {
      state.q = search.value;
      apply();
    });
  }

  // Allow deep links such as publications.html#journal or #conference
  var hash = location.hash.replace('#', '');
  if (hash) {
    var btn = document.querySelector('[data-filter-group="type"] .filter-btn[data-value="' + hash + '"]');
    if (btn) btn.click();
  }
})();
