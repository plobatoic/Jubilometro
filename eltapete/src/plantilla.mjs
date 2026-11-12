import { sitio, juegos } from './sitio.mjs';

export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Iconos propios (SVG en línea) para las tarjetas de juegos.
export const iconos = {
  sudoku: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="5" width="38" height="38" rx="5" fill="none" stroke="currentColor" stroke-width="3"/><path d="M17.7 5v38M30.3 5v38M5 17.7h38M5 30.3h38" stroke="currentColor" stroke-width="2"/><text x="11.4" y="15.2" font-size="9" font-weight="700" text-anchor="middle" fill="currentColor">5</text><text x="24" y="27.8" font-size="9" font-weight="700" text-anchor="middle" fill="currentColor">3</text><text x="36.6" y="40.4" font-size="9" font-weight="700" text-anchor="middle" fill="currentColor">8</text></svg>`,
  sopa: `<svg viewBox="0 0 48 48" aria-hidden="true"><g font-size="9" font-weight="700" text-anchor="middle" fill="currentColor"><text x="10" y="14">S</text><text x="24" y="14">O</text><text x="38" y="14">P</text><text x="10" y="28">A</text><text x="24" y="28">L</text><text x="38" y="28">E</text><text x="10" y="42">T</text><text x="24" y="42">R</text><text x="38" y="42">A</text></g><rect x="3.5" y="4.5" width="41" height="13" rx="6.5" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>`,
  refran: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 10h32a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H22l-9 7v-7H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M12 22h5M20 22h5M28 22h8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  brisca: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="9" width="20" height="30" rx="3" transform="rotate(-12 16 24)" fill="none" stroke="currentColor" stroke-width="2.6"/><rect x="21" y="7" width="20" height="30" rx="3" transform="rotate(10 31 22)" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="31.5" cy="22" r="5" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>`,
  mapa: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 12l12-5 14 5 12-5v29l-12 5-14-5-12 5z" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><path d="M17 7v29M31 12v29" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="21" r="4" fill="currentColor"/></svg>`,
  provincias: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 14l9-6 10 3 8-2 8 6-2 9 3 7-8 7-10-1-8 4-8-6 1-9z" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><path d="M16 8l3 14 12 3 3-16M19 22l-4 12M31 25l4 9" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>`,
  comunidades: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 14l9-6 10 3 8-2 8 6-2 9 3 7-8 7-10-1-8 4-8-6 1-9z" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><path d="M14 18h22M12 28h26" stroke="currentColor" stroke-width="1.8"/><circle cx="24" cy="23" r="3.2" fill="currentColor"/></svg>`,
};

const logo = `<svg class="logo-icono" viewBox="0 0 48 48" aria-hidden="true"><rect x="2" y="8" width="44" height="32" rx="8" fill="#1f5a3f"/><rect x="6" y="12" width="36" height="24" rx="5" fill="none" stroke="#c89b3c" stroke-width="1.6" stroke-dasharray="3 2"/><rect x="13" y="15" width="11" height="17" rx="2" fill="#fbf7ef" transform="rotate(-10 18.5 23.5)"/><rect x="24" y="15" width="11" height="17" rx="2" fill="#fbf7ef" transform="rotate(8 29.5 23.5)"/><circle cx="29.6" cy="23.6" r="3" fill="#c89b3c"/></svg>`;

export function anuncio(nombre) {
  const { cliente, bloques } = sitio.adsense;
  const slot = bloques[nombre];
  if (!cliente || !slot) return '';
  return `<aside class="anuncio" aria-label="Publicidad"><span class="anuncio-etiqueta">Publicidad</span><ins class="adsbygoogle" style="display:block" data-ad-client="${esc(cliente)}" data-ad-slot="${esc(slot)}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></aside>`;
}

function menu(rutaActual) {
  const enlaces = juegos
    .map(
      (j) =>
        `<li><a href="${j.ruta}"${j.ruta === rutaActual ? ' aria-current="page"' : ''}>${esc(j.nombre)}</a></li>`,
    )
    .join('');
  return `<nav class="menu" aria-label="Juegos">
  <details class="menu-movil">
    <summary>Juegos</summary>
    <ul>${enlaces}</ul>
  </details>
  <ul class="menu-escritorio">${enlaces}</ul>
</nav>`;
}

export function tarjetasJuegos(excluir = '') {
  return `<ul class="tarjetas">${juegos
    .filter((j) => j.ruta !== excluir)
    .map(
      (j) => `<li><a class="tarjeta" href="${j.ruta}"><span class="tarjeta-icono">${iconos[j.icono]}</span><span class="tarjeta-texto"><strong>${esc(j.nombre)}</strong><span>${esc(j.resumen)}</span></span></a></li>`,
    )
    .join('')}</ul>`;
}

/**
 * Página completa.
 * @param {object} p
 * @param {string} p.ruta        Ruta canónica, con barra final (p. ej. '/sudoku/')
 * @param {string} p.titulo      <title>
 * @param {string} p.descripcion meta description
 * @param {string} p.cuerpo      HTML del <main>
 * @param {string[]} [p.scripts] Rutas de JS propios
 * @param {object[]} [p.jsonld]  Bloques JSON-LD adicionales
 * @param {{nombre:string, ruta:string}[]} [p.migas] Migas de pan (sin la portada)
 * @param {string} [p.claseCuerpo]
 * @param {boolean} [p.noindex]
 * @param {string} [p.extraPie] HTML adicional en el pie (atribuciones)
 */
export function pagina(p, version) {
  const url = sitio.url + p.ruta;
  const jsonld = [...(p.jsonld || [])];
  if (p.migas && p.migas.length) {
    jsonld.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ nombre: 'Inicio', ruta: '/' }, ...p.migas].map((m, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: m.nombre,
        item: sitio.url + m.ruta,
      })),
    });
  }
  const migasHtml =
    p.migas && p.migas.length
      ? `<nav class="migas" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li>${p.migas
          .map((m, i) =>
            i === p.migas.length - 1
              ? `<li aria-current="page">${esc(m.nombre)}</li>`
              : `<li><a href="${m.ruta}">${esc(m.nombre)}</a></li>`,
          )
          .join('')}</ol></nav>`
      : '';
  const ads = sitio.adsense.cliente
    ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(sitio.adsense.cliente)}" crossorigin="anonymous"></script>`
    : '';
  const scripts = (p.scripts || [])
    .map((s) => `<script src="${s}?v=${version}" defer></script>`)
    .join('\n');
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.titulo)}</title>
<meta name="description" content="${esc(p.descripcion)}">
<link rel="canonical" href="${url}">
${p.noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(sitio.nombre)}">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="${esc(p.titulo)}">
<meta property="og:description" content="${esc(p.descripcion)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${sitio.url}/img/compartir.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1f5a3f">
<link rel="icon" href="/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/icono-180.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="stylesheet" href="/css/estilos.css?v=${version}">
${ads}
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body class="${p.claseCuerpo || ''}">
<a class="saltar" href="#contenido">Saltar al contenido</a>
<header class="cabecera">
  <div class="envoltorio cabecera-fila">
    <a class="marca" href="/" aria-label="El Tapete, inicio">${logo}<span>El Tapete</span></a>
    ${menu(p.ruta)}
  </div>
</header>
<main id="contenido" class="envoltorio">
${migasHtml}
${p.cuerpo}
</main>
<footer class="pie">
  <div class="envoltorio">
    <p class="pie-marca"><strong>El Tapete</strong> · ${esc(sitio.lema)}. Sin registro y sin descargas.</p>
    <ul class="pie-enlaces">
      <li><a href="/sobre-el-tapete/">Sobre El Tapete</a></li>
      <li><a href="/refranes/">Refranero</a></li>
      <li><a href="/contacto/">Contacto</a></li>
      <li><a href="/aviso-legal/">Aviso legal</a></li>
      <li><a href="/privacidad/">Privacidad</a></li>
      <li><a href="/cookies/">Cookies</a></li>
    </ul>
    ${p.extraPie || ''}
    <p class="pie-legal">© ${new Date().getFullYear()} El Tapete. Todos los juegos se juegan en tu navegador; tus partidas se guardan solo en tu dispositivo.</p>
  </div>
</footer>
<div class="aviso-flotante" id="aviso" role="status" aria-live="polite"></div>
<script src="/js/comun.js?v=${version}" defer></script>
${scripts}
</body>
</html>
`;
}
