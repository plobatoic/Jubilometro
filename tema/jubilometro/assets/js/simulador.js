/* ==========================================================================
   JUBILÓMETRO · Simulador de jubilación animado
   - Usa el motor de calculadoras.js (window.JM): ninguna cifra legal vive aquí.
   - Todo el texto está siempre visible; se animan las cifras, la cinta, el
     gráfico y lo que tocas. Con «reducir movimiento», todo es instantáneo.
   - Los datos no salen del navegador: el enlace para compartir los lleva en el #.
   ========================================================================== */
(function () {
  'use strict';
  var J = window.JM, root = document.querySelector('[data-jm-sim]');
  if (!J || !root) return;

  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SVGNS = 'http://www.w3.org/2000/svg';
  var C = { ink: '#0F1B2D', muted: '#4A5568', line: '#D8E0EA', rule: '#E3E9F1', blue: '#1D4ED8', orange: '#C2410C', wash: '#EEF4FF' };
  var $ = function (s, c) { return (c || root).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || root).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var eur = function (n) { return J.eur(n); };
  var eur0 = function (n) { return J.num(Math.round(n), 0) + ' €'; };
  var pc = function (n) { return J.num(n, 2) + ' %'; };
  var edadTxt = function (m) { return J.edadTxt(Math.round(m)); };

  /* ---------- 1. Muelles: un solo bucle para todo lo que se mueve -------- */
  var active = [], last = 0, raf = 0;
  function frame(t) {
    var dt = last ? Math.min((t - last) / 1000, 1 / 30) : 1 / 60; last = t;
    active = active.filter(function (s) { return s.step(dt); });
    raf = active.length ? requestAnimationFrame(frame) : 0;
    if (!raf) last = 0;
  }
  function Spring(apply, eps) { this.x = null; this.v = 0; this.t = 0; this.apply = apply; this.eps = eps || 0.004; }
  Spring.prototype.to = function (t) {
    if (this.x === null || RM || !isFinite(this.x)) { this.x = this.t = t; this.v = 0; this.apply(t); return; }
    if (t === this.t && active.indexOf(this) >= 0) return;
    this.t = t;
    if (active.indexOf(this) < 0) active.push(this);
    if (!raf) raf = requestAnimationFrame(frame);
  };
  Spring.prototype.step = function (dt) {
    var a = -170 * (this.x - this.t) - 26 * this.v;           // k 170, c 26: amortiguación crítica, sin rebote
    this.v += a * dt; this.x += this.v * dt;
    var done = Math.abs(this.x - this.t) < this.eps * Math.max(1, Math.abs(this.t) / 100) && Math.abs(this.v) < this.eps * 10;
    if (done) { this.x = this.t; this.v = 0; }
    this.apply(this.x);
    return !done;
  };

  // Cifras que cuentan hasta su valor nuevo (todas las que lleven data-sim="clave")
  var nums = {};
  function numEls(key, fmt) {
    if (nums[key]) return nums[key];
    nums[key] = $$('[data-sim="' + key + '"]').map(function (el) {
      return new Spring(function (x) { el.textContent = fmt(x); }, 0.002);
    });
    return nums[key];
  }
  function setNum(key, val, fmt) { numEls(key, fmt).forEach(function (s) { s.to(val); }); }
  function setTxt(key, txt) {
    $$('[data-sim="' + key + '"]').forEach(function (el) {
      if (el.textContent === txt) return;
      el.textContent = txt;
      if (!RM && el.animate) el.animate([{ opacity: 0.25, transform: 'translateY(.25em)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' });
    });
  }
  function setHtml(key, html) { $$('[data-sim="' + key + '"]').forEach(function (el) { if (el.innerHTML !== html) el.innerHTML = html; }); }
  function show(key, on) { $$('[data-sim-if="' + key + '"]').forEach(function (el) { el.hidden = !on; }); }

  /* ---------- 2. Datos del formulario y del enlace compartido ----------- */
  var form = $('[data-sim-form]');
  var S = { tipo: 'voluntaria', off: 0 };
  function readForm() {
    var g = function (n) { var el = form.elements[n]; return el ? el.value : ''; };
    S.nacMes = clamp(parseInt(g('nacMes'), 10) || 1, 1, 12);
    S.nacAnio = clamp(parseInt(g('nacAnio'), 10) || 1965, 1940, 2010);
    S.cotAnios = clamp(parseInt(g('cotAnios'), 10) || 0, 0, 55);
    S.cotMeses = clamp(parseInt(g('cotMeses'), 10) || 0, 0, 11);
    S.base = clamp(parseFloat(String(g('base')).replace(',', '.')) || 0, 0, 20000);
    S.ccaa = g('ccaa') || 'madrid';
    S.sigue = form.elements.sigue ? form.elements.sigue.checked : true;
  }
  function writeForm() {
    var set = function (n, v) { var el = form.elements[n]; if (el) el.value = v; };
    set('nacMes', S.nacMes); set('nacAnio', S.nacAnio); set('cotAnios', S.cotAnios); set('cotMeses', S.cotMeses);
    set('base', S.base); set('ccaa', S.ccaa);
    if (form.elements.sigue) form.elements.sigue.checked = S.sigue;
  }
  function toHash() {
    return 'n=' + S.nacAnio + '-' + S.nacMes + '&c=' + S.cotAnios + '-' + S.cotMeses + '&b=' + Math.round(S.base) +
      '&r=' + S.ccaa + '&s=' + (S.sigue ? 1 : 0) + '&t=' + (S.tipo === 'involuntaria' ? 'i' : 'v') + '&e=' + S.off;
  }
  function fromHash() {
    var h = location.hash.replace(/^#/, ''); if (h.indexOf('n=') < 0) return false;
    readForm();                                   // lo que no venga en el enlace se queda como en el formulario
    var p = {}; h.split('&').forEach(function (kv) { var i = kv.indexOf('='); if (i > 0) p[kv.slice(0, i)] = decodeURIComponent(kv.slice(i + 1)); });
    var n = (p.n || '').split('-'), c = (p.c || '').split('-');
    if (n.length === 2) { S.nacAnio = clamp(+n[0] || 1965, 1940, 2010); S.nacMes = clamp(+n[1] || 1, 1, 12); }
    if (c.length === 2) { S.cotAnios = clamp(+c[0] || 0, 0, 55); S.cotMeses = clamp(+c[1] || 0, 0, 11); }
    if (p.b) S.base = clamp(+p.b || 0, 0, 20000);
    if (p.r && J.CCAA[p.r]) S.ccaa = p.r;
    if (p.s) S.sigue = p.s !== '0';
    S.tipo = p.t === 'i' ? 'involuntaria' : 'voluntaria';
    S.off = clamp(parseInt(p.e, 10) || 0, -48, 60);
    return true;
  }

  /* ---------- 3. Modelo: todo sale de JM ---------------------------------- */
  function model() {
    var hoy = new Date(), now = hoy.getFullYear() * 12 + hoy.getMonth();
    var nac = S.nacAnio * 12 + (S.nacMes - 1), cotNow = S.cotAnios * 12 + S.cotMeses, edadHoy = now - nac;
    var M = { now: now, nac: nac, cotNow: cotNow, edadHoy: edadHoy, hoy: hoy };
    if (edadHoy < 16 * 12) { M.error = 'Con esa fecha de nacimiento aún no tienes 16 años: revisa el año.'; return M; }
    if (cotNow > edadHoy - 14 * 12) { M.error = 'Has puesto más años cotizados de los que caben desde los 16 años: revisa los datos.'; return M; }
    var e = J.edad({ nacAnio: S.nacAnio, nacMes: S.nacMes, cotAnios: S.cotAnios, cotMeses: S.cotMeses, sigue: S.sigue, hoy: hoy });
    if (!e) { M.error = 'No hemos podido calcular tu edad de jubilación con esos datos.'; return M; }
    M.e = e; M.ord = e.mes; M.ya = e.mes <= now;
    M.cotEn = function (m) { return m >= now ? cotNow + (S.sigue ? m - now : 0) : cotNow - (now - m); };
    M.baseUsada = clamp(S.base, J.CFG.baseMinima, J.CFG.baseMaxima);
    M.at = function (m) { return pensionAt(M, m); };
    M.P0 = M.at(Math.max(M.ord, now));
    // Margen del deslizador: la anticipada más temprana posible y hasta 5 años de demora
    var desde = Math.max(now, M.ord - (S.tipo === 'involuntaria' ? 48 : 24)), min = null;
    for (var k = desde; k <= M.ord; k++) { if (M.cotEn(k) >= (S.tipo === 'involuntaria' ? 396 : 420)) { min = k; break; } }
    M.min = min === null ? Math.max(now, M.ord) : min;
    M.max = Math.max(now, M.ord) + 60;
    M.base0 = Math.max(M.ord, now);
    M.elegido = clamp(M.base0 + S.off, M.min, M.max);
    M.E = M.at(M.elegido);
    return M;
  }
  function pensionAt(M, m) {
    var cot = M.cotEn(m), anio = Math.floor(m / 12);
    if (cot < 180) return { sin: true, cot: cot, final: 0, m: m };
    var P = J.pension({ anio: anio, base: M.baseUsada, cotAnios: cot / 12 });
    var teor = P.br * P.porcentaje / 100, max = J.CFG.pensionMax, r = { m: m, cot: cot, P: P, teor: teor, edad: m - M.nac };
    if (m < M.ord) {
      var a = J.anticipada({ tipo: S.tipo, meses: M.ord - m, cotAnios: Math.floor(cot / 12), cotMeses: cot % 12, pension: teor, familia: 'sin' });
      r.final = a.final; r.coef = a.sobreMax ? a.coefMax : a.coef; r.tipo = 'anticipada'; r.superaMin = a.superaMin; r.minimo = a.minimo; r.sobreMax = a.sobreMax;
    } else if (m > M.ord) {
      var d = m - M.ord, dm = J.demorada({ pension: teor, anios: Math.floor(d / 12), meses: d % 12 });
      r.extra = dm.extra; r.final = Math.min(dm.nueva, max); r.sobreMax = dm.nueva > max; r.tipo = 'demorada';
    } else { r.final = Math.min(teor, max); r.sobreMax = teor > max; r.tipo = 'ordinaria'; }
    return r;
  }

  /* ---------- 4. Capítulo 1: cuándo ------------------------------------- */
  function viaTxt(M) {
    var e = M.e, req = e.req, anio = Math.floor(e.mes / 12);
    if (e.via === 'larga') return 'Te jubilas a los 65 porque en ' + anio + ' tendrás ' + durTxt(e.cot) + ' cotizados, y la ley pide ' + durTxt(req[0]) + ' para no tener que esperar más.';
    return 'En ' + anio + ' la ley pide ' + durTxt(req[0]) + ' cotizados para jubilarse a los 65. Llegarás con ' + durTxt(e.cot) + ', así que tu edad es la general: ' + J.edadTxt(req[1]) + '.';
  }
  function durTxt(meses) {
    var a = Math.floor(meses / 12), m = meses % 12, mt = m + (m === 1 ? ' mes' : ' meses');
    if (!a) return mt;
    return a + (a === 1 ? ' año' : ' años') + (m ? ' y ' + mt : '');
  }

  // Cuenta atrás: tablillas que giran (decorativas) y la frase de texto (la que se lee)
  var flap = $('[data-sim-flap]'), flapCells = {}, target = null, tick = 0, flapVisible = true, paused = false;
  function buildFlap() {
    if (!flap || flap.childElementCount) return;
    [['y', 'años'], ['mo', 'meses'], ['d', 'días'], ['h', 'horas'], ['mi', 'min'], ['s', 'seg']].forEach(function (u, i) {
      var g = document.createElement('span'); g.className = 'jm-sim-flap__unit' + (i > 2 ? ' jm-sim-flap__unit--clock' : '');
      var digits = document.createElement('span'); digits.className = 'jm-sim-flap__digits';
      flapCells[u[0]] = [0, 1].map(function () { var d = document.createElement('span'); d.className = 'jm-sim-flap__d'; d.textContent = '0'; digits.appendChild(d); return d; });
      var lab = document.createElement('span'); lab.className = 'jm-sim-flap__lab'; lab.textContent = u[1];
      g.appendChild(digits); g.appendChild(lab); flap.appendChild(g);
    });
  }
  function diff(a, b) {
    if (b <= a) return null;
    var y = b.getFullYear() - a.getFullYear(), d = new Date(a.getTime());
    d.setFullYear(a.getFullYear() + y); if (d > b) { y--; d.setFullYear(a.getFullYear() + y); }
    var mo = 0; while (true) { var t = new Date(d.getTime()); t.setMonth(d.getMonth() + 1); if (t > b) break; d = t; mo++; }
    var ms = b - d, days = Math.floor(ms / 864e5); ms -= days * 864e5;
    return { y: y, mo: mo, d: days, h: Math.floor(ms / 36e5), mi: Math.floor(ms % 36e5 / 6e4), s: Math.floor(ms % 6e4 / 1e3) };
  }
  function paintClock() {
    if (!target) return;
    var r = diff(new Date(), target);
    if (!r) { setTxt('faltan', 'Ya has llegado a tu edad de jubilación.'); return; }
    var parts = [];
    if (r.y) parts.push(r.y + (r.y === 1 ? ' año' : ' años'));
    if (r.mo) parts.push(r.mo + (r.mo === 1 ? ' mes' : ' meses'));
    parts.push(r.d + (r.d === 1 ? ' día' : ' días'));
    setTxtQuiet('faltan', 'Faltan ' + (parts.length > 1 ? parts.slice(0, -1).join(', ') + ' y ' + parts[parts.length - 1] : parts[0]) + '.');
    if (!flap) return;
    Object.keys(flapCells).forEach(function (k) {
      var v = String(Math.min(99, r[k])).padStart(2, '0');
      flapCells[k].forEach(function (cell, i) {
        if (cell.textContent === v[i]) return;
        cell.textContent = v[i];
        if (!RM && cell.animate) cell.animate([{ transform: 'perspective(240px) rotateX(-88deg)', opacity: 0.6 }, { transform: 'perspective(240px) rotateX(0)', opacity: 1 }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
      });
    });
  }
  function setTxtQuiet(key, txt) { $$('[data-sim="' + key + '"]').forEach(function (el) { if (el.textContent !== txt) el.textContent = txt; }); }
  function runClock() {
    clearInterval(tick);
    paintClock();
    if (!document.hidden && flapVisible && !paused && target > new Date()) tick = setInterval(paintClock, 1000);
  }
  document.addEventListener('visibilitychange', runClock);
  if (flap && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { flapVisible = es[0].isIntersecting; runClock(); }).observe(flap);
  }

  /* ---------- 5. La cinta de la vida laboral (SVG persistente) ---------- */
  function Ribbon(box) {
    this.box = box; this.w = 0; this.drawn = false;
    var self = this;
    this.sp = {};
    ['c0', 'now', 'ord'].forEach(function (k) { self.sp[k] = new Spring(function () { self.paint(); }, 0.001); });
    this.v = {};
  }
  Ribbon.prototype.X = function (edad) { var p = 26, w = this.w; return p + (edad - 16) / (90 - 16) * (w - 2 * p); };
  Ribbon.prototype.build = function () {
    var w = Math.round(this.box.clientWidth); if (!w || w === this.w) return false;
    this.w = w;
    var H = 132, y = 72, ticks = '';
    for (var a = 20; a <= 90; a += 10) ticks += '<line x1="' + this.X(a) + '" x2="' + this.X(a) + '" y1="' + (y + 12) + '" y2="' + (y + 18) + '" stroke="' + C.line + '"/><text x="' + this.X(a) + '" y="' + (y + 34) + '" text-anchor="middle" class="jm-sim-life__tick">' + a + '</text>';
    this.box.innerHTML = '<svg width="' + w + '" height="' + H + '" viewBox="0 0 ' + w + ' ' + H + '" role="img" aria-labelledby="sim-life-cap">' +
      '<line x1="' + this.X(16) + '" x2="' + this.X(90) + '" y1="' + y + '" y2="' + y + '" stroke="' + C.rule + '" stroke-width="12" stroke-linecap="round"/>' + ticks +
      '<rect class="jm-sim-life__jub" y="' + (y - 16) + '" height="32" rx="6" fill="' + C.wash + '"/>' +
      '<line class="jm-sim-life__seg jm-sim-life__seg--cot" y1="' + y + '" y2="' + y + '" stroke="' + C.ink + '" stroke-width="12" stroke-linecap="round"/>' +
      '<line class="jm-sim-life__seg jm-sim-life__seg--fut" y1="' + y + '" y2="' + y + '" stroke="' + C.blue + '" stroke-width="12" stroke-linecap="round"/>' +
      '<text class="jm-sim-life__lab jm-sim-life__lab--cot" y="' + (y + 52) + '" text-anchor="middle"></text>' +
      '<g class="jm-sim-life__now"><circle class="jm-sim-life__pulse" r="9" cy="' + y + '" fill="' + C.blue + '" opacity=".35"/><circle r="7" cy="' + y + '" fill="#fff" stroke="' + C.ink + '" stroke-width="3"/><text y="' + (y - 18) + '" text-anchor="middle" class="jm-sim-life__lab jm-sim-life__lab--now"></text></g>' +
      '<g class="jm-sim-life__ord"><line y1="' + (y - 44) + '" y2="' + (y - 8) + '" stroke="' + C.blue + '" stroke-width="2"/><circle r="9" cy="' + y + '" fill="' + C.blue + '" stroke="#fff" stroke-width="3"/><text y="' + (y - 50) + '" text-anchor="middle" class="jm-sim-life__lab jm-sim-life__lab--ord"></text></g>' +
      '</svg>';
    this.el = {
      jub: this.box.querySelector('.jm-sim-life__jub'), cot: this.box.querySelector('.jm-sim-life__seg--cot'), fut: this.box.querySelector('.jm-sim-life__seg--fut'),
      labCot: this.box.querySelector('.jm-sim-life__lab--cot'), now: this.box.querySelector('.jm-sim-life__now'), labNow: this.box.querySelector('.jm-sim-life__lab--now'),
      ord: this.box.querySelector('.jm-sim-life__ord'), labOrd: this.box.querySelector('.jm-sim-life__lab--ord')
    };
    return true;
  };
  Ribbon.prototype.set = function (M) {
    this.v = { sigue: S.sigue, ya: M.ya, cotTxt: durTxt(M.cotNow) + ' cotizados', nowTxt: 'Hoy · ' + Math.floor(M.edadHoy / 12), ordTxt: (M.ya ? 'Ya puedes · ' : 'Jubilación · ') + Math.floor(M.e.edad / 12) + (M.e.edad % 12 ? ' y ' + (M.e.edad % 12) + ' m' : ' años') };
    var rebuilt = this.build();
    this.sp.c0.to((M.edadHoy - M.cotNow) / 12); this.sp.now.to(M.edadHoy / 12); this.sp.ord.to(M.e.edad / 12);
    if (rebuilt) this.paint();
    if (rebuilt && !this.drawn) this.drawIn();
  };
  Ribbon.prototype.paint = function () {
    if (!this.el) return;
    var e = this.el, c0 = this.sp.c0.x, now = this.sp.now.x, ord = this.sp.ord.x, X = this.X.bind(this), y = 72;
    e.cot.setAttribute('x1', X(c0)); e.cot.setAttribute('x2', X(now));
    e.fut.setAttribute('x1', X(now)); e.fut.setAttribute('x2', X(Math.max(now, ord)));
    e.fut.setAttribute('stroke-dasharray', this.v.sigue ? 'none' : '2 7');
    e.jub.setAttribute('x', X(ord) - 6); e.jub.setAttribute('width', Math.max(0, X(90) - X(ord) + 12));
    e.labCot.setAttribute('x', (X(c0) + X(now)) / 2); e.labCot.textContent = this.v.cotTxt;
    e.now.setAttribute('transform', 'translate(' + X(now) + ' 0)'); e.labNow.textContent = this.v.nowTxt;
    e.ord.setAttribute('transform', 'translate(' + X(ord) + ' 0)'); e.labOrd.textContent = this.v.ordTxt;
    // Las etiquetas no se salen por los bordes
    [e.labNow, e.labOrd, e.labCot].forEach(function (t) {
      t.setAttribute('dx', 0);
      var bb; try { bb = t.getBBox(); } catch (er) { return; }
      var ctm = t.getCTM(), x0 = bb.x + (ctm ? ctm.e : 0), x1 = x0 + bb.width, w = +t.ownerSVGElement.getAttribute('width');
      var dx = x0 < 4 ? 4 - x0 : x1 > w - 4 ? w - 4 - x1 : 0;
      t.setAttribute('dx', dx);
    });
    // «Hoy» va encima de la cinta salvo que choque con la jubilación; los años cotizados, debajo, si caben
    var close = Math.abs(X(ord) - X(now)) < 120, mid = (X(c0) + X(now)) / 2;
    e.labNow.setAttribute('y', close ? y + 52 : y - 18);
    var hideCot = X(now) - X(c0) < 150 || (close && X(now) - mid < 120);
    if (hideCot) e.labCot.setAttribute('visibility', 'hidden'); else e.labCot.removeAttribute('visibility');
  };
  Ribbon.prototype.drawIn = function () {
    this.drawn = true;
    if (RM || !this.box.animate) return;
    var svg = this.box.querySelector('svg'), self = this;
    function go() {
      [[self.el.cot, 0], [self.el.fut, 650]].forEach(function (p) {
        var L = Math.max(1, Math.abs(+p[0].getAttribute('x2') - +p[0].getAttribute('x1')));
        p[0].animate([{ strokeDasharray: L + ' ' + L, strokeDashoffset: L }, { strokeDasharray: L + ' ' + L, strokeDashoffset: 0 }], { duration: 650, delay: p[1], easing: 'cubic-bezier(.65,0,.35,1)', fill: 'backwards' });
      });
      self.el.jub.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: 1150, fill: 'backwards' });
      [self.el.now, self.el.ord].forEach(function (g, i) {
        g.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, delay: 500 + i * 800, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
      });
    }
    if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); go(); } }, { threshold: 0.4 }); io.observe(svg); } else go();
  };

  /* ---------- 6. Capítulo 3: el deslizador y el gráfico ------------------ */
  var range = $('[data-sim-range]'), bubble = $('[data-sim-bubble]'), marks = $('[data-sim-marks]');
  function paintRange(M) {
    if (!range) return;
    range.min = M.min - M.base0; range.max = M.max - M.base0; range.step = 1;
    range.value = M.elegido - M.base0;
    range.disabled = M.min === M.max;
    var p = (M.max === M.min) ? 0 : (M.elegido - M.min) / (M.max - M.min);
    range.style.setProperty('--p', (p * 100).toFixed(2) + '%');
    var o = (M.base0 - M.min) / Math.max(1, M.max - M.min);
    range.style.setProperty('--o', (o * 100).toFixed(2) + '%');
    range.setAttribute('aria-valuetext', edadTxt(M.E.edad) + ', ' + J.mesTxt(M.elegido) + ', ' + eur(M.E.final) + ' al mes');
    if (bubble) { bubble.textContent = edadTxt(M.E.edad); bubble.style.setProperty('--p', (p * 100).toFixed(2) + '%'); }
    if (marks) {
      var html = '', first = Math.ceil((M.min - M.nac) / 12), lastY = Math.floor((M.max - M.nac) / 12);
      for (var a = first; a <= lastY; a++) {
        var m = M.nac + a * 12, q = (m - M.min) / Math.max(1, M.max - M.min) * 100;
        html += '<span style="left:' + q.toFixed(2) + '%">' + a + '</span>';
      }
      html += '<b style="left:' + (o * 100).toFixed(2) + '%">' + (M.ya ? 'Hoy' : 'Ordinaria') + '</b>';
      if (marks.innerHTML !== html) marks.innerHTML = html;
    }
  }

  // Edad en la que lo cobrado en total con una opción alcanza a la otra (rectas que empiezan en s0 y s1)
  function cross(s0, a0, s1, a1) {
    if (Math.abs(a1 - a0) < 0.01 || Math.abs(s1 - s0) < 0.01) return null;
    var t = (a1 * s1 - a0 * s0) / (a1 - a0);
    return t > Math.max(s0, s1) && t < 90 ? t : null;
  }
  function Chart(box) {
    this.box = box; this.w = 0; var self = this;
    this.sp = { s: new Spring(function () { self.paint(); }, 0.0005), a: new Spring(function () { self.paint(); }, 0.002), top: new Spring(function () { self.paint(); }, 0.002) };
    this.hover = null;
  }
  Chart.prototype.build = function () {
    var w = Math.round(this.box.clientWidth); if (!w || w === this.w) return false;
    this.w = w; this.h = w < 520 ? 250 : 300;
    this.box.innerHTML = '<svg width="' + w + '" height="' + this.h + '" viewBox="0 0 ' + w + ' ' + this.h + '" role="img" aria-labelledby="sim-chart-cap" tabindex="0">' +
      '<g class="jm-sim-chart__grid"></g><g class="jm-sim-chart__axis"></g>' +
      '<path class="jm-sim-chart__area" fill="' + C.blue + '" fill-opacity=".1"/>' +
      '<path class="jm-sim-chart__ord" fill="none" stroke="' + C.orange + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path class="jm-sim-chart__sel" fill="none" stroke="' + C.blue + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<g class="jm-sim-chart__cross"><circle r="6" fill="#fff" stroke="' + C.ink + '" stroke-width="2"/></g>' +
      '<g class="jm-sim-chart__ends"></g>' +
      '<g class="jm-sim-chart__hover" visibility="hidden"><line stroke="' + C.muted + '" stroke-width="1"/><circle class="o" r="5" fill="' + C.orange + '" stroke="#fff" stroke-width="2"/><circle class="b" r="5" fill="' + C.blue + '" stroke="#fff" stroke-width="2"/></g>' +
      '</svg><span class="jm-sim-tip" data-sim-tip hidden></span>';
    var self = this, svg = this.box.querySelector('svg');
    var move = function (ev) { var r = svg.getBoundingClientRect(); self.hoverAt(((ev.touches ? ev.touches[0].clientX : ev.clientX) - r.left)); };
    svg.addEventListener('pointermove', move);
    svg.addEventListener('pointerdown', move);
    svg.addEventListener('pointerleave', function () { self.hover = null; self.tip(null); });
    svg.addEventListener('keydown', function (ev) {
      if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
      ev.preventDefault();
      var a = self.hover === null ? Math.round(self.x0) : self.hover + (ev.key === 'ArrowRight' ? 1 : -1);
      self.hover = clamp(a, Math.ceil(self.x0), 90); self.paint();
    });
    svg.addEventListener('blur', function () { self.hover = null; self.tip(null); });
    return true;
  };
  Chart.prototype.set = function (M) {
    var o = M.at(M.base0);
    this.M = M; this.ordStart = (M.base0 - M.nac) / 12; this.ordA = o.final * 14 / 12;
    this.x0 = (Math.min(M.min, M.base0) - M.nac) / 12;
    var selStart = (M.elegido - M.nac) / 12, selA = M.E.final * 14 / 12;
    var top = Math.max(this.ordA * 12 * (90 - this.ordStart), selA * 12 * (90 - selStart));
    this.crossAge = cross(this.ordStart, this.ordA, selStart, selA);
    var rebuilt = this.build();
    if (rebuilt) { this.sp.s.x = null; this.sp.a.x = null; this.sp.top.x = null; }
    this.sp.s.to(selStart); this.sp.a.to(selA); this.sp.top.to(top);
  };
  Chart.prototype.scales = function () {
    var pl = 52, pr = 74, pt = 18, pb = 30, w = this.w, h = this.h, x0 = this.x0, top = Math.max(1, this.sp.top.x);
    var step = Math.pow(10, Math.floor(Math.log10(top))) / 2; while (top / step > 4) step *= 2;
    var yTop = Math.ceil(top / step) * step;
    return { X: function (a) { return pl + (a - x0) / (90 - x0) * (w - pl - pr); }, Y: function (v) { return pt + (1 - v / yTop) * (h - pt - pb); }, step: step, yTop: yTop, pl: pl, pr: pr, pt: pt, pb: pb };
  };
  Chart.prototype.cum = function (start, a, age) { return age <= start ? 0 : a * 12 * (age - start); };
  Chart.prototype.paint = function () {
    if (!this.M || this.sp.s.x === null || this.sp.a.x === null || this.sp.top.x === null) return;
    var sc = this.scales(), X = sc.X, Y = sc.Y, svg = this.box.querySelector('svg'), self = this;
    var s1 = this.sp.s.x, a1 = this.sp.a.x, s0 = this.ordStart, a0 = this.ordA, x0 = this.x0;
    var grid = '', axis = '';
    for (var v = 0; v <= sc.yTop + 1; v += sc.step) {
      grid += '<line x1="' + sc.pl + '" x2="' + (this.w - sc.pr) + '" y1="' + Y(v).toFixed(1) + '" y2="' + Y(v).toFixed(1) + '"/>';
      axis += '<text x="' + (sc.pl - 8) + '" y="' + (Y(v) + 4).toFixed(1) + '" text-anchor="end">' + (v >= 1e6 ? J.num(v / 1e6, v % 1e6 ? 1 : 0) + ' M' : v >= 1000 ? J.num(v / 1000, 0) + ' mil' : '0') + '</text>';
    }
    var stepA = (90 - x0) > 20 ? 5 : (90 - x0) > 10 ? 2 : 1;
    for (var a = Math.ceil(x0 / stepA) * stepA; a <= 90; a += stepA) axis += '<text x="' + X(a).toFixed(1) + '" y="' + (this.h - 8) + '" text-anchor="middle">' + a + '</text>';
    svg.querySelector('.jm-sim-chart__grid').innerHTML = grid;
    svg.querySelector('.jm-sim-chart__axis').innerHTML = axis;
    var line = function (s, k) { var p0 = Math.max(x0, s); return 'M' + X(x0).toFixed(1) + ' ' + Y(0).toFixed(1) + 'L' + X(p0).toFixed(1) + ' ' + Y(0).toFixed(1) + 'L' + X(90).toFixed(1) + ' ' + Y(self.cum(s, k, 90)).toFixed(1); };
    svg.querySelector('.jm-sim-chart__ord').setAttribute('d', line(s0, a0));
    var dSel = line(s1, a1);
    svg.querySelector('.jm-sim-chart__sel').setAttribute('d', dSel);
    svg.querySelector('.jm-sim-chart__area').setAttribute('d', dSel + 'L' + X(90).toFixed(1) + ' ' + Y(0).toFixed(1) + 'Z');
    // Punto en que una opción alcanza a la otra
    var crossEl = svg.querySelector('.jm-sim-chart__cross'), t = cross(s0, a0, s1, a1);
    if (t !== null) { crossEl.setAttribute('transform', 'translate(' + X(t).toFixed(1) + ' ' + Y(this.cum(s0, a0, t)).toFixed(1) + ')'); crossEl.removeAttribute('visibility'); } else crossEl.setAttribute('visibility', 'hidden');
    // Etiquetas al final de cada línea (texto en tinta; el color va en la marca)
    var yo = Y(this.cum(s0, a0, 90)), ys = Y(this.cum(s1, a1, 90)), same = Math.abs(s1 - s0) < 0.01 && Math.abs(a1 - a0) < 0.01;
    if (!same && Math.abs(yo - ys) < 30) { var mid = (yo + ys) / 2, up = ys < yo; ys = mid + (up ? -15 : 15); yo = mid + (up ? 15 : -15); }
    var ex = X(90) + 8;
    svg.querySelector('.jm-sim-chart__ends').innerHTML = same
      ? '<text x="' + ex + '" y="' + (ys + 4).toFixed(1) + '" class="jm-sim-chart__end">' + (this.M.ya ? 'Desde hoy' : 'Ordinaria') + '</text>'
      : '<rect x="' + ex + '" y="' + (yo - 6).toFixed(1) + '" width="10" height="3" rx="1.5" fill="' + C.orange + '"/><text x="' + (ex + 14) + '" y="' + (yo).toFixed(1) + '" class="jm-sim-chart__end">' + (this.M.ya ? 'Hoy' : 'Ordinaria') + '</text>' +
        '<rect x="' + ex + '" y="' + (ys - 6).toFixed(1) + '" width="10" height="3" rx="1.5" fill="' + C.blue + '"/><text x="' + (ex + 14) + '" y="' + (ys).toFixed(1) + '" class="jm-sim-chart__end">Tu elección</text>';
    if (this.hover !== null) this.drawHover(sc);
  };
  Chart.prototype.hoverAt = function (px) {
    var sc = this.scales(), age = this.x0 + (px - sc.pl) / (this.w - sc.pl - sc.pr) * (90 - this.x0);
    this.hover = clamp(age, this.x0, 90); this.drawHover(sc);
  };
  Chart.prototype.drawHover = function (sc) {
    var g = this.box.querySelector('.jm-sim-chart__hover'), a = this.hover, X = sc.X, Y = sc.Y;
    var vo = this.cum(this.ordStart, this.ordA, a), vs = this.cum(this.sp.s.x, this.sp.a.x, a);
    g.removeAttribute('visibility');
    var l = g.querySelector('line'); l.setAttribute('x1', X(a)); l.setAttribute('x2', X(a)); l.setAttribute('y1', sc.pt); l.setAttribute('y2', this.h - sc.pb);
    g.querySelector('.o').setAttribute('transform', 'translate(' + X(a) + ' ' + Y(vo) + ')');
    g.querySelector('.b').setAttribute('transform', 'translate(' + X(a) + ' ' + Y(vs) + ')');
    this.tip({ x: X(a), age: a, vo: vo, vs: vs });
  };
  Chart.prototype.tip = function (d) {
    var tip = $('[data-sim-tip]'); if (!tip) return;
    if (!d) { tip.hidden = true; var g = this.box.querySelector('.jm-sim-chart__hover'); if (g) g.setAttribute('visibility', 'hidden'); return; }
    tip.hidden = false;
    tip.innerHTML = '<b>A los ' + edadTxt(Math.round(d.age * 12)) + '</b>' +
      '<span><i style="background:' + C.blue + '"></i>Tu elección: ' + eur0(d.vs) + '</span><span><i style="background:' + C.orange + '"></i>' + (this.M.ya ? 'Desde hoy' : 'Ordinaria') + ': ' + eur0(d.vo) + '</span>';
    var w = this.w, x = clamp(d.x, 90, w - 90);
    tip.style.left = x + 'px';
  };

  /* ---------- 7. Pintar todo ------------------------------------------- */
  var ribbon = $('[data-sim-life]') ? new Ribbon($('[data-sim-life]')) : null;
  var chart = $('[data-sim-chart]') ? new Chart($('[data-sim-chart]')) : null;
  var M = null, liveT = 0, interacted = false;

  function render() {
    readForm();
    M = model();
    var msg = $('[data-sim-msg]');
    if (M.error) { if (msg) { msg.textContent = M.error; msg.hidden = false; } root.classList.add('is-error'); return; }
    if (msg) msg.hidden = true; root.classList.remove('is-error');
    var e = M.e, P = M.P0, E = M.E;

    // Aviso de base fuera de los límites
    var bmsg = S.base < J.CFG.baseMinima ? 'Usamos la base mínima de cotización: ' + eur(J.CFG.baseMinima) + ' al mes.' : S.base > J.CFG.baseMaxima ? 'Usamos la base máxima de cotización: ' + eur(J.CFG.baseMaxima) + ' al mes.' : '';
    setTxtQuiet('baseNota', bmsg); show('baseNota', !!bmsg);

    // 1. Cuándo
    setTxt('edad', edadTxt(e.edad));
    setTxt('fecha', (M.ya ? 'desde ' : 'en ') + J.mesTxt(e.mes));
    setTxtQuiet('via', viaTxt(M));
    var antTxt = e.antVol ? 'Con 35 años cotizados podrías adelantarla por tu cuenta hasta los ' + edadTxt(e.antVol.edad) + ' (' + J.mesTxt(e.antVol.mes) + '), con un recorte para siempre.' : 'Para adelantarla por tu cuenta harían falta 35 años cotizados en esa fecha, y no llegarías a tiempo.';
    setTxtQuiet('antVol', antTxt);
    target = new Date(Math.floor(e.mes / 12), e.mes % 12, 1);
    setTxtQuiet('objetivo', 'hasta el 1 de ' + J.mesTxt(e.mes));
    show('ya', M.ya); show('noya', !M.ya);
    if (flap) flap.hidden = M.ya;
    $$('[data-sim-pause]').forEach(function (b) { b.hidden = M.ya; });
    setTxtQuiet('cardLabel', M.ya ? 'Ya podías jubilarte a los' : 'Te jubilas a los');
    buildFlap(); runClock();
    if (ribbon) ribbon.set(M);
    // Camino recorrido: del primer mes cotizado (sin pausas) al mes de la jubilación
    var camino = M.ya ? 100 : clamp(M.cotNow / Math.max(1, M.cotNow + (M.ord - M.now)) * 100, 0, 100);
    setNum('camino', camino, function (x) { return J.num(Math.round(x), 0) + ' %'; });
    var ring = $('[data-sim-ring]'); if (ring) ring.style.setProperty('--p', (camino / 100).toFixed(4));

    // 2. Cuánto
    var sin = !!P.sin;
    show('sinPension', sin); show('conPension', !sin);
    if (sin) {
      setTxtQuiet('sinTxt', 'Al llegar a tu edad tendrías ' + durTxt(P.cot) + ' cotizados, y la pensión de jubilación pide un mínimo de 15 años. Te contamos las salidas en la guía de los años que faltan.');
    } else {
      setNum('pension', P.final, eur);
      setNum('netoOrd', J.neto({ bruta: P.final, pagas: 14, edad: e.edad >= 780 ? '65' : '60', ccaa: S.ccaa }).netoMes, eur);
      setNum('pensionAnual', P.final * 14, eur0);
      setNum('br', P.P.br, eur);
      setNum('porc', P.P.porcentaje, pc);
      var falta100 = 0; for (var k = P.cot; k < P.cot + 240 && J.porcentajeCot(k, Math.floor(e.mes / 12)) < 100; k++) falta100++;
      setTxtQuiet('falta100', P.P.porcentaje >= 100 ? 'Llegas al 100 %: cada año más ya no sube este porcentaje.' : 'Te faltarían ' + durTxt(falta100) + ' cotizados para llegar al 100 %.');
      var meter = $('[data-sim-meter="porc"]'); if (meter) meter.style.setProperty('--v', ((P.P.porcentaje - 50) / 50 * 100).toFixed(2) + '%');
      var mn = J.CFG.minimos.jub65.sin, mx = J.CFG.pensionMax, pos = clamp((P.final - mn) / (mx - mn), 0, 1);
      var scale = $('[data-sim-scale]'); if (scale) scale.style.setProperty('--v', (pos * 100).toFixed(2) + '%');
      setTxtQuiet('escalaTxt', P.final >= mx - 0.005 ? 'Llegas a la pensión máxima de ' + J.CFG.anio + '.' : P.final < mn ? 'Por debajo de la mínima: si tus ingresos son bajos, la Seguridad Social la completa con el complemento a mínimos.' : 'Entre la mínima (' + eur(mn) + ') y la máxima (' + eur(mx) + ').');
    }

    // 3. Elige tu momento
    $$('[data-sim-tipo]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-sim-tipo') === S.tipo)); });
    paintRange(M);
    var diffE = E.final - P.final, rel = P.final ? diffE / P.final * 100 : 0;
    setTxt('elecEdad', edadTxt(E.edad));
    setTxtQuiet('elecFecha', J.mesTxt(M.elegido));
    setNum('elecPension', E.final || 0, eur);
    var dtxt = E.sin ? 'Sin pensión: no llegarías a 15 años cotizados.' : M.elegido === M.base0 ? (M.ya ? 'Es lo que cobrarías jubilándote ahora.' : 'Es tu jubilación ordinaria: sin recortes ni extras.')
      : (diffE < 0 ? '−' : '+') + eur(Math.abs(diffE)) + ' al mes (' + (diffE < 0 ? '−' : '+') + J.num(Math.abs(rel), 2) + ' %) frente a ' + (M.ya ? 'jubilarte ahora' : 'la ordinaria') + '.';
    setTxtQuiet('elecDelta', dtxt);
    var why = '';
    if (E.tipo === 'anticipada') why = 'Recorte del ' + pc(E.coef) + (E.sobreMax ? ' sobre la pensión máxima' : '') + ' por adelantarla ' + durTxt(M.ord - M.elegido) + ', para siempre (art. ' + (S.tipo === 'involuntaria' ? '207' : '208') + ' LGSS). Además cotizas menos meses.';
    else if (E.tipo === 'demorada') why = E.extra ? 'Ganas un ' + J.num(E.extra, 0) + ' % por retrasarla (4 % por año completo, art. 210 LGSS).' + (E.sobreMax ? ' Superas la pensión máxima: el extra se cobra aparte, como explicamos en la guía de la demorada.' : '') : 'Aún no completas un año de demora: el extra del 4 % llega con cada año completo.';
    setTxtQuiet('elecPor', why);
    show('anticipadaNo', E.tipo === 'anticipada' && E.superaMin === false);
    show('sinAnticipada', M.min === M.base0 && !M.ya);
    setTxtQuiet('sinAntTxt', S.tipo === 'involuntaria' ? 'Para la anticipada por despido harían falta 33 años cotizados, y no los tendrías antes de tu edad ordinaria.' : 'Para adelantarla por tu cuenta harían falta 35 años cotizados, y no los tendrías antes de tu edad ordinaria.');
    if (chart) {
      chart.set(M);
      var t = chart.crossAge, nota;
      if (M.elegido === M.base0) nota = 'Mueve el deslizador para comparar con otra fecha.';
      else if (t === null) nota = M.elegido < M.base0 ? 'Adelantarla te deja más dinero en total hasta los 90 años, aunque cobres menos cada mes.' : 'Hasta los 90 años no llegarías a recuperar lo que dejas de cobrar mientras esperas.';
      else nota = (M.elegido < M.base0 ? 'Jubilándote en la fecha ordinaria acabarías cobrando más a partir de los ' : 'Retrasarla empieza a compensar en total a partir de los ') + edadTxt(t * 12) + '.';
      setTxtQuiet('chartNota', nota);
      paintTable(M);
    }

    // 4. Neto
    var bruta = E.sin ? 0 : E.final;
    var N = J.neto({ bruta: bruta, pagas: 14, edad: E.edad >= 780 ? '65' : '60', ccaa: S.ccaa });
    setNum('neto', N.netoMes, eur);
    setNum('irpf', bruta - N.netoMes, eur);
    setNum('bruta', bruta, eur);
    setTxtQuiet('irpfTipo', J.num(N.tipo, 2) + ' %');
    setTxtQuiet('ccaaTxt', N.ccaa);
    setTxtQuiet('netoEdad', edadTxt(E.edad));
    var nb = $('[data-sim-netbar]'); if (nb) nb.style.setProperty('--v', (bruta ? N.netoMes / bruta * 100 : 100).toFixed(2) + '%');

    // 5. Resumen
    setTxtQuiet('rEdad', edadTxt(e.edad) + ' · ' + J.mesTxt(e.mes));
    setTxtQuiet('rElec', edadTxt(E.edad) + ' · ' + J.mesTxt(M.elegido));
    setTxtQuiet('rBruta', eur(bruta));
    setTxtQuiet('rNeta', eur(N.netoMes));
    setTxtQuiet('rAnual', eur0(bruta * 14));
    setTxtQuiet('rHoy', new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(M.hoy));
    paintNext(M);
    $$('[data-sim-dock-v]').forEach(function (el) { el.textContent = edadTxt(E.edad) + ' · ' + eur0(bruta) + '/mes'; });

    // Lectores de pantalla: un resumen corto cuando dejas de tocar
    clearTimeout(liveT);
    liveT = setTimeout(function () {
      var live = $('[data-sim-live]');
      if (live && interacted) live.textContent = 'Jubilación ordinaria a los ' + edadTxt(e.edad) + ', en ' + J.mesTxt(e.mes) + '. Con la fecha elegida, ' + edadTxt(E.edad) + ': ' + eur(bruta) + ' brutos al mes y ' + eur(N.netoMes) + ' netos.';
    }, 900);
  }

  function paintTable(M) {
    var tb = $('[data-sim-table]'); if (!tb) return;
    var o = M.at(M.base0), s0 = (M.base0 - M.nac) / 12, a0 = o.final * 14 / 12, s1 = (M.elegido - M.nac) / 12, a1 = (M.E.final || 0) * 14 / 12, rows = '';
    [65, 70, 75, 80, 85, 90].forEach(function (age) {
      if (age < Math.min(s0, s1)) return;
      var vo = age <= s0 ? 0 : a0 * 12 * (age - s0), vs = age <= s1 ? 0 : a1 * 12 * (age - s1);
      rows += '<tr><td>' + age + ' años</td><td class="n">' + eur0(vs) + '</td><td class="n">' + eur0(vo) + '</td></tr>';
    });
    tb.innerHTML = rows;
  }

  function paintNext(M) {
    var ul = $('[data-sim-next]'); if (!ul) return;
    var L = [];
    if (M.P0.sin) L.push(['/jubilacion/faltan-anos-cotizados/', 'Qué hacer si te faltan años cotizados']);
    if (M.elegido < M.base0) L.push(S.tipo === 'involuntaria' ? ['/jubilacion/anticipada-involuntaria/', 'La jubilación anticipada por despido'] : ['/jubilacion/anticipada-voluntaria/', 'La jubilación anticipada voluntaria, paso a paso']);
    if (M.elegido > M.base0) L.push(['/jubilacion/demorada/', 'La jubilación demorada: el 4 % por año y el pago único']);
    L.push(['/cuanto-cobrare/como-se-calcula-la-pension/', 'Cómo se calcula la pensión, con ejemplos']);
    L.push(['/calculadoras/pension-jubilacion/', 'Calculadora detallada: lagunas y carrera irregular']);
    L.push(['/jubilacion/solicitar-jubilacion-internet/', 'Cómo pedir la jubilación por internet']);
    var html = L.slice(0, 4).map(function (l) { return '<li><a class="jm-link-arrow" href="' + l[0] + '">' + l[1] + '<svg class="jm-i" aria-hidden="true"><use href="#i-arrow"/></svg></a></li>'; }).join('');
    if (ul.innerHTML !== html) ul.innerHTML = html;
  }

  /* ---------- 8. Eventos ------------------------------------------------ */
  var raf2 = 0;
  function schedule() { interacted = true; cancelAnimationFrame(raf2); raf2 = requestAnimationFrame(function () { render(); remember(); }); }
  function remember() { if (history.replaceState) history.replaceState(null, '', '#' + toHash()); }

  var typing = 0;
  form.addEventListener('input', function () { clearTimeout(typing); typing = setTimeout(schedule, 220); });
  form.addEventListener('change', function () { clearTimeout(typing); schedule(); });
  form.addEventListener('submit', function (ev) { ev.preventDefault(); schedule(); var c = document.getElementById('sim-cuando'); if (c) c.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); });
  if (range) range.addEventListener('input', function () { S.off = parseInt(range.value, 10) || 0; schedule(); });
  $$('[data-sim-tipo]').forEach(function (b) {
    b.addEventListener('click', function () { S.tipo = b.getAttribute('data-sim-tipo'); schedule(); });
  });
  $$('[data-sim-reset]').forEach(function (b) { b.addEventListener('click', function () { S.off = 0; schedule(); }); });
  // La cuenta atrás se puede parar (se mueve sola: WCAG 2.2.2)
  $$('[data-sim-pause]').forEach(function (b) {
    b.addEventListener('click', function () {
      paused = !paused; b.setAttribute('aria-pressed', String(paused));
      b.textContent = paused ? 'Reanudar la cuenta atrás' : 'Pausar la cuenta atrás';
      runClock();
    });
  });
  $$('[data-sim-ccaa]').forEach(function (b) {
    b.addEventListener('click', function () { var s = form.elements.ccaa; if (s) { s.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' }); s.focus({ preventScroll: true }); } });
  });
  $$('[data-sim-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var url = location.origin + location.pathname + '#' + toHash(), ok = function () { var t = b.querySelector('span') || b; var old = t.textContent; t.textContent = 'Enlace copiado'; var lv = $('[data-sim-live]'); if (lv) lv.textContent = 'Enlace copiado: pégalo donde quieras guardarlo o compartirlo.'; setTimeout(function () { t.textContent = old; }, 2200); };
      if (navigator.share && window.matchMedia('(pointer: coarse)').matches) { navigator.share({ title: document.title, url: url }).catch(function () {}); return; }
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(ok, function () { prompt('Copia este enlace:', url); }); else prompt('Copia este enlace:', url);
    });
  });
  // Capítulo actual en la barra de navegación
  var dock = $('[data-sim-dock]');
  if (dock && 'IntersectionObserver' in window) {
    var links = $$('a[href^="#sim-"]', dock), hero = $('.jm-sim-hero');
    var seen = {};
    var dio = new IntersectionObserver(function (es) {
      es.forEach(function (en) { seen[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0; });
      var best = null, r = 0; Object.keys(seen).forEach(function (k) { if (seen[k] > r) { r = seen[k]; best = k; } });
      links.forEach(function (a) { if (a.getAttribute('href') === '#' + best) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current'); });
    }, { threshold: [0, 0.2, 0.4, 0.6], rootMargin: '-20% 0px -40% 0px' });
    links.forEach(function (a) { var s = document.getElementById(a.getAttribute('href').slice(1)); if (s) dio.observe(s); });
    if (hero) new IntersectionObserver(function (es) { dock.classList.toggle('is-on', !es[0].isIntersecting); }, { threshold: 0 }).observe(hero);
    var foot = document.querySelector('.jm-footer, footer');
    if (foot) new IntersectionObserver(function (es) { dock.classList.toggle('is-off', es[0].isIntersecting); }).observe(foot);
  }
  // Al cambiar el ancho, la cinta y el gráfico se redibujan a su tamaño (texto siempre legible)
  if ('ResizeObserver' in window) {
    var rt = 0;
    new ResizeObserver(function () { clearTimeout(rt); rt = setTimeout(function () { if (M && !M.error) { if (ribbon) ribbon.set(M); if (chart) chart.set(M); } }, 120); }).observe(root);
  }

  if (fromHash()) { writeForm(); interacted = true; }
  root.classList.add('is-live');
  render();
})();
