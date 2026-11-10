# Reels de Jubilómetro

Tres reels a la semana, iguales en Instagram, TikTok, YouTube Shorts y Facebook. Cada reel sale de un artículo ya verificado de `contenido/`: no se publica ningún dato que no esté en su `verificacion-fuentes.md`.

## Estructura

```
redes/reels/semana-NN/
  CALENDARIO.md                 Días, horas, orden y lista previa a publicar
  NN-slug/
    reel.mjs                    Guion de la locución + escenas (HTML con anclas al guion) + portada
    voz-original.mp3            Locución generada (vidIQ/ElevenLabs, voz «Chris») o grabada con el móvil
    reel.mp4                    Vídeo final 1080×1920, 30 fps, −14 LUFS, subtítulos quemados
    portada.jpg                 Portada con el texto dentro del recorte 3:4 de la cuadrícula
    subtitulos.srt              Para YouTube y Facebook
    tiempos.json                Cuándo suena cada palabra y cuándo entra cada escena
    publicacion.md              Gancho, guion por escenas y copy + ajustes de cada red
herramientas/reels/
  plantilla.html                Diseño (marca, tipografía, animaciones, subtítulos karaoke)
  audio.mjs                     Recorta silencios, acelera la voz y alinea el guion con la locución
  render.mjs                    Genera vídeo, portada, subtítulos y tiempos
```

## Cómo se hace un reel (unos 20 minutos)

1. **Tema y gancho.** Elegir un artículo y una cifra o un error concreto. Buscar en vidIQ reels de pensiones en español que hayan funcionado (`vidiq_instagram_tiktok_outlier_search`, público «Spain/Spanish, 50-66»). Escribir el gancho con las fórmulas de las skills `tt-hook-scripter` (T1-T10) e `ig-repurposer`: texto en pantalla y voz distintos, la cifra en el primer fotograma, sin saludo.
2. **Guion.** 100-120 palabras, escrito como se habla («Ojo», «O sea», «Vale», «Pásaselo»), con frases cortas y puntos suspensivos donde quieras una pausa. Las cifras van como `[[1960|mil novecientos sesenta]]`: el subtítulo muestra la cifra y la voz lee el texto en letra, así no hay números mal pronunciados. Personas de ejemplo presentadas como ejemplo («Pongamos que Luis…»). Un único cierre: enviar o guardar.
3. **Locución.** `vidiq_voiceover_generate` (usa ElevenLabs por dentro) con la voz `iP95p4xoKVk53GoZ742B` (Chris, conversacional) y el texto que devuelve `locucion(guion)` de `audio.mjs`. Unos 14 créditos por reel. Guardar el MP3 como `voz-original.mp3`. La voz más real es la tuya: graba el guion con el móvil, guárdalo como `voz-original.mp3` y el render sincroniza solo los subtítulos y las escenas (también vale una voz clonada en vidIQ o ElevenLabs). Si quieres música, pon `musica: "ruta.mp3"` en el `reel.mjs`: baja sola cuando habla la voz.
4. **Escenas.** Copiar un `reel.mjs` de la semana anterior y cambiar guion, escenas y portada. Cada elemento entra cuando la voz dice la frase de su `data-en`; `data-a` elige la animación (`sube`, `pop`, `sello`, `tacha`, `cuenta`, `ancho`, `eje`, `aparece`, `fijo`).
5. **Previa y render.**

   ```bash
   npm run reel -- redes/reels/semana-01/01-nacidos-1960 --previa
   ```

   ```bash
   npm run reel -- redes/reels/semana-01/01-nacidos-1960
   ```

   La previa saca un fotograma por escena en `.previa/` en segundos. El render completo tarda unos 3 minutos.
6. **Copy.** `publicacion.md` con las reglas de `ig-caption-writer`, `ig-hashtag-strategist` y `tt-caption-writer`: gancho del pie antes de 125 caracteres, 3-5 hashtags de tamaños distintos al final, una sola llamada a la acción, sin cebos tipo «comenta SÍ».
7. **Programar** en Metricool (marca «Jubilometro», Instagram + Facebook + YouTube conectados). Para TikTok, conectar la cuenta en Metricool o subirlo desde la app.

## Reglas de los reels

- El dato manda: cifras y requisitos copiados del artículo y comprobados en su tabla de fuentes. Ante la duda, el reel se queda en lo seguro.
- Aviso de información general en el último plano y en el pie.
- Etiqueta de contenido con IA activada en todas las redes: la locución es sintética.
- Mientras la web no esté publicada, los enlaces a `jubilometro.com` del vídeo y de las descripciones son de marca; revisar que existan antes de pegarlos como enlace.

## Ideas para las semanas siguientes

Sacadas de los artículos ya escritos. Los ganchos siguen los formatos que mejor funcionan ahora en el nicho (cifra concreta, error frecuente, pensión denegada, novedad legal).

| Semana | Gancho | Artículo | Objetivo |
|---|---|---|---|
| 2 | «Volver a trabajar a los 3 meses de jubilarte puede costarte 375 € al mes» (flexible, espera de 6 meses) | jubilacion/flexible | Envíos |
| 2 | «67, 37 y 38 años y 6 meses: las 3 cifras de 2027 que no puedes confundir» | jubilacion/edad-de-jubilacion | Guardados |
| 2 | «Cobrar el 100 % de la pensión y seguir trabajando: sí, pero retrasando 5 años» (activa: 45 % → 100 %) | jubilacion/activa | Guardados |
| 3 | «Un 4 % más de pensión por cada año que retrasas… o un cheque de hasta 13.500 €» | jubilacion/demorada | Guardados |
| 3 | «El subsidio para mayores de 52 sigue cotizando para tu jubilación» | jubilacion/subsidio-mayores-52 | Envíos |
| 3 | «Despedido a los 60: paro, subsidio y jubilación, en este orden» | jubilacion/despido-a-los-60 | Guardados |
| 4 | «Convenio especial: unos 392 € al mes para no perder años cotizados» | jubilacion/convenio-especial | Guardados |
| 4 | «Si te faltan pocos meses para los 38 años y 6 meses, no te jubiles antes» | jubilacion/compensa-jubilarse-antes | Envíos |
| 4 | «Para pedir la jubilación, en la mayoría de los casos bastan 3 papeles» (DNI, cuenta bancaria y solicitud, con la lista en PDF) | jubilacion/documentos-jubilacion | Guardados |

## Versión para X

El plan gratuito de Typefully no admite vídeos de más de 10 MB. Para X se usa una copia a 720×1280 (unos 4,5 MB), que es la resolución a la que X los reproduce:

```bash
ffmpeg -i reel.mp4 -vf scale=720:1280:flags=lanczos -c:v libx264 -preset slow -crf 21 -maxrate 1600k -bufsize 3200k -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart reel-x.mp4
```

## Modo realista: vídeo real de fondo

Si alguna escena de `reel.mjs` lleva `fondo`, el reel se monta sobre vídeo real en vez del fondo de gráficos:

```js
{ en: "Pongamos que Luis", fondo: { clip: "pixabay:6096", desde: 11, x: 0.95 }, clase: "abajo", html: `…` }
```

- `clip`: un vídeo de Pixabay (`pixabay:<id>`), una URL o un archivo local. Los de Pixabay se buscan y se resuelven con Orshot (`orshot_search_stock_media` y `orshot_use_stock_media`); licencia de Pixabay, uso comercial sin atribución obligatoria. Se descargan a `herramientas/reels/.cache/`.
- `desde`: segundo del clip en el que empieza. `x`: encuadre horizontal al recortar a 9:16 (0 izquierda, 1 derecha).
- `clase: "abajo"` o `"arriba"` mueve el contenido de la escena para no tapar caras.
- Entre clips hay un fundido de 0,45 s. Si un clip se queda corto, se ralentiza un poco.
- Música: `musica` acepta una URL (por ejemplo, de la biblioteca de Orshot) y `musicaBucle: { ini, fin }` repite ese tramo sin cortes; `volumenMusica` ajusta el nivel (por defecto 0,14). La música baja sola cuando habla la voz.
- El render deja `creditos.txt` con los clips y la música usados.
