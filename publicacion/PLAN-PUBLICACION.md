# Plan de publicación · Categoría 1 «Jubilación»

Estado a 27 de septiembre de 2026: **los 21 artículos del apartado 1 del informe están publicados** en jubilometro.com; la calculadora de edad de jubilación (herramienta n.º 94) es la que ya tenía publicada la web. La web está abierta a Google desde el 27/09/2026; queda darla de alta en Search Console (punto 5).

**Revisión completa del 30/09/2026** (110 guías publicadas, ver `PLAN-CATEGORIAS-2-8.md`): `npm test`, `npm run publicar` (sin cambios), `npm run comprobar` (111 «OK») y `npm run comprobar-web` («Todo correcto», 110 entradas); `npm run subir -- --prueba` sin cambios pendientes, así que la web coincide con el repositorio. Rastreo de toda la web desde la portada y el sitemap: 446 URL propias, ninguna rota. Revisión en navegador de las 134 URL del sitemap en móvil (390 px) y escritorio (1366 px): ninguna con desbordes horizontales, errores de JavaScript o de consola, recursos propios que fallen, imágenes rotas ni más o menos de un H1. Enlaces externos: sin enlaces rotos (los 403/503 son bloqueos a robots de webs oficiales, que en el navegador abren). Auditoría SEO de las 134 URL del sitemap: todas con canonical, indexables, og:image, un H1 y JSON-LD válido, sin títulos ni descripciones repetidos (11 páginas de sección y calculadoras tenían el title por encima de 65 caracteres y Google cortaba « | Jubilómetro»: se acortaron a 60 o menos en Rank Math; el de la pensión media por provincia lleva el mes, «(septiembre 2026)», y hay que cambiarlo en cada actualización mensual de la tabla). Fallos encontrados y corregidos en la web:

- Correo de contacto de las páginas legales (punto 2).
- La portada «Jubilación» decía «22 artículos» (resto de cuando contaba la plantilla en borrador) y lista 21: ahora lleva la misma frase que las otras secciones y el número sale solo de `[jm_cuenta]`.
- Cambiar solo el title en Rank Math no purga la caché de LiteSpeed: después hay que guardar la página (por la API, un `POST /wp/v2/pages/<id>` vacío basta) para que se vea el nuevo.
- La portada «Datos» seguía siendo la plantilla: lista de guías vacía, «Guías en preparación» y una respuesta rápida que prometía tablas que no existen. Se quitó la lista vacía, la respuesta rápida remite a la tabla por provincia y tiene texto pilar en `paginas/portadas/datos.md` (subido con `subir-portadas.mjs`).

**Tema 2.1.0 (rediseño de lectura, 30/09/2026)**, en `tema/jubilometro`: foto de cabecera de los artículos del ancho del texto (antes, casi una pantalla), cabecera del artículo más corta (sin sello pegado al título, herramientas de lectura y compartir en una línea), portada de 17 a 10 bloques (−34 % de altura en ordenador y −42 % en móvil) con la libreta de guías como una libreta de verdad (espiral, margen rojo, color por tema) y «Guías por tema» con las guías pilar en lugar de seis bandas de fotos; bloques largos más compactos en el móvil; tipografía de reserva con las medidas de Archivo para que la página no salte al cargar la fuente; sin avisos de «guías en preparación»; soporte de AdSense y `ads.txt` (punto 5 bis) y `/datos/` indexable. Comprobado sobre la web real con el CSS nuevo: ningún texto tapado en 12 tipos de página a 390, 820 y 1366 px, sin desbordes y colores de tema con contraste AA.

**Tema 2.1.1 (revisión de calculadoras, 30/09/2026)**: la calculadora de viudedad aplicaba el 70 % con cargas familiares sin el límite de ingresos (9.442 € más la mínima de viudedad de la edad, contando la propia pensión) ni la condición de que la pensión sea al menos la mitad de los ingresos: ahora reduce el 70 % hasta el límite o vuelve al 52 % como dice el art. 31.2 del Decreto 3158/1966 (Ana, 1.300 € de base y 9.000 € de otros ingresos: 740,97 € y no 910 €). La de jubilación demorada sumaba el 2 % del semestre desde el primer año; el art. 210.2.a LGSS lo da a partir del segundo año completo. El resultado de ejemplo de cada calculadora se rehace al cargar con las cifras de `CFG`, para que no se quede desfasado al actualizar cuantías. En el móvil, los datos largos de los resultados («67 años y 4 meses…») se cortaban por la derecha: ahora bajan de línea. Tablas en el móvil: 48 guías tenían tablas más anchas que la pantalla, con la última columna cortada y sin aviso de que se podía deslizar. Ahora cada celda lleva el nombre de su columna y el tema estima el ancho mínimo de cada tabla (ajustado midiendo las 169 tablas en el navegador): las que no caben se leen como fichas, una por fila; las de cifras se compactan; y las 4 tablas largas de cifras que aún hay que deslizar muestran una sombra en el borde y el título fijo. Resultado a 390 y 360 px: ninguna tabla cortada. Al guardar el ID de AdSense se vacía la caché. Botón «Buscar» con nombre accesible en buscador, 404 y páginas genéricas, y la API ya no publica la lista de usuarios a quien no ha iniciado sesión.

**Tema 2.2 · rediseño «Pino y latón» (30/09/2026, instalado por la API)**: el titular elige entre tres propuestas (página de propuestas con el contenido real) la de «periódico económico de calidad». Titulares en Newsreader y texto en Public Sans (servidas desde el propio dominio, sin Google Fonts), fondo blanco, verde pino para marca, botones y enlaces, latón para las cifras grandes. Fuera los adornos de la «libreta» (tramas, espiral, sellos, numeración Nº, letra de máquina de escribir, efecto de impresora, cajas que se inclinan). Portada nueva: titular, buscador y temas más consultados junto a la guía destacada; seis guías más y las últimas publicadas; cifras de 2026 en fichas con la cifra en latón. Guías, calculadoras, tablas, datos, menú y pie con el mismo sistema. Imagen para compartir y logotipo nuevos (subidos a la biblioteca; Rank Math sirve la imagen nueva por filtro). Revisado con la guía de interfaces web (toques, menú lateral), axe sin fallos y calculadoras funcionando en la web real.

**AdSense, paso 1 hecho (1/10/2026)**: cuenta creada por el titular; ID de editor ca-pub-3264898877144491 guardado en la opción jm_adsense_client por la API. Comprobado en la web: etiqueta google-adsense-account en todas las páginas, código adsbygoogle.js en guías, temas y portada (no en calculadoras, legales, buscador ni 404), /ads.txt con «google.com, pub-3264898877144491, DIRECT, f08c47fec0942fa0», y el código carga en un navegador sin errores. Siguiente: verificar el sitio y solicitar la revisión en AdSense; después, el mensaje de consentimiento (Privacidad y mensajes, RGPD) y los anuncios automáticos.

**Revisión de SEO, rastreo y AdSense (1/10/2026, tema 2.4.5)**: auditoría de las 135 URL del sitemap. Todas responden 200 con canónica propia, un solo h1, encabezados en orden, imágenes con alt y medidas, Open Graph y Twitter, JSON-LD válido (Organization, WebSite, WebPage con revisor y fecha de revisión, BreadcrumbList, Article con autor, fechas e imagen, WebApplication en las 9 calculadoras, Dataset en datos), ninguna huérfana (todas con 2 o más enlaces internos entrantes), sin títulos ni descripciones repetidos, sin anclas rotas y sin enlaces internos que pasen por redirecciones. robots.txt con el sitemap; búsqueda, legales y /page/N/ fuera del índice; http, www y sin barra redirigen a la URL buena; Search Console ya verificado. Cambios: descripciones de 9 páginas ampliadas a 134–157 caracteres y título de Contacto y de Quiénes somos (Rank Math); la portada y dos páginas decían «diez calculadoras» y son nueve; «Quiénes somos» gana un apartado de compromisos (fuentes oficiales, fechas, nada que vender, publicidad separada, correcciones) y de lo que no hacemos; /page/2/ redirige a la portada; XML-RPC cerrado; el menú ya no parte «Cuánto cobraré» en dos líneas entre 1240 y 1399 px. Para AdSense: política de privacidad y de cookies con Google AdSense, cookies de terceros, personalización, consentimiento (TCF) y enlaces a My Ad Center, youronlinechoices y las políticas de Google; aviso legal con titular; contacto; el tema ya genera la etiqueta de verificación, el script y /ads.txt en cuanto se guarde el ID de editor. Copia del contenido de las 30 páginas de WordPress en `publicacion/paginas-vivas/`.

**Tema 2.4 · «Archivo»: atmósfera vintage e interactiva (30/09/2026, instalado por la API; 2.4.2 el último)**: el titular pide «una atmósfera más vintage pero muy interactiva». Papel color crema con un grano muy fino, colores cálidos y cabecera con doble filete. Detrás de la portada, de las cabeceras de página y del título de las guías, un grabado de billete antiguo (guilloché) dibujado en un lienzo que se mueve con el ratón (sustituye a la retícula de puntos); el sello de la portada lleva anillos grabados y «con las cuentas claras», un subrayado de pluma que se traza al cargar. Las fotos llegan en sepia y se revelan en color al entrar en pantalla (color completo al pasar el ratón). Botones como teclas de máquina de escribir que se hunden al pulsarlos; adorno de imprenta sobre los títulos de sección, que se dibuja al llegar; novedades del BOE en hojas de calendario con anillas que giran en 3D; cifras y temas como fichas de archivo; el autor, en un sello de lacre; la libreta de la calculadora rápida recibe un sello de tinta «Calculado» al calcular; el boletín, un sello de correos perforado con matasellos; signo § en los apartados de las guías; barra de lectura de doble filete; cenefa grabada en el pie. Rendimiento cuidado: el grabado se mide cuando la página ya está colocada y se dibuja en tandas (en pantallas táctiles, a resolución normal). Revisión: accesibilidad, buenas prácticas y SEO 100 en siete tipos de página; rendimiento 91 en portada, 98 en guía, 100 en calculadora y datos, 90–95 en temas; axe sin fallos (con y sin movimiento); calculadoras correctas en la web real; 141 páginas y 385 URL propias sin errores; HTML sin problemas; 26 páginas sin desbordes a 320, 360, 390, 768, 1024 y 1440 px, y tampoco mientras aparecen los bloques (320 a 1240 px). Textos recortados en las 135 URL a 390 y 1366 px: ninguno, salvo lo previsto (las cuatro tablas largas de cifras y la tabla de provincias, que se deslizan en el móvil, y la tabla de provincias con su propio desplazamiento en ordenador).

**Tema 2.3 · profundidad y 3D (30/09/2026, instalado por la API; 2.3.3 el último)**: el titular pide la web «más inmersiva, interactiva y en 3D». Portada: la guía destacada en un escenario 3D que gira hacia el ratón, con dos tarjetas asomando por debajo (un mazo de guías), un sello giratorio de latón («cifras con norma y fecha») y un acceso flotante a la calculadora de edad con su esfera; detrás, retícula de puntos, dos luces que respiran y un foco que sigue al ratón; al bajar, el escenario se inclina hacia atrás. Tarjetas de toda la web (guías, cifras, temas, momentos, autor, siguiente paso, fotos de cabecera) se inclinan hacia el ratón con brillo y un filo de luz de latón, y la foto se desplaza dentro. Los bloques aparecen al bajar girando sobre su borde inferior, las cifras de 2026 ruedan como un contador, la libreta de la calculadora rápida está en 3D (hojas apiladas y tapa verde) con una esfera cuya aguja gira hasta tu edad, el resultado de las calculadoras gira hacia ti al recalcular, las preguntas frecuentes se despliegan suaves y, en Chrome, Edge y Safari, la foto de una tarjeta viaja hasta la cabecera de la guía al abrirla. En el móvil: las tarjetas se hunden al tocarlas y las luces quedan quietas (sin gasto de batería). Con «reducir movimiento», todo quieto. Arreglos de paso: botones de la cabecera móvil pegados al borde, monograma del autor que la tarjeta tapaba en el móvil, desplegables de la calculadora rápida alineados, leyendas de formulario separadas del campo, resultados de búsqueda en el móvil con más sitio para el texto, sugerencias del buscador por encima de la sección siguiente y sin «Nº». Revisión final: 26 páginas sin desbordes a 320, 360, 390, 768, 1024 y 1440 px, y las cinco más cargadas también a 1040, 1100 y 1240 px mientras aparecen los bloques, 141 páginas y 385 URL propias sin errores, HTML sin problemas, calculadoras correctas en la web real, axe sin fallos, teclado, menú móvil y «reducir movimiento» comprobados; Lighthouse: accesibilidad, buenas prácticas y SEO 100; rendimiento 97 en guía y calculadora, 93 en tema, 78–84 en portada (con la conexión de pruebas; los adornos cuestan menos de 0,1 s en un móvil lento).

**Tema 2.1.2**: igual que el 2.1.1 más una ruta de la API para actualizar el propio tema (`POST /wp-json/jm-tema/v1/instalar`, solo administradores autenticados y solo zips del tema Jubilómetro). Tras instalarlo una vez a mano, los temas siguientes se suben con `npm run subir-tema` (empaqueta, instala y comprueba la versión en la web), sin pasar por Apariencia > Temas.

**Tema 2.1.3** (instalado por la API el 30/09/2026, ya sin pasar por el panel): en móviles de 360 y 375 px (muchos Android, iPhone SE y mini) el logo y los dos botones de la cabecera no cabían y **toda la página se podía desplazar de lado** (25 px a 360, 10 px a 375). Botones sin relleno lateral por debajo de 414 px y logo algo menor por debajo de 390: 26 páginas tipo sin desbordes a 320, 360, 375 y 390 px. **Tema 2.1.4** (también por la API): en 320 px «compatibilidades» no cabía en el titular de Viudedad (la página se desplazaba 40 px); titular algo menor por debajo de 360 px y las palabras de los titulares se parten solo si no caben. **Tema 2.1.5** (API): a 360 px el resumen de cifras de la tabla por provincia cortaba la segunda columna («1.941,48 €»); columnas que se reparten el ancho, cifras algo menores por debajo de 390 px y una sola columna por debajo de 340. Revisión completa de las 135 URL a 360 px: sin desbordes ni textos cortados salvo las 4 tablas largas de cifras que se deslizan (con sombra de aviso) y la tabla ordenable de datos. Comprobado: 33.000 cálculos aleatorios sin errores ni cifras imposibles, los ejemplos de las guías cuadran, las 10 calculadoras funcionan en el navegador, axe (WCAG 2.1 AA) sin fallos en 23 páginas, 384 enlaces internos sin errores y ningún texto recortado fuera de las tablas en las 135 URL a 390 y 1366 px.

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
   **Menú** (tema 2.0.43589, **instalado el 30/09/2026** y comprobado en vivo: menú de escritorio y del móvil, portada, `npm run comprobar-web` «Todo correcto» y rastreo de 447 URL propias sin fallos): el menú lo escribe el tema (`tema/jubilometro/parts/header.html` y el cajón del móvil en `parts/footer.html`), no los menús de WordPress. Se añadió el grupo «Lo más consultado» con la guía de edad de jubilación y la calculadora de edad, en el desplegable «Guías» y en el menú del móvil. En la misma versión:
   - «Pensión máxima» del saldo de la portada citaba el RD 39/2026, derogado por el RD 241/2026 (disposición derogatoria única); ahora cita el 241/2026. La noticia del 22/01/2026 sigue con el 39/2026 porque es la norma de esa fecha.
   - Tres enlaces de la portada iban a `/cuanto-cobrare/pension-maxima-minima/`, una plantilla que no se publicó con ese nombre, y el tema (`jm_fix_links`) los mandaba a la portada del tema: ahora van a la pensión máxima o a la mínima.
   - «¿En qué momento estás?» y las búsquedas frecuentes del buscador enlazan a las guías que ya existen (viajes del IMSERSO, ley de dependencia, grados de incapacidad, pensión máxima) en lugar de a la portada de cada tema.
   - Para subir el tema: WordPress > Apariencia > Temas > Añadir nuevo tema > Subir tema, el zip de la carpeta `tema/jubilometro` y «Reemplazar el instalado con el subido». Al cambiar la versión, el tema vacía solo la caché de LiteSpeed.

## 5 bis. Monetización con Google AdSense

Estado a 30/09/2026: **el sitio está listo para pedir AdSense**. Revisión hecha para la solicitud:

- **Contenido propio**: 110 guías con fuentes del BOE y de organismos oficiales, 10 calculadoras y datos; ninguna página con texto de plantilla, «próximamente» ni huecos de anuncio vacíos (el tema 2.1.0 ya no muestra «Estamos preparando N guías más»). Todas las imágenes tienen texto alternativo y pie con su fuente real (Unsplash, StockSnap o rawpixel).
- **Páginas de confianza**: Quiénes somos, Metodología, Contacto (correo que funciona y formulario), Aviso legal con NIF, Privacidad, Cookies, Descargo y Accesibilidad.
- **Privacidad y cookies** (actualizadas el 30/09/2026 en la web): apartado de Google AdSense con lo que exige Google (Google y otros proveedores usan cookies para mostrar anuncios según visitas anteriores; cómo desactivar la publicidad personalizada en la configuración de anuncios de Google y en youronlinechoices.eu; enlaces a las políticas de Google) y el consentimiento con la plataforma de Google certificada TCF.
- **Técnica**: HTTPS, adaptada al móvil, Lighthouse (móvil) en los artículos: rendimiento 98, accesibilidad 100, buenas prácticas 100 y SEO 100; datos estructurados (Article, BreadcrumbList, WebApplication, Dataset); sitemap enviado a Search Console.
- **Aviso de cookies**: la web no tiene banner propio. El enlace «Configurar cookies» del pie ya llama a `googlefc.showRevocationMessage()`, así que funcionará en cuanto esté el mensaje de Google.

Pasos:

1. **Alta** (titular): adsense.google.com con su cuenta de Google, sitio `jubilometro.com`. AdSense da el ID de editor `ca-pub-…`.
2. **Activar en la web** (por la API, sin tocar el hosting): `POST /wp/v2/settings` con `{"jm_adsense_client": "ca-pub-…"}` (tema 2.1.0; desde el 2.1.1 guardar el ID vacía la caché). El tema pone la etiqueta `google-adsense-account` en todas las páginas, el código de anuncios automáticos en guías, temas y portada (**no** en calculadoras, páginas legales, buscador ni 404) y sirve `https://jubilometro.com/ads.txt` con la línea `google.com, pub-…, DIRECT, f08c47fec0942fa0`. Comprobar las tres cosas en vivo.
3. **Mensaje de consentimiento** (titular, en AdSense > Privacidad y mensajes > Europa): opciones «Consentir», «No consentir» y «Gestionar opciones», en español, y publicarlo. No instalar otro banner de cookies.
4. **Anuncios automáticos** en AdSense: activar, con densidad moderada en móvil. Las calculadoras ya quedan fuera porque en ellas no se carga el código.
5. Cuando se añada Google Analytics, actualizar antes privacidad y cookies e incluirlo en el mensaje de consentimiento.

## 5 ter. Buscadores con IA (ChatGPT, Perplexity, Gemini, Copilot)

Estado a 2/10/2026 (tema 2.6.0):

- **Acceso**: robots.txt no bloquea a ningún bot (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bingbot); los nueve responden 200.
- **[/llms.txt](https://jubilometro.com/llms.txt)**: resumen de la web para asistentes de IA, generado por el tema con todas las guías publicadas (título SEO, URL y descripción), las calculadoras y las páginas de confianza. Se rehace solo al guardar cualquier entrada (caché de 12 horas). Lleva `noindex` para no salir en Google.
- **FAQPage**: las preguntas frecuentes que ya se ven en cada guía también van como datos estructurados (114 guías). Google ya no las muestra como resultado enriquecido, pero ChatGPT, Perplexity y Copilot sí las leen.
- **IndexNow**: el tema avisa a Bing (y con él a Copilot y a la búsqueda de ChatGPT) de cada página publicada o cambiada; el 2/10/2026 se enviaron todas. Clave en `/3337a9d98f536ce6049cb37171761901.txt` (comprobada: 200).
- **Ya estaba**: respuesta rápida al principio de cada guía, fuentes oficiales enlazadas, autor con ficha (Person), fecha de actualización visible y en los datos estructurados.

**Revisión mensual (manual, 15 minutos)**: escribir estas consultas en ChatGPT (con búsqueda), Perplexity y Google, tres veces cada una, y anotar si citan Jubilómetro y a quién citan:

| # | Consulta |
|---|---|
| 1 | edad de jubilación 2027 |
| 2 | cuánto se cobra con 15 años cotizados |
| 3 | requisitos de la jubilación anticipada voluntaria |
| 4 | jubilación anticipada con 40 años cotizados sin penalización |
| 5 | cuánto subirán las pensiones en 2027 |
| 6 | pensión máxima 2026 |
| 7 | complemento a mínimos 2026 |
| 8 | requisitos de la pensión de viudedad |
| 9 | se pueden cobrar viudedad y jubilación a la vez |
| 10 | cuánto se cobra con incapacidad permanente total |
| 11 | precios de los viajes del Imserso 2026-2027 |
| 12 | jubilación de funcionarios de Clases Pasivas |
| 13 | cómo sacar el certificado de pensión |
| 14 | teléfono de cita previa de la Seguridad Social |
| 15 | cuánto IRPF se paga por la pensión |
| 16 | cuándo se cobra la paga extra de los pensionistas |
| 17 | requisitos de la jubilación activa |
| 18 | subsidio para mayores de 52 años |
| 19 | calculadora de edad de jubilación |
| 20 | calculadora de jubilación anticipada |

**Presencia fuera de la web** (pesa más que la propia web para que las IA citen): menciones en medios y asociaciones (puntos 3b y 3c), respuestas útiles en foros donde se pregunta por pensiones, y las calculadoras insertadas en otras webs.

## 6. Semanas siguientes: 3-4 artículos por semana

**Semana 1 tras el lanzamiento: las 3 páginas que el clúster ya menciona.** Hoy salen como texto sin enlace y ganan enlaces internos en cuanto existan:

| Página pendiente | La mencionan |
|---|---|
| /cuanto-cobrare/como-se-calcula-la-pension/ | edad de jubilación, 15 años cotizados, autónomos |
| /cuanto-cobrare/porcentaje-anos-cotizados/ | edad de jubilación |
| /ayudas/pension-no-contributiva/ | edad de jubilación, 15 años cotizados, me faltan años cotizados |

Cuando se publique cada una, regenera (`npm run publicar`) y actualiza en WordPress el cuerpo de las entradas que la mencionan: el enlace aparece solo. `npm run comprobar` lista las URL mencionadas que todavía no existen.

**Después**: seguir el orden del informe (categoría 2 «Cuánto cobraré» y siguientes), siempre de 3 a 4 por semana y cada uno con su revisión.

### Tanda del 2 de octubre de 2026: búsquedas con mucho volumen

Publicadas el 2/10/2026, cada una con su `verificacion-fuentes.md`, imagen CC0 y enlaces desde las guías vecinas:

| URL nueva | Palabra clave | Enlazada desde |
|---|---|---|
| /jubilacion/anticipada-40-anos-cotizados/ | jubilación anticipada 40 años cotizados sin penalización | anticipada voluntaria, anticipada involuntaria, compensa, despido a los 60, edad de jubilación |
| /jubilacion/funcionarios/ | jubilación funcionarios clases pasivas | edad de jubilación, anticipada por profesión, revalorización, certificado de pensión |
| /cuanto-cobrare/certificado-pension/ | certificado de pensión | trámites online, IRPF de las pensiones, revalorización, edad de jubilación, cita previa |
| /jubilacion/cita-previa-seguridad-social/ | cita previa seguridad social | trámites online, solicitar la jubilación, solicitar viudedad, solicitar incapacidad, certificado de pensión |

Actualizadas el mismo día: subida de 2027 (IPC adelantado de septiembre, 4,9 %), edad de jubilación (nuevo informe de edad legal del 30/09/2026), viajes del Imserso (temporada en marcha, plazas con animales, duplicado de la acreditación) y pagas extra (sin paga compensatoria).

**Search Console**: pedir la indexación de las cuatro URL nuevas (Inspección de URLs > Solicitar indexación) y de la subida de 2027.

### Dependencia por comunidad autónoma (5/10/2026)

Búsquedas locales («dependencia Galicia», «ley dependencia País Vasco», «dependencia Castilla y León solicitud»…) con poca competencia de calidad. Cada guía lleva el trámite oficial de la comunidad (requisitos, documentos, plazo, sentido del silencio, teléfonos) y los datos del Imserso de esa comunidad (tiempos, prestaciones, cuantía media de la prestación por cuidados familiares), con su `verificacion-fuentes.md`.

- Publicadas el 5/10/2026: Galicia (bonos de la Xunta), País Vasco (tres diputaciones), Castilla y León, Castilla-La Mancha, Región de Murcia (tasa T-172), Canarias (silencio positivo) y Asturias (silencio positivo, Decreto 4/2023).
- Publicadas el 6/10/2026: Aragón (cita con la trabajadora social, grado III+), Extremadura (cuantías máximas y mínimas), Illes Balears (solicitud conjunta con la discapacidad, grado en tres meses), Cantabria (ICASS, Orden UMA/47/2019) y La Rioja (Orden 2/2012).
- Pendiente: **Navarra**. La web del Gobierno de Navarra (navarra.es y bon.navarra.es) no respondía desde el entorno de trabajo; hay que leer la ficha «Solicitar la valoración de la dependencia» de la Agencia Navarra de Autonomía y Desarrollo de las Personas antes de escribirla. El enlace ya está puesto en «cómo solicitar» y en «cuánto tarda»: aparece solo al publicarla y volver a subir esas dos guías.
- Enlazadas desde la portada de Dependencia, «cómo solicitar», «cuánto tarda» y «cómo reclamar» (ejemplos de silencio positivo y negativo).
- **Mantenimiento**: actualizar las cifras del Imserso cada trimestre (estadística mensual del SAAD) en todas las guías de comunidad a la vez.

### Elecciones generales del 29 de noviembre de 2026 (10/10/2026)

El Real Decreto 806/2026 (BOE del 6/10/2026) disolvió las Cortes y convocó elecciones para el 29 de noviembre; las nuevas Cámaras se constituyen el 23 de diciembre.

- **Guía nueva** [/cuanto-cobrare/elecciones-y-pensiones/](https://jubilometro.com/cuanto-cobrare/elecciones-y-pensiones/) (id 806): la subida de 2027 la fija la ley (art. 58 LGSS); lo que puede retrasarse es el decreto (precedentes de 2020 y 2026); paga extra; qué decae (art. 207 del Reglamento del Congreso); voto por correo (hasta el 19/11, entrega hasta el 25/11); sitio reservado para las propuestas de cada partido cuando publiquen sus programas. Sin opiniones políticas: solo normas y organismos oficiales. Imagen CC0 (acuarela de una urna, National Gallery of Art).
- **Jubilación anticipada con 40 años cotizados**: la proposición de ley decae con la disolución; guía reescrita (estado, qué tendría que pasar para retomarla, preguntas frecuentes).
- **Revalorización**: párrafo y pregunta frecuente sobre las elecciones, con enlace a la guía nueva.
- Enlaces cortos `elecciones` y `40-anos-cotizados` (tema 2.10.4) y 5 publicaciones nuevas en el calendario del primer mes (12 a 15 de octubre).

### Autor real: foto, biografía y firma (30/10/2026, temas 2.11.18 y 2.11.19)

- Tras el rechazo de AdSense por «contenido de poco valor» y el informe `reports/Comparativa de nichos para AdSense.md` (se sigue con las pensiones), primer paso del plan: que se vea quién está detrás.
- **Firma**: las 145 guías decían «equipo editorial de Jubilómetro» (no hay equipo); ahora «editor de Jubilómetro».
- **Foto** de Pau Lobato (recortada, sin datos EXIF ni ubicación) en `tema/jubilometro/assets/img/pau-lobato-{160,320,800}.webp`: firma y caja de autor de cada guía (`jm_author_avatar`), «Quién está detrás» de la portada y de Quiénes somos, e `image` del autor en los datos estructurados.
- **Biografía** aprobada por el titular: 21 años, Barcelona; no es asesor ni trabaja en una gestoría; usa IA para documentarse y redactar y comprueba cada cifra con la fuente oficial. Se quita de Quiénes somos «llevo años viendo cómo familiares y amigos llegaban a los 60», que no era cierto.
- Guía de cuánto tarda la jubilación: 9,63 días de media en septiembre (nota oficial de la Seguridad Social).

### Pensión media por provincia con la nómina de octubre (29/10/2026)

- **Fuente**: nota de la Seguridad Social del 27/10/2026 («La pensión media del sistema de la Seguridad Social alcanza los 1.376,1 euros en octubre») y su Excel adjunto `Pensiones OCTUBRE_2026.xlsx`, hoja «Número pensiones (IP-J-V)». Las 52 provincias suman 6.777.927 pensiones de jubilación, el total del Excel, y la media ponderada da 1.577,61 € (la nota redondea a 1.577,6 €).
- **Datos**: media nacional 1.577,61 € (+1,51 € sobre septiembre); la más alta, Bizkaia (1.943,10 €); la más baja, Ourense (1.144,37 €); 17 provincias por encima de la media; nuevas altas de jubilación, 1.758 € (dato de septiembre de la nota). CSV del mes en `publicacion/datos/`.
- **Herramienta nueva** `herramientas/datos/pension-provincia.mjs`: lee el Excel oficial (sin dependencias), comprueba 52 provincias y que la suma sea el total, y cambia en la página solo los datos (título, fechas, resumen, las dos listas de 10, tabla, metodología, «Qué dicen los datos», fuente y título y descripción de Rank Math); con `--subir` actualiza la web y reescribe las cifras de `paginas/portadas/datos.md`.
- Comprobado en vivo: título «Pensión media por provincia (octubre 2026) | Jubilómetro», 52 filas, buscador, filtro por comunidad y CSV correctos, sin errores de JavaScript; `/datos/` con las cifras nuevas. Próximo recordatorio programado para el 28/11/2026.

### ads.txt fijo y ajustes protegidos (28/10/2026, tema 2.11.17)

- **Aviso del titular**: AdSense marcaba `ads.txt` como «Autorizado» y ha dejado de hacerlo. Comprobado hoy: `https://jubilometro.com/ads.txt` (y con www) responde 200, `text/plain`, con la línea correcta, en 30 peticiones seguidas y con agentes de Google; también desde los servidores de Google (proxy de Google Translate). `robots.txt` no lo bloquea. Lo más probable es que el rastreador de AdSense lo pidiera en un momento en que no pudo leerlo, porque el archivo lo generaba WordPress en cada visita (PHP y base de datos, unos 0,8 s) y la protección del CDN de Hostinger puede bloquear peticiones automáticas. No hay registros de acceso en la API para confirmarlo.
- **Arreglo 1**: `ads.txt` fijo en la raíz del hosting (copia en `publicacion/hosting/`), subido con el conector de Hostinger. Ahora lo entrega el servidor directamente (sin PHP, con `Last-Modified` y `ETag`). El contenido es idéntico; el tema sigue generándolo si el archivo desaparece.
- **Arreglo 2 (fallo latente)**: `jm_adsense_client`, `jm_ga4_id` y `jm_redes` estaban registrados en el grupo `general` sin campo en la página. Al guardar Ajustes › Generales, WordPress pone a vacío todas las opciones de ese grupo que no vienen en el formulario: se habría borrado el ID de AdSense (y con él la etiqueta de verificación, el código y `ads.txt`). Pasan al grupo propio `jubilometro`; siguen en la API de ajustes. Comprobado: los tres valores siguen iguales y la portada mantiene la etiqueta `google-adsense-account` y `adsbygoogle.js` como antes (no cambia cómo ni cuándo carga AdSense).
- AdSense vuelve a leer el archivo por su cuenta; el estado puede tardar unos días en volver a «Autorizado».

### Portada más corta en el móvil y foto de la baja por menopausia (27/10/2026, tema 2.11.16)

- **«Guías por tema» en el móvil**: mosaico de dos columnas con el icono, el nombre y el número de guías de cada tema; toda la tarjeta es el enlace al tema. Las guías sueltas ya salen en «Más guías», en «¿En qué momento estás?» y en la página de cada tema, así que en el móvil se repetían. De 2.486 a 771 px. En el ordenador no cambia (tres guías por tema).
- **«Novedades del BOE» en el móvil**: se ven las tres últimas y un botón «Ver las 6 novedades» (`initTimelineMore`, con `aria-expanded`; al plegar, el botón vuelve a la vista). De 2.587 a 1.627 px. En el ordenador se ven las seis, sin botón.
- La portada en el móvil baja de 17.947 a 15.272 px, sin errores de JavaScript.
- **Foto de la baja por menopausia**: «Clotilde sentada en un sofá» (Joaquín Sorolla, 1910, Museo Sorolla, inventario 00900), reproducción del Google Art Project en Wikimedia Commons, dominio público; recortada a 16:9 por el busto (92 KB). Descargada a través de Apify; crédito en `CREDITOS.md`. Ya sale en la guía, en la imagen para redes y en las listas.
- Comprobaciones: 25 pruebas, `comprobar` sin avisos, `comprobar-web` con un solo 403 pasajero de la protección de Hostinger (la calculadora de anticipada responde 200 con `curl`).
- **Foto real del autor**: hace falta una foto de Pau; no se puede inventar ni usar una de banco como si fuera él. Cuando la envíe, se sube como avatar y a «Quiénes somos».

### Revisión visual y mejoras (27/10/2026, temas 2.11.14 y 2.11.15)

- **Revisión** con capturas completas de portada, tema Jubilación, guía de militares, calculadora de pensión neta, Guías, Calculadoras, pensión media por provincia y Quiénes somos, en móvil y ordenador. Sin desbordes ni errores de JavaScript; el ordenador se ve acabado. Problemas encontrados: la guía más nueva salía destacada en Jubilación con un recuadro vacío (sin foto), la página Guías medía 34.500 px en el móvil y «Las cifras de 2026» ocupaba seis tarjetas apiladas.
- **Foto de la guía de las policías autonómicas**: todoterreno de Tráfico de los Mossos d'Esquadra con una moto en remolque (Francesc 2000, Wikimedia Commons, dominio público), recortada a 16:9 y en webp (65 KB). Descargada a través de Apify porque Wikimedia limita las descargas desde aquí; crédito en `CREDITOS.md`.
- **Guía sin foto** (`jm_story_img`): en vez de un hueco claro con un icono, una lámina azul de la marca con el icono y el nombre del tema (en miniaturas pequeñas solo el icono, con una consulta de contenedor). En las listas con miniaturas, un cuadrado de la marca para que no se descuadre. La baja por menopausia sigue sin foto (el buscador de Wikimedia estaba saturado) y ya se ve bien.
- **Guías**: buscador que filtra las 145 guías al escribir (sin tildes ni mayúsculas, todas las palabras), con el número de resultados y, si no hay, enlace al buscador de la web; cada tema muestra 6 guías y un botón «Ver las N guías de…». En el móvil la página baja de 34.500 a 15.700 px.
- **Portada, «Las cifras de 2026» en el móvil**: dos columnas (la tarjeta impar ocupa el ancho), cifras algo menores y flecha junto al texto: de 1.156 a 640 px.
- Nota: tras muchas capturas seguidas, la protección de Hostinger (hCDN) sirve una página con reCAPTCHA al navegador sin pantalla y da algún 403 a `comprobar-web`; con `curl` la web responde bien y se pasa en unos minutos. No afecta a los lectores.

### Google Analytics 4 preparado (27/10/2026, tema 2.11.13)

- **Apagado hasta tener el ID**: opción `jm_ga4_id` (`POST /wp/v2/settings {"jm_ga4_id": "G-…"}`; no tiene campo en Ajustes › Generales); al guardarla se vacía la caché de LiteSpeed. El tema solo escribe `window.jmGA` en la cabecera (no a los editores conectados).
- **Solo con permiso** (art. 22.2 LSSI): `initAnalytics` espera al aviso de privacidad de Google y carga `gtag.js` si hay consentimiento para las finalidades 1 y 8 del TCF y el proveedor Google (755), o si el RGPD no se aplica; si se retira, `analytics_storage` pasa a `denied`. Sin aviso en la página (calculadoras y legales no cargan AdSense) no se carga. Consentimiento de anuncios (`ad_*`) siempre denegado, sin Google Signals ni personalización.
- **Campañas**: `page_location` lleva la dirección de llegada con sus `utm_` (el contador propio las quita de la barra después). Los botones que cuenta la web (compartir, calculadoras, newsletter, herramientas) se envían también como eventos (`jm_detalle`).
- Probado en vivo con un ID de prueba y peticiones a Google bloqueadas: con permiso se carga y la configuración lleva la URL con utm; sin permiso o sin aviso, no; AdSense carga igual en los tres casos; sin errores.
- **Al activarlo**: poner el ID, añadir Analytics a privacidad (finalidad, Google Ireland, transferencias) y a la tabla de cookies (`_ga` y `_ga_<ID>`, 2 años, con permiso), y comprobar en tiempo real.

### Repaso completo: SEO, rastreo, código y guía nueva (27/10/2026, tema 2.11.12)

- **Rastreo y SEO**: las 172 URL de los sitemaps responden 200, con canónica propia, un solo h1, título y descripción en su medida y sin duplicados, imagen para redes y JSON-LD válido (Article, FAQPage, BreadcrumbList, WebApplication, Dataset). robots.txt, sitemaps, redirecciones (http, www, sin barra y URL antiguas de las legales), ads.txt, clave de IndexNow, llms.txt (162 entradas), feed y cabeceras de seguridad (HSTS, nosniff, SAMEORIGIN) correctos. Ninguna guía huérfana: todas reciben al menos dos enlaces de otras guías; la de la baja por menopausia gana uno desde la baja de larga duración.
- **Código y seguridad**: sin errores de JavaScript en portada, categorías, guías, calculadoras, datos, buscador y 404; `comprobar-web` «Todo correcto»; pruebas de las calculadoras (e2e) correctas. La API no lista usuarios, xmlrpc está desactivado y el registro de errores, protegido.
- **BOE del 25 al 27/10**: nada que cambie las guías. El RDL 31/2026 sigue pendiente de convalidar (revisión programada hacia el 20/11).
- **Guía nueva: [jubilación de las policías autonómicas](https://jubilometro.com/jubilacion/policias-autonomicas/)** (id 1027): Mossos d'Esquadra, Ertzaintza y Policía Foral de Navarra, coeficiente 0,20 con suelo de 60 años (59 con 35 de servicio), según las disposiciones adicionales 20.ª, 20.ª bis y 20.ª ter de la LGSS; cotización adicional del 10,60 % (Orden PJC/297/2026, art. 32.2); acuerdo de Navarra del 29/04/2022 (navarra.es) y procedimiento de la Ertzaintza según el sindicato ErNE. Elegida porque las guías por profesión son las que más visitas traen (militares, la primera). Sin foto: Wikimedia limita las descargas. Enlazada desde anticipada por profesión (su fila de la tabla ya cita la norma), policía local y la portada de Jubilación; enlace corto `policias-autonomicas` y una publicación para X en el banco (312).
- Comprobaciones: 25 pruebas, `comprobar` sin avisos, banco correcto, `comprobar-web` «Todo correcto»; la guía nueva, en el sitemap y en llms.txt, sin desbordes en el móvil.

### Revisión legal y de contenido (24/10/2026, tema 2.11.11)

- **Páginas legales** reescritas en WordPress (copia en `publicacion/paginas-web/`), comparando el texto con lo que hace la web de verdad (cookies que aparecen, almacenamiento del navegador, formularios, plugins activos y recursos externos: solo Google; las imágenes de Unsplash ya se sirven desde la web):
  - **Aviso legal**: condiciones de uso, publicidad (sin anuncios en calculadoras ni legales, sin patrocinados), enlaces a otras webs (art. 17 LSSI), calculadoras insertables, cambios y fuero del consumidor.
  - **Privacidad**: campos reales del formulario (con «motivo»), registros técnicos del servidor, destinatarios (Hostinger en Chipre como encargado; Google), plazos de conservación por tratamiento, edad mínima de 14 años (art. 7 LOPDGDD), decisiones automatizadas, seguridad, plazo de un mes para responder, derecho a retirar el consentimiento y cambios.
  - **Cookies**: tablas con nombre, finalidad, duración y si piden permiso: almacenamiento propio (`jm_fs`, `jm_ultima_guia`, sesión de editores) y cookies de Google (`FCCDCF` y `FCNEC` del aviso de privacidad, `__gads`, `__gpi`, `__eoi`, `IDE` y `test_cookie`); enlaces de ayuda de Chrome, Firefox, Safari (iPhone y Mac) y Edge comprobados.
  - **Descargo**: no somos un organismo público, normas pendientes de convalidar, datos de terceros y cómo avisar de un error. **Accesibilidad**: texto base corregido a 18-19 px (decía 19-20), botón de tamaño de letra, tablas en fichas, cómo se comprueba (Lighthouse 100 el 22/10) y limitaciones conocidas (anuncios y PDF de terceros).
  - **Metodología y Quiénes somos**: los anuncios ya no se describen como «identificados como Publicidad» (los pone Google y no siempre llevan esa etiqueta): ahora «separados del contenido y nunca en las calculadoras». Quiénes somos: 11 calculadoras (decía 9). Guías: «las once calculadoras» (decía diez).
  - **Contacto y newsletter**: información básica de protección de datos (primera capa) junto a cada formulario.
- **«Configurar cookies» estaba oculto en toda la web**: solo se mostraba con la clase `jm-ads-on`, que depende de una constante que nunca se activó. Ahora se muestra con la clase nueva `jm-cmp` cuando hay ID de AdSense; en las páginas sin AdSense (calculadoras y legales) lleva a la portada con `#configurar-cookies`, que abre el aviso de Google. No cambia cómo ni cuándo carga AdSense.
- **«Seguir leyendo»** solo guarda la última guía si el aviso de Google da permiso para almacenar información en el dispositivo (finalidad 1 del TCF), y borra lo guardado si no lo hay (art. 22.2 LSSI). El tamaño de letra no pide permiso porque lo elige el lector.
- **Portada, «Novedades del BOE»**: la pensión máxima de 2026 citaba el «RD 39/2026, 22 de enero» (derogado); ahora el Real Decreto 241/2026, publicado el 26/03/2026 con efectos desde el 1 de enero, y en su orden.
- **Elecciones y pensiones**: situación de los programas a 23/10 (ninguno publicado), con su fila en la verificación.
- BOE del 21 al 24/10 revisado: nada nuevo de pensiones, Seguridad Social, dependencia ni IMSERSO después del RDL 31/2026. Plazos de los artículos revisados: el único próximo es la lista de espera del termalismo (31/10), ya programado.
- Comprobaciones: 25 pruebas, `comprobar` sin avisos, `comprobar-web` «Todo correcto» (un 403 pasajero en la primera pasada), sin errores de JavaScript en guía, portada, calculadora y privacidad; Lighthouse de cookies y contacto: accesibilidad y buenas prácticas 100 (las legales llevan `noindex` a propósito).

### Velocidad y acabado visual (22/10/2026, tema 2.11.8)

- **Revisión visual** de portada, categoría, guía, calculadora y Navarra en móvil y ordenador (capturas con desplazamiento para que carguen las imágenes). La foto principal de las guías se ve bien en ordenador (el hueco gris era de la captura).
- **Novedades del BOE** de la portada al día: Real Decreto-ley 31/2026 (21/10: viudedad sin inscribir la pareja y baja especial por menopausia) y Ley 4/2026 (publicada el 3/10, en vigor el 23/10: reforma de la dependencia). Ahora son seis.
- **Pie**: «Cifras revisadas el…» ya no se parte en dos columnas; icono y texto en línea, con sangría y la fecha sin cortar.
- **Ficha del autor en el móvil**: foto, «Escrito y revisado por» y nombre en la primera fila, y la biografía a todo el ancho (antes quedaba en una columna estrecha con un hueco grande debajo de la foto).
- **`comprobar`**: ya no avisa de enlaces con ancla (`/dependencia/grados/#revision-del-grado`) como si la página no existiera; ahora compara sin el `#`, igual que el publicador.
- **Velocidad (Lighthouse)**: sin anuncios, móvil 85-99 en portada (varía entre mediciones por la carga del procesador), 88 guía, 87 categoría, 90 calculadora; ordenador 98 portada y 97 guía; accesibilidad, buenas prácticas y SEO 100. Con AdSense, móvil 46 portada y 55 guía: los anuncios (unos 300 KB y el aviso de consentimiento) son lo que más pesa y solo se podrán retrasar cuando AdSense apruebe la web. Descartado partir el CSS por plantilla: llega comprimido (32 KB) y el ahorro sería de unos 20 KB por página, con riesgo de romper estilos.
- Comprobaciones: 25 pruebas, `comprobar` sin avisos y `comprobar-web` (312 enlaces y archivos) «Todo correcto».

### Matices de la web, baja por menopausia y programas electorales (22/10/2026, tema 2.11.7)

- **Guía nueva** [Baja por menopausia](https://jubilometro.com/incapacidad/baja-menopausia/) (id 1013): situación especial del Real Decreto-ley 31/2026, sin cotización previa, cobro desde el día siguiente, base del mes anterior al previo, ejemplo de Elena (984,75 € frente a 906,75 €), a quién se aplica y desde cuándo (efectos el 1/12/2026; la guía avisa de que el texto no detalla las bajas iniciadas entre el 21/10 y el 30/11). Enlace corto `baja-menopausia`, dos publicaciones en el banco y enlaces desde la portada de Incapacidad y la guía de la baja. Sin imagen destacada (StockSnap y Flickr bloqueados desde el servidor).
- **Barrido de matices**: plazos vencidos escritos en futuro (44 casos revisados, uno corregido), fechas «a día de» antiguas (viajes autonómicos: situación a 22/10 comprobada en las webs de Castilla-La Mancha y Madrid, más las 350 plazas gratuitas para cuidadores de Madrid), pie de la guía de la baja y cifras clave cruzadas entre guías (máxima, mínimas, no contributiva, salario mínimo, IPREM y límite de ingresos): todas coinciden.
- **Programas electorales**: a 22/10 ningún partido ha publicado su programa del 29N (solo hay frases de mítines en webs de terceros). Del 2023 solo se pudo leer el programa oficial del PSOE: el del PP en su web es un resumen sin pensiones, el de Vox lo bloquea su web y el de Sumar no está en su web. Para no publicar algo parcial, la guía de elecciones explica los criterios de la comparativa (solo documentos oficiales, mismos partidos y preguntas, sin valoraciones) y una tarea diaria revisa las webs oficiales. Decisión del usuario (22/10): cuando salga toda la información se crea una sección propia «Elecciones 2026» (categoría nueva) con la comparativa y una guía por partido; como tarde el 13/11, inicio de la campaña.

### Real Decreto-ley 31/2026 y guía de Navarra (21/10/2026, tema 2.11.6)

- **[Real Decreto-ley 31/2026](https://www.boe.es/buscar/doc.php?id=BOE-A-2026-21872)** (BOE del 21/10/2026, en vigor ese día; tiene que convalidarlo la Diputación Permanente del Congreso en 30 días). Guías actualizadas con el texto oficial, sustituyendo los avisos «pendiente del BOE»:
  - **Pareja de hecho, requisitos, solicitar viudedad y prestación temporal**: con hijos en común bastan dos años de convivencia acreditados con el padrón, sin inscripción (art. 221.2 LGSS). Fallecimientos anteriores al 21/10/2026: se puede pedir hasta el 21/10/2027, con efectos desde el mes siguiente (DT 48.ª); rehabilitación de las pensiones suspendidas de la derogada DA 40.ª.
  - **Divorcio y separación**: en los divorcios y separaciones anteriores a 2008 ya no se exige no tener otra pensión pública (DT 13.ª.2); rehabilitación de las suspendidas hasta el 21/10/2027.
  - **Orfandad**: por violencia contra la mujer, mínimo del doble del SMI al mes (2.442 € en 2026) y no se pierde con la adopción (art. 224).
  - **Baja**: situaciones especiales por menopausia y por violencia de género, sin cotización mínima y pagadas desde el día siguiente; base reguladora del mes anterior al previo a la baja; 75 % menos de cotización empresarial durante la baja de los mayores de 62; todo con efectos el 1/12/2026. Catástrofes: las leyes futuras «podrán» asimilar las prestaciones a contingencia profesional (DA 64.ª), no es automático.
  - Banco de redes: 5 publicaciones corregidas, carrusel «dudas de viudedad» (diapositiva 3) y vídeo 22 (pareja de hecho) rehechos.
- **[Dependencia en Navarra](https://jubilometro.com/dependencia/navarra/)** (id 992), la guía de comunidad que faltaba: Ley Foral 1/2011 (Lexnavarra), estatutos de la Agencia Navarra de Autonomía y Desarrollo de las Personas (DF 60/2024) y datos del Imserso a 30/9/2026. Navarra.es daba error 500/503 por la mañana; los documentos y el teléfono se añadieron por la tarde con la ficha oficial. Imagen CC0 del puente de las Oblatas (Zarateman, Wikimedia Commons). Enlazada desde la portada de Dependencia, solicitar y tiempos; enlace corto `dependencia-navarra` (tema 2.11.6) y publicación de X en el banco. La portada de Dependencia pasa de 302 a 293 días (dato de septiembre).
- Comprobaciones: 25 pruebas, `comprobar` y `comprobar-web` (311 enlaces y archivos) sin fallos; Navarra en el sitemap y en llms.txt.
- **Tarde del 21/10**: la ficha oficial de Navarra ya respondió (a través de Apify) y la guía tiene los documentos (solicitud, informe de salud, valoración económica, documentación, tutela, guarda de hecho, representación), la presentación por internet con Cl@ve, certificado o DNIe, la dirección de la Agencia (González Tablas, 7, Pamplona), el teléfono 848 426 900 y las ayudas propias de la Orden Foral 62/2013. Portadas revisadas una a una y cifras contrastadas con sus guías: Viudedad (parejas con hijos en común, divorcios anteriores a 2008 y nuevo matrimonio, que reduce la pensión en vez de quitarla), Imserso (pago en 48 horas con 45 días o menos y lista de espera del termalismo hasta el 31/10) y Dependencia. Axe sin fallos en Navarra, pareja de hecho y baja.

### Revisión a fondo del 20/10/2026: reforma de la dependencia, datos del Imserso y texto de las 143 guías

- **Reforma de la ley de dependencia** ([Ley 4/2026](https://www.boe.es/buscar/doc.php?id=BOE-A-2026-20528), en vigor el 23/10/2026): sección y tabla «Qué cambia» en la guía de la ley y cambios en cuidados familiares (convivencia con vivienda próxima, derechos de la cuidadora, fin del aplazamiento de dos años), teleasistencia para todos los grados, ayuda a domicilio, centro de día, grados, grado de discapacidad (33 % y 65 %), reclamar (plazo de 3 meses del art. 28.1), tiempos, solicitar, precio de residencias y residencias públicas. Compatibilidad de todas las ayudas en casa antes del 1/1/2030.
- **Datos del Imserso a 30/9/2026** en las 16 guías de comunidades y en la de tiempos (tablas rehechas a partir del Excel, no con sustituciones). Cataluña: Decreto-ley 4/2026 (100, 150 o 200 € al mes mientras esperas) y 1/2026; Canarias: tabla de cuantías máximas propias; Extremadura: grado III+ y ELA. Sin enlaces a `/dependencia/navarra/`, que aún no existe.
- **Real decreto-ley del Consejo de Ministros del 20/10** (aún no está en el BOE): aviso con la fuente de La Moncloa en viudedad (requisitos, pareja de hecho: hijos en común y dos años de convivencia sin inscripción), orfandad y bajas (menopausia, violencia de género, catástrofes). Comprobación programada en el BOE el 21/10.
- **Otras normas de 2026**: pasarela al RETA de los mutualistas en autónomos y RDL 19/2026 en jubilación parcial.
- **Revisión del texto de las 143 guías**, en 7 lotes de unas 20, frase a frase y rehaciendo cada cuenta: erratas, concordancias, tiempos verbales de 2026, metas, tablas que no cuadraban, fechas de ejemplo que caían en fin de semana, medias por fases que parecían sumas y preguntas frecuentes que no recogían la reforma. Cada propuesta se comprobó antes de aplicarla, y tres se descartaron por ser incorrectas: en un nuevo matrimonio, la viudedad **se reduce** si los ingresos pasan de 2 veces el SMI, no se pierde (Orden de 13/2/1967, art. 11.1.c); la incapacidad pasa a llamarse jubilación «a los sesenta y siete años» (LGSS art. 200.4); y la reducción del 40 % al rescatar varios planes en el año de la contingencia y los dos siguientes es correcta (AEAT y TEAC de 24/10/2022). Imserso: en los turnos de octubre y noviembre con menos de 45 días se paga todo al reservar (BOE-A-2026-12865). IRPF de la renta vitalicia: el 8 % es «con 70 años o más».
- **Resultado**: 89 guías actualizadas el 20/10 (29 de dependencia, 17 de jubilación, 9 de viudedad, 9 de dinero, 7 de incapacidad, 6 de ayudas, 6 de cuánto cobraré, 5 del Imserso y la de la calculadora de edad, que no se sube porque la web usa su propia página). Pruebas, `comprobar` y navegador en verde. Subidas con `--solo` y comprobadas en vivo, frase a frase. Banco de redes revisado (un redondeo: 1.177 €) y calendario de ejemplo regenerado.
- **Web en vivo**: accesibilidad (axe), SEO, HTML, Lighthouse, capturas, rastreo y enlazado interno sin fallos. Las políticas de privacidad y cookies publicadas ya explican las estadísticas sin cookies (versión del 9/10); `paginas/` queda al día solo como copia para una instalación nueva.

### Revisión de SEO, rastreo y AdSense (15/10/2026, tema 2.11.5)

- **Rastreo**: 170 URL del sitemap, 488 direcciones propias, ninguna rota. SEO sin fallos (título, descripción, canónica, robots, Open Graph, un h1, JSON-LD válido, nada duplicado). `dateModified` y `lastmod` del sitemap al día. IndexNow activo (clave 200). llms.txt incluye las guías nuevas.
- **AdSense**: `ads.txt` correcto; `google-adsense-account` en todas las páginas y `adsbygoogle.js` en guías, temas y portada (no en calculadoras ni legales, a propósito). El mensaje de consentimiento de Google (TCF) está activo (`__tcfapi`, `googlefcPresent`) y los anuncios automáticos también; desde el servidor de pruebas (fuera de la UE) el hueco sale «unfilled». Botón «Configurar cookies» en el pie y políticas con la revocación.
- **Velocidad (Lighthouse local, móvil)**: portada 78, guía de edad 84; accesibilidad, SEO 100; prácticas 79 (solo por AdSense). LCP de la guía 3,7 s: la foto (55 KB) compite con unos 375 KB de AdSense y del mensaje de consentimiento. Mejora propuesta tras la aprobación: cargar AdSense después del contenido.
- **Estadísticas propias (30 días)**: 151 vistas, 50 desde Google; la guía que más entra desde Google es la de militares, seguida de edad de jubilación, Guardia Civil, bomberos y Policía Nacional. Enlaces nuevos hacia militares desde funcionarios, Guardia Civil y edad de jubilación.

### Tres guías nuevas y sus publicaciones (tema 2.11.4, 12/10/2026)

- **[Prejubilación](https://jubilometro.com/jubilacion/prejubilacion/)** (id 848): convenio especial en los despidos colectivos de trabajadores de 55 años o más (art. 51.9 del Estatuto de los Trabajadores, DA 13.ª LGSS, art. 20 de la Orden TAS/2865/2003). La empresa paga hasta los 63 (61 por causas económicas), base de los últimos seis meses, quién lo pide y en qué plazo, indemnización y su IRPF, aportación al Tesoro y el ejemplo de Javier. Enlazada desde despido a los 60, anticipada involuntaria, subsidio de 52 y convenio especial. Enlace corto `prejubilacion`.
- **[Número de la Seguridad Social](https://jubilometro.com/jubilacion/numero-seguridad-social/)** (id 846): qué es (RD 84/1996), dónde verlo, cómo pedirlo en Import@ss sin certificado (selfi) y para menores (modelo TA.1). Enlazada desde cita previa, vida laboral, trámites por internet y jubilación por internet. Enlace corto `numero-ss`.
- **[Emigrantes retornados](https://jubilometro.com/ayudas/emigrantes-retornados/)** (id 836): subsidio de la DA 57.ª LGSS (570, 540 y 480 € en 2026, hasta 18 meses, plazos desde la vuelta), certificado de la Delegación del Gobierno y sus papeles, pensión asistencial por ancianidad (art. 25 del RD 8/2008: 733,60 € en 12 pagas), sanidad (Ley 16/2003 y art. 26 del RD 8/2008, reformado en marzo de 2026) y ayudas de la Xunta. Enlazada desde trabajar en otro país, pensión en el extranjero, no contributiva y subsidio de 52. Enlace corto `retornados`. La web del Ministerio de Inclusión no deja entrar a los robots: los datos salen del BOE, del SEPE y de la Delegación del Gobierno en Cantabria.
- **Imágenes**: dos fotos de StockSnap y un grabado de Winslow Homer (1857, Museo de Arte de Cleveland, CC0), con sus créditos.
- **Banco de redes**: 14 publicaciones nuevas (308 en total), 3 carruseles (33) y 2 imágenes con la cifra (13). Calendario de ejemplo y vista previa en PDF rehechos; la vista previa estrecha las diapositivas de los carruseles de más de 8.

### Banco de publicaciones para la aprobación (tema 2.11.3, 12/10/2026)

- **Banco sin fechas** (`herramientas/redes/banco/`): 294 publicaciones sacadas de las guías y calculadoras, para X (123), Facebook (65), Instagram (30 carruseles), canal de WhatsApp (23), LinkedIn (16), grupo (13 preguntas de la semana y normas) y vídeo (24). Una por tema: jubilación, cuánto cobraré, viudedad, incapacidad, ayudas y dinero, dependencia (una por comunidad, con sus días reales de espera), Imserso, calculadoras, lanzamiento y vídeos. `node herramientas/redes/banco/index.mjs` lo comprueba todo: enlaces cortos que existen y con el final de su red, 280 caracteres en X, sin rayas largas ni «No es X, es Y», sin enlaces en Facebook, Instagram ni en el texto de LinkedIn, y vídeos hechos.
- **Primer mes reutilizable**: cada publicación de `mes-1.mjs` lleva `banco: 'perenne'` (con `hasta` si caduca) o `'fijo'` (solo vale en su fecha). La presentación de Facebook y la primera pregunta del grupo son de lanzamiento.
- **Programador** (`herramientas/redes/programar.mjs --inicio=AAAA-MM-DD [--semanas=12]`): reparte el banco y el primer mes desde el día de la aprobación con el ritmo de cada red, primero lo que caduca, rotando de tema y sin repetir guía en tres días; hasta fin de año van antes las publicaciones con importes de 2026 y avisa de las que salen desde enero con cifras de 2026. Deja en `publicacion/redes/programado/` el programa, el calendario y el CSV de Metricool (con `calendario.mjs`, que ahora acepta notas, imágenes y carpetas por publicación).
- **Imágenes del banco**: `kit.mjs --banco` hace los 30 carruseles (`publicacion/redes/banco/carruseles/<id>/`) y las 11 imágenes con la cifra (`cifras/<id>.png`), con `index.html` para verlas. Los números grandes ya no se confunden con fechas al resaltarlos («879.213 de octubre»).
- **Vídeos 5 a 36** (`videos.mjs`): los 8 guiones del primer mes, ya hechos, y 24 nuevos (SOVI, auxilio por defunción, baja, jubilarse antes, mínimos, dependencia, viudedad, incapacidad, jubilación activa y flexible, vida laboral, el 017, vender la casa, herencias, teleasistencia, trabajar fuera, discapacidad, ayuda a domicilio). Del 21 en adelante no llevan importes que cambien en enero.
- **Enlaces cortos**: 99 nuevos (154 en total), todos comprobados en vivo con su red al final.
- Instrucciones para el día de la aprobación: `publicacion/redes/banco/LEEME.md`.

### Revisión técnica, kit de redes y portada (temas 2.10.7 y 2.11.0, 12/10/2026)

- **Rastreo de la web en vivo**: 164 URL del sitemap, 470 direcciones propias, ninguna rota; SEO y datos estructurados sin fallos; ninguna página huérfana. Navegador (24 páginas, 1440 y 390 px): axe sin fallos, sin errores de JavaScript ni desbordes. Calculadoras (e2e): todas bien.
- **Enlaces externos**: 881, ninguno roto. Avisos que no son fallos: el botón de compartir de Facebook (no deja entrar a robots), medios que bloquean robots (403) y webs autonómicas que no responden a servidores (Xunta, GVA, Imserso, La Rioja, Asturias, Navarra).
- **Velocidad (Lighthouse, móvil)**: sin anuncios, portada 82, guías 95, calculadora 87; accesibilidad y SEO 100, CLS 0. Con AdSense y su mensaje de consentimiento la portada baja a 39-57: no se toca el código de AdSense mientras Google revisa la web. El grabado de las cabeceras se dibuja ahora cuando el navegador está libre (el texto de guías y artículos aparece antes). `content-visibility` sigue quitado a propósito (2.7.1).
- **Compartir por WhatsApp**: `esc_url()` quitaba el salto de línea entre el título y el enlace; el bloque de compartir lo arma ahora con `rawurlencode` y `esc_attr()`.
- **Estadísticas propias**: funcionan; del 9 al 12 de octubre, 81 vistas (20 desde Google, 1 desde ChatGPT, 1 desde WhatsApp), tres de cada cuatro desde el móvil.
- **Enlaces internos nuevos** hacia «Cuánto ahorrar para jubilarte» y el simulador desde cinco guías.
- **Kit de redes** (`herramientas/redes/kit/`): `NODE_PATH=$(npm root -g) node herramientas/redes/kit/kit.mjs` genera en `publicacion/redes/kit/` la foto de perfil, las portadas de cada red con sus zonas seguras, las diapositivas de los carruseles del mes (1080 × 1350, sacadas de `diapositivas` en `mes-1.mjs`) y las imágenes con la cifra (`cifras.mjs`), más `index.html` para verlas. Comprueba que ningún texto se sale de su caja ni de la zona segura. Los carruseles con corchetes por rellenar no se generan hasta el día del dato. Textos de los perfiles: `publicacion/redes/kit/biografias.md`. El calendario del mes dice qué imagen va con cada publicación.
  - Para rehacer una pieza: cambiar el texto en `mes-1.mjs` o `cifras.mjs` y ejecutar con `--solo=carruseles` o `--solo=cifras`.
- **Portada (tema 2.11.0)**: «Once calculadoras» (antes decía nueve) con dos fichas nuevas: la subida de 2027 (etiqueta «Novedad», justo al lado de la calculadora de pensión) y el simulador. Los accesos de arriba pasan de «Lo más consultado» a «Ahora mismo»: subida de 2027, elecciones y pensiones, edad de jubilación y viajes del Imserso (`parts/home-mast.html`; renovarlos tras el 29N y el 1 de enero).
- **Guías nuevas (12/10/2026)**: [pensión del SOVI](https://jubilometro.com/jubilacion/pension-sovi/) (id 822; 599,60 € y 582,10 € en 2026, los 112 días por parto antes de 1967 según el Supremo) y [auxilio por defunción](https://jubilometro.com/viudedad/auxilio-por-defuncion/) (id 824; 46,50 €, quién lo genera, modelo MS-5). Enlazadas desde 15 años cotizados, me faltan años, seguro de decesos, solicitar la viudedad y fallecimiento de un pensionista. Enlaces cortos `sovi` y `auxilio-defuncion` (tema 2.11.1). Fichas de verificación en cada carpeta.
- **[Cuánto se cobra de baja](https://jubilometro.com/incapacidad/cuanto-se-cobra-de-baja/)** (id 833, 12/10/2026): 60 % del día 4 al 20 (RD 53/1980), 75 % desde el 21 (Decreto 3158/1966), quién paga cada tramo (art. 173 LGSS), base reguladora, ejemplo de 30 días, despido durante la baja (art. 283) y parte sin entregar a la empresa (RD 1060/2022). Enlazada desde la baja de larga duración; enlace corto `baja` (tema 2.11.2).
- **Miniaturas en el móvil**: en las listas de guías (categorías, «Sigue leyendo» y los bloques de cuatro) solo la primera foto va a todo el ancho; las demás piden una imagen de 104 px. En la página de Jubilación, las fotos pasan de 2,3 MB a 1,5 MB.

### Medición, enlaces cortos y redes (tema 2.10.2, 9/10/2026)

Para saber qué trae visitas sin depender de Google Analytics ni de un aviso de cookies nuevo.

- **Estadísticas propias** (`inc/estadisticas.php`): una señal por página vista y otra por botón pulsado, guardadas como sumas por día en la tabla `wp_jm_stats` (sin IP, sin cookies, sin nada en el dispositivo). Cuenta visitas, entradas por origen (Google, Bing, ChatGPT y otras IA, Facebook, X, WhatsApp, correo…), páginas de entrada, campañas de los enlaces cortos, dispositivo, direcciones que dan 404 y botones (compartir, seguir, calculadoras, newsletter, escuchar, imprimir). No cuentan los robots ni quien tiene la sesión iniciada. «Lo más leído» sigue igual (lecturas de 4 s o más).
  - Panel: **Escritorio › Estadísticas** en WordPress (hoy, 7, 30, 90 días o un año).
  - Para herramientas: `GET /wp-json/jm/v1/estadisticas?dias=30` con usuario y contraseña de aplicación.
  - El 9/10/2026 entraron tres visitas de prueba (una por WhatsApp, una 404 de prueba y una guía).
- **Enlaces cortos** (`inc/difusion.php`, lista en `inc/data.json` → `cortos`): `jubilometro.com/subida` lleva a la calculadora de la subida; con la red al final (`/x`, `/fb`, `/ig`, `/tt`, `/yt`, `/in`, `/wa`, `/tg`, `/nl`) llega con `utm_source`. Redirección 302 sin caché (la CDN de Hostinger no la guarda) y `noindex`. La web quita las etiquetas `utm_` de la barra al llegar. Una prueba (`npm test`, 25 pruebas) vigila que cada código lleve a una página que existe y no tape ninguna dirección de la web.
- **Compartir**: al final de cada guía y de cada calculadora, «¿Le puede servir a alguien?» con WhatsApp (el primero y más grande), Facebook, X, correo, copiar enlace y el menú de compartir del móvil. Los enlaces de WhatsApp y correo llevan su etiqueta.
- **Perfiles sociales**: opción `jm_redes` (por la API: `POST /wp/v2/settings {"jm_redes": {"x": "https://x.com/…", "whatsapp": "https://www.whatsapp.com/channel/…"}}`). Mientras esté vacía no se ve nada; con perfiles salen en el pie («Síguenos»), en el `sameAs` de la organización y, el canal de WhatsApp, en el bloque de compartir.
- Política de privacidad y de cookies actualizadas (9/10/2026) con la estadística de visitas.
- **Primer mes de redes** (12/10 a 8/11/2026): `herramientas/redes/mes-1.mjs` → `node herramientas/redes/calendario.mjs herramientas/redes/mes-1.mjs primer-mes` genera `publicacion/redes/primer-mes/calendario.html` (93 publicaciones con botón de copiar) y `metricool.csv` (56 de X, Facebook y LinkedIn como borrador). El generador para si un enlace corto no existe, si algo de X pasa de 280 caracteres o si una publicación de Facebook lleva enlace.
- **Vídeos «La cifra en 30 segundos»**: `herramientas/redes/videos/videos.mjs` (guiones) y `construir.mjs` (un proyecto de HyperFrames por vídeo); los MP4 están en `publicacion/redes/videos/`. Para rehacer uno (por ejemplo, la subida con el IPC nuevo): cambiar su escena, `node herramientas/redes/videos/construir.mjs <carpeta> <gsap.min.js>` y `hyperframes render` en la carpeta del vídeo.
- **Mantenimiento**: añadir un enlace corto nuevo a `cortos` en `inc/data.json` y empaquetar el tema; cuando existan las cuentas, guardarlas en `jm_redes`.

### Revisión completa de cierre (tema 2.9.1, 7/10/2026)

- **SEO de las 163 URL del sitemap**: título, descripción, canónica, robots, og:image, un solo H1 y JSON-LD válido en todas; sin títulos ni descripciones repetidos.
- **Datos estructurados**: Article (con imagen y fechas), BreadcrumbList y FAQPage completos. El simulador y la calculadora de la subida no tenían WebApplication: desde el tema 2.9.1 la pone el tema a cualquier calculadora de `inc/data.json` que no la tenga.
- **Enlaces**: 467 URL propias, todas 200. De los 562 enlaces externos ninguno está roto: los que fallan son el botón de Facebook (no deja entrar a robots) y webs de la Administración que bloquean conexiones desde servidores (Xunta, Imserso, GVA, La Rioja, Asturias). Volver a mirarlas a mano si Search Console avisa.
- **Enlazado interno**: ninguna página huérfana. Más enlaces a «cómo reservar» y «plazas libres» del Imserso (desde la guía de viajes), al convenio del cuidador, al seguro de decesos, al ahorro para la jubilación y a la universidad para mayores.
- **Generador**: en «Siguiente paso», un punto con varios enlaces solo publicaba el primero (pasaba en 10 guías). Ahora cada enlace da su tarjeta; lo vigila una prueba (`npm test`, 24 pruebas).
- **Navegador** (19 tipos de página, 1440 y 390 px): sin errores de JavaScript propios, sin desbordes, sin imágenes rotas y axe sin fallos. Un error «int64» que apareció una vez venía de los anuncios de Google y no se repite.
- **Plazos**: los vencidos (ayudas de vivienda de Cataluña, vivencia de pensiones en el extranjero, 30/9) ya están en pasado.
- **Pendiente fuera del código**: la aprobación de AdSense (revisión de Google en curso) y el mantenimiento del IPC del calendario (14/10, 30/10, 13/11 y 27/11).

### Portada «Explora las guías» y fondos de aurora (tema 2.8.8, 7/10/2026)

La cabecera de la portada ya no lleva la guía destacada a la derecha: lleva un panel de cristal con los temas en una fila de iconos (como la de la tienda de Apple) y cinco guías de cada uno. La primera lista es «Más leídas» (lecturas del mes; si aún no hay, «Esenciales»); las demás, las guías pilar de cada tema y, si faltan, las más recientes.

- Código: `jm_browse()` y `jm_browse_row()` en `inc/historias.php` (las guías pilar están en `jm_pilares()`, compartidas con «Guías por tema»), `initBrowse()` en `jubilometro.js` y la capa «v6 · CRISTAL» al final de `jubilometro.css`.
- Interacción: clic, flechas del teclado (Inicio y Fin también), deslizar con el dedo sobre la lista y flechas laterales con ratón. Sin JavaScript se ve la primera lista y cada tema enlaza a su página. Con «reducir movimiento», todo cambia sin animación.
- Las fotos de cada tema se piden al abrirlo (o al acercar el ratón a su icono): la portada no carga 45 miniaturas de golpe.
- Fondos: luces de aurora en la portada (con un foco que pasa por detrás del cristal al mover el ratón), en las cabeceras de páginas y guías, en las secciones de color y en el pie.
- Tipografías con `font-display: optional` (2.8.8): si la letra no llega a tiempo, esa visita sigue con la de reserva. Quita el salto de diseño del móvil (CLS 0,28 → 0), que venía de que el texto de entrada cambiaba de 4 a 3 líneas al llegar la letra.
- Comprobado en vivo: axe sin fallos en escritorio y móvil, sin errores de JavaScript ni desbordes; Lighthouse accesibilidad y SEO 100, CLS 0. Las «buenas prácticas» bajan a 79 solo por AdSense (cookies de terceros y una API antigua de Google); sin anuncios dan 100.
- **Mantenimiento**: si se crea un tema nuevo, añadir sus guías pilar en `jm_pilares()` y, si tiene calculadora propia, en el mapa `$calc` de `jm_browse()`.

### Simulador de jubilación animado (tema 2.8.4, 6/10/2026)

Página bandera: [/calculadoras/simulador-jubilacion/](https://jubilometro.com/calculadoras/simulador-jubilacion/) (id 779), palabra clave «simulador de jubilación». Tres datos en una frase y cinco capítulos: cuándo (cuenta atrás en tablillas y cinta de la vida laboral), cuánto (base reguladora × porcentaje), elige tu momento (deslizador mes a mes con gráfico de lo cobrado en total), neto (IRPF de tu comunidad) y resumen con enlace para compartir (datos en el #).

- Motor: el de `calculadoras.js` (cero cifras propias). Script `simulador.js` y hoja `simulador.css` solo en esa página. Brief: `publicacion/simulador/BRIEF.md`.
- Enlazada desde el índice de calculadoras, el pie, el buscador, llms.txt y la portada (el enlace del bloque «¿Cuándo te jubilas?» lleva los datos ya escritos).
- **Mantenimiento**: al cambiar `CFG` (enero, o la subida oficial), volver a ejecutar `node herramientas/calculadoras/simulador-jubilacion.mjs publicacion/paginas-vivas/calculadoras__simulador-jubilacion.html publicacion/paginas-vivas/calculadoras.html`.
- **Search Console**: pedir la indexación de la URL.

### Jubilación por profesión (6/10/2026)

Búsquedas del tipo «jubilación guardia civil», «a qué edad se jubila un maestro» o «jubilación policía local»: mucha demanda y respuestas dispersas. Cada guía va con su `verificacion-fuentes.md` (texto consolidado del BOE por su API), imagen CC0 y cifras de Clases Pasivas de 2026 cuando aplica.

- Con coeficientes reductores: [policía local](https://jubilometro.com/jubilacion/policia-local/), [bomberos](https://jubilometro.com/jubilacion/bomberos/) y [Régimen del Mar](https://jubilometro.com/jubilacion/regimen-del-mar/).
- Con reglas propias: [empleadas de hogar](https://jubilometro.com/jubilacion/empleadas-de-hogar/), [Guardia Civil](https://jubilometro.com/jubilacion/guardia-civil/) (reserva a los 58 o 61), [Policía Nacional](https://jubilometro.com/jubilacion/policia-nacional/) (segunda actividad), [militares](https://jubilometro.com/jubilacion/militares/) (reserva y tropa a los 45), [docentes](https://jubilometro.com/jubilacion/docentes/) (fin de curso, universidad a los 70) y [trabajadores agrarios](https://jubilometro.com/jubilacion/agrarios/) (cuotas de inactividad 2026).
- Enlazadas desde la portada de Jubilación, «anticipada por profesión», funcionarios, autónomos y cuidadora interna o externa.
- **Mantenimiento**: cada enero, actualizar los haberes reguladores de Clases Pasivas (guardia civil, policía nacional, militares, docentes y funcionarios a la vez) y las cuotas de inactividad agrarias con la orden de cotización del año. Si se aprueba un coeficiente reductor para Guardia Civil o Policía Nacional, cambiar las dos guías y la de «anticipada por profesión».
- **Search Console**: pedir la indexación de las nueve URL.

### Calculadora de la subida de las pensiones (tema 2.7.2, 5/10/2026)

Nueva página [/calculadoras/subida-pensiones/](https://jubilometro.com/calculadoras/subida-pensiones/) (id 718), con URL sin año para que acumule enlaces de un año a otro (el año va en el título). Las búsquedas «subida pensiones 2027» y «calculadora subida pensiones» se disparan de finales de noviembre a enero: tiene que estar al día con cada dato del IPC (ver el calendario de mantenimiento).

- Motor en `calculadoras.js` (`subida`, `CFG.subida`); página generada con `herramientas/calculadoras/subida-pensiones.mjs`.
- Enlazada desde el índice de calculadoras, la guía de revalorización (respuesta rápida, texto y ficha de calculadora) y la página para otras webs (ya son diez calculadoras insertables).
- Desde el tema 2.7.2, las preguntas frecuentes en desplegable de las páginas (no solo de las guías) también salen como FAQPage.

### Calculadoras para otras webs (tema 2.5, 2/10/2026)

Para ganar enlaces y visitas: cualquier web puede insertar nuestras calculadoras con el código de [/calculadoras/para-tu-web/](https://jubilometro.com/calculadoras/para-tu-web/).

- Cada calculadora tiene una versión insertable en `/calculadoras/<calculadora>/insertar/`: solo el formulario y el resultado, sin menús, anuncios ni cookies, con `noindex` y canónica a la calculadora. Es la única URL que se puede enmarcar desde otra web.
- El tema saca esa versión del bloque `<section aria-label="Calculadora">` de la página: **no quitar ni renombrar esa sección** al editar una calculadora en WordPress.
- El código lleva un crédito visible con el nombre de marca («Calculadora de … de Jubilómetro»), sin palabras clave en el enlace, como piden las normas de Google para widgets, y el script opcional `assets/js/insertar.js`, que ajusta la altura.
- Debajo de cada calculadora y en el índice de calculadoras hay una invitación a ponerla en otra web.
- Siguiente paso (punto 3c): ofrecerlas a asociaciones de mayores, sindicatos, gestorías y blogs de finanzas personales.

## 7. Calendario de mantenimiento

| Fecha | Qué revisar |
|---|---|
| Antes del 13 de noviembre de 2026 | Programas electorales publicados: añadir a `/cuanto-cobrare/elecciones-y-pensiones/` lo que dice cada candidatura sobre pensiones (subida, edad, mínimas, anticipada sin recorte), con enlace a su programa y sin valoraciones |
| 27 de noviembre de 2026 (último día de campaña) | IPC adelantado de noviembre: subida de 2027 en la guía de elecciones además de en revalorización, calculadora y vídeo |
| Del 30 de noviembre de 2026 a enero de 2027 | Gobierno en funciones: si aprueba (o no) el real decreto-ley de revalorización y cuándo se cobra la subida; actualizar elecciones, revalorización y calculadora |
| 23 de diciembre de 2026 | Nuevas Cortes: comprobar si se vuelve a registrar la proposición de jubilación anticipada sin recortes con 40 años cotizados (decayó con la disolución del 6/10/2026). Afecta a esa guía y a anticipada voluntaria, anticipada involuntaria, compensa, despido a los 60 y edad de jubilación |
| Octubre-diciembre 2026 | Desarrollo del RD 632/2026 (discapacidad) y primeros criterios del INSS sobre la jubilación flexible del RD 416/2026 |
| 14 de octubre, 30 de octubre, 13 de noviembre y 27 de noviembre de 2026 | IPC del INE (definitivo de septiembre, adelantado de octubre, definitivo de octubre, adelantado de noviembre): actualizar la estimación de la subida de 2027 en la guía de revalorización, en `CFG.subida` y en la lista `IPC` de `herramientas/calculadoras/subida-pensiones.mjs`; empaquetar el tema y volver a ejecutar ese script, que reescribe la página de la calculadora. Si cambia la horquilla, rehacer también el vídeo de la subida (`herramientas/redes/videos/videos.mjs`) y los textos con corchetes del calendario de redes. Con el dato de noviembre, la subida ya es la definitiva |
| Finales de diciembre de 2026 | Real decreto de revalorización: `CFG.subida.oficial = true`, cuantías mínimas y de la PNC de 2027 en la calculadora y en la guía |
| Cada trimestre | Teléfonos y horarios de cita previa y de información de la Seguridad Social (guía oficial) y servicios del certificado de pensión; la Seguridad Social anunció que el informe de edad legal incluirá bonificaciones de edad y un informe de jubilación parcial |
| Hacia el 19 de noviembre de 2026 (30 días desde el 20/10) | Convalidación (o derogación) del Real Decreto-ley 31/2026 por la Diputación Permanente del Congreso: si se tramita como proyecto de ley o decae, revisar viudedad (pareja de hecho, requisitos, divorcio, solicitar, temporal), orfandad y baja |
| 1 de diciembre de 2026 | Efectos de las bajas especiales por menopausia y violencia de género, de la nueva base reguladora de la baja y de la reducción de cuotas de los mayores de 62: pasar a presente la guía de cuánto se cobra de baja |
| 23 de octubre de 2026 | Entra en vigor la Ley 4/2026 de dependencia: repasar que las guías hablen en presente, y seguir el real decreto nuevo de la prestación por cuidados familiares (mientras, rige el RD 1051/2013) |
| 1 de noviembre de 2026 | Cataluña: vence el plazo de la Generalitat para empezar a pagar la ayuda mientras esperas (Decreto-ley 4/2026); pasar el texto a pasado y añadir lo que se sepa del pago |
| 28 de noviembre de 2026 (y cada mes, tras la nota de la Seguridad Social) | Tabla de pensión media por provincia y texto de la portada `/datos/` con la nómina del mes: `node herramientas/datos/pension-provincia.mjs --excel=… --mes=AAAA-MM --fuente=… --altas=…` (primero sin `--subir`) y `subir-portadas.mjs --solo=datos`. Octubre hecho el 29/10 |
| 1 de noviembre de 2026 | Plazos de termalismo del IMSERSO (requisitos de los viajes y termalismo) |
| 16 de diciembre de 2026 | Termalismo de Castilla-La Mancha y plazos autonómicos (turismo autonómico) |
| 1 de enero de 2027 | Haberes reguladores de Clases Pasivas de 2027 (anexo del real decreto-ley o la ley de presupuestos) y pensión máxima en la guía de funcionarios |
| 1 de enero de 2027 | Revalorización: pensiones mínimas, límite de ingresos del complemento a mínimos, base mínima de cotización (convenio especial, subsidio de mayores de 52), pensión no contributiva. Cambiar «2026» por «2027» en los títulos que lo llevan (activa, parcial, autónomos, discapacidad, subsidio, 15 años, solicitud por internet, flexible) y actualizar `fecha_actualizacion` e historial de cambios. Cambiar también `CFG` en `tema/jubilometro/assets/js/calculadoras.js` (máxima, mínimas, límite de ingresos, bases, fecha) y empaquetar el tema; los ejemplos de las calculadoras se actualizan solos. Ayudas al transporte del RDL 17/2025 y abono de Cercanías en 2027 |
| 1 de enero de 2027 | Entra en vigor el último escalón de la reforma (67 años, 38 años y 6 meses, 37 años para el 100 %). Revisar que el texto hable en presente y no en futuro |
| Octubre-diciembre 2027 | Nuevo concierto sanitario de MUFACE (el actual acaba el 31/12/2027): entidades y plazos de cambio en la guía de funcionarios |
| Enero 2028 | Retitular las páginas «2027» con el año nuevo solo si el contenido cambia de verdad |

Cada cambio de datos: editar el `articulo.md`, anotarlo en el «Historial de cambios» del artículo y en su `verificacion-fuentes.md`, y regenerar.
