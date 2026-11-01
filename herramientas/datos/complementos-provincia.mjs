// Crea o actualiza dos páginas hijas de /datos/ con el Excel que acompaña a la nota mensual de pensiones
// de la Seguridad Social (revista.seg-social.es, «archivo adjunto»):
//   /datos/complemento-minimos-provincia/       hojas «Minimos prov» y «Pensiones - mínimos»
//   /datos/complemento-brecha-genero-provincia/ hoja «Brecha de Género»
// Las provincias se reconocen por el nombre (los códigos del Excel tienen erratas) con los datos de la
// página de pensión media por provincia (paginas-vivas), y se comprueba que salen las 52 y que suman el total.
// Uso (desde la raíz del proyecto):
//   node herramientas/datos/complementos-provincia.mjs --excel=Pensiones_OCTUBRE_2026.xlsx \
//     --fuente=https://revista.seg-social.es/-/… [--subir]
//   Sin --subir escribe los CSV y una vista previa y no toca la web.
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
const [EXCEL, FUENTE] = [arg('excel'), arg('fuente')];
if (!EXCEL || !/^https:\/\//.test(FUENTE || '')) {
  console.error('Uso: --excel=archivo.xlsx --fuente=https://… [--subir]');
  process.exit(1);
}

// Cifras legales del año (RD 241/2026). En enero, con el decreto de revalorización, se cambian aquí.
const LEY = { anio: 2026, limite: '9.442', limiteConyuge: '11.013', topeMinimos: '628,80', porHijo: 36.90,
  decreto: { nombre: 'RD 241/2026', url: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-6977', id: 'BOE-A-2026-6977' } };

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
const pct = (x, dec = 1) => J.num(x * 100, dec) + ' %';
const icon = (id) => `<svg class="jm-i" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const PALABRA = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'];
const enLetra = (n, fem) => (n === 1 && fem ? 'una' : PALABRA[n] ?? num(n));
const lista = (a) => a.length > 1 ? a.slice(0, -1).join(', ') + ' y ' + a.at(-1) : a[0];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const hoy = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

// --- Fecha de los datos: «1 de octubre de 2026» en las dos hojas ---
const fecha = (nombre) => {
  for (const f of hoja(EXCEL, nombre).values()) for (const v of Object.values(f)) {
    const m = typeof v === 'string' && norm(v).match(/\b0?1 de ([a-z]+) de (\d{4})/);
    if (m && MESES.includes(m[1])) return { mes: MESES.indexOf(m[1]), anio: Number(m[2]) };
  }
  throw new Error(`No encuentro la fecha de los datos en la hoja «${nombre}»`);
};
const F1 = fecha('Minimos prov'), F2 = fecha('Brecha de Género');
if (F1.mes !== F2.mes || F1.anio !== F2.anio) throw new Error('Las dos hojas no son del mismo mes');
const { mes: M, anio: ANIO } = F1;
if (ANIO !== LEY.anio) throw new Error(`Los datos son de ${ANIO}: actualiza las cifras legales de LEY (están las de ${LEY.anio})`);
const mesTxt = `${MESES[M]} de ${ANIO}`;
const sufijo = `${ANIO}-${String(M + 1).padStart(2, '0')}`;

// --- Provincias: nombre, comunidad y atributos de la página de pensión media por provincia ---
const VIVA = readFileSync(join(RAIZ, 'publicacion/paginas-vivas/datos__pension-media-provincia.html'), 'utf8');
const META = new Map([...VIVA.matchAll(/<tr data-name="([^"]*)" data-ccaa="([^"]*)" data-ccaa-label="([^"]*)" data-label="([^"]*)" data-rank="\d+" data-provincia="([^"]*)" data-num="\d+" data-valor="([\d.]+)"/g)]
  .map(([, name, ccaa, ccaaLabel, label, slug, media]) => [norm(label), { name, ccaa, ccaaLabel, label, slug, media: Number(media) }]));
const CCAA = [...new Map([...META.values()].map((p) => [p.ccaa, p.ccaaLabel])).entries()].sort((a, b) => a[1].localeCompare(b[1], 'es'));
const ALIAS = { 'palmas (las)': 'las palmas', 's.c.tenerife': 'santa cruz de tenerife', 'alacant- alicante': 'alicante', 'alacant-alicante': 'alicante', castello: 'castellon', 'araba-alava': 'alava', vizcaya: 'bizkaia', 'rioja (la)': 'la rioja' };
const provinciaDe = (nombre) => META.get(ALIAS[norm(nombre)] ?? norm(nombre));

function provincias(nombre, leer) {
  const out = []; let total;
  for (const f of hoja(EXCEL, nombre).values()) {
    if (typeof f.C !== 'string' || typeof f.D !== 'number') continue;
    if (norm(f.C) === 'total') { total = leer(f); continue; }
    const p = provinciaDe(f.C);
    if (p) out.push({ ...p, ...leer(f) });
  }
  if (out.length !== 52 || new Set(out.map((p) => p.slug)).size !== 52) throw new Error(`«${nombre}»: salen ${out.length} provincias, no 52`);
  const suma = out.reduce((s, p) => s + p.num, 0);
  if (!total || suma !== total.num) throw new Error(`«${nombre}»: la suma de las provincias (${suma}) no es el total (${total?.num})`);
  return { lista: out, total };
}

// ============================== 1. COMPLEMENTO A MÍNIMOS ==============================
const MIN = provincias('Minimos prov', (f) => ({ num: f.D, muj: f.E, hom: f.F, valor: f.G }));
if (MIN.lista.some((p) => !(p.valor > 0.02 && p.valor < 0.7))) throw new Error('Hay un porcentaje de mínimos fuera de lo razonable');
MIN.lista.sort((a, b) => b.valor - a.valor || b.num - a.num).forEach((p, i) => { p.rank = i + 1; });
const clases = [];
for (const f of hoja(EXCEL, 'Pensiones - mínimos').values()) {
  if (typeof f.B === 'string' && /distribuci/i.test(f.B)) break;
  if (typeof f.B === 'string' && typeof f.C === 'number' && typeof f.G === 'number') clases.push({ nombre: f.B.trim(), num: f.C, muj: f.E, hom: f.F, valor: f.G });
}
const clase = (re) => { const c = clases.find((x) => re.test(norm(x.nombre))); if (!c) throw new Error(`Falta la clase ${re}`); return c; };
const CL = [['Jubilación', clase(/^jubilacion$/), 'las de jubilación'], ['Jubilación que procede de una incapacidad', clase(/^jubilacion procedente/), 'las jubilaciones que proceden de una incapacidad'],
  ['Incapacidad permanente', clase(/^incapacidad/), 'las de incapacidad permanente'], ['Viudedad', clase(/^viudedad/), 'las de viudedad'], ['Orfandad', clase(/^orfandad/), 'las de orfandad'],
  ['A favor de familiares', clase(/^favor/), 'las pensiones a favor de familiares'], ['SOVI', clase(/^sovi/), 'las del SOVI']];
const clTotal = clase(/^total pensiones en vigor/);
if (clTotal.num !== MIN.total.num) throw new Error('El total por clases no coincide con el total por provincias');

const unaDe = Math.round(1 / MIN.total.valor);
const altasMin = MIN.lista.slice(0, 10), bajasMin = MIN.lista.slice(-10).reverse();
const pobres = [...META.values()].sort((a, b) => a.media - b.media).slice(0, 10).map((p) => p.slug);
const coinciden = altasMin.filter((p) => pobres.includes(p.slug)).map((p) => p.label);
const porClase = CL.slice(0, 6).map(([n, c, prosa]) => ({ n, c, prosa })).sort((a, b) => b.c.valor - a.c.valor);
const pequenas = porClase.slice(0, 2).every((x) => /^(Orfandad|A favor)/.test(x.n));
const maxMin = altasMin[0].valor;
const barraPc = (p, clase, max) => `<li class="${clase}"><span class="jm-bars__name">${p.label}</span><span class="jm-bars__bar" style="width:${(p.valor / max * 100).toFixed(1)}%"></span><span class="jm-bars__val">${pct(p.valor)}</span></li>`;
const filtros = (id) => `<div class="jm-filters">
      <div class="jm-field"><label for="${id}-q">Buscar provincia</label><input class="jm-input" id="${id}-q" type="search" data-jm-q placeholder="Escribe una provincia"></div>
      <div class="jm-field"><label for="${id}-cc">Comunidad autónoma</label><select class="jm-select" id="${id}-cc" data-jm-ccaa><option value="">Todas</option>${CCAA.map(([v, t]) => `<option value="${v}">${t}</option>`).join('')}</select></div>
      <button class="jm-btn jm-btn--ghost" type="button" data-jm-csv>${icon('download')}Descargar CSV</button>
    </div>
    <p class="jm-hint" data-jm-count aria-live="polite">52 provincias</p>`;
const th = (key, txt, sort) => `<th scope="col" class="n" data-sort="${key}"${sort ? ' aria-sort="descending"' : ''}><button type="button">${txt}</button></th>`;
const cabeza = (crumb, h1, lead) => `<section class="jm-pagehead">
  <div class="jm-wrap"><div class="jm-pagehead__copy" style="max-width:54rem">
    <nav class="jm-crumbs" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><a href="/datos/">Datos</a></li><li><span aria-current="page">${crumb}</span></li></ol></nav>
    <h1>${h1}</h1>
    <p class="jm-lead">${lead}</p>
    <p class="jm-meta"><span>${icon('refresh')}Actualizado el ${hoy}</span><span>${icon('book')}Fuente: <a href="${FUENTE}" rel="noopener" target="_blank">Seguridad Social, nómina de ${mesTxt}</a></span><span>${icon('calendar')}Se actualiza cada mes</span></p>
  </div></div>
</section>`;
const resumen = (items) => `<section class="jm-keydata jm-keydata--4"><div class="jm-keydata__head"><h2>Resumen de ${mesTxt}</h2><span>Actualizado el <span data-jm-rev="long">${hoy}</span></span></div><div class="jm-keydata__grid">${items.map(([v, l]) => `<div class="jm-keydata__item"><span class="jm-keydata__value">${v}</span><span class="jm-keydata__label">${l}</span></div>`).join('')}</div></section>`;
const fuentes = (extra) => `<div class="jm-table-wrap"><table class="jm-sources"><caption>Fuentes oficiales</caption><thead><tr><th scope="col">Fuente</th><th scope="col">Documento</th><th scope="col">Enlace</th></tr></thead><tbody><tr><td>Seguridad Social</td><td>Pensiones contributivas, ${mesTxt} (nota y archivo adjunto)</td><td><a href="${FUENTE}" rel="noopener" target="_blank">revista.seg-social.es${icon('external')}</a></td></tr>${extra}<tr><td>BOE</td><td>${LEY.decreto.nombre}, revalorización y cuantías de ${LEY.anio}</td><td><a href="${LEY.decreto.url}" rel="noopener" target="_blank">${LEY.decreto.id}${icon('external')}</a></td></tr></tbody></table></div>`;
const lgss = (art) => `<tr><td>BOE</td><td>Ley General de la Seguridad Social, artículo ${art}</td><td><a href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a${art}" rel="noopener" target="_blank">BOE-A-2015-11724${icon('external')}</a></td></tr>`;
const siguiente = (href, titulo) => `<a class="jm-next" href="${href}"><span><span class="jm-next__label">${icon('arrow')}Más datos</span><span class="jm-next__title">${titulo}</span></span><span class="jm-next__arrow">${icon('arrow')}</span></a>`;
const cta = (titulo, texto, href, boton) => `<aside class="jm-calc-cta"><span class="jm-tile__icon">${icon('book')}</span><div><h3>${titulo}</h3><p>${texto}</p></div><a class="jm-btn jm-btn--ink" href="${href}">${boton}${icon('arrow')}</a></aside>`;
const reutiliza = '<div class="jm-promo"><h3>Reutiliza estos datos</h3><p>Puedes descargarlos en CSV y reutilizarlos citando a Jubilómetro y a la Seguridad Social como fuente original.</p></div>';

const filaMin = (p) => `<tr data-name="${p.name}" data-ccaa="${p.ccaa}" data-ccaa-label="${p.ccaaLabel}" data-label="${p.label}" data-rank="${p.rank}" data-provincia="${p.slug}" data-num="${p.num}" data-muj="${p.muj}" data-hom="${p.hom}" data-valor="${p.valor}" data-csv="${p.num}|${(p.muj * 100).toFixed(1)}|${(p.hom * 100).toFixed(1)}|${(p.valor * 100).toFixed(1)}"><td class="n">${p.rank}</td><th scope="row" style="font-weight:700;color:var(--jm-ink)">${p.label}</th><td>${p.ccaaLabel}</td><td class="n">${num(p.num)}</td><td class="n">${pct(p.muj)}</td><td class="n">${pct(p.hom)}</td><td class="n" style="font-weight:700;color:var(--jm-ink)">${pct(p.valor)}</td></tr>`;
const filaClase = ([n, c]) => `<tr><th scope="row">${n}</th><td class="n">${num(c.num)}</td><td class="n">${pct(c.muj)}</td><td class="n">${pct(c.hom)}</td><td class="n">${pct(c.valor)}</td></tr>`;

const htmlMin = `<!-- wp:html -->
${cabeza('Complemento a mínimos por provincia', `Pensiones con complemento a mínimos por provincia (${mesTxt})`,
  'Qué parte de las pensiones de cada provincia necesita el complemento a mínimos para llegar a la pensión mínima, separado entre mujeres y hombres y por clase de pensión. Con los datos oficiales de la Seguridad Social.')}
<section class="jm-section jm-section--tight" style="padding-top:0"><div class="jm-wrap jm-stack" style="gap:2.5rem">
  ${resumen([[num(MIN.total.num), `Pensiones con complemento a mínimos: una de cada ${enLetra(unaDe)} (${pct(MIN.total.valor)})`], [pct(MIN.total.muj), `De las pensiones de mujeres, frente al ${pct(MIN.total.hom)} de las de hombres`], [pct(altasMin[0].valor), `La provincia con más: ${altasMin[0].label}`], [pct(bajasMin[0].valor), `La que menos: ${bajasMin[0].label}`]])}
  <div class="jm-cols2">
    <div class="jm-stack"><h2 style="font-size:1.6rem">Las 10 provincias con más pensiones complementadas</h2><ol class="jm-bars">${altasMin.map((p) => barraPc(p, '', maxMin)).join('')}</ol></div>
    <div class="jm-stack"><h2 style="font-size:1.6rem">Las 10 con menos</h2><ol class="jm-bars">${bajasMin.map((p) => barraPc(p, 'is-low', maxMin)).join('')}</ol></div>
  </div>
  <p class="jm-hint">Porcentaje de las pensiones de cada provincia que cobran complemento a mínimos, a 1 de ${mesTxt}.</p>
  <div data-jm-datos="complemento-minimos-provincia" data-jm-csv-head="provincia|comunidad|pensiones_con_minimos|porcentaje_mujeres|porcentaje_hombres|porcentaje_total" class="jm-stack" style="gap:1rem">
    <h2>Todas las provincias</h2>
    ${filtros('m')}
    <div class="jm-table-card"><div class="jm-table-wrap"><table class="jm-table"><caption class="jm-sr">Pensiones con complemento a mínimos por provincia y porcentaje sobre el total de pensiones, ${mesTxt}</caption>
      <thead><tr>${th('rank', 'Puesto')}<th scope="col" data-sort="provincia"><button type="button">Provincia</button></th><th scope="col">Comunidad</th>${th('num', 'Pensiones con mínimos')}${th('muj', 'De las de mujeres')}${th('hom', 'De las de hombres')}${th('valor', 'Del total', true)}</tr></thead>
      <tbody>${MIN.lista.map(filaMin).join('')}</tbody></table></div></div>
  </div>
  <div class="jm-stack"><h2>Por clase de pensión</h2>
    <div class="jm-table-card"><div class="jm-table-wrap"><table class="jm-table"><caption class="jm-sr">Pensiones con complemento a mínimos por clase de pensión, ${mesTxt}</caption>
      <thead><tr><th scope="col">Clase de pensión</th><th scope="col" class="n">Con mínimos</th><th scope="col" class="n">De las de mujeres</th><th scope="col" class="n">De las de hombres</th><th scope="col" class="n">Del total de la clase</th></tr></thead>
      <tbody>${CL.map(filaClase).join('')}<tr><th scope="row">Total</th><td class="n">${num(clTotal.num)}</td><td class="n">${pct(clTotal.muj)}</td><td class="n">${pct(clTotal.hom)}</td><td class="n">${pct(clTotal.valor)}</td></tr></tbody></table></div></div>
    <p class="jm-hint">SOVI: el antiguo Seguro Obligatorio de Vejez e Invalidez, anterior a 1967.</p>
  </div>
  <div class="jm-split">
    <div class="jm-stack" style="gap:1.5rem">
      <div class="jm-prose"><h2>Qué dicen los datos de ${MESES[M]}</h2>
        <p>A 1 de ${mesTxt}, ${num(MIN.total.num)} pensiones cobraban complemento a mínimos: una de cada ${enLetra(unaDe)}. Entre las pensiones de mujeres la proporción es del ${pct(MIN.total.muj)}, casi el doble que entre las de hombres (${pct(MIN.total.hom)}), sobre todo porque muchas mujeres tuvieron carreras de cotización más cortas y con sueldos más bajos.</p>
        <p>El porcentaje más alto está en ${lista(altasMin.slice(0, 3).map((p) => `${p.label} (${pct(p.valor)})`))}; el más bajo, en ${lista(bajasMin.slice(0, 3).map((p) => `${p.label} (${pct(p.valor)})`))}.${coinciden.length ? ` ${lista(coinciden)} ${coinciden.length > 1 ? 'están' : 'está'} a la vez entre las provincias con más complementos y entre las diez con la <a href="/datos/pension-media-provincia/">pensión media de jubilación más baja</a>.` : ''}</p>
        <p>Por clase de pensión, el complemento es más frecuente en ${porClase[0].prosa} (${pct(porClase[0].c.valor)}) y en ${porClase[1].prosa.replace(/^las pensiones /, 'las ')} (${pct(porClase[1].c.valor)})${pequenas ? ', que suelen ser pensiones pequeñas' : ''}. En jubilación lo cobra el ${pct(CL[0][1].valor)} y en viudedad, el ${pct(CL[3][1].valor)}.</p>
        <h2>Qué es el complemento a mínimos</h2>
        <p>Es la cantidad que la Seguridad Social añade a una pensión contributiva para que llegue a la pensión mínima que fija cada año la ley. En ${LEY.anio} lo cobras si vives en España y tus otros ingresos no pasan de ${LEY.limite} euros al año, o de ${LEY.limiteConyuge} euros entre los dos si tienes cónyuge a cargo. En las pensiones causadas desde 2013 no puede superar ${LEY.topeMinimos} euros al mes. Te lo explicamos con ejemplos en <a href="/cuanto-cobrare/complemento-a-minimos/">el complemento a mínimos</a>, y todas las cuantías están en <a href="/cuanto-cobrare/pension-minima/">la pensión mínima</a>.</p>
      </div>
      <div class="jm-prose"><h2>Metodología</h2><p>Tomamos el número de pensiones con complemento a mínimos de cada provincia y el porcentaje que suponen sobre todas sus pensiones, por sexo, del archivo que acompaña a la nota mensual de pensiones de la Seguridad Social, y el desglose por clase de pensión del mismo archivo. Son pensiones contributivas del sistema de la Seguridad Social en vigor el 1 de ${mesTxt}, de todas las clases: jubilación, incapacidad permanente, viudedad, orfandad y a favor de familiares. Comprobamos que la suma de las 52 provincias da el total nacional.</p></div>
      ${fuentes(lgss(59))}
    </div>
    <aside class="jm-stack" style="gap:1rem">
      ${reutiliza}
      ${cta('Complemento a mínimos', '¿Te corresponde? Requisitos, límite de ingresos y ejemplos.', '/cuanto-cobrare/complemento-a-minimos/', 'Leer la guía')}
    </aside>
  </div>
  ${siguiente('/datos/complemento-brecha-genero-provincia/', 'Complemento de brecha de género por provincia')}
</div></section>
<!-- /wp:html -->`;

// ============================== 2. COMPLEMENTO DE BRECHA DE GÉNERO ==============================
const BRE = provincias('Brecha de Género', (f) => ({ num: f.D, valor: f.E, h1: f.F, h2: f.G, h3: f.H, h4: f.I }));
if (BRE.lista.some((p) => !(p.valor > 30 && p.valor < 150))) throw new Error('Hay un importe medio de brecha fuera de lo razonable');
for (const p of BRE.lista) p.tres = (p.h3 + p.h4) / p.num;
BRE.lista.sort((a, b) => b.num - a.num).forEach((p, i) => { p.rank = i + 1; });
let sexo;
for (const f of hoja(EXCEL, 'Brecha de Género').values()) if (typeof f.D === 'number' && typeof f.E === 'number' && f.F === BRE.total.num && f.D + f.E === f.F) sexo = { muj: f.D, hom: f.E };
if (!sexo) throw new Error('No encuentro el total por sexo de la hoja «Brecha de Género»');
const T = BRE.total, sumaHijos = T.h1 + T.h2 + T.h3 + T.h4;
if (Math.abs(sumaHijos - T.num) > T.num * 0.001) throw new Error('El reparto por hijos no cuadra con el total');
const hijos = [[1, T.h1], [2, T.h2], [3, T.h3], [4, T.h4]].map(([n, v]) => ({ n, v, cuota: v / sumaHijos }));
const moda = [...hijos].sort((a, b) => b.v - a.v)[0];
const porImporte = [...BRE.lista].sort((a, b) => b.valor - a.valor || b.tres - a.tres);
const altasB = porImporte.slice(0, 10), bajasB = porImporte.slice(-10).reverse();
const maxB = altasB[0].valor;
const masTres = [...BRE.lista].sort((a, b) => b.tres - a.tres).slice(0, 10).map((p) => p.slug);
const conTres = altasB.slice(0, 3).every((p) => masTres.includes(p.slug));
const barraEur = (p, clase) => `<li class="${clase}"><span class="jm-bars__name">${p.label}</span><span class="jm-bars__bar" style="width:${(p.valor / maxB * 100).toFixed(1)}%"></span><span class="jm-bars__val">${eur(p.valor, 0)}</span></li>`;
const filaB = (p) => `<tr data-name="${p.name}" data-ccaa="${p.ccaa}" data-ccaa-label="${p.ccaaLabel}" data-label="${p.label}" data-rank="${p.rank}" data-provincia="${p.slug}" data-num="${p.num}" data-valor="${p.valor}" data-tres="${p.tres.toFixed(4)}" data-csv="${p.num}|${p.valor}|${p.h1}|${p.h2}|${p.h3}|${p.h4}"><td class="n">${p.rank}</td><th scope="row" style="font-weight:700;color:var(--jm-ink)">${p.label}</th><td>${p.ccaaLabel}</td><td class="n">${num(p.num)}</td><td class="n">${eur(p.valor, 0)}</td><td class="n">${pct(p.tres)}</td></tr>`;
const cuantia = (n) => eur(LEY.porHijo * n);
const htmlBre = `<!-- wp:html -->
${cabeza('Complemento de brecha de género por provincia', `Complemento de brecha de género por provincia (${mesTxt})`,
  'Cuántas pensiones cobran el complemento de brecha de género en cada provincia, cuánto suma de media y por cuántos hijos, y qué parte cobran mujeres y hombres. Con los datos oficiales de la Seguridad Social.')}
<section class="jm-section jm-section--tight" style="padding-top:0"><div class="jm-wrap jm-stack" style="gap:2.5rem">
  ${resumen([[num(T.num), 'Pensiones con el complemento de brecha de género'], [eur(T.valor), 'Importe medio del complemento al mes'], [pct(sexo.muj / T.num), `Son pensiones de mujeres; las otras ${num(sexo.hom)}, de hombres`], [pct(moda.cuota), `Por ${enLetra(moda.n)} ${moda.n === 1 ? 'hijo' : 'hijos'}, el caso más habitual`]])}
  <div class="jm-cols2">
    <div class="jm-stack"><h2 style="font-size:1.6rem">Las 10 provincias con el importe medio más alto</h2><ol class="jm-bars">${altasB.map((p) => barraEur(p, '')).join('')}</ol></div>
    <div class="jm-stack"><h2 style="font-size:1.6rem">Las 10 con el importe más bajo</h2><ol class="jm-bars">${bajasB.map((p) => barraEur(p, 'is-low')).join('')}</ol></div>
  </div>
  <p class="jm-hint">Importe medio al mes del complemento en cada provincia, a 1 de ${mesTxt}. La estadística provincial lo da redondeado a euros.</p>
  <div class="jm-stack"><h2>Por número de hijos</h2>
    <div class="jm-table-card"><div class="jm-table-wrap"><table class="jm-table"><caption class="jm-sr">Pensiones con complemento de brecha de género por número de hijos e importe en ${LEY.anio}, ${mesTxt}</caption>
      <thead><tr><th scope="col">Hijos</th><th scope="col" class="n">Pensiones</th><th scope="col" class="n">Del total</th><th scope="col" class="n">Complemento al mes en ${LEY.anio}</th></tr></thead>
      <tbody>${hijos.map((h) => `<tr><th scope="row">${h.n === 4 ? '4 o más' : h.n}</th><td class="n">${num(h.v)}</td><td class="n">${pct(h.cuota)}</td><td class="n">${cuantia(h.n)}</td></tr>`).join('')}</tbody></table></div></div>
    <p class="jm-hint">El complemento es de ${eur(LEY.porHijo)} al mes por hijo en ${LEY.anio}, en 14 pagas, con un máximo de cuatro hijos.</p>
  </div>
  <div data-jm-datos="complemento-brecha-genero-provincia" data-jm-csv-head="provincia|comunidad|pensiones_con_complemento|importe_medio_eur|por_1_hijo|por_2_hijos|por_3_hijos|por_4_o_mas_hijos" class="jm-stack" style="gap:1rem">
    <h2>Todas las provincias</h2>
    ${filtros('b')}
    <div class="jm-table-card"><div class="jm-table-wrap"><table class="jm-table"><caption class="jm-sr">Pensiones con complemento de brecha de género por provincia, importe medio y porcentaje por tres hijos o más, ${mesTxt}</caption>
      <thead><tr>${th('rank', 'Puesto')}<th scope="col" data-sort="provincia"><button type="button">Provincia</button></th><th scope="col">Comunidad</th>${th('num', 'Pensiones con complemento', true)}${th('valor', 'Importe medio')}${th('tres', 'Por 3 hijos o más')}</tr></thead>
      <tbody>${BRE.lista.map(filaB).join('')}</tbody></table></div></div>
    <p class="jm-hint">El CSV incluye también el número de pensiones por 1, 2, 3 y 4 o más hijos de cada provincia.</p>
  </div>
  <div class="jm-split">
    <div class="jm-stack" style="gap:1.5rem">
      <div class="jm-prose"><h2>Qué dicen los datos de ${MESES[M]}</h2>
        <p>A 1 de ${mesTxt}, ${num(T.num)} pensiones cobraban el complemento de brecha de género, con un importe medio de ${eur(T.valor)} al mes. El ${pct(sexo.muj / T.num)} son de mujeres y el ${pct(sexo.hom / T.num)}, de hombres: los padres pueden cobrarlo si cumplen requisitos concretos, como que su carrera se viera afectada por el nacimiento de los hijos o cobrar viudedad con hijos con derecho a orfandad.</p>
        <p>Lo más habitual es cobrarlo por ${enLetra(moda.n)} ${moda.n === 1 ? 'hijo' : 'hijos'} (${pct(moda.cuota)} de los casos), que en ${LEY.anio} son ${cuantia(moda.n)} al mes. Por tres hijos o más lo cobra el ${pct(hijos[2].cuota + hijos[3].cuota)}.</p>
        <p>El importe medio más alto está en ${lista(altasB.slice(0, 3).map((p) => `${p.label} (${eur(p.valor, 0)})`))}${conTres ? ', donde más pensiones lo cobran por tres hijos o más' : ''}; el más bajo, en ${lista(bajasB.slice(0, 3).map((p) => `${p.label} (${eur(p.valor, 0)})`))}. Refleja cuántos hijos tuvieron, en cada provincia, quienes han empezado a cobrar su pensión desde 2021.</p>
        <p>Como solo se reconoce en las pensiones causadas desde febrero de 2021, el número crece cada mes con las nuevas jubilaciones, viudedades e incapacidades.</p>
        <h2>Qué es el complemento de brecha de género</h2>
        <p>Es una cantidad fija por hijo que se suma a la pensión contributiva de jubilación, incapacidad permanente o viudedad: en ${LEY.anio}, ${eur(LEY.porHijo)} al mes por hijo, hasta cuatro (${cuantia(4)}), en 14 pagas. No cuenta para la pensión máxima ni como ingreso para el complemento a mínimos. Quién lo cobra, cómo se pide y qué pasa con los padres lo explicamos en <a href="/cuanto-cobrare/complemento-brecha-genero/">el complemento de brecha de género</a>.</p>
      </div>
      <div class="jm-prose"><h2>Metodología</h2><p>Tomamos el número de pensiones con complemento de brecha de género de cada provincia, su importe medio y el reparto por número de hijos del archivo que acompaña a la nota mensual de pensiones de la Seguridad Social, con datos a 1 de ${mesTxt}. El porcentaje «por 3 hijos o más» lo calculamos nosotros con ese reparto. Comprobamos que la suma de las 52 provincias da el total nacional.</p></div>
      ${fuentes(lgss(60))}
    </div>
    <aside class="jm-stack" style="gap:1rem">
      ${reutiliza}
      ${cta('Complemento de brecha de género', 'Quién lo cobra, también los padres, y cómo se pide.', '/cuanto-cobrare/complemento-brecha-genero/', 'Leer la guía')}
    </aside>
  </div>
  ${siguiente('/datos/complemento-minimos-provincia/', 'Pensiones con complemento a mínimos por provincia')}
</div></section>
<!-- /wp:html -->`;

// ============================== Salida ==============================
mkdirSync(join(RAIZ, 'publicacion/datos'), { recursive: true });
writeFileSync(join(RAIZ, `publicacion/datos/complemento-minimos-provincia-${sufijo}.csv`),
  ['provincia,comunidad,pensiones_con_minimos,porcentaje_mujeres,porcentaje_hombres,porcentaje_total', ...MIN.lista.map((p) => [`"${p.label}"`, `"${p.ccaaLabel}"`, p.num, (p.muj * 100).toFixed(1), (p.hom * 100).toFixed(1), (p.valor * 100).toFixed(1)].join(','))].join('\n') + '\n');
writeFileSync(join(RAIZ, `publicacion/datos/complemento-brecha-genero-provincia-${sufijo}.csv`),
  ['provincia,comunidad,pensiones_con_complemento,importe_medio_eur,por_1_hijo,por_2_hijos,por_3_hijos,por_4_o_mas_hijos', ...BRE.lista.map((p) => [`"${p.label}"`, `"${p.ccaaLabel}"`, p.num, p.valor, p.h1, p.h2, p.h3, p.h4].join(','))].join('\n') + '\n');
console.log(`${mesTxt}: mínimos ${num(MIN.total.num)} (${pct(MIN.total.valor)}; ${altasMin[0].label} ${pct(altasMin[0].valor)} · ${bajasMin[0].label} ${pct(bajasMin[0].valor)})`);
console.log(`${mesTxt}: brecha ${num(T.num)} (media ${eur(T.valor)}; mujeres ${pct(sexo.muj / T.num)}; ${altasB[0].label} ${eur(altasB[0].valor, 0)} · ${bajasB[0].label} ${eur(bajasB[0].valor, 0)})`);

const PAGINAS = [
  { slug: 'complemento-minimos-provincia', title: 'Complemento a mínimos por provincia', html: htmlMin,
    seo: { rank_math_title: `Pensiones con complemento a mínimos por provincia (${MESES[M]} ${ANIO}) %sep% %sitename%`,
      rank_math_description: `${num(MIN.total.num)} pensiones cobran complemento a mínimos, el ${pct(MIN.total.valor)}. Porcentaje por provincia, por sexo y por clase de pensión, con datos oficiales de ${mesTxt}.`,
      rank_math_focus_keyword: 'complemento a mínimos por provincia' } },
  { slug: 'complemento-brecha-genero-provincia', title: 'Complemento de brecha de género por provincia', html: htmlBre,
    seo: { rank_math_title: `Complemento de brecha de género por provincia (${MESES[M]} ${ANIO}) %sep% %sitename%`,
      rank_math_description: `${num(T.num)} pensiones cobran el complemento de brecha de género, con ${eur(T.valor)} de media. Datos por provincia y por número de hijos, de ${mesTxt}.`,
      rank_math_focus_keyword: 'complemento brecha de género por provincia' } }
];
if (!SUBIR) {
  for (const p of PAGINAS) { const f = join(tmpdir(), p.slug + '.html'); writeFileSync(f, p.html); console.log('Vista previa en', f); }
  console.log('(sin --subir no se cambia la web)');
  process.exit(0);
}
for (const pg of PAGINAS) {
  const [ex] = await api(`/wp/v2/pages?slug=${pg.slug}&parent=22&status=publish,draft&_fields=id`);
  const body = { title: pg.title, slug: pg.slug, parent: 22, status: 'publish', content: pg.html, comment_status: 'closed', ping_status: 'closed',
    meta: { _kad_post_title: 'hide', _kad_post_layout: 'fullwidth', _kad_post_content_style: 'unboxed', _kad_post_vertical_padding: 'hide', _kad_post_feature: 'hide' } };
  const p = await api('/wp/v2/pages' + (ex ? '/' + ex.id : ''), { method: 'POST', body: JSON.stringify(body) });
  await api('/rankmath/v1/updateMeta', { method: 'POST', body: JSON.stringify({ objectType: 'post', objectID: p.id, meta: pg.seo }) });
  writeFileSync(join(RAIZ, `publicacion/paginas-vivas/datos__${pg.slug}.html`), `<!-- id ${p.id} · publish · ${p.link} -->\n${pg.html}\n`);
  console.log(ex ? 'Actualizada' : 'Creada', p.id, p.link);
}
