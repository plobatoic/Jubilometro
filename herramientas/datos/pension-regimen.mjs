// Crea o actualiza /datos/pension-media-regimen/ (hija de /datos/) con el Excel que acompaña a la nota mensual
// de pensiones de la Seguridad Social: hoja «Distrib - regím. Altas nuevas» (pensiones en vigor por régimen y
// clase, y pensión media de las nuevas altas del mes anterior en el Régimen General y en todo el sistema).
// Comprueba que la suma de los regímenes da el total del sistema en cada clase.
// Uso (desde la raíz del proyecto):
//   node herramientas/datos/pension-regimen.mjs --excel=Pensiones_OCTUBRE_2026.xlsx --fuente=https://revista.seg-social.es/-/… [--subir]
//   Sin --subir escribe el CSV y una vista previa y no toca la web.
import { writeFileSync, mkdirSync, copyFileSync, mkdtempSync } from 'node:fs';
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
const SLUG = 'pension-media-regimen';
const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
const SUBIR = process.argv.includes('--subir');
const [EXCEL, FUENTE] = [arg('excel'), arg('fuente')];
if (!EXCEL || !/^https:\/\//.test(FUENTE || '')) {
  console.error('Uso: --excel=archivo.xlsx --fuente=https://… [--subir]');
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
const icon = (id) => `<svg class="jm-i" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const PALABRA = ['cero', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const hoy = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

// --- Lectura: dos bloques de columnas por régimen (filas 8-16: incapacidad, jubilación, viudedad; filas 24-32:
// orfandad, favor de familiares y total). Cada clase ocupa tres columnas: número, importe (miles) y pensión media.
const filas = [...hoja(EXCEL, 'Distrib - regím. Altas nuevas').entries()];
const fechaTxt = filas.map(([, f]) => Object.values(f).find((v) => typeof v === 'string' && /EN VIGOR A 1 DE/i.test(v))).find(Boolean);
const fm = norm(fechaTxt || '').match(/a 1 de ([a-z]+) de (\d{4})/);
if (!fm || !MESES.includes(fm[1])) throw new Error('No encuentro la fecha de los datos');
const [M, ANIO] = [MESES.indexOf(fm[1]), Number(fm[2])];
const mesTxt = `${MESES[M]} de ${ANIO}`;
const REG = [
  ['general', 'Régimen General', 'regimen-general'],
  ['trabajadores autonomos', 'Autónomos (RETA)', 'autonomos'],
  ['trabajadores del mar', 'Trabajadores del mar', 'mar'],
  ['mineria del carbon', 'Minería del carbón', 'mineria'],
  ['accidentes de trabajo', 'Accidentes de trabajo', 'accidentes'],
  ['enfermedades profesionales', 'Enfermedades profesionales', 'enfermedades'],
  ['s o v i', 'SOVI', 'sovi'],
  ['total sistema', 'Todo el sistema', 'total'],
];
const bloque = (desde, hasta, clases) => {
  const out = {};
  for (const [n, f] of filas) {
    if (n < desde || n > hasta || typeof f.B !== 'string') continue;
    const r = REG.find(([k]) => norm(f.B) === k);
    if (!r) continue;
    out[r[0]] = Object.fromEntries(clases.map(([clase, cNum, cMed]) => [clase, { num: f[cNum] ?? 0, media: f[cMed] ?? null }]));
  }
  return out;
};
const b1 = bloque(7, 17, [['ip', 'E', 'I'], ['jub', 'K', 'O'], ['viu', 'Q', 'U']]);
const b2 = bloque(23, 33, [['orf', 'E', 'I'], ['fam', 'K', 'O'], ['tot', 'Q', 'U']]);
const regs = REG.map(([k, label, slug]) => ({ k, label, slug, ...b1[k], ...b2[k] }));
if (regs.some((r) => !r.jub || !r.tot)) throw new Error('Falta algún régimen en la hoja');
const total = regs.at(-1), partes = regs.slice(0, -1);
for (const c of ['ip', 'jub', 'viu', 'orf', 'fam', 'tot']) {
  const suma = partes.reduce((s, r) => s + (r[c].num || 0), 0);
  if (suma !== total[c].num) throw new Error(`La suma de los regímenes (${suma}) no da el total en «${c}» (${total[c].num})`);
}
if (partes.some((r) => r.jub.media && !(r.jub.media > 300 && r.jub.media < 5000))) throw new Error('Hay una pensión media fuera de lo razonable');
// Nuevas altas del mes anterior (Régimen General y todo el sistema)
let altas = null, mesAltas = null;
for (const [, f] of filas) {
  if (typeof f.B === 'string' && /^[A-ZÁÉÍÓÚ]+ \d{4}$/.test(f.B.trim()) && !mesAltas) mesAltas = f.B.trim().toLowerCase().replace(/ (\d{4})$/, ' de $1');
  if (typeof f.B === 'string' && norm(f.B) === 'jubilacion' && typeof f.I === 'number') altas = { general: f.I, total: f.O };
}
if (!altas || !mesAltas) throw new Error('No encuentro las nuevas altas de jubilación');

const gen = regs[0], aut = regs[1];
const dif = gen.jub.media - aut.jub.media;
const cuota = aut.jub.num / total.jub.num;
const ordenJub = partes.filter((r) => r.jub.media).sort((a, b) => b.jub.media - a.jub.media);
const [alta, baja] = [ordenJub[0], ordenJub.at(-1)];
const maxJub = alta.jub.media;
const media = (c) => (c.media ? eur(c.media) : '—');
// «la del SOVI», «la de los autónomos»…: para las frases que salen de los datos
const DE = { general: 'del Régimen General', 'trabajadores autonomos': 'de los autónomos', 'trabajadores del mar': 'de los trabajadores del mar', 'mineria del carbon': 'de la minería del carbón', 'accidentes de trabajo': 'de los accidentes de trabajo', 'enfermedades profesionales': 'de las enfermedades profesionales', 's o v i': 'del SOVI' };

const barra = (r) => `<li class="${r.k === 'trabajadores autonomos' ? 'is-low' : ''}"><span class="jm-bars__name">${r.label}</span><span class="jm-bars__bar" style="width:${(r.jub.media / maxJub * 100).toFixed(1)}%"></span><span class="jm-bars__val">${eur(Math.round(r.jub.media), 0)}</span></li>`;
const csv = (r) => [r.jub.num, r.jub.media, r.viu.num, r.viu.media ?? '', r.ip.num, r.ip.media ?? '', r.orf.num, r.orf.media ?? '', r.fam.num, r.fam.media ?? '', r.tot.num, r.tot.media].join('|');
const fila = (r) => `<tr data-label="${r.label}" data-csv="${csv(r)}"${r.k === 'total sistema' ? ' style="font-weight:700"' : ''}><th scope="row">${r.label}</th><td class="n">${num(r.jub.num)}</td><td class="n">${media(r.jub)}</td><td class="n">${media(r.viu)}</td><td class="n">${media(r.ip)}</td><td class="n">${num(r.tot.num)}</td><td class="n">${media(r.tot)}</td></tr>`;

const html = `<!-- wp:html -->
<section class="jm-pagehead">
  <div class="jm-wrap"><div class="jm-pagehead__copy" style="max-width:54rem">
    <nav class="jm-crumbs" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><a href="/datos/">Datos</a></li><li><span aria-current="page">Pensión media por régimen</span></li></ol></nav>
    <h1>Pensión media por régimen de la Seguridad Social (${mesTxt})</h1>
    <p class="jm-lead">Cuánto cobran de media los jubilados del Régimen General, los autónomos, los trabajadores del mar, la minería del carbón y el SOVI, con la viudedad y la incapacidad permanente de cada régimen. Con los datos oficiales de la Seguridad Social.</p>
    <p class="jm-meta"><span>${icon('refresh')}Actualizado el ${hoy}</span><span>${icon('book')}Fuente: <a href="${FUENTE}" rel="noopener" target="_blank">Seguridad Social, nómina de ${mesTxt}</a></span><span>${icon('calendar')}Se actualiza cada mes</span></p>
  </div></div>
</section>
<section class="jm-section jm-section--tight" style="padding-top:0"><div class="jm-wrap jm-stack" style="gap:2.5rem">
  <section class="jm-keydata jm-keydata--4"><div class="jm-keydata__head"><h2>Resumen de ${mesTxt}</h2><span>Actualizado el <span data-jm-rev="long">${hoy}</span></span></div><div class="jm-keydata__grid"><div class="jm-keydata__item"><span class="jm-keydata__value">${eur(gen.jub.media)}</span><span class="jm-keydata__label">Jubilación en el Régimen General (${num(gen.jub.num)} pensiones)</span></div><div class="jm-keydata__item"><span class="jm-keydata__value">${eur(aut.jub.media)}</span><span class="jm-keydata__label">Jubilación de los autónomos (${num(aut.jub.num)} pensiones)</span></div><div class="jm-keydata__item"><span class="jm-keydata__value">${eur(dif)}</span><span class="jm-keydata__label">Diferencia al mes entre los dos regímenes</span></div><div class="jm-keydata__item"><span class="jm-keydata__value">${eur(altas.general)}</span><span class="jm-keydata__label">Nuevas jubilaciones del Régimen General (${mesAltas})</span></div></div></section>
  <div class="jm-stack"><h2 style="font-size:1.6rem">Pensión media de jubilación por régimen</h2><p class="jm-hint">Euros al mes, en 14 pagas, a 1 de ${mesTxt}.</p><ol class="jm-bars jm-bars--wrap">${ordenJub.map(barra).join('')}</ol></div>
  <div class="jm-stack" data-jm-csv-head="regimen|pensiones_jubilacion|jubilacion_media_eur|pensiones_viudedad|viudedad_media_eur|pensiones_incapacidad|incapacidad_media_eur|pensiones_orfandad|orfandad_media_eur|pensiones_favor_familiares|favor_familiares_media_eur|pensiones_total|total_media_eur"><h2>Todas las clases de pensión por régimen</h2>
    <div class="jm-table-card"><div class="jm-table-wrap"><table class="jm-table"><caption class="jm-sr">Número de pensiones y pensión media por régimen y clase de pensión, ${mesTxt}</caption>
      <thead><tr><th scope="col">Régimen</th><th scope="col" class="n">Pensiones de jubilación</th><th scope="col" class="n">Jubilación</th><th scope="col" class="n">Viudedad</th><th scope="col" class="n">Incapacidad permanente</th><th scope="col" class="n">Todas las pensiones</th><th scope="col" class="n">Media de todas</th></tr></thead>
      <tbody>${regs.map(fila).join('')}</tbody></table></div></div>
    <p class="jm-hint">Pensión media en euros al mes. Las pensiones que vienen de un accidente de trabajo o de una enfermedad profesional se cuentan aparte, en sus propias filas. El CSV incluye también orfandad y favor de familiares.</p>
  </div>
  <div class="jm-split">
    <div class="jm-stack" style="gap:1.5rem">
      <div class="jm-prose"><h2>Qué dicen los datos de ${MESES[M]}</h2>
        <p>A 1 de ${mesTxt}, un jubilado del Régimen General cobraba de media ${eur(gen.jub.media)} al mes, y uno del régimen de autónomos, ${eur(aut.jub.media)}: ${eur(dif)} menos al mes, ${eur(Math.round(dif * 14), 0)} menos al año en 14 pagas. Las ${num(aut.jub.num)} pensiones de jubilación de autónomos son ${PALABRA[Math.round(1 / cuota)] ? `una de cada ${PALABRA[Math.round(1 / cuota)]} pensiones de jubilación` : `el ${J.num(cuota * 100, 1)} % de las pensiones de jubilación`}.</p>
        <p>La diferencia se explica sobre todo por lo que se ha cotizado: durante décadas, la mayoría de los autónomos eligió la base mínima, y la pensión se calcula con las bases de cotización. Lo explicamos, con lo que puede hacer un autónomo para mejorar su pensión, en <a href="/jubilacion/autonomos/">la jubilación de los autónomos</a>.</p>
        <p>En viudedad también hay diferencia: ${eur(gen.viu.media)} de media en el Régimen General y ${eur(aut.viu.media)} en el de autónomos. La pensión media de jubilación más alta es la ${DE[alta.k]} (${eur(alta.jub.media)}), y la más baja, la ${DE[baja.k]} (${eur(baja.jub.media)})${baja.k === 's o v i' ? ', el seguro anterior a 1967 que sigue pagando pensiones a quienes cotizaron entonces y no tienen derecho a una del sistema actual (lo contamos en <a href="/jubilacion/pension-sovi/">la pensión del SOVI</a>)' : ''}.</p>
        <p>Las nuevas jubilaciones cobran más que la media: en ${mesAltas}, las del Régimen General empezaron con ${eur(altas.general)} de media, y las de todo el sistema, con ${eur(altas.total)}.</p>
      </div>
      <div class="jm-prose"><h2>Metodología</h2><p>Tomamos el número de pensiones y la pensión media por régimen y clase de pensión del archivo que acompaña a la nota mensual de pensiones de la Seguridad Social: pensiones contributivas en vigor el 1 de ${mesTxt}. Las que vienen de un accidente de trabajo o de una enfermedad profesional figuran aparte, sea cual sea el régimen del trabajador. Comprobamos que la suma de los regímenes da el total del sistema en cada clase de pensión.</p><p>La pensión media no te dice cuánto vas a cobrar tú: eso depende de tus bases de cotización y de tus años cotizados. Para una primera cifra, usa la <a href="/calculadoras/pension-jubilacion/">calculadora de pensión de jubilación</a>.</p></div>
      <div class="jm-table-wrap"><table class="jm-sources"><caption>Fuentes oficiales</caption><thead><tr><th scope="col">Fuente</th><th scope="col">Documento</th><th scope="col">Enlace</th></tr></thead><tbody><tr><td>Seguridad Social</td><td>Pensiones contributivas, ${mesTxt} (nota y archivo adjunto)</td><td><a href="${FUENTE}" rel="noopener" target="_blank">revista.seg-social.es${icon('external')}</a></td></tr><tr><td>Seguridad Social</td><td>Estadísticas interactivas de pensiones (eSTADISS)</td><td><a href="http://run.gob.es/estadiss" rel="noopener" target="_blank">eSTADISS${icon('external')}</a></td></tr></tbody></table></div>
    </div>
    <aside class="jm-stack" style="gap:1rem">
      <div class="jm-promo"><h3>Reutiliza estos datos</h3><p>Puedes descargarlos en <a href="/datos/${SLUG}.csv">CSV</a> y reutilizarlos citando a Jubilómetro y a la Seguridad Social como fuente original. La dirección del CSV no cambia y siempre lleva los datos del último mes.</p></div>
      <aside class="jm-calc-cta"><span class="jm-tile__icon">${icon('book')}</span><div><h3>Jubilación de los autónomos</h3><p>Requisitos, cuánto cobran y cómo mejorar la pensión.</p></div><a class="jm-btn jm-btn--ink" href="/jubilacion/autonomos/">Leer la guía${icon('arrow')}</a></aside>
    </aside>
  </div>
  <a class="jm-next" href="/datos/pension-media-provincia/"><span><span class="jm-next__label">${icon('arrow')}Más datos</span><span class="jm-next__title">Pensión media de jubilación por provincia</span></span><span class="jm-next__arrow">${icon('arrow')}</span></a>
</div></section>
<!-- /wp:html -->`;

const sufijo = `${ANIO}-${String(M + 1).padStart(2, '0')}`;
mkdirSync(join(RAIZ, 'publicacion/datos'), { recursive: true });
writeFileSync(join(RAIZ, `publicacion/datos/${SLUG}-${sufijo}.csv`), ['regimen,pensiones_jubilacion,jubilacion_media_eur,pensiones_viudedad,viudedad_media_eur,pensiones_incapacidad,incapacidad_media_eur,pensiones_orfandad,orfandad_media_eur,pensiones_favor_familiares,favor_familiares_media_eur,pensiones_total,total_media_eur',
  ...regs.map((r) => `"${r.label}",` + csv(r).split('|').join(','))].join('\n') + '\n');
console.log(`${mesTxt}: General ${eur(gen.jub.media)} · autónomos ${eur(aut.jub.media)} · diferencia ${eur(dif)} · más alta ${alta.label} · más baja ${baja.label} · nuevas altas (${mesAltas}) ${eur(altas.general)} / ${eur(altas.total)}`);
if (!SUBIR) {
  const previa = join(tmpdir(), `${SLUG}.html`);
  writeFileSync(previa, html);
  console.log('Vista previa en', previa, '(sin --subir no se cambia la web)');
  process.exit(0);
}
const [ex] = await api(`/wp/v2/pages?slug=${SLUG}&parent=22&status=publish,draft&_fields=id`);
const body = { title: 'Pensión media por régimen', slug: SLUG, parent: 22, status: 'publish', content: html, comment_status: 'closed', ping_status: 'closed',
  meta: { _kad_post_title: 'hide', _kad_post_layout: 'fullwidth', _kad_post_content_style: 'unboxed', _kad_post_vertical_padding: 'hide', _kad_post_feature: 'hide' } };
const p = await api('/wp/v2/pages' + (ex ? '/' + ex.id : ''), { method: 'POST', body: JSON.stringify(body) });
await api('/rankmath/v1/updateMeta', { method: 'POST', body: JSON.stringify({ objectType: 'post', objectID: p.id, meta: {
  rank_math_title: `Pensión media por régimen y de los autónomos (${MESES[M]} ${ANIO}) %sep% %sitename%`,
  rank_math_description: `Un jubilado del Régimen General cobra de media ${eur(gen.jub.media)} y uno autónomo, ${eur(aut.jub.media)}. Pensión media por régimen y clase, con datos oficiales de ${mesTxt}.`,
  rank_math_focus_keyword: 'pensión media autónomos' } }) });
writeFileSync(join(RAIZ, `publicacion/paginas-vivas/datos__${SLUG}.html`), `<!-- id ${p.id} · publish · ${p.link} -->\n${html}\n`);
console.log(ex ? 'Actualizada' : 'Creada', p.id, p.link);
