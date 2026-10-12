// Banco de publicaciones · Jubilación. Cifras de las guías de jubilometro.com a 12 de octubre de 2026.
import { L, FB_WEB } from './comun.mjs';

export const JUBILACION = [
  /* ---------- SOVI ---------- */
  {
    id: 'sovi-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/jubilacion/pension-sovi/',
    texto: `¿A tu madre le dijeron que no tenía pensión porque le faltaban años? Si trabajó antes de 1967, mira el SOVI: con 1.800 días cotizados entonces paga 599,60 € al mes en 2026. Cada parto anterior a 1967 suma 112 días.

${L('sovi', 'x')}`,
  },
  {
    id: 'sovi-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/jubilacion/pension-sovi/',
    cifra: { antes: 'Pensión del SOVI en 2026', grande: '599,60 €', despues: 'al mes en 14 pagas, para quien cotizó 1.800 días antes de 1967.', fuente: 'Real Decreto 241/2026 y disposición transitoria 2.ª de la Ley General de la Seguridad Social.', corto: 'sovi' },
    texto: `Muchas mujeres que trabajaron de jóvenes en un taller, una fábrica o una casa, y lo dejaron al casarse, creen que no tienen pensión porque no llegan a los 15 años cotizados. Puede que les corresponda la del SOVI, el seguro que existía antes de 1967.

Pide cinco años cotizados (1.800 días, no hace falta que sean seguidos) antes del 1 de enero de 1967, tener 65 años y no tener derecho a otra pensión de la Seguridad Social. La viudedad sí es compatible. En 2026 son 599,60 euros al mes en 14 pagas, o 582,10 si se cobra junto a una viudedad.

Lo que mucha gente no sabe: el Tribunal Supremo suma 112 días por cada hijo nacido antes de 1967 para llegar a esos 1.800 días. Con tres hijos son 336 días, casi un año.

¿Conoces a alguien a quien le dijeron que no tenía pensión? ${FB_WEB}`,
  },
  {
    id: 'sovi-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Errores que cuestan dinero', fuente: '/jubilacion/pension-sovi/',
    diapositivas: [
      '¿Tu madre trabajó antes de 1967? Puede tener pensión.',
      'El SOVI es el seguro que existía antes de la Seguridad Social actual. Todavía paga pensiones.',
      '1.800 días: cotizados antes del 1 de enero de 1967. Unos cinco años, no hace falta que sean seguidos.',
      '599,60 €: al mes en 2026, en 14 pagas.',
      'Con viudedad: también se cobra, 582,10 € al mes.',
      'Cada hijo nacido antes de 1967 suma 112 días para llegar a los 1.800, según el Tribunal Supremo.',
      'Se pide al INSS desde los 65 años. Si la pides en los 30 días siguientes a cumplirlos, se cobra desde ese día.',
      'Envíaselo a quien le pueda servir. La guía completa, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Si tu madre o tu abuela trabajó unos años antes de 1967, puede tener la pensión del SOVI: 599,60 € al mes en 2026. Requisitos en la guía, con el enlace de la biografía.

#pensiones #jubilacion #seguridadsocial #sovi`,
  },
  {
    id: 'sovi-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/jubilacion/pension-sovi/',
    texto: `Para trabajadoras y trabajadores sociales: un caso que conviene revisar antes de dar por hecho que una persona mayor no tiene pensión.

El extinguido SOVI sigue pagando 599,60 euros al mes en 2026 (582,10 si concurre con viudedad) a quien acredita 1.800 días cotizados antes del 1 de enero de 1967, o afiliación al Retiro Obrero, y no tiene derecho a otra pensión del sistema salvo la de viudedad.

El detalle que más expedientes cambia: el Tribunal Supremo aplica al SOVI los 112 días de cotización por cada parto anterior a 1967 (doctrina desde las sentencias de Pleno de 21 de diciembre de 2009, que recoge la STS 1307/2024). En cambio, el servicio social femenino no computa, como ha repetido la STS 560/2026.

Hemos resumido requisitos, cuantías y cómo se pide en el enlace del primer comentario.`,
    comentario: `Pensión del SOVI: ${L('sovi', 'in')}`,
  },
  {
    id: 'sovi-wa', red: 'whatsapp', pilar: 'Errores que cuestan dinero', fuente: '/jubilacion/pension-sovi/',
    texto: `¿Tu madre, tu abuela o una vecina trabajó unos años antes de 1967 y no tiene pensión? Puede corresponderle la del SOVI: 599,60 € al mes en 2026, si cotizó 1.800 días antes de 1967. Cada hijo nacido antes de esa fecha suma 112 días.

Requisitos y cómo pedirla: ${L('sovi', 'wa')}`,
  },

  /* ---------- Trabajar cobrando la pensión: activa, flexible y parcial ---------- */
  {
    id: 'activa-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/activa/',
    texto: `Jubilación activa: si retrasas tu jubilación al menos un año, puedes trabajar y cobrar a la vez el 45 % de la pensión. Con dos años de retraso, el 55 %; con tres, el 65 %; con cuatro, el 80 %, y con cinco, el 100 %.

${L('activa', 'x')}`,
  },
  {
    id: 'flexible-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/flexible/',
    texto: `¿Jubilado y con ganas de volver a trabajar a tiempo parcial? Con la jubilación flexible trabajas entre el 33 % y el 80 % de una jornada y cobras la pensión reducida. Desde agosto de 2026 también pueden los autónomos.

${L('flexible', 'x')}`,
  },
  {
    id: 'parcial-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/parcial/',
    texto: `Jubilación parcial: reduces tu jornada hasta 3 años antes de tu edad ordinaria y cobras una parte de la pensión. Pide 33 años cotizados, 6 años en la empresa y que contraten a otra persona con un contrato de relevo.

${L('parcial', 'x')}`,
  },
  {
    id: 'trabajar-jubilado-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/jubilacion/flexible-activa-o-parcial/',
    texto: `Tres formas legales de cobrar la pensión y trabajar a la vez, según el momento en que estés.

Antes de jubilarte del todo, la jubilación parcial: reduces jornada en tu empresa, hasta 3 años antes de tu edad ordinaria, y la empresa contrata a otra persona con un contrato de relevo.

Si retrasas tu jubilación al menos un año, la activa: trabajas a jornada completa o parcial y cobras del 45 % al 100 % de la pensión, según los años de retraso.

Si ya estás jubilado, la flexible: vuelves a trabajar a tiempo parcial, del 33 % al 80 % de la jornada, y cobras la pensión reducida en proporción. Si empiezas al menos 6 meses después de jubilarte, recibes un incremento del 15 % o del 25 %.

¿Estás pensando en seguir trabajando después de jubilarte? ${FB_WEB}`,
  },
  {
    id: 'trabajar-jubilado-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Calcula tu caso', fuente: '/jubilacion/flexible-activa-o-parcial/',
    diapositivas: [
      'Cobrar la pensión y trabajar a la vez: tres formas legales.',
      'Parcial: antes de jubilarte del todo, reduces jornada en tu empresa, hasta 3 años antes de tu edad ordinaria.',
      'La parcial anticipada pide 33 años cotizados, 6 años en la empresa y un contrato de relevo.',
      'Activa: si retrasas la jubilación al menos un año, trabajas y cobras del 45 % al 100 % de la pensión.',
      'El porcentaje de la activa sube 5 puntos por cada 12 meses seguidos trabajando.',
      'Flexible: ya jubilado, vuelves a trabajar del 33 % al 80 % de una jornada y cobras la pensión reducida.',
      'Si empiezas 6 meses después de jubilarte, la flexible suma un 15 % o un 25 % a lo que cobras.',
      'Guárdalo para cuando lo necesites. Cuál te conviene, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Parcial, activa o flexible: cuál sirve para cada momento si quieres cobrar la pensión y seguir trabajando. Guía en la biografía.

#jubilacion #pensiones #trabajar #seguridadsocial`,
  },
  {
    id: 'activa-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/jubilacion/activa/',
    texto: `Para asesorías laborales y equipos de recursos humanos: la jubilación activa ya no funciona como antes de abril de 2025, y conviene revisarlo con quien quiere seguir en plantilla después de su edad ordinaria.

Desde el 1 de abril de 2025 exige haber demorado la jubilación al menos un año. A cambio, ya no hace falta tener cotizado lo necesario para el 100 % de la pensión. El porcentaje compatible depende de la demora: 45 % con un año, 55 % con dos, 65 % con tres, 80 % con cuatro y 100 % con cinco o más, y sube 5 puntos por cada 12 meses seguidos en activa.

Lo hemos resumido con ejemplos en el enlace del primer comentario.`,
    comentario: `Jubilación activa: ${L('activa', 'in')}`,
  },
  {
    id: 'flexible-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/jubilacion/flexible/',
    texto: `El Real Decreto 416/2026 cambió la jubilación flexible desde el 28 de agosto de 2026, y abre una vía útil para pensionistas que quieren volver a trabajar unas horas.

La jornada compatible va ahora del 33 % al 80 % de un tiempo completo, y la pensión se reduce en proporción. Si la persona empieza a trabajar al menos seis meses después de jubilarse, recibe un incremento del 15 % o del 25 % según la jornada. Y por primera vez pueden acogerse los autónomos, que cobran el 25 % de su pensión.

Para empresas que buscan perfiles con experiencia a tiempo parcial, es una opción que vale la pena explicar. Detalles en el primer comentario.`,
    comentario: `Jubilación flexible: ${L('flexible', 'in')}`,
  },

  /* ---------- Jubilarse antes ---------- */
  {
    id: 'involuntaria-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/anticipada-involuntaria/',
    texto: `Si te despiden, puedes jubilarte hasta 4 años antes. En 2027, desde los 63, o desde los 61 con 38 años y 6 meses cotizados. Pide 33 años cotizados y 6 meses inscrito como demandante de empleo. El recorte es para siempre.

${L('involuntaria', 'x')}`,
  },
  {
    id: 'involuntaria-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/jubilacion/anticipada-involuntaria/',
    texto: `Si pierdes el empleo por una causa que no depende de ti (un ERE, un despido objetivo, el cierre de la empresa), puedes jubilarte hasta 4 años antes de tu edad ordinaria. Es la jubilación anticipada involuntaria.

Necesitas 33 años cotizados y haber estado inscrito como demandante de empleo al menos 6 meses. En 2027, la edad mínima es 63 años, o 61 si has cotizado 38 años y 6 meses.

El precio es un recorte en la pensión para toda la vida, que depende de los meses que adelantes y de tus años cotizados: puede llegar al 30 % si adelantas los 4 años. Antes de decidir, compara con el paro y el subsidio para mayores de 52, que cotiza por ti para la jubilación.

${FB_WEB}`,
  },
  {
    id: 'discapacidad-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/anticipada-discapacidad/',
    texto: `Con una discapacidad del 45 % causada por una de las enfermedades de la lista oficial, puedes jubilarte a los 56 años sin recorte. Desde el 31 de julio de 2026 la lista incluye 11 patologías nuevas, como el párkinson.

${L('discapacidad', 'x')}`,
  },
  {
    id: 'discapacidad-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/jubilacion/anticipada-discapacidad/',
    texto: `Hay dos formas de adelantar la jubilación por discapacidad, y en ninguna se recorta la pensión.

Con una discapacidad del 65 % o más, tu edad de jubilación se reduce según los años que hayas trabajado con esa discapacidad, hasta un mínimo de 52 años.

Con una discapacidad del 45 % o más causada por alguna de las enfermedades de una lista oficial, puedes jubilarte a los 56 años. Desde el 31 de julio de 2026 la lista incluye 11 patologías nuevas, entre ellas el párkinson, la enfermedad de Huntington y la enfermedad renal crónica en estadio G5.

Si tú o alguien de tu familia tiene una de esas enfermedades, conviene revisarlo. ${FB_WEB}`,
  },
  {
    id: 'discapacidad-wa', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/jubilacion/anticipada-discapacidad/',
    texto: `Aviso: desde el 31 de julio de 2026, la lista de enfermedades que permiten jubilarse a los 56 años sin recorte (con una discapacidad del 45 %) incluye 11 patologías nuevas, entre ellas el párkinson y la enfermedad de Huntington.

La lista y los requisitos: ${L('discapacidad', 'wa')}`,
  },
  {
    id: 'compensa-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/compensa-jubilarse-antes/',
    texto: `¿Compensa jubilarse 2 años antes? Solo con las pensiones en la mano, lo cobrado de más se agota entre los 73 y los 79 años, según tu recorte. Desde ahí pierdes dinero cada año, y a los 65 quedan de media más de 19 años de vida.

${L('compensa', 'x')}`,
  },
  {
    id: 'compensa-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/jubilacion/compensa-jubilarse-antes/',
    texto: `¿Compensa jubilarse antes? Hicimos las cuentas con las pensiones en la mano.

Si adelantas tu jubilación 2 años, cobras antes, pero con un recorte para toda la vida. Lo que cobras de más en esos dos años se agota entre los 73 y los 79 años, según tu recorte. A partir de ahí, cada año pierdes dinero. Y a los 65 años la esperanza de vida supera los 19 años en los hombres y los 23 en las mujeres.

Aun así, puede compensar si no vas a tener otros ingresos hasta tu edad ordinaria, si tu salud lo aconseja o si necesitas el dinero ahora. Y casi nunca compensa si te faltan pocos meses para llegar a 38 años y 6 meses cotizados, porque con ellos te jubilas a los 65 sin recorte.

¿Lo estás pensando? ${FB_WEB}`,
  },
  {
    id: 'compensa-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Calcula tu caso', fuente: '/jubilacion/compensa-jubilarse-antes/',
    diapositivas: [
      '¿Compensa jubilarse antes? Las cuentas, con las pensiones en la mano.',
      'Si adelantas 2 años, cobras antes, pero con un recorte para toda la vida.',
      'Ese recorte va del 2,81 % al 21 %, según los meses que adelantes y tus años cotizados.',
      'Lo cobrado de más se agota entre los 73 y los 79 años.',
      'A partir de ahí, cada año pierdes dinero. A los 65, la esperanza de vida supera los 19 años en los hombres y los 23 en las mujeres.',
      'Puede compensar si no vas a tener otros ingresos, si tu salud lo aconseja o si necesitas el dinero ahora.',
      'Casi nunca compensa si te faltan pocos meses para llegar a 38 años y 6 meses cotizados.',
      'Guárdalo antes de decidir. Haz tus cuentas en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Jubilarse antes sale más caro de lo que parece en la mayoría de los casos. Las cuentas, en la guía de la biografía.

#jubilacion #jubilacionanticipada #pensiones #seguridadsocial`,
  },
  {
    id: 'profesiones-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/anticipada-por-profesion/',
    texto: `Bomberos, policías locales, mineros, trabajadores del mar o personal de vuelo tienen coeficientes reductores: se jubilan antes y sin recorte, porque el tiempo adelantado cuenta como cotizado. Con un coeficiente de 0,20, 5 años trabajados adelantan uno.

${L('profesiones', 'x')}`,
  },
  {
    id: 'profesiones-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/jubilacion/anticipada-por-profesion/',
    texto: `Algunas profesiones especialmente penosas o peligrosas permiten jubilarse antes sin perder pensión. Funcionan con coeficientes reductores: por cada año trabajado en ellas, la edad de jubilación baja una fracción de año. Con un coeficiente de 0,20, cada 5 años trabajados adelantan un año la jubilación.

A diferencia de la jubilación anticipada voluntaria, no hay recorte: el tiempo adelantado cuenta como cotizado para calcular la pensión.

Los tienen, entre otros, los bomberos (también los forestales desde septiembre de 2025), los policías locales, los mineros, los trabajadores del mar y el personal de vuelo.

¿Tu profesión tiene coeficiente reductor? ${FB_WEB}`,
  },
  {
    id: 'profesiones-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/jubilacion/anticipada-por-profesion/',
    texto: `Para departamentos de personal de ayuntamientos, diputaciones y consorcios de bomberos: los coeficientes reductores cambian la planificación de las jubilaciones, y no siempre se tienen en cuenta a tiempo.

Bomberos de las administraciones públicas: coeficiente de 0,20 (Real Decreto 383/2008), con una edad mínima de 60 años, o 59 con 35 años cotizados como bombero. Desde el 18 de septiembre de 2025, también los bomberos forestales.

Policías locales: coeficiente de 0,20 (Real Decreto 1449/2018), con un adelanto máximo de 5 años, o 6 con 37 años de servicio, y un mínimo de 15 años trabajados como policía local.

En ambos casos la pensión no se recorta. Tenemos una guía por profesión en el enlace del primer comentario.`,
    comentario: `Jubilación anticipada por profesión: ${L('profesiones', 'in')}`,
  },
  {
    id: 'bomberos-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/bomberos/',
    texto: `Un bombero con 25 años de servicio adelanta su jubilación 5 años, sin recorte en la pensión: el coeficiente es de 0,20 por año. Desde el 18 de septiembre de 2025 también lo tienen los bomberos forestales.

${L('bomberos', 'x')}`,
  },
  {
    id: 'policia-local-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/policia-local/',
    texto: `Policía local: cada año de servicio rebaja la edad de jubilación 0,20 años, hasta 5 años antes (6 con 37 años de servicio). Hace falta haber trabajado 15 años como policía local, y la pensión no se recorta.

${L('policia-local', 'x')}`,
  },
  {
    id: 'policia-nacional-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/policia-nacional/',
    texto: `Policía Nacional: la segunda actividad no es la jubilación. En la escala básica se puede pedir desde los 58 años y sigues cobrando las retribuciones básicas y el 80 % de las complementarias generales. La jubilación forzosa llega a los 65.

${L('policia-nacional', 'x')}`,
  },
  {
    id: 'guardia-civil-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/guardia-civil/',
    texto: `Guardia Civil: la reserva no es la jubilación. Cabos, guardias y suboficiales pasan a la reserva a los 58 años y se retiran a los 65. Un guardia que ingresó antes de 2011 cobra con 35 años de servicio unos 2.275 € al mes en 2026.

${L('guardia-civil', 'x')}`,
  },
  {
    id: 'militares-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/militares/',
    texto: `Militares de carrera: oficiales y suboficiales pasan a la reserva a los 61 años, y la tropa y marinería permanente, a los 58. El retiro, que es la jubilación, llega a los 65, o desde los 60 con 30 años de servicio si lo pides.

${L('militares', 'x')}`,
  },
  {
    id: 'docentes-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/docentes/',
    texto: `Maestros y profesores funcionarios que entraron antes de 2011: pensión de Clases Pasivas y posibilidad de jubilarse desde los 60 con 30 años de servicio. Una maestra con 35 años de servicio cobra en 2026 unos 2.962 € al mes.

${L('docentes', 'x')}`,
  },
  {
    id: 'funcionarios-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/funcionarios/',
    texto: `Funcionarios del Estado: si entraste antes del 1 de enero de 2011, tu pensión es de Clases Pasivas (desde los 60 años con 30 de servicio, y el 100 % con 35). Si entraste después, es de la Seguridad Social, como la del resto.

${L('funcionarios', 'x')}`,
  },
  {
    id: 'mar-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/regimen-del-mar/',
    texto: `Trabajadores del mar: coeficientes de 0,15 a 0,40 por año según el barco, con hasta 10 años de adelanto y sin recorte. 25 años en un arrastrero de más de 250 toneladas adelantan la jubilación 8 años y 9 meses.

${L('mar', 'x')}`,
  },
  {
    id: 'agrarios-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/jubilacion/agrarios/',
    texto: `Jornaleros del campo: se jubilan a la misma edad que el resto, pero con reglas propias. La que más sorprende: los meses sin cotizar no se rellenan al calcular la pensión, y hay que estar al día en las cuotas de los meses sin trabajo.

${L('agrarios', 'x')}`,
  },
  {
    id: 'autonomos-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/jubilacion/autonomos/',
    texto: `Pensión media de jubilación de un autónomo en agosto de 2026: 1.062 € al mes. En el Régimen General: 1.734 €. La razón principal es que la mayoría ha cotizado por la base mínima, y lo que más cuenta son los últimos años antes de jubilarse.

${L('autonomos', 'x')}`,
  },
  {
    id: 'autonomos-fb', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/jubilacion/autonomos/',
    texto: `Los autónomos se jubilan a la misma edad que los asalariados: en 2027, a los 67 años, o a los 65 con 38 años y 6 meses cotizados. También necesitan 15 años cotizados y, además, estar al corriente en el pago de las cuotas.

La diferencia está en la cuantía. En agosto de 2026, la pensión media de jubilación de un autónomo era de 1.062 euros al mes, frente a 1.734 en el Régimen General, porque la mayoría ha cotizado por la base mínima.

Si eres autónomo y te quedan años por delante, lo que más mejora tu pensión es subir la base en los últimos 25 años antes de jubilarte. ${FB_WEB}`,
  },
  {
    id: 'empleadas-hogar-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/empleadas-de-hogar/',
    texto: `Empleadas de hogar: se jubilan con las mismas reglas que cualquier asalariado, con al menos 15 años cotizados. Desde 2023, el alta y la cotización corren siempre a cargo de la familia empleadora, aunque trabajes pocas horas.

${L('empleadas-hogar', 'x')}`,
  },

  /* ---------- Años cotizados y trámites ---------- */
  {
    id: 'convenio-especial-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/convenio-especial/',
    texto: `¿Te faltan pocos años para los 15 mínimos o para jubilarte a los 65? El convenio especial te deja seguir cotizando por tu cuenta cuando dejas de trabajar: en 2026, unos 392 € al mes por la base mínima.

${L('convenio-especial', 'x')}`,
  },
  {
    id: 'convenio-especial-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/jubilacion/convenio-especial/',
    texto: `Si dejas de trabajar sin paro ni subsidio, puedes seguir cotizando por tu cuenta para la jubilación. Se llama convenio especial con la Seguridad Social, y esos meses cuentan como cotizados.

En 2026 cuesta unos 392 euros al mes si cotizas por la base mínima (1.424,40 euros). Compensa sobre todo si te faltan pocos años para llegar a uno de estos tres umbrales: los 15 años que dan derecho a pensión, los 37 años que dan el 100 % o los 38 años y 6 meses que permiten jubilarte a los 65 en vez de a los 67.

${FB_WEB}`,
  },
  {
    id: 'faltan-anos-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/jubilacion/faltan-anos-cotizados/',
    texto: `¿Te faltan años cotizados? Antes de rendirte, mira cuatro cosas: seguir trabajando aunque sea a tiempo parcial, el convenio especial, recuperar prácticas y becas antiguas (hasta 5 años, con plazo hasta 2028) y los días por parto.

${L('faltan-anos', 'x')}`,
  },
  {
    id: 'faltan-anos-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/jubilacion/faltan-anos-cotizados/',
    texto: `Si te faltan años para llegar a los 15 mínimos, a los 37 del 100 % o a los 38 años y 6 meses que permiten jubilarte a los 65, hay cuatro vías legales:

1. Seguir trabajando, aunque sea a tiempo parcial.
2. Firmar un convenio especial con la Seguridad Social y cotizar tú.
3. Recuperar las prácticas y becas antiguas: hasta 5 años, con plazo hasta el 31 de diciembre de 2028.
4. Revisar tu vida laboral: periodos que no aparecen, días por parto, cuidado de hijos o años cotizados en otros países.

Si aun así no llegas a 15 años, la alternativa es la pensión no contributiva. ${FB_WEB}`,
  },
  {
    id: 'otro-pais-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/trabajado-en-otro-pais/',
    texto: `¿Trabajaste unos años en Alemania, Francia, Suiza o en Latinoamérica? Si el país es de la UE o tiene convenio con España, esos años se suman a los de aquí para llegar a los 15 mínimos. Después, cada país paga su parte.

${L('otro-pais', 'x')}`,
  },
  {
    id: 'otro-pais-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/jubilacion/trabajado-en-otro-pais/',
    texto: `Muchos españoles trabajaron unos años fuera, en Alemania, Francia, Suiza o Venezuela, y no saben qué pasa con esos años al jubilarse.

Si cotizaste en un país de la Unión Europea, del Espacio Económico Europeo, en Suiza, en el Reino Unido o en un país con convenio de Seguridad Social con España (la mayoría de Latinoamérica, entre otros), esos años se suman a los de España para cumplir los requisitos, como los 15 años mínimos.

Después, cada país paga su parte de la pensión en proporción a los años cotizados en él, y cada uno aplica su propia edad de jubilación. Los años trabajados en un país sin convenio no cuentan en España.

¿Trabajaste fuera? ${FB_WEB}`,
  },
  {
    id: 'pedir-jubilacion-x', red: 'x', pilar: 'Trámites sin líos', fuente: '/jubilacion/solicitar-jubilacion-internet/',
    texto: `Puedes pedir la jubilación por internet sin certificado digital: con tu correo, una foto del DNI y un selfi. Pídela en los 3 meses anteriores o posteriores a dejar de trabajar para cobrar desde el día siguiente al cese.

${L('pedir-jubilacion', 'x')}`,
  },
  {
    id: 'pedir-jubilacion-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Trámites sin líos', fuente: '/jubilacion/solicitar-jubilacion-internet/',
    diapositivas: [
      'Pedir la jubilación por internet: sin cita y sin certificado digital.',
      'Con Cl@ve, certificado o DNI electrónico: en el área Tu Seguridad Social.',
      'Sin certificado: en la sede electrónica, con tu correo, una foto del DNI y un selfi.',
      'Cuándo: en los 3 meses anteriores o posteriores a la fecha en que dejes de trabajar.',
      'Así cobras desde el día siguiente al cese, sin perder ningún mes.',
      'Papeles: casi siempre basta con el DNI, la cuenta del banco y la solicitud.',
      'La Seguridad Social tiene 90 días para resolver. En julio de 2026 tardó de media 7,46 días.',
      'Guárdalo para el día que te toque. Paso a paso en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Pedir la jubilación por internet es más sencillo de lo que parece, incluso sin certificado digital. Paso a paso en la guía de la biografía.

#jubilacion #pensiones #seguridadsocial #tramites`,
  },
  {
    id: 'pedir-jubilacion-wa', red: 'whatsapp', pilar: 'Trámites sin líos', fuente: '/jubilacion/solicitar-jubilacion-internet/',
    texto: `Para quien se jubila pronto: la pensión se puede pedir por internet sin certificado digital, con tu correo, una foto del DNI y un selfi. Pídela en los 3 meses anteriores o posteriores a dejar de trabajar para cobrar desde el día siguiente al cese.

Paso a paso: ${L('pedir-jubilacion', 'wa')}`,
  },
  {
    id: 'documentos-x', red: 'x', pilar: 'Trámites sin líos', fuente: '/jubilacion/documentos-jubilacion/',
    texto: `Para una jubilación ordinaria suele bastar con el DNI, el número de cuenta y la solicitud: la Seguridad Social ya tiene tus cotizaciones. Te pedirán más papeles solo en casos concretos. Lista para imprimir:

${L('documentos', 'x')}`,
  },
  {
    id: 'documentos-fb', red: 'facebook', pilar: 'Trámites sin líos', fuente: '/jubilacion/documentos-jubilacion/',
    texto: `¿Qué papeles hay que llevar para pedir la jubilación? Menos de los que piensa mucha gente.

Para una jubilación ordinaria, en la mayoría de los casos basta con el documento de identidad, la cuenta del banco donde quieres cobrar y la solicitud: la Seguridad Social ya tiene tus cotizaciones.

Según tu caso, te pedirán además el libro de familia (si tienes cónyuge o hijos), certificados de empresa (si tu profesión tiene coeficientes reductores), los papeles del despido (en la anticipada involuntaria), el certificado de discapacidad o los periodos trabajados en el extranjero.

En la web tienes la lista para imprimir e ir marcando lo que ya tienes. El enlace está en la información de esta página.`,
  },
  {
    id: 'cuanto-tarda-x', red: 'x', pilar: 'Trámites sin líos', fuente: '/jubilacion/cuanto-tarda-jubilacion/',
    texto: `¿Cuánto tarda la Seguridad Social en reconocer la jubilación? Tiene 90 días, pero en julio de 2026 la media fue de 7,46 días. Y si se retrasa, cobras los atrasos desde la fecha de efectos de tu pensión.

${L('cuanto-tarda', 'x')}`,
  },
  {
    id: 'despido-60-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/jubilacion/despido-a-los-60/',
    texto: `Despedido a los 60: lo habitual es encadenar el paro (hasta 2 años), el subsidio para mayores de 52 (480 € al mes en 2026, que además cotiza para tu jubilación) y la jubilación, ordinaria o anticipada.

${L('despido-60', 'x')}`,
  },
  {
    id: 'despido-60-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/jubilacion/despido-a-los-60/',
    texto: `Qué hacer si te despiden a los 60 años. Lo habitual es encadenar tres etapas.

Primero, el paro: hasta 2 años, según lo que hayas cotizado en los últimos 6.

Después, el subsidio para mayores de 52 años: 480 euros al mes en 2026, hasta tu edad de jubilación. Mientras lo cobras, el SEPE cotiza por ti para la jubilación.

Por último, la jubilación: la ordinaria o, si te interesa, la anticipada involuntaria, que en 2027 se puede pedir desde los 61 o los 63 años, con recorte.

Lo que más conviene depende de tus años cotizados, de tu base de cotización y de si puedes volver a trabajar. ${FB_WEB}`,
  },
];
