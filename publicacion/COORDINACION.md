# Coordinación entre las conversaciones de Claude que llevan Jubilómetro

Lo pidió el titular el 10/11/2026: «estoy gestionando la web con cada una una cosa». Cada conversación tiene su rama y su parcela, y deja escrito lo que cambia fuera de ella para que las demás lo vean.

| Conversación | Rama | Se encarga de |
|---|---|---|
| Revisión web y actualización blog (session_01MKVEEroLSxN4Zbyrnb7Sh7) | `claude/keen-mccarthy-i7kn75` | Revisión diaria de la web y su informe (8:57), guías y cifras, tema, BOE, programas electorales, página /enlaces/. Redes: Facebook a las 11:00, carruseles de Instagram a las 19:00 (lunes, miércoles y viernes), Shorts sin voz a las 13:00 (lunes, miércoles y viernes), Reels sin voz a las 13:00 (martes, jueves y sábados) y X en Typefully con el calendario del banco |
| Mejores reels semanales (session_01KzuJZD4D6R2fz968RLVGjb) | `claude/eager-dijkstra-b175sb` | Reels con voz en Instagram, Facebook, YouTube y X (martes y jueves a las 20:43, domingos a las 12:24) y sus versiones para X |
| Estadísticas de la web (session_01KzuJZDJMemstDB6n9A1a5r) | la suya | Estadísticas, Search Console, Bing y analítica |

## Reglas

1. **No se mueve, cambia ni borra lo que es de otra conversación.** Si algo choca, se apunta abajo y lo resuelve la conversación a la que le toca.
2. **Todo cambio en Metricool, Typefully o Buffer se apunta**, con su fecha, red, hora e id, en el registro de la propia rama: `publicacion/redes/programado/metricool-programadas.md` (revisión) o `redes/reels/semana-NN/CALENDARIO.md` (reels). Después, push.
3. **Cambios en la web** (tema, ajustes de WordPress, plugins, Search Console): se apuntan en `publicacion/PLAN-PUBLICACION.md` de la propia rama.
4. **Cupo gratis de X (Typefully, 10 al mes):** en noviembre ya está completo (6 del calendario y 4 reels). Antes de programar en X, mirar este archivo.
5. **Pausa de guías nuevas** hasta que salgan todos los programas electorales (decisión del 5/11): no se publican guías, páginas ni secciones nuevas. Sí se arregla lo que falle y se actualizan las cifras.
6. Las cifras siempre salen de `contenido/<cat>/<slug>/articulo.md` y su `verificacion-fuentes.md`. Credenciales, solo de `WP_USER` y `WP_APP_PASSWORD`. No se toca el código de AdSense.
7. La revisión diaria lee cada mañana la rama de los reels (y la de estadísticas si tiene commits nuevos) antes de escribir el informe.

## Choques abiertos

- **10/11/2026:** en Metricool ya no aparecen el Reel de Instagram del SOVI del 10/11 a las 13:00 (id 417454305, de la revisión) ni el reel con voz «Naciste en 1960» del 10/11 a las 20:43. Además, el Reel del auxilio de Instagram (antes 417454422, de la revisión) ha pasado del 12/11 al 13/11 y el Short del auxilio, del 11/11 al 13/11. Pendiente: que la conversación de los reels confirme si fue ella y lo apunte en su CALENDARIO.md.
