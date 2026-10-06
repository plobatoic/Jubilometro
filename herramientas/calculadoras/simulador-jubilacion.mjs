// Crea o actualiza /calculadoras/simulador-jubilacion/ (el simulador animado) y lo añade al índice de calculadoras.
// El HTML lleva un ejemplo calculado con el mismo motor (calculadoras.js), para quien no tenga JavaScript
// y para los buscadores; al cargar, simulador.js lo rehace con la fecha de hoy y con los datos de cada persona.
// Uso (desde la raíz del proyecto):
//   node herramientas/calculadoras/simulador-jubilacion.mjs publicacion/paginas-vivas/calculadoras__simulador-jubilacion.html publicacion/paginas-vivas/calculadoras.html [--prueba]
import { writeFileSync, copyFileSync, mkdtempSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const require = createRequire(import.meta.url);
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
const CFG = J.CFG;
const hoyTxt = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

/* ---------- Ejemplo: el mismo cálculo que hace simulador.js ---------- */
const EJ = { nacMes: 3, nacAnio: 1965, cotAnios: 30, cotMeses: 0, base: 2000, ccaa: 'madrid', sigue: true };
const hoy = new Date(), now = hoy.getFullYear() * 12 + hoy.getMonth(), nac = EJ.nacAnio * 12 + EJ.nacMes - 1, cotNow = EJ.cotAnios * 12 + EJ.cotMeses;
const e = J.edad({ ...EJ, hoy });
const durTxt = (m) => { const a = Math.floor(m / 12), r = m % 12, mt = r + (r === 1 ? ' mes' : ' meses'); return !a ? mt : a + (a === 1 ? ' año' : ' años') + (r ? ' y ' + mt : ''); };
const viaTxt = () => e.via === 'larga'
  ? 'Te jubilas a los 65 porque en ' + Math.floor(e.mes / 12) + ' tendrás ' + durTxt(e.cot) + ' cotizados, y la ley pide ' + durTxt(e.req[0]) + ' para no tener que esperar más.'
  : 'En ' + Math.floor(e.mes / 12) + ' la ley pide ' + durTxt(e.req[0]) + ' cotizados para jubilarse a los 65. Llegarás con ' + durTxt(e.cot) + ', así que tu edad es la general: ' + J.edadTxt(e.req[1]) + '.';
const P = J.pension({ anio: Math.floor(e.mes / 12), base: EJ.base, cotAnios: e.cot / 12 });
const bruta = Math.min(P.br * P.porcentaje / 100, CFG.pensionMax);
let falta100 = 0; for (let k = e.cot; k < e.cot + 240 && J.porcentajeCot(k, Math.floor(e.mes / 12)) < 100; k++) falta100++;
const N = J.neto({ bruta, pagas: 14, edad: '65', ccaa: EJ.ccaa });
const camino = Math.round(cotNow / (cotNow + (e.mes - now)) * 100);
const eur = J.eur, eur0 = (n) => J.num(Math.round(n), 0) + ' €', pc = (n) => J.num(n, 2) + ' %';
const mn = CFG.minimos.jub65.sin, mx = CFG.pensionMax;
const anticipadaTxt = e.antVol ? `Con 35 años cotizados podrías adelantarla por tu cuenta hasta los ${J.edadTxt(e.antVol.edad)} (${J.mesTxt(e.antVol.mes)}), con un recorte para siempre.` : 'Para adelantarla por tu cuenta harían falta 35 años cotizados en esa fecha, y no llegarías a tiempo.';
if (!e || e.via !== 'general' || !e.antVol) throw new Error('El ejemplo ya no da el caso previsto: revisa EJ');

/* ---------- Piezas del formulario en frase ---------- */
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const optMes = MESES.map((m, i) => `<option value="${i + 1}"${i + 1 === EJ.nacMes ? ' selected' : ''}>${m}</option>`).join('');
let optAnio = ''; for (let y = 1956; y <= 2008; y++) optAnio += `<option${y === EJ.nacAnio ? ' selected' : ''}>${y}</option>`;
const optCcaa = Object.entries(J.CCAA).sort((a, b) => a[1][0].localeCompare(b[1][0], 'es')).map(([k, v]) => `<option value="${k}"${k === EJ.ccaa ? ' selected' : ''}>${v[0]}</option>`).join('');

const faq = [
  ['¿Es fiable este simulador de jubilación?', `Usa las mismas reglas que aplica la Seguridad Social en ${CFG.anio}: la edad de jubilación de la disposición transitoria séptima de la Ley General de la Seguridad Social, el sistema dual de cálculo de la base reguladora, la escala de porcentajes por años cotizados, los coeficientes reductores de la anticipada y el 4 % por año de la demorada. Es una estimación: supone que tu base de cotización ha sido la misma en los últimos años y que no tienes lagunas. La cifra exacta te la da el INSS al resolver tu pensión.`],
  ['¿Qué es la base de cotización y dónde la encuentro?', 'Es la cantidad sobre la que cotizas cada mes. Aparece en tu nómina como «base de contingencias comunes» y en el informe de bases de cotización de Import@ss. Si no la tienes a mano, pon tu sueldo bruto mensual con las pagas extra repartidas en doce meses.'],
  ['¿Puedo jubilarme antes de mi edad ordinaria?', 'Sí, de dos formas: por tu cuenta, hasta dos años antes y con 35 años cotizados, o tras un despido, hasta cuatro años antes y con 33 años cotizados. En las dos se aplica un recorte para siempre que depende de los meses que adelantes y de lo que hayas cotizado. En el capítulo «Elige tu momento» lo ves mes a mes.'],
  ['¿Compensa retrasar la jubilación?', 'Cada año completo que trabajes después de tu edad ordinaria suma un 4 % a la pensión para siempre. Si compensa o no depende de cuánto tiempo la cobres: el gráfico del simulador marca la edad a partir de la cual habrías cobrado más en total.'],
  ['¿Por qué la pensión neta es más baja que la bruta?', 'Porque la pensión tributa en el IRPF como un sueldo. El simulador aplica la escala estatal y la de tu comunidad autónoma, con el mínimo personal por edad. País Vasco y Navarra tienen su propio IRPF y no están incluidos.'],
  ['¿Guardáis los datos que escribo?', 'No. Todo se calcula en tu navegador y no se envía a ningún servidor. Si usas «Copiar el enlace», tus datos viajan solo en ese enlace, después de la almohadilla (#), y no los recibimos.'],
];
const faqHtml = `<div class="jm-faq">${faq.map(([q, a]) => `<details><summary>${q}${icon('plus')}</summary><div><p>${a}</p></div></details>`).join('')}</div>`;
const fuentes = [
  ['BOE', 'Ley General de la Seguridad Social: arts. 205, 207, 208, 209 y 210, disposiciones transitorias 7.ª y 40.ª', 'https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724', 'BOE-A-2015-11724'],
  ['BOE', 'Real Decreto 241/2026, revalorización de las pensiones y pensión máxima de 2026', 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-6977', 'BOE-A-2026-6977'],
  ['BOE', 'Orden PJC/297/2026, bases de cotización de 2026', 'https://www.boe.es/buscar/act.php?id=BOE-A-2026-7296', 'BOE-A-2026-7296'],
  ['BOE', 'Ley 35/2006 del IRPF: escala estatal y mínimo personal', 'https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764', 'BOE-A-2006-20764'],
];

const html = `<!-- wp:html -->
<div class="jm-sim" data-jm-sim>
<section class="jm-sim-hero" aria-labelledby="sim-titulo">
  <div class="jm-wrap jm-sim-hero__grid">
    <div class="jm-sim-hero__copy">
      <nav class="jm-crumbs" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><a href="/calculadoras/">Calculadoras</a></li><li><span aria-current="page">Simulador de jubilación</span></li></ol></nav>
      <p class="jm-sim-eyebrow">Simulador · reglas de ${CFG.anio}</p>
      <h1 id="sim-titulo">Simulador de jubilación: cuándo te jubilas y cuánto cobrarás</h1>
      <p class="jm-lead">Con tres datos verás tu jubilación de principio a fin: la fecha exacta, tu pensión, qué pasa si la adelantas o la retrasas y lo que te llega al banco. Todo cambia en cuanto tocas un dato.</p>
      <p class="jm-meta"><span>${icon('refresh')}Actualizado el ${hoyTxt}</span><span>${icon('scale')}Ley General de la Seguridad Social</span><span>${icon('lock')}Tus datos no salen de tu navegador</span></p>
      <form class="jm-sim-form" data-sim-form novalidate>
        <h2 class="jm-sim-form__title">Tus datos</h2>
        <p class="jm-sim-sentence">
          Nací en <label class="jm-sim-slot"><span class="jm-sr">Mes de nacimiento</span><select name="nacMes" autocomplete="bday-month">${optMes}</select></label>
          de <label class="jm-sim-slot"><span class="jm-sr">Año de nacimiento</span><select name="nacAnio" autocomplete="bday-year">${optAnio}</select></label>.
          Llevo <label class="jm-sim-slot"><span class="jm-sr">Años cotizados hasta hoy</span><input class="jm-sim-w2" name="cotAnios" autocomplete="off" type="number" inputmode="numeric" min="0" max="55" value="${EJ.cotAnios}"></label> años
          y <label class="jm-sim-slot"><span class="jm-sr">Meses cotizados además de los años</span><input class="jm-sim-w2" name="cotMeses" autocomplete="off" type="number" inputmode="numeric" min="0" max="11" value="${EJ.cotMeses}"></label> meses cotizados,
          con una base de cotización de unos <label class="jm-sim-slot"><span class="jm-sr">Base de cotización mensual en euros</span><input class="jm-sim-w5" name="base" autocomplete="off" type="number" inputmode="decimal" min="0" max="20000" step="10" value="${EJ.base}"></label> € al mes.
          Vivo en <label class="jm-sim-slot"><span class="jm-sr">Comunidad autónoma, para el IRPF</span><select name="ccaa" autocomplete="off">${optCcaa}</select></label>.
        </p>
        <p class="jm-sim-hint">La base de cotización está en tu nómina («base de contingencias comunes»). Si no la tienes, pon tu sueldo bruto al mes con las pagas extra repartidas.</p>
        <div class="jm-sim-form__opts"><label class="jm-sim-check"><input type="checkbox" name="sigue" checked>Seguiré cotizando hasta jubilarme</label></div>
        <p class="jm-sim-msg" data-sim-msg role="alert" hidden></p>
        <p class="jm-sim-note" data-sim-if="baseNota" hidden><span data-sim="baseNota"></span></p>
        <div class="jm-sim-form__foot"><button class="jm-btn" type="submit">Ver mi jubilación${icon('arrow')}</button><span class="jm-hint">Gratis y sin registrarte.</span></div>
        <p class="jm-sr" aria-live="polite" data-sim-live></p>
      </form>
    </div>
    <aside class="jm-sim-card" aria-label="Tu jubilación, resumida">
      <div class="jm-sim-card__top">
        <svg class="jm-sim-ring" data-sim-ring viewBox="0 0 120 120" style="--p:${(camino / 100).toFixed(4)}" aria-hidden="true"><circle class="bg" cx="60" cy="60" r="46"/><circle class="fg" cx="60" cy="60" r="46"/><text x="60" y="62" text-anchor="middle" data-sim="camino">${camino} %</text><text class="s" x="60" y="80" text-anchor="middle">del camino</text></svg>
        <div><p class="jm-sim-card__label" data-sim="cardLabel">Te jubilas a los</p><span class="jm-sim-card__big" data-sim="edad">${J.edadTxt(e.edad)}</span><span class="jm-sim-card__sub" data-sim="fecha">en ${J.mesTxt(e.mes)}</span></div>
      </div>
      <dl>
        <div><dt>Pensión bruta al mes</dt><dd data-sim="pension">${eur(bruta)}</dd></div>
        <div><dt>Lo que te llega (neto)</dt><dd data-sim="netoOrd">${eur(N.netoMes)}</dd></div>
        <div><dt>Al año, en 14 pagas</dt><dd data-sim="pensionAnual">${eur0(bruta * 14)}</dd></div>
      </dl>
      <p class="jm-sim-card__foot">El anillo es la parte de tu carrera ya cotizada, desde tu primer mes hasta la jubilación, si cotizaste sin pausas.</p>
    </aside>
  </div>
</section>

<section class="jm-sim-ch" id="sim-cuando" aria-labelledby="sim-cuando-t">
  <div class="jm-wrap">
    <header class="jm-sim-ch__head"><span class="jm-sim-ch__num" aria-hidden="true">1</span><h2 id="sim-cuando-t">Cuándo te jubilas</h2><p>Tu edad ordinaria, la que te da la pensión sin recortes, según tu fecha de nacimiento y lo que habrás cotizado.</p></header>
    <div class="jm-sim-two">
      <div>
        <div class="jm-sim-big"><span class="jm-sim-big__value" data-sim="edad">${J.edadTxt(e.edad)}</span><span class="jm-sim-big__sub" data-sim="fecha">en ${J.mesTxt(e.mes)}</span></div>
        <p class="jm-sim-p" data-sim="via">${viaTxt()}</p>
        <p class="jm-sim-p" data-sim="antVol">${anticipadaTxt}</p>
      </div>
      <div>
        <p class="jm-sim-faltan"><span data-sim="faltan">Cuenta atrás</span> <span class="jm-sim-small" data-sim="objetivo">hasta el 1 de ${J.mesTxt(e.mes)}</span></p>
        <div class="jm-sim-flap" data-sim-flap aria-hidden="true"></div>
        <button class="jm-sim-reset" type="button" data-sim-pause aria-pressed="false">Pausar la cuenta atrás</button>
        <p class="jm-sim-small">Contamos hasta el primer día del mes en que cumples la edad. El día exacto es el de tu cumpleaños.</p>
      </div>
    </div>
    <figure class="jm-sim-life">
      <div class="jm-sim-life__box" data-sim-life></div>
      <figcaption id="sim-life-cap"><span class="jm-sim-key"><i style="background:#0F1B2D"></i>Ya cotizado</span><span class="jm-sim-key"><i style="background:#1D4ED8"></i>Lo que te queda por cotizar</span><span class="jm-sim-key"><i style="background:#EEF4FF;box-shadow:inset 0 0 0 1px #BFD3FF"></i>Jubilación, hasta los 90 años</span></figcaption>
    </figure>
  </div>
</section>

<section class="jm-sim-ch" id="sim-cuanto" aria-labelledby="sim-cuanto-t">
  <div class="jm-wrap">
    <header class="jm-sim-ch__head"><span class="jm-sim-ch__num" aria-hidden="true">2</span><h2 id="sim-cuanto-t">Cuánto cobrarás</h2><p>Tu pensión bruta si te jubilas en tu edad ordinaria, con la cuenta a la vista.</p></header>
    <div data-sim-if="sinPension" hidden><p class="jm-sim-note" data-sim="sinTxt"></p><p class="jm-sim-p"><a class="jm-link-arrow" href="/jubilacion/faltan-anos-cotizados/">Qué hacer si te faltan años cotizados${icon('arrow')}</a></p></div>
    <div data-sim-if="conPension">
      <div class="jm-sim-big"><span class="jm-sim-big__value" data-sim="pension">${eur(bruta)}</span><span class="jm-sim-big__sub">brutos al mes, en 14 pagas: <span data-sim="pensionAnual">${eur0(bruta * 14)}</span> al año</span></div>
      <div class="jm-sim-eq">
        <div class="jm-sim-eq__card"><span class="jm-sim-eq__lab">Base reguladora</span><span class="jm-sim-eq__val" data-sim="br">${eur(P.br)}</span><small>La media de tus bases de cotización de los últimos años, con el método que más te favorece.</small></div>
        <span class="jm-sim-eq__op" aria-hidden="true">×</span>
        <div class="jm-sim-eq__card"><span class="jm-sim-eq__lab">Porcentaje por años cotizados</span><span class="jm-sim-eq__val" data-sim="porc">${pc(P.porcentaje)}</span><div class="jm-sim-meter" data-sim-meter="porc" style="--v:${((P.porcentaje - 50) / 50 * 100).toFixed(2)}%" aria-hidden="true"><i></i></div><div class="jm-sim-meter__ends" aria-hidden="true"><span>50 %</span><span>100 %</span></div><small data-sim="falta100">${P.porcentaje >= 100 ? 'Llegas al 100 %: cada año más ya no sube este porcentaje.' : 'Te faltarían ' + durTxt(falta100) + ' cotizados para llegar al 100 %.'}</small></div>
        <span class="jm-sim-eq__op" aria-hidden="true">=</span>
        <div class="jm-sim-eq__card jm-sim-eq__card--res"><span class="jm-sim-eq__lab">Tu pensión</span><span class="jm-sim-eq__val" data-sim="pension">${eur(bruta)}</span><small>Al mes, antes de impuestos.</small></div>
      </div>
      <div class="jm-sim-scale">
        <div class="jm-sim-scale__track" aria-hidden="true"><span class="jm-sim-scale__dot" data-sim-scale style="--v:${(Math.min(1, Math.max(0, (bruta - mn) / (mx - mn))) * 100).toFixed(2)}%"></span></div>
        <div class="jm-sim-scale__ends"><span>Mínima: ${eur(mn)}</span><span>Máxima: ${eur(mx)}</span></div>
        <p class="jm-sim-small" data-sim="escalaTxt">Entre la mínima (${eur(mn)}) y la máxima (${eur(mx)}).</p>
      </div>
    </div>
  </div>
</section>

<section class="jm-sim-ch" id="sim-momento" aria-labelledby="sim-momento-t">
  <div class="jm-wrap">
    <header class="jm-sim-ch__head"><span class="jm-sim-ch__num" aria-hidden="true">3</span><h2 id="sim-momento-t">Elige tu momento</h2><p>Arrastra el punto para adelantar o retrasar tu jubilación mes a mes y mira cómo cambia tu pensión para siempre.</p></header>
    <div class="jm-sim-tipo" role="group" aria-label="Motivo para adelantarla"><button type="button" data-sim-tipo="voluntaria" aria-pressed="true">Por decisión propia</button><button type="button" data-sim-tipo="involuntaria" aria-pressed="false">Tras un despido</button></div>
    <p class="jm-sim-note" data-sim-if="sinAnticipada" hidden><span data-sim="sinAntTxt"></span></p>
    <div class="jm-sim-slider">
      <span class="jm-sim-bubble" data-sim-bubble aria-hidden="true">${J.edadTxt(e.edad)}</span>
      <label class="jm-sr" for="sim-range">Fecha de jubilación que quieres simular</label>
      <input class="jm-sim-range" id="sim-range" type="range" data-sim-range min="0" max="60" step="1" value="0">
      <div class="jm-sim-marks" data-sim-marks aria-hidden="true"></div>
    </div>
    <div class="jm-sim-readout" aria-live="off">
      <div class="jm-sim-readout__when">Jubilación a los <span data-sim="elecEdad">${J.edadTxt(e.edad)}</span><small>en <span data-sim="elecFecha">${J.mesTxt(e.mes)}</span></small></div>
      <div class="jm-sim-readout__money"><span data-sim="elecPension">${eur(bruta)}</span><small><span data-sim="elecDelta">Es tu jubilación ordinaria: sin recortes ni extras.</span></small></div>
    </div>
    <p class="jm-sim-p" data-sim="elecPor"></p>
    <p class="jm-sim-note" data-sim-if="anticipadaNo" hidden>Con esta fecha no podrías jubilarte por tu cuenta: la pensión quedaría por debajo de la mínima, y la ley lo exige para la anticipada voluntaria.</p>
    <button class="jm-sim-reset" type="button" data-sim-reset>Volver a la edad ordinaria</button>
    <div class="jm-sim-chartcard">
      <h3>Lo que habrás cobrado en total, edad a edad</h3>
      <p class="jm-sim-small" data-sim="chartNota">Mueve el deslizador para comparar con otra fecha.</p>
      <div class="jm-sim-chart" data-sim-chart></div>
      <div class="jm-sim-legend" id="sim-chart-cap"><span class="jm-sim-key"><i style="background:#1D4ED8"></i>Tu elección</span><span class="jm-sim-key"><i style="background:#C2410C"></i>Jubilación ordinaria</span><span>En euros de hoy, sin subidas ni impuestos y sin el sueldo de los meses que sigas trabajando.</span></div>
      <details><summary>Ver los datos en una tabla</summary><div class="jm-table-wrap"><table><caption class="jm-sr">Total cobrado por edad: tu elección y la jubilación ordinaria</caption><thead><tr><th scope="col">Edad</th><th scope="col" class="n">Tu elección</th><th scope="col" class="n">Ordinaria</th></tr></thead><tbody data-sim-table></tbody></table></div></details>
    </div>
  </div>
</section>

<section class="jm-sim-ch" id="sim-neto" aria-labelledby="sim-neto-t">
  <div class="jm-wrap">
    <header class="jm-sim-ch__head"><span class="jm-sim-ch__num" aria-hidden="true">4</span><h2 id="sim-neto-t">Lo que te llega al banco</h2><p>Con la fecha que has elegido (a los <span data-sim="netoEdad">${J.edadTxt(e.edad)}</span>), después del IRPF de <span data-sim="ccaaTxt">${N.ccaa}</span>.</p></header>
    <div class="jm-sim-net">
      <div class="jm-sim-net__bar" data-sim-netbar style="--v:${(N.netoMes / bruta * 100).toFixed(2)}%" aria-hidden="true"><i></i></div>
      <dl class="jm-sim-net__rows">
        <div><dt>Pensión bruta</dt><dd data-sim="bruta">${eur(bruta)}</dd></div>
        <div><dt><i style="background:#C2410C"></i>IRPF (tipo medio: <span data-sim="irpfTipo">${J.num(N.tipo, 2)} %</span>)</dt><dd data-sim="irpf">${eur(bruta - N.netoMes)}</dd></div>
        <div class="is-total"><dt><i style="background:#1D4ED8"></i>Neto al mes</dt><dd data-sim="neto">${eur(N.netoMes)}</dd></div>
      </dl>
      <p class="jm-sim-small">Cálculo anual con 14 pagas, sin otros ingresos ni deducciones. País Vasco y Navarra tienen su propio IRPF y no están incluidos. Para afinarlo, usa la <a href="/calculadoras/pension-neta-irpf/">calculadora de pensión neta</a>.</p>
      <button class="jm-sim-reset" type="button" data-sim-ccaa>Cambiar de comunidad autónoma</button>
    </div>
  </div>
</section>

<section class="jm-sim-ch" id="sim-resumen" aria-labelledby="sim-resumen-t">
  <div class="jm-wrap">
    <header class="jm-sim-ch__head"><span class="jm-sim-ch__num" aria-hidden="true">5</span><h2 id="sim-resumen-t">Tu resumen</h2><p>Guárdalo o compártelo: el enlace lleva tus datos y vuelve a abrir el simulador tal cual lo dejas.</p></header>
    <div class="jm-sim-sum">
      <div class="jm-passbook">
        <div class="jm-passbook__top"><b>Libreta de jubilación</b><span data-sim="rHoy">${hoyTxt}</span></div>
        <div class="jm-passbook__cols" aria-hidden="true"><span>Concepto</span><span>Importe</span></div>
        <ul class="jm-print">
          <li class="jm-print__row"><span>Edad ordinaria</span><span data-sim="rEdad">${J.edadTxt(e.edad)} · ${J.mesTxt(e.mes)}</span></li>
          <li class="jm-print__row"><span>Tu elección</span><span data-sim="rElec">${J.edadTxt(e.edad)} · ${J.mesTxt(e.mes)}</span></li>
          <li class="jm-print__row"><span>Pensión bruta</span><span data-sim="rBruta">${eur(bruta)}</span></li>
          <li class="jm-print__row is-new"><span>Neto al mes</span><span data-sim="rNeta">${eur(N.netoMes)}</span></li>
          <li class="jm-print__row"><span>Al año</span><span data-sim="rAnual">${eur0(bruta * 14)}</span></li>
        </ul>
        <div class="jm-sim-actions" style="padding:0 1.25rem"><button class="jm-btn" type="button" data-sim-copy>${icon('link')}<span>Copiar el enlace</span></button><button class="jm-btn jm-btn--ghost" type="button" data-jm-print>${icon('print')}Imprimir</button></div>
      </div>
      <div>
        <h3 style="margin:0;font:600 1.35rem/1.25 var(--jm-font-display);color:var(--jm-ink)">Tu siguiente paso</h3>
        <ul class="jm-sim-next" data-sim-next>
          <li><a class="jm-link-arrow" href="/jubilacion/anticipada-voluntaria/">La jubilación anticipada voluntaria, paso a paso${icon('arrow')}</a></li>
          <li><a class="jm-link-arrow" href="/cuanto-cobrare/como-se-calcula-la-pension/">Cómo se calcula la pensión, con ejemplos${icon('arrow')}</a></li>
          <li><a class="jm-link-arrow" href="/calculadoras/pension-jubilacion/">Calculadora detallada: lagunas y carrera irregular${icon('arrow')}</a></li>
          <li><a class="jm-link-arrow" href="/jubilacion/solicitar-jubilacion-internet/">Cómo pedir la jubilación por internet${icon('arrow')}</a></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="jm-section" aria-label="Cómo funciona el simulador">
  <div class="jm-wrap jm-split">
    <div class="jm-stack" style="gap:1.5rem">
      <section class="jm-answer" aria-labelledby="respuesta-rapida"><h2 class="jm-answer__title" id="respuesta-rapida">${icon('check')}Respuesta rápida</h2><p>En ${CFG.anio} te jubilas a los <strong>65 años</strong> si has cotizado al menos <strong>38 años y 3 meses</strong>; si no, a los <strong>66 años y 10 meses</strong>. Desde 2027, a los 65 con 38 años y 6 meses o, si no, a los <strong>67</strong>. Tu pensión es tu base reguladora por un porcentaje que llega al 100 % con 36 años y 6 meses cotizados (37 años desde 2027), con un tope de ${eur(mx)} al mes. Con el ejemplo de esta página (nacido en marzo de 1965, 30 años cotizados y 2.000 euros de base), la jubilación llega a los ${J.edadTxt(e.edad)} con unos ${eur0(bruta)} brutos al mes.</p></section>
      <div class="jm-prose">
        <h2>Cómo funciona el simulador</h2>
        <p>El simulador usa el mismo motor que el resto de las <a href="/calculadoras/">calculadoras de Jubilómetro</a>, con las cifras legales de ${CFG.anio}:</p>
        <ol>
          <li><strong>Edad</strong>: busca el primer mes en que cumples la edad que pide la ley, que depende del año y de lo que lleves cotizado (<a href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a205" rel="noopener" target="_blank">artículo 205</a> y disposición transitoria séptima de la Ley General de la Seguridad Social). Si marcas que seguirás cotizando, suma un mes cotizado por cada mes que pasa.</li>
          <li><strong>Pensión</strong>: calcula la base reguladora con los dos métodos del sistema dual y se queda con el más favorable, y aplica el porcentaje por años cotizados del artículo 210.</li>
          <li><strong>Adelantar o retrasar</strong>: aplica los coeficientes reductores de los artículos 207 (despido) y 208 (voluntaria), que cambian según lo cotizado, y el 4 % por año completo de demora.</li>
          <li><strong>Neto</strong>: resta el IRPF anual con la escala estatal y la de tu comunidad y el mínimo personal por edad.</li>
        </ol>
        <h2>Lo que el simulador no tiene en cuenta</h2>
        <ul>
          <li><strong>Lagunas y carreras irregulares</strong>: supone la misma base todos los años. Si has tenido meses sin cotizar o sueldos muy distintos, usa la <a href="/calculadoras/pension-jubilacion/">calculadora de pensión de jubilación</a>, que sí las tiene en cuenta.</li>
          <li><strong>Complementos</strong>: el complemento a mínimos (si tu pensión queda por debajo de la mínima y tus ingresos son bajos) y el complemento por brecha de género por hijos.</li>
          <li><strong>Profesiones con edades propias</strong>: policías locales, bomberos, trabajadores del mar y otros colectivos con coeficientes reductores, y los funcionarios de Clases Pasivas. Lo explicamos en <a href="/jubilacion/anticipada-por-profesion/">la jubilación anticipada por profesión</a> y en <a href="/jubilacion/funcionarios/">la de los funcionarios</a>.</li>
          <li><strong>La subida anual</strong>: las cifras están en euros de hoy. Cada enero las pensiones suben con el IPC: mira la <a href="/calculadoras/subida-pensiones/">calculadora de la subida</a>.</li>
        </ul>
        <h2>Preguntas frecuentes</h2>
      </div>
      ${faqHtml}
      <div class="jm-table-wrap"><table class="jm-sources"><caption>Fuentes oficiales</caption><thead><tr><th scope="col">Fuente</th><th scope="col">Documento</th><th scope="col">Enlace</th></tr></thead><tbody>${fuentes.map(([o, d, u, t]) => `<tr><td>${o}</td><td>${d}</td><td><a href="${u}" rel="noopener" target="_blank">${t}${icon('external')}</a></td></tr>`).join('')}</tbody></table></div>
    </div>
    <aside class="jm-stack" style="gap:1rem" aria-label="Otras calculadoras">
      <h2 style="font-size:1.5rem">Otras calculadoras</h2>
      <div class="jm-toolist"><a href="/calculadoras/edad-jubilacion/"><span class="jm-tile__icon">${icon('hourglass')}</span><span><strong>Edad de jubilación</strong><small>El mes exacto, según lo cotizado</small></span>${icon('arrow')}</a><a href="/calculadoras/pension-jubilacion/"><span class="jm-tile__icon">${icon('calculator')}</span><span><strong>Pensión de jubilación</strong><small>Con lagunas y carrera irregular</small></span>${icon('arrow')}</a><a href="/calculadoras/jubilacion-anticipada/"><span class="jm-tile__icon">${icon('rewind')}</span><span><strong>Jubilación anticipada</strong><small>Los coeficientes reductores, mes a mes</small></span>${icon('arrow')}</a><a href="/calculadoras/pension-neta-irpf/"><span class="jm-tile__icon">${icon('receipt')}</span><span><strong>Pensión neta (IRPF)</strong><small>Con deducciones y otros ingresos</small></span>${icon('arrow')}</a></div>
    </aside>
  </div>
</section>

<div class="jm-sim-dock" data-sim-dock><span class="jm-sim-dock__v" data-sim-dock-v>${J.edadTxt(e.edad)} · ${eur0(bruta)}/mes</span><nav aria-label="Capítulos del simulador"><ol><li><a href="#sim-cuando"><span aria-hidden="true">1</span><span class="jm-sim-dock__t">Cuándo</span><span class="jm-sr">Cuándo te jubilas</span></a></li><li><a href="#sim-cuanto"><span aria-hidden="true">2</span><span class="jm-sim-dock__t">Cuánto</span><span class="jm-sr">Cuánto cobrarás</span></a></li><li><a href="#sim-momento"><span aria-hidden="true">3</span><span class="jm-sim-dock__t">Momento</span><span class="jm-sr">Elige tu momento</span></a></li><li><a href="#sim-neto"><span aria-hidden="true">4</span><span class="jm-sim-dock__t">Neto</span><span class="jm-sr">Lo que te llega al banco</span></a></li><li><a href="#sim-resumen"><span aria-hidden="true">5</span><span class="jm-sim-dock__t">Resumen</span><span class="jm-sr">Tu resumen</span></a></li></ol></nav></div>
</div>
<!-- /wp:html -->`;

const tile = `<a href="/calculadoras/simulador-jubilacion/"><span class="jm-tile__icon">${icon('chart')}</span><span><strong>Simulador de jubilación</strong><small>Tu jubilación entera en una página animada: la fecha, la pensión, adelantarla o retrasarla y el neto.</small></span>${icon('arrow')}</a>`;

if (PRUEBA) { writeFileSync(process.argv[2], html); console.log('Prueba escrita', html.length, 'caracteres'); process.exit(0); }

const ex = await api('/wp/v2/pages?slug=simulador-jubilacion&parent=13&status=publish,draft&_fields=id');
const body = { title: 'Simulador de jubilación', slug: 'simulador-jubilacion', parent: 13, status: 'publish', content: html, comment_status: 'closed', ping_status: 'closed' };
const p = ex.length ? await api('/wp/v2/pages/' + ex[0].id, { method: 'POST', body: JSON.stringify(body) }) : await api('/wp/v2/pages', { method: 'POST', body: JSON.stringify(body) });
console.log(ex.length ? 'Actualizada' : 'Creada', p.id, p.link);
await api('/rankmath/v1/updateMeta', { method: 'POST', body: JSON.stringify({ objectType: 'post', objectID: p.id, meta: {
  rank_math_title: `Simulador de jubilación ${CFG.anio}: cuándo te jubilas y cuánto`,
  rank_math_description: 'Simula tu jubilación en una página: la fecha exacta, tu pensión, cuánto ganas o pierdes adelantándola o retrasándola mes a mes y lo que te llega neto.',
  rank_math_focus_keyword: 'simulador de jubilación' } }) });
console.log('Rank Math OK');
writeFileSync(process.argv[2], `<!-- id ${p.id} · publish · ${p.link} -->\n${html}\n`);

const hub = await api('/wp/v2/pages/13?context=edit&_fields=id,content');
let c = hub.content.raw;
if (!c.includes('href="/calculadoras/simulador-jubilacion/"')) {
  const marca = '<a href="/calculadoras/subida-pensiones/">';
  if (!c.includes(marca)) throw new Error('No encuentro la ficha de la subida en el índice');
  c = c.replace(marca, tile + marca);
  await api('/wp/v2/pages/13', { method: 'POST', body: JSON.stringify({ content: c }) });
  console.log('Índice actualizado');
} else console.log('El índice ya enlazaba');
writeFileSync(process.argv[3], `<!-- id 13 · publish · ${WEB}/calculadoras/ -->\n${c}\n`);
