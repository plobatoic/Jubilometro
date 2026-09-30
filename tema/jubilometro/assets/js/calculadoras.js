/* ==========================================================================
   JUBILÓMETRO · Motor de calculadoras (vanilla JS, sin dependencias)
   - Mismo archivo para el prototipo y para WordPress (bloque "HTML personalizado"
     con el formulario + este script encolado solo en las páginas que lo usan).
   - Todas las cifras legales están en CFG: actualízalas aquí una vez al año.
   - Estimaciones orientativas: no sustituyen la resolución del INSS ni de la AEAT.
   ========================================================================== */
(function (root) {
  'use strict';

  /* ---------- 1. PARÁMETROS LEGALES ---------------------------------------- */
  var CFG = {
    actualizado: '30 de septiembre de 2026',
    anio: 2026,
    pensionMax: 3359.60,                 // RD 241/2026, €/mes en 14 pagas
    limiteIngresosMinimos: 9442,         // €/año sin cónyuge a cargo (2026)
    minimos: {                           // €/mes, 14 pagas (2026)
      jub65: { conyuge: 1256.60, sin: 936.20, noCargo: 888.70 },
      jubMenor65: { conyuge: 1256.60, sin: 875.90, noCargo: 827.90 },
      viudedad: { cargas: 1256.60, mayor65: 936.20, de60a64: 875.90, menor60: 709.40 },
      ip: { gran: 1884.70, absoluta: 1256.60, total65: 1256.60, total60: 1256.60 }
    },
    baseMinima: 1424.40,                 // Orden PJC/297/2026 (grupos 4 a 11)
    baseMaxima: 5101.20                  // Orden PJC/297/2026
  };

  // Edad ordinaria (art. 205.1.a y DT 7ª LGSS): año -> [meses cotizados para 65, edad exigida en meses si no]
  var EDAD = {
    2013: [423, 781], 2014: [426, 782], 2015: [429, 783], 2016: [432, 784], 2017: [435, 785],
    2018: [438, 786], 2019: [441, 788], 2020: [444, 790], 2021: [447, 792], 2022: [450, 794],
    2023: [453, 796], 2024: [456, 798], 2025: [459, 800], 2026: [459, 802], 2027: [462, 804]
  };
  function reqAnio(y) { if (y < 2013) return [0, 780]; if (y > 2027) return EDAD[2027]; return EDAD[y]; }

  // Sistema dual (DT 40ª LGSS): año -> [meses del periodo, mejores bases, divisor]
  var DUAL = {
    2026: [304, 302, 352.33], 2027: [308, 304, 354.67], 2028: [312, 306, 357], 2029: [316, 308, 359.33],
    2030: [320, 310, 361.67], 2031: [324, 312, 364], 2032: [328, 314, 366.33], 2033: [332, 316, 368.67],
    2034: [336, 318, 371], 2035: [340, 320, 373.33], 2036: [344, 322, 375.67], 2037: [348, 324, 378]
  };
  function dualAnio(y) { return DUAL[Math.min(Math.max(y, 2026), 2037)]; }

  // Coeficientes reductores, jubilación anticipada voluntaria (art. 208 LGSS). Índice = meses - 1
  var VOL = {
    a: [3.26, 3.38, 3.52, 3.67, 3.83, 4.00, 4.19, 4.40, 4.63, 4.89, 5.18, 5.50, 5.87, 6.29, 6.77, 7.33, 8.00, 8.80, 9.78, 11.00, 12.57, 14.67, 17.60, 21.00],
    b: [3.11, 3.23, 3.36, 3.50, 3.65, 3.82, 4.00, 4.20, 4.42, 4.67, 4.94, 5.25, 5.60, 6.00, 6.46, 7.00, 7.64, 8.40, 9.33, 10.50, 12.00, 14.00, 16.50, 19.00],
    c: [2.96, 3.08, 3.20, 3.33, 3.48, 3.64, 3.81, 4.00, 4.21, 4.44, 4.71, 5.00, 5.33, 5.71, 6.15, 6.67, 7.27, 8.00, 8.89, 10.00, 11.43, 13.33, 15.00, 17.00],
    d: [2.81, 2.92, 3.04, 3.17, 3.30, 3.45, 3.62, 3.80, 4.00, 4.22, 4.47, 4.75, 5.07, 5.43, 5.85, 6.33, 6.91, 7.60, 8.40, 9.20, 10.00, 11.00, 12.00, 13.00]
  };
  // Involuntaria (art. 207 LGSS): porcentaje por mes, 48 meses máx. Se aplica el menor frente a la tabla voluntaria.
  var INVOL = { a: 0.625, b: 0.5833, c: 0.5417, d: 0.5 };
  // DT 34ª LGSS (2026): coeficiente sobre la pensión máxima para 24 meses de anticipo voluntario
  var DT34 = { a: 9.10, b: 8.50, c: 7.90, d: 6.70 };
  var TRAMO_TXT = { a: 'menos de 38 años y 6 meses', b: 'entre 38 años y 6 meses y 41 años y 6 meses', c: 'entre 41 años y 6 meses y 44 años y 6 meses', d: '44 años y 6 meses o más' };
  function tramo(mesesCot) { return mesesCot < 462 ? 'a' : mesesCot < 498 ? 'b' : mesesCot < 534 ? 'c' : 'd'; }

  // IRPF: escala estatal (art. 63 LIRPF) y escalas autonómicas del ejercicio 2025,
  // verificadas el 26/09/2026 con el Manual práctico de Renta 2025 de la AEAT (últimas publicadas).
  var ESTATAL = [[12450, 9.5], [20200, 12], [35200, 15], [60000, 18.5], [300000, 22.5], [Infinity, 24.5]];
  var CCAA = {
    andalucia: ['Andalucía', [[13000, 9.5], [21100, 12], [35200, 15], [60000, 18.5], [Infinity, 22.5]]],
    aragon: ['Aragón', [[13072.5, 9.5], [21210, 12], [36960, 15], [52500, 18.5], [60000, 20.5], [80000, 23], [90000, 24], [130000, 25], [Infinity, 25.5]]],
    asturias: ['Principado de Asturias', [[12450, 9], [17707.2, 12], [33007.2, 14], [53407.2, 19.2], [70000, 21.5], [90000, 22.5], [175000, 25], [Infinity, 26]]],
    baleares: ['Illes Balears', [[10000, 9], [18000, 11.25], [30000, 14.25], [48000, 17.5], [70000, 19], [90000, 21.75], [120000, 22.75], [175000, 23.75], [Infinity, 24.75]]],
    canarias: ['Canarias', [[13748, 9], [19422, 11.5], [35924, 14], [57566, 18.5], [93268, 23.5], [123745, 25], [Infinity, 26]]],
    cantabria: ['Cantabria', [[13000, 8.5], [21000, 11], [35200, 14.5], [60000, 18], [90000, 22.5], [Infinity, 24.5]]],
    clm: ['Castilla-La Mancha', [[12450, 9.5], [20200, 12], [35200, 15], [60000, 18.5], [Infinity, 22.5]]],
    cyl: ['Castilla y León', [[12450, 9], [20200, 12], [35200, 14], [53407.2, 18.5], [Infinity, 21.5]]],
    cataluna: ['Cataluña', [[12500, 9.5], [22000, 12.5], [33000, 16], [53000, 19], [90000, 21.5], [120000, 23.5], [175000, 24.5], [Infinity, 25.5]]],
    extremadura: ['Extremadura', [[12450, 8], [20200, 10], [24200, 16], [35200, 17.5], [60000, 21], [80200, 23.5], [99200, 24], [120200, 24.5], [Infinity, 25]]],
    galicia: ['Galicia', [[12985.35, 9], [21068.6, 11.65], [35200, 14.9], [60000, 18.4], [Infinity, 22.5]]],
    madrid: ['Comunidad de Madrid', [[13362.22, 8.5], [19004.63, 10.7], [35425.68, 12.8], [57320.4, 17.4], [Infinity, 20.5]]],
    murcia: ['Región de Murcia', [[12450, 9.5], [20200, 11.2], [34000, 13.3], [60000, 17.9], [Infinity, 22.5]]],
    rioja: ['La Rioja', [[12450, 8], [20200, 10.6], [35200, 13.6], [40000, 17.8], [50000, 18.3], [60000, 19], [120000, 24.5], [Infinity, 27]]],
    valencia: ['Comunitat Valenciana', [[12000, 9], [22000, 12], [32000, 15], [42000, 17.5], [52000, 20], [62000, 22.5], [72000, 25], [100000, 26.5], [150000, 27.5], [200000, 28.5], [Infinity, 29.5]]]
  };

  /* ---------- 2. UTILIDADES ----------------------------------------------- */
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  function num(n, dec) {
    if (!isFinite(n)) return '-';
    var s = Math.abs(n).toFixed(dec || 0).split('.');
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (n < 0 ? '-' : '') + s[0] + (dec ? ',' + s[1] : '');
  }
  function eur(n, dec) { return num(n, dec == null ? 2 : dec) + ' €'; }
  function pct(n, dec) { return num(n, dec == null ? 2 : dec) + ' %'; }
  function edadTxt(meses) {
    var a = Math.floor(meses / 12), m = meses % 12;
    return a + ' años' + (m ? ' y ' + m + (m === 1 ? ' mes' : ' meses') : '');
  }
  function durTxt(meses) {
    var a = Math.floor(meses / 12), m = meses % 12;
    if (!a) return m + (m === 1 ? ' mes' : ' meses');
    return a + (a === 1 ? ' año' : ' años') + (m ? ' y ' + m + (m === 1 ? ' mes' : ' meses') : '');
  }
  function mesTxt(idx) { return MESES[idx % 12] + ' de ' + Math.floor(idx / 12); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function f(v, d) {
    var s = String(v == null ? '' : v).trim().replace(/\s|€|%/g, '');
    if (s.indexOf(',') > -1) s = s.replace(/\./g, '').replace(',', '.');   // formato español 1.500,50
    var n = parseFloat(s); return isFinite(n) ? n : (d || 0);
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var ICON = function (id) { return '<svg class="jm-i" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };

  /* ---------- 3. MOTORES DE CÁLCULO --------------------------------------- */

  // 3.1 Edad de jubilación ordinaria
  function edad(o) {
    var hoy = o.hoy || new Date();
    var now = hoy.getFullYear() * 12 + hoy.getMonth();
    var nac = o.nacAnio * 12 + (o.nacMes - 1);
    var cotNow = Math.round(o.cotAnios * 12 + (o.cotMeses || 0));
    var sigue = o.sigue !== false;
    function cotEn(m) { return m >= now ? cotNow + (sigue ? m - now : 0) : cotNow - (now - m); }
    var res = null;
    for (var m = nac + 780; m <= nac + 840; m++) {
      var r = reqAnio(Math.floor(m / 12)), e = m - nac, c = cotEn(m);
      if (e >= r[1]) { res = { mes: m, via: 'general', req: r, cot: c }; break; }
      if (c >= r[0] && e >= 780) { res = { mes: m, via: 'larga', req: r, cot: c }; break; }
    }
    if (!res) return null;
    res.edad = res.mes - nac;
    res.ya = res.mes <= now;
    res.faltan = res.mes - now;
    res.minimo = res.cot >= 180;
    // Anticipada voluntaria: hasta 24 meses antes, con 35 años cotizados en esa fecha
    var mv = res.mes - 24, cv = cotEn(mv);
    res.antVol = cv >= 420 ? { mes: mv, edad: mv - nac } : null;
    if (!res.antVol) {
      for (var k = res.mes - 23; k < res.mes; k++) { if (cotEn(k) >= 420) { res.antVol = { mes: k, edad: k - nac }; break; } }
    }
    return res;
  }

  // 3.2 Porcentaje por años cotizados (art. 210 LGSS y DT 9ª)
  function porcentajeCot(meses, anio) {
    if (meses < 180) return 0;
    var x = meses - 180, p;
    if (anio <= 2026) p = 50 + Math.min(x, 49) * 0.21 + clamp(x - 49, 0, 209) * 0.19;
    else p = 50 + Math.min(x, 248) * 0.19 + clamp(x - 248, 0, 16) * 0.18;
    return Math.min(100, p);
  }

  // 3.3 Pensión de jubilación con sistema dual
  function pension(o) {
    var anio = clamp(Math.round(o.anio || 2026), 2026, 2040);
    var base = clamp(f(o.base), CFG.baseMinima, CFG.baseMaxima);
    var cot = Math.round(f(o.cotAnios) * 12);
    var lagunas = clamp(Math.round(f(o.lagunas)), 0, 120);
    var perfil = o.perfil || 'estable';
    var serie = [];
    for (var k = 0; k < 348; k++) {                                   // k = 0 es el mes más reciente
      var b = base;
      if (perfil === 'creciente') b = base * (1 - 0.35 * k / 347);
      if (perfil === 'peores') b = k < 48 ? base * 0.6 : base * 1.05;
      serie.push(b);
    }
    // Lagunas: al final de la carrera si los últimos años fueron peores; si no, a mitad del periodo
    var start = perfil === 'peores' ? 0 : 120;
    for (var j = 0; j < lagunas; j++) {
      var fill = j < 48 ? CFG.baseMinima : j < 60 ? CFG.baseMinima * 0.8 : CFG.baseMinima * 0.5;
      if (start + j < 348) serie[start + j] = fill;
    }
    var sumT = 0; for (var t = 0; t < 300; t++) sumT += serie[t];
    var brT = sumT / 350;
    var d = dualAnio(anio), per = serie.slice(0, d[0]).sort(function (x, y) { return y - x; }), sumN = 0;
    for (var n = 0; n < d[1]; n++) sumN += per[n];
    var brN = sumN / d[2];
    var br = Math.max(brT, brN);
    var p = porcentajeCot(cot, anio);
    var bruta = br * p / 100, tope = false;
    if (bruta > CFG.pensionMax) { bruta = CFG.pensionMax; tope = true; }
    return { anio: anio, base: base, cot: cot, brT: brT, brN: brN, br: br, gana: brN > brT ? 'nuevo' : 'tradicional', dual: d, porcentaje: p, bruta: bruta, tope: tope, anual: bruta * 14, minimo: cot >= 180, perfil: perfil, lagunas: lagunas };
  }

  // 3.4 Jubilación anticipada
  function coeficiente(tipo, meses, t) {
    meses = Math.round(meses);
    var vol = meses >= 1 && meses <= 24 ? VOL[t][meses - 1] : Infinity;
    if (tipo === 'voluntaria') return vol;
    return Math.round(Math.min(INVOL[t] * meses, vol) * 100) / 100;
  }
  function anticipada(o) {
    var tipo = o.tipo === 'involuntaria' ? 'involuntaria' : 'voluntaria';
    var maxM = tipo === 'voluntaria' ? 24 : 48;
    var meses = clamp(Math.round(f(o.meses)), 1, maxM);
    var cot = Math.round(f(o.cotAnios) * 12 + f(o.cotMeses));
    var t = tramo(cot);
    var teor = f(o.pension);
    var coef = coeficiente(tipo, meses, t), final, sobreMax = false, coefMax = 0;
    if (teor > CFG.pensionMax) {
      sobreMax = true;
      coefMax = tipo === 'voluntaria' ? DT34[t] * meses / 24 : Math.ceil(meses / 3) * 0.5;
      final = CFG.pensionMax * (1 - coefMax / 100);
    } else final = teor * (1 - coef / 100);
    var reqCot = tipo === 'voluntaria' ? 420 : 396;
    var min = o.familia === 'conyuge' ? CFG.minimos.jub65.conyuge : CFG.minimos.jub65.sin;
    return {
      tipo: tipo, meses: meses, cot: cot, tramo: t, coef: coef, coefMax: coefMax, sobreMax: sobreMax, teorica: teor, final: final,
      perdidaMes: Math.min(teor, CFG.pensionMax) - final, perdidaAnio: (Math.min(teor, CFG.pensionMax) - final) * 14,
      cumpleCot: cot >= reqCot, reqCot: reqCot, superaMin: tipo === 'involuntaria' || final >= min, minimo: min
    };
  }

  // 3.5 Pensión neta (IRPF)
  function escala(base, tramos) { var c = 0, prev = 0; for (var i = 0; i < tramos.length; i++) { if (base > prev) c += (Math.min(base, tramos[i][0]) - prev) * tramos[i][1] / 100; prev = tramos[i][0]; } return c; }
  function reduccionTrabajo(rn) { if (rn <= 14852) return 7302; if (rn <= 17673.52) return 7302 - 1.75 * (rn - 14852); if (rn <= 19747.5) return 2364.34 - 1.14 * (rn - 17673.52); return 0; }
  function neto(o) {
    var mensual = f(o.bruta), pagas = f(o.pagas, 14) === 12 ? 12 : 14, anual = mensual * pagas;
    var rn = Math.max(0, anual - 2000), red = Math.min(rn, reduccionTrabajo(rn)), base = Math.max(0, rn - red);
    var edadN = o.edad === '75' ? 75 : o.edad === '65' ? 65 : 60;
    var minimo = 5550 + (edadN >= 65 ? 1150 : 0) + (edadN >= 75 ? 1400 : 0) + (o.disc === '65' ? 12000 : o.disc === '33' ? 3000 : 0);
    var cc = CCAA[o.ccaa] || CCAA.madrid;
    var mB = Math.min(minimo, base);
    var cE = Math.max(0, escala(base, ESTATAL) - escala(mB, ESTATAL));
    var cA = Math.max(0, escala(base, cc[1]) - escala(mB, cc[1]));
    var total = cE + cA;
    return { anual: anual, pagas: pagas, rn: rn, red: red, base: base, minimo: minimo, estatal: cE, autonomica: cA, total: total, tipo: anual ? total / anual * 100 : 0, netoAnual: anual - total, netoMes: (anual - total) / pagas, ccaa: cc[0] };
  }

  // 3.6 Demorada, activa y flexible
  function demorada(o) {
    var P = f(o.pension), anios = clamp(Math.round(f(o.anios)), 0, 10), meses = clamp(Math.round(f(o.meses)), 0, 11);
    var extra = 4 * anios + (anios >= 2 && meses >= 6 ? 2 : 0);   // art. 210.2.a LGSS: el semestre solo cuenta a partir del segundo año completo
    var nueva = P * (1 + extra / 100);
    var dejas = P * 14 * (anios + meses / 12);
    var ganasAnio = (nueva - P) * 14;
    var recupera = ganasAnio > 0 ? dejas / ganasAnio : Infinity;
    var activa = anios >= 5 ? 100 : [0, 45, 55, 65, 80][anios];
    var jornada = clamp(Math.round(f(o.jornada, 50)), 33, 80);
    var cot = Math.round(f(o.cotAnios) * 12);
    return { P: P, anios: anios, meses: meses, extra: extra, nueva: nueva, complementoAnual: ganasAnio, dejas: dejas, recuperaAnios: recupera, activaPct: activa, activaImporte: P * activa / 100, jornada: jornada, flexImporte: P * (1 - jornada / 100), cot: cot, largo: cot >= 534, sobreMax: nueva > CFG.pensionMax };
  }

  // 3.7 Viudedad
  // 52 % general; 60 % con 65 años o más sin otra pensión ni rentas por encima del límite
  // (RD 900/2018); 70 % con cargas familiares si la pensión es al menos la mitad de los
  // ingresos y, con ella, no se pasa de 9.442 € más la mínima de viudedad de tu edad: si se
  // pasa, la pensión se reduce hasta ese límite (art. 31.2 Decreto 3158/1966).
  function viudedad(o) {
    var br = f(o.br), ingresos = f(o.ingresos), edadV = o.edad || '65', cargas = !!o.cargas, otra = !!o.otraPension;
    var V = CFG.minimos.viudedad, lim = CFG.limiteIngresosMinimos;
    var minEdad = edadV === '65' ? V.mayor65 : edadV === '60' ? V.de60a64 : V.menor60;
    var anual = br * 0.52 * 14, porc = 52, motivo = 'Porcentaje general del 52 % de la base reguladora.';
    if (edadV === '65' && !otra && ingresos <= lim && br > 0) {
      anual = br * 0.60 * 14; porc = 60;
      motivo = 'Tienes 65 años o más, no cobras otra pensión pública y tus otros ingresos no pasan de ' + eur(lim, 0) + ' al año: puedes pedir el 60 %, siempre que no sean ingresos del trabajo.';
    }
    var limite70 = lim + minEdad * 14, reducida = false;
    if (cargas && br > 0) {
      var pleno = br * 0.70 * 14, anual70 = Math.min(pleno, Math.max(0, limite70 - ingresos));
      if (anual70 >= ingresos && anual70 > anual) {
        reducida = anual70 < pleno; anual = anual70; porc = Math.round(anual70 / (br * 14) * 1000) / 10;
        motivo = reducida
          ? 'Tienes cargas familiares, pero con el 70 % completo tus ingresos pasarían del límite de ' + eur(limite70) + ' al año: la pensión se reduce hasta no superarlo y queda en el ' + pct(porc, porc % 1 ? 1 : 0) + ' de la base reguladora.'
          : 'Tienes cargas familiares, la pensión será al menos la mitad de tus ingresos y, sumándola, no pasas del límite de ' + eur(limite70) + ' al año: se aplica el 70 %.';
      } else if (anual70 < ingresos) {
        motivo = 'Con cargas familiares se puede pedir el 70 %, pero la pensión tiene que ser al menos la mitad de tus ingresos y en tu caso no lo sería. ' + motivo;
      } else {
        motivo = 'Con cargas familiares se puede pedir el 70 %, pero con tus otros ingresos se reduciría tanto, por el límite de ' + eur(limite70) + ' al año, que te conviene más el porcentaje normal. ' + motivo;
      }
    }
    var imp = anual / 14, tope = false;
    if (imp > CFG.pensionMax) { imp = CFG.pensionMax; tope = true; }
    var min = cargas ? V.cargas : minEdad;
    var complemento = ingresos <= lim && imp < min ? min - imp : 0;
    return { br: br, porc: porc, motivo: motivo, reducida: reducida, limite70: limite70, importe: imp, tope: tope, minimo: min, complemento: complemento, total: imp + complemento, anual: (imp + complemento) * 14 };
  }

  // 3.8 Incapacidad permanente
  function incapacidad(o) {
    var br = f(o.br), grado = o.grado || 'total', mayor55 = !!o.mayor55, ultima = f(o.ultima) || br;
    var r = { grado: grado, br: br };
    if (grado === 'parcial') { r.unica = br * 24; r.porc = 0; r.mensual = 0; return r; }
    r.porc = grado === 'total' ? (mayor55 ? 75 : 55) : 100;
    r.mensual = Math.min(CFG.pensionMax, br * r.porc / 100);
    r.tope = br * r.porc / 100 > CFG.pensionMax;
    r.complemento = grado === 'gran' ? CFG.baseMinima * 0.45 + ultima * 0.30 : 0;
    r.total = r.mensual + r.complemento;
    r.anual = r.mensual * 14 + r.complemento * 14;
    r.minimo = grado === 'gran' ? CFG.minimos.ip.gran : CFG.minimos.ip.absoluta;
    return r;
  }

  // 3.9 ¿Cuánto necesito ahorrar?
  function ahorro(o) {
    var eA = f(o.edadActual), eJ = f(o.edadJub), eF = f(o.edadFin, 90), gasto = f(o.gasto), pen = f(o.pension) * 14 / 12, ahorroAct = f(o.ahorro);
    var rent = f(o.rent, 4) / 100, infl = f(o.infl, 2) / 100;
    var n = Math.max(0, eJ - eA), R = Math.max(1, eF - eJ);
    var r = (1 + rent) / (1 + infl) - 1, rm = Math.pow(1 + r, 1 / 12) - 1;
    var hueco = Math.max(0, gasto - pen);
    var capital = Math.abs(rm) < 1e-9 ? hueco * 12 * R : hueco * (1 - Math.pow(1 + rm, -12 * R)) / rm;
    var fv = ahorroAct * Math.pow(1 + r, n);
    var falta = Math.max(0, capital - fv);
    var nm = 12 * n;
    var mensual = nm <= 0 ? falta : Math.abs(rm) < 1e-9 ? falta / nm : falta * rm / (Math.pow(1 + rm, nm) - 1);
    return { n: n, R: R, hueco: hueco, capital: capital, capitalNominal: capital * Math.pow(1 + infl, n), fv: fv, falta: falta, mensual: mensual, cubre: gasto > 0 ? Math.min(100, pen / gasto * 100) : 0, penMes: pen };
  }

  // 3.10 Comparador de ingresos acumulados
  function comparador(o) {
    var P = f(o.pension), eo = f(o.edadOrd, 67), cot = Math.round(f(o.cotAnios) * 12), m = clamp(Math.round(f(o.meses)), 1, 24), y = clamp(Math.round(f(o.demora)), 1, 5), fin = clamp(f(o.fin, 86), 70, 100), g = f(o.reval, 2) / 100;
    var t = tramo(cot), coef = VOL[t][m - 1];
    var esc = [
      { id: 'anticipada', nombre: 'Anticipada', inicio: eo - m / 12, mensual: P * (1 - coef / 100) },
      { id: 'ordinaria', nombre: 'Ordinaria', inicio: eo, mensual: P },
      { id: 'demorada', nombre: 'Demorada', inicio: eo + y, mensual: P * (1 + 0.04 * y) }
    ];
    var start = esc[0].inicio, step = 1 / 12;
    esc.forEach(function (s) { s.puntos = []; s.total = 0; });
    for (var a = start; a <= fin + 1e-9; a += step) {
      esc.forEach(function (s) {
        if (a >= s.inicio - 1e-9) s.total += s.mensual * 14 / 12 * Math.pow(1 + g, a - start);
        s.puntos.push([a, s.total]);
      });
    }
    function cruce(A, B) { for (var i = 0; i < A.puntos.length; i++) { if (B.puntos[i][1] > 0 && B.puntos[i][1] >= A.puntos[i][1] && A.puntos[i][1] > 0 && A.puntos[i][0] > B.inicio) return A.puntos[i][0]; } return null; }
    return { P: P, eo: eo, m: m, y: y, fin: fin, coef: coef, tramo: t, esc: esc, cruceOA: cruce(esc[0], esc[1]), cruceDO: cruce(esc[1], esc[2]) };
  }

  /* ---------- 4. PIEZAS VISUALES (cadena HTML, sin DOM) -------------------- */
  function gauge(edadMeses, opts) {
    opts = opts || {};
    var lo = 61, hi = 71, v = clamp(edadMeses / 12, lo, hi), p = (v - lo) / (hi - lo);
    var L = Math.PI * 80, deg = (p - 0.5) * 180, ticks = '';
    for (var y = lo; y <= hi; y++) {
      var th = Math.PI * (1 - (y - lo) / (hi - lo)), major = (y - lo) % 2 === 0;
      var r1 = major ? 58 : 62, r2 = 69;
      ticks += '<line class="jm-gauge__tick' + (major ? ' jm-gauge__tick--major' : '') + '" x1="' + (100 + r1 * Math.cos(th)).toFixed(1) + '" y1="' + (100 - r1 * Math.sin(th)).toFixed(1) + '" x2="' + (100 + r2 * Math.cos(th)).toFixed(1) + '" y2="' + (100 - r2 * Math.sin(th)).toFixed(1) + '"/>';
      if (major) ticks += '<text class="jm-gauge__txt" text-anchor="middle" x="' + (100 + 46 * Math.cos(th)).toFixed(1) + '" y="' + (104 - 46 * Math.sin(th)).toFixed(1) + '">' + y + '</text>';
    }
    return '<svg class="jm-gauge" viewBox="0 0 200 112" role="img" aria-label="' + esc(opts.label || ('Edad: ' + edadTxt(Math.round(edadMeses)))) + '">' +
      '<path class="jm-gauge__track" d="M20 100 A80 80 0 0 1 180 100"/>' +
      '<path class="jm-gauge__fill" d="M20 100 A80 80 0 0 1 180 100" stroke-dasharray="' + L.toFixed(2) + '" stroke-dashoffset="' + (L * (1 - p)).toFixed(2) + '"/>' +
      ticks +
      '<g class="jm-gauge__needle" style="transform:rotate(' + deg.toFixed(1) + 'deg);transform-origin:100px 100px"><line x1="100" y1="100" x2="100" y2="40"/></g>' +
      '<circle class="jm-gauge__hub" cx="100" cy="100" r="8"/><circle class="jm-gauge__hub2" cx="100" cy="100" r="3"/></svg>';
  }
  function kv(rows) { return '<dl class="jm-kv">' + rows.map(function (r) { return '<div' + (r[2] ? ' class="' + r[2] + '"' : '') + '><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('') + '</dl>'; }
  function notes(norma, extra) {
    return '<div class="jm-notes">' +
      '<p class="jm-note">' + ICON('scale') + '<span><strong>Norma aplicada:</strong> ' + norma + '</span></p>' +
      '<p class="jm-note">' + ICON('calendar') + '<span><strong>Actualizado:</strong> ' + CFG.actualizado + ' (cifras ' + CFG.anio + ')</span></p>' +
      '<p class="jm-note">' + ICON('info') + '<span><strong>Estimación orientativa.</strong> ' + (extra || 'No sustituye la resolución oficial del INSS. Para tu cifra exacta, usa el simulador de Tu Seguridad Social o consulta con un profesional.') + '</span></p>' +
      '</div>';
  }
  function head(ejemplo) { return '<div class="jm-result__label"><span>Resultado</span><span class="jm-chip ' + (ejemplo ? 'jm-chip--ink' : '') + '">' + (ejemplo ? 'Ejemplo: cambia los datos' : 'Con tus datos') + '</span></div>'; }
  function alert(txt) { return '<p class="jm-alert">' + ICON('alert') + '<span>' + txt + '</span></p>'; }

  /* ---------- 5. RESULTADOS -------------------------------------------------- */
  var RENDER = {
    edad: function (i, ej) {
      var r = edad(i); if (!r) return head(ej) + alert('Revisa la fecha de nacimiento: no hemos podido calcular una edad de jubilación válida.');
      var cuando = r.ya ? 'Ya alcanzaste la edad ordinaria en ' + mesTxt(r.mes) : 'En ' + mesTxt(r.mes) + (r.faltan > 0 ? ', dentro de ' + durTxt(r.faltan) : '');
      var y = Math.floor(r.mes / 12);
      var via = r.via === 'larga'
        ? (r.edad === 780
          ? 'Llegas a los 65 con <strong>' + edadTxt(r.cot) + ' cotizados</strong>, lo que se exige en ' + y + ' (' + edadTxt(r.req[0]) + ') para jubilarte a esa edad sin esperar más.'
          : 'Alcanzas los <strong>' + edadTxt(r.req[0]) + ' cotizados</strong> que se exigen en ' + y + ' cuando ya has cumplido 65: desde ese mes puedes jubilarte sin esperar a la edad general.')
        : 'Como no reúnes a tiempo los ' + edadTxt(r.req[0]) + ' cotizados que permiten jubilarse a los 65, se aplica la edad general de ' + y + ': <strong>' + edadTxt(r.req[1]) + '</strong>.';
      var out = head(ej) +
        '<div class="jm-result__row jm-result__row--gauge"><div class="jm-result__hero"><p class="jm-result__figure">' + edadTxt(r.edad) + '</p><p class="jm-result__sub">' + cuando + '.</p></div>' + gauge(r.edad) + '</div>' +
        '<div class="jm-explain"><p>' + via + '</p>' + (r.antVol ? '<p>Con jubilación anticipada voluntaria podrías adelantarla hasta <strong>' + mesTxt(r.antVol.mes) + '</strong> (' + edadTxt(r.antVol.edad) + '), con un recorte permanente de la pensión.</p>' : '<p>No reúnes los 35 años cotizados que exige la jubilación anticipada voluntaria.</p>') + '</div>';
      if (!r.minimo) out += alert('En esa fecha tendrías menos de 15 años cotizados, el mínimo para cobrar una pensión contributiva. Consulta la pensión no contributiva.');
      return out + kv([['Edad ordinaria', edadTxt(r.edad)], ['Fecha estimada', mesTxt(r.mes)], ['Cotizado en esa fecha', edadTxt(r.cot)], ['Requisito en ' + Math.floor(r.mes / 12), edadTxt(r.req[0]) + ' para los 65']]) +
        notes('art. 205.1.a y disposición transitoria 7ª de la Ley General de la Seguridad Social (RDL 8/2015), según la Ley 27/2011.');
    },
    'edad-mini': function (i, ej) {
      var r = edad(i); if (!r) return '<p class="jm-hero__result-note">Revisa los datos.</p>';
      return gauge(r.edad) + '<span class="jm-hero__result-label">' + (ej ? 'Ejemplo' : 'Tu edad de jubilación') + '</span>' +
        '<span class="jm-hero__result-value">' + edadTxt(r.edad) + '</span>' +
        '<span class="jm-hero__result-note">' + (r.ya ? 'Alcanzada en ' : 'Desde ') + mesTxt(r.mes) + (ej ? '. Nacimiento en ' + MESES[i.nacMes - 1] + ' de ' + i.nacAnio + ', ' + i.cotAnios + ' años cotizados.' : '.') + '</span>';
    },
    // Portada: el resultado se imprime como un apunte nuevo de la libreta
    'edad-libreta': function (i, ej) {
      var r = edad(i); if (!r) return '<p class="jm-print__err">Revisa los datos: año de nacimiento y años cotizados.</p>';
      var hoy = i.hoy || new Date(), now = hoy.getFullYear() * 12 + hoy.getMonth(), nac = i.nacAnio * 12 + (i.nacMes - 1);
      function fch(idx) { var m = idx % 12 + 1; return (m < 10 ? '0' : '') + m + '·' + Math.floor(idx / 12); }
      function row(d, c, v, cls) { return '<li class="jm-print__row' + (cls ? ' ' + cls : '') + '"><span>' + d + '</span><span>' + c + '</span><span>' + v + '</span></li>'; }
      var rows = row(fch(nac), 'Nacimiento', '') + row(fch(now), 'Cotizado hasta hoy', i.cotAnios + ' años') +
        (r.antVol && !r.ya ? row(fch(r.antVol.mes), 'Anticipada, como pronto', edadTxt(r.antVol.edad)) : '') +
        row(fch(r.mes), r.ya ? 'Edad ordinaria, ya alcanzada' : 'Jubilación ordinaria', edadTxt(r.edad), 'is-new');
      return '<ol class="jm-print">' + rows + '</ol>' +
        '<div class="jm-print__foot">' + gauge(r.edad, { label: 'Edad ordinaria de jubilación: ' + edadTxt(r.edad) }) + '<p class="jm-print__note">' + (ej ? 'Ejemplo: nacimiento en ' + MESES[i.nacMes - 1] + ' de ' + i.nacAnio + ' y ' + i.cotAnios + ' años cotizados. Cambia los datos y calcula.' : (r.ya ? 'Ya has alcanzado tu edad ordinaria de jubilación.' : 'Te jubilas en ' + mesTxt(r.mes) + ', con ' + edadTxt(r.edad) + '.')) + (r.minimo ? '' : ' Con menos de 15 años cotizados no hay pensión contributiva.') + '</p></div>';
    },
    pension: function (i, ej) {
      var r = pension(i);
      var out = head(ej) + '<div class="jm-result__hero"><p class="jm-result__figure">' + eur(r.bruta) + ' <small>/ mes</small></p><p class="jm-result__sub">Pensión bruta estimada en 14 pagas: ' + eur(r.anual, 0) + ' al año.</p></div>';
      if (!r.minimo) return out + alert('Con menos de 15 años cotizados no se genera derecho a pensión contributiva de jubilación.') + notes('art. 205 LGSS.');
      out += kv([
        ['Base reguladora, método tradicional (300 meses / 350)', eur(r.brT), r.gana === 'tradicional' ? 'is-win' : ''],
        ['Base reguladora, método nuevo (' + r.dual[1] + ' mejores de ' + r.dual[0] + ' meses / ' + num(r.dual[2], 2) + ')', eur(r.brN), r.gana === 'nuevo' ? 'is-win' : ''],
        ['Porcentaje por ' + edadTxt(r.cot) + ' cotizados', pct(r.porcentaje)],
        ['Pensión máxima ' + CFG.anio, eur(CFG.pensionMax)]
      ]);
      out += '<div class="jm-explain"><p>Durante la transición, la Seguridad Social calcula tu base reguladora de las dos formas y aplica la que más te conviene. Con tus datos gana el <strong>método ' + (r.gana === 'nuevo' ? 'nuevo, porque descarta tus peores meses' : 'tradicional') + '</strong>.</p><p>Tu pensión es la base reguladora por el ' + pct(r.porcentaje) + ' que corresponde a tus años cotizados' + (r.tope ? ', limitada a la pensión máxima' : '') + '.</p></div>';
      return out + notes('arts. 209 y 210 LGSS; disposición transitoria 40ª LGSS (RDL 2/2023); RD 241/2026 (pensión máxima).', 'Simulamos tu historial a partir de una base media: el cálculo real usa tus bases mes a mes, actualizadas con el IPC. No incluye complementos (brecha de género, mínimos).');
    },
    anticipada: function (i, ej) {
      var r = anticipada(i);
      var out = head(ej) + '<div class="jm-result__hero"><p class="jm-result__figure">' + eur(r.final) + ' <small>/ mes</small></p><p class="jm-result__sub">Pensión con ' + r.meses + (r.meses === 1 ? ' mes' : ' meses') + ' de adelanto: ' + (r.sobreMax ? pct(r.coefMax) + ' sobre la pensión máxima' : pct(r.coef) + ' menos') + '.</p></div>';
      if (!r.cumpleCot) out += alert('La jubilación anticipada ' + r.tipo + ' exige ' + edadTxt(r.reqCot) + ' cotizados. Con ' + edadTxt(r.cot) + ' todavía no cumples este requisito.');
      if (!r.superaMin) out += alert('La pensión resultante (' + eur(r.final) + ') no supera la mínima que te correspondería a los 65 años (' + eur(r.minimo) + '). En ese caso la ley no permite la anticipada voluntaria.');
      out += kv([['Pensión sin adelanto', eur(Math.min(r.teorica, CFG.pensionMax))], ['Coeficiente reductor', r.sobreMax ? pct(r.coefMax) + ' (sobre la máxima)' : pct(r.coef)], ['Pierdes al mes', eur(r.perdidaMes)], ['Pierdes al año (14 pagas)', eur(r.perdidaAnio, 0)], ['Tramo de cotización', TRAMO_TXT[r.tramo]]]);
      out += '<div class="jm-explain"><p>El recorte es <strong>para siempre</strong>: se aplica sobre la cuantía de la pensión y no desaparece al cumplir la edad ordinaria. Cuantos más años cotizados, menor es el coeficiente.</p></div>';
      return out + notes((r.tipo === 'voluntaria' ? 'art. 208 LGSS' : 'art. 207 LGSS') + ' (redacción de la Ley 21/2021)' + (r.sobreMax ? ' y disposición transitoria 34ª LGSS' : '') + '.', r.sobreMax ? 'Si tu pensión teórica supera la máxima, el coeficiente específico sobre la pensión máxima es una aproximación.' : null);
    },
    neto: function (i, ej) {
      var r = neto(i);
      var out = head(ej) + '<div class="jm-result__hero"><p class="jm-result__figure">' + eur(r.netoMes) + ' <small>netos / mes</small></p><p class="jm-result__sub">En ' + r.ccaa + ', con ' + r.pagas + ' pagas. IRPF estimado: ' + eur(r.total, 0) + ' al año (' + pct(r.tipo, 1) + ').</p></div>';
      out += kv([['Pensión bruta anual', eur(r.anual, 0)], ['Reducción por rendimientos del trabajo', '-' + eur(r.red + 2000, 0)], ['Base liquidable', eur(r.base, 0)], ['Mínimo personal y por discapacidad', eur(r.minimo, 0)], ['Cuota estatal', eur(r.estatal, 0)], ['Cuota autonómica (' + r.ccaa + ')', eur(r.autonomica, 0)], ['Pensión neta anual', eur(r.netoAnual, 0), 'is-win']]);
      out += '<div class="jm-explain"><p>La pensión tributa como rendimiento del trabajo. Restamos 2.000 € de gastos, la reducción por rendimientos del trabajo y tu mínimo personal; después aplicamos la escala estatal y la de tu comunidad.</p><p>Tu retención mensual puede ser algo distinta: la diferencia se regulariza en la declaración de la renta.</p></div>';
      return out + notes('arts. 17, 19, 20, 57, 58, 60 y 63 de la Ley 35/2006 del IRPF y escala autonómica de ' + r.ccaa + '.', 'No incluye deducciones autonómicas, otras rentas ni el régimen foral de Navarra y País Vasco.');
    },
    demorada: function (i, ej) {
      var r = demorada(i);
      var out = head(ej) + '<div class="jm-result__hero"><p class="jm-result__figure">+' + pct(r.extra, 0) + ' <small>de pensión</small></p><p class="jm-result__sub">Pasarías de ' + eur(r.P) + ' a ' + eur(r.nueva) + ' al mes, de por vida.</p></div>';
      out += kv([
        ['Demora', r.anios * 12 + r.meses ? durTxt(r.anios * 12 + r.meses) : 'Sin demora'],
        ['Complemento anual (14 pagas)', eur(r.complementoAnual, 0)],
        ['Pensión que dejas de cobrar mientras trabajas', eur(r.dejas, 0)],
        ['Recuperas esa diferencia en', isFinite(r.recuperaAnios) ? num(r.recuperaAnios, 1) + ' años' : '-'],
        ['Jubilación activa: pensión compatible', r.anios >= 1 ? pct(r.activaPct, 0) + ' (' + eur(r.activaImporte) + ')' : 'Requiere 1 año de demora'],
        ['Jubilación flexible con jornada del ' + r.jornada + ' %', eur(r.flexImporte) + ' / mes']
      ]);
      out += '<div class="jm-explain"><p>Cada año completo trabajado después de tu edad ordinaria suma un 4 %; a partir del segundo año completo, 6 meses más suman un 2 %. En lugar del porcentaje puedes pedir un pago único por año (entre unos 4.800 € y 13.600 €, según tu pensión) o la fórmula mixta.</p>' + (r.sobreMax ? '<p>Si con el incremento superas la pensión máxima, el exceso se cobra como una cantidad anual aparte.</p>' : '') + '</div>';
      return out + notes('art. 210.2 LGSS (jubilación demorada), art. 214 LGSS (jubilación activa) y RD 416/2026 (jubilación flexible y opción mixta, en vigor desde el 28 de agosto de 2026).', 'El pago único se muestra como horquilla orientativa: su importe exacto depende de tu pensión inicial y de tus años cotizados.');
    },
    viudedad: function (i, ej) {
      var r = viudedad(i);
      var out = head(ej) + '<div class="jm-result__hero"><p class="jm-result__figure">' + eur(r.total) + ' <small>/ mes</small></p><p class="jm-result__sub">' + pct(r.porc, r.porc % 1 ? 1 : 0) + ' de la base reguladora' + (r.complemento ? ' más el complemento a mínimos' : '') + ', en 14 pagas (' + eur(r.anual, 0) + ' al año).</p></div>';
      out += kv([['Base reguladora de la persona fallecida', eur(r.br)], ['Porcentaje aplicado', pct(r.porc, r.porc % 1 ? 1 : 0) + (r.reducida ? ' (70 % reducido por el límite de ingresos)' : '')], ['Pensión calculada', eur(r.importe)], ['Pensión mínima de tu situación', eur(r.minimo)], ['Complemento a mínimos', r.complemento ? eur(r.complemento) : 'No aplica']]);
      out += '<div class="jm-explain"><p>' + r.motivo + '</p>' + (r.complemento ? '<p>Como tu pensión queda por debajo de la mínima y tus ingresos no superan ' + eur(CFG.limiteIngresosMinimos, 0) + ' al año, podrías cobrar el complemento a mínimos.</p>' : '') + '</div>';
      return out + notes('art. 219 LGSS; art. 31 del Decreto 3158/1966 (52 y 70 %); RD 900/2018 (60 %); RD 241/2026 (mínimos).', 'Tampoco se comprueban aquí el límite de ingresos por miembro de la familia de las cargas familiares, los requisitos de parejas de hecho y personas separadas o divorciadas, ni el periodo de cotización previo.');
    },
    incapacidad: function (i, ej) {
      var r = incapacidad(i);
      if (r.grado === 'parcial') return head(ej) + '<div class="jm-result__hero"><p class="jm-result__figure">' + eur(r.unica, 0) + '</p><p class="jm-result__sub">Indemnización única: 24 mensualidades de tu base reguladora.</p></div>' + notes('art. 196.1 LGSS.');
      var nombres = { total: 'Incapacidad permanente total', absoluta: 'Incapacidad permanente absoluta', gran: 'Gran incapacidad' };
      var out = head(ej) + '<div class="jm-result__hero"><p class="jm-result__figure">' + eur(r.total) + ' <small>/ mes</small></p><p class="jm-result__sub">' + nombres[r.grado] + ': ' + pct(r.porc, 0) + ' de la base reguladora' + (r.complemento ? ' más el complemento para la persona que te asiste' : '') + '.</p></div>';
      var rows = [['Base reguladora', eur(r.br)], ['Porcentaje', pct(r.porc, 0) + (r.grado === 'total' && r.porc === 75 ? ' (total cualificada)' : '')], ['Pensión', eur(r.mensual)]];
      if (r.complemento) rows.push(['Complemento de gran incapacidad', eur(r.complemento)]);
      rows.push(['Pensión mínima de referencia (con cónyuge a cargo)', eur(r.minimo)], ['Importe anual (14 pagas)', eur(r.anual, 0)]);
      out += kv(rows);
      out += '<div class="jm-explain"><p>' + (r.grado === 'total' ? 'La total impide hacer tu profesión habitual, pero puedes trabajar en otra. A partir de los 55 años puede subir al 75 % (total cualificada) si te resulta difícil encontrar empleo.' : r.grado === 'absoluta' ? 'La absoluta impide cualquier profesión u oficio. Cobras el 100 % de la base reguladora.' : 'La gran incapacidad suma al 100 % un complemento para pagar a la persona que te ayuda: el 45 % de la base mínima de cotización más el 30 % de tu última base.') + '</p></div>';
      return out + notes('arts. 193 a 196 LGSS; RD 241/2026 (mínimos).', 'El cálculo de la base reguladora depende de si la incapacidad deriva de enfermedad común, accidente o enfermedad profesional.');
    },
    ahorro: function (i, ej) {
      var r = ahorro(i);
      var out = head(ej) + '<div class="jm-result__hero"><p class="jm-result__figure">' + eur(r.mensual, 0) + ' <small>/ mes</small></p><p class="jm-result__sub">Es lo que necesitarías ahorrar durante ' + num(r.n, 0) + ' años para cubrir tu objetivo hasta los ' + num(f(i.edadFin, 90), 0) + '.</p></div>';
      out += kv([['Hueco mensual a cubrir (pensión frente a gasto deseado)', eur(r.hueco, 0)], ['La pensión cubre', pct(r.cubre, 0) + ' de tu objetivo'], ['Capital necesario al jubilarte (euros de hoy)', eur(r.capital, 0)], ['El mismo capital en euros de entonces', eur(r.capitalNominal, 0)], ['Lo que tu ahorro actual llegará a valer', eur(r.fv, 0)], ['Capital que te falta', eur(r.falta, 0), 'is-win']]);
      out += '<div class="jm-explain"><p>Trabajamos en euros de hoy: descontamos la inflación de la rentabilidad para que las cifras sean comparables con tu nivel de vida actual. Convertimos la pensión de 14 pagas a su equivalente mensual.</p></div>';
      return out + notes('cálculo financiero de valor actual y futuro con rentabilidad real constante.', 'La rentabilidad no está garantizada. Esto no es asesoramiento financiero personalizado.');
    },
    comparador: function (i, ej) {
      var r = comparador(i);
      var ed = function (x) { return num(x, 1).replace(',0', ''); };
      var out = head(ej) + '<div class="jm-result__hero"><p class="jm-result__figure">' + (r.cruceOA ? ed(r.cruceOA) + ' <small>años</small>' : 'Más de ' + r.fin) + '</p><p class="jm-result__sub">' + (r.cruceOA ? 'A partir de esa edad, esperar a la jubilación ordinaria te deja más dinero en total que adelantarla ' + r.m + ' meses.' : 'Hasta los ' + r.fin + ' años, la anticipada te deja más dinero acumulado que la ordinaria.') + '</p></div>';
      out += chart(r);
      out += kv(r.esc.map(function (s) { return [s.nombre + ': ' + eur(s.mensual, 0) + '/mes desde los ' + ed(s.inicio) + ' años. Total a los ' + r.fin, eur(s.total, 0), s.total === Math.max(r.esc[0].total, r.esc[1].total, r.esc[2].total) ? 'is-win' : '']; }));
      out += '<div class="jm-explain"><p>' + (r.cruceDO ? 'Retrasarla ' + r.y + (r.y === 1 ? ' año' : ' años') + ' empieza a compensar frente a la ordinaria a los <strong>' + ed(r.cruceDO) + ' años</strong>.' : 'Retrasarla ' + r.y + (r.y === 1 ? ' año' : ' años') + ' no llega a compensar en dinero total antes de los ' + r.fin + ', aunque te deja una pensión mensual más alta de por vida.') + ' La anticipada aplica un coeficiente del ' + pct(r.coef) + ' para siempre.</p></div>';
      return out + notes('arts. 205, 208 y 210 LGSS.', 'No incluye impuestos ni el salario que cobrarías mientras sigues trabajando. Revalorización supuesta: ' + pct(f(i.reval, 2), 1) + ' anual.');
    }
  };

  function chart(r) {
    var W = 560, H = 260, pl = 58, pr = 12, pt = 12, pb = 34;
    var x0 = r.esc[0].inicio, x1 = r.fin, maxY = 0;
    r.esc.forEach(function (s) { maxY = Math.max(maxY, s.total); });
    var stepY = Math.pow(10, Math.floor(Math.log10(maxY || 1))) / 2; while (maxY / stepY > 5) stepY *= 2;
    var topY = Math.ceil(maxY / stepY) * stepY || 1;
    function X(a) { return pl + (a - x0) / (x1 - x0) * (W - pl - pr); }
    function Y(v) { return pt + (1 - v / topY) * (H - pt - pb); }
    var g = '<g class="jm-chart__grid">', ax = '<g class="jm-chart__axis">';
    for (var v = 0; v <= topY + 1; v += stepY) { g += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + Y(v).toFixed(1) + '" y2="' + Y(v).toFixed(1) + '"/>'; ax += '<text x="' + (pl - 8) + '" y="' + (Y(v) + 4).toFixed(1) + '" text-anchor="end">' + (v >= 1000 ? num(v / 1000, 0) + ' mil' : num(v, 0)) + '</text>'; }
    for (var a = Math.ceil(x0); a <= x1; a += (x1 - x0 > 20 ? 4 : 2)) ax += '<text x="' + X(a).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="middle">' + a + '</text>';
    g += '</g>'; ax += '</g>';
    var cols = { anticipada: '#8FA6BD', ordinaria: '#12304F', demorada: '#2E7359' };
    var lines = r.esc.map(function (s) {
      var d = '', started = false;
      s.puntos.forEach(function (p, k) { if (k % 3 && k !== s.puntos.length - 1) return; d += (started ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); started = true; });
      return '<path class="jm-chart__line" stroke="' + cols[s.id] + '" d="' + d + '"' + (s.id === 'anticipada' ? ' stroke-dasharray="7 5"' : '') + '/>';
    }).join('');
    var mark = r.cruceDO ? '<circle cx="' + X(r.cruceDO).toFixed(1) + '" cy="' + Y(r.esc[2].puntos[Math.round((r.cruceDO - x0) * 12)][1]).toFixed(1) + '" r="6" fill="#fff" stroke="#2E7359" stroke-width="3"/>' : '';
    return '<figure class="jm-chart" style="margin:0"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Ingresos acumulados por edad en los tres escenarios">' + g + ax + lines + mark + '</svg>' +
      '<figcaption class="jm-legend"><span><i style="background:#8FA6BD"></i>Anticipada</span><span><i style="background:#12304F"></i>Ordinaria</span><span><i style="background:#2E7359"></i>Demorada</span></figcaption></figure>';
  }

  /* ---------- 6. ENLACE CON LA PÁGINA (solo navegador) --------------------- */
  function readForm(form) {
    var o = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      if (el.type === 'checkbox') o[el.name] = el.checked;
      else if (el.type === 'radio') { if (el.checked) o[el.name] = el.value; }
      else o[el.name] = el.value;
    });
    ['nacAnio', 'nacMes', 'cotAnios', 'cotMeses'].forEach(function (k) { if (k in o) o[k] = f(o[k]); });
    return o;
  }
  function countUp(el) {
    if (!el || (root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    var node = el.firstChild; if (!node || node.nodeType !== 3) return;
    var m = node.nodeValue.match(/^([+-]?)([\d.]+)(,\d+)?(.*)$/); if (!m) return;
    var target = parseFloat(m[2].replace(/\./g, '') + (m[3] ? '.' + m[3].slice(1) : '')), dec = m[3] ? m[3].length - 1 : 0;
    var t0 = null, dur = 650;
    function tick(t) { t0 = t0 || t; var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); node.nodeValue = m[1] + num(target * e, dec) + m[4]; if (k < 1) requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }
  // La impresora de la libreta: el apunte nuevo se escribe carácter a carácter y después cae el sello
  // El resultado aparece de una vez: sin el efecto de impresora de la versión anterior
  function printRow(out) {
    return;
    var row = out.querySelector('.jm-print__row.is-new'), book = out.closest ? out.closest('.jm-passbook') : null;
    if (!row || !book) return;
    book.classList.remove('is-stamped');
    if (root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches) { book.classList.add('is-stamped'); return; }
    var cells = Array.prototype.slice.call(row.children), texts = cells.map(function (c) { return c.textContent; }), k = 0, j = 0;
    cells.forEach(function (c) { c.textContent = ''; });
    book.classList.add('is-printing');
    (function step() {
      if (k >= cells.length) { cells[cells.length - 1].classList.remove('jm-caret'); book.classList.remove('is-printing'); void book.offsetWidth; book.classList.add('is-stamped'); return; }
      cells.forEach(function (c) { c.classList.remove('jm-caret'); });
      cells[k].classList.add('jm-caret');
      cells[k].textContent = texts[k].slice(0, ++j);
      if (j >= texts[k].length) { k++; j = 0; }
      setTimeout(step, 26);
    })();
  }
  function bind() {
    var forms = document.querySelectorAll('form[data-jm-calc]');
    Array.prototype.forEach.call(forms, function (form) {
      var id = form.getAttribute('data-jm-calc');
      var out = document.querySelector('[data-jm-result="' + (form.getAttribute('data-jm-target') || id) + '"]');
      if (!out || !RENDER[id]) return;
      var live = false;
      function run() {
        try {
          var html = RENDER[id](readForm(form), false);
          var old = out.querySelector('.jm-gauge__needle'), oldStyle = old && old.getAttribute('style');
          out.innerHTML = html;
          // La aguja parte de su posición anterior para que el giro sea visible
          var nw = out.querySelector('.jm-gauge__needle');
          if (nw && oldStyle) { var target = nw.getAttribute('style'); nw.setAttribute('style', oldStyle); nw.getBoundingClientRect(); requestAnimationFrame(function () { nw.setAttribute('style', target); }); }
          out.classList.remove('is-updating'); void out.offsetWidth; out.classList.add('is-updating');
          countUp(out.querySelector('.jm-result__figure'));
          printRow(out);
        } catch (e) { if (root.console) console.error(e); }
      }
      // El ejemplo escrito en la página se rehace con las cifras de CFG si su texto no coincide:
      // así no se queda desfasado cuando cambian las cuantías o la fecha de actualización.
      try {
        var ej = document.createElement('div'); ej.innerHTML = RENDER[id](readForm(form), true);
        if (ej.textContent.replace(/\s+/g, '') !== out.textContent.replace(/\s+/g, '')) out.innerHTML = ej.innerHTML;
      } catch (e) { if (root.console) console.error(e); }
      form.addEventListener('submit', function (ev) {
        ev.preventDefault(); live = true; run();
        if (form.hasAttribute('data-jm-scroll') && root.innerWidth < 1000 && out.scrollIntoView) out.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      form.addEventListener('change', function () { if (live) run(); });
      // Campos que dependen de otros (p. ej. 48 meses solo en involuntaria)
      form.addEventListener('change', function (ev) {
        if (ev.target.name === 'tipo') { var mm = form.querySelector('[name="meses"]'); if (mm) { mm.max = ev.target.value === 'involuntaria' ? 48 : 24; if (+mm.value > +mm.max) mm.value = mm.max; } }
        if (ev.target.name === 'grado') { var u = form.querySelector('[data-jm-show="gran"]'); if (u) u.hidden = ev.target.value !== 'gran'; var t = form.querySelector('[data-jm-show="total"]'); if (t) t.hidden = ev.target.value !== 'total'; }
      });
    });
  }

  var API = { CFG: CFG, EDAD: EDAD, DUAL: DUAL, VOL: VOL, INVOL: INVOL, CCAA: CCAA, ESTATAL: ESTATAL, TRAMO_TXT: TRAMO_TXT, edad: edad, pension: pension, anticipada: anticipada, neto: neto, demorada: demorada, viudedad: viudedad, incapacidad: incapacidad, ahorro: ahorro, comparador: comparador, coeficiente: coeficiente, porcentajeCot: porcentajeCot, render: RENDER, gauge: gauge, chart: chart, num: num, eur: eur, edadTxt: edadTxt, mesTxt: mesTxt };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else {
    root.JM = API;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind); else bind();
  }
})(typeof window !== 'undefined' ? window : globalThis);
