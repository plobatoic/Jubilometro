# Plan de las categorías 2 a 8 del informe (artículos 22 a 93)

Estado a 29 de septiembre de 2026. La categoría 1 (Jubilación, 21 artículos) está publicada y las 10 herramientas del informe (n.º 94-103) ya estaban en la web. Faltan los 72 artículos de las categorías 2 a 8, más los temas que la web ya tenía preparados como plantilla y el informe no recoge (marcados «extra»).

## Cómo se hacen

Igual que la categoría 1: `contenido/<categoría>/<slug>/articulo.md` con su `verificacion-fuentes.md` (cada dato con fuente oficial; sin fuente, fuera), respuesta rápida, tablas, ejemplos con cifras, preguntas frecuentes, fuentes oficiales, siguiente paso y enlaces internos (pilar, calculadora de la web y 2-4 artículos hermanos). `npm test`, `npm run publicar` y `npm run comprobar` en verde antes de subir.

## Publicación

El plan inicial era programar un artículo por día laborable (el informe, en su apartado 5.7, recomienda un ritmo sostenible). El 29 de septiembre de 2026 el propietario pidió que las portadas de sección no estuvieran vacías y que se publicaran ese mismo día, **revisándolos poco a poco**: los 63 artículos programados se revisaron uno a uno y se publicaron en ocho tandas a lo largo del día, y los que faltan se publican al terminarlos y revisarlos.

- `publicacion: AAAA-MM-DD` en el front matter: con fecha futura, `npm run subir` lo deja **programado** a las 8:00; con la fecha de hoy, lo **publica en el momento** (con la hora de la subida, así las portadas de sección, que ordenan por fecha, muestran primero lo último).
- `npm run subir -- --solo=/categoria/slug/,...` sube solo los artículos indicados. Después hay que hacer una **subida completa** (`npm run subir`) para que los demás artículos enlacen a los nuevos, y `npm run comprobar-web`. Las entradas que no han cambiado no se reescriben.

Las cifras de 2026 caducan con la revalorización de enero de 2027: ese mes hay que actualizar los artículos que las usan.

## Lista

Plantilla = borrador que la web ya tenía con foto (se reutiliza y pasa a la URL indicada). Fase del informe: F1, F2, F3.

| # | Artículo | URL | Plantilla | Fase | Estado |
|---|---|---|---|---|---|
| 22 | Cómo se calcula la pensión de jubilación: el sistema dual | /cuanto-cobrare/como-se-calcula-la-pension/ | sistema-dual | F1 | publicado 29/09 |
| 23 | Base reguladora de jubilación | /cuanto-cobrare/base-reguladora/ | base-reguladora | F2 | publicado 29/09 |
| 24 | Porcentaje de pensión según años cotizados | /cuanto-cobrare/porcentaje-anos-cotizados/ | porcentaje-anos-cotizados | F1 | publicado 29/09 |
| 25 | Lagunas de cotización | /cuanto-cobrare/lagunas-de-cotizacion/ | | F2 | publicado 29/09 |
| 26 | Pensión máxima de jubilación 2026 | /cuanto-cobrare/pension-maxima/ | pension-maxima-minima | F1 | publicado 29/09 |
| 27 | Pensión mínima de jubilación 2026 | /cuanto-cobrare/pension-minima/ | | F1 | publicado 29/09 |
| 28 | Complemento a mínimos | /cuanto-cobrare/complemento-a-minimos/ | complemento-a-minimos | F2 | publicado 29/09 |
| 29 | Complemento de brecha de género | /cuanto-cobrare/complemento-brecha-genero/ | complemento-brecha-genero | F2 | publicado 29/09 |
| 30 | Cuánto cobraré si gano 1.500, 2.000 o 3.000 € | /cuanto-cobrare/pension-segun-sueldo/ | | F2 | publicado 29/09 |
| 31 | Pensión bruta y neta: IRPF | /cuanto-cobrare/pension-bruta-y-neta/ | | F2 | publicado 29/09 |
| 32 | Informe de vida laboral: errores que rebajan la pensión | /cuanto-cobrare/informe-vida-laboral/ | | F2 | publicado 29/09 |
| 33 | Revalorización de las pensiones en 2027 | /cuanto-cobrare/revalorizacion-pensiones/ | revalorizacion-pensiones | F1 | publicado 29/09 |
| 34 | Pagas extra de los pensionistas | /cuanto-cobrare/pagas-extra/ | | F2 | publicado 29/09 |
| 35 | Calendario de pago de las pensiones | /cuanto-cobrare/calendario-pago-pensiones/ | calendario-pago-pensiones | F1 | publicado 29/09 |
| 36 | El MEI y la cuota de solidaridad | /cuanto-cobrare/mei-cuota-solidaridad/ | | F3 | publicado 29/09 |
| 37a | Pensión de viudedad: requisitos | /viudedad/requisitos/ | requisitos | F1 | publicado 29/09 |
| 37b | Pensión de viudedad: cuantía (52, 60 y 70 %) | /viudedad/cuantia/ | cuantia | F1 | publicado 29/09 |
| 37c | Cómo solicitar la pensión de viudedad | /viudedad/solicitar-viudedad/ | solicitar-viudedad | F2 | publicado 29/09 |
| 38 | Viudedad en parejas de hecho | /viudedad/pareja-de-hecho/ | pareja-de-hecho | F2 | publicado 29/09 |
| 39 | Viudedad y jubilación a la vez | /viudedad/viudedad-y-jubilacion/ | | F2 | publicado 29/09 |
| 40 | Viudedad si vuelves a casarte | /viudedad/nuevo-matrimonio/ | | F3 | publicado 29/09 |
| 41 | Viudedad tras divorcio o separación | /viudedad/divorcio-separacion/ | divorcio-separacion | F3 | publicado 29/09 |
| 42 | Pensión de orfandad | /viudedad/pension-orfandad/ | pension-orfandad | F3 | publicado 29/09 |
| 43 | Qué hacer cuando fallece un pensionista | /viudedad/fallecimiento-pensionista/ | | F2 | publicado 29/09 |
| 44 | Pensión en favor de familiares | /viudedad/favor-de-familiares/ | | F3 | publicado 29/09 |
| extra | Viudedad y trabajo | /viudedad/compatibilidad-trabajo/ | compatibilidad-trabajo | | publicado 29/09 |
| extra | Prestación temporal de viudedad | /viudedad/prestacion-temporal/ | prestacion-temporal | | publicado 29/09 |
| 45 | Grados de incapacidad permanente | /incapacidad/grados-incapacidad/ | | F1 | publicado 29/09 |
| 46 | Incapacidad permanente total | /incapacidad/incapacidad-total/ | incapacidad-total | F1 | publicado 29/09 |
| 47 | Incapacidad permanente absoluta | /incapacidad/incapacidad-absoluta/ | incapacidad-absoluta | F2 | publicado 29/09 |
| 48 | Enfermedades y tribunal médico | /incapacidad/enfermedades/ | | F2 | publicado 29/09 |
| 49 | Cómo solicitar la incapacidad permanente | /incapacidad/solicitar/ | | F2 | publicado 29/09 |
| 50 | Incapacidad denegada: reclamación y demanda | /incapacidad/denegada/ | | F2 | publicado 29/09 |
| 51 | Incapacidad total cualificada | /incapacidad/total-cualificada/ | | F3 | publicado 29/09 |
| 52 | Incapacidad temporal: qué pasa a los 545 días | /incapacidad/incapacidad-temporal/ | incapacidad-temporal | F2 | publicado 29/09 |
| 53 | Incapacidad permanente y jubilación | /incapacidad/incapacidad-y-jubilacion/ | incapacidad-y-jubilacion | F3 | publicado 29/09 |
| 54 | Abogado de incapacidad permanente | /incapacidad/abogado/ | | F3 | |
| extra | Gran incapacidad | /incapacidad/gran-incapacidad/ | gran-incapacidad | | publicado 29/09 |
| extra | Incapacidad permanente parcial | /incapacidad/incapacidad-parcial/ | incapacidad-parcial | | publicado 29/09 |
| extra | Revisión del grado | /incapacidad/revision-grado/ | revision-grado | | |
| extra | Incapacidad permanente y trabajo | /incapacidad/incapacidad-y-trabajo/ | incapacidad-y-trabajo | | |
| 55 | Pensión no contributiva de jubilación | /ayudas/pension-no-contributiva/ | pension-no-contributiva | F1 | publicado 29/09 |
| 56 | Pensión no contributiva de invalidez | /ayudas/pnc-invalidez/ | | F2 | publicado 29/09 |
| 57 | Ingreso Mínimo Vital para mayores de 65 | /ayudas/ingreso-minimo-vital-mayores/ | ingreso-minimo-vital-mayores | F3 | publicado 29/09 |
| 58 | Bono social eléctrico para pensionistas | /ayudas/bono-social-electrico/ | bono-social-electrico | F2 | publicado 29/09 |
| 59 | Ayudas para mayores por comunidad autónoma | /ayudas/ayudas-autonomicas/ | ayudas-autonomicas | F3 | |
| 60 | Descuentos para pensionistas | /ayudas/descuentos-transporte/ | descuentos-transporte | F3 | |
| 61 | Complemento de alquiler | /ayudas/complemento-alquiler/ | complemento-alquiler | F3 | publicado 29/09 |
| 76 | Adaptar la casa de una persona mayor | /ayudas/ayudas-vivienda/ | ayudas-vivienda | F3 | |
| extra | Trámites online para mayores | /ayudas/tramites-online/ | tramites-online | | |
| 62 | Ley de dependencia: guía para familias | /dependencia/ley-dependencia/ | | F1 | publicado 29/09 |
| 63 | Dependencia en Andalucía | /dependencia/andalucia/ | | F2 | publicado 29/09 |
| 64 | Dependencia en la Comunidad de Madrid | /dependencia/madrid/ | | F2 | publicado 29/09 |
| 65 | Dependencia en Cataluña | /dependencia/cataluna/ | | F2 | publicado 29/09 |
| 66 | Dependencia en la Comunitat Valenciana | /dependencia/comunitat-valenciana/ | | F2 | publicado 29/09 |
| 67 | Grados de dependencia y baremo | /dependencia/grados/ | grados | F1 | publicado 29/09 |
| 68 | Prestación por cuidados en el entorno familiar | /dependencia/prestacion-cuidados-familiares/ | prestacion-cuidados-familiares | F2 | publicado 29/09 |
| 69 | Cuánto tarda la dependencia por comunidad | /dependencia/tiempos-dependencia/ | | F2 | publicado 29/09 |
| 70 | Reclamar la dependencia por silencio | /dependencia/reclamar-dependencia/ | | F3 | |
| 71 | Residencia pública o privada | /dependencia/residencias-publicas/ | residencias-publicas | F2 | publicado 29/09 |
| 72 | Precio de las residencias por comunidad (no hay datos oficiales por provincia) | /dependencia/precio-residencias/ | | F1 | publicado 29/09 |
| 73 | Cuidadora interna o externa | /dependencia/cuidadora-interna-externa/ | | F2 | publicado 29/09 |
| 74 | Teleasistencia | /dependencia/teleasistencia/ | teleasistencia | F3 | |
| 75 | Centro de día | /dependencia/centro-de-dia/ | centro-de-dia | F3 | |
| 77 | Grado de discapacidad del 33 y del 65 % | /dependencia/grado-discapacidad/ | | F2 | publicado 29/09 |
| extra | Cómo solicitar la dependencia | /dependencia/solicitar-dependencia/ | solicitar-dependencia | | |
| extra | Servicio de ayuda a domicilio | /dependencia/ayuda-a-domicilio/ | ayuda-a-domicilio | | |
| extra | Convenio especial del cuidador | /dependencia/convenio-cuidador/ | convenio-cuidador | | |
| 78 | Declaración de la renta de los jubilados | /dinero/declaracion-renta-jubilados/ | declaracion-renta-jubilados | F1 | publicado 29/09 |
| 79 | Retención de IRPF en la pensión (modelo 145) | /dinero/irpf-pensiones/ | irpf-pensiones | F3 | |
| 80 | Rescatar el plan de pensiones al jubilarte | /dinero/rescate-plan-pensiones/ | rescate-plan-pensiones | F1 | publicado 29/09 |
| 81 | Rescate de aportaciones de más de 10 años | /dinero/rescate-aportaciones-10-anos/ | | F2 | publicado 29/09 |
| 82 | Hipoteca inversa, nuda propiedad o renta vitalicia | /dinero/hipoteca-inversa/ | hipoteca-inversa | F2 | publicado 29/09 |
| 83 | Vender la vivienda habitual con más de 65 años | /dinero/vender-vivienda-65/ | vender-vivienda-65 | F2 | publicado 29/09 |
| 84 | Renta vitalicia asegurada: exención para mayores de 65 | /dinero/renta-vitalicia/ | renta-vitalicia | F3 | |
| 85 | Seguro de decesos a partir de los 60 | /dinero/seguro-decesos/ | | F2 | publicado 29/09 |
| 86 | Seguros de salud para mayores de 65 | /dinero/seguro-salud-mayores/ | | F2 | publicado 29/09 |
| 87 | Cuánto dinero necesitas ahorrado para jubilarte | /dinero/ahorro-jubilacion/ | ahorro-jubilacion | F2 | publicado 29/09 |
| 88 | Cobrar la pensión viviendo en el extranjero | /dinero/pension-extranjero/ | | F3 | |
| 89 | Domiciliar la pensión | /dinero/domiciliar-pension/ | | F3 | |
| extra | Herencias y donaciones en vida | /dinero/herencias-donaciones/ | herencias-donaciones | | |
| 90 | Viajes del Imserso 2026-2027 | /imserso/viajes-imserso/ | viajes-imserso | F1 | publicado 29/09 |
| 91 | Termalismo del Imserso | /imserso/termalismo/ | termalismo | F3 | |
| 92 | Tarjeta dorada y carné de mayores | /imserso/tarjeta-mayores/ | | F3 | |
| 93 | Universidades y cursos para mayores | /imserso/universidad-mayores/ | | F3 | |
| extra | Requisitos de los viajes del Imserso | /imserso/requisitos-viajes/ | requisitos-viajes | | |
| extra | Cómo solicitar los viajes del Imserso | /imserso/solicitar-viajes/ | solicitar-viajes | | |
| extra | Plazas libres del Imserso | /imserso/plazas-libres/ | plazas-libres | | |
| extra | Programas de viajes de las comunidades | /imserso/turismo-autonomico/ | turismo-autonomico | | |

Los artículos nuevos sin plantilla salen sin foto destacada: hay que añadírsela (fotos CC0, como en la categoría 1).

Además, las portadas de categoría (Cuánto cobraré, Viudedad, Incapacidad, Ayudas, Dependencia, Dinero e IMSERSO) necesitan su texto pilar de 600-1.000 palabras en la «zona de redacción» y el número de guías al día.
