# Publicar: cada domingo, la semana siguiente, red por red

Desde el 13/11/2026 se programa a mano, porque el plan gratuito de Metricool solo publica 20 publicaciones al mes. Cada red se programa en su propia herramienta, que es gratis y sin límite, y la extensión de Claude en Chrome rellena los formularios.

## Cómo funciona

1. **Sábado por la noche lo dejo listo yo**, con una tarea programada. Hago los reels de la semana siguiente con voz y render, los subo y escribo una carpeta `AAAA-MM-DD_DD/` con un archivo por red: `instagram.md`, `facebook.md`, `youtube.md` y, si toca, `x.md`. Cuando está todo, te aviso.
2. **El domingo lo programas tú, red por red**, con la extensión:

| Red | Herramienta | Archivo |
|---|---|---|
| Instagram | Meta Business Suite: business.facebook.com → Planificador | `instagram.md` |
| Facebook | Meta Business Suite (el mismo sitio) | `facebook.md` |
| YouTube | YouTube Studio: studio.youtube.com → Crear → Subir vídeos | `youtube.md` |
| X | Buffer: lo cargo yo, no tienes que hacer nada | — |

3. **Cuando termines, me dices «hecho»** y lo apunto en el calendario.

Cada archivo trae, para cada publicación: día, hora, texto exacto, primer comentario, enlace al vídeo o a las imágenes, portada, título y etiqueta de IA.

## Paso a paso (unos 10 minutos por red)

1. Abre el archivo de la red, por ejemplo `2026-11-16_22/instagram.md`, y descarga los vídeos o imágenes de sus enlaces a una carpeta del ordenador.
2. Abre la herramienta de esa red en Chrome, con la sesión iniciada.
3. Abre la extensión de Claude y pega el mensaje de abajo, cambiando `RUTA` por la del archivo, por ejemplo `2026-11-16_22/instagram.md`.
4. Cuando la extensión pida un archivo, elígelo tú: una extensión no puede cogerlo del disco por su cuenta.
5. Repite con la siguiente red.

## Mensaje para la extensión de Claude

```
Vamos a programar las publicaciones de una red social para la semana. Las instrucciones están aquí:
https://github.com/plobatoic/Jubilometro/blob/claude/eager-dijkstra-b175sb/redes/publicar/RUTA

Prográmalas una por una, en orden, en la herramienta que dice el archivo (Meta Business Suite o YouTube Studio):
- Copia el texto exactamente, sin cambiar nada, y pon la fecha y la hora exactas (hora de Madrid). Todo programado: nada publicado al momento.
- Instagram: «Crear reel» para los reels y «Crear publicación» para los carruseles. Si pone «Etiqueta de IA: sí», actívala.
- Facebook: reel, publicación con imagen o solo texto, según el tipo.
- YouTube: súbelo como Short, con el título, el texto como descripción, las etiquetas, «No, no es contenido creado para niños» y, si pone «Etiqueta de IA: sí», marca que tiene contenido alterado o sintético.
- Si hay primer comentario y no se puede programar, apúntamelo para ponerlo a mano cuando salga.
- Cuando haya que subir un archivo, para y dime cuál es (el nombre del enlace) para que lo elija yo.
Al final, dame la lista de lo programado y de lo que haya quedado pendiente.
```

## Metricool

- Lo que queda en Metricool para noviembre ya no saldrá: está todo copiado en estas carpetas. Cuando me digas «hecho» con cada semana, lo borro de Metricool para que no queden errores.
- En diciembre hay 18 publicaciones ya programadas en Metricool y el plan gratuito publica 20, así que esas salen solas y no hay que pasarlas a mano. Lo nuevo de diciembre va por estas carpetas.
