(function () {
  'use strict';
  var d = document.documentElement;
  function save(k, v) { try { localStorage.setItem('oae.' + k, v); } catch (e) { /* storage unavailable */ } }
  function T(en, de) { return d.lang === 'de' ? de : en; }
  // ---------- settings menu (gear): language + theme
  var btn = document.getElementById('setBtn'), menu = document.getElementById('setMenu');
  function sync() {
    var th = d.getAttribute('data-theme') || 'auto';
    menu.querySelectorAll('[data-theme-set]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-set') === th)); });
  }
  function setTheme(t) { if (t === 'auto') d.removeAttribute('data-theme'); else d.setAttribute('data-theme', t); save('theme', t); sync(); }
  function open(o) {
    menu.hidden = !o; btn.setAttribute('aria-expanded', String(o));
    if (o) { var f = menu.querySelector('[aria-pressed="true"]'); if (f) f.focus(); }
  }
  if (btn && menu) {
    btn.addEventListener('click', function (e) { e.stopPropagation(); open(menu.hidden); });
    document.addEventListener('click', function (e) { if (!menu.hidden && !menu.contains(e.target)) open(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { open(false); btn.focus(); } });
    // Language = other URL; remember the choice for the app and the old URLs
    menu.querySelectorAll('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { save('lang', b.getAttribute('data-lang')); }); });
    menu.querySelectorAll('[data-theme-set]').forEach(function (b) { b.addEventListener('click', function () { setTheme(b.getAttribute('data-theme-set')); }); });
    // Changed in another tab (app or other policy page)
    window.addEventListener('storage', function (e) {
      if (e.key === 'oae.theme') { var t = e.newValue; if (t === 'light' || t === 'dark' || t === 'contrast') d.setAttribute('data-theme', t); else d.removeAttribute('data-theme'); sync(); }
    });
    sync();
  }
  // ---------- copy buttons
  function copyText(text, b) {
    function ok() { b.classList.add('ok'); setTimeout(function () { b.classList.remove('ok'); }, 1600); }
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(ok, fallback); } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { /* ignore */ }
      ta.remove();
    }
  }
  var CP = '<span class="idle">' + T('Copy', 'Kopieren') + '</span><span class="done" aria-live="polite">' + T('Copied', 'Kopiert') + '</span>';
  document.querySelectorAll('pre, [data-copy]').forEach(function (el) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'cp'; b.innerHTML = CP;
    b.addEventListener('click', function () { copyText(el.getAttribute('data-copy') || el.textContent, b); });
    if (el.tagName === 'PRE') { var w = document.createElement('div'); w.className = 'cbox'; el.parentNode.insertBefore(w, el); w.appendChild(el); w.appendChild(b); }
    else { el.parentNode.appendChild(b); }
  });
  // ---------- list filter (ADMX index pages)
  var q = document.getElementById('flt');
  if (q) {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-s]')), grps = document.querySelectorAll('.grp'), none = document.getElementById('fltNone');
    q.addEventListener('input', function () {
      var t = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean), n = 0;
      items.forEach(function (li) { var s = li.getAttribute('data-s'), hit = t.every(function (w) { return s.indexOf(w) >= 0; }); li.hidden = !hit; if (hit) n++; });
      grps.forEach(function (g) { g.hidden = !g.querySelector('[data-s]:not([hidden])'); });
      if (none) none.hidden = n > 0;
    });
  }
  // ---------- global search (policies index, loads search.json on demand)
  var gs = document.getElementById('gsearch');
  if (gs) {
    var data = null, out = document.getElementById('ghits'), loading = false;
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function render() {
      var t = gs.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      if (!t.length || !data) { out.innerHTML = ''; return; }
      var res = [];
      for (var i = 0; i < data.length && res.length < 60; i++) {
        var r = data[i], s = (r[2] + ' ' + r[3] + ' ' + r[4] + ' ' + r[1] + ' ' + r[0]).toLowerCase();
        if (t.every(function (w) { return s.indexOf(w) >= 0; })) res.push(r);
      }
      out.innerHTML = res.length
        ? '<ul class="list">' + res.map(function (r) {
            return '<li><a href="' + esc(r[0]) + '/' + esc(r[1]) + '.html">' + esc(d.lang === 'de' ? (r[3] || r[2]) : r[2]) + '</a>'
              + (r[4] ? '<span class="mono">' + esc(r[4]) + '</span>' : '') + ' <span class="tag">' + esc(r[0]) + '</span></li>';
          }).join('') + '</ul>'
        : '<p class="empty mut">' + T('No policy found.', 'Keine Richtlinie gefunden.') + '</p>';
    }
    function load() {
      if (data || loading) return; loading = true;
      fetch('../search.json').then(function (r) { return r.json(); }).then(function (j) { data = j; render(); })
        .catch(function () { out.innerHTML = '<p class="empty mut">' + T('Search needs the published site (not file://).', 'Die Suche braucht die veröffentlichte Seite (nicht file://).') + '</p>'; });
    }
    gs.addEventListener('focus', load); gs.addEventListener('input', function () { load(); render(); });
  }
})();
