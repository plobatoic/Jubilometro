// Banco de publicaciones · Lanzamiento y comunidad.
// «lanzamiento: N» = día en que sale, contando desde el día de la aprobación (1 = ese mismo día).
// La presentación de la página de Facebook y la primera pregunta del grupo son las del primer mes (mes-1.mjs).
// «fijar: true» = fijarla arriba del perfil o del grupo.
import { L } from './comun.mjs';

export const LANZAMIENTO = [
  {
    id: 'presentacion-x', red: 'x', pilar: 'Presentación', lanzamiento: 1, fijar: true, fuente: '/calculadoras/edad-jubilacion/',
    texto: `Esto es Jubilómetro: guías y calculadoras gratuitas sobre jubilación y pensiones en España. Cada cifra lleva la norma de la que sale y su fecha, y aquí publicamos cada día la que te afecta.

Empieza por tu edad de jubilación: ${L('edad', 'x')}`,
  },
  {
    id: 'bienvenida-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Presentación', lanzamiento: 1, fuente: '/',
    diapositivas: [
      'Esto es Jubilómetro: las cifras de tu pensión, con su norma y su fecha.',
      'Guías: 139 sobre jubilación, viudedad, incapacidad, dependencia, ayudas e Imserso.',
      'Calculadoras: 11 gratuitas, sin registro, para tu edad, tu pensión, la viudedad o la incapacidad.',
      'Cada cifra lleva la norma de la que sale y la fecha en que la comprobamos.',
      'Aquí publicaremos carruseles como este con lo que cambia: la subida, la paga extra, el Imserso o la dependencia.',
      'Las dudas sobre tu caso, en nuestro grupo de Facebook, sin datos personales.',
      'Para empezar, la calculadora de edad te dice el mes exacto en que te puedes jubilar.',
      'Síguenos y compártelo con quien esté cerca de jubilarse. Todo, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Guías y calculadoras gratuitas sobre jubilación y pensiones en España, con la norma y la fecha de cada cifra. La web, en el enlace de la biografía.

#jubilacion #pensiones #seguridadsocial #mayores`,
  },
  {
    id: 'bienvenida-wa', red: 'whatsapp', pilar: 'Presentación', lanzamiento: 1, fuente: '/calculadoras/edad-jubilacion/',
    texto: `Hola. Este es el canal de Jubilómetro: dos o tres avisos a la semana sobre lo que cambia en las pensiones (la subida, la paga extra, los plazos del Imserso y las novedades del BOE). Nadie ve tu número.

Para empezar, calcula en qué mes te puedes jubilar: ${L('edad', 'wa')}`,
  },
  {
    id: 'normas-grupo', red: 'grupo', tipo: 'Normas del grupo', pilar: 'Comunidad', lanzamiento: 1, fijar: true,
    texto: `Bienvenidos a «Jubilación y pensiones: dudas resueltas». Aquí resolvemos dudas sobre jubilación, viudedad, incapacidad, dependencia, ayudas e Imserso, con la norma que se aplica en cada caso.

Tres normas para que el grupo sea útil:

1. Sin datos personales: ni DNI, ni número de la Seguridad Social, ni datos de salud, ni capturas de cartas con tu nombre.
2. Respeto. Cada caso es distinto y aquí todos preguntamos por algo.
3. Sin publicidad ni ofertas de servicios. Si alguien te escribe por privado ofreciendo gestionar tu pensión, avísanos.

Las respuestas son orientativas: la cifra exacta de tu pensión solo te la da el INSS.`,
  },
  {
    id: 'presentacion-li', red: 'linkedin', pilar: 'Presentación', lanzamiento: 1, fuente: '/',
    texto: `Presentamos Jubilómetro, una web de guías y calculadoras sobre jubilación y pensiones en España.

139 guías y 11 calculadoras gratuitas sobre jubilación, viudedad, incapacidad permanente, dependencia, ayudas e Imserso. Cada cifra lleva la norma de la que sale (BOE, Seguridad Social, INE, Imserso) y la fecha en que se comprobó, y cada guía tiene su historial de cambios.

En esta página compartiremos novedades normativas y datos útiles para asesorías laborales, despachos, trabajadoras sociales y equipos de recursos humanos. Las calculadoras se pueden insertar gratis en cualquier web.

La web, en el primer comentario.`,
    comentario: `Jubilómetro: ${L('web', 'in')}`,
  },
  {
    id: 'calculadoras-x', red: 'x', pilar: 'Calcula tu caso', lanzamiento: 2, fuente: '/calculadoras/',
    texto: `11 calculadoras gratuitas y sin registro: edad de jubilación, pensión, simulador completo, anticipada, demorada y activa, pensión neta, viudedad, incapacidad, subida de 2027, cuánto ahorrar y un comparador de edades.

Todas aquí: ${L('calcular', 'x')}`,
  },
  {
    id: 'calculadoras-fb', red: 'facebook', pilar: 'Calcula tu caso', lanzamiento: 2, fuente: '/calculadoras/',
    texto: `En Jubilómetro tienes 11 calculadoras gratuitas, sin registro y sin guardar ningún dato. Para que sepas cuál usar:

¿Cuándo me jubilo? La de edad de jubilación, que te da el mes exacto.
¿Cuánto cobraré? La de la pensión de jubilación, o el simulador, que lo junta todo en una página.
¿Me compensa adelantarla o retrasarla? La de jubilación anticipada, la de demorada y activa, y el comparador de edades.
¿Cuánto me llega al banco? La de pensión neta, con el IRPF de tu comunidad.
¿Cuánto subirá mi pensión? La de la subida de 2027.
¿Y si falta mi pareja? La de viudedad.
¿Y si no puedo trabajar? La de incapacidad permanente.
¿Me llegará con la pensión? La de cuánto ahorrar.

Las tienes todas en la web. El enlace está en la información de esta página.`,
  },
  {
    id: 'metodo-x', red: 'x', pilar: 'Presentación', lanzamiento: 3, fuente: '/metodologia/',
    texto: `Cómo trabajamos: cada cifra sale del BOE, de la Seguridad Social, del INE o del Imserso, y la publicamos con su fecha. Cada guía tiene su historial de cambios. Si ves un error, escríbenos y lo corregimos.

${L('como-trabajamos', 'x')}`,
  },
];

// Pregunta de la semana del grupo de Facebook (los lunes). Una sola pregunta por publicación.
const pregunta = (id, texto, extra = {}) => ({ id, red: 'grupo', tipo: 'Pregunta de la semana', pilar: 'Comunidad', texto, ...extra });

export const GRUPO = [
  pregunta('pregunta-edad', `Pregunta de la semana: ¿a qué edad os jubilasteis, u os vais a jubilar, y por qué elegisteis esa fecha?

Hay quien adelanta por salud, quien espera para cobrar más y quien no tiene elección. Contad vuestro caso sin datos personales: a otros les ayuda a decidir.`),
  pregunta('pregunta-vida-laboral', `Pregunta de la semana: ¿habéis revisado vuestra vida laboral y os faltaba algún periodo trabajado?

Pasa más de lo que parece: contratos de verano, empresas que cerraron, años en el extranjero. Contad qué encontrasteis y cómo lo resolvisteis, sin datos personales.`),
  pregunta('pregunta-imserso', `Pregunta de la semana: ¿qué viaje del Imserso recomendaríais a alguien que va por primera vez?

El destino, el hotel, la época del año o un truco para conseguir plaza. Con vuestras respuestas hacemos una lista para el grupo.`),
  pregunta('pregunta-dependencia', `Pregunta de la semana: ¿cuánto tardaron en resolver la dependencia de vuestro familiar, y en qué comunidad?

Según el Imserso, la media en España es de 293 días, pero va de 109 en Aragón a 529 en la Región de Murcia. Vuestra experiencia ayuda a quien acaba de pedirla.`),
  pregunta('pregunta-antes', `Pregunta de la semana: ¿qué os habría gustado saber antes de jubilaros?

Un trámite, una fecha, un error que os costó dinero. Lo que contéis aquí puede ahorrar un disgusto a quien se jubila el año que viene.`),
  pregunta('pregunta-trabajar', `Pregunta de la semana: ¿seguís trabajando después de jubilaros, o lo estáis pensando?

Con la jubilación activa o la flexible se puede cobrar parte de la pensión y trabajar a la vez. Contad vuestro caso y resolvemos las dudas de cada modalidad.`),
  pregunta('pregunta-tramite', `Pregunta de la semana: ¿qué trámite os gustaría que explicáramos paso a paso?

La cita previa, la Cl@ve, el certificado de la pensión, la solicitud de la viudedad… Con vuestras respuestas elegimos la próxima guía práctica.`),
  pregunta('pregunta-descuentos', `Pregunta de la semana: ¿qué descuentos para mayores usáis en vuestro pueblo o vuestra ciudad?

Autobús, cine, piscina, museos, comedores… Contad cuál y dónde, y hacemos entre todos una lista por provincias.`),
  pregunta('pregunta-cuidar', `Pregunta de la semana: si cuidáis de un familiar mayor, ¿qué ayuda os ha resultado más útil?

La teleasistencia, el centro de día, la ayuda a domicilio, el convenio del cuidador… Lo que funciona en una casa puede servir en otra.`),
  pregunta('pregunta-banco', `Pregunta de la semana: ¿os han ofrecido algún regalo por cambiar la pensión de banco?

Contad qué os ofrecían y qué condiciones tenía, como la permanencia o los productos que había que contratar. Así vemos entre todos qué conviene mirar antes de firmar.`),
  pregunta('pregunta-ahorro', `Pregunta de la semana: ¿cómo os habéis organizado el dinero para la jubilación?

Un plan de pensiones, ahorro, la vivienda o nada en especial. Sin cifras personales: lo que os ha funcionado y lo que no.`),
  pregunta('pregunta-subida', `Pregunta de la semana: ¿os cuadra lo que cobráis en enero con la subida de las pensiones?

Si algo no os cuadra, contadlo sin datos personales y lo revisamos entre todos: muchas veces es la retención del IRPF, que también cambia en enero.`, { desde: '2027-01-25', hasta: '2027-02-15' }),
];
