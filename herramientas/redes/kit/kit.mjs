// Kit de redes de Jubilómetro: foto de perfil, portadas de cada red, diapositivas de los carruseles
// del mes e imágenes con la cifra. Todo sale de aquí con el mismo diseño que la web y los vídeos
// (tinta #0F1B2D, azul #1D4ED8, Newsreader para titulares y Public Sans para el texto).
//
// Uso:  NODE_PATH=$(npm root -g) node herramientas/redes/kit/kit.mjs [mes-1.mjs] [--solo=perfil,portadas,carruseles,cifras]
//       Las imágenes van a publicacion/redes/kit/ y la hoja de muestra a publicacion/redes/kit/index.html.
//       Con --banco hace las del banco de publicaciones (herramientas/redes/banco): los carruseles de Instagram
//       en publicacion/redes/banco/carruseles/<id>/ y las imágenes con la cifra en publicacion/redes/banco/cifras/<id>.png.
// Los carruseles con corchetes por rellenar ([X,X], [___]) no se generan: se hacen el día del dato.
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { RAIZ } from '../../publicar/articulos.mjs';
import { CIFRAS } from './cifras.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const MES = join(RAIZ, args.find((a) => !a.startsWith('--')) || 'herramientas/redes/mes-1.mjs');
const SOLO = (args.find((a) => a.startsWith('--solo=')) || '').slice(7).split(',').filter(Boolean);
const DEL_BANCO = args.includes('--banco');
// Del banco solo salen carruseles e imágenes con la cifra: el perfil y las portadas son del kit
const quiero = (k) => (!DEL_BANCO || ['carruseles', 'cifras'].includes(k)) && (!SOLO.length || SOLO.includes(k));
const SALIDA = join(RAIZ, 'publicacion', 'redes', DEL_BANCO ? 'banco' : 'kit');
const NAVEGADOR = process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const { PUBLICACIONES } = DEL_BANCO ? { PUBLICACIONES: (await import('../banco/index.mjs')).BANCO } : await import(pathToFileURL(MES).href);
const LISTA_CIFRAS = DEL_BANCO
  ? PUBLICACIONES.filter((p) => p.cifra).map((p) => ({ archivo: p.id, nombre: `${p.id} (${p.red})`, ante: 'La cifra', ...p.cifra }))
  : CIFRAS;
// Fecha en que se comprobaron las cifras (pie de la última diapositiva)
const COMPROBADAS = DEL_BANCO ? 'Datos comprobados el 12 de octubre de 2026' : 'Cifras de 2026, comprobadas el 9 de octubre de 2026';

/* ---------- Marca ---------- */
const FUENTES = join(RAIZ, 'tema', 'jubilometro', 'assets', 'fonts');
const b64 = (f) => readFileSync(join(FUENTES, f)).toString('base64');
const FONT_CSS = `
@font-face { font-family: "Newsreader"; font-style: normal; font-weight: 200 800; src: url(data:font/woff2;base64,${b64('newsreader-normal-latin.woff2')}) format("woff2"); }
@font-face { font-family: "Public Sans"; font-style: normal; font-weight: 100 900; src: url(data:font/woff2;base64,${b64('public-sans-normal-latin.woff2')}) format("woff2"); }`;

const C = { ink: '#0F1B2D', ink2: '#16253B', blue: '#1D4ED8', navy: '#1E3A8A', sky: '#93C5FD', sky2: '#60A5FA', gold: '#FDE68A', paper: '#FFFFFF', tint: '#F4F7FB', text: '#1F2B3D', muted: '#4A5568', line: '#D8E0EA', sage: '#C7D7FE' };

// El indicador de la web: arco, aguja y eje (favicon.svg)
const marca = (fondo = C.blue, aguja = C.sky, rx = 11) => `<svg viewBox="0 0 40 40" aria-hidden="true">${fondo ? `<rect width="40" height="40" rx="${rx}" fill="${fondo}"/>` : ''}<path d="M9.5 27a10.5 10.5 0 0 1 21 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M20 27l5.8-7.6" stroke="${aguja}" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="27" r="2.7" fill="#fff"/></svg>`;

// Grabado de billete (guilloché), el mismo dibujo que las cabeceras de la web
function roseta(cx, cy, R, { color = C.sky2, opacidad = 0.2, curvas = 24, ancho = 1.4, a1 = 30, a2 = 14 } = {}) {
  const k = R / 240, paths = [];
  for (let i = 0; i < curvas; i++) {
    const f = (i / curvas) * Math.PI * 2; let d = '';
    for (let j = 0; j <= 360; j++) {
      const t = (j / 360) * Math.PI * 2, r = R + a1 * k * Math.sin(7 * t + f) + a2 * k * Math.cos(12 * t - 2 * f);
      d += `${j ? 'L' : 'M'}${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`;
    }
    paths.push(`<path d="${d}Z"/>`);
  }
  return `<g fill="none" stroke="${color}" stroke-width="${ancho}" opacity="${opacidad}">${paths.join('')}</g>`;
}
function ondas(w, y0, { color = C.sky2, opacidad = 0.25, n = 7, ancho = 1.4 } = {}) {
  const paths = [];
  for (let i = 0; i < n; i++) {
    let d = '';
    for (let x = 0; x <= w + 8; x += 6) { const y = y0 + i * 7 + 9 * Math.sin(x * 0.012 + i * 0.55) + 5 * Math.sin(x * 0.031 - i * 0.9); d += `${x ? 'L' : 'M'}${x} ${y.toFixed(1)}`; }
    paths.push(`<path d="${d}"/>`);
  }
  return `<g fill="none" stroke="${color}" stroke-width="${ancho}" opacity="${opacidad}">${paths.join('')}</g>`;
}
const fondoSvg = (w, h, cuerpo) => `<svg class="fondo" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">${cuerpo}</svg>`;

/* ---------- Texto ---------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// La cifra no se separa de su unidad («52 %», «936,20 €»). Se escribe   para que se vea en el código
const NB = ' ';
const nb = (s) => s.replace(/(\d) (%|€|euros\b|años\b|meses\b|días\b|hijos\b)/g, `$1${NB}$2`);
// Cifras con unidad, también en horquilla («709,40 y 1.256,60 €», «38 años y 6 meses») y fechas («el 22 y el 26 de noviembre»)
const MESES = 'enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre';
const CIFRA = new RegExp(String.raw`(\d[\d.,]*(?: (?:y|a) \d[\d.,]*)?[  ]?(?:%|€|euros\b|años(?: y \d+[  ]meses)?(?![\wáéíóúñ])|meses\b|días\b|pagas\b|plazas\b|hijos\b)|(?<![\d.,])\d{1,2}(?: y el \d{1,2})? de (?:${MESES})\b)`, 'gu');
const resalta = (s) => esc(nb(s)).replace(CIFRA, '<em>$1</em>');

/* ---------- Página base ---------- */
const BASE_CSS = `${FONT_CSS}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { background: transparent; }
body { font-family: "Public Sans", Arial, sans-serif; -webkit-font-smoothing: antialiased; font-kerning: normal; font-variant-numeric: lining-nums; }
.lienzo { position: relative; overflow: hidden; }
.fondo { position: absolute; inset: 0; pointer-events: none; }
.serif { font-family: "Newsreader", Georgia, serif; font-optical-sizing: auto; }
em { font-style: normal; }
.marca { display: flex; align-items: center; gap: .32em; font: 600 1em/1 "Newsreader", Georgia, serif; letter-spacing: -.012em; white-space: nowrap; }
.marca svg { width: 1.25em; height: 1.25em; flex: none; }
.fit { overflow: hidden; }`;

// Reduce la letra hasta que el texto cabe en su caja (y no deja una palabra sola al final)
const FIT_JS = `
document.querySelectorAll('[data-fit]').forEach(function (el) {
  var max = +el.dataset.fit, min = +el.dataset.min || 24, box = el.closest('[data-box]') || el.parentElement;
  el.style.fontSize = max + 'px';
  function sobra() { return box.scrollHeight > box.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1; }
  while (sobra() && max > min) { max -= 2; el.style.fontSize = max + 'px'; }
});
document.body.dataset.listo = '1';`;

const pagina = (w, h, css, cuerpo, clase = '') => `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${BASE_CSS}
.lienzo { width: ${w}px; height: ${h}px; }
${css}</style></head><body><div class="lienzo${clase ? ' ' + clase : ''}">${cuerpo}</div><script>document.fonts.ready.then(function(){${FIT_JS}});</script></body></html>`;

/* ---------- Piezas ---------- */
const piezas = []; // { grupo, titulo, archivo, w, h, html, nota }
const pieza = (p) => piezas.push(p);

// 1. Foto de perfil (vale para todas las redes; se recorta en círculo)
if (quiero('perfil')) {
  pieza({
    grupo: 'Perfil', titulo: 'Foto de perfil (todas las redes)', archivo: 'perfil/jubilometro-perfil.png', w: 1080, h: 1080,
    nota: 'Facebook, grupo, Instagram, WhatsApp, X, YouTube, TikTok y LinkedIn. Se ve bien recortada en círculo.',
    html: pagina(1080, 1080, `
      .lienzo { background: radial-gradient(circle at 50% 42%, #2C5FE6 0%, ${C.blue} 46%, #1B45C4 100%); }
      .m { position: absolute; left: 50%; top: 50%; width: 1000px; height: 1000px; transform: translate(-50%, -55.9%); }
      .m svg { width: 100%; height: 100%; }`,
      `<div class="m">${marca(null, C.sky)}</div>`),
  });
}

// 2. Portadas
const LEMA = 'Jubilación y pensiones en España, con las cuentas claras.';
const LEMA2 = 'Cada cifra con su norma y su fecha.';
const PORTADA_CSS = `
  .lienzo { background: ${C.ink}; color: #fff; }
  .bloque { position: absolute; }
  .bloque .marca { color: #fff; }
  .bloque .marca svg rect { fill: ${C.blue}; }
  .lema { font: 600 1em/1.12 "Newsreader", Georgia, serif; letter-spacing: -.01em; text-wrap: balance; }
  .lema2 { font-weight: 600; color: ${C.sky}; letter-spacing: .01em; }
  .web { font-weight: 700; color: ${C.gold}; letter-spacing: .02em; }
  .chips { display: flex; gap: .5em; flex-wrap: wrap; }
  .chips span { border: 2px solid rgb(147 197 253 / .45); border-radius: 999px; padding: .32em .9em; color: #DCE7F7; font-weight: 600; }`;
function portada(archivo, titulo, w, h, nota, contenido, dibujo) {
  pieza({ grupo: 'Portadas', titulo, archivo: `portadas/${archivo}`, w, h, nota, html: pagina(w, h, PORTADA_CSS, fondoSvg(w, h, dibujo) + contenido) });
}
if (quiero('portadas')) {
  // Facebook: 1640 × 856. En ordenador se ve la franja central de 1640 × 624; en el móvil se recortan los lados.
  // La foto de perfil queda debajo, a la izquierda: el texto va en la zona segura central.
  portada('facebook-pagina-1640x856.png', 'Facebook · portada de la página', 1640, 856,
    'Sube la imagen tal cual: lo importante está en la zona que Facebook enseña en el móvil y en el ordenador.',
    `<div class="bloque" style="left:200px;top:190px;width:860px">
       <div class="marca" style="font-size:96px">${marca()}Jubilómetro</div>
       <p class="lema" style="font-size:56px;margin-top:40px">${esc(LEMA)}</p>
       <p class="lema2" style="font-size:34px;margin-top:22px">${esc(LEMA2)}</p>
       <p class="web" style="font-size:34px;margin-top:34px">jubilometro.com</p>
     </div>`,
    roseta(1250, 430, 270, { opacidad: 0.26 }) + roseta(1250, 430, 150, { opacidad: 0.16, color: C.sky }) + ondas(1640, 760, { opacidad: 0.18 }));

  portada('facebook-grupo-1640x856.png', 'Facebook · portada del grupo', 1640, 856,
    'Para el grupo «Jubilación y pensiones: dudas resueltas».',
    `<div class="bloque" style="left:200px;top:170px;width:1000px">
       <div class="marca" style="font-size:48px;color:${C.sky}">${marca()}Grupo de Jubilómetro</div>
       <p class="lema" style="font-size:84px;margin-top:34px">Jubilación y pensiones: <span style="color:${C.gold}">dudas resueltas</span></p>
       <p style="font-size:34px;line-height:1.35;margin-top:28px;color:#DCE7F7;font-weight:500;max-width:900px">Pregunta tu duda sin datos personales y te contestamos con la ley en la mano.</p>
     </div>`,
    roseta(1360, 420, 230, { opacidad: 0.24 }) + roseta(1360, 420, 120, { opacidad: 0.16, color: C.sky }) + ondas(1640, 770, { opacidad: 0.16 }));

  // X: 1500 × 500. La foto de perfil tapa la esquina de abajo a la izquierda; arriba y abajo se recortan en algunos móviles.
  portada('x-1500x500.png', 'X (Twitter) · cabecera', 1500, 500,
    'La foto de perfil tapa la esquina de abajo a la izquierda: ahí solo hay dibujo.',
    `<div class="bloque" style="right:110px;top:120px;width:880px;text-align:right">
       <p class="lema" style="font-size:54px">${esc(LEMA)}</p>
       <p class="lema2" style="font-size:28px;margin-top:20px">${esc(LEMA2)} · <span class="web" style="font-size:28px">jubilometro.com</span></p>
     </div>`,
    roseta(250, 210, 200, { opacidad: 0.22 }) + roseta(250, 210, 110, { opacidad: 0.15, color: C.sky }));

  // YouTube: 2560 × 1440. En el móvil solo se ve la franja central de 1546 × 423.
  portada('youtube-2560x1440.png', 'YouTube · imagen del canal', 2560, 1440,
    'En el móvil solo se ve la franja central; en la tele, la imagen entera.',
    `<div class="bloque" style="left:507px;top:508px;width:1546px;height:423px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
       <div class="marca" style="font-size:104px">${marca()}Jubilómetro</div>
       <p class="lema" style="font-size:54px;margin-top:30px;white-space:nowrap">${esc(LEMA)}</p>
       <p class="lema2" style="font-size:34px;margin-top:18px">Vídeos de 30 segundos con la cifra que te toca · <span class="web">jubilometro.com</span></p>
     </div>`,
    roseta(1280, 720, 620, { opacidad: 0.09 }) + roseta(330, 260, 240, { opacidad: 0.12 }) + roseta(2230, 1180, 260, { opacidad: 0.12 }) + ondas(2560, 1230, { opacidad: 0.12, n: 9 }));

  // LinkedIn: página de empresa 1128 × 191 (el logo tapa la izquierda) y perfil personal 1584 × 396 (la foto, abajo a la izquierda)
  portada('linkedin-pagina-1128x191.png', 'LinkedIn · portada de la página de Jubilómetro', 1128, 191,
    'El logo de la página tapa la parte izquierda: el texto va a la derecha.',
    `<div class="bloque" style="right:56px;top:0;height:191px;width:720px;display:flex;flex-direction:column;justify-content:center;text-align:right">
       <p class="lema" style="font-size:31px">${esc(LEMA)}</p>
       <p class="lema2" style="font-size:18px;margin-top:10px">Guías y calculadoras gratuitas, también para tu web · <span class="web">jubilometro.com</span></p>
     </div>`,
    roseta(170, 95, 120, { opacidad: 0.22, ancho: 1 }));

  portada('linkedin-perfil-1584x396.png', 'LinkedIn · fondo del perfil de Pau', 1584, 396,
    'La foto de perfil queda abajo a la izquierda: el texto va a la derecha.',
    `<div class="bloque" style="right:90px;top:0;height:396px;width:860px;display:flex;flex-direction:column;justify-content:center;text-align:right">
       <div class="marca" style="font-size:40px;justify-content:flex-end;color:${C.sky}">${marca()}Jubilómetro</div>
       <p class="lema" style="font-size:44px;margin-top:20px">${esc(LEMA)}</p>
       <p class="lema2" style="font-size:24px;margin-top:14px">Guías y calculadoras gratuitas para particulares, gestorías y asociaciones</p>
     </div>`,
    roseta(300, 160, 190, { opacidad: 0.2 }) + ondas(1584, 330, { opacidad: 0.14 }));
}

// 3. Carruseles de Instagram (1080 × 1350): portada oscura, diapositivas claras y cierre azul
const CARRUSEL_CSS = `
  .lienzo { color: ${C.text}; }
  .cab, .pie { position: absolute; left: 88px; right: 88px; display: flex; align-items: center; justify-content: space-between; }
  .cab { top: 72px; height: 60px; }
  .pie { bottom: 64px; height: 48px; font-weight: 700; font-size: 28px; letter-spacing: .02em; }
  .num { font: 700 28px/1 "Public Sans", Arial, sans-serif; letter-spacing: .08em; }
  .marca { font-size: 38px; }
  .zona { position: absolute; left: 88px; right: 88px; top: 200px; bottom: 170px; display: flex; flex-direction: column; justify-content: center; }
  .ante { font: 800 28px/1.2 "Public Sans", Arial, sans-serif; letter-spacing: .14em; text-transform: uppercase; }
  /* Portada */
  .s-portada { background: ${C.ink}; color: #fff; }
  .s-portada .marca { color: #fff; }
  .s-portada .num, .s-portada .ante { color: ${C.sky}; }
  .s-portada h1 { font: 600 104px/1.04 "Newsreader", Georgia, serif; letter-spacing: -.02em; margin-top: 34px; text-wrap: balance; }
  .s-portada h1 .dos { display: block; color: ${C.gold}; margin-top: .18em; }
  .s-portada h1 em { color: ${C.gold}; }
  .s-portada .pie { color: ${C.sky}; }
  .desliza { display: flex; align-items: center; gap: 14px; }
  .desliza svg { width: 54px; height: 28px; }
  /* Diapositivas */
  .s-dato { background: ${C.paper}; }
  .s-dato .marca { color: ${C.ink}; }
  .s-dato .num { color: ${C.muted}; }
  .s-dato .ante { color: ${C.blue}; margin-bottom: 30px; }
  .frase { font: 500 76px/1.16 "Newsreader", Georgia, serif; color: ${C.ink}; letter-spacing: -.012em; text-wrap: pretty; }
  .frase em, .resto em { color: ${C.navy}; font-weight: 650; background: linear-gradient(transparent 62%, ${C.sage} 62%, ${C.sage} 92%, transparent 92%); -webkit-box-decoration-break: clone; box-decoration-break: clone; }
  .cifra { font: 600 230px/.95 "Newsreader", Georgia, serif; color: ${C.navy}; letter-spacing: -.03em; white-space: nowrap; font-variant-numeric: lining-nums tabular-nums; }
  .resto { font: 500 54px/1.3 "Public Sans", Arial, sans-serif; color: ${C.text}; margin-top: 34px; text-wrap: pretty; }
  .flecha { width: 120px; height: 60px; color: ${C.blue}; margin: 26px 0; }
  .de { font: 500 60px/1.22 "Newsreader", Georgia, serif; color: ${C.text}; }
  .a { font: 600 84px/1.1 "Newsreader", Georgia, serif; color: ${C.ink}; letter-spacing: -.012em; }
  .a em, .de em { color: ${C.navy}; }
  .s-dato .pie { color: ${C.blue}; }
  .barras { display: flex; gap: 10px; }
  .barras i { width: 34px; height: 8px; border-radius: 8px; background: ${C.line}; }
  .barras i.on { background: ${C.blue}; }
  .s-dato .regla { position: absolute; left: 0; top: 0; bottom: 0; width: 14px; background: ${C.blue}; }
  /* Cierre */
  .s-cierre { background: ${C.blue}; color: #fff; }
  .s-cierre .marca { color: #fff; }
  .s-cierre .num { color: #DBE7FF; }
  .iconos { display: flex; gap: 22px; margin-bottom: 44px; }
  .iconos span { width: 104px; height: 104px; border-radius: 50%; background: rgb(255 255 255 / .14); display: grid; place-items: center; }
  .iconos svg { width: 52px; height: 52px; }
  .s-cierre h2 { font: 600 88px/1.08 "Newsreader", Georgia, serif; letter-spacing: -.015em; text-wrap: balance; }
  .s-cierre .sub { font: 500 46px/1.34 "Public Sans", Arial, sans-serif; color: #DBE7FF; margin-top: 34px; }
  .s-cierre .pie { color: #fff; }
  .s-cierre .fecha { position: absolute; left: 88px; right: 88px; bottom: 132px; font: 600 24px/1.3 "Public Sans", Arial, sans-serif; color: #DBE7FF; letter-spacing: .01em; }`;

const ICONO = {
  guardar: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12v18l-6-4.5L6 21z"/></svg>',
  enviar: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/></svg>',
  flecha: '<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 30h100M86 10l22 20-22 20"/></svg>',
  desliza: '<svg viewBox="0 0 54 28" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h44M36 4l12 10-12 10"/></svg>',
};

// Lee una diapositiva: «52 %: …» (cifra), «Grado III: …» (antetítulo), «800 € → …» (flecha) o frase
function leer(texto) {
  const t = texto.trim();
  let ante = '', resto = t;
  const dos = t.match(/^([^:]{2,34}):\s+(.+)$/s);
  if (dos) {
    const [, pre, post] = dos;
    if (/\d/.test(pre) && pre.length <= 8) return { tipo: 'cifra', cifra: pre, resto: post };
    if (!/\d/.test(pre)) { ante = pre; resto = post; }
  }
  const fl = resto.split(/\s*→\s*/);
  if (fl.length === 2) {
    if (/^\d[\d.,]*\s?(€|%)$/.test(fl[0])) return { tipo: 'cifra', ante, cifra: fl[0], resto: fl[1] };
    return { tipo: 'flecha', ante, de: fl[0], a: fl[1] };
  }
  const c = resto.match(/^(\d[\d.,]*\s?(?:€|%))\s+(.+)$/s);
  if (c && ante) return { tipo: 'cifra', ante, cifra: c[1], resto: c[2] };
  return { tipo: 'frase', ante, frase: resto };
}
const mayus = (s) => s.charAt(0).toUpperCase() + s.slice(1);
// Lo que sigue a una cifra va en minúscula si continúa la frase («936,20 € al mes»)
const tras = (s) => (/^(al|a la|en|de|por|cada)\s/.test(s) ? s : mayus(s));
// Tamaño de partida según lo largo que sea el texto
const tam = (t) => (t.length <= 30 ? 104 : t.length <= 60 ? 88 : t.length <= 90 ? 76 : 68);
const ENLACE = /\s*\(enlace en la biograf[ií]a\)\.?$/i;

function diapositiva(p, i, total, slug) {
  const texto = p.diapositivas[i], n = `${i + 1}/${total}`;
  const cab = (oscura) => `<div class="cab"><div class="marca">${marca(oscura ? C.blue : C.blue)}Jubilómetro</div><span class="num">${n}</span></div>`;
  if (i === 0) {
    const m = texto.match(/^(.+?[?:])\s+(.+)$/s);
    const h1 = m ? `${resalta(m[1].replace(/:$/, ''))}<span class="dos">${resalta(mayus(m[2]))}</span>` : resalta(texto);
    return { clase: 's-portada', cuerpo: fondoSvg(1080, 1350, roseta(860, 1100, 250, { opacidad: 0.2 }) + roseta(860, 1100, 135, { opacidad: 0.14, color: C.sky })) + cab(true)
      + `<div class="zona" data-box><p class="ante">${esc(p.pilar)}</p><h1 data-fit="104" data-min="64">${h1}</h1></div>`
      + `<div class="pie"><span class="desliza">Desliza ${ICONO.desliza}</span><span>${DEL_BANCO ? 'Datos de octubre de 2026' : 'Cifras de 2026'}</span></div>` };
  }
  if (i === total - 1) {
    // «Guárdalo y envíaselo… Calcula la viudedad en Jubilómetro (enlace en la biografía).»
    // → titular con la primera frase; debajo, el resto y dónde está el enlace
    const conEnlace = ENLACE.test(texto), limpio = texto.replace(ENLACE, '.');
    const frases = limpio.match(/[^.!?]+[.!?]+/g) || [limpio];
    const h2 = frases[0].trim();
    let sub = frases.slice(1).join(' ').trim();
    if (conEnlace) sub = sub ? sub.replace(/\.$/, ': el enlace está en la biografía.') : 'El enlace está en la biografía.';
    return { clase: 's-cierre', cuerpo: fondoSvg(1080, 1350, roseta(980, 260, 300, { color: '#fff', opacidad: 0.12 }) + ondas(1080, 1160, { color: '#fff', opacidad: 0.12 })) + cab(false)
      + `<div class="zona" data-box style="bottom:200px"><div class="iconos"><span>${ICONO.guardar}</span><span>${ICONO.enviar}</span></div><h2 data-fit="88" data-min="56">${esc(nb(h2.trim()))}</h2>${sub ? `<p class="sub">${esc(nb(sub))}</p>` : ''}</div>`
      + `<div class="pie"><span>@jubilometro</span><span>jubilometro.com</span></div><p class="fecha">${COMPROBADAS}</p>` };
  }
  const d = leer(texto);
  const barras = `<span class="barras">${Array.from({ length: total }, (_, k) => `<i${k === i ? ' class="on"' : ''}></i>`).join('')}</span>`;
  let medio;
  if (d.tipo === 'cifra') medio = `${d.ante ? `<p class="ante">${esc(d.ante)}</p>` : ''}<p class="cifra" data-fit="230" data-min="120">${esc(nb(d.cifra))}</p><p class="resto">${resalta(tras(d.resto))}</p>`;
  else if (d.tipo === 'flecha') medio = `${d.ante ? `<p class="ante">${esc(d.ante)}</p>` : ''}<p class="de">${resalta(mayus(d.de))}</p><div class="flecha">${ICONO.flecha}</div><p class="a" data-fit="84" data-min="56">${resalta(mayus(d.a))}</p>`;
  else medio = `${d.ante ? `<p class="ante">${esc(d.ante)}</p>` : ''}<p class="frase" data-fit="${tam(d.frase)}" data-min="50">${resalta(mayus(d.frase))}</p>`;
  return { clase: 's-dato', cuerpo: `<i class="regla"></i>${cab(false)}<div class="zona" data-box>${medio}</div><div class="pie">${barras}<span>jubilometro.com</span></div>` };
}

const slugDe = (p) => (DEL_BANCO ? p.id : `${p.fecha}-${(p.fuente || '').split('/').filter(Boolean).pop() || 'carrusel'}`);
const pendientes = [];
if (quiero('carruseles')) {
  for (const p of PUBLICACIONES.filter((x) => x.red === 'instagram' && x.diapositivas)) {
    const slug = slugDe(p);
    if (p.diapositivas.some((d) => /\[[^\]]*\]/.test(d))) { pendientes.push({ slug, p }); continue; }
    p.diapositivas.forEach((_, i) => {
      const d = diapositiva(p, i, p.diapositivas.length, slug);
      pieza({ grupo: `Carrusel · ${DEL_BANCO ? p.id : p.fecha}`, carrusel: slug, titulo: `${i + 1}`, archivo: `carruseles/${slug}/${String(i + 1).padStart(2, '0')}.png`, w: 1080, h: 1350,
        html: pagina(1080, 1350, CARRUSEL_CSS, d.cuerpo, d.clase) });
    });
  }
}

// 4. Imágenes con la cifra (1080 × 1350): Facebook, X e Instagram
const CIFRA_CSS = `
  .lienzo { background: ${C.ink}; color: #fff; }
  .cab { position: absolute; left: 88px; right: 88px; top: 72px; display: flex; justify-content: space-between; align-items: center; }
  .cab .marca { color: #fff; font-size: 40px; }
  .cab .ante { font: 800 26px/1.2 "Public Sans", Arial, sans-serif; letter-spacing: .14em; text-transform: uppercase; color: ${C.sky}; }
  .zona { position: absolute; left: 88px; right: 88px; top: 190px; bottom: 210px; display: flex; flex-direction: column; justify-content: center; }
  .antes { font: 600 46px/1.2 "Public Sans", Arial, sans-serif; color: #DCE7F7; margin-bottom: 22px; text-wrap: balance; }
  .grande { font: 600 250px/.95 "Newsreader", Georgia, serif; color: ${C.gold}; letter-spacing: -.035em; white-space: nowrap; font-variant-numeric: lining-nums tabular-nums; }
  .titulo { font: 600 92px/1.06 "Newsreader", Georgia, serif; letter-spacing: -.02em; text-wrap: balance; }
  .titulo em { color: ${C.gold}; }
  .despues { font: 500 52px/1.28 "Public Sans", Arial, sans-serif; color: #fff; margin-top: 30px; text-wrap: pretty; }
  .despues em { color: ${C.gold}; font-weight: 700; }
  .tabla { margin-top: 44px; border-top: 2px solid rgb(147 197 253 / .35); }
  .fila { display: grid; grid-template-columns: 1fr auto; align-items: baseline; gap: 30px; padding: 26px 0; border-bottom: 2px solid rgb(147 197 253 / .35); }
  .fila b { font: 600 72px/1 "Newsreader", Georgia, serif; font-variant-numeric: lining-nums tabular-nums; }
  .fila span { font: 600 50px/1.1 "Public Sans", Arial, sans-serif; color: ${C.gold}; font-variant-numeric: tabular-nums; text-align: right; }
  .fila small { display: block; font-size: 26px; font-weight: 600; color: #B9CBE4; margin-top: 8px; }
  .pie { position: absolute; left: 88px; right: 88px; bottom: 70px; display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; }
  .fuente { font: 500 26px/1.35 "Public Sans", Arial, sans-serif; color: #B9CBE4; max-width: 640px; }
  .fuente b { color: #fff; font-weight: 700; }
  .web { font: 700 30px/1 "Public Sans", Arial, sans-serif; color: ${C.sky}; white-space: nowrap; }`;
if (quiero('cifras')) {
  for (const c of LISTA_CIFRAS) {
    let medio = '';
    if (c.grande) medio = `${c.antes ? `<p class="antes">${resalta(c.antes)}</p>` : ''}<p class="grande" data-fit="250" data-min="130">${esc(nb(c.grande))}</p>${c.despues ? `<p class="despues">${resalta(c.despues)}</p>` : ''}`;
    if (c.titulo) medio = `<p class="titulo" data-fit="92" data-min="60">${resalta(c.titulo)}</p>${c.despues ? `<p class="despues">${resalta(c.despues)}</p>` : ''}`;
    if (c.filas) medio += `<div class="tabla">${c.filas.map(([a, b, s]) => `<div class="fila"><b>${esc(nb(a))}</b><span>${esc(nb(b))}${s ? `<small>${esc(s)}</small>` : ''}</span></div>`).join('')}</div>`;
    pieza({ grupo: 'Imágenes con la cifra', titulo: c.nombre, archivo: `cifras/${c.archivo}.png`, w: 1080, h: 1350, nota: c.nota,
      html: pagina(1080, 1350, CIFRA_CSS, fondoSvg(1080, 1350, roseta(880, 1110, 230, { opacidad: 0.16 }) + roseta(880, 1110, 125, { opacidad: 0.12, color: C.sky }))
        + `<div class="cab"><div class="marca">${marca()}Jubilómetro</div><span class="ante">${esc(c.ante || '')}</span></div>`
        + `<div class="zona" data-box>${medio}</div>`
        + `<div class="pie"><p class="fuente">${c.fuente ? `<b>Fuente:</b> ${esc(c.fuente)}` : ''}</p><span class="web">jubilometro.com${c.corto ? '/' + esc(c.corto) : ''}</span></div>`) });
  }
}

/* ---------- Render ---------- */
const navegador = await chromium.launch({ executablePath: NAVEGADOR });
const pag = await navegador.newPage({ deviceScaleFactor: 1 });
const grupos = new Set(piezas.map((p) => p.archivo.split('/')[0]));
for (const g of grupos) if (g === 'carruseles') rmSync(join(SALIDA, g), { recursive: true, force: true });
const avisos = [];
for (const p of piezas) {
  await pag.setViewportSize({ width: p.w, height: p.h });
  await pag.setContent(p.html, { waitUntil: 'load' });
  await pag.waitForFunction(() => document.body.dataset.listo === '1');
  // Nada se sale de su caja ni queda montado encima de otra cosa
  const fallo = await pag.evaluate(() => {
    const malos = [];
    document.querySelectorAll('[data-box]').forEach((b) => { if (b.scrollHeight > b.clientHeight + 1) malos.push('el texto no cabe en su caja'); });
    document.querySelectorAll('[data-fit]').forEach((e) => { if (parseFloat(e.style.fontSize) <= +(e.dataset.min || 24)) malos.push('letra al mínimo: ' + e.textContent.slice(0, 40)); });
    document.querySelectorAll('.bloque').forEach((b) => {
      const B = b.getBoundingClientRect();
      b.querySelectorAll('p, span, .marca').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && (r.left < B.left - 1 || r.right > B.right + 1 || r.top < B.top - 1 || r.bottom > B.bottom + 1)) malos.push('se sale de la zona segura: ' + e.textContent.slice(0, 40)); });
    });
    const L = document.querySelector('.lienzo').getBoundingClientRect();
    document.querySelectorAll('.lienzo p, .lienzo h1, .lienzo h2, .lienzo .marca, .lienzo .pie span').forEach((e) => {
      const r = e.getBoundingClientRect(); if (r.width && (r.left < L.left - 1 || r.right > L.right + 1 || r.top < L.top - 1 || r.bottom > L.bottom + 1)) malos.push('fuera del lienzo: ' + e.textContent.slice(0, 40));
    });
    return malos;
  });
  if (fallo.length) avisos.push(`${p.archivo}: ${fallo.join('; ')}`);
  mkdirSync(join(SALIDA, p.archivo, '..'), { recursive: true });
  await pag.locator('.lienzo').screenshot({ path: join(SALIDA, p.archivo), omitBackground: false });
}
await navegador.close();

/* ---------- Hoja de muestra ---------- */
if (!SOLO.length) {
  const porGrupo = {};
  for (const p of piezas) (porGrupo[p.grupo] ||= []).push(p);
  const notaCarrusel = Object.fromEntries(PUBLICACIONES.filter((x) => x.diapositivas).map((x) => [slugDe(x), x]));
  const secciones = Object.entries(porGrupo).map(([g, ps]) => {
    const pub = ps[0].carrusel ? notaCarrusel[ps[0].carrusel] : null;
    return `<section><h2>${esc(g)}</h2>${pub ? `<p class="nota">${esc(pub.pilar)} · ${esc(pub.fuente)} · texto del pie en el calendario${DEL_BANCO ? '' : ' del mes'}</p>` : ''}
      <div class="rejilla${ps[0].w / ps[0].h > 1.5 ? ' ancha' : ''}">${ps.map((p) => `<figure><a href="${p.archivo}" download><img src="${p.archivo}" alt="${esc(p.titulo)}" loading="lazy" width="${p.w}" height="${p.h}"></a><figcaption><b>${esc(p.titulo)}</b> · ${p.w} × ${p.h}${p.nota ? `<br>${esc(p.nota)}` : ''}</figcaption></figure>`).join('')}</div></section>`;
  }).join('\n');
  const pend = pendientes.map(({ p }) => `<li><b>${esc(p.fecha)}</b> · ${esc(p.diapositivas[0])} Se preparan ese mismo día, con la cifra oficial.</li>`).join('');
  writeFileSync(join(SALIDA, 'index.html'), `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${DEL_BANCO ? 'Imágenes del banco' : 'Kit de redes'}</title>
<style>
:root{--ink:#0F1B2D;--blue:#1D4ED8;--muted:#4A5568;--line:#D8E0EA;--bg:#F4F7FB}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
header,section{max-width:1200px;margin:0 auto;padding:24px 16px}header h1{font:600 2rem/1.1 Georgia,serif;margin:0 0 .4rem}header p{margin:.2rem 0;color:var(--muted)}
h2{font:600 1.35rem/1.2 Georgia,serif;margin:0 0 .5rem}.nota{color:var(--muted);margin:0 0 12px}
.rejilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:14px}.rejilla.ancha{grid-template-columns:repeat(auto-fill,minmax(340px,1fr))}
figure{margin:0;background:#fff;border:1px solid var(--line);border-radius:8px;overflow:hidden}figure img{display:block;width:100%;height:auto;background:#e9eef5}
figcaption{padding:8px 10px;font-size:.85rem;color:var(--muted)}figcaption b{color:var(--ink)}a{color:var(--blue)}
ul{padding-left:1.2rem}
@media print{body{background:#fff}header,section{padding:8px 0;break-inside:avoid}h2{break-after:avoid}.rejilla,.rejilla.ancha{display:block}figure{display:inline-block;vertical-align:top;width:23%;margin:0 1% 12px;break-inside:avoid}.ancha figure{width:47%}}
</style></head><body><header><h1>${DEL_BANCO ? 'Imágenes del banco de publicaciones' : 'Kit de redes de Jubilómetro'}</h1><p>Toca una imagen para descargarla.${DEL_BANCO ? ' Cada carrusel lleva el nombre (id) de su publicación en el calendario.' : ' Textos de las biografías: <a href="biografias.md">biografias.md</a>.'}</p>
${pend ? `<p><b>Se hacen el día del dato:</b></p><ul>${pend}</ul>` : ''}</header>${secciones}</body></html>`);
}

console.log(`Imágenes: ${piezas.length} en ${relative(RAIZ, SALIDA)}${pendientes.length ? ` · pendientes del dato: ${pendientes.map((x) => x.slug).join(', ')}` : ''}`);
if (avisos.length) { console.log('Revisar:'); for (const a of avisos) console.log('  ' + a); process.exitCode = 1; }
