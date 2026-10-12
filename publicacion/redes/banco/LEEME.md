# Banco de publicaciones de Jubilómetro

Publicaciones preparadas el 12 de octubre de 2026 para lanzar las redes **el día que aprueben la web**. No llevan fecha: el programador las reparte en un calendario a partir del día que le digas.

## Qué hay

| | Cuántas | Dónde |
|---|---|---|
| Publicaciones del banco | 308 (X 126, Facebook 68, Instagram 33, WhatsApp 26, LinkedIn 18, grupo 13, vídeos 24) | `herramientas/redes/banco/` |
| Publicaciones del primer mes que sirven cualquier día | 81 | `herramientas/redes/mes-1.mjs` |
| Carruseles de Instagram (8 imágenes cada uno; el de emigrantes retornados, 9) | 33 | `publicacion/redes/banco/carruseles/<nombre>/` |
| Imágenes con la cifra (Facebook, también valen para X) | 13 | `publicacion/redes/banco/cifras/<nombre>.png` |
| Vídeos «La cifra en 30 segundos» | 36 | `publicacion/redes/videos/` |

Para verlas todas de un vistazo: `publicacion/redes/banco/vista-previa-banco.pdf` (todas las imágenes en 11 páginas), `publicacion/redes/banco/index.html` (las imágenes a tamaño real, para descargarlas) y un calendario de ejemplo, como si la aprobación llegara el lunes 2 de noviembre: `publicacion/redes/ejemplo-calendario/calendario.html`.

Todas las cifras salen de las guías de la web, con la norma o el organismo de origen. Cada publicación dice de qué guía sale.

## El día que aprueben la web

1. **Genera el calendario** con la fecha de la aprobación (o pídemelo y lo hago yo):

   ```
   node herramientas/redes/programar.mjs --inicio=AAAA-MM-DD
   ```

   Por defecto son 12 semanas. Para más o menos: `--semanas=8`.

2. **Abre** `publicacion/redes/programado/calendario.html`. Está día a día, con un botón para copiar cada texto, la casilla «Hecho» y un filtro por red.

3. **Primer día**: presentación en todas las redes. Fija arriba la de X y las normas del grupo.

4. **Metricool**: importa `publicacion/redes/programado/metricool.csv`. Lleva las publicaciones de X, Facebook y LinkedIn como borradores. Prueba antes con dos filas.

5. **Instagram**: sube las 8 imágenes del carrusel en orden (la tarjeta dice la carpeta) y pega el texto de la tarjeta.

6. **Vídeos**: súbelos a TikTok, Reels y Shorts con el texto de su tarjeta. Al subirlos, añade música de la biblioteca de la app.

7. **Avisos amarillos**: si una publicación sale desde enero de 2027 y lleva importes de 2026, la tarjeta lo avisa. Comprueba la cifra en la guía antes de publicarla (en enero cambian con la subida), o pídeme que la actualice.

## Ritmo de cada red

| Red | Cuándo |
|---|---|
| X | De lunes a viernes a las 9:00 y a las 13:30; sábados y domingos a las 10:00 |
| Facebook (página) | Todos los días a las 11:00, sin enlaces en el texto |
| Grupo de Facebook | Los lunes a las 10:00: la pregunta de la semana |
| Instagram | Lunes, miércoles y viernes a las 19:00: un carrusel |
| LinkedIn | Martes y jueves a las 8:30, con el enlace en el primer comentario |
| Canal de WhatsApp | Martes y viernes a las 10:00 |
| Vídeos | Lunes, miércoles y viernes a las 13:00 |

Cada enlace lleva al final la red de la que viene (`jubilometro.com/edad/x`, `/fb`, `/ig`, `/in`, `/wa`, `/yt`). En WordPress, *Escritorio › Estadísticas*, se ve qué publicación trae visitas.

## Cómo reparte el programador

- Lo de lanzamiento, los tres primeros días.
- Lo que tiene fecha fija del primer mes (los datos del INE, los últimos días de un plazo), en su día.
- Lo demás, rotando de tema y sin repetir guía en tres días. Primero lo que caduca pronto (por ejemplo, la paga extra de Navidad o los viajes del Imserso de esta temporada).
- Hasta fin de año van antes las publicaciones con importes de 2026; desde enero, las que no llevan importes.

## Añadir o cambiar publicaciones

1. Edita el archivo del tema en `herramientas/redes/banco/` (jubilación, cuánto cobraré, viudedad, incapacidad, ayudas y dinero, dependencia, Imserso, calculadoras, lanzamiento o vídeos).
2. Comprueba: `node herramientas/redes/banco/index.mjs` (enlaces que existen, 280 caracteres en X, sin rayas largas, sin enlaces en Facebook).
3. Si tocaste carruseles o imágenes: `NODE_PATH=$(npm root -g) node herramientas/redes/kit/kit.mjs --banco`.
4. Si añadiste un enlace corto nuevo: añádelo a `cortos` en `tema/jubilometro/inc/data.json` y sube el tema.
5. Vuelve a generar el calendario con el paso 1 de arriba.
