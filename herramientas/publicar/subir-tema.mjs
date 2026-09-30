// Empaqueta tema/jubilometro en publicacion/tema/jubilometro-tema-<versión>.zip y lo instala en
// jubilometro.com por la API (POST /wp-json/jm-tema/v1/instalar, que añadió el tema 2.1.2): es lo
// mismo que Apariencia > Temas > Subir tema > «Reemplazar el instalado con el subido».
// Después comprueba que la web sirve la versión nueva.
//
// Uso:
//   WP_USER=usuario WP_APP_PASSWORD='xxxx xxxx xxxx xxxx xxxx xxxx' npm run subir-tema
//   … -- --prueba     solo empaqueta y dice qué subiría
import { readFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { RAIZ } from './articulos.mjs';

const WEB = process.env.WP_URL ?? 'https://jubilometro.com';
const WP_USER = (process.env.WP_USER ?? '').replace(/\.$/, '');
const { WP_APP_PASSWORD } = process.env;
const PRUEBA = process.argv.includes('--prueba');
if (!PRUEBA && (!WP_USER || !WP_APP_PASSWORD)) {
  console.error('Faltan las variables WP_USER y WP_APP_PASSWORD.');
  process.exit(1);
}

const css = readFileSync(join(RAIZ, 'tema', 'jubilometro', 'style.css'), 'utf8');
const version = css.match(/^Version:\s*([\w.-]+)/m)?.[1];
const php = readFileSync(join(RAIZ, 'tema', 'jubilometro', 'functions.php'), 'utf8');
if (!version || !php.includes(`define( 'JM_THEME_VER', '${version}' );`)) {
  console.error(`La versión de style.css (${version}) y JM_THEME_VER de functions.php no coinciden.`);
  process.exit(1);
}
const zip = join(RAIZ, 'publicacion', 'tema', `jubilometro-tema-${version}.zip`);
rmSync(zip, { force: true });
execFileSync('zip', ['-qr', zip, 'jubilometro', '-x', '*.DS_Store'], { cwd: join(RAIZ, 'tema') });
console.log(`Empaquetado: ${zip}`);
if (PRUEBA) process.exit(0);

const form = new FormData();
form.append('tema', new Blob([readFileSync(zip)], { type: 'application/zip' }), `jubilometro-tema-${version}.zip`);
const r = await fetch(`${WEB}/wp-json/jm-tema/v1/instalar`, {
  method: 'POST',
  headers: { Authorization: `Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64')}` },
  body: form,
});
const cuerpo = await r.text();
if (!r.ok) {
  console.error(`La web respondió ${r.status}: ${cuerpo.slice(0, 400)}`);
  if (r.status === 404) console.error('¿Está instalado el tema 2.1.2 o posterior? Hasta entonces hay que subir el zip a mano.');
  process.exit(1);
}
console.log('Instalado:', cuerpo);

// WordPress debe tener activo el tema con la versión nueva (la portada no sirve para comprobarlo:
// LiteSpeed renombra las hojas de estilo optimizadas y quita el ?ver=)
const activo = await (await fetch(`${WEB}/wp-json/wp/v2/themes?status=active&_fields=stylesheet,version`, {
  headers: { Authorization: `Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64')}` },
})).json();
const tema = Array.isArray(activo) ? activo[0] : null;
if (tema?.stylesheet === 'jubilometro' && tema.version === version) console.log(`Comprobado: el tema activo es Jubilómetro ${version}.`);
else { console.error('Aviso: el tema activo no es el esperado:', JSON.stringify(activo)); process.exit(1); }
