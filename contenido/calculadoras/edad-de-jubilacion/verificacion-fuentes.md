# Verificación de datos · Calculadora de edad de jubilación

Tabla para el revisor profesional. Las reglas legales son las mismas que las del artículo [edad de jubilación](../../jubilacion/edad-de-jubilacion/verificacion-fuentes.md), filas 1 a 5: se remite a su verificación.

**Limitación de esta versión (27/09/2026):** la red del entorno de redacción bloqueó boe.es y seg-social.es. Las filas «Cotejar en BOE» deben leerse en el texto consolidado de la LGSS.

| # | Dato de la página | Fuente primaria | Comprobación | Estado |
|---|---|---|---|---|
| 1 | 2026: 65 años con 38 años y 3 meses; si no, 66 años y 10 meses. 2027 y siguientes: 65 años con 38 años y 6 meses; si no, 67 | Art. 205.1.a) y DT 7.ª LGSS | Ver filas 1 y 3 de la verificación del artículo de edad de jubilación | Cotejar en BOE |
| 2 | Se aplican las reglas del año del hecho causante | DT 7.ª LGSS | Ver fila 4 de la verificación del artículo de edad de jubilación | Cotejar en BOE |
| 3 | Edad y cotización en años y meses completos, sin pagas extra | Art. 205.1.a) LGSS | Ver fila 2 de la verificación del artículo de edad de jubilación | Cotejar en BOE |
| 4 | Ejemplos de Rosa, Luis, Elena y Pedro | Deriva de la DT 7.ª | `herramientas/edad-jubilacion/edad-jubilacion.mjs` (la misma función que ejecuta la calculadora), con referencia 27/09/2026 | Cálculo propio |
| 5 | Anticipada: hasta 2 años (voluntaria) o 4 (involuntaria) | Arts. 207 y 208 LGSS | Ver filas 9 y 11 de la verificación del artículo de edad de jubilación | Verificado |
| 6 | Paro contributivo cotiza; subsidio de mayores de 52 cotiza pero no sirve para los 15 años mínimos | Arts. 273 y 280 LGSS | Ver fila 18 de la verificación del artículo de edad de jubilación y el artículo del subsidio de mayores de 52 | Verificado |
| 7 | El cálculo se hace en el navegador y no se envían datos | Código del widget | `herramientas/edad-jubilacion/widget.plantilla.html`: no hay peticiones de red ni almacenamiento | Verificado |

Si cambia la ley (por ejemplo, la proposición de ley tomada en consideración el 22/09/2026), hay que actualizar a la vez `CALENDARIO` en `edad-jubilacion.mjs`, volver a generar el widget (`node herramientas/edad-jubilacion/construir.mjs`) y revisar esta página.
