# Revisión diaria de jubilometro.com

La pidió el titular el 3/11/2026: cada día, a la misma hora, revisar la web de principio a fin y arreglar lo que falle. La lanza la tarea programada «Revisión diaria completa de Jubilómetro». Esta lista es la que hay que seguir.

## 1. Técnica (todas las páginas)

- `node herramientas/revision/rastreo.mjs <salida.json>`. Rastrea las URL de los mapas del sitio, sus enlaces internos y sus imágenes propias. Hay que revisar:
  - que todas respondan 200 y sin redirecciones raras;
  - un solo H1 por página;
  - canonical propia y sin noindex por error;
  - títulos y descripciones sin duplicados;
  - imágenes con texto alternativo;
  - peso y tiempo de respuesta.

  Un 403 de «Bot Verification» es la protección de Hostinger: se repite la petición antes de darlo por roto.
- `npm run comprobar-web`: las 145 guías publicadas (H1, title, description, JSON-LD, respuesta rápida, enlaces internos y archivos).
- `robots.txt`, `sitemap_index.xml`, `ads.txt`, `llms.txt` y la clave de IndexNow responden. Hay que comprobar también:
  - que el tema activo es el de `tema/jubilometro/style.css`;
  - que el certificado HTTPS no caduca en menos de 20 días.

## 2. Enlaces externos

- `node herramientas/revision/enlaces-externos.mjs <salida.json>`.
- Solo un 404 o 410 es un enlace roto seguro. Excepción: las webs de la Comunidad de Madrid (`comunidad.madrid`) dan 404 a este entorno aunque la página exista. La herramienta no las marca como rotas; si hace falta, se comprueban con WebFetch.
- Los 403, 503 y las conexiones cortadas suelen ser bloqueos a robots o a conexiones de fuera de España. Se comprueban con WebFetch antes de cambiar nada.
- Si hay que sustituir un enlace, se busca la página oficial nueva y se anota en el historial de la guía.

## 3. Contenido y fechas

- `python3 herramientas/revision/fechas.py` busca frases en futuro con fechas ya pasadas. Se corrigen las que hayan caducado; muchas son transitorias y están bien.
- **BOE del día** (`https://www.boe.es/datosabiertos/api/boe/sumario/AAAAMMDD`). Hay que buscar pensiones, Seguridad Social, IRPF de pensionistas, dependencia, Imserso, salario mínimo e IPC. Si algo cambia una cifra de las guías o de `CFG` en `calculadoras.js`, se actualiza todo lo que dependa de ella con su verificación.
- **Cifras clave coherentes en todas las guías**: pensión máxima, mínimas, PNC, complemento de brecha, salario mínimo, límites de ingresos y edad de jubilación. Se busca con grep cualquier cifra antigua.
- **Plazos que vencen**: Imserso, termalismo, ayudas autonómicas, renta y subidas.

## 4. Calculadoras y datos

- `npm test` y una pasada con Playwright por las calculadoras (sin errores de JavaScript, resultado razonable con los datos de ejemplo).
- Las cinco tablas de `/datos/`:
  - su CSV `/datos/<tabla>.csv` responde;
  - la ficha Dataset está en el JSON-LD;
  - la fecha de los datos es la del último mes publicado.

## 5. Portada y páginas fijas

- «Ahora mismo», «Novedades del BOE», «Lo más leído» y «Las cifras de 2026» al día.
- Las páginas legales, de contacto, metodología y quiénes somos siguen siendo ciertas.

## 6. Arreglar, publicar y contar

- **Reglas**:
  - Cada dato nuevo se verifica en la fuente oficial (BOE primero) y va con su historial y su fila en `verificacion-fuentes.md`.
  - No se inventan datos ni credenciales del autor.
  - No se toca el código de AdSense ni cuándo se carga mientras no esté aprobado.
  - No se borra nada sin preguntar.
- **Antes de subir**: `npm run publicar`, `npm test` y `npm run comprobar`.
- **Para subir**:
  - las guías, con `npm run subir -- --solo=…`;
  - el tema, con `npm run subir-tema` (con la versión nueva en `style.css` y `functions.php`).
- **Después**: comprobar en vivo, apuntar en `publicacion/PLAN-PUBLICACION.md` y hacer commit y push.
- **Informe del día** (lo pidió el titular el 3/11/2026). Se hace siempre, también si todo está bien:
  - se copia `publicacion/revision/PLANTILLA.md` a `publicacion/revision/AAAA-MM-DD.md` y se rellena con números reales;
  - va en el mismo commit que los arreglos;
  - se le entrega en el chat en español sencillo: estado (verde, ámbar o rojo), qué se ha revisado, qué se ha arreglado y por qué, novedades oficiales, redes, lo que necesita su decisión y lo que viene.

## 7. Redes sociales

- Instagram (@jubilometro) y X (@Jubilometro) están abiertos. Facebook falta: el enlace que dio el titular es su perfil personal, y hace falta una página de Jubilómetro.
- Los perfiles se enlazan en la web (opción `jm_redes`: pie, «Síguenos» y `sameAs`) cuando tengan foto, biografía y alguna publicación. Nunca se enlaza un perfil personal.
- **Metricool** (conectado el 3/11; marca 7853768, con Instagram y la página de Facebook; X sin enlazar): cada día se mira con `getScheduledPosts` que haya unos 14 días programados por delante. Si faltan, se preparan con `node herramientas/redes/metricool.mjs --commit=<SHA ya subido> --desde=… --hasta=… --redes=instagram,facebook`, se programan con `createScheduledPost` y se apuntan en `publicacion/redes/programado/metricool-programadas.md`. Cuando X esté enlazado, se añade `x` a `--redes`.
- Si hay un conector de programación (Metricool u otro), se comprueba que haya publicaciones programadas para los próximos días según `publicacion/redes/programado/`. Antes de programar una, se comprueba que sus cifras coinciden con la guía de la que sale.
