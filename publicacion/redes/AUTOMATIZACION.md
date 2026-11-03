# Redes de Jubilómetro: qué está automatizado y qué no

Puesto al día el 3/11/2026. El titular quiere que Claude cree y publique todo, y él solo revisar.

## Lo que hace Claude solo, cada día (revisión de las 8:57)

| Red | Cómo | Estado |
|---|---|---|
| Facebook (página) | Metricool, marca 7853768: una publicación al día a las 11:00, con el enlace en el primer comentario | Funcionando: programado del 5 al 18/11 |
| Instagram | Metricool: carrusel de 8 imágenes lunes, miércoles y viernes a las 19:00 | Funcionando: programado del 5 al 18/11 |
| X | Typefully, social set 357816 (plan gratis, pocas publicaciones al mes): solo lo más útil (IPC, subida, BOE, elecciones) | Funcionando: 5 programadas del 5 al 12/11 |

Cada mañana Claude: comprueba las cifras de lo que va a salir contra su guía (`herramientas/redes/comprobar-cifras.mjs`), repone lo programado para tener unos 14 días por delante, mira las estadísticas en Metricool y lo cuenta en el informe diario, con la lista de lo que sale en los próximos 3 días.

## Lo que revisa el titular

- El informe diario: lo que sale en los próximos días. Si algo no le gusta, lo cambia o lo borra en la app de Metricool (pestaña Planificación), o se lo dice a Claude.
- Los comentarios y mensajes privados: los conectores no permiten leerlos ni contestarlos. Se ven en la app de Metricool (Bandeja de entrada) o en cada red.

## Lo que ningún conector permite y se hace una sola vez

Foto de perfil, portada, biografía, enlace y categoría de cada perfil. Dos formas:

1. Claude lo hace desde la app de escritorio de Claude con Claude in Chrome (o el uso del ordenador), en el navegador del titular con sus sesiones abiertas y sin contraseñas.
2. El titular, en unos 10 minutos, con `publicacion/redes/kit/biografias.md` y las imágenes de `publicacion/redes/kit/`.

## Para más adelante, si se quiere

- Publicaciones de X sin límite: la API de X de pago por uso (unos céntimos por publicación) con las claves guardadas en la configuración del entorno, nunca en el chat.
- Aprobación previa de cada publicación: Metricool lo permite con un plan de equipo, de pago. Con el plan gratis, la revisión se hace con el informe diario.
