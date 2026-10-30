// Crea o actualiza /datos/evolucion-pension-media/ (hija de /datos/) con el Excel que acompaña a la nota
// mensual de pensiones de la Seguridad Social: hojas «P. Media €» (pensión media por clase), «Nº pens.
// por clases» (número de pensiones) y «Pensión media (nuevas altas)». Datos a diciembre de cada año desde
// 2010 y el último mes del Excel. Guarda el CSV en publicacion/datos/ y la copia en paginas-vivas/.
// Uso (desde la raíz del proyecto):
//   node herramientas/datos/evolucion-pension-media.mjs --excel=Pensiones_OCTUBRE_2026.xlsx \
//     --fuente=https://revista.seg-social.es/-/… [--subir]
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
const pc = (n) => (n > 0 ? '+' : '') + J.num(n, 1) + ' %';
const icon = (id) => `<svg class="jm-i" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const CORTOS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const hoy = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

// Series por clase (columnas D a I: incapacidad, jubilación, viudedad, orfandad, favor de familiares, total).
// Las filas llevan el año solo en la primera fila de cada año: se arrastra hacia abajo.
function serie(nombre) {
  const filas = [];
  let anio = null;
  for (const f of hoja(EXCEL, nombre).values()) {
    if (typeof f.B === 'number') anio = f.B;
    if (typeof f.B === 'string' && /variaci/i.test(f.B + (f.D || ''))) break;
    if (typeof f.D === 'string' && /variaci/i.test(f.D)) break;
    if (!anio || !CORTOS.includes(f.C) || typeof f.E !== 'number') continue;
    filas.push({ anio, mes: CORTOS.indexOf(f.C), ip: f.D, jub: f.E, viu: f.F, orf: f.G, fam: f.H, total: f.I });
  }
  return filas;
}
const medias = serie('P. Media €');
const numeros = serie('Nº pens. por clases');
const ultima = medias.at(-1);
const mesUlt = `${MESES[ultima.mes]} de ${ultima.anio}`;
const numUlt = numeros.find((n) => n.anio === ultima.anio && n.mes === ultima.mes);
const anuales = medias.filter((m) => m.mes === 11).map((m) => ({ ...m, n: numeros.find((n) => n.anio === m.anio && n.mes === 11) }));
const ini = anuales[0];
if (!numUlt || anuales.length < 10 || ini.anio !== 2010) throw new Error('El Excel no tiene la forma esperada (series anuales desde 2010)');

// Nuevas altas de jubilación del total del sistema (columna F): media anual y el último mes
const altas = [];
for (const f of hoja(EXCEL, 'Pensión media (nuevas altas)').values()) {
  if (typeof f.F !== 'number') continue;
  if (typeof f.B === 'number' && f.F > 500) altas.push({ etiqueta: String(f.B), anio: f.B, valor: f.F });
  else if (typeof f.B === 'string' && /^[A-Za-zé]+ \d{4}$/.test(f.B.trim())) altas.push({ etiqueta: f.B.trim().toLowerCase().replace(/ (\d{4})$/, ' de $1'), anio: Number(f.B.slice(-4)), valor: f.F });
  if (typeof f.B === 'string' && /variaci/i.test(f.B)) break;
}
const altaUlt = altas.at(-1);
if (!altaUlt || altas.length < 10) throw new Error('No encuentro la serie de nuevas altas de jubilación');

const subida = (a, b) => (b / a - 1) * 100;
const crecJub = subida(ini.jub, ultima.jub);
const mayor = anuales.slice(1).map((m, i) => ({ anio: m.anio, v: subida(anuales[i].jub, m.jub) })).sort((a, b) => b.v - a.v)[0];
const max = Math.max(...anuales.map((m) => m.jub), ultima.jub);
const filasBarras = [...anuales.map((m) => ({ etiqueta: String(m.anio), v: m.jub })), { etiqueta: `${CORTOS[ultima.mes].toLowerCase()}. ${ultima.anio}`, v: ultima.jub }];
const barra = (b) => `<li class=""><span class="jm-bars__name">${b.etiqueta}</span><span class="jm-bars__bar" style="width:${(b.v / max * 100).toFixed(1)}%"></span><span class="jm-bars__val">${eur(Math.round(b.v), 0)}</span></li>`;
const filaTabla = (m, n, etiqueta) => `<tr><th scope="row">${etiqueta}</th><td class="n">${eur(m.jub)}</td><td class="n">${eur(m.viu)}</td><td class="n">${eur(m.ip)}</td><td class="n">${eur(m.total)}</td><td class="n">${num(n.jub)}</td></tr>`;
const filasAltas = altas.filter((a) => a.anio >= 2010).map((a) => {
  const stock = a.etiqueta.includes(' ') ? ultima : anuales.find((m) => m.anio === a.anio);
  return `<tr><th scope="row">${a.etiqueta.includes(' ') ? a.etiqueta.replace(/^\w/, (c) => c.toUpperCase()) : a.etiqueta}</th><td class="n">${eur(a.valor)}</td><td class="n">${stock ? eur(stock.jub) : '—'}</td><td class="n">${stock ? '+' + eur(a.valor - stock.jub) : '—'}</td></tr>`;
}).join('');

const html = `<!-- wp:html -->
<section class="jm-pagehead">
  <div class="jm-wrap"><div class="jm-pagehead__copy" style="max-width:54rem">
    <nav class="jm-crumbs" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><a href="/datos/">Datos</a></li><li><span aria-current="page">Evolución de la pensión media</span></li></ol></nav>
    <h1>Evolución de la pensión media en España desde 2010 (${mesUlt})</h1>
    <p class="jm-lead">Cuánto ha cambiado la pensión media de jubilación, viudedad e incapacidad permanente año a año desde 2010, y por qué las nuevas jubilaciones cobran más que la media. Con los datos oficiales de la Seguridad Social.</p>
    <p class="jm-meta"><span>${icon('refresh')}Actualizado el ${hoy}</span><span>${icon('book')}Fuente: <a href="${FUENTE}" rel="noopener" target="_blank">Seguridad Social, nómina de ${mesUlt}</a></span><span>${icon('calendar')}Se actualiza cada mes</span></p>
  </div></div>
</section>
<section class="jm-section jm-section--tight" style="padding-top:0"><div class="jm-wrap jm-stack" style="gap:2.5rem">
  <section class="jm-keydata jm-keydata--4"><div class="jm-keydata__head"><h2>Resumen de ${mesUlt}</h2><span>Actualizado el <span data-jm-rev="long">${hoy}</span></span></div><div class="jm-keydata__grid"><div class="jm-keydata__item"><span class="jm-keydata__value">${eur(ultima.jub)}</span><span class="jm-keydata__label">Pensión media de jubilación (${num(numUlt.jub)} pensiones)</span></div><div class="jm-keydata__item"><span class="jm-keydata__value">${pc(crecJub)}</span><span class="jm-keydata__label">Desde diciembre de 2010 (${eur(ini.jub)})</span></div><div class="jm-keydata__item"><span class="jm-keydata__value">${eur(altaUlt.valor)}</span><span class="jm-keydata__label">Media de las nuevas jubilaciones (${altaUlt.etiqueta})</span></div><div class="jm-keydata__item"><span class="jm-keydata__value">${eur(ultima.total)}</span><span class="jm-keydata__label">Pensión media de todo el sistema (${num(numUlt.total)} pensiones)</span></div></div></section>
  <div class="jm-stack"><h2 style="font-size:1.6rem">Pensión media de jubilación, año a año</h2><p class="jm-hint">A diciembre de cada año y el último mes publicado. Euros al mes, en 14 pagas.</p><ol class="jm-bars">${filasBarras.map(barra).join('')}</ol></div>
  <div class="jm-stack"><h2>Todas las clases de pensión</h2>
    <div class="jm-table-card"><div class="jm-table-wrap"><table class="jm-table"><caption class="jm-sr">Pensión media por clase de pensión y número de pensiones de jubilación, a diciembre de cada año desde 2010</caption>
      <thead><tr><th scope="col">Año</th><th scope="col" class="n">Jubilación</th><th scope="col" class="n">Viudedad</th><th scope="col" class="n">Incapacidad permanente</th><th scope="col" class="n">Todo el sistema</th><th scope="col" class="n">Pensiones de jubilación</th></tr></thead>
      <tbody>${anuales.map((m) => filaTabla(m, m.n, String(m.anio))).join('')}${filaTabla(ultima, numUlt, mesUlt.replace(/^\w/, (c) => c.toUpperCase()))}</tbody></table></div></div>
    <p class="jm-hint">Datos a diciembre de cada año (pensiones en vigor el día 1) y, en la última fila, a ${mesUlt}. La media de todo el sistema incluye también orfandad y favor de familiares.</p>
  </div>
  <div class="jm-split">
    <div class="jm-stack" style="gap:1.5rem">
      <div class="jm-prose"><h2>Qué dicen los datos</h2>
        <p>La pensión media de jubilación ha pasado de ${eur(ini.jub)} en diciembre de 2010 a ${eur(ultima.jub)} en ${mesUlt}: ${pc(crecJub)}. La de viudedad ha subido un ${J.num(subida(ini.viu, ultima.viu), 1)} %, y la de incapacidad permanente, un ${J.num(subida(ini.ip, ultima.ip), 1)} %. El número de pensiones de jubilación ha crecido de ${num(ini.n.jub)} a ${num(numUlt.jub)}.</p>
        <p>El año de mayor subida fue ${mayor.anio} (${pc(mayor.v)}). En 2023 las pensiones se revalorizaron un 8,5 % por la inflación, y la media subió algo más.</p>
        <h2>Por qué la media sube más que la revalorización</h2>
        <p>Cada enero todas las pensiones suben lo que fija la ley (lo explicamos en <a href="/cuanto-cobrare/revalorizacion-pensiones/">la revalorización de las pensiones</a>). Pero la media sube un poco más por el llamado <strong>efecto sustitución</strong>: quienes se jubilan ahora tienen carreras más largas y sueldos más altos que quienes fallecen, así que cobran más. En ${altaUlt.etiqueta}, las nuevas jubilaciones cobraban de media ${eur(altaUlt.valor)}, ${eur(altaUlt.valor - ultima.jub)} más que la media de todas las pensiones de jubilación.</p>
      </div>
      <div class="jm-stack"><h2 style="font-size:1.5rem">Nuevas jubilaciones frente a la media</h2>
        <div class="jm-table-card"><div class="jm-table-wrap"><table class="jm-table"><caption class="jm-sr">Pensión media de las nuevas altas de jubilación de cada año frente a la pensión media de todas las jubilaciones</caption>
          <thead><tr><th scope="col">Año</th><th scope="col" class="n">Nuevas jubilaciones</th><th scope="col" class="n">Media de todas</th><th scope="col" class="n">Diferencia</th></tr></thead>
          <tbody>${filasAltas}</tbody></table></div></div>
        <p class="jm-hint">Nuevas jubilaciones: pensión media de las altas de cada año en todo el sistema. Media de todas: a diciembre de ese año (o a ${mesUlt} en la última fila).</p>
      </div>
      <div class="jm-prose"><h2>Metodología</h2><p>Tomamos las series del archivo que acompaña cada mes a la nota de pensiones de la Seguridad Social: pensión media por clase de pensión, número de pensiones y pensión media de las nuevas altas. Son pensiones contributivas del sistema de la Seguridad Social en vigor el día 1 de cada mes; no incluyen Clases Pasivas ni pensiones no contributivas. Las cifras no descuentan la inflación.</p><p>La pensión media no te dice cuánto vas a cobrar tú: eso depende de tu base reguladora y de tus años cotizados. Para una primera cifra, usa la <a href="/calculadoras/pension-jubilacion/">calculadora de pensión de jubilación</a>.</p></div>
      <div class="jm-table-wrap"><table class="jm-sources"><caption>Fuentes oficiales</caption><thead><tr><th scope="col">Fuente</th><th scope="col">Documento</th><th scope="col">Enlace</th></tr></thead><tbody><tr><td>Seguridad Social</td><td>Pensiones contributivas, ${mesUlt} (nota y archivo adjunto)</td><td><a href="${FUENTE}" rel="noopener" target="_blank">revista.seg-social.es${icon('external')}</a></td></tr><tr><td>Seguridad Social</td><td>Estadísticas interactivas de pensiones (eSTADISS)</td><td><a href="http://run.gob.es/estadiss" rel="noopener" target="_blank">eSTADISS${icon('external')}</a></td></tr></tbody></table></div>
    </div>
    <aside class="jm-stack" style="gap:1rem">
      <div class="jm-promo"><h3>Reutiliza estos datos</h3><p>Puedes copiar las tablas y reutilizarlas citando a Jubilómetro y a la Seguridad Social como fuente original.</p></div>
      <aside class="jm-calc-cta"><span class="jm-tile__icon">${icon('calculator')}</span><div><h3>Pensión de jubilación</h3><p>¿Y la tuya? Estima tu pensión con el sistema dual.</p></div><a class="jm-btn jm-btn--ink" href="/calculadoras/pension-jubilacion/">Calcular${icon('arrow')}</a></aside>
    </aside>
  </div>
  <a class="jm-next" href="/datos/pension-media-provincia/"><span><span class="jm-next__label">${icon('arrow')}Más datos</span><span class="jm-next__title">Pensión media de jubilación por provincia</span></span><span class="jm-next__arrow">${icon('arrow')}</span></a>
</div></section>
<!-- /wp:html -->`;

const csv = ['anio,mes,jubilacion_media_eur,viudedad_media_eur,incapacidad_media_eur,sistema_media_eur,pensiones_jubilacion', ...anuales.map((m) => [m.anio, 12, m.jub, m.viu, m.ip, m.total, m.n.jub].join(',')), [ultima.anio, ultima.mes + 1, ultima.jub, ultima.viu, ultima.ip, ultima.total, numUlt.jub].join(',')].join('\n') + '\n';
mkdirSync(join(RAIZ, 'publicacion/datos'), { recursive: true });
writeFileSync(join(RAIZ, `publicacion/datos/evolucion-pension-media-${ultima.anio}-${String(ultima.mes + 1).padStart(2, '0')}.csv`), csv);
console.log(`${mesUlt}: jubilación ${eur(ultima.jub)} (${pc(crecJub)} desde 2010) · nuevas altas ${eur(altaUlt.valor)} · mayor subida ${mayor.anio} ${pc(mayor.v)}`);
if (!SUBIR) {
  const previa = join(tmpdir(), 'evolucion-pension-media.html');
  writeFileSync(previa, html);
  console.log('Vista previa en', previa, '(sin --subir no se cambia la web)');
  process.exit(0);
}

const [ex] = await api('/wp/v2/pages?slug=evolucion-pension-media&parent=22&status=publish,draft&_fields=id');
const body = { title: 'Evolución de la pensión media', slug: 'evolucion-pension-media', parent: 22, status: 'publish', content: html, comment_status: 'closed', ping_status: 'closed',
  meta: { _kad_post_title: 'hide', _kad_post_layout: 'fullwidth', _kad_post_content_style: 'unboxed', _kad_post_vertical_padding: 'hide', _kad_post_feature: 'hide' } };
const p = ex ? await api('/wp/v2/pages/' + ex.id, { method: 'POST', body: JSON.stringify(body) }) : await api('/wp/v2/pages', { method: 'POST', body: JSON.stringify(body) });
await api('/rankmath/v1/updateMeta', { method: 'POST', body: JSON.stringify({ objectType: 'post', objectID: p.id, meta: {
  rank_math_title: 'Evolución de la pensión media en España (2010-' + ultima.anio + ') %sep% %sitename%',
  rank_math_description: `Pensión media de jubilación, viudedad e incapacidad desde 2010 hasta ${mesUlt}, con datos oficiales de la Seguridad Social y las nuevas jubilaciones.`,
  rank_math_focus_keyword: 'evolución pensión media' } }) });
writeFileSync(join(RAIZ, 'publicacion/paginas-vivas/datos__evolucion-pension-media.html'), `<!-- id ${p.id} · publish · ${p.link} -->\n${html}\n`);
console.log(ex ? 'Actualizada' : 'Creada', p.id, p.link);
