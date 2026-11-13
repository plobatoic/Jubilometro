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

## Reglas para los reels nuevos (10/11/2026)

- **Formato realista** (vídeo real de fondo) para todos los reels nuevos. Los ya programados se quedan como están. El reel 2 tiene su versión realista en `reel-realista.mp4` como muestra.
- **Ninguna imagen se repite:** el render se para si un clip ya sale en otro reel o dos veces en el mismo.
- **Nada de clips generados con IA:** al elegir en Pixabay, descartar los que llevan la etiqueta «ai generated».
- **Ningún tema se repite:** antes de escribir un reel, mirar los temas ya publicados o programados en el calendario. Los temas de `contenido/` sin reel todavía: jubilación activa, parcial, flexible, anticipada involuntaria, anticipada por discapacidad, anticipada por profesión, despido a los 60, convenio especial, años que faltan, cuánto tarda la jubilación, documentos para pedirla, pedirla por internet, haber trabajado en otro país y autónomos.
- **Voz:** la mejor voz de IA disponible, elegida escuchando `comparativa-voces.mp3`. Mientras la voz sea sintética, la etiqueta de IA se queda activada en Instagram, YouTube y TikTok, como piden sus normas.

## Estilo dinámico (13/11/2026)

Para los reels nuevos. Se activa con `estilo: "dinamico"` en `reel.mjs` y se puede mezclar con el vídeo real.

- **Por escena:**
  - `transicion`: `"zoom"` (por defecto), `"latigo"` (barrido lateral con desenfoque), `"giro"` (giro 3D) o `"sube"`.
  - `solido: true`: tapa el vídeo con el fondo propio, con luces que se mueven, un suelo 3D en perspectiva y chispas.
- **Cámara:** se mueve sola, da un empujón con cada `pop`, `moneda`, `sello` o `golpe3d` y se sacude con los dos últimos.
- **Piezas 3D** (basta con escribir la etiqueta; el código monta el resto):
  - `<div class="moneda3d" data-a="moneda">`: moneda de euro que cae girando. Con `data-simbolo` se cambia el símbolo.
  - `<div class="calendario" data-a="rango" data-mes="…" data-offset="6" data-dias="30" data-rango="22-26" data-marca="29" data-tag="…">`: calendario inclinado. Los días del rango se encienden uno a uno. `data-offset` es el número de huecos antes del día 1, con la semana empezando en lunes.
  - `<div class="barras3d" data-a="barras"><div class="col" data-h="0.6" data-v="2,8 %" data-e="2025"></div>…</div>`: barras 3D que crecen una tras otra.
  - `<div class="estallido" data-a="estallido" data-n="26">`: lluvia de euros.
- **Animaciones nuevas** (`data-a`):
  - `golpe3d`: el texto entra de golpe, con desenfoque.
  - `voltea`: la tarjeta cae desde arriba.
  - `giro3d`: entra girando.
  - `latido`: late suavemente.
- **Clases de texto:**
  - `relieve`: texto con volumen 3D, en blanco o con `ambar`, `verde` o `rojo`.
  - `gigante`: palabras enormes.
  - `check`: fila con el visto verde.
- **Efectos de sonido:** se sintetizan en `herramientas/reels/sfx.mjs`, sin archivos de terceros. Hay barrido en cada cambio de escena, pop, golpe, tic en cada día del calendario y campanilla en el estallido. Se ajustan con `volumenEfectos` (0,32 por defecto) y se quitan con `efectos: false`.
- **Render:** unos 9 minutos por reel de 30 s.

## Muñecos 3D (13/11/2026): el formato modelo

Pau pidió el 13/11 distinguirnos con muñecos animados en 3D y ejemplos prácticos. Sustituye a la regla del vídeo real de stock: los reels nuevos se cuentan con personajes propios, hechos solo con código (three.js), sin material de terceros. Modelo: `elecciones/e2-paga-extra/reel.mjs`.

**Reparto** (`herramientas/reels/3d/personajes.js`):
- **Rosa** (61 años): rebeca roja, gafas redondas, moño.
- **Luis** (64 años): jersey mostaza, bigote, gafas oscuras.
- Se añaden más copiando una entrada de `REPARTO`.

**Poses:** `reposo`, `saluda`, `senala`, `senalaArriba`, `pulgar`, `celebra` (bota y agita los brazos), `piensa`, `encoge`, `movil`, `movilEnsena`, `carpeta` y `brazosArriba`. Una pose se funde con la siguiente en 0,45 s.

**Caras:** `neutra`, `contenta`, `feliz`, `preocupada` y `sorpresa`. Además parpadean, respiran y se balancean solos.

**Escenarios** (`3d/escenarios.js`):
- `salon`: sofá, ventana, lámpara, planta, cuadro y alfombra.
- `oficina`: mesa de atención, ordenador, archivador y pantalla de turnos.

**Atrezo:**

| Tipo | Qué hace |
|---|---|
| `movil` | En la mano de un personaje y mirando a cámara. Con `pantallas: [{en, estado: "ingreso"}]` aparece la notificación del banco. |
| `calendarioPared` | Pasa la hoja de noviembre al 1 de diciembre en su `en`. |
| `bocadillo` | Con `texto` («?», «!»), desde `t` hasta `hasta`. |
| `monedas` | Lluvia de euros que botan en el suelo. |
| `carpeta` | Muestra «✓ EN CURSO» cuando le llega el sello. |
| `sello` | Baja y sella en su `en`. |

**Cómo se escribe:** cada escena lleva `animacion` con estos campos:
- `set`: el escenario.
- `camara`: `desde` y `hasta`, cada uno con `pos` y `mira`. La cámara frena suavemente al llegar.
- `actores`: para cada personaje, `pos` como [x, z], `giro` en grados, `pose`, `cara` y `acciones`. Cada acción lleva `{ en: "frase", pose, cara, mueve: [x, z], dur, gira }`.
- `atrezo`.

Todo lo que lleva `en` se sincroniza con la frase del guion, igual que los textos.

**Encuadre:**
- Los personajes miden unos 3,2 de alto, con la cabeza en y ≈ 2,5.
- Para un plano medio con sitio para el texto arriba: cámara a 8-9 de distancia y `mira` en y ≈ 2,8-3,0.
- Para un plano general con dos personajes: distancia de 11 a 12.
- Los textos van con `clase: "arriba"` y `velo: "suave"`. Con `velo: "suave"` el kicker sale en pastilla oscura y el velo solo oscurece arriba y bajo los subtítulos.

**Previa y render:**
- La previa (`--previa`) junta el 3D y los textos de cada escena en `.previa/`.
- El render completo tarda unos 15 minutos por reel de 30 s: unos 6 del 3D y unos 9 de la capa de textos.
- El 3D se dibuja con SwiftShader, sin tarjeta gráfica.
