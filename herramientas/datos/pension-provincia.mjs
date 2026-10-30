// Actualiza /datos/pension-media-provincia/ (página 41) y el texto de la portada /datos/ con el Excel
// que acompaña a la nota mensual de pensiones de la Seguridad Social (revista.seg-social.es, «archivo
// adjunto»): hoja «Número pensiones (IP-J-V)», columnas de jubilación.
// Parte de la copia de la página en publicacion/paginas-vivas/ (la del mes anterior) y cambia solo los
// datos: título, fechas, resumen, las dos listas de 10, la tabla, la metodología, «Qué dicen los datos»
// y la fuente. Comprueba que salen 52 provincias y que su suma es el total nacional.
// Uso (desde la raíz del proyecto):
//   node herramientas/datos/pension-provincia.mjs --excel=Pensiones_OCTUBRE_2026.xlsx --mes=2026-10 \
//     --fuente=https://revista.seg-social.es/-/… --altas=1758 [--subir]
//   --altas: pensión media de las nuevas altas de jubilación que da la nota (último mes disponible).
//   Sin --subir escribe el CSV y una vista previa de la página y no toca la web. Con --subir, actualiza
//   la página, su título y descripción de Rank Math y la copia de paginas-vivas, y reescribe las cifras
//   de paginas/portadas/datos.md (subirla después con subir-portadas.mjs --solo=datos).
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, mkdtempSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { hoja } from './excel.mjs';
const require = createRequire(import.meta.url);
const copia = join(mkdtempSync(join(tmpdir(), 'jm-')), 'calc.cjs');
copyFileSync(new URL('../../tema/jubilometro/assets/js/calculadoras.js', import.meta.url), copia);
const J = require(copia);
const RAIZ = new URL('../../', import.meta.url).pathname;
const WEB = 'https://jubilometro.com';
const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
const SUBIR = process.argv.includes('--subir');
const [EXCEL, MES, FUENTE, ALTAS] = [arg('excel'), arg('mes'), arg('fuente'), Number(arg('altas'))];
if (!EXCEL || !/^\d{4}-\d{2}$/.test(MES || '') || !/^https:\/\//.test(FUENTE || '') || !(ALTAS > 500)) {
  console.error('Uso: --excel=archivo.xlsx --mes=AAAA-MM --fuente=https://… --altas=1758 [--subir]');
  process.exit(1);
}
const A = 'Basic ' + Buffer.from(process.env.WP_USER + ':' + process.env.WP_APP_PASSWORD).toString('base64');
const api = async (path, opt = {}) => {
  for (let i = 1; ; i++) {
    try {
      const r = await fetch(WEB + '/wp-json' + path, { ...opt, headers: { Authorization: A, 'Content-Type': 'application/json', ...(opt.headers || {}) } });
      const t = await r.text(); if (!r.ok) throw new Error(r.status + ' ' + path + ' ' + t.slice(0, 300)); return JSON.parse(t);
    } catch (e) { if (i === 4 || /^4\d\d /.test(e.message)) throw e; await new Promise((ok) => setTimeout(ok, 2000 * i)); }
  }
};
const eur = (n, dec) => J.eur(n, dec);
const num = (n, dec) => J.num(n, dec);
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const [anio, m] = MES.split('-').map(Number);
const mes = `${MESES[m - 1]} de ${anio}`;
const siguiente = m === 12 ? `enero de ${anio + 1}` : `${MESES[m]} de ${anio}`;
const hoy = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

const filas = hoja(EXCEL, 'Número pensiones (IP-J-V)');
const columna = (texto) => {
  for (const f of filas.values()) for (const [c, v] of Object.entries(f)) if (typeof v === 'string' && norm(v).startsWith(texto)) return c;
  throw new Error(`No encuentro la columna «${texto}»`);
};
const [cCod, cNom, cNum] = [columna('codigo'), columna('comunidades autonomas'), columna('jubilacion')];
const cMed = String.fromCharCode(cNum.charCodeAt(0) + 1); // «Pensión media», a la derecha de «Número»
const ALIAS = { 'palmas (las)': 'las palmas', 's.c.tenerife': 'santa cruz de tenerife', 'alacant-alicante': 'alicante', castello: 'castellon', 'araba-alava': 'alava', vizcaya: 'bizkaia', 'rioja (la)': 'la rioja' };
const oficiales = [];
let total;
for (const f of filas.values()) {
  if (typeof f[cNum] !== 'number') continue;
  if (norm(f[cNom] ?? '') === 'total') total = { num: f[cNum], valor: f[cMed] };
  else if (typeof f[cCod] === 'number') oficiales.push({ nombre: f[cNom], num: f[cNum], valor: Math.round(f[cMed] * 100) / 100 });
}

// --- La página del mes anterior: de sus filas salen el nombre, la comunidad y los atributos de cada provincia ---
const VIVA = join(RAIZ, 'publicacion/paginas-vivas/datos__pension-media-provincia.html');
const plantilla = readFileSync(VIVA, 'utf8').replace(/^<!--[^\n]*-->\n/, '').replace(/\n$/, '');
const meta = new Map([...plantilla.matchAll(/<tr data-name="([^"]*)" data-ccaa="([^"]*)" data-ccaa-label="([^"]*)" data-label="([^"]*)" data-rank="\d+" data-provincia="([^"]*)"/g)]
  .map(([, name, ccaa, ccaaLabel, label, slug]) => [norm(label), { name, ccaa, ccaaLabel, label, slug }]));
const anterior = { mes: plantilla.match(/<h1>Pensión media de jubilación por provincia \(([^)]+)\)<\/h1>/)?.[1], media: Number(plantilla.match(/<span class="jm-keydata__value">([\d.]+,\d\d)\s€<\/span>/)?.[1].replace(/\./g, '').replace(',', '.')) || null };
const provincias = oficiales.map((o) => {
  const d = meta.get(ALIAS[norm(o.nombre)] ?? norm(o.nombre));
  if (!d) throw new Error(`Provincia del Excel sin equivalencia en la página: «${o.nombre}»`);
  return { ...d, num: o.num, valor: o.valor };
}).sort((a, b) => b.valor - a.valor);
const suma = provincias.reduce((s, p) => s + p.num, 0);
if (provincias.length !== 52 || new Set(provincias.map((p) => p.slug)).size !== 52) throw new Error(`Salen ${provincias.length} provincias, no 52`);
if (!total || suma !== total.num) throw new Error(`La suma de las provincias (${suma}) no es el total del Excel (${total?.num})`);
if (provincias.some((p) => !(p.valor > 600 && p.valor < 4000))) throw new Error('Hay una pensión media fuera de lo razonable');
const media = Math.round(total.valor * 100) / 100;
provincias.forEach((p, i) => { p.rank = i + 1; p.dif = Math.round((p.valor - media) * 100) / 100; });
const [alta, baja] = [provincias[0], provincias[51]];
const encima = provincias.filter((p) => p.dif > 0);
const dPrev = anterior.media ? Math.round((media - anterior.media) * 100) / 100 : null;

// --- Página nueva ---
const fila = (p) => `<tr data-name="${p.name}" data-ccaa="${p.ccaa}" data-ccaa-label="${p.ccaaLabel}" data-label="${p.label}" data-rank="${p.rank}" data-provincia="${p.slug}" data-num="${p.num}" data-valor="${p.valor.toFixed(2)}" data-dif="${p.dif.toFixed(2)}"><td class="n">${p.rank}</td><th scope="row" style="font-weight:700;color:var(--jm-ink)">${p.label}</th><td>${p.ccaaLabel}</td><td class="n">${num(p.num)}</td><td class="n">${eur(p.valor)}</td><td class="n" style="color:var(--jm-${p.dif >= 0 ? 'accent-strong' : 'muted'})">${p.dif >= 0 ? '+' : ''}${eur(p.dif)}</td></tr>`;
const barra = (p, clase) => `<li class="${clase}"><span class="jm-bars__name">${p.label}</span><span class="jm-bars__bar" style="width:${(p.valor / alta.valor * 100).toFixed(1)}%"></span><span class="jm-bars__val">${eur(Math.round(p.valor), 0)}</span></li>`;
const lista = (ps) => ps.slice(0, -1).map((p) => p.label).join(', ') + ' y ' + ps.at(-1).label;
const tiran = ['madrid', 'barcelona'].every((s) => provincias.find((p) => p.slug === s).dif > 0) ? ', porque las provincias más pobladas (Madrid, Barcelona) tiran de la media hacia arriba' : '';
const resumen = `${alta.label} (${eur(alta.valor)}), ${lista(provincias.slice(1, 3))} encabezan la tabla, seguidas de ${lista(provincias.slice(3, 5))}. En el extremo opuesto están ${baja.label} (${eur(baja.valor)}) y ${provincias[50].label} (${eur(provincias[50].valor)}). Solo ${encima.length} de las 52 provincias superan la media nacional de ${eur(media)}${tiran}.`
  + (dPrev != null && anterior.mes ? ` La media nacional ${dPrev >= 0 ? 'sube' : 'baja'} ${eur(Math.abs(dPrev))} respecto a ${anterior.mes.replace(/ de \d{4}$/, '')} (${eur(anterior.media)}).` : '');
let html = plantilla;
const cambiar = (re, nuevo) => {
  const n = (html.match(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')) || []).length;
  if (n !== 1) throw new Error(`La plantilla ha cambiado: ${re} aparece ${n} veces`);
  html = html.replace(re, nuevo);
};
cambiar(/(<h1>Pensión media de jubilación por provincia \()[^)]+(\)<\/h1>)/, `$1${mes}$2`);
cambiar(/(<use href="#i-refresh"\/><\/svg>Actualizado el )[^<]+/, `$1${hoy}`);
cambiar(/(Fuente: <a href=")[^"]+(" rel="noopener" target="_blank">Seguridad Social, nómina de )[^<]+/, `$1${FUENTE}$2${mes}`);
cambiar(/(Próxima actualización: )[^<]+/, `$1${siguiente}`);
cambiar(/(<h2>Resumen de )[^<]+(<\/h2><span>Actualizado el <span data-jm-rev="long">)[^<]+/, `$1${mes}$2${hoy}`);
cambiar(/<div class="jm-keydata__grid">[\s\S]*?<\/div><\/div><\/section>/, `<div class="jm-keydata__grid"><div class="jm-keydata__item"><span class="jm-keydata__value">${eur(media)}</span><span class="jm-keydata__label">Media nacional de jubilación (${num(total.num)} pensiones)</span></div><div class="jm-keydata__item"><span class="jm-keydata__value">${eur(alta.valor)}</span><span class="jm-keydata__label">La más alta: ${alta.label}</span></div><div class="jm-keydata__item"><span class="jm-keydata__value">${eur(baja.valor)}</span><span class="jm-keydata__label">La más baja: ${baja.label}</span></div><div class="jm-keydata__item"><span class="jm-keydata__value">${eur(Math.round(alta.valor - baja.valor), 0)}</span><span class="jm-keydata__label">Diferencia entre la más alta y la más baja</span></div></div></section>`);
cambiar(/(pensión más alta<\/h2><ol class="jm-bars">)[\s\S]*?(<\/ol>)/, `$1${provincias.slice(0, 10).map((p) => barra(p, '')).join('')}$2`);
cambiar(/(pensión más baja<\/h2><ol class="jm-bars">)[\s\S]*?(<\/ol>)/, `$1${provincias.slice(-10).reverse().map((p) => barra(p, 'is-low')).join('')}$2`);
cambiar(/(<caption class="jm-sr">Pensión media de jubilación por provincia, )[^<]+/, `$1${mes}`);
cambiar(/(<table class="jm-table">[\s\S]*?<tbody>)[\s\S]*?(<\/tbody>)/, `$1${provincias.map(fila).join('')}$2`);
cambiar(/(con las pensiones en vigor a 1 de )[^,]+(, del archivo)/, `$1${mes}$2`);
cambiar(/(las nuevas altas de jubilación rondan ya los )[\d.]+\s€/, `$1${eur(ALTAS, 0)}`);
cambiar(/<h2>Qué dicen los datos de [^<]+<\/h2><p>[\s\S]*?<\/p>/, `<h2>Qué dicen los datos de ${MESES[m - 1]}</h2><p>${resumen}</p>`);
cambiar(/(<td>Pensiones contributivas, )[^(]+( \(nota y archivo adjunto\)<\/td><td><a href=")[^"]+/, `$1${mes}$2${FUENTE}`);

const csv = ['puesto,provincia,comunidad,pensiones,pension_media,diferencia_con_la_media', ...provincias.map((p) => [p.rank, p.label, p.ccaaLabel, p.num, p.valor.toFixed(2), p.dif.toFixed(2)].map((c) => /[,"]/.test(c) ? `"${c}"` : c).join(',')), `,Total nacional,,${total.num},${media.toFixed(2)},`].join('\n') + '\n';
mkdirSync(join(RAIZ, 'publicacion/datos'), { recursive: true });
writeFileSync(join(RAIZ, `publicacion/datos/pension-media-provincia-${MES}.csv`), csv);
console.log(`${mes}: media ${eur(media)} · ${num(total.num)} pensiones · más alta ${alta.label} ${eur(alta.valor)} · más baja ${baja.label} ${eur(baja.valor)} · ${encima.length} por encima de la media`);
console.log(resumen);
if (!SUBIR) {
  const previa = join(tmpdir(), `pension-provincia-${MES}.html`);
  writeFileSync(previa, html);
  console.log('Vista previa en', previa, '(sin --subir no se cambia la web)');
  process.exit(0);
}

const p = await api('/wp/v2/pages/41', { method: 'POST', body: JSON.stringify({ content: html }) });
if (p.content.raw !== html) throw new Error('WordPress no guardó la página tal cual');
await api('/rankmath/v1/updateMeta', { method: 'POST', body: JSON.stringify({ objectType: 'post', objectID: 41, meta: {
  rank_math_title: `Pensión media por provincia (${MESES[m - 1]} ${anio}) %sep% %sitename%`,
  rank_math_description: `Pensión media de jubilación en las 52 provincias de España en ${mes}: ranking, diferencia con la media nacional y datos descargables.` } }) });
writeFileSync(VIVA, `<!-- id 41 · publish · ${WEB}/datos/pension-media-provincia/ -->\n${html}\n`);
console.log('Actualizada la página 41 y su título y descripción de Rank Math');

// --- Portada /datos/: las cifras del apartado de la tabla ---
const DATOS = join(RAIZ, 'paginas/portadas/datos.md');
let md = readFileSync(DATOS, 'utf8');
const euros = (n) => `${num(n, 2)} euros`;
for (const [re, nuevo] of [
  [/(con la nómina de \*\*)[^*]+(\*\*: la media nacional es de \*\*)[^*]+(\*\*, repartidos entre \*\*)[^*]+(\*\*)/, `$1${mes}$2${euros(media)} al mes$3${num(total.num)} pensiones$4`],
  [/- La más alta es la de \*\*[^*]+\*\*, seguida de [^.]+\./, `- La más alta es la de **${alta.label} (${euros(alta.valor)})**, seguida de ${lista(provincias.slice(1, 5))}.`],
  [/- La más baja es la de \*\*[^*]+\*\*\. Entre las dos hay \*\*[^*]+\*\* de diferencia\./, `- La más baja es la de **${baja.label} (${euros(baja.valor)})**. Entre las dos hay **${num(Math.round(alta.valor - baja.valor))} euros al mes** de diferencia.`],
  [/(- Solo \*\*)\d+( de las 52 provincias\*\* superan la media nacional)[^.]*\./, `$1${encima.length}$2${tiran}.`],
  [/(las nuevas altas de jubilación rondan ya los \*\*)[^*]+(\*\*)/, `$1${num(ALTAS)} euros al mes$2`],
]) {
  if ((md.match(new RegExp(re.source, 'g')) || []).length !== 1) throw new Error(`datos.md ha cambiado: ${re}`);
  md = md.replace(re, nuevo);
}
writeFileSync(DATOS, md);
console.log('Reescrito paginas/portadas/datos.md: súbelo con subir-portadas.mjs --solo=datos');
