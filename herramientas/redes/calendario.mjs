// Convierte un mes de publicaciones (herramientas/redes/mes-N.mjs) en:
//   publicacion/redes/<carpeta>/calendario.html  página para trabajar: día a día, por red, con botones de copiar
//   publicacion/redes/<carpeta>/metricool.csv    publicaciones de X, Facebook y LinkedIn para importar como borrador
// y comprueba antes que los enlaces cortos existen, que nada de X pasa de 280 caracteres y que no hay rayas largas.
//
// Uso: node herramientas/redes/calendario.mjs herramientas/redes/mes-1.mjs primer-mes
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { RAIZ } from '../publicar/articulos.mjs';

const [, , archivo = 'herramientas/redes/mes-1.mjs', carpeta = 'primer-mes'] = process.argv;
const { MES, PUBLICACIONES } = await import(pathToFileURL(resolve(archivo)).href);
const datos = JSON.parse(readFileSync(join(RAIZ, 'tema', 'jubilometro', 'inc', 'data.json'), 'utf8'));
const SUFIJOS = ['x', 'fb', 'ig', 'tt', 'yt', 'in', 'wa', 'tg', 'nl'];

const REDES = {
  x: { nombre: 'X', sufijo: 'x' },
  facebook: { nombre: 'Facebook', sufijo: 'fb' },
  grupo: { nombre: 'Grupo de Facebook', sufijo: 'fb' },
  instagram: { nombre: 'Instagram', sufijo: 'ig' },
  linkedin: { nombre: 'LinkedIn', sufijo: 'in' },
  whatsapp: { nombre: 'Canal de WhatsApp', sufijo: 'wa' },
  video: { nombre: 'Vídeo corto', sufijo: 'yt' },
};
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fecha = (f) => new Date(`${f}T12:00:00Z`);
const diaTxt = (f) => { const d = fecha(f); return `${DIAS[d.getUTCDay()]} ${d.getUTCDate()} de ${MESES[d.getUTCMonth()]}`; };

/* ---------- Comprobaciones ---------- */
const errores = [];
// X cuenta cada enlace como 23 caracteres, se escriba como se escriba
const largoX = (t) => [...t.replace(/(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?/gi, 'x'.repeat(23))].length;
const textos = (p) => [p.texto, ...(p.partes ?? []), ...(p.diapositivas ?? []), p.comentario, ...(p.guion ?? []).flat()].filter(Boolean);
PUBLICACIONES.forEach((p, i) => {
  const id = `${p.fecha} ${p.red} (${i + 1})`;
  if (!REDES[p.red]) errores.push(`${id}: red desconocida`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.fecha) || p.fecha < MES.desde || p.fecha > MES.hasta) errores.push(`${id}: fecha fuera del mes`);
  for (const t of textos(p)) {
    if (/[—]/.test(t)) errores.push(`${id}: raya larga («—»)`);
    for (const [, codigo, red] of t.matchAll(/jubilometro\.com\/([a-z0-9-]+)(?:\/([a-z]+))?/g)) {
      if (!datos.cortos[codigo]) errores.push(`${id}: el enlace corto /${codigo} no existe en data.json`);
      if (red && !SUFIJOS.includes(red)) errores.push(`${id}: sufijo de red desconocido /${red}`);
    }
  }
  if (p.red === 'x') for (const t of p.partes ?? [p.texto]) if (largoX(t) > 280) errores.push(`${id}: ${largoX(t)} caracteres en X`);
  if (['facebook', 'grupo'].includes(p.red) && /jubilometro\.com/.test(p.texto)) errores.push(`${id}: enlace en Facebook`);
});
if (errores.length) { console.error(errores.join('\n')); process.exit(1); }

/* ---------- Página ---------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const conHuecos = (s) => esc(s).replace(/\[([^\]]*)\]/g, '<mark>[$1]</mark>');
let n = 0;
const bloqueTexto = (txt, etiqueta = 'Copiar texto') => {
  const id = `t${++n}`;
  return `<div class="txt"><pre id="${id}">${conHuecos(txt)}</pre><button class="copy" type="button" data-copy="${id}">${etiqueta}</button></div>`;
};
const porSemana = [];
for (const p of PUBLICACIONES) {
  const lunes = fecha(p.fecha); lunes.setUTCDate(lunes.getUTCDate() - ((lunes.getUTCDay() + 6) % 7));
  const k = lunes.toISOString().slice(0, 10);
  let s = porSemana.find((x) => x.k === k);
  if (!s) porSemana.push(s = { k, dias: new Map() });
  if (!s.dias.has(p.fecha)) s.dias.set(p.fecha, []);
  s.dias.get(p.fecha).push(p);
}
const orden = Object.keys(REDES);
const tarjeta = (p) => {
  const red = REDES[p.red];
  const hora = p.hora ?? MES.horas[p.red];
  const id = `${p.fecha}-${p.red}-${orden.indexOf(p.red)}-${(p.titulo ?? p.texto ?? p.partes?.[0] ?? '').slice(0, 12).replace(/\W+/g, '')}`;
  let cuerpo = '';
  if (p.partes) cuerpo += p.partes.map((t, i) => bloqueTexto(t, `Copiar ${i + 1}/${p.partes.length}`)).join('');
  if (p.diapositivas) cuerpo += `<ol class="slides">${p.diapositivas.map((d) => `<li>${conHuecos(d)}</li>`).join('')}</ol>`;
  if (p.guion) cuerpo += `<div class="guion"><table><thead><tr><th>Tiempo</th><th>En pantalla</th><th>Voz</th></tr></thead><tbody>${p.guion.map(([t, a, b]) => `<tr><td>${esc(t)}</td><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}</tbody></table></div>`;
  if (p.texto) cuerpo += bloqueTexto(p.texto, p.diapositivas || p.guion ? 'Copiar el texto de la publicación' : 'Copiar texto');
  if (p.comentario) cuerpo += `<p class="lbl">Primer comentario</p>${bloqueTexto(p.comentario, 'Copiar comentario')}`;
  const extra = [
    p.archivo ? `<p class="file"><b>Vídeo listo:</b> <code>publicacion/redes/videos/${esc(p.archivo)}</code></p>` : '',
    p.imagen ? `<p class="file"><b>Imagen:</b> ${esc(p.imagen)}</p>` : '',
    p.fuente ? `<p class="src">Cifras de <a href="https://jubilometro.com${esc(p.fuente)}" target="_blank" rel="noopener">jubilometro.com${esc(p.fuente)}</a></p>` : '',
  ].join('');
  return `<article class="post" data-red="${p.red}" data-id="${esc(id)}">
  <header><span class="chip chip--${p.red}">${esc(red.nombre)}</span><span class="when">${esc(hora)}</span>${p.tipo ? `<span class="kind">${esc(p.tipo)}</span>` : ''}<span class="pilar">${esc(p.pilar ?? '')}</span>
  <label class="done"><input type="checkbox" id="h-${esc(id)}"> Hecho</label></header>
  ${p.titulo ? `<h4>${esc(p.titulo)}</h4>` : ''}
  ${p.nota ? `<p class="nota">${esc(p.nota)}</p>` : ''}
  ${cuerpo}${extra}
</article>`;
};
const cuenta = Object.fromEntries(orden.map((r) => [r, PUBLICACIONES.filter((p) => p.red === r).length]));
const semanas = porSemana.map((s, i) => {
  const fin = fecha(s.k); fin.setUTCDate(fin.getUTCDate() + 6);
  return `<section class="week" aria-labelledby="s${i}"><h2 id="s${i}">Semana ${i + 1} <span>del ${fecha(s.k).getUTCDate()} de ${MESES[fecha(s.k).getUTCMonth()]} al ${fin.getUTCDate()} de ${MESES[fin.getUTCMonth()]}</span></h2>
${[...s.dias].map(([f, ps]) => `<div class="day"><h3>${diaTxt(f)}</h3><div class="posts">${ps.sort((a, b) => (a.hora ?? MES.horas[a.red]).localeCompare(b.hora ?? MES.horas[b.red])).map(tarjeta).join('\n')}</div></div>`).join('\n')}
</section>`;
}).join('\n');

const html = `<title>${esc(MES.titulo)} de Jubilómetro</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600&family=Public+Sans:wght@400;600;700&display=swap">
<style>
/* Libreta de trabajo: una columna de lectura con los días en orden y la barra de redes fija arriba */
:root {
  --bg: #F6F8FB; --sheet: #FFFFFF; --ink: #0F1B2D; --text: #1F2B3D; --muted: #4A5568; --line: #D5DDE8;
  --accent: #1D4ED8; --accent-soft: #EAF1FF; --warn-bg: #FFF6E0; --warn: #8A5A00; --mark: #FFE7A3;
  --x: #0F1419; --facebook: #1760D8; --grupo: #3B5BA9; --instagram: #C13584; --linkedin: #0A66C2; --whatsapp: #1A8F48; --video: #B42318;
  --display: "Newsreader", Georgia, serif; --body: "Public Sans", "Helvetica Neue", Arial, sans-serif;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg: #0C1422; --sheet: #121D2F; --ink: #F1F5FB; --text: #D9E2EE; --muted: #A3B1C4; --line: #263650;
  --accent: #8FB0FF; --accent-soft: #1A2A47; --warn-bg: #33270C; --warn: #F5CF7A; --mark: #6B5414;
  --x: #E7E9EA; --facebook: #6EA0FF; --grupo: #93A9E0; --instagram: #F07AC0; --linkedin: #6CB4FF; --whatsapp: #4CC27C; --video: #FF8A7A; color-scheme: dark } }
:root[data-theme="dark"] {
  --bg: #0C1422; --sheet: #121D2F; --ink: #F1F5FB; --text: #D9E2EE; --muted: #A3B1C4; --line: #263650;
  --accent: #8FB0FF; --accent-soft: #1A2A47; --warn-bg: #33270C; --warn: #F5CF7A; --mark: #6B5414;
  --x: #E7E9EA; --facebook: #6EA0FF; --grupo: #93A9E0; --instagram: #F07AC0; --linkedin: #6CB4FF; --whatsapp: #4CC27C; --video: #FF8A7A; color-scheme: dark }
* { box-sizing: border-box; }
body { background: var(--bg); color: var(--text); font: 400 1rem/1.6 var(--body); padding: 0 16px; }
.wrap { max-width: 52rem; margin: 0 auto; padding-block: 2.5rem 4rem; }
h1, h2, h3, h4 { font-family: var(--display); color: var(--ink); text-wrap: balance; margin: 0; }
h1 { font-size: clamp(2rem, 1.5rem + 2vw, 2.75rem); font-weight: 600; line-height: 1.1; }
.lead { font-size: 1.125rem; color: var(--muted); max-width: 40rem; margin: .75rem 0 0; }
.how { display: grid; gap: .6rem; margin: 1.75rem 0 0; padding: 1.25rem 1.4rem; background: var(--sheet); border: 1px solid var(--line); border-radius: 10px; }
.how p { margin: 0; }
.how code, .file code { font-size: .9em; background: var(--accent-soft); padding: .05rem .35rem; border-radius: 4px; overflow-wrap: anywhere; }
.counts { display: flex; flex-wrap: wrap; gap: .4rem .9rem; margin: 1.25rem 0 0; padding: 0; list-style: none; color: var(--muted); font-size: .95rem; font-variant-numeric: tabular-nums; }
.counts b { color: var(--ink); }
.bar { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 2; display: flex; flex-wrap: wrap; gap: .4rem; align-items: center; margin: 2rem -16px 0; padding: .7rem 16px; background: color-mix(in srgb, var(--bg) 92%, transparent); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line); }
.bar button, .bar label { font: 600 .9rem/1 var(--body); }
.bar button { min-height: 36px; padding: 0 .8rem; border-radius: 999px; border: 1.5px solid var(--line); background: var(--sheet); color: var(--text); cursor: pointer; }
.bar button[aria-pressed="true"] { background: var(--ink); border-color: var(--ink); color: var(--bg); }
.bar label { display: inline-flex; align-items: center; gap: .4rem; margin-left: auto; color: var(--muted); }
.week { margin-top: 2.75rem; }
.week h2 { font-size: 1.6rem; font-weight: 600; padding-bottom: .5rem; border-bottom: 2px solid var(--ink); }
.week h2 span { font: 400 1rem var(--body); color: var(--muted); margin-left: .4rem; }
.day { margin-top: 1.5rem; }
.day h3 { font: 700 .8rem/1.3 var(--body); letter-spacing: .08em; text-transform: uppercase; color: var(--accent); margin-bottom: .6rem; }
.posts { display: grid; gap: .9rem; }
.post { min-width: 0; background: var(--sheet); border: 1px solid var(--line); border-radius: 10px; padding: 1rem 1.1rem; display: grid; gap: .65rem; }
.post > header { display: flex; flex-wrap: wrap; align-items: center; gap: .35rem .6rem; font-size: .875rem; color: var(--muted); }
.chip { font-weight: 700; color: var(--chip); border: 1.5px solid currentColor; border-radius: 999px; padding: .05rem .55rem; }
${orden.map((r) => `.chip--${r} { --chip: var(--${r}); }`).join(' ')}
.when { font-variant-numeric: tabular-nums; font-weight: 600; color: var(--ink); }
.kind { font-weight: 600; }
.pilar::before { content: "· "; }
.done { margin-left: auto; display: inline-flex; gap: .35rem; align-items: center; cursor: pointer; }
.post h4 { font-size: 1.2rem; font-weight: 600; }
.nota { margin: 0; padding: .55rem .8rem; background: var(--warn-bg); color: var(--warn); border-radius: 6px; font-size: .95rem; }
.txt { display: grid; gap: .45rem; }
pre { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; font: 400 1rem/1.55 var(--body); color: var(--text); background: var(--bg); border-radius: 6px; padding: .75rem .85rem; }
mark { background: var(--mark); color: inherit; border-radius: 3px; }
.copy { justify-self: start; min-height: 36px; padding: 0 .9rem; border-radius: 999px; border: 0; background: var(--accent); color: var(--sheet); font: 600 .9rem var(--body); cursor: pointer; }
.copy.is-ok { background: var(--whatsapp); }
.copy:focus-visible, .bar button:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
.lbl { margin: .2rem 0 0; font-weight: 700; font-size: .875rem; color: var(--muted); }
.slides { margin: 0; padding-left: 1.4rem; display: grid; gap: .3rem; }
.guion { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; font-size: .925rem; }
th, td { text-align: left; vertical-align: top; padding: .4rem .5rem; border-bottom: 1px solid var(--line); }
th { font-size: .8rem; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); }
td:first-child { white-space: nowrap; font-variant-numeric: tabular-nums; color: var(--muted); }
.file, .src { margin: 0; font-size: .9rem; color: var(--muted); }
.src a { color: var(--accent); }
.post.is-done { opacity: .55; }
.hide-done .post.is-done, .post.is-off { display: none; }
.day:not(:has(.post:not(.is-off))) { display: none; }
@media (max-width: 520px) {
  .done { margin-left: 0; }
  .bar { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; }
  .bar button, .bar label { flex: none; white-space: nowrap; }
  .bar label { margin-left: 0; }
  .week h2 span { display: block; margin: .2rem 0 0; }
}
@media (prefers-reduced-motion: no-preference) { .post { transition: opacity .2s ease; } }
</style>
<div class="wrap">
  <h1>${esc(MES.titulo)}</h1>
  <p class="lead">Del ${diaTxt(MES.desde)} al ${diaTxt(MES.hasta)}: ${PUBLICACIONES.length} publicaciones listas, con las cifras de las guías de Jubilómetro y un enlace corto que dice de qué red llega cada visita.</p>
  <ul class="counts">${orden.map((r) => `<li><b>${cuenta[r]}</b> ${esc(REDES[r].nombre)}</li>`).join('')}</ul>
  <div class="how">
    <p><b>Cifras:</b> las de las guías a 9 de octubre de 2026. Lo que va entre <mark>[corchetes]</mark> se rellena el día del dato del INE (14 y 30 de octubre).</p>
    <p><b>Enlaces:</b> cada red lleva su final: <code>jubilometro.com/edad/x</code> en X, <code>/wa</code> en WhatsApp, <code>/in</code> en LinkedIn y <code>/yt</code> en YouTube. En el panel <i>Escritorio › Estadísticas</i> de WordPress verás qué publicación trae visitas.</p>
    <p><b>Facebook:</b> sin enlaces en las publicaciones, porque Meta limita a dos al mes las de las páginas sin verificar. El enlace a la web va en la información de la página.</p>
    <p><b>Instagram y vídeos:</b> «enlace en la biografía»; en los vídeos, la dirección corta sale escrita en pantalla. Los cuatro primeros vídeos ya están hechos; los demás llevan el guion.</p>
    <p><b>Metricool:</b> las publicaciones de X, Facebook y LinkedIn están en <code>publicacion/redes/${esc(carpeta)}/metricool.csv</code> como borrador. Prueba antes con dos filas.</p>
  </div>
  <div class="bar" role="toolbar" aria-label="Filtrar por red">
    <button type="button" data-f="" aria-pressed="true">Todas</button>
    ${orden.map((r) => `<button type="button" data-f="${r}" aria-pressed="false">${esc(REDES[r].nombre)}</button>`).join('\n    ')}
    <label for="ocultar"><input type="checkbox" id="ocultar"> Ocultar lo hecho</label>
  </div>
  ${semanas}
</div>
<script>
(function () {
  var KEY = 'jm-redes-${esc(carpeta)}', hechos = {};
  try { hechos = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(hechos)); } catch (e) {} }
  document.querySelectorAll('.post').forEach(function (p) {
    var c = p.querySelector('.done input'), id = p.getAttribute('data-id');
    c.checked = !!hechos[id]; p.classList.toggle('is-done', c.checked);
    c.addEventListener('change', function () { hechos[id] = c.checked; if (!c.checked) delete hechos[id]; p.classList.toggle('is-done', c.checked); guardar(); });
  });
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    var txt = b.textContent;
    b.addEventListener('click', function () {
      var pre = document.getElementById(b.getAttribute('data-copy'));
      function ok() { b.classList.add('is-ok'); b.textContent = 'Copiado'; setTimeout(function () { b.classList.remove('is-ok'); b.textContent = txt; }, 1800); }
      function manual() { var r = document.createRange(); r.selectNodeContents(pre); var s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Seleccionado: pulsa copiar'; setTimeout(function () { b.textContent = txt; }, 2500); }
      try { navigator.clipboard.writeText(pre.textContent).then(ok, manual); } catch (e) { manual(); }
    });
  });
  var botones = document.querySelectorAll('.bar [data-f]');
  botones.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-f');
      botones.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      document.querySelectorAll('.post').forEach(function (p) { p.classList.toggle('is-off', !!f && p.getAttribute('data-red') !== f); });
    });
  });
  var oc = document.getElementById('ocultar');
  oc.addEventListener('change', function () { document.body.classList.toggle('hide-done', oc.checked); });
})();
</script>
`;

/* ---------- CSV para Metricool (columnas de su plantilla, en su orden) ---------- */
const COLUMNAS = ['Text', 'Date', 'Time', 'Draft', 'Facebook', 'Twitter/X', 'LinkedIn', 'GBP', 'Instagram', 'Pinterest', 'TikTok', 'YouTube', 'Threads', 'Bluesky',
  'Picture Url 1', 'Picture Url 2', 'Picture Url 3', 'Picture Url 4', 'Picture Url 5', 'Picture Url 6', 'Picture Url 7', 'Picture Url 8', 'Picture Url 9', 'Picture Url 10',
  'Alt text picture 1', 'Alt text picture 2', 'Alt text picture 3', 'Alt text picture 4', 'Alt text picture 5', 'Alt text picture 6', 'Alt text picture 7', 'Alt text picture 8', 'Alt text picture 9', 'Alt text picture 10',
  'Document title', 'Shortener', 'Video Thumbnail Url', 'Video Cover Frame', 'Twitter/X Can reply', 'Twitter/X Type', 'Twitter/X Poll Duration minutes',
  'Twitter/X Poll Option 1', 'Twitter/X Poll Option 2', 'Twitter/X Poll Option 3', 'Twitter/X Poll Option 4', 'Pinterest Board', 'Pinterest Pin Title', 'Pinterest Pin Link', 'Pinterest Pin New Format',
  'Instagram Post Type', 'Instagram Show Reel On Feed', 'YouTube Video Title', 'YouTube Video Type', 'YouTube Video Privacy', 'YouTube video for kids', 'YouTube Video Category', 'YouTube Video Tags',
  'YouTube Playlist', 'YouTube Notify Subscribers', 'GBP Post Type', 'Facebook Post Type', 'Facebook Title', 'First Comment Text', 'TikTok Title', 'TikTok disable comments', 'TikTok disable duet',
  'TikTok disable stitch', 'TikTok Post Privacy (personal accounts only)', 'TikTok Branded Content (personal accounts only)', 'TikTok Your Brand (personal accounts only)',
  'TikTok Auto Add Music (personal accounts only)', 'TikTok Photo Cover Index', 'TikTok musicId', 'TikTok music title', 'TikTok music author', 'TikTok music previewUrl',
  'TikTok music thumbnailUrl', 'TikTok music soundVolume', 'TikTok music originalVolume', 'TikTok music startMillis', 'TikTok music endMillis', 'LinkedIn Type', 'LinkedIn Poll Question',
  'LinkedIn Poll Option 1', 'LinkedIn Poll Option 2', 'LinkedIn Poll Option 3', 'LinkedIn Poll Option 4', 'LinkedIn Poll Duration', 'LinkedIn Show link preview', 'LinkedIn Images as Carousel',
  'Threads Reply Control', 'Threads Is Spoiler', 'Threads Post Type', 'Brand name (Optional)'];
const celda = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const filas = PUBLICACIONES.filter((p) => ['x', 'facebook', 'linkedin'].includes(p.red) && !p.partes).map((p) => {
  const f = Object.fromEntries(COLUMNAS.map((c) => [c, '']));
  Object.assign(f, {
    Text: p.texto, Date: p.fecha, Time: `${p.hora ?? MES.horas[p.red]}:00`, Draft: 'TRUE',
    Facebook: p.red === 'facebook' ? 'TRUE' : 'FALSE', 'Twitter/X': p.red === 'x' ? 'TRUE' : 'FALSE', LinkedIn: p.red === 'linkedin' ? 'TRUE' : 'FALSE',
    GBP: 'FALSE', Instagram: 'FALSE', Pinterest: 'FALSE', TikTok: 'FALSE', YouTube: 'FALSE', Threads: 'FALSE', Bluesky: 'FALSE', Shortener: 'FALSE',
    'First Comment Text': p.comentario ?? '', 'LinkedIn Show link preview': p.red === 'linkedin' ? 'TRUE' : '',
  });
  return COLUMNAS.map((c) => celda(f[c])).join(',');
});

const salida = join(RAIZ, 'publicacion', 'redes', carpeta);
mkdirSync(salida, { recursive: true });
writeFileSync(join(salida, 'calendario.html'), html);
writeFileSync(join(salida, 'metricool.csv'), '﻿' + [COLUMNAS.map(celda).join(','), ...filas].join('\r\n') + '\r\n');
console.log(`${PUBLICACIONES.length} publicaciones · ${filas.length} filas para Metricool · ${salida}`);
console.log(orden.map((r) => `${REDES[r].nombre}: ${cuenta[r]}`).join(' · '));
