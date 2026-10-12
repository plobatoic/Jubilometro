// Banco de publicaciones · Dependencia y cuidados. Cifras de las guías de jubilometro.com a 12 de octubre de 2026.
// Días de espera: Imserso, de la solicitud a la prestación (septiembre de 2025 a agosto de 2026); media de España, 302.
// Ya están en el primer mes: convenio del cuidador (todas las redes), cuánto tarda (hilo de X y LinkedIn),
// grados y ayuda a domicilio en Facebook.
import { L, FB_WEB } from './comun.mjs';

const comunidad = (slug, nombre, texto) => ({
  id: `dependencia-${slug}-x`, red: 'x', pilar: 'Calcula tu caso', fuente: `/dependencia/${slug}/`, comunidad: nombre,
  texto: `${texto}

${L(`dependencia-${slug}`, 'x')}`,
});

export const DEPENDENCIA = [
  /* ---------- Una por comunidad ---------- */
  comunidad('andalucia', 'Andalucía', `Dependencia en Andalucía: se pide en el portal VED o en una oficina de registro con cita previa, con un informe de salud que suele hacer tu médico de cabecera. La Junta habla de un año; la media real fue de 413 días hasta la prestación.`),
  comunidad('aragon', 'Aragón', `Dependencia en Aragón: todo empieza con una llamada para pedir cita con la trabajadora social. Si autorizas que consulten tu historia clínica, no necesitas informe médico. Media real: 111 días hasta la prestación, la segunda más rápida de España.`),
  comunidad('asturias', 'Asturias', `Dependencia en Asturias: si el Principado no resuelve en seis meses, la solicitud se entiende concedida. Aun así, la media real fue de 416 días desde la solicitud hasta la prestación, la segunda más larga de España (302 de media).`),
  comunidad('baleares', 'Baleares', `Dependencia en Baleares: se pide con la misma solicitud que la discapacidad, y si tus datos de salud están al día en el IB-Salut no hace falta informe médico. Media real: 192 días desde la solicitud hasta la prestación, frente a 302 en España.`),
  comunidad('canarias', 'Canarias', `Dependencia en Canarias: si el Gobierno no contesta en seis meses, la solicitud se entiende concedida, algo que no pasa en la mayoría de las comunidades. Media real: 250 días desde la solicitud hasta la prestación (302 en España).`),
  comunidad('cantabria', 'Cantabria', `Dependencia en Cantabria: los impresos se recogen en tu centro de salud o en los servicios sociales de tu ayuntamiento, que te ayudan a rellenarlos. Lo resuelve el ICASS. Media real: 171 días desde la solicitud hasta la prestación, frente a 302 en España.`),
  comunidad('castilla-la-mancha', 'Castilla-La Mancha', `Dependencia en Castilla-La Mancha: la Junta tiene seis meses para resolver, que se quedan en tres si tienes más de 90 años. El informe de salud lo hace tu médico de atención primaria. Media real: 165 días hasta la prestación (302 en España).`),
  comunidad('castilla-y-leon', 'Castilla y León', `Dependencia en Castilla y León: se pide en tu CEAS, y el grado y las ayudas se resuelven casi siempre a la vez. Por eso es de las más rápidas: 120 días de media desde la solicitud hasta la prestación, frente a 302 en España.`),
  comunidad('cataluna', 'Cataluña', `Dependencia en Cataluña: la media real fue de 204 días hasta el grado y 264 hasta la prestación, y es la comunidad con más personas esperando seis meses o más: 41.643. Se puede pedir en línea con idCAT Mòbil.`),
  comunidad('comunitat-valenciana', 'Comunitat Valenciana', `Dependencia en la Comunitat Valenciana: si pasan seis meses sin resolución, la solicitud se entiende estimada y la prestación se paga con atrasos, según la Generalitat. Se pide en los servicios sociales de tu ayuntamiento. Media real: 299 días.`),
  comunidad('extremadura', 'Extremadura', `Dependencia en Extremadura: la solicitud es el único papel obligatorio. Si autorizas la consulta, la Junta obtiene sola tu informe de salud, tu padrón y tus datos económicos. Media real: 272 días desde la solicitud hasta la prestación (302 en España).`),
  comunidad('galicia', 'Galicia', `Dependencia en Galicia: si te cuida un familiar en casa, puedes cobrar el Bono Cuidado en el Hogar, 5.000 € al año, sin importar tu renta ni tu grado. No hace falta informe médico: la Xunta consulta tu historia del Sergas. Media: 308 días.`),
  comunidad('la-rioja', 'La Rioja', `Dependencia en La Rioja: el informe de salud lo rellena tu médico de atención primaria, y la valoración la hace el Centro de Valoración de la Discapacidad y la Dependencia. Media real: 131 días hasta la prestación, de las más rápidas de España.`),
  comunidad('madrid', 'Comunidad de Madrid', `Dependencia en la Comunidad de Madrid: se pide por internet o en los servicios sociales de tu ayuntamiento o junta de distrito, con un informe de salud de menos de tres meses. Media real: 335 días desde la solicitud hasta la prestación (302 en España).`),
  comunidad('murcia', 'Región de Murcia', `Dependencia en la Región de Murcia: la media real fue de 536 días desde la solicitud hasta la prestación, la más larga de España. Si pasan seis meses sin respuesta, tu derecho cuenta igualmente desde entonces y puedes reclamar.`),
  comunidad('pais-vasco', 'País Vasco', `Dependencia en el País Vasco: la valora y la resuelve la diputación foral de tu territorio, y se empieza en los servicios sociales de base de tu ayuntamiento. Media real: 130 días hasta la prestación, la tercera comunidad más rápida.`),

  /* ---------- Pedir y reclamar ---------- */
  {
    id: 'espera-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Calcula tu caso', fuente: '/dependencia/tiempos-dependencia/',
    diapositivas: [
      '¿Cuánto tarda la dependencia en tu comunidad? Los datos reales del Imserso.',
      'España: 302 días de media de la solicitud a la prestación, aunque la ley da seis meses.',
      'Las más rápidas: Aragón, 111 días; Castilla y León, 120; País Vasco, 130; La Rioja, 131.',
      'Por debajo de la media: Castilla-La Mancha, 165; Cantabria, 171; Baleares, 192; Navarra, 222; Canarias, 250.',
      'Cerca de la media: Cataluña, 264; Extremadura, 272; Comunitat Valenciana, 299; Galicia, 308.',
      'Las más lentas: Madrid, 335; Andalucía, 413; Asturias, 416; Región de Murcia, 536.',
      'Si pasan seis meses sin resolución, tu derecho empieza a contar desde entonces.',
      'Guárdalo y mira la guía de tu comunidad en Jubilómetro (enlace en la biografía).',
    ],
    texto: `De 111 días en Aragón a 536 en la Región de Murcia: lo que tarda de verdad la dependencia en cada comunidad. Guías por comunidad en la biografía.

#dependencia #mayores #cuidados #imserso`,
  },
  {
    id: 'pedir-dependencia-x', red: 'x', pilar: 'Trámites sin líos', fuente: '/dependencia/solicitar-dependencia/',
    texto: `La dependencia se pide gratis en los servicios sociales de tu comunidad, a menudo con ayuda de los de tu ayuntamiento. Lo básico: el DNI y un informe de salud en el modelo oficial. Después, un profesional valora a la persona en su casa.

${L('pedir-dependencia', 'x')}`,
  },
  {
    id: 'pedir-dependencia-fb', red: 'facebook', pilar: 'Trámites sin líos', fuente: '/dependencia/solicitar-dependencia/',
    texto: `Cómo se pide la dependencia para un familiar, paso a paso.

1. La solicitud se presenta en los servicios sociales de tu comunidad autónoma, por internet o en persona. Los servicios sociales del ayuntamiento suelen ayudar a rellenarla.
2. Hace falta, sobre todo, el DNI y un informe de salud en el modelo oficial, que hace el médico. Según la comunidad, también el empadronamiento, un informe social y datos económicos.
3. Un profesional visita a la persona en su casa y aplica el baremo oficial.
4. La comunidad reconoce el grado y, con el plan de atención, el servicio o la ayuda económica que le corresponde.

Todo el proceso debe resolverse en seis meses, y pedirlo es gratis. Cuanto antes se presente, antes empieza a contar el plazo. ${FB_WEB}`,
  },
  {
    id: 'pedir-dependencia-wa', red: 'whatsapp', pilar: 'Trámites sin líos', fuente: '/dependencia/solicitar-dependencia/',
    texto: `Si un familiar empieza a necesitar ayuda para vestirse, asearse o moverse por casa, pedid la dependencia cuanto antes: el plazo de seis meses empieza a contar desde la solicitud, y pedirla es gratis.

Paso a paso y papeles: ${L('pedir-dependencia', 'wa')}`,
  },
  {
    id: 'reclamar-dependencia-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/dependencia/reclamar-dependencia/',
    texto: `Si la dependencia no se resuelve en seis meses, tu derecho empieza a contar igualmente desde ese día y puedes reclamar. Y si la persona empeora, no hace falta recurrir: se pide la revisión del grado en cualquier momento.

${L('reclamar-dependencia', 'x')}`,
  },
  {
    id: 'reclamar-dependencia-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/dependencia/reclamar-dependencia/',
    texto: `Pidieron la dependencia para su madre hace un año y siguen sin respuesta. Es una situación muy frecuente, y hay forma de moverla.

La Administración tiene seis meses desde la solicitud para reconocer el grado y la ayuda. Si se pasa, el derecho empieza a contar igualmente desde el final de esos seis meses, y se puede reclamar: primero con un escrito pidiendo que resuelvan, después con un recurso y, si hace falta, con una queja al Defensor del Pueblo o ante los tribunales.

Si ya hay resolución pero no estáis de acuerdo con el grado o con la ayuda, se puede recurrir, normalmente en un mes. La propia resolución dice qué recurso cabe y ante quién.

Y si la persona empeora, no hace falta recurrir: se pide la revisión del grado. ${FB_WEB}`,
  },

  /* ---------- Grados y ayudas ---------- */
  {
    id: 'grados-dependencia-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/dependencia/grados/',
    texto: `El grado de dependencia sale de un baremo de 0 a 100 puntos: con menos de 25 no hay grado; de 25 a 49, grado I; de 50 a 74, grado II, y de 75 a 100, grado III. A más grado, más horas de ayuda y ayudas más altas.

${L('grados-dependencia', 'x')}`,
  },
  {
    id: 'grados-dependencia-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Calcula tu caso', fuente: '/dependencia/grados/',
    diapositivas: [
      'Grados de dependencia: qué significa cada uno y qué ayudas da.',
      'El baremo puntúa de 0 a 100 cuánta ayuda necesitas para comer, asearte, vestirte o moverte.',
      'Grado I: dependencia moderada, de 25 a 49 puntos. De 20 a 37 horas de ayuda a domicilio al mes.',
      'Grado II: dependencia severa, de 50 a 74 puntos. De 38 a 64 horas al mes.',
      'Grado III: gran dependencia, de 75 a 100 puntos. De 65 a 94 horas al mes.',
      'Cuidados en casa: hasta 455,40 € al mes en el grado III si te cuida un familiar.',
      'Servicio privado: hasta 747,25 € al mes en el grado III si no hay plaza pública.',
      'Guárdalo y compártelo en la familia. Todo sobre la dependencia, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Grado I, II o III: los puntos del baremo, las horas de ayuda a domicilio y las ayudas de cada grado. Guía en la biografía.

#dependencia #cuidados #mayores #familia`,
  },
  {
    id: 'ley-dependencia-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/dependencia/ley-dependencia/',
    cifra: { ante: 'La cifra', antes: 'Ayuda máxima de la dependencia para pagar un servicio privado (grado III)', grande: '747,25 €', despues: 'al mes, si no hay plaza pública. Si te cuida un familiar en casa, hasta 455,40 €.', fuente: 'Ley 39/2006 y anexo IV del Real Decreto 1051/2013.', corto: 'ley-dependencia' },
    texto: `La ley de dependencia protege a quien necesita ayuda de otra persona para lo básico del día a día: comer, asearse, vestirse o moverse por casa.

Después de una valoración en el domicilio, la comunidad autónoma reconoce un grado (I, II o III) y, con él, un servicio: teleasistencia, ayuda a domicilio, centro de día o residencia. Si no hay plaza pública, da una ayuda económica para pagarlo.

Las ayudas llegan a 747,25 euros al mes para pagar un servicio privado y a 455,40 euros si te cuida un familiar, en el grado III. La Administración tiene seis meses para resolver, y se pide en los servicios sociales de tu ayuntamiento o de tu comunidad.

¿Lo habéis pedido ya en casa? ${FB_WEB}`,
  },
  {
    id: 'cuidados-familia-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/dependencia/prestacion-cuidados-familiares/',
    texto: `Si a una persona dependiente la cuida un familiar en casa, puede cobrar en 2026 hasta 455,40 € al mes con grado III, 315,90 con grado II y 180 con grado I, según su capacidad económica. No tributa en el IRPF.

${L('cuidados-familia', 'x')}`,
  },
  {
    id: 'teleasistencia-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/dependencia/teleasistencia/',
    texto: `La teleasistencia es un pulsador en colgante, pulsera o reloj conectado a una central las 24 horas. Se consigue con la dependencia o como servicio social del ayuntamiento, sin grado. En Madrid capital cuesta de 6 a 12 € al mes, o nada con poca renta.

${L('teleasistencia', 'x')}`,
  },
  {
    id: 'teleasistencia-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/dependencia/teleasistencia/',
    texto: `Para las personas mayores que viven solas, y para sus hijos, pocas cosas dan tanta tranquilidad como la teleasistencia.

Es un pulsador que se lleva en un colgante, una pulsera o un reloj, conectado con una central que atiende las 24 horas, todos los días. Si te caes o te encuentras mal, lo pulsas, te hablan por un altavoz y, si hace falta, avisan a tu familia, a una ambulancia o a quien tenga una llave de tu casa.

Hay dos formas de conseguirla: como servicio de la dependencia, si tienes grado reconocido, o como servicio social de tu ayuntamiento o tu comunidad, sin necesidad de grado. Suele ser gratis o costar pocos euros al mes según los ingresos.

Pregunta en los servicios sociales de tu ayuntamiento. ${FB_WEB}`,
  },
  {
    id: 'teleasistencia-wa', red: 'whatsapp', pilar: 'Calcula tu caso', fuente: '/dependencia/teleasistencia/',
    texto: `Si tu madre o tu padre vive solo, mira la teleasistencia: un pulsador conectado a una central las 24 horas. Se pide en los servicios sociales del ayuntamiento, sin necesidad de tener la dependencia, y suele ser gratis o de pocos euros al mes.

${L('teleasistencia', 'wa')}`,
  },
  {
    id: 'ayuda-domicilio-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/dependencia/ayuda-a-domicilio/',
    texto: `Con la dependencia reconocida, la ayuda a domicilio va de 20 a 37 horas al mes en el grado I, de 38 a 64 en el grado II y de 65 a 94 en el grado III. Pagas una parte según tus ingresos, y nadie se queda sin ella por no tener dinero.

${L('ayuda-domicilio', 'x')}`,
  },

  /* ---------- Centro de día y residencias ---------- */
  {
    id: 'centro-de-dia-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/dependencia/centro-de-dia/',
    texto: `El centro de día atiende de día a la persona mayor y por la noche vuelve a dormir a casa. Con la dependencia, plaza pública pagando según ingresos o, si no hay, una ayuda de hasta 445,30 € al mes (grados I y II) o 747,25 € (grado III).

${L('centro-de-dia', 'x')}`,
  },
  {
    id: 'centro-de-dia-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/dependencia/centro-de-dia/',
    texto: `Cuando una persona mayor ya no puede quedarse sola en casa, pero la familia puede cuidarla por la noche, el centro de día suele ser la mejor opción, y da un respiro a los cuidadores.

Allí pasa el día con comida, higiene, rehabilitación, actividades y compañía, y por la tarde vuelve a dormir a casa. Muchos tienen transporte adaptado.

Con la dependencia reconocida se puede conseguir plaza pública o concertada, pagando una parte según los ingresos. En el grado I, la plaza es de al menos 15 horas a la semana. Si no hay plaza pública, hay una ayuda de hasta 445,30 euros al mes en los grados I y II, o 747,25 euros en el grado III, para pagar un centro privado acreditado. ${FB_WEB}`,
  },
  {
    id: 'precio-residencia-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/dependencia/precio-residencias/',
    texto: `Una plaza pública en una residencia cuesta de media 1.958,95 € al mes en España, y el residente paga de media 692,40 €: el 35 %. El resto lo pone la Administración. Nunca pagas más del 90 % del coste y te quedan al menos 114 € al mes.

${L('precio-residencia', 'x')}`,
  },
  {
    id: 'residencias-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/dependencia/residencias-publicas/',
    cifra: { ante: 'La cifra', antes: 'Lo que paga de media un residente en una plaza pública', grande: '692,40 €', despues: 'al mes, el 35 % de su coste (1.958,95 €). El resto lo pone la Administración.', fuente: 'Imserso, datos de diciembre de 2024.', corto: 'precio-residencia' },
    texto: `Residencia pública o privada: lo que cambia para la familia.

En una plaza pública o concertada pagas según tu capacidad económica: tus ingresos y el 5 % de tu patrimonio, con un máximo del 90 % del coste y quedándote al menos 114 euros al mes para tus gastos. Se accede con la dependencia en grado II o III, y suele haber lista de espera. De media, el residente paga 692,40 euros al mes por una plaza que cuesta 1.958,95.

En una residencia privada pagas el precio entero, pero eliges el centro y entras antes. Si tienes la dependencia reconocida y no hay plaza pública, puedes cobrar hasta 747,25 euros al mes para pagarla, si la residencia está acreditada.

${FB_WEB}`,
  },
  {
    id: 'residencias-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/dependencia/precio-residencias/',
    texto: `Para trabajadoras sociales y equipos de residencias: los datos del último informe del Imserso sobre precios de plazas residenciales (diciembre de 2024) ayudan a explicar a las familias qué van a pagar.

Plaza pública: coste medio de 1.958,95 euros al mes, con una aportación media del residente de 692,40 euros (el 35 %). Plaza concertada: 1.967,45 euros de coste medio.

En plaza pública, la aportación se calcula con la capacidad económica (renta y el 5 % del patrimonio), con un máximo del 90 % del coste y una garantía mínima de 114 euros al mes para gastos personales. Sin plaza pública, la prestación vinculada al servicio llega a 747,25 euros al mes en el grado III.

Lo resumimos para las familias en el enlace del primer comentario.`,
    comentario: `Precio de las residencias de mayores: ${L('precio-residencia', 'in')}`,
  },

  /* ---------- Cuidadoras y discapacidad ---------- */
  {
    id: 'cuidadora-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/dependencia/cuidadora-interna-externa/',
    texto: `Una cuidadora interna a jornada completa con el salario mínimo cuesta a la familia unos 20.900 € al año en 2026, con la Seguridad Social incluida. Y no cubre las 24 horas: tiene límites de jornada y 36 horas libres a la semana.

${L('cuidadora', 'x')}`,
  },
  {
    id: 'cuidadora-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/dependencia/cuidadora-interna-externa/',
    texto: `Si vais a contratar a una cuidadora para vuestra madre o vuestro padre, conviene saber que es una empleada de hogar, con contrato y alta en la Seguridad Social, aunque trabaje pocas horas.

En 2026 debe cobrar al menos el salario mínimo: 1.221 euros al mes en 14 pagas a jornada completa, o 9,55 euros por hora si es externa por horas.

Una interna a jornada completa con el salario mínimo cuesta a la familia unos 20.900 euros al año, con la Seguridad Social y sus reducciones (317 euros al mes). Y no cubre las 24 horas: tiene límites de jornada, descansos y 36 horas libres a la semana, así que a menudo hace falta otra persona para los fines de semana.

${FB_WEB}`,
  },
  {
    id: 'grado-discapacidad-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/dependencia/grado-discapacidad/',
    texto: `Con un grado de discapacidad del 33 % pagas menos IRPF: tu mínimo sube 3.000 € al año. Con un 65 %, sube 9.000 € más otros 3.000 por gastos de asistencia. Lo reconoce tu comunidad y vale desde la fecha de tu solicitud.

${L('grado-discapacidad', 'x')}`,
  },
  {
    id: 'grado-discapacidad-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/dependencia/grado-discapacidad/',
    texto: `Muchas personas mayores tienen problemas de movilidad, de vista o de corazón que darían un grado de discapacidad, y nunca lo han pedido. Es un trámite que puede ahorrar dinero cada año.

El grado de discapacidad lo reconoce tu comunidad autónoma después de una valoración. Tiene seis meses para resolver, y el grado vale desde la fecha de la solicitud y en toda España.

Con un 33 % se te considera persona con discapacidad: tu mínimo en el IRPF sube 3.000 euros al año, y accedes a otras ventajas. Con un 65 %, sube 9.000 euros, más otros 3.000 por gastos de asistencia, y puedes tener derecho, por ejemplo, a la pensión no contributiva de invalidez.

La dependencia y la discapacidad son trámites distintos, aunque en algunas comunidades se piden juntos. ${FB_WEB}`,
  },
];
