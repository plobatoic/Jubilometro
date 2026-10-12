// Banco de publicaciones · Imserso, viajes y ocio. Cifras de las guías de jubilometro.com a 12 de octubre de 2026.
// La temporada de viajes 2026-2027 va de octubre de 2026 a junio de 2027: lo que habla de ella caduca el 31 de mayo.
// Ya están en el primer mes: plazas libres (Facebook, Instagram, vídeo y WhatsApp), Tarjeta Dorada y balnearios de 2026.
import { L, FB_WEB } from './comun.mjs';

export const IMSERSO = [
  {
    id: 'viajes-imserso-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/imserso/viajes-imserso/', hasta: '2027-05-31',
    texto: `Viajes del Imserso 2026-2027: 879.213 plazas hasta junio de 2027, de 132,91 € (4 días en una capital de provincia) a 564,72 € (10 días en Canarias en temporada alta). Y 7.447 plazas a 50 € para quien tiene ingresos bajos.

${L('viajes-imserso', 'x')}`,
  },
  {
    id: 'viajes-imserso-fb', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/imserso/viajes-imserso/', hasta: '2027-05-31',
    cifra: { ante: 'La cifra', antes: 'Plazas de los viajes del Imserso de octubre de 2026 a junio de 2027', grande: '879.213', despues: 'De 132,91 € a 564,72 € por persona, y 7.447 plazas a 50 € para ingresos bajos.', fuente: 'Imserso, Programa de Turismo 2026-2027.', corto: 'viajes-imserso' },
    texto: `La temporada de viajes del Imserso está en marcha y dura hasta junio de 2027.

Hay 879.213 plazas. Los precios van de 132,91 euros por 4 días en una capital de provincia a 564,72 euros por 10 días en Canarias en temporada alta. Y hay 7.447 plazas a 50 euros para quien tiene ingresos iguales o inferiores a la pensión no contributiva.

Si te acreditaste en verano, puedes reservar las plazas libres de cualquier provincia en turismosocial.es, en mundicolor.es o en una agencia autorizada, con tu DNI y la clave de 4 dígitos de la carta. Las plazas que otros cancelan vuelven a la venta toda la temporada.

¿Ya tenéis viaje este año? ${FB_WEB}`,
  },
  {
    id: 'plazas-libres-x', red: 'x', pilar: 'Calendario y avisos', fuente: '/imserso/plazas-libres/', hasta: '2027-05-31',
    texto: `¿Sin viaje del Imserso? Las plazas que otros cancelan o no pagan vuelven a la venta toda la temporada, sobre todo unos 45 días antes de cada salida. Busca en turismosocial.es y en mundicolor.es, también desde otras provincias.

${L('plazas-imserso', 'x')}`,
  },
  {
    id: 'reservar-imserso-x', red: 'x', pilar: 'Trámites sin líos', fuente: '/imserso/solicitar-viajes/', hasta: '2027-05-31',
    texto: `Reservar un viaje del Imserso: la costa peninsular y las escapadas, en turismosocial.es; Baleares y Canarias, en mundicolor.es, o en una agencia autorizada por 15 € de gestión. Necesitas el DNI y la clave de 4 dígitos de tu carta.

${L('reservar-imserso', 'x')}`,
  },
  {
    id: 'reservar-imserso-fb', red: 'facebook', pilar: 'Trámites sin líos', fuente: '/imserso/solicitar-viajes/', hasta: '2027-05-31',
    texto: `Cómo reservar un viaje del Imserso y qué pasa si luego no puedes ir.

Con la carta de acreditación en la mano, reservas desde la fecha que indica la carta, con tu DNI y la clave de cuatro dígitos. Los viajes a la costa peninsular y las escapadas, en turismosocial.es o en el 971 22 08 22. Los de Baleares y Canarias, en mundicolor.es o en el 911 590 911. También en una agencia de viajes autorizada, que cobra 15 euros por persona de gestión.

Pagas una señal en los días siguientes y el resto 45 días antes de salir.

Si cancelas, pierdes el 6,20 % del precio en gastos de gestión, más un porcentaje si lo haces en los 15 días anteriores a la salida. ${FB_WEB}`,
  },
  {
    id: 'reservar-imserso-wa', red: 'whatsapp', pilar: 'Trámites sin líos', fuente: '/imserso/solicitar-viajes/', hasta: '2027-05-31',
    texto: `Para reservar un viaje del Imserso: turismosocial.es (971 22 08 22) para la costa peninsular y las escapadas, y mundicolor.es (911 590 911) para Baleares y Canarias. Con el DNI y la clave de 4 dígitos de tu carta. El resto del pago, 45 días antes de salir.

${L('reservar-imserso', 'wa')}`,
  },
  {
    id: 'requisitos-imserso-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/imserso/requisitos-viajes/',
    texto: `Viajes del Imserso: pueden ir los pensionistas de jubilación a cualquier edad, los de viudedad desde los 55, otros pensionistas y parados desde los 60, y cualquier asegurado desde los 65. Tu pareja puede acompañarte aunque no cumpla nada.

${L('requisitos-imserso', 'x')}`,
  },
  {
    id: 'requisitos-imserso-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/imserso/requisitos-viajes/',
    texto: `¿Quién puede ir de viaje con el Imserso? Más gente de la que se cree.

Los pensionistas de jubilación, a cualquier edad. Los de viudedad, desde los 55 años. Otros pensionistas y quienes cobran el paro, desde los 60. Y cualquier asegurado o beneficiario de la Seguridad Social, desde los 65. Además, hay que vivir en España y valerse por uno mismo.

La pareja puede ir contigo aunque no cumpla ninguno de esos requisitos, y también los hijos con una discapacidad del 45 % o más.

Lo que más se olvida: no basta con cumplirlos. Hay que acreditarse en el plazo que abre el Imserso cada verano. Para la temporada 2026-2027 fue del 22 de junio al 10 de julio de 2026. ${FB_WEB}`,
  },
  {
    id: 'acreditacion-wa', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/imserso/requisitos-viajes/', desde: '2027-05-20', hasta: '2027-06-30',
    texto: `Aviso para la próxima temporada de viajes del Imserso: para poder reservar hay que acreditarse cada año en el plazo que abre el Imserso. El año pasado fue del 22 de junio al 10 de julio. Cuando se publiquen las fechas de 2027, conviene no dejarlo para el último día.

Requisitos: ${L('requisitos-imserso', 'wa')}`,
  },
  {
    id: 'termalismo-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/imserso/termalismo/',
    texto: `Los balnearios del Imserso: 10 días con pensión completa, reconocimiento médico y tratamiento termal, de 302,14 a 452,90 € por persona en 2026 según el balneario y el mes. Las plazas se reparten por puntos, y la convocatoria sale en el BOE cada año.

${L('balnearios', 'x')}`,
  },
  {
    id: 'viajes-comunidad-x', red: 'x', pilar: 'Calendario y avisos', fuente: '/imserso/turismo-autonomico/', hasta: '2026-12-14',
    texto: `Además del Imserso, algunas comunidades tienen viajes y balnearios para sus mayores. El termalismo de Castilla-La Mancha sigue abierto hasta el 15 de diciembre de 2026 o hasta agotar plazas, por orden de solicitud, desde 208,64 €.

${L('viajes-comunidad', 'x')}`,
  },
  {
    id: 'viajes-comunidad-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/imserso/turismo-autonomico/',
    texto: `Si no te tocó viaje con el Imserso, mira los de tu comunidad autónoma. Varias organizan viajes y estancias en balnearios para sus mayores, con plazos y precios propios.

Suelen pedir solo estar empadronado en la comunidad y tener 60 o 65 años (55 en Madrid). Algunos ejemplos: el termalismo de Castilla-La Mancha, las Rutas Culturales de Madrid, el Club de los 60 de Castilla y León, el Termalismo Valenciano y Bienestar en Balnearios de Galicia.

Cada uno abre en una época del año distinta, así que conviene tenerlos apuntados. ${FB_WEB}`,
  },
  {
    id: 'universidad-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/imserso/universidad-mayores/',
    texto: `Volver a estudiar después de jubilarte: casi todas las universidades tienen un programa para mayores desde los 50 o 55 años, sin exámenes ni estudios previos. Y si quieres un grado oficial, hay pruebas de acceso para mayores de 25 y de 45 años.

${L('universidad', 'x')}`,
  },
  {
    id: 'universidad-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/imserso/universidad-mayores/',
    texto: `Muchas personas aprovechan la jubilación para estudiar lo que no pudieron de jóvenes. Hay tres caminos.

Los programas universitarios para mayores: casi todas las universidades tienen uno, desde los 50 o 55 años, sin exámenes ni estudios previos. No dan un título oficial, pero sí un diploma de la universidad.

Un grado oficial sin bachillerato: con la prueba de acceso para mayores de 25 o de 45 años, o acreditando experiencia laboral desde los 40. Las universidades reservan plazas para estas vías.

Y la educación de personas adultas: cursos públicos en los centros de tu comunidad.

¿Alguien del grupo está estudiando ahora? ${FB_WEB}`,
  },
  {
    id: 'viajes-imserso-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'La cifra que te toca', fuente: '/imserso/viajes-imserso/', hasta: '2027-05-31',
    diapositivas: [
      'Viajes del Imserso 2026-2027: lo que tienes que saber para reservar.',
      'Plazas: 879.213, para viajar de octubre de 2026 a junio de 2027.',
      'Desde 132,91 €: 4 días en una capital de provincia.',
      'Hasta 564,72 €: 10 días en Canarias en temporada alta.',
      '7.447 plazas a 50 € para quien tiene ingresos bajos.',
      'Tu pareja puede ir contigo aunque no cumpla los requisitos.',
      'Las plazas que otros cancelan vuelven a la venta toda la temporada.',
      'Guárdalo y compártelo con quien viaja contigo. Todo, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Precios, plazas y cómo reservar los viajes del Imserso de esta temporada. Guía completa en la biografía.

#imserso #viajes #mayores #jubilados`,
  },
  {
    id: 'requisitos-imserso-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Calcula tu caso', fuente: '/imserso/requisitos-viajes/',
    diapositivas: [
      '¿Puedes ir de viaje con el Imserso? Quién puede apuntarse.',
      'Pensionistas de jubilación: a cualquier edad.',
      'Pensionistas de viudedad: desde los 55 años.',
      'Otros pensionistas y quien cobra el paro: desde los 60.',
      'Cualquier asegurado de la Seguridad Social: desde los 65.',
      'Tu pareja puede ir contigo aunque no cumpla nada de esto.',
      'Hay que acreditarse cada año en el plazo del Imserso, normalmente en verano.',
      'Compártelo con quien viaja contigo. Requisitos y plazos, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Quién puede viajar con el Imserso y cómo se apunta: requisitos por edad y tipo de pensión. Guía en la biografía.

#imserso #viajes #mayores #jubilados`,
  },
];
