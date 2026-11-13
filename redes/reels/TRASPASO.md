# Traspaso de la conversación de reels (13/11/2026)

Pau pidió seguir en una conversación nueva para tener la habilidad `/enrutador`. Este documento recoge todo lo que hace falta para continuar.

## 1. Lo primero al empezar la conversación nueva

1. **Rama:** sigue trabajando y haciendo push en `claude/eager-dijkstra-b175sb`.
2. **Lee estos documentos:**
   - este archivo;
   - `redes/reels/README.md`, sobre todo «Modo realista» y «Reglas para los reels nuevos»;
   - `redes/reels/CALENDARIO.md`;
   - `redes/reels/semana-01/CALENDARIO.md`, con el registro de cambios para coordinarse con las otras conversaciones;
   - `redes/ESTRATEGIA.md`.
3. **Pasa a la conversación nueva las dos tareas programadas de esta.** Están atadas a la sesión `session_01KzuJZD4D6R2fz968RLVGjb`. Créalas otra vez con el mismo texto, ligadas a la conversación nueva (o a la sesión nueva), y borra las viejas:

   | id | Nombre | Cuándo |
   |---|---|---|
   | trig_01BweKqGeLT1RsHPc2aVPrZ3 | Cargar en Buffer los posts de X del 23 al 30/11 | 22/11, 20:00 (Madrid) |
   | trig_01KikUMu55kHYY3KFWuhnNQb | Voz y programación de los reels 8 y 9 | 24/11, 21:30 (Madrid) |

   Ojo: la segunda hay que reescribirla con el plan de elecciones del apartado 4, porque los créditos de vidIQ se reparten entre esos reels y los de elecciones.
4. **Preséntate a Pau en una o dos frases** y pregúntale lo que está pendiente del apartado 5.

## 2. Reglas que pidió Pau

- **Formato de los reels nuevos («realista»):**
  - Vídeo real de Pixabay de fondo, nunca un clip etiquetado «ai generated».
  - Ningún plano repetido entre reels: lo comprueba `revisarRepetidos` en `herramientas/reels/fondo.mjs`.
  - Ningún tema repetido.
  - Que parezcan hechos por una persona.
- **Voz:** con herramientas, no con la voz de Pau (lo dijo el 10/11).
  - ElevenLabs tiene el plan gratuito bloqueado («Unusual activity…»). Solo funcionaría pasando a un plan de pago.
  - Ahora la voz se hace con **vidIQ**, voz «Eric» (`cjVigY5qzO86Huf0OWal`), con el guion sin las etiquetas entre corchetes. Pau la aprobó el 10/11 («Me parece perfecto»).
  - Cuesta 28 créditos por guion de hasta 1.000 caracteres.
  - Quedan 18 créditos; el 24/11 a las 21:17 (Madrid) se recargan 150.
  - El MP3 sale en assets.vidiq.com, que ya está permitido en el entorno «Jubilometro».
- **Etiqueta de IA** activada en todo lo que lleve voz sintética: en Instagram `isAiGenerated`, en YouTube `isAiGeneratedContent` y en X la de Buffer.
- **Ritmo:**

  | Red | Ritmo | Hora |
  |---|---|---|
  | Instagram y YouTube | Un reel en días impares | 20:43 (12:24 los domingos) |
  | Facebook | Uno al día | |
  | X | Uno al día, en modo mantenimiento | |

- **Coordinación con las otras conversaciones:**
  - No muevas ni borres publicaciones de Metricool, Typefully o Buffer que no sean tuyas, salvo que Pau lo pida.
  - Apunta cada cambio (fecha, red, hora, id y uuid) en `redes/reels/semana-01/CALENDARIO.md` y haz push.
  - La conversación de la web y las revisiones trabaja en la rama `claude/keen-mccarthy-i7kn75`, con `publicacion/COORDINACION.md` y `TRASPASO.md`.
- **Sin pull requests.** Commits con las líneas de atribución de siempre.

## 3. Cómo se hace un reel (resumen técnico)

- **Carpeta:** `redes/reels/<grupo>/<nn-slug>/`.
  - `reel.mjs`: el guion exacto, las escenas con `fondo: {clip:"pixabay:<id>", desde, x}`, la `clase` "abajo" o "arriba" si tapa una cara, la `musica` (URL de Orshot) con `musicaBucle` y `volumenMusica`, y la `portada`.
  - `publicacion.md`: los textos de cada red.
  - `voz-original.mp3`.
- **Render:** `node herramientas/reels/render.mjs <carpeta>`. Tarda unos 6 minutos y genera `reel.mp4`, `portada.jpg`, `subtitulos.srt`, `tiempos.json` y `creditos.txt`.
- **Versión para X:**

  ```
  ffmpeg -i reel.mp4 -vf scale=720:1280 -c:v libx264 -preset slow -b:v 1200k -maxrate 1400k -bufsize 2800k -c:a aac -b:a 96k reel-x.mp4
  ```

- **Buscar clips:** `orshot_search_stock_media` (`type: video`, `provider: pixabay`). Si `storage.orshot.com/stock/pixabay/video/<id>.mp4` da 404, primero hay que llamar a `orshot_use_stock_media` con su `ref`. Para elegirlos a ojo hay un script que monta una hoja de fotogramas: `/tmp/claude-0/-home-user-Jubilometro/a5e41d27-7d2b-509f-a00d-f28d07e2fb6e/scratchpad/real/hoja.sh` (si se ha perdido, se rehace en 10 líneas con ffmpeg).
- **Para probar encuadres sin gastar voz:** `espeak-ng -v es` hace una voz provisional. Después hay que borrar los archivos de la prueba.
- **Programar:**
  - Metricool (marca 7853768, Europe/Madrid) con `createScheduledPost`. El vídeo va como URL raw de GitHub con el SHA del commit: `https://raw.githubusercontent.com/plobatoic/Jubilometro/<SHA>/redes/reels/...`.
  - X con Buffer (GraphQL en api.buffer.com, canal `6aedace4e29c69a1717fcdbf`, mutation `createPost` con `mode customScheduled` y vídeo `reel-x.mp4`). El plan gratuito admite 10 en cola y 280 caracteres por post.

## 4. Lo que estaba en marcha: reels de las elecciones del 29/11

**Lo que pidió Pau el 13/11:** «Vamos a hacer más reels para tenerlos. En la semana de elecciones, y cuando estén las guías, quiero subir solo los reels relacionados con eso».

**Fuente comprobada:** la guía publicada `contenido/cuanto-cobrare/elecciones-y-pensiones/articulo.md` de la rama `claude/keen-mccarthy-i7kn75`. Úsala solo con sus cifras y su tono, que es neutral, sin partidos ni valoraciones.

**Reels propuestos** (guiones de unos 600 caracteres, 28 créditos cada uno):

- **E1 · ¿Las elecciones paran la subida de 2027?** No. La subida la marca la ley (art. 58 de la LGSS): el IPC medio de diciembre a noviembre, gane quien gane. El INE da el dato adelantado el 27/11. Lo que puede retrasarse es el decreto: en 2020 llegó el 14 de enero y lo de enero se cobró como atrasos en febrero. No hay que pedir nada.
  - No pongas la horquilla del 3,3 al 3,7 %: puede cambiar con el IPC.
- **E2 · Pensión y paga extra de noviembre con elecciones.**
  - Llegan como siempre: del 22 al 26/11 si el banco adelanta el pago, y si no, como tarde el primer día hábil de diciembre.
  - La pensión de diciembre llega en sus fechas.
  - Los expedientes del INSS siguen su curso.
- **E3 · Qué leyes decaen con la disolución de las Cortes.**
  - La jubilación anticipada sin recorte con 40 años cotizados: estaba en enmiendas y empieza de cero en la próxima legislatura.
  - La Ley de Familias.
  - Lo que ya está en el BOE sigue en vigor, como la jubilación flexible nueva o la subida de 2026.
- **E4 · Qué proponen los partidos sobre las pensiones.** Solo cuando la otra conversación publique la comparativa de programas (la sección «Elecciones 2026»). Es «cuando estén las guías»: todos los partidos con el mismo espacio y sin valoraciones.

**Semana electoral (23 al 29/11): solo reels de elecciones en Instagram, YouTube y Facebook.** Hay que sacar de esa semana los reels que no son de elecciones y pasarlos a diciembre, con permiso de Pau, porque varios son de la otra conversación. Los afectados:

| Red | Reels de esa semana que no son de elecciones |
|---|---|
| Instagram | 23/11 R4 tres cifras · 25/11 Tarjeta Dorada · 27/11 SOVI · 29/11 R5 subsidio de 52 |
| YouTube | 23/11 R4 · 25/11 Tarjeta · 27/11 vender la casa · 29/11 R5 |
| Facebook (reels) | 24/11 baja · 26/11 R1 · 28/11 Tarjeta · 30/11 R6 |

Los carruseles y los textos de Facebook se pueden quedar.

**Problema de la voz:** con vidIQ no hay voz hasta el 24/11 por la noche, así que los reels de elecciones solo llegan al 25, 27 y 29/11. Para cubrir el 23/11, o pasar ElevenLabs a pago, o comprar créditos de vidIQ. Pregúntaselo a Pau.

**Créditos del 24/11:** 150 dan para 5 guiones (E1, E2, E3, E4, más R8 o R9). R8 y R9 son para diciembre y pueden esperar.

**Clips elegidos a medias:**
- Hay hoja de candidatos en `/tmp/claude-0/-home-user-Jubilometro/a5e41d27-7d2b-509f-a00d-f28d07e2fb6e/scratchpad/real/elec.jpg`, si sigue existiendo.
- Candidatos:
  - Madrid: 246232 Puerta de Alcalá, 31949, 110665 (Gran Vía, ya vertical)
  - bandera de España: 217381, 112151, 135837 (vertical)
  - euros: 268220, 4853, 59139, 173623
  - otros: 174030 periódico, 27230 café y lectura, 13477 bolígrafo, 26771 carta, 41211 buzón, 38084 mujer con móvil, 39887 retrato de un hombre mayor, 846 biblioteca
- Algunos dan 404 hasta pasarlos por `orshot_use_stock_media`.
- **Evita** las urnas de Pixabay: son de EE. UU. (Trump y Biden).

## 5. Estado y pendientes

**Hecho:**
- **Reels 7, 8 y 9** (`redes/reels/nuevos/`): imagen terminada y textos comprobados.
  - R7 (jubilación activa) renderizado con la voz de vidIQ y programado:

    | Red | Cuándo | Id |
    |---|---|---|
    | Instagram | 5/12, 20:43 | 423722955 |
    | YouTube | 5/12, 20:43 | 423723010 |
    | Facebook | 1/12, 13:00 | 423723057 |
    | X (Buffer) | 1/12 | 6af38fce3cfe2a84dbfb940e |

  - R8 (despido a los 60) y R9 (trabajado en otro país) solo esperan la voz. Previstos: Instagram y YouTube el 7/12 y el 9/12; Facebook y X el 2/12 y el 3/12.
- **Buffer:** 9 de 10 en cola (14 a 22/11 y 1/12). Los del 23 al 30/11 se cargan el 22/11 con la tarea programada. La cola de Buffer no admite más de 10 a la vez.

**Pendiente de respuesta de Pau** (revisión del 11/11; no se ha tocado nada):
1. **Temas repetidos:**
   - En Facebook: baja el 17 y el 24/11, y auxilio por defunción el 14 y el 27/11.
   - En Instagram: baja como reel el 17/11 y como carrusel el 26/11.
   - Propuesta: quitar los posts de Facebook del 24 y el 27/11.
2. **Facebook tiene dos publicaciones el mismo día** el 18, 20, 21, 22 y 24/11. Tres las añadió la otra conversación el 11/11.
3. **Facebook está vacío del 4 al 9/12.**
4. **Reels de la serie de temas sin etiqueta de IA:** auxilio, baja, SMS, teleasistencia, Tarjeta Dorada, SOVI y vender la casa. Hay que activarla si llevan voz sintética.
5. **Instagram, reel −60.000 € del 11/11:** Metricool no pudo poner el primer comentario. Pau tiene que añadirlo a mano (texto en `semana-01/02-jubilarse-antes-60000/publicacion.md`).
6. **Voz para la semana electoral:** ElevenLabs de pago o créditos de vidIQ.
7. **Pedir permiso a Pau para sacar los reels que no son de elecciones del 23 al 29/11** y llevarlos a diciembre.
