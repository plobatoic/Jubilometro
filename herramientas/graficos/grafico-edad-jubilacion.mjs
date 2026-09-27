// Genera el gráfico "Edad de jubilación en España, 2013-2027" (SVG 1200x675).
// Uso: node herramientas/graficos/grafico-edad-jubilacion.mjs > salida.svg
// Datos: disposición transitoria 7.ª LGSS (mismos valores que edad-jubilacion.mjs).
import { reglaDelAno } from '../edad-jubilacion/edad-jubilacion.mjs';

const W = 1200;
const H = 675;
const C = {
  surface: '#fcfcfb',
  ink: '#0b0b0b',
  ink2: '#52514e',
  muted: '#6f6d68',
  grid: '#e1e0d9',
  axis: '#c3c2b7',
  serie: '#2a78d6',
  wash: 'rgba(42,120,214,0.10)',
};
const FONT = "'Liberation Sans', 'DejaVu Sans', system-ui, sans-serif";

const anos = [];
for (let a = 2013; a <= 2027; a++) anos.push(a);

function texto(x, y, contenido, { size = 16, color = C.ink2, anchor = 'start', weight = 400 } = {}) {
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${contenido}</text>`;
}

function panel({ x0, y0, w, h, titulo, valores, min, max, ticks, etiquetaTick, etiquetaFinal }) {
  const left = x0 + 64;
  const right = x0 + w - 16;
  const top = y0 + 44;
  const bottom = y0 + h - 34;
  const xs = (a) => left + ((a - 2013) / (2028 - 2013)) * (right - left);
  const ys = (v) => bottom - ((v - min) / (max - min)) * (bottom - top);
  const partes = [];
  partes.push(texto(x0, y0 + 18, titulo, { size: 20, color: C.ink, weight: 700 }));
  for (const t of ticks) {
    partes.push(`<line x1="${left}" x2="${right}" y1="${ys(t)}" y2="${ys(t)}" stroke="${C.grid}" stroke-width="1"/>`);
    partes.push(texto(left - 10, ys(t) + 5, etiquetaTick(t), { size: 15, color: C.muted, anchor: 'end' }));
  }
  partes.push(`<line x1="${left}" x2="${right}" y1="${bottom}" y2="${bottom}" stroke="${C.axis}" stroke-width="1"/>`);
  for (const a of [2013, 2017, 2021, 2025, 2027]) {
    partes.push(texto(xs(a) + (xs(a + 1) - xs(a)) / 2, bottom + 22, `${a}`, { size: 15, color: C.muted, anchor: 'middle' }));
  }
  // Escalones: cada año es un tramo horizontal; 2027 se prolonga ("y siguientes").
  let d = '';
  let area = `M ${xs(2013)} ${bottom}`;
  valores.forEach((v, i) => {
    const a = anos[i];
    const xA = xs(a);
    const xB = xs(a + 1);
    d += i === 0 ? `M ${xA} ${ys(v)} H ${xB}` : ` V ${ys(v)} H ${xB}`;
    area += ` V ${ys(v)} H ${xB}`;
  });
  area += ` V ${bottom} Z`;
  partes.push(`<path d="${area}" fill="${C.wash}" stroke="none"/>`);
  partes.push(`<path d="${d}" fill="none" stroke="${C.serie}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`);
  const vFinal = valores[valores.length - 1];
  const xFinal = xs(2027) + (xs(2028) - xs(2027)) / 2;
  partes.push(`<circle cx="${xFinal}" cy="${ys(vFinal)}" r="6" fill="${C.serie}" stroke="${C.surface}" stroke-width="2"/>`);
  partes.push(texto(xFinal, ys(vFinal) - 16, etiquetaFinal, { size: 18, color: C.ink, anchor: 'end', weight: 700 }));
  const vInicial = valores[0];
  partes.push(`<circle cx="${xs(2013)}" cy="${ys(vInicial)}" r="5" fill="${C.serie}" stroke="${C.surface}" stroke-width="2"/>`);
  return partes.join('\n');
}

const edadCorta = anos.map((a) => reglaDelAno(a).edadCarreraCorta / 12);
const umbral = anos.map((a) => reglaDelAno(a).umbral / 12);

const fmtAnos = (v) => `${Number.isInteger(v) ? v : v.toFixed(1).replace('.', ',')} años`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
<title id="t">Edad de jubilación en España, 2013-2027</title>
<desc id="d">Dos gráficos de escalones. Izquierda: la edad exigida a quien no tiene la cotización larga sube de 65 años y 1 mes en 2013 a 67 años en 2027. Derecha: la cotización necesaria para jubilarse a los 65 pasa de 35 años y 3 meses en 2013 a 38 años y 6 meses en 2027.</desc>
<rect width="${W}" height="${H}" fill="${C.surface}"/>
${texto(48, 66, 'Edad de jubilación en España, 2013-2027', { size: 38, color: C.ink, weight: 700 })}
${texto(48, 102, 'La subida gradual termina en 2027: 67 años, o 65 si has cotizado 38 años y 6 meses', { size: 21, color: C.ink2 })}
${panel({ x0: 48, y0: 150, w: 540, h: 440, titulo: 'Edad exigida sin cotización larga', valores: edadCorta, min: 65, max: 67.25, ticks: [65, 65.5, 66, 66.5, 67], etiquetaTick: fmtAnos, etiquetaFinal: '67 años' })}
${panel({ x0: 624, y0: 150, w: 540, h: 440, titulo: 'Cotización para jubilarte a los 65', valores: umbral, min: 35, max: 39.25, ticks: [35, 36, 37, 38, 39], etiquetaTick: fmtAnos, etiquetaFinal: '38 años y 6 meses' })}
${texto(48, 640, 'Cuenta el año en que te jubilas. Fuente: disposición transitoria 7.ª de la Ley General de la Seguridad Social.', { size: 16, color: C.muted })}
${texto(W - 48, 640, 'Jubilómetro', { size: 18, color: C.ink2, anchor: 'end', weight: 700 })}
</svg>
`;

process.stdout.write(svg);
