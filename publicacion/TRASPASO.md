# Traspaso: la conversación «Revisión web y actualización blog» continúa en una nueva

**Fecha:** 13/11/2026.

**Por qué:** el titular (Pau) quiere seguir en una conversación nueva para tener activa la habilidad `/enrutador`, que subió a su cuenta de claude.ai el 13/11. Las conversaciones abiertas antes no la cargan.

**De dónde viene:** session_01MKVEEroLSxN4Zbyrnb7Sh7, rama `claude/keen-mccarthy-i7kn75`.

La conversación nueva hereda **todo lo que hacía la anterior** (ver `publicacion/COORDINACION.md`, fila «Revisión web y actualización blog»).

## 1. Primero, al empezar

1. Lee este archivo entero y después:
   - `publicacion/COORDINACION.md`
   - `publicacion/PENDIENTES.md`
   - `herramientas/revision/LEEME.md`
   - `publicacion/seo/propuesta-fusiones-2026-11.md`
   - las últimas entradas de `publicacion/PLAN-PUBLICACION.md`
2. **Rama:** sigue trabajando y haciendo push en `claude/keen-mccarthy-i7kn75`. El titular lo autoriza expresamente: las tareas programadas, las otras conversaciones y COORDINACION.md usan esa rama. No crees otra rama de trabajo.
3. **Pasa las tareas programadas a esta conversación** (apartado 5).
4. En `publicacion/COORDINACION.md`, cambia el id de la fila «Revisión web y actualización blog» por el de esta conversación (`get_session` sin id). Después haz commit y push.
5. Preséntate a Pau en una o dos frases y dile que ya está todo pasado. Pregúntale lo pendiente del apartado 4.

## 2. El proyecto

- **jubilometro.com:** web española de pensiones para personas de 55 a 80 años. WordPress en Hostinger, tema hijo `tema/jubilometro` (versión **2.11.30** desde el 13/11).
- **Contenido:**
  - Las guías están en `contenido/<categoría>/<slug>/articulo.md`, que es la versión maestra, junto con su `verificacion-fuentes.md`.
  - Son **143 guías** tras la tanda 1 de fusiones; el sitemap tiene 142 entradas.
  - Las portadas de sección están en `paginas/portadas/*.md` y los textos de las calculadoras en `paginas/calculadoras/*.md`.
- **Cómo se publica:**
  - `npm run publicar`, `npm test`, `npm run comprobar`.
  - `npm run subir -- --solo=/url/,/url/`.
  - `node herramientas/publicar/subir-portadas.mjs --solo=<slug>`, o `--carpeta=calculadoras`.
  - Si cambias el tema: subes la versión en `style.css` y `JM_THEME_VER`, y ejecutas `npm run subir-tema`.
  - Al final, `npm run comprobar-web` en vivo.
  - Todo cambio se apunta en `publicacion/PLAN-PUBLICACION.md`, en el historial del artículo y en su `verificacion-fuentes.md`.
- **Al titular:** se le habla en **español sencillo, sin tecnicismos**. Se llama Pau.

## 3. Reglas que no se rompen

**Credenciales y conexiones**
- Las credenciales salen solo de las variables `WP_USER` y `WP_APP_PASSWORD`. Antes, siempre: `export WP_USER="${WP_USER%.}"`.
- Las estadísticas de la web (`/wp-json/jm/v1/estadisticas`) se piden con `fetch` de Node y la cabecera `Authorization: Basic`. Con `curl -u` da 401.
- Nunca pidas contraseñas ni tokens por el chat.
- El correo del titular es privado. Nunca lo pongas en un User-Agent ni lo mandes fuera.
- User-Agent: `JubilometroBot/1.0 (https://jubilometro.com)`.
- Nunca desactives la verificación TLS.
- Si Hostinger da 403 «Bot Verification», espera y repite.

**Contenido**
- No toques el código de AdSense ni cuándo se carga.
- Nunca borres nada sin preguntar.
- Nunca inventes datos: todo sale de una fuente oficial.
- Nunca enlaces un perfil personal.
- **TikTok y LinkedIn están aparcados:** no los menciones.
- El correo de contacto de la web no se cambia.

**Forma de trabajar**
- Las acciones hacia fuera que no se hayan pedido claramente se confirman antes.
- Haz commit y push de todo al terminar.
- Nunca pongas el identificador del modelo en archivos del repositorio.
- Final de los commits:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: <enlace de la sesión nueva>
  ```

**Pausa de guías nuevas (5/11)**
- Hasta que salgan todos los programas de las elecciones del 29/11, no se publican guías, páginas ni secciones nuevas.
- Sí se sigue haciendo: corregir cifras de las guías que ya existen, las tablas de datos, /enlaces/, las redes, arreglar lo que falle y **las fusiones aprobadas**.

## 4. Estado a 13/11/2026 y lo pendiente

### Google sin impresiones desde el 19/10 (diagnóstico hecho el 12-13/11)

**Qué pasó:** Search Console, en la propiedad `https://jubilometro.com/`, muestra unas 1.300 impresiones al día hasta el 18/10 y casi cero desde el 19/10. En 3 meses suma 135 clics y 16,4 mil impresiones.

**Lo que se ha descartado:**
- Problemas de rastreo: el host está bien en los últimos 90 días y el 99 % de las respuestas son 200.
- Acciones manuales: ninguna.
- Indexación: según Pau, está todo bien.
- noindex o canonical: los dos están bien.
- Un hackeo o contenido distinto para Googlebot: no.
- Cambios nuestros entre el 15 y el 19/10: ninguno.
- Una actualización de Google ese día: no la hubo.

**Conclusión:** es una rebaja automática de toda la web. Lo más probable es que se deba a que es una web nueva de dinero que publicó unas 140 guías en tres semanas. Detalle en `publicacion/PENDIENTES.md`.

**Propiedades de Search Console:** la propiedad «Dominio» `jubilometro.com` quedó verificada el 13/11; antes salía vacía porque no estaba verificada.

**Lo que se le dijo a Pau:**
- No quitar la web de Search Console.
- No volver a enviar el sitemap.
- No usar «Retirada de URLs».
- Que las direcciones viejas salgan como «Página con redirección» es normal.
- Mirar «Rendimiento» una vez por semana.

**Indexación:** Pau iba a pedir la indexación de las tres guías ampliadas el 13/11. Después de cada tanda, dale a Pau las 3 o 4 URL que hay que indexar.

### Fusiones de guías (aprobadas por Pau el 13/11: «Sí, las 13»)

- La lista y el calendario están en `publicacion/seo/propuesta-fusiones-2026-11.md`. Las copias de las guías fusionadas están en `publicacion/fusionadas/`, con su `LEEME.md`.
- **Tanda 1, hecha el 13/11:** rescate-aportaciones-10-anos, total-cualificada y base-reguladora.
- **Tanda 2, el 17/11:** las fusiones 4, 5, 6 y 7. Ojo: la 5 (pagas-extra) está enlazada desde cómo-se-calcula-la-pensión.
- **Tanda 3:** del 23 al 27/11. **Tanda 4:** del 30/11 al 4/12.

**Cómo se hace cada fusión, igual que la tanda 1:**
1. Pasar a la guía principal lo útil que solo tenga la pequeña, con su fuente. Si hace falta un ancla, la cabecera debe dar un slug de 60 caracteres o menos: `slug()` corta en 60.
2. Poner la redirección 301 en `tema/jubilometro/inc/data.json` → `"fusionadas"` (la lee `functions.php`), subir la versión del tema y ejecutar `npm run subir-tema`.
3. Pasar la entrada vieja de WordPress a borrador (REST, `status: draft`) y marcarla `draft` en `publicacion/wordpress-entradas.json`.
4. Mover la carpeta con `git mv` a `publicacion/fusionadas/`.
5. Cambiar los enlaces internos: guías, portadas, `herramientas/calculadoras/ejemplos.mjs` y `paginas/`.
6. Cambiar los enlaces cortos de `data.json` → `"cortos"`.
7. Cambiar el campo `fuente` de las publicaciones de redes (banco, `mes-1.mjs` y `publicacion/redes/*/programa.mjs`).
8. Quitar la imagen destacada vieja de `herramientas/publicar/web.mjs`.
9. Comprobar con `npm test`, `npm run comprobar` y `comprobar-web`. Apuntarlo en PLAN-PUBLICACION.

### Propuesta a Pau sin responder

Ahora qué hacer con la web. Recomendación: **2 + 3**.

- **2.** Mejorar las guías que ya tienen visitas, 2 o 3 por semana. Visitas en 90 días: porcentaje-anos-cotizados 68, militares 44, viudedad-y-jubilacion 43, descuentos-transporte 36, grados de dependencia 26, pension-no-contributiva 24, cuanto-tarda-jubilacion 23…
- **3.** Una lista de webs (asociaciones de jubilados, hogares del jubilado, ayuntamientos, blogs de mayores) y un mensaje corto para que Pau les escriba ofreciendo las calculadoras para otras webs.

**Hechos que ya no hay que ofrecer:** Bing Webmaster Tools está dado de alta (13/11). La habilidad `/enrutador` está en su cuenta.

### Otros pendientes

- **Elecciones 2026:**
  - Faltan los programas de PSOE, Vox, Frente Amplio, Junts y EH Bildu. Ya están ERC, PP y PNV, con sus enlaces en PENDIENTES.
  - **El 13/11 hay que preguntar a Pau** si se crea la sección con «pendiente» para los que falten o si se espera. Lo hace la tarea de los programas.
- **IPC:** el 13/11.
- **RDL 36/2026 (dependencia):** se convalida hacia el 10/12.
- **Antes de enero:** volver a renderizar `espera-ig` y el vídeo de la dependencia (plazo de 3 meses).
- **Pendientes de Pau:** fijar las publicaciones de presentación en X y Facebook.

## 5. Tareas programadas atadas a la conversación vieja

Todas se ejecutan en session_01MKVEEroLSxN4Zbyrnb7Sh7. Pásalas a esta conversación así, una a una:

1. Lee la tarea con `get_trigger`.
2. Créala igual con `create_trigger`, sin `persistent_session_id`, para que se ate a esta conversación: mismo nombre, mismo prompt, mismo `cron_expression` o `run_once_at`, `initiation: human_request`.
3. Cuando la nueva exista, desactiva la vieja con `update_trigger` y `enabled: false`. **No la borres**: borrar una tarea borra también sus sesiones.

| Id | Nombre | Cuándo |
|---|---|---|
| trig_019bqm3T93FkDWQKyk3Les8v | Revisión diaria completa de Jubilómetro | cada día, 8:57 (Madrid) |
| trig_01VjComYj9Ma4x2CYpitjTaU | Programas electorales del 29N: pensiones | cada día, 9:41 (Madrid) |
| trig_01EiXybU83DHRH1vmWKBGDYC | Tanda 2 de fusiones de guías | 17/11/2026, 10:13 (Madrid) |
| trig_014AjnHyrshKJPKMuSMTaQMf | Convalidación del Real Decreto-ley 31/2026 | 20/11/2026 |
| trig_01PTCMyascfQPPgLLizYEXqi | Actualizar las 5 páginas de datos (noviembre) | 28/11/2026 |
| trig_01RkrikhsjE9TteDbS4X1ABB | Termalismo de Castilla-La Mancha | 16/12/2026 |
| trig_01WPPhPFDz2aZa8uBxah8RG6 | Actualización de enero de 2027 | 2/1/2027 |

**No son de esta conversación:** las tareas que apuntan a la de reels (session_01KzuJZD4D6R2fz968RLVGjb) y a la de estadísticas (session_01KzuJZDJMemstDB6n9A1a5r). No las toques.

Si hay que avisar a otra conversación, hazlo con `create_trigger`, `persistent_session_id` y `run_once_at`. SendMessage no llega a las sesiones en la nube.

## 6. Datos útiles

- **Metricool:**
  - Marca 7853768, zona Europe/Madrid. El registro está en `publicacion/redes/programado/metricool-programadas.md`.
  - `updateScheduledPost` cambia el id. No hay herramienta para borrar: con `draft: true` se para la publicación.
- **Typefully:** social set 357816. El cupo gratis de noviembre está completo. Desde el 14/11, la conversación de reels usa Buffer para X.
- **Reels:**
  - Reels sin voz (de esta conversación): `publicacion/redes/programado-video/reels.mjs` y `herramientas/redes/metricool.mjs --redes=reel`.
  - Instagram y YouTube van en días alternos. Las fechas de Instagram que se movieron están en `publicacion/redes/programado/fechas-instagram.json`.
- **Página /enlaces/:** se sube cada mañana con `node herramientas/redes/enlaces.mjs`.
- **Canal de WhatsApp:** no tiene conector. Cada día se le da a Pau el texto exacto del banco, listo para copiar.
