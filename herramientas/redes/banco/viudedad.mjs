// Banco de publicaciones · Viudedad y fallecimiento. Cifras de las guías de jubilometro.com a 12 de octubre de 2026.
// Ya están en el primer mes: cuantía (Facebook, Instagram y vídeo), trabajar cobrando la viudedad en Facebook,
// pareja de hecho (X y Facebook) y qué hacer cuando fallece un pensionista (X y Facebook).
import { L, FB_WEB } from './comun.mjs';

export const VIUDEDAD = [
  /* ---------- Auxilio por defunción ---------- */
  {
    id: 'auxilio-x', red: 'x', pilar: 'Trámites sin líos', fuente: '/viudedad/auxilio-por-defuncion/',
    texto: `El auxilio por defunción son 46,50 € de la Seguridad Social para quien pagó el entierro. Poco, pero se pide en un rato y hay cinco años de plazo. Si la persona fallecida solo cobraba una viudedad o una no contributiva, no se da.

${L('auxilio-defuncion', 'x')}`,
  },
  {
    id: 'auxilio-fb', red: 'facebook', pilar: 'Trámites sin líos', fuente: '/viudedad/auxilio-por-defuncion/',
    cifra: { ante: 'La cifra', antes: 'Auxilio por defunción de la Seguridad Social', grande: '46,50 €', despues: 'en un solo pago, para quien pagó el entierro. Hay cinco años para pedirlo.', fuente: 'Artículos 217 y 218 de la Ley General de la Seguridad Social.', corto: 'auxilio-defuncion' },
    texto: `Cuando muere un familiar, entre tantos papeles se suele olvidar una ayuda pequeña de la Seguridad Social: el auxilio por defunción. Son 46,50 euros en un solo pago, para quien pagó el entierro.

Se da si la persona fallecida trabajaba, cobraba el paro o una baja, o era pensionista de jubilación o de incapacidad permanente. No se da si solo cobraba una pensión de viudedad, una no contributiva o la del SOVI.

Si vas a pedir también la viudedad o la orfandad, se pide todo junto en la misma solicitud. Si solo pides el auxilio, se puede hacer por internet, incluso sin certificado digital, por correo o con cita previa. Hay cinco años de plazo; después se pierde.

${FB_WEB}`,
  },
  {
    id: 'auxilio-wa', red: 'whatsapp', pilar: 'Trámites sin líos', fuente: '/viudedad/auxilio-por-defuncion/',
    texto: `Un trámite que se olvida a menudo tras un fallecimiento: el auxilio por defunción de la Seguridad Social, 46,50 € para quien pagó el entierro. Hay cinco años para pedirlo, y se puede hacer por internet sin certificado digital.

Quién lo cobra y cómo se pide: ${L('auxilio-defuncion', 'wa')}`,
  },

  /* ---------- Requisitos y solicitud ---------- */
  {
    id: 'requisitos-viudedad-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/viudedad/requisitos/',
    texto: `Para cobrar la viudedad, la persona fallecida tenía que trabajar y tener 500 días cotizados en los últimos 5 años, o 15 años cotizados en total, o ser pensionista de jubilación o incapacidad. Si murió por un accidente, no se pide cotización.

${L('requisitos-viudedad', 'x')}`,
  },
  {
    id: 'requisitos-viudedad-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/viudedad/requisitos/',
    texto: `Requisitos de la pensión de viudedad, explicados sin letra pequeña.

Lo que se mira es la situación de la persona fallecida. Tenía que estar trabajando (o cobrando el paro, por ejemplo) y tener 500 días cotizados en los últimos 5 años, o haber cotizado 15 años en total, o ser ya pensionista de jubilación o de incapacidad permanente. Si murió por un accidente o por una enfermedad profesional, no se exige ningún tiempo cotizado.

Pueden cobrarla el cónyuge, la pareja de hecho que cumpla los requisitos de convivencia (e inscripción, salvo que tengáis hijos en común) y el excónyuge que cobraba una pensión compensatoria.

Para quien la cobra no hay límite de edad ni de ingresos, y es compatible con trabajar. ${FB_WEB}`,
  },
  {
    id: 'pedir-viudedad-x', red: 'x', pilar: 'Trámites sin líos', fuente: '/viudedad/solicitar-viudedad/',
    texto: `La pensión de viudedad no caduca, pero solo se cobran con atrasos los tres meses anteriores a la solicitud. Pídela en los tres meses siguientes al fallecimiento y no pierdes nada. Se puede pedir por internet o con cita previa.

${L('pedir-viudedad', 'x')}`,
  },
  {
    id: 'pedir-viudedad-fb', red: 'facebook', pilar: 'Trámites sin líos', fuente: '/viudedad/solicitar-viudedad/',
    texto: `Si acabas de perder a tu pareja, este es el plazo que más importa: pide la pensión de viudedad en los tres meses siguientes al fallecimiento.

El derecho no caduca, pero solo se pagan con efectos retroactivos los tres meses anteriores a la solicitud. Si la pides al cuarto mes, pierdes uno; si la pides al año, pierdes nueve.

Se pide al INSS por internet, en la sede electrónica de la Seguridad Social, o en una oficina con cita previa. En la misma solicitud se piden la orfandad de los hijos y el auxilio por defunción. El INSS tiene 90 días para contestar; si no lo hace, se entiende denegada y puedes reclamar.

Si conoces a alguien en esta situación, puede que le ayude saberlo. ${FB_WEB}`,
  },
  {
    id: 'pedir-viudedad-wa', red: 'whatsapp', pilar: 'Trámites sin líos', fuente: '/viudedad/solicitar-viudedad/',
    texto: `Un plazo que conviene conocer: la pensión de viudedad se cobra con atrasos solo de los tres meses anteriores a la solicitud. Por eso hay que pedirla en los tres meses siguientes al fallecimiento.

Cómo pedirla y qué papeles hacen falta: ${L('pedir-viudedad', 'wa')}`,
  },

  /* ---------- Divorcio, nuevo matrimonio, temporal ---------- */
  {
    id: 'divorcio-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/divorcio-separacion/',
    texto: `Divorciada o separada: cobras la viudedad de tu ex solo si te pagaba una pensión compensatoria, y no puede ser mayor que ella. Excepciones: las víctimas de violencia de género y quien se divorció antes de 2008, con 65 años y 15 de matrimonio.

${L('divorcio', 'x')}`,
  },
  {
    id: 'divorcio-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/divorcio-separacion/',
    texto: `¿Cobras viudedad si tu exmarido o tu exmujer fallece? Depende sobre todo de una cosa: la pensión compensatoria.

Si estabas divorciado o separado judicialmente, tienes derecho a la viudedad solo si cobrabas una pensión compensatoria que se extingue con su muerte. La viudedad no puede ser mayor que esa compensatoria. Y no puedes haberte vuelto a casar ni tener una pareja de hecho.

Hay dos excepciones. Las víctimas de violencia de género no necesitan la pensión compensatoria. Y quien se divorció o se separó antes de 2008 puede cobrarla sin ella si tiene 65 años o más y estuvo casado al menos 15 años. Desde el 21 de octubre de 2026, aunque cobre otra pensión pública.

Si tu ex se volvió a casar, la pensión se reparte según el tiempo vivido con cada uno, y el cónyuge actual se queda al menos el 40 %. ${FB_WEB}`,
  },
  {
    id: 'divorcio-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/viudedad/divorcio-separacion/',
    texto: `Para abogados de familia: un detalle del convenio de divorcio que tiene consecuencias años después, cuando fallece uno de los excónyuges.

Según el artículo 220 de la Ley General de la Seguridad Social, la persona divorciada o separada judicialmente solo accede a la pensión de viudedad si era acreedora de una pensión compensatoria del artículo 97 del Código Civil que se extingue con el fallecimiento. La viudedad queda limitada al importe de esa compensatoria.

Las excepciones son dos: las víctimas de violencia de género, que no necesitan la compensatoria, y las separaciones y divorcios anteriores a 2008, con 65 años y al menos 15 años de matrimonio (desde el Real Decreto-ley 31/2026, aunque se cobre otra pensión pública). Si hay cónyuge actual, la pensión se reparte por tiempo de convivencia, con un mínimo del 40 % para él o ella.

Lo resumimos en el enlace del primer comentario.`,
    comentario: `Viudedad tras un divorcio: ${L('divorcio', 'in')}`,
  },
  {
    id: 'volver-a-casarse-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/nuevo-matrimonio/',
    texto: `Si te vuelves a casar, pierdes la viudedad, salvo que cumplas tres cosas a la vez: más de 61 años, que la viudedad sea al menos el 75 % de tus ingresos y que la pareja no gane más de 34.188 € al año entre los dos en 2026.

${L('volver-a-casarse', 'x')}`,
  },
  {
    id: 'volver-a-casarse-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/nuevo-matrimonio/',
    texto: `Una pregunta que nos llega mucho: si cobro la viudedad y me vuelvo a casar, ¿la pierdo?

Como regla general, sí: la pensión de viudedad se extingue con un nuevo matrimonio o al formalizar una pareja de hecho. Pero la conservas si cumples a la vez tres requisitos.

Primero, tener más de 61 años, o menos si tienes una incapacidad permanente absoluta, una gran incapacidad o una discapacidad del 65 %. Segundo, que la viudedad sea tu principal ingreso: al menos el 75 % de lo que ingresas al año. Tercero, que los ingresos del nuevo matrimonio no pasen de dos veces el salario mínimo, 34.188 euros al año en 2026.

La ley no prevé que se pierda por convivir con alguien sin casarte ni formalizar la pareja de hecho. Y si te casas, hay que comunicarlo al INSS. ${FB_WEB}`,
  },
  {
    id: 'viudedad-temporal-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/viudedad/prestacion-temporal/',
    texto: `Si tu cónyuge muere por una enfermedad que ya tenía antes de la boda y no llevabais un año casados ni tenéis hijos, no hay viudedad vitalicia. Te queda la prestación temporal: la misma cuantía, durante dos años.

${L('viudedad-temporal', 'x')}`,
  },

  /* ---------- Orfandad y familiares ---------- */
  {
    id: 'orfandad-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/viudedad/pension-orfandad/',
    texto: `Pensión de orfandad: cada hijo cobra el 20 % de la base reguladora del fallecido, con un mínimo de 286,50 € al mes en 2026. Hasta los 21 años, hasta los 25 si no trabaja o gana menos del salario mínimo, y sin límite si está incapacitado.

${L('orfandad', 'x')}`,
  },
  {
    id: 'orfandad-fb', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/viudedad/pension-orfandad/',
    texto: `Cuando fallece un padre o una madre, cada hijo puede tener su propia pensión de orfandad. Es el 20 % de la base reguladora de quien fallece, con un mínimo de 286,50 euros al mes en 2026, en 14 pagas.

La cobran los hijos menores de 21 años, los de hasta 25 que no trabajen o ganen menos del salario mínimo, y los incapacitados para trabajar a cualquier edad.

Si fallecen los dos progenitores, la pensión sube: se le suma el porcentaje de la viudedad, el 52 %, repartido entre los hermanos.

Es compatible con trabajar y no paga IRPF hasta los 22 años. Se pide en la misma solicitud que la viudedad. ${FB_WEB}`,
  },
  {
    id: 'favor-familiares-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/favor-de-familiares/',
    texto: `Poca gente conoce la pensión en favor de familiares. La cobran, por ejemplo, los hijos solteros, divorciados o viudos de más de 45 años que cuidaban de su padre o su madre pensionista, vivían a su cargo y no tienen otros medios. Desde 286,50 € al mes.

${L('favor-familiares', 'x')}`,
  },
  {
    id: 'favor-familiares-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/favor-de-familiares/',
    texto: `Pilar tiene 58 años, está soltera y cuidó durante años a su padre, jubilado y viudo, con el que vivía y que la mantenía. Cuando él falleció, ella se quedó sin ingresos. Le corresponde una pensión propia, la pensión en favor de familiares: 651,90 euros al mes en 2026.

La pueden cobrar los hijos y hermanos de un pensionista de jubilación o de incapacidad que tengan más de 45 años, estén solteros, divorciados o viudos, vivieran con él y a su cargo, lo cuidaran durante mucho tiempo y no tengan medios para vivir. También los nietos y hermanos menores de edad o incapacitados, y los padres y abuelos, con sus propios requisitos.

Cada beneficiario cobra el 20 % de la base reguladora del fallecido, con un mínimo de 286,50 euros al mes en 2026, que llega a 651,90 euros (691,70 con 65 años) si es el único beneficiario y no hay viudo ni huérfanos.

¿Conoces a alguien en esta situación? ${FB_WEB}`,
  },

  /* ---------- Compatibilidades ---------- */
  {
    id: 'viudedad-jubilacion-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/viudedad/viudedad-y-jubilacion/',
    texto: `Sí, puedes cobrar la viudedad y tu jubilación a la vez, cada una con su cálculo. El único tope es que la suma no pase de la pensión máxima: 3.359,60 € al mes en 2026. Si cobrabas el 60 % de viudedad, al jubilarte vuelves al 52 %.

${L('viudedad-jubilacion', 'x')}`,
  },
  {
    id: 'viudedad-jubilacion-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/viudedad/viudedad-y-jubilacion/',
    texto: `¿Se puede cobrar la viudedad y la jubilación a la vez? Sí, y cada pensión se calcula por su lado. Al jubilarte, la viudedad no se reduce, salvo en dos casos.

Si cobrabas la viudedad al 60 % por tener 65 años o más y no tener otra pensión, al empezar a cobrar la jubilación vuelve al 52 %.

Si cobrabas complemento a mínimos en la viudedad, se recalcula con la suma de las dos pensiones, y puede bajar o desaparecer.

El único límite es la pensión máxima: la suma de todas tus pensiones públicas no puede pasar de 3.359,60 euros al mes en 2026. Si la pasa, se reduce la última que te reconocen. ${FB_WEB}`,
  },
  {
    id: 'viudedad-trabajo-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/viudedad/compatibilidad-trabajo/',
    texto: `La viudedad es compatible con cualquier sueldo, sin límite. Lo que puedes perder al trabajar son los extras ligados a tus ingresos: el complemento a mínimos, el 60 % para mayores de 65 y el 70 % por cargas familiares.

${L('viudedad-trabajo', 'x')}`,
  },

  /* ---------- Carruseles ---------- */
  {
    id: 'dudas-viudedad-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Calcula tu caso', fuente: '/viudedad/requisitos/',
    diapositivas: [
      'Viudedad: las seis dudas que más nos llegan, con respuesta corta.',
      '¿Hay límite de edad o de ingresos? No. Y se puede cobrar trabajando.',
      '¿Y si no estábamos casados? Las parejas de hecho la cobran si están inscritas 2 años antes y convivían 5. Con hijos en común, bastan 2 años de convivencia.',
      '¿Y si me vuelvo a casar? Se pierde, salvo con más de 61 años y ingresos bajos.',
      '¿Y si estaba divorciada? Solo si cobrabas una pensión compensatoria, con excepciones.',
      '¿Es compatible con mi jubilación? Sí, con un tope de 3.359,60 € al mes entre las dos en 2026.',
      '¿Cuándo hay que pedirla? En los 3 meses siguientes al fallecimiento, para no perder atrasos.',
      'Guárdalo y compártelo con quien lo necesite. Todo, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Las seis dudas sobre la pensión de viudedad que más nos preguntáis, con respuesta corta. Todas las guías, con el enlace de la biografía.

#viudedad #pensiones #seguridadsocial #jubilacion`,
  },
  {
    id: 'tramites-fallecimiento-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Trámites sin líos', fuente: '/viudedad/fallecimiento-pensionista/',
    diapositivas: [
      'Fallece un familiar pensionista: qué hacer y en qué plazos.',
      'La pensión de ese mes se cobra entera, con la parte de la paga extra. Lo de los meses siguientes se devuelve.',
      'En los 3 primeros meses: pide al INSS la viudedad, la orfandad y el auxilio por defunción, todo junto.',
      'Auxilio por defunción: 46,50 € para quien pagó el entierro. Hay 5 años para pedirlo.',
      'Desde 15 días hábiles: el certificado de últimas voluntades, para saber si había testamento.',
      'En 6 meses: el Impuesto sobre Sucesiones, en tu comunidad autónoma.',
      'Al año siguiente: la declaración de la renta del fallecido, en la campaña de primavera.',
      'Guárdalo para cuando haga falta. La guía completa, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Lista de trámites cuando fallece un familiar pensionista, con los plazos de cada uno. Guía completa en la biografía.

#pensiones #viudedad #herencia #tramites`,
  },
];
