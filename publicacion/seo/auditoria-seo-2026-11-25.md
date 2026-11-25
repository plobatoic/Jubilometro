# Auditoría de SEO y rastreo de Google (25/11/2026)

Pedida por el titular: «una extensa búsqueda de errores o cosas a mejorar. SEO y Google rastreo».

## Qué se ha revisado

- Las **177 páginas** del mapa del sitio (144 guías y 33 páginas), descargadas y analizadas una a una: título, descripción, canonical, robots, H1 y orden de encabezados, texto, datos estructurados, imágenes, enlaces internos, enlaces a apartados (#), contenido mixto http, idioma, imagen para redes y tiempos.
- **30 direcciones de WordPress** que no deberían indexarse (autor, etiquetas, categorías, feeds, búsquedas, paginación, archivos por fecha, mayúsculas, sin barra final, http y www).
- **Lighthouse en móvil** (la prueba de Google) en 6 páginas tipo.

## Lo que está bien

- 177 de 177 responden 200, con un solo H1, canonical propia y sin noindex por error.
- Ningún título ni descripción duplicados; ninguna página sin descripción.
- Ninguna página huérfana: todas a 1 o 2 clics de la portada.
- 0 enlaces internos rotos y 0 enlaces a apartados (#) que no existen.
- Todas las imágenes con texto alternativo y tamaño declarado (sin saltos de diseño: CLS 0).
- Datos estructurados en todas: Article (144), FAQPage (154), BreadcrumbList (176), WebApplication (11), Dataset (5).
- Autor, categorías, etiquetas, búsquedas, paginación y archivos por fecha: 404, noindex o 301 a su sitio.
- http y www llevan a https://jubilometro.com/.
- Lighthouse: SEO 100 y accesibilidad 100 en las seis páginas.

## Arreglado hoy (tema 2.11.47)

1. **Feeds que gastaban rastreo**: cada guía, categoría y los comentarios tenían su feed (/…/feed/), vacío, que Google rastreaba. Ahora llevan con 301 a su página. Solo queda /feed/ (para lectores de RSS), con «noindex». También se quitan del código de cada página el enlace corto ?p= y los enlaces a feeds extra.
2. **Direcciones con mayúsculas** (/JUBILACION/…) daban la misma página con código 200: ahora 301 a la dirección en minúsculas.
3. **Títulos demasiado largos** (Google los corta pasados unos 60 caracteres): las cuatro tablas de /datos/ y la portada de Dependencia. Acortados, también en los programas que las generan cada mes.
4. **Título corto** de /elecciones/ («Elecciones 2026 | Jubilómetro»): ahora «Elecciones 2026: qué proponen los partidos sobre pensiones».
5. **Enlace en http** (no seguro) a las estadísticas de la Seguridad Social en dos tablas de /datos/: pasado a https, también en sus programas.
6. **Datos propios poco enlazados**: la tabla de pensión media por provincia no tenía enlaces desde ninguna guía, y las otras tres solo de 1 a 3. Añadidos enlaces desde cuatro guías (pensión según el sueldo, cómo se calcula la pensión, pensión máxima y complemento a mínimos).

## Lo que no se ha tocado y por qué

- **Velocidad en móvil de las guías** (Lighthouse 74-82; carga del elemento principal 3,7-5,1 s en la prueba lenta de Google). Lo que más pesa son los anuncios de AdSense (370 ms de bloqueo y 185 KB de código sin usar) y la hoja de estilos combinada de LiteSpeed (430 ms). El código de AdSense no se toca por norma. Las calculadoras, que no llevan anuncios, sacan 98. Los datos reales de los lectores son buenos (carga buena en 128 de 137 visitas en móvil).
- **Buenas prácticas 79** en las páginas con anuncios: por la cookie de prueba de doubleclick de AdSense. No depende de la web.
- **Fuente Newsreader (132 KB)**: recortarla solo ahorraría un 13 % y podría cambiar el aspecto de la letra.
- **Caché**: 92 de 177 páginas se sirvieron sin caché (media de 0,69 s frente a 0,22 s con caché). Es normal después de publicar; el «Crawler» de LiteSpeed Cache podría calentarla, pero es un ajuste del hosting.
- **http://www.jubilometro.com** hace dos saltos (a https://www y luego a https://) en vez de uno. Es un ajuste de Hostinger; Google lo sigue sin problema.
- **Páginas legales** (aviso legal, privacidad, cookies, accesibilidad, descargo) con noindex: es a propósito y no afecta a AdSense, porque se pueden visitar y están enlazadas en el pie.
- **100 títulos llevan «2026»**: en enero hay que pasarlos a 2027 a medida que salgan las cifras oficiales nuevas (decreto de revalorización), sin cambiar las direcciones.

## Lo que necesita Search Console (titular)

La auditoría no ve lo que Google ha decidido indexar. Para eso hacen falta los informes de **Indexación → Páginas** («Rastreada: actualmente sin indexar» y «Descubierta: actualmente sin indexar») y **Ajustes → Estadísticas de rastreo** (respuestas por tipo y tiempo medio de respuesta).

## Search Console (exportado por el titular el 25/11/2026)

**Cobertura** (datos hasta el 16/11):
- **169 páginas indexadas** y 5 sin indexar. Antes del 19/10 eran 168 y 2.
- Las 5 sin indexar son «Descubierta: actualmente sin indexar»: Google conoce la dirección, pero aún no la ha rastreado. La validación está iniciada.
- «Rastreada: actualmente sin indexar»: **0**. Google no ha rechazado ninguna página después de leerla.
- Problemas no críticos: ninguno.
- La exportación no trae la lista de esas 5 direcciones; se ve pinchando en la fila.

**Impresiones**: unas 1.000-1.500 al día hasta el 18/10, unas 30 entre el 19 y el 24/10 y entre 10 y 50 desde entonces (15 el 16/11).

**Estadísticas de rastreo** (hasta el 24/11; 2.971 peticiones):
- Respuestas: 98,8 % correctas (200), 0,7 % 404, 0,4 % 301 y 0,07 % 302.
- Host «sin ningún problema».
- Tiempo medio de respuesta: unos 130-250 ms en noviembre (bueno; Google considera lento pasar de 500-1.000 ms).
- Para qué rastrea: actualizar lo ya conocido, 80 %, y descubrir páginas nuevas, 20 %.
- Qué robot: smartphone, 33 %; imágenes, 32 %; AdsBot, 0,4 %.
- El 19/10, el día de la caída, Google hizo un rastreo grande (227 peticiones en un solo día), y otro el 29-30/10. Desde mediados de noviembre rastrea poco: de 6 a 44 peticiones al día.

**Conclusión**: no hay un problema técnico de rastreo ni de indexación. Google rastrea sin errores, indexa casi todo y no ha rechazado nada. La caída del 19/10 es una valoración de la web entera, no de páginas sueltas: Google la tiene indexada, pero la muestra muy poco. Coincide con el diagnóstico del 13/11 y con el rechazo de AdSense por «poco valor». El camino es el plan de `plan-adsense-2026-12.md`: menos páginas parecidas, más datos y ejemplos propios, y señales de autoría. Que Google rastree poco es una consecuencia de esa valoración baja, no su causa.
