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

**Tema 2.4 · «Archivo»: atmósfera vintage e interactiva (30/09/2026, instalado por la API; 2.4.2 el último)**: el titular pide «una atmósfera más vintage pero muy interactiva». Papel color crema con un grano muy fino, colores cálidos y cabecera con doble filete. Detrás de la portada, de las cabeceras de página y del título de las guías, un grabado de billete antiguo (guilloché) dibujado en un lienzo que se mueve con el ratón (sustituye a la retícula de puntos); el sello de la portada lleva anillos grabados y «con las cuentas claras», un subrayado de pluma que se traza al cargar. Las fotos llegan en sepia y se revelan en color al entrar en pantalla (color completo al pasar el ratón). Botones como teclas de máquina de escribir que se hunden al pulsarlos; adorno de imprenta sobre los títulos de sección, que se dibuja al llegar; novedades del BOE en hojas de calendario con anillas que giran en 3D; cifras y temas como fichas de archivo; el autor, en un sello de lacre; la libreta de la calculadora rápida recibe un sello de tinta «Calculado» al calcular; el boletín, un sello de correos perforado con matasellos; signo § en los apartados de las guías; barra de lectura de doble filete; cenefa grabada en el pie. Rendimiento cuidado: el grabado se mide cuando la página ya está colocada y se dibuja en tandas (en pantallas táctiles, a resolución normal). Revisión: accesibilidad, buenas prácticas y SEO 100 en siete tipos de página; rendimiento 91 en portada, 98 en guía, 100 en calculadora y datos, 90–95 en temas; axe sin fallos (con y sin movimiento); calculadoras correctas en la web real; 141 páginas y 385 URL propias sin errores; HTML sin problemas; sin desbordes de 320 a 1240 px mientras aparecen los bloques.

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
| 29 de octubre de 2026 | Tabla de pensión media por provincia con la nómina de octubre y texto de la portada `/datos/` |
| 1 de noviembre de 2026 | Plazos de termalismo del IMSERSO (requisitos de los viajes y termalismo) |
| 16 de diciembre de 2026 | Termalismo de Castilla-La Mancha y plazos autonómicos (turismo autonómico) |
| 1 de enero de 2027 | Revalorización: pensiones mínimas, límite de ingresos del complemento a mínimos, base mínima de cotización (convenio especial, subsidio de mayores de 52), pensión no contributiva. Cambiar «2026» por «2027» en los títulos que lo llevan (activa, parcial, autónomos, discapacidad, subsidio, 15 años, solicitud por internet, flexible) y actualizar `fecha_actualizacion` e historial de cambios. Cambiar también `CFG` en `tema/jubilometro/assets/js/calculadoras.js` (máxima, mínimas, límite de ingresos, bases, fecha) y empaquetar el tema; los ejemplos de las calculadoras se actualizan solos. Ayudas al transporte del RDL 17/2025 y abono de Cercanías en 2027 |
| 1 de enero de 2027 | Entra en vigor el último escalón de la reforma (67 años, 38 años y 6 meses, 37 años para el 100 %). Revisar que el texto hable en presente y no en futuro |
| Enero 2028 | Retitular las páginas «2027» con el año nuevo solo si el contenido cambia de verdad |

Cada cambio de datos: editar el `articulo.md`, anotarlo en el «Historial de cambios» del artículo y en su `verificacion-fuentes.md`, y regenerar.
