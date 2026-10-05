// Crea o actualiza /calculadoras/subida-pensiones/ y la añade al índice de calculadoras.
// Las cifras salen de CFG.subida en tema/jubilometro/assets/js/calculadoras.js y del IPC de abajo:
// cada vez que el INE publica un dato nuevo, actualiza los dos y vuelve a ejecutarlo.
// Uso (desde la raíz del proyecto):
//   node herramientas/calculadoras/subida-pensiones.mjs publicacion/paginas-vivas/calculadoras__subida-pensiones.html publicacion/paginas-vivas/calculadoras.html [--prueba]
import { writeFileSync, copyFileSync, mkdtempSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const require = createRequire(import.meta.url);
// El motor del tema es un script clásico (module.exports): se copia como .cjs para cargarlo.
const copia = join(mkdtempSync(join(tmpdir(), 'jm-')), 'calc.cjs');
copyFileSync(new URL('../../tema/jubilometro/assets/js/calculadoras.js', import.meta.url), copia);
const J = require(copia);
const WEB = 'https://jubilometro.com';
const PRUEBA = process.argv.includes('--prueba');
const A = 'Basic ' + Buffer.from(process.env.WP_USER + ':' + process.env.WP_APP_PASSWORD).toString('base64');
const api = async (path, opt = {}) => {
  for (let i = 1; ; i++) {
    try {
      const r = await fetch(WEB + '/wp-json' + path, { ...opt, headers: { Authorization: A, 'Content-Type': 'application/json', ...(opt.headers || {}) } });
      const t = await r.text(); if (!r.ok) throw new Error(r.status + ' ' + path + ' ' + t.slice(0, 300)); return JSON.parse(t);
    } catch (e) { if (i === 4 || /^4\d\d /.test(e.message)) throw e; await new Promise((ok) => setTimeout(ok, 2000 * i)); }
  }
};
const icon = (id) => `<svg class="jm-i" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const S = J.CFG.subida;
const eur = (n) => J.eur(n);
const pc = (n) => J.num(n, 1) + ' %';
const hoy = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

// Ejemplo de la calculadora: el mismo HTML que pinta el script, para que no cambie al cargar
const EJ = { bruta: '1200', tipo: 'contributiva', pagas: '14', pct: String(S.pct) };
const resultado = J.render.subida(EJ, true);

const tabla = (caption, cabecera, filas, numCols = []) => `<div class="jm-table-card"><div class="jm-table-wrap"><table class="jm-table"><caption class="jm-sr">${caption}</caption><thead><tr>${cabecera.map((c, k) => `<th scope="col"${numCols.includes(k) ? ' class="n"' : ''}>${c}</th>`).join('')}</tr></thead><tbody>${filas.map((f) => `<tr${f.hl ? ' class="is-hl"' : ''}>${f.map((c, k) => `<td${numCols.includes(k) ? ' class="n"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;

const IPC = [['Diciembre de 2025', 2.9], ['Enero de 2026', 2.3], ['Febrero de 2026', 2.3], ['Marzo de 2026', 3.4], ['Abril de 2026', 3.2], ['Mayo de 2026', 3.2], ['Junio de 2026', 3.2], ['Julio de 2026', 3.6], ['Agosto de 2026', 4.3], ['Septiembre de 2026 (dato adelantado)', 4.9]];
const suma = IPC.reduce((a, x) => a + x[1], 0);
const media = suma / IPC.length;
const escenario = (x) => Math.round(((suma + 2 * x) / 12) * 10) / 10;
const ESC = [3.0, 3.5, 4.0, 4.5, 4.9, 5.5].map((x) => [x === 4.9 ? '4,9 % (como en septiembre)' : pc(x), pc(escenario(x))]);
if (escenario(4.9) !== S.pct) throw new Error('La estimación de CFG no cuadra con el IPC: ' + escenario(4.9));
const PENS = [800, 1000, 1200, 1500, 2000, 2500, 3000];
const r2 = (x) => Math.round(x * 100) / 100;
const filasEj = PENS.map((p) => { const f = [eur(p), eur(r2(p * (1 + S.min / 100))), eur(r2(p * (1 + S.pct / 100))), eur(r2(p * (1 + S.max / 100)))]; if (p === 1200) f.hl = true; return f; });

const faq = [
  ['¿Cuánto subirán las pensiones en 2027?', `Lo que marque la inflación media de diciembre de 2025 a noviembre de 2026, redondeada a un decimal. Con los datos del INE hasta septiembre, la subida apunta a entre el ${pc(S.min)} y el ${pc(S.max)}; si octubre y noviembre se quedan como septiembre, sería del ${pc(S.pct)}.`],
  ['¿Cuándo se sabrá la subida exacta?', 'A finales de noviembre de 2026, cuando el INE publique el dato adelantado del IPC de noviembre. El Gobierno la aprueba a finales de diciembre y la actualizaremos aquí ese mismo día.'],
  ['¿Cuándo cobraré la pensión con la subida?', 'Con la pensión de enero de 2027, que muchos bancos adelantan a los últimos días de enero. La subida tiene efectos desde el 1 de enero y no hay que pedirla.'],
  ['¿La subida es sobre la pensión bruta o la neta?', 'Sobre la bruta. Lo que llega al banco puede subir algo menos, porque la retención de IRPF se recalcula en enero con la pensión nueva. Puedes verlo con la <a href="/calculadoras/pension-neta-irpf/">calculadora de pensión neta</a>.'],
  ['¿Suben igual las pensiones mínimas y las no contributivas?', 'No: suben más. Además del porcentaje general, la ley obliga en 2027 a que la pensión mínima con cónyuge a cargo alcance el umbral de la pobreza de un hogar de dos adultos, y las no contributivas se acercan al 75 % del umbral de una persona. En 2026 subieron un 11,4 %.'],
  ['¿Habrá paga compensatoria por la subida de 2027?', 'No. Desde 2022 la subida se calcula con la inflación ya conocida de los doce meses anteriores, así que no queda ninguna desviación que compensar después.'],
];
const faqHtml = `<div class="jm-faq">${faq.map(([q, a]) => `<details><summary>${q}${icon('plus')}</summary><div><p>${a}</p></div></details>`).join('')}</div>`;

const fuentes = [
  ['BOE', 'Ley General de la Seguridad Social: arts. 58 y 62 y disposición adicional 53.ª', 'https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724', 'BOE-A-2015-11724'],
  ['BOE', 'Real Decreto 241/2026, revalorización de las pensiones en 2026', 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-6977', 'BOE-A-2026-6977'],
  ['INE', 'Índice de Precios de Consumo: últimos datos', 'https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736176802&menu=ultiDatos&idp=1254735976607', 'ine.es'],
];

const html = `<!-- wp:html -->
<section class="jm-pagehead">
  <div class="jm-wrap"><div class="jm-pagehead__copy">
    <nav class="jm-crumbs" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><a href="/calculadoras/">Calculadoras</a></li><li><span aria-current="page">Subida de las pensiones ${S.anio}</span></li></ol></nav>
    <h1>Calculadora de la subida de las pensiones en ${S.anio}: cuánto cobrarás en enero</h1>
    <p class="jm-lead">Escribe lo que cobras ahora y te decimos cuánto cobrarás en ${S.anio}, al mes y al año, con la subida que marca la ley. Actualizamos la estimación cada mes con el IPC oficial.</p>
    <p class="jm-meta"><span>${icon('refresh')}Actualizada el ${hoy}</span><span>${icon('scale')}Art. 58 de la Ley General de la Seguridad Social</span><span>${icon('shield')}Revisada por <a href="/sobre-nosotros/#equipo">Pau Lobato</a></span></p>
  </div></div>
</section>
<section aria-label="Calculadora">
  <div class="jm-wrap">
    <div class="jm-tool">
      <form class="jm-tool__form" data-jm-calc="subida" data-jm-scroll novalidate>
        <h2>Tus datos</h2><div class="jm-tool__steps">
      <div class="jm-field"><label for="csub-bruta">Tu pensión bruta al mes en ${S.anio - 1}</label><span class="jm-hint" id="csub-bruta-h">Antes de impuestos, como aparece en la carta de revalorización o en el certificado de pensión. Si cobras complemento a mínimos, pon el total.</span><div class="jm-input-group"><input class="jm-input" id="csub-bruta" name="bruta" type="number" inputmode="decimal" value="1200" min="0" max="10000" step="0.01" required aria-describedby="csub-bruta-h"><span class="jm-unit">€/mes</span></div></div>
      <div class="jm-field"><label for="csub-tipo">Tipo de pensión</label><select class="jm-select" id="csub-tipo" name="tipo"><option value="contributiva" selected>Contributiva: jubilación, viudedad, incapacidad, orfandad o Clases Pasivas</option><option value="minimos">Contributiva con complemento a mínimos</option><option value="pnc">No contributiva (PNC)</option></select></div>
      <fieldset class="jm-fieldset"><legend>Número de pagas</legend><div class="jm-seg"><label><input type="radio" name="pagas" value="14" checked>14 pagas</label><label><input type="radio" name="pagas" value="12">12 pagas</label></div></fieldset>
      <div class="jm-field"><label for="csub-pct">Subida que quieres aplicar</label><span class="jm-hint" id="csub-pct-h">Estimación con el IPC hasta septiembre: entre el ${pc(S.min)} y el ${pc(S.max)}. Cuando se apruebe la cifra oficial, la pondremos aquí.</span><div class="jm-input-group"><input class="jm-input" id="csub-pct" name="pct" type="number" inputmode="decimal" value="${S.pct}" min="0" max="15" step="0.1" required aria-describedby="csub-pct-h"><span class="jm-unit">%</span></div></div>
    </div>
        <div class="jm-tool__actions"><button class="jm-btn" type="submit">${icon('calculator')}Calcular</button><span class="jm-hint">Tus datos no salen de tu navegador.</span></div>
      </form>
      <div class="jm-result" data-jm-result="subida" aria-live="polite">${resultado}</div>
    </div>
  </div>
</section>
<section class="jm-section--tight jm-section">
  <div class="jm-wrap jm-split">
    <div class="jm-stack" style="gap:1.5rem">
      <section class="jm-answer" aria-labelledby="respuesta-rapida"><h2 class="jm-answer__title" id="respuesta-rapida">${icon('check')}Respuesta rápida</h2><p>En enero de ${S.anio} las pensiones contributivas subirán la <strong>inflación media de diciembre de 2025 a noviembre de 2026</strong>. Con los datos del INE hasta septiembre, la subida apunta a <strong>entre el ${pc(S.min)} y el ${pc(S.max)}</strong>; si la inflación de octubre y noviembre se queda como la de septiembre, sería del <strong>${pc(S.pct)}</strong>. Así, una pensión de 1.200 euros pasaría a unos ${eur(r2(1200 * (1 + S.pct / 100)))} al mes. La cifra exacta se sabrá a finales de noviembre.</p></section>
      <div class="jm-prose">
        <h2>Cómo calculamos tu subida</h2>
        <p>Multiplicamos tu pensión bruta por el porcentaje de subida y redondeamos al céntimo, como hace la Seguridad Social. La subida al año es la mensual por tus pagas: con 14 pagas, las de junio y noviembre también suben.</p>
        <p>El porcentaje sale de la regla del <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a58" rel="noopener" target="_blank">artículo 58 de la Ley General de la Seguridad Social</a>: cada 1 de enero, las pensiones contributivas suben el <strong>valor medio de la inflación interanual</strong> de los doce meses que van de diciembre a noviembre, redondeado a un decimal. En 2026 la media fue del 2,67 % y las pensiones subieron un 2,7 %.</p>
        <h2>Cuánto subirán las pensiones en ${S.anio}</h2>
        <p>Estos son los datos del IPC que cuentan para la subida de ${S.anio}. Faltan octubre y noviembre:</p>
      </div>
      ${tabla(`Inflación interanual (IPC general) que cuenta para la subida de ${S.anio}`, ['Mes', 'IPC interanual'], [...IPC.map((x) => [x[0], pc(x[1])]), ['Octubre y noviembre de 2026', 'Pendientes'], Object.assign([`<strong>Media de los ${IPC.length} meses conocidos</strong>`, `<strong>${J.num(media, 2)} %</strong>`], { hl: true })], [1])}
      <div class="jm-prose"><p>Según cómo se comporte la inflación de los dos meses que faltan, la subida quedaría así:</p></div>
      ${tabla(`Subida de las pensiones en ${S.anio} según la inflación de octubre y noviembre de 2026`, ['Si la inflación media de octubre y noviembre es del…', `La subida de ${S.anio} sería del…`], ESC.map((f) => Object.assign(f, { hl: f[0].startsWith('4,9') })), [1])}
      <div class="jm-prose">
        <h2>Ejemplos: tu pensión de ${S.anio - 1} y la de ${S.anio}</h2>
        <p>Pensión bruta al mes, en 14 pagas, con la horquilla de subida que dan los datos de hoy:</p>
      </div>
      ${tabla(`Pensión al mes en ${S.anio} según la subida final`, [`Tu pensión en ${S.anio - 1}`, `Con un ${pc(S.min)}`, `Con un ${pc(S.pct)}`, `Con un ${pc(S.max)}`], filasEj, [1, 2, 3])}
      <aside class="jm-ad" aria-label="Publicidad"><span class="jm-ad__label">Publicidad</span><div class="jm-ad__slot">Espacio reservado para anuncio manual de AdSense<br>Colocado tras la explicación, lejos de los botones de la calculadora</div></aside>
      <div class="jm-prose">
        <h2>Qué pensiones suben y cuánto</h2>
        <ul>
          <li><strong>Contributivas</strong> (jubilación, incapacidad permanente, viudedad, orfandad y a favor de familiares) y las de <strong>Clases Pasivas</strong> de los funcionarios: el porcentaje general.</li>
          <li><strong>Pensiones en la máxima</strong>: también suben el porcentaje general. La pensión máxima para las pensiones nuevas sube además 0,115 puntos; en ${S.anio - 1} es de ${eur(J.CFG.pensionMax)} al mes.</li>
          <li><strong>Pensiones mínimas</strong>: el porcentaje general y un extra. En ${S.anio} la mínima de jubilación con cónyuge a cargo no podrá ser inferior al umbral de la pobreza de un hogar de dos adultos, y el resto de mínimas suben la mitad de ese extra. Te lo contamos en <a href="/cuanto-cobrare/pension-minima/">la pensión mínima</a> y en <a href="/cuanto-cobrare/complemento-a-minimos/">el complemento a mínimos</a>.</li>
          <li><strong>No contributivas</strong>: al menos el porcentaje general y un extra para acercarlas al 75 % del umbral de la pobreza. En ${S.anio - 1} son de ${eur(S.pnc)} al mes (más en la <a href="/ayudas/pension-no-contributiva/">guía de la pensión no contributiva</a>).</li>
          <li><strong>Complemento por brecha de género</strong>: el mismo porcentaje general (en ${S.anio - 1}, 36,90 euros al mes por hijo).</li>
        </ul>
        <h2>Cuándo se cobra la subida</h2>
        <ol>
          <li><strong>Finales de noviembre de 2026</strong>: el INE publica el IPC adelantado de noviembre y ya se conoce la media de los doce meses.</li>
          <li><strong>Finales de diciembre</strong>: el Gobierno aprueba la subida y las cuantías mínimas.</li>
          <li><strong>1 de enero de ${S.anio}</strong>: la subida tiene efectos desde ese día, sin pedir nada.</li>
          <li><strong>Pensión de enero</strong>: la primera con el importe nuevo. Mira qué día llega en el <a href="/cuanto-cobrare/calendario-pago-pensiones/">calendario de pago de las pensiones</a>.</li>
        </ol>
        <p>Todos los detalles, con la historia de las subidas desde 2022, están en la guía de la <a href="/cuanto-cobrare/revalorizacion-pensiones/">revalorización de las pensiones en ${S.anio}</a>.</p>
        <h2>Preguntas frecuentes</h2>
      </div>
      ${faqHtml}
      <div class="jm-table-wrap"><table class="jm-sources"><caption>Fuentes oficiales</caption><thead><tr><th scope="col">Fuente</th><th scope="col">Documento</th><th scope="col">Enlace</th></tr></thead><tbody>${fuentes.map(([o, d, u, t]) => `<tr><td>${o}</td><td>${d}</td><td><a href="${u.replace(/&/g, '&amp;')}" rel="noopener" target="_blank">${t}${icon('external')}</a></td></tr>`).join('')}</tbody></table></div>
      <a class="jm-next" href="/cuanto-cobrare/revalorizacion-pensiones/"><span><span class="jm-next__label">${icon('arrow')}Siguiente paso</span><span class="jm-next__title">Guía: la revalorización de las pensiones en ${S.anio}</span></span><span class="jm-next__arrow">${icon('arrow')}</span></a>
    </div>
    <aside class="jm-stack" style="gap:1rem" aria-label="Otras calculadoras">
      <h2 style="font-size:1.5rem">Otras calculadoras</h2>
      <div class="jm-toolist"><a href="/calculadoras/pension-neta-irpf/"><span class="jm-tile__icon">${icon('receipt')}</span><span><strong>Pensión neta (IRPF)</strong><small>Lo que te queda tras el IRPF</small></span>${icon('arrow')}</a><a href="/calculadoras/pension-jubilacion/"><span class="jm-tile__icon">${icon('calculator')}</span><span><strong>Pensión de jubilación</strong><small>Arts. 209-210 y DT 40ª LGSS</small></span>${icon('arrow')}</a><a href="/calculadoras/pension-viudedad/"><span class="jm-tile__icon">${icon('heart')}</span><span><strong>Pensión de viudedad</strong><small>Art. 219 LGSS</small></span>${icon('arrow')}</a></div>
      <div class="jm-promo"><h3>¿Cuándo llega al banco?</h3><p>La pensión de enero, la primera con la subida, se cobra a finales de enero o, como tarde, el primer día hábil de febrero.</p><a class="jm-link-arrow" href="/cuanto-cobrare/calendario-pago-pensiones/">Calendario de pago${icon('arrow')}</a></div>
    </aside>
  </div>
</section>
<!-- /wp:html -->`;

const tile = `<a href="/calculadoras/subida-pensiones/"><span class="jm-tile__icon">${icon('trending')}</span><span><strong>Subida de las pensiones ${S.anio}</strong><small>Cuánto cobrarás en ${S.anio}: al mes, al año y según la inflación que falta por conocer.</small></span>${icon('arrow')}</a>`;

if (PRUEBA) { writeFileSync(process.argv[2], html); console.log('Prueba escrita', html.length, 'caracteres'); process.exit(0); }

const ex = await api('/wp/v2/pages?slug=subida-pensiones&parent=13&status=publish,draft&_fields=id');
const body = { title: `Calculadora de la subida de las pensiones ${S.anio}`, slug: 'subida-pensiones', parent: 13, status: 'publish', content: html, comment_status: 'closed', ping_status: 'closed' };
const p = ex.length ? await api('/wp/v2/pages/' + ex[0].id, { method: 'POST', body: JSON.stringify(body) }) : await api('/wp/v2/pages', { method: 'POST', body: JSON.stringify(body) });
console.log(ex.length ? 'Actualizada' : 'Creada', p.id, p.link);
await api('/rankmath/v1/updateMeta', { method: 'POST', body: JSON.stringify({ objectType: 'post', objectID: p.id, meta: {
  rank_math_title: `Calculadora subida pensiones ${S.anio}: cuánto cobrarás`,
  rank_math_description: `Calcula cuánto subirá tu pensión en ${S.anio}: al mes, al año y con 14 pagas. Estimación con el IPC oficial, actualizada cada mes hasta la cifra definitiva.`,
  rank_math_focus_keyword: `calculadora subida pensiones ${S.anio}` } }) });
console.log('Rank Math OK');
writeFileSync(process.argv[2], `<!-- id ${p.id} · publish · ${p.link} -->\n${html}\n`);

const hub = await api('/wp/v2/pages/13?context=edit&_fields=id,content');
let c = hub.content.raw;
if (!c.includes('href="/calculadoras/subida-pensiones/"')) {
  const marca = '<a href="/calculadoras/jubilacion-demorada-flexible/">';
  if (!c.includes(marca)) throw new Error('No encuentro la ficha de la calculadora de demorada en el índice');
  c = c.replace(marca, tile + marca);
  await api('/wp/v2/pages/13', { method: 'POST', body: JSON.stringify({ content: c }) });
  console.log('Índice actualizado');
} else console.log('El índice ya enlazaba');
writeFileSync(process.argv[3], `<!-- id 13 · publish · ${WEB}/calculadoras/ -->\n${c}\n`);
