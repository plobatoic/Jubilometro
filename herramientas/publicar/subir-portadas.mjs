// Sube a las portadas de sección de jubilometro.com (páginas de WordPress) el texto pilar de
// paginas/portadas/<slug>.md. La primera vez sustituye la «zona de redacción» que dejó la
// plantilla del tema (<section class="jm-zone">, oculta al público); después, el bloque que
// hay entre las marcas <div class="jm-prose jm-pilar"> y <!-- /jm-pilar -->. Si el texto cambia,
// actualiza también la fecha visible de la cabecera («Actualizado el …») y la de revisión.
//
// Uso:
//   WP_USER=usuario WP_APP_PASSWORD='xxxx xxxx xxxx xxxx xxxx xxxx' node herramientas/publicar/subir-portadas.mjs
//   … -- --prueba            solo dice qué haría, sin cambiar nada en la web
//   … -- --solo=ayudas,imserso
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { marked } from 'marked';
import { RAIZ } from './articulos.mjs';

const WEB = process.env.WP_URL ?? 'https://jubilometro.com';
const { WP_USER, WP_APP_PASSWORD } = process.env;
if (!WP_USER || !WP_APP_PASSWORD) {
  console.error('Faltan las variables WP_USER y WP_APP_PASSWORD.');
  process.exit(1);
}
const AUTORIZACION = `Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64')}`;
const PRUEBA = process.argv.includes('--prueba');
const SOLO = process.argv.find((a) => a.startsWith('--solo='))?.slice('--solo='.length).split(',').filter(Boolean);
const CARPETA = join(RAIZ, 'paginas', 'portadas');
const INICIO = '<div class="jm-prose jm-pilar">';
const FIN = '</div><!-- /jm-pilar -->';

async function api(ruta, { method = 'GET', json } = {}) {
  for (let intento = 1; ; intento++) {
    let respuesta;
    try {
      respuesta = await fetch(`${WEB}/wp-json${ruta}`, {
        method,
        headers: { Authorization: AUTORIZACION, ...(json ? { 'Content-Type': 'application/json' } : {}) },
        body: json ? JSON.stringify(json) : undefined,
      });
    } catch (e) {
      if (intento === 5) throw e;
      await new Promise((ok) => setTimeout(ok, 2000 * intento));
      continue;
    }
    const texto = await respuesta.text();
    if (!respuesta.ok) throw new Error(`${method} ${ruta}: ${respuesta.status} ${texto.slice(0, 300)}`);
    return texto ? JSON.parse(texto) : null;
  }
}

const hoy = new Date();
const enMadrid = (opciones) => new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', ...opciones }).format(hoy);
const fechaLarga = enMadrid({ day: 'numeric', month: 'long', year: 'numeric' });
const fechaCorta = enMadrid({ day: '2-digit', month: '2-digit', year: 'numeric' });
const fechaIso = fechaCorta.split('/').reverse().join('-');

// La fecha de la cabecera es el primer «Actualizado el …» del párrafo jm-meta; la de revisión,
// el <time> del bloque «Revisado por».
function actualizarFechas(raw) {
  return raw
    .replace(/(<p class="jm-meta">[\s\S]*?Actualizado el <span data-jm-rev="long">)[^<]*(<\/span>)/, `$1${fechaLarga}$2`)
    .replace(/(<p class="jm-reviewed__text">[\s\S]*?<time datetime=")[^"]*(">)[^<]*(<\/time>)/, `$1${fechaIso}$2${fechaCorta}$3`);
}

const archivos = readdirSync(CARPETA).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3))
  .filter((slug) => !SOLO || SOLO.includes(slug)).sort();
for (const slug of archivos) {
  const html = marked.parse(readFileSync(join(CARPETA, `${slug}.md`), 'utf8')).trim();
  const bloque = `${INICIO}\n${html}\n${FIN}`;
  const [pagina] = await api(`/wp/v2/pages?slug=${encodeURIComponent(slug)}&context=edit&_fields=id,slug,content`);
  if (!pagina) throw new Error(`No existe la página ${slug}`);
  const raw = pagina.content.raw;
  let nuevo;
  const i = raw.indexOf(INICIO);
  if (i >= 0) {
    const j = raw.indexOf(FIN, i);
    if (j < 0) throw new Error(`${slug}: falta la marca de cierre del texto pilar`);
    nuevo = raw.slice(0, i) + bloque + raw.slice(j + FIN.length);
  } else {
    const zona = /<section class="jm-zone">[\s\S]*?<\/section>/;
    if (!zona.test(raw)) throw new Error(`${slug}: no hay zona de redacción ni texto pilar`);
    nuevo = raw.replace(zona, bloque);
  }
  if (nuevo === raw) {
    console.log(`Sin cambios ${pagina.id} /${slug}/`);
    continue;
  }
  nuevo = actualizarFechas(nuevo);
  const palabras = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (PRUEBA) {
    console.log(`Actualizaría ${pagina.id} /${slug}/ · ${palabras} palabras · fecha ${fechaLarga}`);
    continue;
  }
  const guardada = await api(`/wp/v2/pages/${pagina.id}`, { method: 'POST', json: { content: nuevo } });
  if (guardada.content.raw !== nuevo) throw new Error(`${slug}: WordPress no guardó el contenido tal cual`);
  console.log(`Actualizada ${pagina.id} /${slug}/ · ${palabras} palabras`);
}
