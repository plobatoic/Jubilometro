# Plan de publicación · Categoría 1 «Jubilación»

Estado a 27 de septiembre de 2026: **los 21 artículos del apartado 1 del informe están publicados** en jubilometro.com; la calculadora de edad de jubilación (herramienta n.º 94) es la que ya tenía publicada la web. La web está abierta a Google desde el 27/09/2026; queda darla de alta en Search Console (punto 5).

**Revisión completa del 30/09/2026** (110 guías publicadas, ver `PLAN-CATEGORIAS-2-8.md`): `npm test`, `npm run publicar` (sin cambios), `npm run comprobar` (111 «OK») y `npm run comprobar-web` («Todo correcto», 110 entradas); `npm run subir -- --prueba` sin cambios pendientes, así que la web coincide con el repositorio. Rastreo de toda la web desde la portada y el sitemap: 446 URL propias, ninguna rota. Revisión en navegador de las 134 URL del sitemap en móvil (390 px) y escritorio (1366 px): ninguna con desbordes horizontales, errores de JavaScript o de consola, recursos propios que fallen, imágenes rotas ni más o menos de un H1. Enlaces externos: sin enlaces rotos (los 403/503 son bloqueos a robots de webs oficiales, que en el navegador abren). Auditoría SEO de las 134 URL del sitemap: todas con canonical, indexables, og:image, un H1 y JSON-LD válido, sin títulos ni descripciones repetidos (11 páginas de sección y calculadoras tenían el title por encima de 65 caracteres y Google cortaba « | Jubilómetro»: se acortaron a 60 o menos en Rank Math; el de la pensión media por provincia lleva el mes, «(septiembre 2026)», y hay que cambiarlo en cada actualización mensual de la tabla). Fallos encontrados y corregidos en la web:

- Correo de contacto de las páginas legales (punto 2).
- La portada «Jubilación» decía «22 artículos» (resto de cuando contaba la plantilla en borrador) y lista 21: ahora lleva la misma frase que las otras secciones y el número sale solo de `[jm_cuenta]`.
- Cambiar solo el title en Rank Math no purga la caché de LiteSpeed: después hay que guardar la página (por la API, un `POST /wp/v2/pages/<id>` vacío basta) para que se vea el nuevo.
- La portada «Datos» seguía siendo la plantilla: lista de guías vacía, «Guías en preparación» y una respuesta rápida que prometía tablas que no existen. Se quitó la lista vacía, la respuesta rápida remite a la tabla por provincia y tiene texto pilar en `paginas/portadas/datos.md` (subido con `subir-portadas.mjs`).

La web jubilometro.com ya está montada en Hostinger (tema «Jubilómetro» sobre Kadence, plugin «Jubilómetro · Núcleo», Rank Math, secciones, 10 calculadoras y páginas legales). Los 21 artículos se suben a ella con `npm run subir` (punto 4): el 27/09/2026 se subieron, se revisaron y se publicaron (identificadores en `publicacion/wordpress-entradas.json`). La calculadora de edad de jubilación ya estaba publicada en la web y da los mismos resultados que la del proyecto, así que no se duplica.

## 1. Decisión: lanzar el clúster completo el mismo día

Las 22 páginas se enlazan mucho entre sí (cada una recibe entre 2 y 15 enlaces de las demás). Si se publicaran de 3 en 3, siempre habría páginas publicadas enlazando a borradores, que para Google y para los lectores son errores 404. Buscamos por ordenador la ordenación que menos enlaces rompe y aun así quedan **33 enlaces rotos** durante el despliegue.

Por eso la recomendación es:

1. **Revisar las 22 páginas** siguiendo el orden de la tabla del punto 3.
2. **Publicarlas todas el mismo día**: el clúster completo sale sin un solo enlace roto y Google entiende desde el primer rastreo que el sitio cubre la jubilación de forma completa.
3. **Después, seguir con la cadencia del informe de 3-4 artículos por semana** para las siguientes categorías (punto 6). Cada artículo nuevo que enlace a páginas que aún no existen sale con ese enlace como texto plano (el generador lo hace solo), así que la cadencia no vuelve a generar enlaces rotos.

## 2. Antes de publicar (lista de comprobación)

- [x] **Firma**: «Por Pau Lobato, equipo editorial de Jubilómetro · Fuentes verificadas en el BOE», sin línea de revisor. No se atribuye una revisión profesional que no existe; si más adelante se contrata a un graduado social o abogado laboralista, se añade su firma y `reviewedBy` en el JSON-LD.
- [x] **Autor**: Pau Lobato (equipo editorial de Jubilómetro), en la firma, en `autor:` y en el JSON-LD.
- [x] **Correo de contacto**: plobatoic@gmail.com, con enlace mailto en el descargo final de los 22 artículos.
- [x] **Datos «Cotejar en BOE»**: hecho el 27/09/2026. Las 39 filas se leyeron en el texto consolidado del BOE y están como «Verificado en BOE» en cada `verificacion-fuentes.md`. Se corrigieron 4 puntos en los artículos (anticipada involuntaria, convenio especial y jubilación flexible) y 3 referencias legales en las fichas de verificación.
- [x] **Páginas de confianza** (E-E-A-T), escritas en `paginas/` y listas en `publicacion/wordpress-paginas.xml`: Quiénes somos, Política editorial, Contacto, Aviso legal, Política de privacidad y Política de cookies. Titular: Pau Lobato, Palafolls 08389 (Barcelona). Privacidad y cookies ya cubren Google AdSense.
- [x] **Páginas de confianza en la web**: jubilometro.com tiene publicadas Quiénes somos (`/sobre-nosotros/`), Metodología (`/metodologia/`), Contacto, Aviso legal, `/politica-privacidad/`, `/politica-cookies/`, Descargo de responsabilidad y Accesibilidad. Desde el 28/09/2026 sus textos (propios de la web, más cortos que los de `paginas/`) ya incluyen el NIF y Google AdSense. El 30/09/2026 se cambió en Contacto, Aviso legal, Privacidad y Accesibilidad el correo `hola@jubilometro.com`, que no recibe nada (el dominio no tiene registros MX), por plobatoic@gmail.com, el mismo de los artículos y del formulario. Si se crea el buzón en Hostinger, se puede volver a poner. No importar `wordpress-paginas.xml`, que crearía duplicados.
- [x] **NIF en el aviso legal**: añadido (art. 10 LSSI).
- [x] **Regenerado y comprobado** (27/09/2026): `npm run publicar` y `npm run comprobar` con las 22 páginas en «OK» y sin enlaces internos rotos. Los artículos se suben con `npm run subir` (punto 4).

## 3. Inventario y orden de revisión

Ordenado por prioridad (fase del informe, novedad legal y peso en el enlazado interno). «Entrantes» = número de páginas del clúster que enlazan a esta.

| # | URL | Título SEO | Palabra clave principal | Fase | Entrantes | BOE por cotejar |
|---|---|---|---|---|---|---|
| 1 | /jubilacion/edad-de-jubilacion/ | Edad de jubilación en 2027: tabla por año de nacimiento | edad de jubilación 2027 | F1 | 15 | 9 |
| 2 | /calculadoras/edad-de-jubilacion/ (en la web: la calculadora ya publicada en /calculadoras/edad-jubilacion/, punto 4) | Calculadora de edad de jubilación 2027: tu fecha exacta | calculadora edad de jubilación | F1 | 2 | 3 |
| 3 | /jubilacion/anticipada-voluntaria/ | Jubilación anticipada voluntaria 2027: requisitos y recortes | jubilación anticipada voluntaria | F1 | 6 | 4 |
| 4 | /jubilacion/flexible/ | Jubilación flexible 2026: qué cambia con el RD 416/2026 | jubilación flexible 2026 | F1 | 7 | 1 |
| 5 | /jubilacion/activa/ | Jubilación activa 2026: requisitos y cuánta pensión cobras | jubilación activa | F1 | 6 | 3 |
| 6 | /jubilacion/subsidio-mayores-52/ | Subsidio para mayores de 52 años 2026: requisitos y cuantía | subsidio mayores de 52 años | F1 | 3 | 0 |
| 7 | /jubilacion/anticipada-involuntaria/ | Jubilación anticipada involuntaria por despido o ERE (2027) | jubilación anticipada involuntaria | F2 | 8 | 5 |
| 8 | /jubilacion/compensa-jubilarse-antes/ | ¿Compensa jubilarse antes? Cálculo a los 63, 64 y 65 años | compensa jubilarse antes | F2 | 5 | 2 |
| 9 | /jubilacion/demorada/ | Jubilación demorada: cuánto sube tu pensión por año extra | jubilación demorada | F2 | 7 | 1 |
| 10 | /jubilacion/parcial/ | Jubilación parcial y contrato de relevo en 2026: requisitos | jubilación parcial | F2 | 4 | 3 |
| 11 | /jubilacion/flexible-activa-o-parcial/ | Jubilación flexible, activa o parcial: cuál te conviene | jubilación flexible activa o parcial | F2 | 4 | 1 |
| 12 | /jubilacion/autonomos/ | Jubilación de autónomos 2026: requisitos y cuánto cobran | jubilación autónomos | F2 | 3 | 0 |
| 13 | /jubilacion/solicitar-jubilacion-internet/ | Cómo solicitar la jubilación por internet paso a paso (2026) | solicitar jubilación por internet | F2 | 6 | 0 |
| 14 | /jubilacion/documentos-jubilacion/ | Documentos para pedir la jubilación: lista para descargar | documentos para pedir la jubilación | F2 | 3 | 0 |
| 15 | /jubilacion/despido-a-los-60/ | Despido a los 60: paro, subsidio y jubilación, en qué orden | despido a los 60 años paro y jubilación | F2 | 3 | 1 |
| 16 | /jubilacion/15-anos-cotizados/ | Jubilación con 15 años cotizados: cuánto se cobra en 2026 | jubilación con 15 años cotizados | F2 | 2 | 1 |
| 17 | /jubilacion/anticipada-discapacidad/ | Jubilación anticipada por discapacidad 2026: edades y grados | jubilación anticipada por discapacidad | F3 | 2 | 1 |
| 18 | /jubilacion/anticipada-por-profesion/ | Jubilación anticipada por profesión: coeficientes reductores | coeficientes reductores edad jubilación profesión | F3 | 2 | 1 |
| 19 | /jubilacion/cuanto-tarda-jubilacion/ | Cuánto tarda la jubilación y qué hacer si se retrasa | cuánto tarda en resolverse la jubilación | F3 | 2 | 0 |
| 20 | /jubilacion/convenio-especial/ | Convenio especial con la Seguridad Social: cuándo compensa | convenio especial Seguridad Social | F3 | 4 | 2 |
| 21 | /jubilacion/faltan-anos-cotizados/ | Me faltan años cotizados para jubilarme: opciones legales | me faltan años cotizados para jubilarme | F3 | 4 | 0 |
| 22 | /jubilacion/trabajado-en-otro-pais/ | Jubilación con años trabajados en otro país: cómo se suman | jubilación trabajado en otro país | F3 | 3 | 0 |

La meta description de cada página está en su `articulo.md` (campo `meta_descripcion`) y ya va dentro del archivo de importación para Yoast y Rank Math.

## 4. Cómo subirlos a WordPress (jubilometro.com)

La web ya tiene los enlaces permanentes `/%category%/%postname%/`, la categoría «Jubilación» y un diseño propio, así que los artículos no se importan con el archivo WXR: se suben por la API REST con `herramientas/publicar/subir-wordpress.mjs`, que les da el formato del tema (`herramientas/publicar/web.mjs`).

1. **Contraseña de aplicación**: en WordPress, Usuarios > Perfil > Contraseñas de aplicación. El usuario es el nombre de acceso (`paulobato`), no el correo ni el nombre visible.
2. **Cabecera de autorización**: el servidor de Hostinger no pasaba la contraseña a WordPress. Se añadieron estas líneas al principio de `public_html/.htaccess`:

   ```
   SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
   RewriteEngine On
   RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
   ```
3. **Prueba sin cambiar nada**: `WP_USER=paulobato WP_APP_PASSWORD='…' npm run subir -- --prueba` dice qué entradas crearía o actualizaría.
4. **Subida**: `npm run subir`. Sube a la biblioteca de medios el gráfico del artículo 1 y el PDF de la lista de documentos, y crea o actualiza las 21 entradas **en borrador** con su título, extracto, categoría y el título, la descripción y la palabra clave de Rank Math. Guarda los identificadores en `publicacion/wordpress-entradas.json`. Se puede repetir: actualiza sin duplicar y sin cambiar el estado, así que también sirve para subir correcciones.

Decisiones al adaptar el proyecto a la web:

- **Plantillas reutilizadas**: la web tenía 62 borradores de plantilla (textos entre corchetes y una foto destacada). Los 7 que coinciden con artículos del proyecto (anticipada voluntaria e involuntaria, demorada, activa, flexible, parcial y solicitud por internet) se rellenan con el artículo y conservan su foto. Los otros 55 siguen en borrador para las próximas categorías.
- **URL del proyecto**: más cortas y sin repetir «jubilacion» (`/jubilacion/demorada/` y no `/jubilacion/jubilacion-demorada/`). La portada enlazaba a 3 de las antiguas (activa, demorada y flexible) y hay que cambiarlas (punto 5).
- **Calculadora de edad**: se mantiene la de la web, `/calculadoras/edad-jubilacion/`, que ya está en la portada y el menú. Se comparó con la del proyecto en 201.996 casos (año y mes de nacimiento, años cotizados) y coinciden todos. Los enlaces del proyecto a `/calculadoras/edad-de-jubilacion/` apuntan a ella, y el artículo 1 lleva una llamada a esa calculadora en lugar del widget.
- **Formato del tema**: respuesta rápida, tablas, avisos, preguntas frecuentes desplegables, tarjetas de «Siguiente paso», lista de documentos con casillas y notas finales usan los componentes `jm-*` del tema. La firma de cada artículo usa la caja «revisado» del tema con el texto «Por Pau Lobato, equipo editorial de Jubilómetro. Fuentes verificadas en el BOE». Las pruebas comprueban que no se pierde ni una palabra del artículo.
- **Llamadas a las calculadoras de la web**: anticipada voluntaria e involuntaria (calculadora de jubilación anticipada), demorada y activa (demorada y activa), 15 años cotizados y me faltan años cotizados (pensión de jubilación). La de flexible no se enlaza porque aún no incluye los incrementos del 15 % y el 25 % del RD 416/2026.
- **Imágenes destacadas**: las 7 plantillas conservan su foto. El artículo 1 usa `requisitos-jubilacion.webp`, que ya estaba en la biblioteca (el gráfico no sirve porque la plantilla recorta la imagen). Los otros 13 llevan fotos de dominio público (CC0) de StockSnap y rawpixel, en `publicacion/imagenes-destacadas/` con sus créditos; son de 960-1024 px y se pueden cambiar por el original a mayor resolución.
- **Anuncios**: no se incluye el bloque «Espacio reservado para anuncio» de las plantillas; AdSense irá con anuncios automáticos (punto 5 bis).
- **Datos estructurados**: los pone Rank Math. El JSON-LD de los `articulo.html` del repositorio es solo de referencia.

Los archivos `wordpress-borradores.xml` y `wordpress-paginas.xml` quedan para una instalación nueva de WordPress; en jubilometro.com crearían duplicados.

## 5. Día del lanzamiento (27/09/2026)

1. [x] **Abrir la web a Google** (hecho el 27/09/2026 y caché de LiteSpeed purgada; `npm run comprobar-web` sin fallos): WordPress > Ajustes > Lectura > Visibilidad en los motores de búsqueda: **desmarcar** «Disuadir a los motores de búsqueda de indexar este sitio» y guardar. Mientras esté marcado, Rank Math pone `noindex, nofollow` en todas las páginas y no escribe la URL canónica. Después, `npm run comprobar-web` debe dar «Todo correcto».
2. [x] **Publicadas las 21 entradas** con `npm run subir -- --publicar`.
3. [x] **Portada y secciones**: los 3 enlaces de la portada apuntan a las URL nuevas; la página «Jubilación» cuenta sus guías con `[jm_cuenta]` (21 publicadas; la plantilla «Requisitos para jubilarse» sigue en borrador y no se muestra); en «Guías» se quitó «62 guías escritas», que no era cierto.
4. [x] **Comprobado en vivo** (`npm run comprobar-web` y navegador en móvil y ordenador): las 21 páginas responden 200, con el title, la description y el H1 del artículo, JSON-LD válido, todo el texto del artículo, índice, sin desbordes ni errores, y los 55 enlaces internos, fotos y archivos responden 200. La calculadora de «¿compensa?» funciona en la página publicada.
5. [x] **CDN de Hostinger**: activa de nuevo (comprobado el 30/09/2026: `server: hcdn`, `x-hcdn-cache-status: HIT`).
5 bis. [x] **XML-RPC desactivado** (30/09/2026, Hostinger > Herramientas): la web no lo usa (se publica por la API REST) y es la vía habitual de ataques de fuerza bruta; ahora responde «Disabled».
6. [x] **Google Search Console** (30/09/2026): propiedad «Prefijo de la URL» `https://jubilometro.com/` verificada con la etiqueta de Rank Math > General > Herramientas para webmasters, y `sitemap_index.xml` enviado («Correcto»; incluye `post-sitemap.xml`, 110 URL, y `page-sitemap.xml`, 24 URL). Las páginas descubiertas suben en los días siguientes. Queda pedir la indexación de las 5 páginas pilar desde «Inspeccionar URL». Antes: verificar el dominio (con el registro DNS que da Google, en el editor de DNS de Hostinger, o pegando el código en Rank Math > General > Herramientas para webmasters), enviar el sitemap `https://jubilometro.com/sitemap_index.xml` y pedir la indexación de la guía de edad de jubilación, la calculadora, la anticipada voluntaria, la flexible y la anticipada involuntaria.
7. [x] **Portada de inicio** (30/09/2026): la guía de edad de jubilación está **fijada** («sticky», entrada 303) y el tema la muestra como guía principal de la portada; las listas de sección y «Guías» no cambian. `npm run subir` no toca ese campo, así que se mantiene. Para quitarla: `POST /wp/v2/posts/303` con `{"sticky": false}`.
   En el menú, enlazar la guía de edad de jubilación y la calculadora: son las páginas pilar del clúster. La calculadora ya está en la cabecera. La guía no: el menú lo genera el tema con las últimas entradas de cada sección (no hay menús de WordPress), así que hay que cambiarlo en el código del tema «Jubilómetro». Lo mismo pasa con la portada de inicio: la pinta la plantilla del tema, no el contenido de la página 12. Mientras tanto, desde el 30/09/2026 la calculadora de edad (`/calculadoras/edad-jubilacion/`) enlaza a la guía en su bloque «Guía completa: edad de jubilación», que era la zona de redacción vacía de la plantilla; la portada «Jubilación» ya la enlazaba dos veces.

## 5 bis. Monetización con Google AdSense

Pedir AdSense **después del lanzamiento**, con las 22 páginas y las 6 páginas de confianza ya publicadas: Google revisa que el sitio tenga contenido propio suficiente, quiénes somos, contacto y privacidad.

1. **NIF** en el aviso legal (ver la lista del punto 2) y regenerar con `npm run publicar`.
2. **Alta** en adsense.google.com con la cuenta de Google del titular; añadir el sitio `jubilometro.com` y pegar el código de verificación en la cabecera (con Site Kit de Google, o con el campo de código de cabecera del tema).
3. **ads.txt**: AdSense da la línea `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` con tu ID de editor. Súbela como archivo `ads.txt` a la raíz del dominio (`https://jubilometro.com/ads.txt`), desde el administrador de archivos de Hostinger o con un plugin de ads.txt.
4. **Aviso de consentimiento (obligatorio en el EEE)**: en AdSense > Privacidad y mensajes > Consentimiento europeo, crear el mensaje con las opciones «Consentir», «No consentir» y «Gestionar opciones», en español, y publicarlo. Es la plataforma de consentimiento certificada de Google (TCF) que describe la política de cookies. No instales otro banner de cookies a la vez.
5. **Enlace «Configuración de privacidad» en el pie**: la política de cookies promete que el lector puede cambiar su elección. Activar el enlace de revocación del mensaje de Google (o un enlace que llame a `googlefc.showRevocationMessage()`).
6. **Anuncios automáticos** con moderación: excluir las calculadoras (no poner anuncios dentro ni pegados al botón de calcular, para no provocar clics accidentales, que AdSense sanciona) y limitar la densidad en móvil.
7. Cuando se añada Google Analytics, actualizar antes privacidad y cookies e incluirlo en el mensaje de consentimiento.

## 6. Semanas siguientes: 3-4 artículos por semana

**Semana 1 tras el lanzamiento: las 3 páginas que el clúster ya menciona.** Hoy salen como texto sin enlace y ganan enlaces internos en cuanto existan:

| Página pendiente | La mencionan |
|---|---|
| /cuanto-cobrare/como-se-calcula-la-pension/ | edad de jubilación, 15 años cotizados, autónomos |
| /cuanto-cobrare/porcentaje-anos-cotizados/ | edad de jubilación |
| /ayudas/pension-no-contributiva/ | edad de jubilación, 15 años cotizados, me faltan años cotizados |

Cuando se publique cada una, regenera (`npm run publicar`) y actualiza en WordPress el cuerpo de las entradas que la mencionan: el enlace aparece solo. `npm run comprobar` lista las URL mencionadas que todavía no existen.

**Después**: seguir el orden del informe (categoría 2 «Cuánto cobraré» y siguientes), siempre de 3 a 4 por semana y cada uno con su revisión.

## 7. Calendario de mantenimiento

| Fecha | Qué revisar |
|---|---|
| Cada semana | Tramitación de la proposición de ley de jubilación anticipada sin recortes con 40 años cotizados (tomada en consideración el 22/09/2026). Afecta a anticipada voluntaria, anticipada involuntaria, compensa y edad de jubilación |
| Octubre-diciembre 2026 | Desarrollo del RD 632/2026 (discapacidad) y primeros criterios del INSS sobre la jubilación flexible del RD 416/2026 |
| 1 de enero de 2027 | Revalorización: pensiones mínimas, límite de ingresos del complemento a mínimos, base mínima de cotización (convenio especial, subsidio de mayores de 52), pensión no contributiva. Cambiar «2026» por «2027» en los títulos que lo llevan (activa, parcial, autónomos, discapacidad, subsidio, 15 años, solicitud por internet, flexible) y actualizar `fecha_actualizacion` e historial de cambios |
| 1 de enero de 2027 | Entra en vigor el último escalón de la reforma (67 años, 38 años y 6 meses, 37 años para el 100 %). Revisar que el texto hable en presente y no en futuro |
| Enero 2028 | Retitular las páginas «2027» con el año nuevo solo si el contenido cambia de verdad |

Cada cambio de datos: editar el `articulo.md`, anotarlo en el «Historial de cambios» del artículo y en su `verificacion-fuentes.md`, y regenerar.
