# Plan de publicación · Categoría 1 «Jubilación»

Estado a 27 de septiembre de 2026: **22 páginas terminadas como borrador** (los 21 artículos del apartado 1 del informe y la calculadora de edad de jubilación, herramienta n.º 94). Ninguna está publicada: todas esperan la revisión profesional.

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
- [x] **Páginas de confianza** (E-E-A-T), escritas en `paginas/` y listas en `publicacion/wordpress-paginas.xml`: Quiénes somos, Política editorial, Contacto, Aviso legal, Política de privacidad y Política de cookies. Titular: Pau Lobato, Palafolls 08389 (Barcelona). Privacidad y cookies ya cubren Google AdSense. Hay que enlazarlas desde el pie (punto 4).
- [ ] **NIF en el aviso legal**: la web se monetiza con AdSense, así que el art. 10 LSSI exige el NIF del titular. Añadirlo en `paginas/aviso-legal/pagina.md` antes de activar los anuncios.
- [ ] Al terminar las correcciones: `npm run publicar` y `npm run comprobar` (todo en «OK»), y usar el `wordpress-borradores.xml` regenerado.

## 3. Inventario y orden de revisión

Ordenado por prioridad (fase del informe, novedad legal y peso en el enlazado interno). «Entrantes» = número de páginas del clúster que enlazan a esta.

| # | URL | Título SEO | Palabra clave principal | Fase | Entrantes | BOE por cotejar |
|---|---|---|---|---|---|---|
| 1 | /jubilacion/edad-de-jubilacion/ | Edad de jubilación en 2027: tabla por año de nacimiento | edad de jubilación 2027 | F1 | 15 | 9 |
| 2 | /calculadoras/edad-de-jubilacion/ | Calculadora de edad de jubilación 2027: tu fecha exacta | calculadora edad de jubilación | F1 | 2 | 3 |
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

## 4. Cómo importar en WordPress (jubilometro.com)

1. **Enlaces permanentes** (Ajustes > Enlaces permanentes): estructura personalizada `/%category%/%postname%/`.
2. **Quitar la base de categoría** para que las URL queden como `/jubilacion/…` y no `/category/jubilacion/…`:
   - Yoast: Yoast SEO > Ajustes > Avanzado > URL de categorías > «Eliminar el prefijo de categorías».
   - Rank Math: Rank Math > Ajustes generales > Enlaces > «Eliminar la base de categoría».
3. **Medios** (Ajustes > Medios): desmarcar «Organizar mis archivos subidos en carpetas basadas en mes y año» y subir estos 3 archivos a la biblioteca. Los artículos ya los enlazan en `/wp-content/uploads/`:
   - `contenido/jubilacion/edad-de-jubilacion/imagenes/edad-jubilacion-2013-2027.webp` (gráfico del artículo)
   - `contenido/jubilacion/edad-de-jubilacion/imagenes/edad-jubilacion-2013-2027.png` (imagen destacada del artículo 1 y para redes sociales)
   - `contenido/jubilacion/documentos-jubilacion/descargas/checklist-documentos-jubilacion.pdf`

   Después puedes volver a activar la opción de carpetas si la usas.
4. **Importar** (Herramientas > Importar > WordPress > Instalar ahora > Ejecutar el importador): subir `publicacion/wordpress-borradores.xml`, asignar las entradas a tu usuario y dejar sin marcar «Descargar e importar archivos adjuntos». Se crean las categorías «Jubilación» (`jubilacion`) y «Calculadoras» (`calculadoras`) y 22 entradas en **borrador**, con su título SEO, meta description y palabra clave en Yoast y en Rank Math.
   Después, importa del mismo modo `publicacion/wordpress-paginas.xml`: crea las 6 páginas de confianza en borrador (Quiénes somos, Política editorial, Contacto, Aviso legal, Privacidad y Cookies). En Apariencia > Menús (o en el editor del sitio) añádelas al menú del pie, y en Ajustes > Privacidad elige «Política de privacidad» como página de privacidad.
5. **Calculadoras**: las páginas 1, 2 y 8 llevan la calculadora en un bloque «HTML personalizado». Importa con una cuenta de **administrador**: WordPress quita los `<script>` a los demás roles. En WordPress.com hace falta un plan que permita HTML con scripts y plugins (Business/Creator o superior). Abre la vista previa y prueba la calculadora antes de publicar.
6. **Imagen destacada** del artículo 1: el PNG subido en el paso 3.
7. **Revisa en la vista previa** de cada borrador: la respuesta rápida, las tablas, los enlaces y la firma.
8. **Datos estructurados**: Yoast o Rank Math ya generan Article, BreadcrumbList, WebSite y Organization. Los `articulo.html` del repositorio llevan su propio JSON-LD solo como referencia: no lo pegues en WordPress o saldrá duplicado.

## 5. Día del lanzamiento

1. Publica las 22 entradas.
2. Comprueba 4 o 5 URL al azar y la calculadora en el móvil.
3. **Google Search Console**: verifica el dominio, envía el sitemap (`/sitemap_index.xml` en Yoast o Rank Math) y pide la indexación manual de las páginas 1, 2, 3, 4 y 7.
4. En la portada y en el menú, enlaza a la guía de edad de jubilación y a la calculadora: son las páginas pilar del clúster.

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
| /cuanto-cobrare/porcentaje-por-anos-cotizados/ | edad de jubilación |
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
