// Primer mes de redes (12 de octubre a 8 de noviembre de 2026): textos listos para publicar.
// Cada cifra sale de una guía de la web (se indica en «fuente») con su dato a 9 de octubre de 2026.
// Los enlaces son cortos y llevan la red al final (jubilometro.com/edad/x): así las estadísticas
// de la web saben qué publicación trae cada visita. En Facebook no van enlaces (Meta limita a 2 al
// mes las publicaciones con enlace de las páginas sin verificar); en Instagram, «enlace en la biografía».
//
// Genera la página y el CSV: node herramientas/redes/calendario.mjs herramientas/redes/mes-1.mjs

const L = (codigo, red) => `jubilometro.com/${codigo}${red ? `/${red}` : ''}`;
const FB_WEB = 'Tienes la guía completa en la web de Jubilómetro: el enlace está en la información de esta página.';

export const MES = {
  titulo: 'Primer mes de redes',
  desde: '2026-10-12',
  hasta: '2026-11-08',
  horas: { x: '09:00', facebook: '11:00', grupo: '10:00', instagram: '19:00', linkedin: '08:30', whatsapp: '10:00', video: '13:00' },
};

export const PUBLICACIONES = [
  /* ===================== SEMANA 1 · 12 a 18 de octubre ===================== */
  {
    fecha: '2026-10-12', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/edad-de-jubilacion/',
    texto: `La pregunta que más nos llega: «¿a qué edad me jubilo?».

En 2027, a los 67 años, o a los 65 si llevas al menos 38 años y 6 meses cotizados. Cuenta el año en que te jubilas, no el año en que naciste.

Pon tu fecha y te da el mes exacto: ${L('edad', 'x')}`,
  },
  {
    fecha: '2026-10-12', red: 'facebook', pilar: 'Presentación',
    texto: `Esta es la página de Jubilómetro, una web de guías y calculadoras sobre jubilación y pensiones en España.

Cada semana publicaremos aquí las cifras que te afectan: la subida de las pensiones, la paga extra, los plazos del Imserso, la dependencia o la viudedad. Cada dato lleva la norma o el organismo del que sale, y la fecha.

No vendemos nada ni damos consejos personales en público. Si tienes una duda sobre tu caso, pregúntala en nuestro grupo «Jubilación y pensiones: dudas resueltas» (sin datos personales) y te contestamos con la ley en la mano.`,
    imagen: 'Logo de Jubilómetro sobre fondo azul con el texto «Las cifras de tu pensión, con su norma y su fecha».',
  },
  {
    fecha: '2026-10-12', red: 'grupo', tipo: 'Pregunta de la semana', pilar: 'Comunidad',
    texto: `Pregunta de la semana: ¿cuál es la duda sobre tu pensión que nadie te ha sabido contestar?

Cuéntala aquí sin datos personales (ni DNI, ni número de la Seguridad Social, ni datos de salud). Esta semana contestamos todas, con la norma que se aplica en cada caso.`,
  },
  {
    fecha: '2026-10-12', hora: '13:00', red: 'x', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/elecciones-y-pensiones/',
    texto: `¿Afectan las elecciones del 29 de noviembre a la subida de las pensiones de 2027?

A la cifra, no: la fija la ley con el IPC medio. Sí puede retrasar el decreto que la aplica. En 2020 llegó el 14 de enero, con efectos desde el 1 de enero.

${L('elecciones', 'x')}`,
  },
  {
    fecha: '2026-10-12', hora: '18:00', red: 'facebook', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/elecciones-y-pensiones/',
    texto: `Muchos nos preguntáis si las elecciones del 29 de noviembre afectan a las pensiones. Esto es lo que dicen las normas.

La pensión de noviembre, la paga extra y la de diciembre llegan como siempre. La subida de enero la fija la ley con el IPC medio de diciembre a noviembre, así que no depende de quién gane.

Lo que puede retrasarse es el decreto que la aplica. En 2020, con un Gobierno en funciones, se aprobó el 14 de enero: la subida contó desde el 1 de enero y lo de enero se pagó como atrasos en febrero.

Si no puedes ir a votar, el voto por correo se pide hasta el 19 de noviembre en Correos. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-13', red: 'x', tipo: 'Hilo', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/revalorizacion-pensiones/',
    partes: [
      `Cómo se calcula la subida de las pensiones de enero de 2027 y por qué hoy solo se puede dar una horquilla. Hilo en cinco pasos.`,
      `1. La ley (artículo 58 de la Ley General de la Seguridad Social) sube las pensiones contributivas lo que suba de media el IPC de diciembre a noviembre. Para 2027, de diciembre de 2025 a noviembre de 2026.`,
      `2. Con los datos del INE hasta septiembre, esa media va por el 3,33 %. Faltan octubre y noviembre.`,
      `3. Si los dos meses que faltan se quedan como septiembre (4,9 %), la subida sería del 3,6 %. Con lo que pueda pasar, la horquilla está entre el 3,3 % y el 3,7 %.`,
      `4. En euros al mes, en 14 pagas: 1.000 € suben entre 33 y 37 €; 1.500 €, entre 49,50 y 55,50 €; 2.000 €, entre 66 y 74 €.`,
      `5. La cifra exacta se sabrá con el IPC adelantado de noviembre, a final de mes. Las pensiones mínimas y las no contributivas suben algo más. Tu pensión, con la subida: ${L('subida', 'x')}`,
    ],
  },
  {
    fecha: '2026-10-13', hora: '13:00', red: 'x', pilar: 'Calendario y avisos', fuente: '/jubilacion/anticipada-40-anos-cotizados/',
    texto: `La proposición de ley para jubilarse antes sin recorte con 40 años cotizados decae: con la disolución de las Cortes caducan las leyes a medio tramitar.

Tendría que volver a presentarse desde cero. Hoy sigue el recorte. ${L('40-anos-cotizados', 'x')}`,
  },
  {
    fecha: '2026-10-13', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/cuantia/',
    texto: `La pensión de viudedad no siempre es el 52 %. Es un porcentaje de la base reguladora de la persona fallecida, y hay tres:

El 52 % es el caso general.
El 60 % es para quien tiene 65 años o más, no cobra otra pensión pública, no trabaja y no pasa de 9.442 euros al año de otras rentas. Ese 60 % hay que pedirlo: no llega solo.
El 70 % es para quien tiene cargas familiares, ingresos bajos y vive principalmente de la viudedad.

Si el resultado queda por debajo de la pensión mínima y cumples el límite de ingresos, se completa: en 2026, entre 709,40 y 1.256,60 euros al mes según la edad y las cargas.

${FB_WEB}`,
  },
  {
    fecha: '2026-10-13', red: 'instagram', tipo: 'Carrusel', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/cuantia/',
    diapositivas: [
      '¿Cuánto se cobra de viudedad? No siempre es el 52 %.',
      'Se cobra un porcentaje de la base reguladora de la persona fallecida.',
      '52 %: el caso general.',
      '60 %: si tienes 65 años o más, no cobras otra pensión pública ni trabajas, y tus otras rentas no pasan de 9.442 € al año.',
      'Ese 60 % no llega solo: hay que pedirlo a la Seguridad Social.',
      '70 %: si tienes cargas familiares, la viudedad es tu principal ingreso y tus ingresos son bajos.',
      'Si queda por debajo de la mínima, se completa: entre 709,40 y 1.256,60 € al mes en 2026.',
      'Guárdalo y envíaselo a quien le pueda servir. Calcula la viudedad en Jubilómetro (enlace en la biografía).',
    ],
    texto: `La viudedad puede ser el 52 %, el 60 % o el 70 % de la base reguladora. El 60 % para mayores de 65 hay que pedirlo. Calcula la tuya con el enlace de la biografía.

#viudedad #pensiones #seguridadsocial #jubilacion`,
  },
  {
    fecha: '2026-10-13', red: 'linkedin', pilar: 'Profesionales', fuente: '/calculadoras/para-tu-web/',
    texto: `Cada semana, en muchas gestorías, asesorías laborales y asociaciones de mayores alguien pregunta lo mismo: a qué edad me jubilo y cuánto voy a cobrar.

En Jubilómetro hemos preparado diez calculadoras (edad de jubilación, pensión, anticipada, viudedad, pensión neta tras el IRPF y otras) que cualquier web puede insertar gratis. Se copia un código y aparecen en vuestra página, sin anuncios ni cookies, y cada resultado explica la norma que aplica.

Si atendéis consultas de pensiones y os puede ahorrar tiempo, el código está en el primer comentario. Y si echáis en falta alguna calculadora, decídmelo.`,
    comentario: `Código para insertarlas: ${L('para-tu-web', 'in')}`,
  },
  {
    fecha: '2026-10-13', red: 'video', tipo: 'Vídeo (listo)', pilar: 'Calcula tu caso', fuente: '/jubilacion/edad-de-jubilacion/',
    archivo: 'video-02-naciste-1962.mp4',
    titulo: '¿Naciste en 1962? Esta es tu edad de jubilación',
    texto: `Si naciste en 1962, cumples 65 en 2027. Te jubilas entonces si llevas 38 años y 6 meses cotizados; si no, a los 67, en 2029. Tu mes exacto: ${L('edad', 'yt')}

#jubilacion #pensiones #edaddejubilacion`,
    guion: [
      ['0-3 s', '¿Naciste en 1962?', 'Si naciste en 1962, esta es tu edad de jubilación.'],
      ['3-12 s', '65 años en 2027… si llevas 38 años y 6 meses cotizados', 'Cumples 65 en 2027. Si para entonces llevas 38 años y 6 meses cotizados, te jubilas a los 65 sin recorte.'],
      ['12-20 s', 'Si no llegas: 67 años, en 2029', 'Si no llegas, te toca a los 67, en 2029.'],
      ['20-26 s', 'Cuentan los años cotizados el día que te jubilas', 'Cuentan los años que tengas cotizados el día que te jubilas, no los de hoy.'],
      ['26-30 s', 'jubilometro.com/edad', 'Pon tu fecha en jubilometro.com/edad y te dice el mes exacto.'],
    ],
  },
  {
    fecha: '2026-10-14', hora: '09:15', red: 'x', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/revalorizacion-pensiones/',
    nota: 'Día del IPC definitivo de septiembre (INE, 9:00). Comprueba el dato antes de publicar: si cambia la horquilla, avísame y actualizo la guía, la calculadora y este texto.',
    texto: `El INE confirma hoy el IPC de septiembre: [4,9] %.

Con él, la subida de las pensiones de enero de 2027 sigue apuntando a entre el 3,3 % y el 3,7 %. Con 1.000 € de pensión, entre 33 y 37 € más al mes.

Calcula la tuya: ${L('subida', 'x')}`,
  },
  {
    fecha: '2026-10-14', red: 'whatsapp', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/revalorizacion-pensiones/',
    nota: 'Primer aviso del canal. Comprueba el dato del INE de las 9:00 antes de enviarlo.',
    texto: `Hola. Este es el canal de Jubilómetro: dos o tres avisos a la semana sobre lo que cambia en las pensiones (la subida, la paga extra, los plazos del Imserso y las novedades del BOE). Nadie ve tu número.

Primer aviso: con el IPC de septiembre que ha confirmado hoy el INE, la subida de las pensiones de enero de 2027 va por el 3,3-3,7 %. Con una pensión de 1.000 €, entre 33 y 37 € más al mes.

Calcula la tuya: ${L('subida', 'wa')}`,
  },
  {
    fecha: '2026-10-14', red: 'linkedin', pilar: 'Profesionales', fuente: '/cuanto-cobrare/elecciones-y-pensiones/',
    texto: `Para quien asesora a futuros jubilados: qué cambia con la disolución de las Cortes del 6 de octubre.

Decaen las iniciativas que estaban en tramitación (artículo 207 del Reglamento del Congreso). Entre ellas, la proposición de ley para eliminar los coeficientes reductores con 40 años cotizados, que estaba en fase de enmiendas. Quien estuviera esperando esa reforma para jubilarse anticipadamente sigue sujeto a los recortes actuales.

La revalorización de 2027 no cambia de fórmula (artículo 58 LGSS), pero el decreto que la aplica puede retrasarse con un Gobierno en funciones, como en 2020, cuando se aprobó el 14 de enero con efectos desde el 1 de enero. Lo hemos resumido, con las fuentes del BOE, en el enlace del primer comentario.`,
    comentario: `Elecciones y pensiones: ${L('elecciones', 'in')}`,
  },
  {
    fecha: '2026-10-14', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/revalorizacion-pensiones/',
    texto: `Subida de las pensiones en enero de 2027: lo que se sabe hoy.

La ley sube las pensiones lo que sube de media el IPC de diciembre a noviembre. Con los datos del INE hasta septiembre, la subida apunta a entre el 3,3 % y el 3,7 %. La cifra exacta se sabrá a finales de noviembre.

En euros al mes, en bruto y en 14 pagas:
800 € pasarían a cobrar entre 826,40 y 829,60 €.
1.000 €, entre 1.033 y 1.037 €.
1.500 €, entre 1.549,50 y 1.555,50 €.

La subida se aplica sola en enero: no hay que pedir nada. ${FB_WEB}`,
    imagen: 'Tabla grande con las tres pensiones de ejemplo y la horquilla 3,3-3,7 %, con «Estimación con el IPC hasta septiembre» abajo.',
  },
  {
    fecha: '2026-10-15', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/15-anos-cotizados/',
    texto: `Con 15 años cotizados ya tienes pensión de jubilación, pero del 50 % de tu base reguladora y a los 67 años.

Ojo: 2 de esos 15 años tienen que estar dentro de los 15 anteriores a jubilarte. Si sale baja, el complemento a mínimos puede subirla.

${L('15-anos', 'x')}`,
  },
  {
    fecha: '2026-10-15', red: 'facebook', pilar: 'Calendario y avisos', fuente: '/imserso/tarjeta-mayores/',
    texto: `La Tarjeta Dorada de Renfe cuesta 6 euros al año y se puede sacar desde los 60 años.

Da un 40 % de descuento en Cercanías y Media Distancia y un 25 % en AVE y Larga Distancia. Se saca en la taquilla de la estación o en una agencia de viajes, y se renueva por internet.

Además, varias comunidades tienen su propia tarjeta gratuita para mayores, como la Andalucía Junta 65 o el Carné +65 de Galicia, que llega a casa sin pedirlo. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-15', red: 'linkedin', pilar: 'Profesionales', fuente: '/jubilacion/demorada/',
    texto: `Un cambio que conviene tener presente al asesorar a quien quiere seguir trabajando después de su edad de jubilación.

La jubilación demorada da, por cada año completo de retraso, un 4 % más de pensión para siempre, un pago único (según la Seguridad Social, entre unos 4.800 y 13.500 euros por año) o una combinación de ambos. Desde abril de 2025 también cuentan los semestres a partir del segundo año, con un 2 % por cada seis meses.

Y desde el 28 de agosto de 2026 la opción mixta exige al menos dos años completos de demora. La guía con los ejemplos y la norma, en el primer comentario.`,
    comentario: `Guía de la jubilación demorada: ${L('demorada', 'in')}`,
  },
  {
    fecha: '2026-10-15', red: 'video', tipo: 'Vídeo (listo)', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/revalorizacion-pensiones/',
    archivo: 'video-01-subida-2027.mp4',
    nota: 'Publícalo después de comprobar el IPC del 14 de octubre. Si la horquilla cambia, te rehago el vídeo.',
    titulo: 'Subida de las pensiones en 2027: cuánto cobrarás con 1.000 €',
    texto: `Con los datos del IPC hasta septiembre, las pensiones subirán en enero de 2027 entre un 3,3 % y un 3,7 %. Con 1.000 € de pensión, entre 33 y 37 € más al mes. Calcula la tuya: ${L('subida', 'yt')}

#pensiones #subidapensiones #jubilacion`,
    guion: [
      ['0-3 s', '¿Cuánto subirá tu pensión en 2027?', '¿Cuánto subirá tu pensión en enero?'],
      ['3-10 s', 'Entre un 3,3 % y un 3,7 %', 'Con el IPC hasta septiembre, la subida va por entre un 3,3 y un 3,7 %.'],
      ['10-20 s', '1.000 € → 1.033 a 1.037 €', 'Si cobras 1.000 euros, pasarás a cobrar entre 1.033 y 1.037 al mes.'],
      ['20-26 s', 'La cifra exacta: a finales de noviembre', 'La cifra exacta se sabrá a finales de noviembre, con el IPC de noviembre.'],
      ['26-30 s', 'jubilometro.com/subida', 'Calcula la tuya en jubilometro.com/subida.'],
    ],
  },
  {
    fecha: '2026-10-16', red: 'x', pilar: 'Familias y cuidados', fuente: '/dependencia/convenio-cuidador/',
    texto: `Si cuidas en casa a tu madre o a tu padre y cobra la prestación por cuidados familiares de la dependencia, puedes seguir cotizando para tu jubilación sin pagar nada: la cuota la paga el Imserso.

Se pide en la Tesorería en los 90 días siguientes. ${L('cuidador', 'x')}`,
  },
  {
    fecha: '2026-10-16', red: 'facebook', pilar: 'Familias y cuidados', fuente: '/dependencia/convenio-cuidador/',
    texto: `Para quien cuida de un familiar dependiente en casa: hay una forma de no perder años de cotización para tu propia jubilación.

Si tu familiar cobra la prestación por cuidados en el entorno familiar y tú figuras como cuidador en su plan de atención, puedes firmar un convenio especial con la Seguridad Social. Cotizas sin pagar nada, porque la cuota la abona el Imserso: por la base mínima (1.424,40 euros al mes en 2026) si el grado es III, por una parte si es II y por la mitad si es I.

Pídelo en la Tesorería General de la Seguridad Social dentro de los 90 días siguientes a que se reconozca la prestación, para que cuente desde ese día. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-16', red: 'instagram', tipo: 'Carrusel', pilar: 'Calcula tu caso', fuente: '/jubilacion/edad-de-jubilacion/',
    diapositivas: [
      'Edad de jubilación en 2027: lo que tienes que saber.',
      'La edad ordinaria llega a los 67 años.',
      'Con 38 años y 6 meses cotizados, te jubilas a los 65 sin recorte.',
      'Cuenta el año en que te jubilas, no el año en que naciste.',
      'Ejemplo: naciste en 1962 y llevas 39 años cotizados → te jubilas a los 65, en 2027.',
      'Ejemplo: naciste en 1962 y llevas 36 años cotizados → te jubilas a los 67, en 2029.',
      'Desde 2027, con la ley actual, estas edades ya no cambian.',
      'Calcula tu mes exacto en Jubilómetro (enlace en la biografía).',
    ],
    texto: `En 2027 la edad de jubilación es de 67 años, o de 65 con 38 años y 6 meses cotizados. Calcula tu mes exacto con el enlace de la biografía.

#jubilacion #pensiones #edaddejubilacion #seguridadsocial`,
  },
  {
    fecha: '2026-10-15', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/elecciones-y-pensiones/',
    texto: `Elecciones del 29 de noviembre y pensiones: la paga extra y las pensiones de noviembre y diciembre llegan como siempre, y la subida de enero la fija la ley con el IPC. Lo que puede retrasarse es el decreto que la aplica.

Si no puedes ir a votar, pide el voto por correo en Correos hasta el 19 de noviembre. Todo, con las fechas: ${L('elecciones', 'wa')}`,
  },
  {
    fecha: '2026-10-16', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/imserso/termalismo/',
    texto: `Aviso: si quieres ir a un balneario del Imserso este otoño, la lista de espera para los turnos de septiembre a diciembre está abierta hasta el 31 de octubre.

Son estancias de 10 días con pensión completa y tratamiento termal, entre 302,14 y 452,90 € por persona. Cómo apuntarte: ${L('balnearios', 'wa')}`,
  },
  {
    fecha: '2026-10-17', red: 'x', pilar: 'Calcula tu caso', fuente: '/cuanto-cobrare/pension-segun-sueldo/',
    texto: `Una regla sencilla: con 37 años cotizados, siempre por la misma base, la pensión al mes es 6/7 de esa base.

Base de 1.500 €: unos 1.286 € de pensión.
Base de 2.000 €: unos 1.714 €.
Base de 3.000 €: unos 2.571 €.

Con tu sueldo: ${L('sueldo', 'x')}`,
  },
  {
    fecha: '2026-10-17', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/compatibilidad-trabajo/',
    texto: `¿Se puede trabajar cobrando la viudedad? Sí: la pensión de viudedad es compatible con cualquier sueldo, por cuenta ajena o como autónomo, sin límite.

Lo que sí puedes perder al trabajar son los extras que dependen de los ingresos: el complemento a mínimos si tus otros ingresos pasan de 9.442 euros al año, el 60 % de los mayores de 65 (vuelves al 52 %) y el 70 % por cargas familiares si superas su límite.

${FB_WEB}`,
  },
  {
    fecha: '2026-10-17', red: 'video', tipo: 'Vídeo (listo)', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/cuantia/',
    archivo: 'video-03-viudedad.mp4',
    titulo: 'Pensión de viudedad: 52 %, 60 % o 70 %',
    texto: `La viudedad no siempre es el 52 %: puede ser el 60 % o el 70 %, y el 60 % hay que pedirlo. Calcula la tuya: ${L('calcula-viudedad', 'yt')}

#viudedad #pensiones #seguridadsocial`,
    guion: [
      ['0-3 s', 'La viudedad no siempre es el 52 %', 'Mucha gente cree que la viudedad es siempre el 52 %.'],
      ['3-10 s', '52 % · caso general', 'El 52 % es el caso general, sobre la base reguladora de quien falleció.'],
      ['10-19 s', '60 % · desde los 65, sin otra pensión ni trabajo', 'Con 65 años o más, sin otra pensión ni trabajo y pocas rentas, es el 60 %. Y hay que pedirlo.'],
      ['19-26 s', '70 % · con cargas familiares', 'Con cargas familiares e ingresos bajos, el 70 %.'],
      ['26-30 s', 'jubilometro.com/calcula-viudedad', 'Calcula la tuya en Jubilómetro.'],
    ],
  },

  /* ===================== SEMANA 2 · 19 a 25 de octubre ===================== */
  {
    fecha: '2026-10-19', red: 'x', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/pension-bruta-y-neta/',
    texto: `Si eres pensionista sin hijos a cargo y tu pensión no pasa de 16.476 € brutos al año (unos 1.176 € en 14 pagas), no te retienen IRPF.

Por encima sube poco a poco: con 1.500 € al mes, en torno al 9 %; con 2.000 €, cerca del 17 %.

Tu neto: ${L('neta', 'x')}`,
  },
  {
    fecha: '2026-10-19', red: 'grupo', tipo: 'Pregunta de la semana', pilar: 'Comunidad',
    texto: `Pregunta de la semana: ¿os adelanta el banco la pensión? ¿Qué día os llega?

La Seguridad Social la paga como tarde el primer día hábil del mes siguiente, pero muchos bancos la adelantan al 22-26 del mismo mes. Contad vuestro banco y el día, y hacemos entre todos la lista.`,
  },
  {
    fecha: '2026-10-19', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/pension-minima/',
    texto: `Pensión mínima de jubilación en 2026, a partir de los 65 años, al mes y en 14 pagas:

Con cónyuge a cargo: 1.256,60 euros.
Si vives solo: 936,20 euros.
Con cónyuge que no está a cargo: 888,70 euros.

No es una pensión aparte. Si tu pensión no llega a esa cifra, la Seguridad Social te paga la diferencia (el complemento a mínimos), siempre que vivas en España y tus otros ingresos no pasen de 9.442 euros al año, o de 11.013 euros si tienes cónyuge a cargo. En enero estas cuantías subirán más que el resto de pensiones.

${FB_WEB}`,
  },
  {
    fecha: '2026-10-20', red: 'x', tipo: 'Hilo', pilar: 'Errores que cuestan dinero',
    partes: [
      `Cinco errores que cuestan dinero en la pensión, y cómo evitarlos. Hilo.`,
      `1. No revisar la vida laboral. Un periodo trabajado que no aparece te quita años cotizados y rebaja la base reguladora. Se pide gratis en Import@ss, también con un SMS, y los errores se pueden rectificar.`,
      `2. Dar por hecho que la viudedad es el 52 %. Con 65 años o más, sin otra pensión ni trabajo y rentas de hasta 9.442 € al año, es el 60 %. Y ese 60 % hay que pedirlo.`,
      `3. Jubilarse antes sin hacer la cuenta. El recorte de la anticipada voluntaria va del 2,81 % al 21 % según los meses y los años cotizados, y es para siempre.`,
      `4. Pensar que los meses sin cotizar cuentan como cero. Los 48 primeros meses de laguna se rellenan con la base mínima y el resto con el 50 %, aunque no suman años cotizados.`,
      `5. Cerrar la cuenta antigua al cambiar la pensión de banco. El cambio se aplica desde el primer día hábil del segundo mes. Hasta entonces la pensión sigue llegando a la cuenta vieja.`,
      `Cada caso tiene su norma. Con el simulador ves tu edad, tu pensión y qué pasa si te jubilas antes o después: ${L('simulador', 'x')}`,
    ],
  },
  {
    fecha: '2026-10-20', red: 'facebook', pilar: 'Calendario y avisos', fuente: '/imserso/plazas-libres/',
    texto: `¿Te quedaste sin viaje del Imserso el día que te tocaba reservar? Todavía hay opciones.

Durante toda la temporada, de octubre de 2026 a junio de 2027, vuelven a la venta las plazas que otras personas cancelan o no pagan a tiempo, sobre todo unos 45 días antes de cada salida.

Para encontrarlas: mira a menudo el buscador de turismosocial.es o mundicolor.es con tu DNI y tu clave, busca también desde otras provincias, sé flexible con el destino y las fechas, y apúntate a la lista de espera si la web te la ofrece. Solo necesitas estar acreditado.

${FB_WEB}`,
  },
  {
    fecha: '2026-10-20', red: 'instagram', tipo: 'Carrusel', pilar: 'Calendario y avisos', fuente: '/imserso/plazas-libres/',
    diapositivas: [
      'Viajes del Imserso: cómo encontrar plazas libres.',
      'Las plazas que otros cancelan o no pagan vuelven a la venta durante toda la temporada.',
      'Sobre todo, unos 45 días antes de cada salida.',
      'Mira a menudo turismosocial.es o mundicolor.es con tu DNI y tu clave.',
      'Busca también desde otras provincias: ya se puede.',
      'Sé flexible con el destino y las fechas, y apúntate a la lista de espera si te la ofrecen.',
      'Hay 879.213 plazas hasta junio de 2027, desde 132,91 € el viaje.',
      'Guía completa en Jubilómetro (enlace en la biografía).',
    ],
    texto: `La temporada del Imserso va hasta junio de 2027 y las plazas canceladas vuelven a la venta. Así se encuentran. Guía en la biografía.

#imserso #viajesimserso #jubilados #pensionistas`,
  },
  {
    fecha: '2026-10-20', red: 'linkedin', pilar: 'Profesionales', fuente: '/incapacidad/total-cualificada/',
    texto: `Para abogados laboralistas y graduados sociales: el 20 % de la incapacidad permanente total cualificada se sigue escapando a mucha gente.

La incapacidad total da una pensión del 55 % de la base reguladora. A partir de los 55 años, si la persona no trabaja, se le suma un 20 %, hasta el 75 % (artículo 6 del Decreto 1646/1972). Con una base reguladora de 1.500 euros se pasa de 825 a 1.125 euros al mes.

El incremento se suspende mientras se trabaja, por cuenta ajena o propia, y se recupera al dejar de hacerlo. La guía con los requisitos, en el primer comentario.`,
    comentario: `Incapacidad total cualificada: ${L('incapacidad-total', 'in')}`,
  },
  {
    fecha: '2026-10-20', red: 'video', tipo: 'Vídeo (listo)', pilar: 'Calendario y avisos', fuente: '/imserso/plazas-libres/',
    archivo: 'video-04-imserso-plazas.mp4',
    titulo: 'Viajes del Imserso: cómo encontrar plazas libres',
    texto: `Las plazas del Imserso que otros cancelan vuelven a la venta toda la temporada, sobre todo unos 45 días antes de cada salida. Cómo encontrarlas: ${L('plazas-imserso', 'yt')}

#imserso #viajesimserso #jubilados`,
    guion: [
      ['0-3 s', '¿Sin plaza del Imserso?', '¿Te quedaste sin viaje del Imserso?'],
      ['3-10 s', 'Las plazas canceladas vuelven a la venta', 'Las plazas que otros cancelan o no pagan vuelven a la venta toda la temporada.'],
      ['10-17 s', 'Sobre todo, 45 días antes de cada salida', 'Sobre todo, unos 45 días antes de cada salida.'],
      ['17-25 s', 'Busca en otras provincias y fechas', 'Busca también desde otras provincias y sé flexible con el destino y las fechas.'],
      ['25-30 s', 'jubilometro.com/plazas-imserso', 'Los trucos, en jubilometro.com/plazas-imserso.'],
    ],
  },
  {
    fecha: '2026-10-21', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/pareja-de-hecho/',
    texto: `Las parejas de hecho cobran la viudedad igual que un matrimonio si estaban inscritas al menos 2 años antes del fallecimiento y convivían 5 años seguidos. Con hijos en común basta la inscripción.

Desde 2022 no hay límite de ingresos. ${L('pareja-de-hecho', 'x')}`,
  },
  {
    fecha: '2026-10-21', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/imserso/plazas-libres/',
    texto: `¿Te quedaste sin viaje del Imserso? Las plazas que otros cancelan vuelven a la venta durante toda la temporada, sobre todo unos 45 días antes de cada salida, y ya puedes buscar desde cualquier provincia.

Cómo encontrarlas, paso a paso: ${L('plazas-imserso', 'wa')}`,
  },
  {
    fecha: '2026-10-21', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/complemento-brecha-genero/',
    texto: `Si tienes hijos y cobras una pensión de jubilación, incapacidad permanente o viudedad, mira si te llega el complemento de brecha de género.

En 2026 son 36,90 euros al mes por cada hijo, con un máximo de cuatro (147,60 euros), en 14 pagas. Lo cobran las madres con carácter general. Los padres, solo si cumplen requisitos concretos, como que su carrera se viera afectada por el nacimiento, y si su pensión es menor que la de la madre. Cada hijo da derecho a un solo complemento.

En enero sube lo mismo que las pensiones. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-22', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/anticipada-voluntaria/',
    texto: `¿Te puedes jubilar antes por decisión propia en 2027? Con 35 años cotizados, hasta 2 años antes: a los 65, o a los 63 si llegas a 38 años y 6 meses.

El recorte va del 2,81 % al 21 % y es para siempre. Haz la cuenta antes: ${L('anticipada', 'x')}`,
  },
  {
    fecha: '2026-10-22', red: 'linkedin', pilar: 'Profesionales', fuente: '/jubilacion/subsidio-mayores-52/',
    texto: `Un dato útil para quien acompaña a personas despedidas a partir de los 52 años: el subsidio para mayores de 52 años del SEPE paga 480 euros al mes en 2026 y dura hasta la edad ordinaria de jubilación.

Mientras se cobra, el SEPE cotiza para la jubilación sobre el 125 % de la base mínima (1.780,50 euros al mes en 2026). Solo cuentan las rentas propias, que no pueden pasar de 915,75 euros al mes.

Requisitos y cómo enlazarlo con la jubilación, en el primer comentario.`,
    comentario: `Subsidio para mayores de 52 años: ${L('subsidio-52', 'in')}`,
  },
  {
    fecha: '2026-10-22', red: 'facebook', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/calendario-pago-pensiones/',
    texto: `¿Qué día se cobra la pensión? La pensión se paga a mes vencido: la de cada mes llega, como tarde, el primer día hábil del mes siguiente, y nunca después del día 4.

En la práctica, la mayoría de bancos la adelantan y el dinero llega entre el 22 y el 26 del mismo mes. Cada banco decide si adelanta y qué día.

Esta semana muchos estáis cobrando ya la de octubre. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-22', red: 'video', tipo: 'Guion', pilar: 'Calcula tu caso', fuente: '/jubilacion/edad-de-jubilacion/',
    titulo: '¿Naciste entre marzo y diciembre de 1960? Ojo con tu edad de jubilación',
    texto: `Si naciste entre marzo y diciembre de 1960 y no llegas a 38 años y 6 meses cotizados, te jubilas a los 67, en 2027, y no a los 66 años y 8 meses. ${L('edad-2027', 'yt')}`,
    guion: [
      ['0-3 s', '¿Naciste en 1960?', 'Si naciste entre marzo y diciembre de 1960, ojo con tu edad de jubilación.'],
      ['3-12 s', 'Muchas tablas dicen 66 años y 8 meses', 'Muchas tablas dicen que te jubilas a los 66 años y 8 meses.'],
      ['12-22 s', 'Te jubilas en 2027: 67 años', 'Pero no llegas a la edad exigida antes de 2027, y en 2027 la edad es de 67 años si no tienes 38 años y 6 meses cotizados.'],
      ['22-30 s', 'jubilometro.com/edad', 'Calcula tu mes exacto en jubilometro.com/edad.'],
    ],
  },
  {
    fecha: '2026-10-23', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/demorada/',
    texto: `Si sigues trabajando después de tu edad de jubilación, cada año completo de retraso te da a elegir: un 4 % más de pensión para siempre, un pago único (entre unos 4.800 y 13.500 € por año, según la Seguridad Social) o una mezcla de los dos.

${L('demorada', 'x')}`,
  },
  {
    fecha: '2026-10-23', red: 'facebook', pilar: 'Calendario y avisos', fuente: '/imserso/termalismo/',
    texto: `Quedan ocho días: la lista de espera de los balnearios del Imserso para los turnos de septiembre a diciembre está abierta hasta el 31 de octubre.

Son estancias de 10 días (9 noches) con pensión completa, reconocimiento médico y el tratamiento termal que te prescriban, por entre 302,14 y 452,90 euros por persona según el balneario y el mes. Pueden ir los pensionistas de jubilación o incapacidad permanente, los de viudedad desde los 55 años y otras personas desde los 60 o 65, con su pareja.

La convocatoria de 2027 sale en el BOE hacia finales de año. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-23', red: 'instagram', tipo: 'Carrusel', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/pension-minima/',
    diapositivas: [
      'Pensión mínima de jubilación 2026 (desde los 65 años).',
      'Con cónyuge a cargo: 1.256,60 € al mes.',
      'Si vives solo: 936,20 € al mes.',
      'Con cónyuge que no está a cargo: 888,70 € al mes.',
      'Todo en 14 pagas.',
      'No es una pensión aparte: si la tuya no llega, se completa con el complemento a mínimos.',
      'Requisitos: vivir en España y no pasar de 9.442 € al año de otros ingresos (11.013 € con cónyuge a cargo).',
      'Guía completa en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Las pensiones mínimas de 2026, en una imagen. En enero subirán más que el resto. Guía en la biografía.

#pensionminima #pensiones #jubilacion #seguridadsocial`,
  },
  {
    fecha: '2026-10-23', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/calendario-pago-pensiones/',
    texto: `Esta semana muchos bancos adelantan la pensión de octubre: suele llegar entre el 22 y el 26. Si tu banco no la adelanta, la Seguridad Social la paga como tarde el primer día hábil de noviembre.

Qué día paga cada banco y el calendario hasta 2027: ${L('cobro', 'wa')}`,
  },
  {
    fecha: '2026-10-24', red: 'x', pilar: 'Calendario y avisos', fuente: '/imserso/tarjeta-mayores/',
    texto: `Tarjeta Dorada de Renfe: 6 € al año desde los 60 años.

40 % de descuento en Cercanías y Media Distancia y 25 % en AVE y Larga Distancia. Se saca en la taquilla o en una agencia y se renueva por internet.

${L('tarjeta-dorada', 'x')}`,
  },
  {
    fecha: '2026-10-24', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/ayudas/bono-social-electrico/',
    texto: `Bono social eléctrico para pensionistas: un descuento del 35 % en la factura de la luz (50 % para los vulnerables severos), sobre un consumo máximo al año.

Los pensionistas tienen una vía propia: tienen derecho si todas las personas de la casa con ingresos cobran la pensión mínima de jubilación o de incapacidad permanente y no tienen otros ingresos de más de 500 euros al año. También se puede tener por renta baja: 12.600 euros al año si vives solo en 2026.

Hace falta tener la tarifa regulada (PVPC) con una comercializadora de referencia. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-24', red: 'video', tipo: 'Guion', pilar: 'Familias y cuidados', fuente: '/dependencia/convenio-cuidador/',
    titulo: 'Si cuidas de tu madre, puedes cotizar gratis para tu jubilación',
    texto: `Si cuidas de un familiar con la prestación por cuidados familiares, puedes cotizar para tu jubilación sin pagar: la cuota la paga el Imserso. ${L('cuidador', 'yt')}`,
    guion: [
      ['0-3 s', '¿Cuidas de tu madre o tu padre?', '¿Has dejado de trabajar para cuidar de tu madre o de tu padre?'],
      ['3-12 s', 'Puedes cotizar gratis para tu jubilación', 'Puedes seguir cotizando para tu jubilación sin pagar nada.'],
      ['12-20 s', 'Convenio especial · la cuota la paga el Imserso', 'Con el convenio especial del cuidador, la cuota la paga el Imserso.'],
      ['20-26 s', 'Pídelo en 90 días', 'Pídelo en la Tesorería en los 90 días siguientes a que reconozcan la ayuda.'],
      ['26-30 s', 'jubilometro.com/cuidador', 'Cómo pedirlo, en jubilometro.com/cuidador.'],
    ],
  },

  /* ===================== SEMANA 3 · 26 de octubre a 1 de noviembre ===================== */
  {
    fecha: '2026-10-26', red: 'x', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/pension-maxima/',
    texto: `Pensión máxima en 2026: 3.359,60 € brutos al mes en 14 pagas, 47.034,40 € al año.

Para llegar hace falta el 100 % por años cotizados y haber cotizado de media por unos 3.920 € al mes en los años que cuentan. ${L('maxima', 'x')}`,
  },
  {
    fecha: '2026-10-26', red: 'grupo', tipo: 'Pregunta de la semana', pilar: 'Comunidad',
    texto: `Pregunta de la semana: ¿qué trámite de la Seguridad Social os ha costado más hacer por internet?

Pedir la vida laboral, el certificado de la pensión, la cita previa, la Cl@ve… Contad dónde os atascasteis y esta semana preparamos los pasos de los más difíciles.`,
  },
  {
    fecha: '2026-10-26', red: 'facebook', pilar: 'Calendario y avisos', fuente: '/jubilacion/cita-previa-seguridad-social/',
    texto: `Cita previa con la Seguridad Social para pensiones: se puede pedir las 24 horas en los teléfonos 91 541 25 30 y 901 10 65 70, o por internet en la sede electrónica, con certificado digital o sin él. Te darán un localizador que sirve para cambiarla o anularla.

Para la vida laboral, el número de la Seguridad Social o la cotización de autónomos, la oficina es la de la Tesorería, que atiende sin cita de lunes a viernes, de 9 a 14 horas.

${FB_WEB}`,
  },
  {
    fecha: '2026-10-27', red: 'x', tipo: 'Hilo', pilar: 'Familias y cuidados', fuente: '/dependencia/tiempos-dependencia/',
    partes: [
      `¿Cuánto tarda la dependencia? La ley da seis meses. La media real en España es de 302 días, y depende mucho de dónde vivas. Hilo con los datos del Imserso.`,
      `1. De media, 228 días hasta que te reconocen el grado y 52 más hasta que te asignan la prestación (resoluciones de septiembre de 2025 a agosto de 2026).`,
      `2. Las más rápidas: Ceuta, con 78 días, y Aragón, con 111.`,
      `3. Las más lentas: Asturias, con 416 días, y la Región de Murcia, con 536.`,
      `4. Si pasan seis meses sin resolución, tu derecho empieza a contar igualmente desde ese momento. Por eso conviene pedirla cuanto antes.`,
      `5. Los días de tu comunidad y qué hacer si se retrasa: ${L('espera-dependencia', 'x')}`,
    ],
  },
  {
    fecha: '2026-10-27', red: 'facebook', pilar: 'Familias y cuidados', fuente: '/dependencia/grados/',
    texto: `¿Cómo se decide el grado de dependencia? Con un baremo oficial que puntúa de 0 a 100 cuánta ayuda necesita la persona para comer, asearse, vestirse, moverse, cuidar su salud o hacer las tareas de casa.

Menos de 25 puntos: sin grado.
De 25 a 49: grado I, dependencia moderada.
De 50 a 74: grado II, dependencia severa.
De 75 a 100: grado III, gran dependencia.

A más grado, más horas de ayuda a domicilio y ayudas más altas. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-27', red: 'instagram', tipo: 'Carrusel', pilar: 'Familias y cuidados', fuente: '/dependencia/convenio-cuidador/',
    diapositivas: [
      '¿Cuidas de un familiar dependiente? Puedes cotizar gratis para tu jubilación.',
      'Es el convenio especial del cuidador no profesional.',
      'Para quien figura como cuidador en la prestación por cuidados familiares.',
      'La cuota la paga el Imserso: tú no pagas nada.',
      'Grado III: cotizas por la base mínima (1.424,40 € al mes en 2026).',
      'Grado II, una parte; grado I, la mitad.',
      'Pídelo en la Tesorería en los 90 días siguientes a que se reconozca la ayuda.',
      'Pasos y documentos en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Si has dejado de trabajar para cuidar de tu madre o tu padre, no pierdas años de cotización. Guía en la biografía.

#dependencia #cuidadores #pensiones #jubilacion`,
  },
  {
    fecha: '2026-10-27', red: 'linkedin', pilar: 'Profesionales', fuente: '/dependencia/tiempos-dependencia/',
    texto: `La ley de dependencia da a las comunidades seis meses para resolver. Según las estadísticas del Imserso (resoluciones de septiembre de 2025 a agosto de 2026), la media real en España es de 302 días: 228 hasta el reconocimiento del grado y 52 más hasta la prestación.

La diferencia entre territorios es enorme: 78 días en Ceuta y 111 en Aragón frente a 416 en Asturias y 536 en la Región de Murcia.

Para trabajadores sociales y servicios de atención a mayores, hemos ordenado los datos por comunidad, con lo que se puede hacer cuando se pasa el plazo. Enlace en el primer comentario.`,
    comentario: `Tiempos de la dependencia por comunidad: ${L('espera-dependencia', 'in')}`,
  },
  {
    fecha: '2026-10-27', red: 'video', tipo: 'Guion', pilar: 'Calcula tu caso', fuente: '/jubilacion/demorada/',
    titulo: 'Jubilarte más tarde: un 4 % más de pensión por año',
    texto: `Por cada año que retrasas la jubilación, un 4 % más de pensión para siempre, o un pago único. ${L('demorada', 'yt')}`,
    guion: [
      ['0-3 s', '¿Y si te jubilas más tarde?', '¿Qué ganas si te jubilas más tarde?'],
      ['3-12 s', '+4 % de pensión por cada año', 'Por cada año completo de retraso, un 4 % más de pensión, para siempre.'],
      ['12-20 s', 'O un pago único: 4.800 a 13.500 € por año', 'O un pago único de entre unos 4.800 y 13.500 euros por año.'],
      ['20-26 s', 'O una mezcla (desde 2 años)', 'O una mezcla de los dos, si retrasas al menos dos años.'],
      ['26-30 s', 'jubilometro.com/demorada', 'Tu caso, en jubilometro.com/demorada.'],
    ],
  },
  {
    fecha: '2026-10-28', red: 'x', pilar: 'La cifra que te toca', fuente: '/ayudas/pension-no-contributiva/',
    texto: `Pensión no contributiva de jubilación en 2026: 628,80 € al mes en 14 pagas.

Es para quien tiene 65 años o más, no ha cotizado lo suficiente y tiene ingresos propios por debajo de 8.803,20 € al año. Se pide en los servicios sociales de tu comunidad.

${L('no-contributiva', 'x')}`,
  },
  {
    fecha: '2026-10-28', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/imserso/termalismo/',
    texto: `Recordatorio: la lista de espera de los balnearios del Imserso para septiembre a diciembre cierra este sábado, 31 de octubre. Si no te apuntas, el siguiente turno es el de la convocatoria de 2027.

Cómo apuntarte: ${L('balnearios', 'wa')}`,
  },
  {
    fecha: '2026-10-28', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/lagunas-de-cotizacion/',
    texto: `¿Qué pasa con los meses que no cotizaste? Si caen dentro de los años que se usan para calcular tu pensión, no cuentan como cero: se rellenan.

Los 48 primeros meses sin cotizar se rellenan con la base mínima de cada mes y el resto con el 50 %. Desde 2026, las trabajadoras por cuenta ajena rellenan además los meses 49 a 60 con el 100 % y los 61 a 84 con el 80 %, y lo mismo los hombres cuya carrera se vio afectada por el nacimiento de sus hijos.

Ojo: los meses rellenados mejoran la base reguladora, pero no suman años cotizados. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-29', red: 'x', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/certificado-pension/',
    texto: `El certificado de tu pensión se descarga gratis y al momento en la sede de la Seguridad Social, con Cl@ve, certificado digital o un SMS a tu móvil.

Con un acceso tienes todos: resumido, desglosado, de retenciones de IRPF, de revalorización…

${L('certificado', 'x')}`,
  },
  {
    fecha: '2026-10-29', red: 'linkedin', pilar: 'Profesionales', fuente: '/cuanto-cobrare/lagunas-de-cotizacion/',
    texto: `Desde 2026 cambia la integración de lagunas en el cálculo de la base reguladora, y conviene tenerlo en cuenta en cualquier estimación de pensión.

Siguen las reglas generales: los 48 primeros meses sin obligación de cotizar se rellenan con la base mínima y el resto con el 50 %. La novedad es para las trabajadoras por cuenta ajena: los meses 49 a 60 se integran con el 100 % de la base mínima y los 61 a 84 con el 80 %. Lo mismo para los hombres cuya carrera se vio afectada por el nacimiento de hijos.

Los meses integrados no suman años cotizados. La explicación con ejemplos, en el primer comentario.`,
    comentario: `Lagunas de cotización: ${L('lagunas', 'in')}`,
  },
  {
    fecha: '2026-10-29', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/incapacidad/total-cualificada/',
    texto: `Si cobras una incapacidad permanente total y tienes 55 años o más, mira si te corresponde la total cualificada.

La incapacidad total da el 55 % de la base reguladora. Desde los 55 años, si no trabajas, se suma un 20 %, hasta el 75 %. Con una base reguladora de 1.500 euros, pasas de 825 a 1.125 euros al mes.

El aumento se suspende mientras trabajes y se recupera cuando lo dejas. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-29', red: 'video', tipo: 'Guion', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/pension-bruta-y-neta/',
    titulo: '¿Cuánto IRPF te quitan de la pensión?',
    texto: `Sin hijos a cargo y con hasta 16.476 € brutos al año de pensión, no hay retención. Con 1.500 € al mes, en torno al 9 %. ${L('neta', 'yt')}`,
    guion: [
      ['0-3 s', '¿Cuánto te retienen de la pensión?', '¿Cuánto IRPF te quitan de la pensión?'],
      ['3-12 s', 'Hasta 16.476 € al año: 0 %', 'Sin hijos a cargo y hasta 16.476 euros al año, nada.'],
      ['12-20 s', '1.500 € al mes: en torno al 9 %', 'Con 1.500 euros al mes, en torno al 9 %.'],
      ['20-26 s', '2.000 € al mes: cerca del 17 %', 'Con 2.000, cerca del 17 %.'],
      ['26-30 s', 'jubilometro.com/neta', 'Tu pensión neta, en jubilometro.com/neta.'],
    ],
  },
  {
    fecha: '2026-10-30', hora: '09:15', red: 'x', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/revalorizacion-pensiones/',
    nota: 'Día del IPC adelantado de octubre (INE, 9:00). Rellena los corchetes con el dato y el cálculo de la guía (te la actualizo ese día si me lo pides).',
    texto: `El INE adelanta hoy el IPC de octubre: [X,X] %.

Con once meses conocidos, la subida de las pensiones de enero de 2027 apunta a entre el [X,X] % y el [X,X] %. Con 1.000 € de pensión, entre [___] y [___] € al mes.

Falta el dato de noviembre. Tu subida: ${L('subida', 'x')}`,
  },
  {
    fecha: '2026-10-30', red: 'whatsapp', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/revalorizacion-pensiones/',
    nota: 'Rellena los corchetes con el dato del INE de las 9:00.',
    texto: `Subida de las pensiones para 2027: con el IPC adelantado de octubre que ha publicado hoy el INE, la subida apunta a entre el [X,X] % y el [X,X] %.

Con una pensión de 1.000 €, cobrarías entre [___] y [___] € al mes desde enero. Solo falta el dato de noviembre, a finales de mes.

Calcula la tuya: ${L('subida', 'wa')}`,
  },
  {
    fecha: '2026-10-30', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/revalorizacion-pensiones/',
    nota: 'Rellena los corchetes con el dato del INE.',
    texto: `Subida de las pensiones de 2027, con el IPC de octubre que ha adelantado hoy el INE.

Ya se conocen once de los doce meses que cuentan. La subida apunta a entre el [X,X] % y el [X,X] %. En euros al mes, en 14 pagas:
800 €: entre [___] y [___] €.
1.000 €: entre [___] y [___] €.
1.500 €: entre [___] y [___] €.

La cifra exacta llegará con el IPC adelantado de noviembre, a finales de mes. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-30', red: 'instagram', tipo: 'Carrusel', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/revalorizacion-pensiones/',
    nota: 'Rellena los corchetes con el dato del INE de las 9:00.',
    diapositivas: [
      'Subida de las pensiones en 2027: cómo va con el IPC de octubre.',
      'La ley sube las pensiones lo que sube de media el IPC de diciembre a noviembre.',
      'Con 11 meses conocidos, la subida apunta a entre el [X,X] % y el [X,X] %.',
      '800 € → entre [___] y [___] € al mes.',
      '1.000 € → entre [___] y [___] € al mes.',
      '1.500 € → entre [___] y [___] € al mes.',
      'La cifra exacta: a finales de noviembre. Se cobra con la pensión de enero, sin pedir nada.',
      'Calcula la tuya en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Así va la subida de las pensiones de 2027 con el IPC de octubre. Tu cifra, con el enlace de la biografía.

#pensiones #subidapensiones #jubilacion #ipc`,
  },
  {
    fecha: '2026-10-31', red: 'x', pilar: 'Calendario y avisos', fuente: '/imserso/termalismo/',
    texto: `Hoy es el último día para apuntarse a la lista de espera de los balnearios del Imserso de septiembre a diciembre.

10 días con pensión completa y tratamiento termal, entre 302,14 y 452,90 € por persona. La convocatoria de 2027 sale hacia final de año.

${L('balnearios', 'x')}`,
  },
  {
    fecha: '2026-10-31', red: 'facebook', pilar: 'Calendario y avisos', fuente: '/imserso/termalismo/',
    texto: `Hoy, 31 de octubre, es el último día para apuntarse a la lista de espera de los balnearios del Imserso para los turnos de septiembre a diciembre de 2026.

Si se te pasa, toca esperar a la convocatoria de 2027, que se publica en el BOE hacia finales de año. Te avisaremos aquí cuando salga. ${FB_WEB}`,
  },
  {
    fecha: '2026-10-31', red: 'video', tipo: 'Guion', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/lagunas-de-cotizacion/',
    titulo: 'Los meses sin cotizar no cuentan como cero',
    texto: `Los meses sin cotizar dentro del periodo de cálculo se rellenan: los 48 primeros con la base mínima y el resto con el 50 %. ${L('lagunas', 'yt')}`,
    guion: [
      ['0-3 s', '¿Años sin cotizar?', '¿Tienes años sin cotizar? No cuentan como cero.'],
      ['3-12 s', '48 primeros meses: base mínima', 'Los 48 primeros meses se rellenan con la base mínima.'],
      ['12-20 s', 'El resto: 50 %', 'El resto, con el 50 % de la base mínima.'],
      ['20-26 s', 'Mejoran la base, pero no suman años', 'Mejoran tu base, pero no suman años cotizados.'],
      ['26-30 s', 'jubilometro.com/lagunas', 'Más en jubilometro.com/lagunas.'],
    ],
  },

  /* ===================== SEMANA 4 · 2 a 8 de noviembre ===================== */
  {
    fecha: '2026-11-02', red: 'x', pilar: 'Familias y cuidados', fuente: '/viudedad/fallecimiento-pensionista/',
    texto: `Cuando fallece un pensionista, la pensión de ese mes se cobra entera, sea cual sea el día. Lo que el banco ingrese de los meses siguientes hay que devolverlo.

Viudedad, orfandad y auxilio por defunción: mejor pedirlos en los 3 primeros meses. ${L('fallecimiento', 'x')}`,
  },
  {
    fecha: '2026-11-02', red: 'grupo', tipo: 'Pregunta de la semana', pilar: 'Comunidad',
    texto: `Pregunta de la semana: la paga extra de Navidad llega con la pensión de noviembre. ¿Qué día os llegó el año pasado y con qué banco?

Con vuestras respuestas preparamos la lista de cuándo paga cada banco, para que nadie se preocupe si a su vecino le llega antes.`,
  },
  {
    fecha: '2026-11-02', red: 'facebook', pilar: 'Familias y cuidados', fuente: '/viudedad/fallecimiento-pensionista/',
    texto: `Qué hacer cuando fallece un familiar pensionista. Estos días muchas familias se encuentran con los trámites, y conviene saber los plazos.

La pensión del mes del fallecimiento se cobra entera, con la parte proporcional de la paga extra. Lo que el banco ingrese de los meses siguientes hay que devolverlo a la Seguridad Social.

Al INSS se le pide la pensión de viudedad, la de orfandad y el auxilio por defunción, mejor en los tres primeros meses. Para la herencia: el certificado de últimas voluntades a partir de 15 días hábiles, el Impuesto sobre Sucesiones en seis meses y la declaración de la renta del fallecido en la campaña del año siguiente.

${FB_WEB}`,
  },
  {
    fecha: '2026-11-03', red: 'x', tipo: 'Hilo', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/pagas-extra/',
    partes: [
      `La paga extra de Navidad de los pensionistas: cuándo llega y cuánto es. Hilo.`,
      `1. Las pensiones de la Seguridad Social se cobran en 14 pagas: las 12 mensuales y dos extra, con la pensión de junio y con la de noviembre.`,
      `2. Si tu banco adelanta el pago, la de noviembre llega entre el 22 y el 26 de noviembre, junto con la pensión del mes.`,
      `3. Si no lo adelanta, la Seguridad Social la paga como tarde el primer día hábil de diciembre, y nunca después del día 4.`,
      `4. Cada paga extra es igual a una mensualidad si has cobrado la pensión todo el semestre anterior. Si empezaste a cobrar a mitad, es la parte proporcional.`,
      `5. Las pensiones por accidente de trabajo o enfermedad profesional se cobran en 12 pagas, con las extra repartidas. Todo, en la guía: ${L('paga-extra', 'x')}`,
    ],
  },
  {
    fecha: '2026-11-03', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/dinero/domiciliar-pension/',
    texto: `Antes de cambiar la pensión de banco por un regalo, tres cosas.

Puedes cobrar la pensión en el banco que elijas y cambiarlo cuando quieras. Lo más fácil es pedirlo en el banco nuevo, que lo tramita. El cambio se aplica desde el primer día hábil del segundo mes, así que no cierres la cuenta antigua hasta cobrar en la nueva.

El ingreso de la pensión no te puede costar nada. Si te ofrecen un regalo o dinero por domiciliarla, lee la permanencia y recuerda que tributa en la declaración de la renta. ${FB_WEB}`,
  },
  {
    fecha: '2026-11-03', red: 'instagram', tipo: 'Carrusel', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/pagas-extra/',
    diapositivas: [
      'Paga extra de Navidad: cuándo llega.',
      'Llega junto con la pensión de noviembre.',
      'Si tu banco adelanta: entre el 22 y el 26 de noviembre.',
      'Si no: como tarde, el primer día hábil de diciembre.',
      'Es una mensualidad entera si cobraste la pensión todo el semestre anterior.',
      'Las pensiones por accidente de trabajo se cobran en 12 pagas, con la extra repartida.',
      'Guárdalo para no preocuparte si a tu vecino le llega antes.',
      'Calendario de pagos en Jubilómetro (enlace en la biografía).',
    ],
    texto: `La paga extra llega con la pensión de noviembre. Fechas y cuánto es. Enlace en la biografía.

#pagaextra #pensiones #jubilados #seguridadsocial`,
  },
  {
    fecha: '2026-11-03', red: 'linkedin', pilar: 'Profesionales', fuente: '/cuanto-cobrare/pension-segun-sueldo/',
    texto: `Una regla que ayuda a explicar la pensión a un cliente sin entrar en fórmulas: con 37 años cotizados (36 y 6 meses si se jubila en 2026) siempre por la misma base, la pensión bruta mensual es 6/7 de esa base. Dicho de otra forma, al año cobra lo mismo que su sueldo bruto anual.

Base de 1.500 euros: unos 1.286 euros al mes en 14 pagas. Base de 2.000: unos 1.714. Base de 3.000: unos 2.571. Desde una base de 3.919,53 euros se llega a la pensión máxima (3.359,60 euros en 2026).

En la realidad las bases cambian con los años y hay lagunas, por eso la guía trae ejemplos con carreras irregulares. Enlace en el primer comentario.`,
    comentario: `Cuánto se cobra según el sueldo: ${L('sueldo', 'in')}`,
  },
  {
    fecha: '2026-11-03', red: 'video', tipo: 'Guion', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/complemento-brecha-genero/',
    titulo: 'Madres pensionistas: 36,90 € al mes por cada hijo',
    texto: `El complemento de brecha de género: 36,90 € al mes por hijo en 2026, hasta cuatro hijos. ${L('brecha', 'yt')}`,
    guion: [
      ['0-3 s', '¿Tienes hijos y cobras pensión?', 'Si tienes hijos y cobras una pensión, mira esto.'],
      ['3-12 s', '36,90 € al mes por hijo', 'El complemento de brecha de género son 36,90 euros al mes por cada hijo.'],
      ['12-20 s', 'Hasta 4 hijos: 147,60 €', 'Hasta cuatro hijos: 147,60 euros al mes, en 14 pagas.'],
      ['20-26 s', 'Jubilación, incapacidad o viudedad', 'Con pensión de jubilación, incapacidad permanente o viudedad.'],
      ['26-30 s', 'jubilometro.com/brecha', 'Requisitos en jubilometro.com/brecha.'],
    ],
  },
  {
    fecha: '2026-11-04', red: 'x', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/complemento-brecha-genero/',
    texto: `Complemento de brecha de género en 2026: 36,90 € al mes por cada hijo, hasta cuatro (147,60 €), en 14 pagas.

Lo cobran las madres con pensión de jubilación, incapacidad permanente o viudedad. Los padres, solo en casos concretos. ${L('brecha', 'x')}`,
  },
  {
    fecha: '2026-11-04', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/pagas-extra/',
    texto: `Se acerca la paga extra de Navidad: llega con la pensión de noviembre. Si tu banco adelanta el pago, entre el 22 y el 26 de noviembre; si no, como tarde el primer día hábil de diciembre.

Cuánto es y qué día paga cada banco: ${L('paga-extra', 'wa')}`,
  },
  {
    fecha: '2026-11-04', red: 'facebook', pilar: 'Familias y cuidados', fuente: '/jubilacion/subsidio-mayores-52/',
    texto: `Si te quedas en paro a partir de los 52 años, mira el subsidio para mayores de 52.

Es una ayuda del SEPE para quien ya tiene cotizado lo necesario para jubilarse, salvo la edad. En 2026 son 480 euros al mes y dura hasta la edad ordinaria de jubilación. Y mientras lo cobras, el SEPE cotiza por ti para la jubilación sobre el 125 % de la base mínima.

Solo cuentan tus rentas propias, que no pueden pasar de 915,75 euros al mes. ${FB_WEB}`,
  },
  {
    fecha: '2026-11-05', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/informe-vida-laboral/',
    texto: `Revisa tu vida laboral años antes de jubilarte. Un periodo trabajado que no aparece te quita años cotizados y rebaja tu pensión.

Se pide gratis en Import@ss, también con un SMS, o te la mandan a casa. Si hay un error, se puede pedir que lo corrijan.

${L('vida-laboral', 'x')}`,
  },
  {
    fecha: '2026-11-05', red: 'linkedin', pilar: 'Profesionales', fuente: '/dependencia/convenio-cuidador/',
    texto: `Para equipos de recursos humanos: cuando una persona de la plantilla deja el trabajo o reduce jornada para cuidar a un familiar dependiente, suele preguntar qué pasa con su jubilación.

Si el familiar cobra la prestación por cuidados en el entorno familiar y la persona figura como cuidadora, puede firmar un convenio especial con la Seguridad Social y seguir cotizando sin coste: la cuota la abona el Imserso. Cotiza por la base mínima (1.424,40 euros al mes en 2026) con grado III, una parte con grado II y la mitad con grado I. Hay que pedirlo en la Tesorería en los 90 días siguientes al reconocimiento.

Es información que se puede incluir en cualquier política de conciliación. Guía en el primer comentario.`,
    comentario: `Convenio especial del cuidador: ${L('cuidador', 'in')}`,
  },
  {
    fecha: '2026-11-05', red: 'facebook', pilar: 'Familias y cuidados', fuente: '/dependencia/ayuda-a-domicilio/',
    texto: `Ayuda a domicilio para mayores: con la dependencia reconocida, la ley fija entre 20 y 94 horas al mes según el grado. De 20 a 37 en el grado I, de 38 a 64 en el grado II y de 65 a 94 en el grado III.

Las auxiliares ayudan con el aseo, la comida, vestirse y moverse, y con las tareas de casa. Se paga una parte según los ingresos, y nadie se queda sin el servicio por no tener dinero. Sin grado de dependencia, muchos ayuntamientos lo ofrecen como servicio social.

${FB_WEB}`,
  },
  {
    fecha: '2026-11-05', red: 'video', tipo: 'Guion', pilar: 'Calendario y avisos', fuente: '/imserso/tarjeta-mayores/',
    titulo: 'Tarjeta Dorada de Renfe: 6 € al año',
    texto: `Desde los 60 años, la Tarjeta Dorada de Renfe cuesta 6 € al año y da hasta un 40 % de descuento. ${L('tarjeta-dorada', 'yt')}`,
    guion: [
      ['0-3 s', '¿Tienes 60 años?', '¿Tienes 60 años o más y viajas en tren?'],
      ['3-12 s', 'Tarjeta Dorada: 6 € al año', 'La Tarjeta Dorada de Renfe cuesta 6 euros al año.'],
      ['12-20 s', '40 % en Cercanías y Media Distancia', 'Te da un 40 % en Cercanías y Media Distancia.'],
      ['20-26 s', '25 % en AVE y Larga Distancia', 'Y un 25 % en AVE y Larga Distancia.'],
      ['26-30 s', 'jubilometro.com/tarjeta-dorada', 'Cómo sacarla, en jubilometro.com/tarjeta-dorada.'],
    ],
  },
  {
    fecha: '2026-11-06', red: 'x', pilar: 'Calendario y avisos', fuente: '/jubilacion/cita-previa-seguridad-social/',
    texto: `Cita previa de la Seguridad Social para pensiones: 91 541 25 30 o 901 10 65 70, las 24 horas, o en la sede electrónica sin certificado digital.

Para la vida laboral, la Tesorería atiende sin cita de lunes a viernes, de 9 a 14 h. ${L('cita-previa', 'x')}`,
  },
  {
    fecha: '2026-11-06', red: 'facebook', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/pagas-extra/',
    texto: `La paga extra de Navidad llega junto con la pensión de noviembre.

Si tu banco adelanta el pago, la verás entre el 22 y el 26 de noviembre. Si no lo adelanta, la Seguridad Social la paga como tarde el primer día hábil de diciembre. Cada banco elige si adelanta y qué día.

¿El tuyo os la adelantó el año pasado? Cuéntanos qué banco y qué día, y así lo sabemos todos.`,
    imagen: '«Paga extra: 22-26 de noviembre» en letra grande, con «si tu banco adelanta el pago» debajo.',
  },
  {
    fecha: '2026-11-06', red: 'instagram', tipo: 'Carrusel', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/complemento-brecha-genero/',
    diapositivas: [
      'Madres pensionistas: el complemento que algunas no saben que tienen.',
      'Complemento de brecha de género: 36,90 € al mes por cada hijo (2026).',
      'Hasta cuatro hijos: 147,60 € al mes.',
      'En 14 pagas.',
      'Con pensión de jubilación, incapacidad permanente o viudedad.',
      'Los padres, solo si cumplen requisitos concretos y su pensión es menor que la de la madre.',
      'En enero sube lo mismo que las pensiones.',
      'Requisitos en Jubilómetro (enlace en la biografía).',
    ],
    texto: `36,90 € al mes por cada hijo en la pensión. Compártelo con tu madre. Requisitos en la biografía.

#pensiones #madres #jubilacion #seguridadsocial`,
  },
  {
    fecha: '2026-11-06', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/jubilacion/cita-previa-seguridad-social/',
    texto: `Para tenerlo a mano: la cita previa de la Seguridad Social para pensiones se pide las 24 horas en el 91 541 25 30 o el 901 10 65 70, o por internet sin certificado digital.

Guárdalo y reenvíaselo a quien le pueda servir. Más detalles: ${L('cita-previa', 'wa')}`,
  },
  {
    fecha: '2026-11-07', red: 'x', pilar: 'La cifra que te toca', fuente: '/incapacidad/total-cualificada/',
    texto: `Incapacidad permanente total: 55 % de la base reguladora. Desde los 55 años, si no trabajas, sube al 75 %.

Con una base de 1.500 €, de 825 a 1.125 € al mes. El aumento se suspende mientras trabajes y se recupera al dejarlo.

${L('incapacidad-total', 'x')}`,
  },
  {
    fecha: '2026-11-07', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/pareja-de-hecho/',
    texto: `Pensión de viudedad si no estabais casados: las parejas de hecho la cobran en las mismas condiciones que un matrimonio si cumplen dos requisitos.

Estar inscritas en un registro de parejas de hecho (o en documento público) al menos dos años antes del fallecimiento, y haber convivido cinco años seguidos justo antes, acreditado con el empadronamiento. Si tenéis hijos en común, basta con la inscripción de dos años.

Desde 2022 no hay límite de ingresos. Y si no llegáis a los dos años de inscripción, se puede cobrar una prestación temporal de viudedad durante dos años. ${FB_WEB}`,
  },
  {
    fecha: '2026-11-07', red: 'video', tipo: 'Guion', pilar: 'Calcula tu caso', fuente: '/jubilacion/15-anos-cotizados/',
    titulo: '¿Cuánto se cobra con 15 años cotizados?',
    texto: `Con 15 años cotizados hay pensión: el 50 % de tu base reguladora, a los 67. ${L('15-anos', 'yt')}`,
    guion: [
      ['0-3 s', '¿Solo 15 años cotizados?', '¿Tienes solo 15 años cotizados?'],
      ['3-12 s', '50 % de tu base reguladora', 'Tienes pensión: el 50 % de tu base reguladora.'],
      ['12-20 s', 'A los 67 años', 'A los 67 años.'],
      ['20-26 s', '2 años dentro de los últimos 15', 'Y dos de esos años tienen que estar en los últimos 15.'],
      ['26-30 s', 'jubilometro.com/15-anos', 'Tu caso, en jubilometro.com/15-anos.'],
    ],
  },
];
