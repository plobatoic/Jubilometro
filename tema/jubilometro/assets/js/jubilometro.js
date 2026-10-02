/* ==========================================================================
   JUBILÓMETRO · Interacciones globales (sin dependencias)
   Cabecera fija, menú móvil, buscador, índice y progreso de lectura, compartir,
   lecturas del mes, tabla de datos, botón de cookies y los efectos 3D (tarjetas,
   portada y transiciones entre páginas).
   ========================================================================== */
(function () {
  'use strict';
  function safe(fn) { try { fn(); } catch (e) { if (window.console) console.warn(e); } }
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Cabecera: sombra al hacer scroll (IntersectionObserver, sin escuchar el scroll)
  function initHeader() {
    var h = $('[data-jm-header]'), s = $('[data-jm-sentinel]');
    if (!h || !s || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (e) { h.classList.toggle('is-stuck', !e[0].isIntersecting); }).observe(s);
  }

  // Cajón móvil
  function initDrawer() {
    var d = $('#jm-drawer'); if (!d) return;
    var openers = $$('[data-jm-drawer-open]'), last = null;
    function set(open) {
      d.classList.toggle('is-open', open);
      d.setAttribute('aria-hidden', open ? 'false' : 'true');
      openers.forEach(function (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
      document.documentElement.style.overflow = open ? 'hidden' : '';
      if (open) { last = document.activeElement; var f = $('[data-jm-drawer-close]', d); if (f) f.focus(); } else if (last) last.focus();
    }
    openers.forEach(function (b) { b.addEventListener('click', function () { set(true); }); });
    $$('[data-jm-drawer-close]', d).forEach(function (b) { b.addEventListener('click', function () { set(false); }); });
    d.addEventListener('click', function (e) { if (e.target === d) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && d.classList.contains('is-open')) set(false); });
  }

  // Buscador (diálogo nativo)
  function initSearch() {
    var dlg = $('#jm-search'); if (!dlg || !dlg.showModal) return;
    $$('[data-jm-search-open]').forEach(function (b) {
      b.addEventListener('click', function () { dlg.showModal(); var i = $('input', dlg); if (i) setTimeout(function () { i.focus(); }, 30); });
    });
    $$('[data-jm-search-close]', dlg).forEach(function (b) { b.addEventListener('click', function () { dlg.close(); }); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  }

  // Formularios del prototipo (en WordPress los gestiona Kadence Blocks Form o tu proveedor de newsletter)
  function initForms() {
    $$('form[data-jm-demo]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!f.checkValidity()) { f.reportValidity(); return; }
        var box = f.closest('[data-jm-sent]') || f; box.classList.add('is-sent');
        var ok = $('.jm-form-ok, .jm-nl__ok', box); if (ok) { ok.setAttribute('tabindex', '-1'); ok.focus(); }
      });
    });
  }

  // Botón "Configurar cookies": reabre la CMP de Google (Privacidad y mensajes de AdSense)
  function initCookies() {
    $$('[data-jm-cookies]').forEach(function (b) {
      b.addEventListener('click', function () {
        window.googlefc = window.googlefc || {}; window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
        window.googlefc.callbackQueue.push(function () { if (window.googlefc.showRevocationMessage) window.googlefc.showRevocationMessage(); });
      });
    });
  }

  // Página de datos: ordenar, filtrar por comunidad, buscar y descargar CSV
  function initDatos() {
    var root = $('[data-jm-datos]'); if (!root) return;
    var table = $('table', root), tbody = $('tbody', table), rows = $$('tr', tbody);
    var q = $('[data-jm-q]', root), cc = $('[data-jm-ccaa]', root), count = $('[data-jm-count]', root);
    function apply() {
      var t = (q && q.value || '').trim().toLowerCase(), c = cc && cc.value, n = 0;
      rows.forEach(function (r) {
        var ok = (!t || r.getAttribute('data-name').indexOf(t) > -1) && (!c || r.getAttribute('data-ccaa') === c);
        r.hidden = !ok; if (ok) n++;
      });
      if (count) count.textContent = n + (n === 1 ? ' provincia' : ' provincias');
    }
    if (q) q.addEventListener('input', apply);
    if (cc) cc.addEventListener('change', apply);
    $$('th[data-sort] button', table).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var th = btn.parentNode, key = th.getAttribute('data-sort'), dir = th.getAttribute('aria-sort') === 'descending' ? 'ascending' : 'descending';
        $$('th[data-sort]', table).forEach(function (o) { o.removeAttribute('aria-sort'); });
        th.setAttribute('aria-sort', dir);
        rows.sort(function (a, b) {
          var x = a.getAttribute('data-' + key), y = b.getAttribute('data-' + key);
          var nx = parseFloat(x), ny = parseFloat(y);
          var r = isNaN(nx) ? x.localeCompare(y, 'es') : nx - ny;
          return dir === 'ascending' ? r : -r;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
      });
    });
    var dl = $('[data-jm-csv]', root);
    if (dl) dl.addEventListener('click', function () {
      var lines = [['provincia', 'comunidad', 'pensiones_jubilacion', 'pension_media_jubilacion_eur', 'diferencia_media_nacional_eur']];
      rows.forEach(function (r) { lines.push([r.getAttribute('data-label'), r.getAttribute('data-ccaa-label'), r.getAttribute('data-num') || '', r.getAttribute('data-valor'), r.getAttribute('data-dif')]); });
      var csv = lines.map(function (l) { return l.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(';'); }).join('\n');
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
      a.download = 'pension-media-provincia.csv'; document.body.appendChild(a); a.click(); a.remove();
    });
  }

  // Artículo: índice con la sección activa resaltada
  function initToc() {
    var links = $$('.jm-post__aside .jm-toc a[href^="#"]'); if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) { var el = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); if (el) map[el.id] = a; });
    var current = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) current = e.target.id; });
      if (current && map[current]) { links.forEach(function (a) { a.classList.remove('is-active'); }); map[current].classList.add('is-active'); }
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  // Barra de progreso de lectura (solo si el navegador no la anima por CSS)
  function initProgress() {
    var bar = $('.jm-progress'); if (!bar) return;
    if (window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()')) return;
    var ticking = false;
    function draw() { var h = document.documentElement, max = h.scrollHeight - h.clientHeight; bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, h.scrollTop / max) : 0) + ')'; ticking = false; }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(draw); } }, { passive: true });
    draw();
  }

  // Compartir: copiar el enlace
  function initShare() {
    $$('[data-jm-copy]').forEach(function (b) {
      b.addEventListener('click', function () {
        var url = b.getAttribute('data-jm-copy'), label = b.getAttribute('aria-label');
        function done() { b.classList.add('is-done'); b.setAttribute('aria-label', 'Enlace copiado'); setTimeout(function () { b.classList.remove('is-done'); b.setAttribute('aria-label', label); }, 2200); }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { window.prompt('Copia el enlace:', url); });
        else window.prompt('Copia el enlace:', url);
      });
    });
  }

  // Calculadoras para otras webs: copiar el código de inserción
  function initCopyCode() {
    $$('[data-jm-copycode]').forEach(function (b) {
      var box = $(b.getAttribute('data-jm-copycode')), txt = b.textContent;
      if (!box) return;
      b.addEventListener('click', function () {
        function done() { b.classList.add('is-done'); b.textContent = '¡Código copiado!'; setTimeout(function () { b.classList.remove('is-done'); b.textContent = txt; }, 2500); }
        function manual() { box.focus(); box.select(); }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(box.value).then(done, manual);
        else manual();
      });
    });
  }

  // Lecturas del mes (para «Lo más leído»): una señal ligera por visita, sin cookies
  function initViews() {
    var el = $('[data-jm-view]'); if (!el || !navigator.sendBeacon) return;
    var fd = new FormData(); fd.append('action', 'jm_view'); fd.append('id', el.getAttribute('data-jm-view'));
    setTimeout(function () { navigator.sendBeacon(el.getAttribute('data-jm-ajax'), fd); }, 4000);
  }

  // «Seguir leyendo»: la libreta recuerda la última guía que abriste (solo en tu navegador)
  function initResume() {
    var post = $('[data-jm-view]'), box = $('[data-jm-resume]'), key = 'jm_ultima_guia';
    try {
      if (post) { var h = $('.jm-post__title h1'); if (h) localStorage.setItem(key, JSON.stringify({ t: h.textContent.trim(), u: location.pathname })); }
      if (box) {
        var d = JSON.parse(localStorage.getItem(key) || 'null');
        if (d && d.u && d.t) { var a = $('a', box) || box.appendChild(document.createElement('a')); a.href = d.u; a.textContent = d.t; box.classList.add('is-on'); }
      }
    } catch (e) { /* sin almacenamiento: no pasa nada */ }
  }

  /* ---------- Movimiento (nunca con "reducir movimiento") ---------- */
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Tarjetas en 3D: se inclinan hacia el ratón con un brillo y un filo de luz (solo con ratón).
  // Un único oyente para toda la página; la tarjeta vuelve a su sitio al salir.
  // [lo que se vigila, lo que se inclina (vacío: la propia tarjeta)]
  var TILT = [
    ['.jm-cajon, .jm-tema, .jm-saldo__row, .jm-life__card, .jm-next, .jm-card, .jm-person, .jm-pagehead__media', ''],
    ['.jm-story:not(.jm-story--lead)', '.jm-story__media']
  ];
  function initTilt() {
    if (calm || !fine) return;
    var watch = TILT.map(function (t) { return t[0]; }).join(', '), st = null, raf = 0;
    function frame() {
      raf = 0; if (!st) return;
      var el = st.el, r = el.getBoundingClientRect();
      if (r.width && r.height) {
        st.tx = Math.max(-1, Math.min(1, ((st.cx - r.left) / r.width) * 2 - 1));
        st.ty = Math.max(-1, Math.min(1, ((st.cy - r.top) / r.height) * 2 - 1));
      }
      st.x += (st.tx - st.x) * 0.2; st.y += (st.ty - st.y) * 0.2;
      var a = st.amp;
      el.style.transform = 'perspective(' + st.p + 'px) rotateX(' + (-st.y * a).toFixed(2) + 'deg) rotateY(' + (st.x * a).toFixed(2) + 'deg) translate3d(0,' + st.lift + 'px,0)';
      el.style.setProperty('--gx', ((st.x + 1) * 50).toFixed(1) + '%');
      el.style.setProperty('--gy', ((st.y + 1) * 50).toFixed(1) + '%');
      el.style.setProperty('--px', st.x.toFixed(3));
      el.style.setProperty('--py', st.y.toFixed(3));
      if (Math.abs(st.tx - st.x) + Math.abs(st.ty - st.y) > 0.004) raf = requestAnimationFrame(frame);
    }
    function release(s) {
      var el = s.el; el.classList.remove('is-tilt'); el.style.transform = '';
      ['--gx', '--gy', '--px', '--py'].forEach(function (k) { el.style.removeProperty(k); });
      if (s.card !== el) s.card.classList.remove('is-tilting');
    }
    function engage(card, e) {
      var target = card, sub = '';
      for (var i = 0; i < TILT.length; i++) { if (card.matches(TILT[i][0])) { sub = TILT[i][1]; break; } }
      if (sub) { target = $(sub, card); if (!target) return null; card.classList.add('is-tilting'); }
      var r = target.getBoundingClientRect(), big = Math.max(r.width, r.height * 1.3);
      target.classList.add('is-tilt');
      return { el: target, card: card, x: 0, y: 0, tx: 0, ty: 0, cx: e.clientX, cy: e.clientY, amp: Math.max(1.5, Math.min(6, 2700 / big)), p: Math.max(800, Math.round(big * 2.4)), lift: sub ? -2 : -4 };
    }
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      var card = e.target.closest ? e.target.closest(watch) : null;
      if (!st || card !== st.card) {
        if (st) release(st);
        st = card ? engage(card, e) : null;
      }
      if (!st) return;
      st.cx = e.clientX; st.cy = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', function () { if (st) { release(st); st = null; } });
  }

  // Portada: la guía destacada, en un escenario 3D que sigue al ratón, con un foco de luz en el fondo
  function initStage() {
    var mast = $('.jm-mast'), stage = $('.jm-mast__stage');
    if (!mast || !stage || calm || !fine) return;
    var spot = $('.jm-mast__spot', mast), x = 0, y = 0, tx = 0, ty = 0, sx = 0, sy = 0, tsx = 0, tsy = 0, cx = 0, cy = 0, raf = 0;
    function loop() {
      raf = 0;
      var r = stage.getBoundingClientRect(), m = mast.getBoundingClientRect();
      if (mast.classList.contains('is-lit')) {
        tx = Math.max(-1, Math.min(1, (cx - (r.left + r.width / 2)) / (r.width / 2 + 240)));
        ty = Math.max(-1, Math.min(1, (cy - (r.top + r.height / 2)) / (r.height / 2 + 240)));
        tsx = cx - m.left; tsy = cy - m.top;
      }
      x += (tx - x) * 0.08; y += (ty - y) * 0.08; sx += (tsx - sx) * 0.16; sy += (tsy - sy) * 0.16;
      stage.style.setProperty('--px', x.toFixed(3));
      stage.style.setProperty('--py', y.toFixed(3));
      if (spot) spot.style.transform = 'translate3d(' + sx.toFixed(1) + 'px,' + sy.toFixed(1) + 'px,0)';
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.002 || Math.abs(tsx - sx) + Math.abs(tsy - sy) > 0.5) raf = requestAnimationFrame(loop);
    }
    mast.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      cx = e.clientX; cy = e.clientY;
      if (!mast.classList.contains('is-lit')) {
        // El foco aparece donde está el ratón, sin cruzar la cabecera desde una esquina
        var m = mast.getBoundingClientRect(); sx = tsx = cx - m.left; sy = tsy = cy - m.top;
        mast.classList.add('is-lit');
      }
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    mast.addEventListener('pointerleave', function () { mast.classList.remove('is-lit'); tx = ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
  }

  // Grabado de billete antiguo (guilloché) detrás de la portada y de las cabeceras de página.
  // Se dibuja en un lienzo; con ratón, las líneas se desplazan y hacen aguas como el papel moneda.
  function initGuilloche() {
    var heads = $$('.jm-mast, .jm-pagehead').concat(window.innerWidth >= 1100 ? $$('.jm-post__head') : []);
    if (!heads.length || !window.HTMLCanvasElement) return;
    heads.forEach(function (box) {
      var cv = $('.jm-guilloche', box);
      if (!cv) { cv = document.createElement('canvas'); cv.className = 'jm-guilloche'; cv.setAttribute('aria-hidden', 'true'); box.insertBefore(cv, box.firstChild); }
      var ctx = cv.getContext('2d'); if (!ctx) return;
      var focus = $('.jm-mast__stage, .jm-pagehead__media', box), big = box.classList.contains('jm-mast'), small = box.classList.contains('jm-post__head');
      var w = 0, h = 0, dpr = 1, cx = 0, cy = 0, R = 0, ph = 0, py = 0, tph = 0, tpy = 0, raf = 0, job = 0;
      function curve(i) {
        var k = (i / 24) * Math.PI * 2;
        ctx.strokeStyle = i % 2 ? 'rgba(30,75,64,.15)' : 'rgba(146,98,23,.17)';
        ctx.beginPath();
        for (var j = 0; j <= 300; j++) {
          var t = (j / 300) * Math.PI * 2, r = R + 30 * Math.sin(7 * t + k + ph) + 14 * Math.cos(12 * t - 2 * k + py);
          if (j) ctx.lineTo(cx + r * Math.cos(t), cy + r * Math.sin(t)); else ctx.moveTo(cx + r, cy);
        }
        ctx.stroke();
      }
      function band() {
        for (var n = 0; n < 7; n++) {
          ctx.strokeStyle = n % 2 ? 'rgba(146,98,23,.2)' : 'rgba(30,75,64,.16)';
          ctx.beginPath();
          for (var x = 0; x <= w + 8; x += 4) {
            var y = h - 22 + 7 * Math.sin(x * 0.021 + n * 0.55 + ph) + 4 * Math.sin(x * 0.049 - n * 0.9 + py);
            if (x) ctx.lineTo(x, y); else ctx.moveTo(x, y);
          }
          ctx.stroke();
        }
      }
      function clear() { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h); ctx.lineWidth = 0.75; }
      function draw() { clear(); for (var i = 0; i < 24; i++) curve(i); if (big) band(); }
      // Primer dibujo en tandas de 4 curvas por fotograma: la página no se queda esperando
      function drawSoft() {
        cancelAnimationFrame(job); clear(); var i = 0;
        (function step() { var end = Math.min(24, i + 4); for (; i < end; i++) curve(i); if (i < 24) job = requestAnimationFrame(step); else if (big) band(); })();
      }
      // Medidas: se toman cuando el navegador ya ha colocado la página (sin forzarle a recalcular)
      function measure() {
        var b = box.getBoundingClientRect(); if (!b.width) return;
        var f = focus && focus.getBoundingClientRect();
        // En pantallas táctiles, a resolución normal: son líneas muy tenues y así pesa la mitad
        dpr = fine ? Math.min(window.devicePixelRatio || 1, 2) : 1; w = b.width; h = b.height;
        cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
        if (f && f.width) { cx = f.left - b.left + f.width / 2; cy = f.top - b.top + f.height / 2; R = Math.min(Math.hypot(f.width, f.height) / 2 + (big ? 30 : 18), 460); }
        else { cx = w * 0.8; cy = h * 0.45; R = Math.min(h * 0.55, 240); }
        if (small) { cx = w - 170; cy = Math.min(h * 0.4, 190); R = Math.min(h * 0.38, 140); }
        drawSoft();
      }
      if ('ResizeObserver' in window) {
        var lw = 0, lh = 0;
        new ResizeObserver(function (es) {
          var r = es[0].contentRect;
          if (Math.abs(r.width - lw) < 1 && Math.abs(r.height - lh) < 1) return;
          lw = r.width; lh = r.height; measure();
        }).observe(box);
      } else window.addEventListener('load', measure);
      if (calm || !fine) return;
      function loop() {
        raf = 0; ph += (tph - ph) * 0.08; py += (tpy - py) * 0.08; draw();
        if (Math.abs(tph - ph) + Math.abs(tpy - py) > 0.002) raf = requestAnimationFrame(loop);
      }
      box.addEventListener('pointermove', function (e) {
        if (!w || (e.pointerType && e.pointerType !== 'mouse')) return;
        var b = box.getBoundingClientRect();
        tph = ((e.clientX - b.left) / b.width - 0.5) * 2.4; tpy = ((e.clientY - b.top) / b.height - 0.5) * 2;
        if (!raf) { cancelAnimationFrame(job); raf = requestAnimationFrame(loop); }
      }, { passive: true });
    });
  }

  // Fotos que se revelan: llegan en sepia y toman color al entrar en pantalla, como en el cuarto oscuro
  function initDevelop() {
    var fotos = $$('.jm-story__media, .jm-life__media, .jm-pagehead__media, .jm-tile__media, .jm-post__hero, .jm-nl__media');
    if (!fotos.length) return;
    if (calm || !('IntersectionObserver' in window)) { fotos.forEach(function (f) { f.classList.add('is-dev'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-dev'); io.unobserve(e.target); } });
    }, { threshold: 0.3 });
    fotos.forEach(function (f) { io.observe(f); });
    window.addEventListener('beforeprint', function () { fotos.forEach(function (f) { f.classList.add('is-dev'); }); });
  }

  // En el móvil, las tarjetas se hunden un poco al tocarlas (Safari solo lo muestra si la página escucha los toques)
  function initPress() {
    if (!fine) document.addEventListener('touchstart', function () {}, { passive: true });
  }

  // Al abrir una guía desde su tarjeta, la foto viaja hasta la cabecera de la guía
  // (navegadores con transiciones entre páginas; en el resto se navega como siempre)
  function initMorph() {
    if (calm || !('onpageswap' in window)) return;
    var CARD = '.jm-story, .jm-cajon, .jm-card, .jm-life__card', named = [];
    function reset() { named.forEach(function (el) { el.style.viewTransitionName = ''; }); named = []; }
    window.addEventListener('pageswap', function (e) {
      reset();
      if (!e.viewTransition || !e.activation || !e.activation.entry) return;
      var url = e.activation.entry.url.split('#')[0], hero = $('.jm-post__hero img');
      if (hero) { hero.style.viewTransitionName = 'none'; named.push(hero); }
      var link = $$('a[href]').filter(function (a) { return a.href.split('#')[0] === url && a.closest(CARD) && $('img', a.closest(CARD)); })[0];
      if (!link) return;
      var img = $('img', link.closest(CARD)), r = img.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= window.innerHeight) return;
      img.style.viewTransitionName = 'jm-foto'; named.push(img);
    });
    window.addEventListener('pageshow', function (e) { if (e.persisted) reset(); });
  }

  // Los bloques que aún no se ven aparecen al llegar a ellos (lo visible al cargar no se toca).
  // La primera respuesta del observador dice qué está fuera de pantalla, sin obligar al navegador a medir la página.
  function initReveal() {
    if (calm || !('IntersectionObserver' in window)) return;
    var sel = '.jm-figures__head, .jm-rail__head, .jm-duo__head, .jm-rail__grid > .jm-story, .jm-rail__list > .jm-story, .jm-mostread .jm-ledger, .jm-upcoming__box, .jm-toolband__copy, .jm-passbook, .jm-section-head, .jm-life__card, .jm-tile, .jm-updates__intro, .jm-timeline > li, .jm-method > *, .jm-nl, .jm-authorbox, .jm-post__foot .jm-story, .jm-cajonera > *, .jm-front__latest > .jm-ledger, .jm-saldo__row, .jm-temas__top, .jm-tema, .jm-card, .jm-principles > li, .jm-next';
    var els = $$(sel);
    if (!els.length) return;
    var pending = [], timer = 0;
    function show(el) {
      var k = pending.indexOf(el);
      if (k < 0) return;
      pending.splice(k, 1); io.unobserve(el);
      var d = parseInt(el.style.getPropertyValue('--rv-d'), 10) || 0;
      el.classList.add('is-in');
      // Al terminar, se retiran las clases para no frenar la inclinación ni otros efectos
      setTimeout(function () { el.classList.remove('jm-rv', 'is-in'); el.style.removeProperty('--rv-d'); }, 1150 + d);
    }
    var io = new IntersectionObserver(function (entries) {
      var h = window.innerHeight;
      entries.forEach(function (en) {
        var el = en.target;
        if (!el.jmSeen) {
          el.jmSeen = true;
          var b = en.boundingClientRect, skipped = !b.width && !b.height; // sección aún sin maquetar (content-visibility)
          // Visible (o ya pasado) al cargar: se queda como está
          if (en.isIntersecting || (!skipped && b.top < h)) { io.unobserve(el); return; }
          var i = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
          el.style.setProperty('--rv-d', Math.min(i, 5) * 70 + 'ms');
          el.classList.add('jm-rv');
          pending.push(el);
          return;
        }
        if (en.isIntersecting) show(el);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });
    els.forEach(function (el) { io.observe(el); });
    // Red de seguridad: si el observador no avisa, lo que ya está en pantalla (o se ha pasado) se muestra igual
    // (las secciones que el navegador aún no ha maquetado se saltan: preguntar por ellas obligaría a maquetarlas)
    function sweep() {
      timer = 0; var h = window.innerHeight;
      pending.slice().forEach(function (el) {
        if (el.checkVisibility && !el.checkVisibility({ contentVisibilityAuto: true })) return;
        var r = el.getBoundingClientRect();
        if ((r.width || r.height) && r.top < h) show(el);
      });
    }
    window.addEventListener('scroll', function () { if (pending.length && !timer) timer = setTimeout(sweep, 120); }, { passive: true });
    // Al imprimir, todo visible
    window.addEventListener('beforeprint', function () { pending.slice().forEach(show); });
  }

  // El saldo de 2026: las cifras ruedan como un contador al llegar a ellas.
  // Al terminar se devuelve el HTML original (el texto nunca cambia: sin efecto en Google ni en lectores de pantalla).
  function initRoll() {
    var box = $('.jm-saldo');
    if (calm || !box || !('IntersectionObserver' in window)) return;
    var first = new IntersectionObserver(function (e) {
      first.disconnect();
      var b = e[0].boundingClientRect, skipped = !b.width && !b.height; // aún sin maquetar: está más abajo
      if (e[0].isIntersecting || (!skipped && b.top < window.innerHeight)) return; // ya se ve: quieto
      armRoll(box);
    });
    first.observe(box);
  }
  function armRoll(box) {
    var vals = $$('.jm-saldo__v', box), orig = vals.map(function (v) { return v.innerHTML; });
    vals.forEach(function (v, r) {
      var i = 0, texts = [], w = document.createTreeWalker(v, 4, null), t;
      v.style.setProperty('--r', r);
      while ((t = w.nextNode())) { if (t.nodeValue.trim()) texts.push(t); }
      texts.forEach(function (tn) {
        var frag = document.createDocumentFragment();
        tn.nodeValue.split('').forEach(function (ch) {
          if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); return; }
          var s = document.createElement('span'); s.className = 'jm-ch'; s.style.setProperty('--i', i++); s.textContent = ch; frag.appendChild(s);
        });
        tn.parentNode.replaceChild(frag, tn);
      });
    });
    box.classList.add('is-armed');
    var io = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return;
      io.disconnect(); box.classList.add('is-rolled');
      setTimeout(function () { vals.forEach(function (v, k) { v.innerHTML = orig[k]; }); box.classList.remove('is-armed', 'is-rolled'); }, 2200);
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(box);
  }

  /* ---------- Herramientas de lectura (guías) ---------- */
  // Tamaño de letra: normal, grande o muy grande. Se recuerda en este navegador.
  function initFontSize() {
    var btns = $$('[data-jm-fs-set]'); if (!btns.length) return;
    var root = document.documentElement;
    function paint() { var cur = root.getAttribute('data-jm-fs') || ''; btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-jm-fs-set') === cur)); }); }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-jm-fs-set');
        if (v) root.setAttribute('data-jm-fs', v); else root.removeAttribute('data-jm-fs');
        try { if (v) localStorage.setItem('jm_fs', v); else localStorage.removeItem('jm_fs'); } catch (e) { /* sin almacenamiento */ }
        paint();
      });
    });
    paint();
  }

  // Escuchar la guía: lectura en voz alta (voz en español del propio dispositivo), resaltando el párrafo.
  // Se lee frase a frase: así no se corta en los navegadores que detienen las lecturas largas.
  function initListen() {
    var btn = $('[data-jm-listen]'), stopBtn = $('[data-jm-listen-stop]'), prose = $('.jm-prose');
    if (!btn) return;
    // El botón viene visible (sin saltos al cargar); solo se retira si el navegador no sabe leer en voz alta
    if (!stopBtn || !prose || !('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance === 'undefined') { btn.hidden = true; return; }
    var synth = window.speechSynthesis, voice = null, blocks = [], bi = 0, parts = [], pi = 0, state = 'idle', current = null;
    var label = $('span', btn), icon = $('use', btn);
    function pickVoice() {
      var vs = synth.getVoices() || [];
      voice = vs.filter(function (v) { return /^es[-_]ES/i.test(v.lang); })[0] || vs.filter(function (v) { return /^es/i.test(v.lang); })[0] || null;
    }
    pickVoice();
    if ('onvoiceschanged' in synth) synth.addEventListener('voiceschanged', pickVoice);
    btn.hidden = false;
    function ui(s) {
      state = s;
      label.textContent = s === 'playing' ? 'Pausar' : s === 'paused' ? 'Seguir escuchando' : 'Escuchar la guía';
      if (icon) icon.setAttribute('href', s === 'playing' ? '#i-pause' : '#i-volume');
      btn.setAttribute('aria-pressed', String(s === 'playing'));
      stopBtn.hidden = s === 'idle';
    }
    function mark(el) {
      if (current) current.classList.remove('is-speaking');
      current = el;
      if (!el) return;
      el.classList.add('is-speaking');
      var r = el.getBoundingClientRect();
      if (r.top < 90 || r.bottom > window.innerHeight - 40) el.scrollIntoView({ block: 'center', behavior: calm ? 'auto' : 'smooth' });
    }
    function collect() {
      var head = $$('.jm-post__title h1, .jm-post__dek');
      blocks = head.concat($$('h2, h3, p, li, .jm-answer__title', prose).filter(function (el) {
        return el.offsetParent !== null && el.textContent.trim().length > 1 && !el.closest('table, .jm-toc, .jm-sources, .jm-ad, .jm-faq, .jm-share, figure, .jm-calc-cta, li li');
      }));
    }
    // Frases: se corta solo en un signo seguido de espacio (así «3.359,60 €» o «2,81 %» se leen enteros);
    // las frases muy largas se parten en las comas.
    function sentences(t) {
      var s = t.replace(/\s+/g, ' ').trim(), out = [], re = /[.!?;:]\s+/g, last = 0, m;
      while ((m = re.exec(s))) { out.push(s.slice(last, m.index + 1)); last = re.lastIndex; }
      out.push(s.slice(last));
      var res = [];
      out.forEach(function (x) {
        x = x.trim(); if (!x) return;
        while (x.length > 220) {
          var cut = x.lastIndexOf(', ', 200);
          if (cut < 60) break;
          res.push(x.slice(0, cut + 1)); x = x.slice(cut + 2);
        }
        res.push(x);
      });
      return res;
    }
    function next() {
      if (state !== 'playing') return;
      if (pi >= parts.length) {
        bi++; pi = 0;
        if (bi >= blocks.length) { stop(); return; }
        parts = sentences(blocks[bi].textContent); mark(blocks[bi]);
      }
      var u = new window.SpeechSynthesisUtterance(parts[pi]);
      u.lang = 'es-ES'; if (voice) u.voice = voice; u.rate = 0.95;
      u.onend = function () { pi++; next(); };
      u.onerror = function (e) { if (e.error !== 'interrupted' && e.error !== 'canceled') { pi++; next(); } };
      synth.speak(u);
    }
    function play() {
      if (!blocks.length) collect();
      if (!blocks.length) return;
      if (state === 'idle') { bi = 0; pi = 0; }
      parts = sentences(blocks[bi].textContent); mark(blocks[bi]);
      synth.cancel(); ui('playing'); next();
    }
    function pause() { ui('paused'); synth.cancel(); }
    function stop() { synth.cancel(); ui('idle'); bi = 0; pi = 0; mark(null); }
    btn.addEventListener('click', function () { if (state === 'playing') pause(); else play(); });
    stopBtn.addEventListener('click', stop);
    window.addEventListener('pagehide', function () { synth.cancel(); });
  }

  // Imprimir la guía (con una hoja limpia: sin menús, anuncios ni botones)
  function initPrint() {
    $$('[data-jm-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });
    // En papel, las preguntas frecuentes salen desplegadas; al terminar vuelven como estaban
    var opened = [];
    window.addEventListener('beforeprint', function () { opened = $$('.jm-prose details:not([open])'); opened.forEach(function (d) { d.open = true; }); });
    window.addEventListener('afterprint', function () { opened.forEach(function (d) { d.open = false; }); opened = []; });
  }

  /* ---------- Buscador instantáneo: resultados mientras escribes ---------- */
  function initLiveSearch() {
    var inputs = $$('#jm-s, #mast-s'); if (!inputs.length || !window.fetch) return;
    var index = null, loading = null;
    var norm = function (s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
    function load() {
      if (index) return Promise.resolve(index);
      if (!loading) {
        loading = fetch('/wp-json/jm/v1/indice', { credentials: 'omit' }).then(function (r) { return r.ok ? r.json() : []; }).then(function (d) {
          index = (d || []).map(function (x) { x.h = norm(x.t + ' ' + x.c + ' ' + x.e); x.ht = norm(x.t); return x; });
          return index;
        }).catch(function () { index = []; return index; });
      }
      return loading;
    }
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    // Resalta las palabras buscadas (sin tildes ni mayúsculas) marcando tramos del título original
    function hl(t, words) {
      var n = norm(t), marks = [], out = '', pos = 0;
      if (n.length !== t.length) return esc(t);
      words.forEach(function (w) { if (w.length < 2) return; var k = n.indexOf(w); if (k > -1) marks.push([k, k + w.length]); });
      marks.sort(function (a, b) { return a[0] - b[0]; }).forEach(function (m) {
        if (m[0] < pos) return;
        out += esc(t.slice(pos, m[0])) + '<mark>' + esc(t.slice(m[0], m[1])) + '</mark>';
        pos = m[1];
      });
      return out + esc(t.slice(pos));
    }
    inputs.forEach(function (input) {
      var form = input.form; if (!form) return;
      var box = document.createElement('div');
      box.className = 'jm-sugg' + (input.id === 'mast-s' ? ' jm-sugg--drop' : '');
      box.id = input.id + '-res'; box.hidden = true;
      box.setAttribute('role', 'listbox'); box.setAttribute('aria-label', 'Resultados');
      form.parentNode.insertBefore(box, form.nextSibling);
      var status = document.createElement('p'); status.className = 'jm-sr'; status.setAttribute('aria-live', 'polite');
      box.parentNode.insertBefore(status, box.nextSibling);
      input.setAttribute('aria-controls', box.id); input.setAttribute('aria-autocomplete', 'list');
      var t = 0, active = -1;
      function links() { return $$('a', box); }
      function move(d) {
        var ls = links(); if (!ls.length) return;
        active = (active + d + ls.length) % ls.length;
        ls.forEach(function (a, i) { a.classList.toggle('is-active', i === active); a.setAttribute('aria-selected', String(i === active)); });
        ls[active].scrollIntoView({ block: 'nearest' });
      }
      function render() {
        var q = norm(input.value).trim();
        active = -1;
        if (q.length < 2) { box.hidden = true; box.innerHTML = ''; status.textContent = ''; return; }
        load().then(function (ix) {
          var words = q.split(/\s+/).filter(Boolean);
          var res = ix.map(function (x) {
            var s = 0;
            for (var i = 0; i < words.length; i++) {
              var w = words[i];
              if (x.h.indexOf(w) < 0) return null;
              s += x.ht.indexOf(w) === 0 ? 6 : x.ht.indexOf(' ' + w) >= 0 ? 4 : x.ht.indexOf(w) >= 0 ? 3 : 1;
            }
            if (x.k === 'calc') s += 0.5;
            return { x: x, s: s };
          }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).slice(0, 7);
          if (!res.length) {
            box.innerHTML = '<p class="jm-sugg__none">No hay guías con esas palabras. Pulsa <b>Buscar</b> para buscar en toda la web.</p>';
            status.textContent = 'Sin resultados';
          } else {
            box.innerHTML = res.map(function (r) {
              var x = r.x, meta = esc(x.c);
              return '<a role="option" aria-selected="false" href="' + esc(x.u) + '"><span class="jm-sugg__t">' + hl(x.t, words) + '</span><span class="jm-sugg__m">' + meta + '</span></a>';
            }).join('') + '<button type="button" class="jm-sugg__all">Ver todos los resultados de «' + esc(input.value.trim()) + '»</button>';
            status.textContent = res.length + (res.length === 1 ? ' resultado' : ' resultados');
          }
          box.hidden = false;
          var all = $('.jm-sugg__all', box);
          if (all) all.addEventListener('click', function (e) { e.preventDefault(); form.submit(); });
        });
      }
      input.addEventListener('focus', load, { once: true });
      input.addEventListener('input', function () { clearTimeout(t); t = setTimeout(render, 110); });
      input.addEventListener('keydown', function (e) {
        if (box.hidden) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
        else if (e.key === 'Enter' && active > -1) { e.preventDefault(); links()[active].click(); }
        else if (e.key === 'Escape' && input.id === 'mast-s') { box.hidden = true; }
      });
      document.addEventListener('click', function (e) { if (input.id === 'mast-s' && !box.contains(e.target) && e.target !== input) box.hidden = true; });
    });
  }

  function init() { [initResume, initHeader, initDrawer, initSearch, initForms, initCookies, initDatos, initToc, initProgress, initShare, initCopyCode, initViews, initReveal, initRoll, initTilt, initStage, initGuilloche, initDevelop, initPress, initMorph, initFontSize, initListen, initPrint, initLiveSearch].forEach(safe); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
