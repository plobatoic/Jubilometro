// «La cifra en 30 segundos»: vídeos verticales sin cara para TikTok, Reels y Shorts.
// Cada escena dura lo que marca su guion (herramientas/redes/mes-1.mjs) y lleva:
//   antetitulo · cifra o frase grande · texto de apoyo · subtítulo (lo que diría la voz)
// En los textos, {n:desde:hasta:decimales} es una cifra que cuenta hasta su valor y *palabra* va resaltada.
// Las cifras son las de las guías a 9 de octubre de 2026 (vídeos 1 a 12) y a 12 de octubre de 2026 (13 a 20).
// Del 13 en adelante son del banco de publicaciones (herramientas/redes/banco/videos.mjs).

export const VIDEOS = [
  {
    archivo: 'video-01-subida-2027',
    enlace: 'jubilometro.com/subida',
    final: 'Calcula la tuya, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Pensiones 2027', grande: '¿Cuánto subirá tu pensión en enero?', tam: 'm', sub: '¿Cuánto subirá tu pensión en enero?' },
      { t: [3, 10], antetitulo: 'Con el IPC hasta septiembre', grande: 'Entre un *{n:0:3.3:1} %* y un *{n:0:3.7:1} %*', tam: 'l', apoyo: 'Es lo que sube de media el IPC de diciembre a noviembre (artículo 58 de la Ley General de la Seguridad Social).', sub: 'Con el IPC hasta septiembre, la subida va por entre un 3,3 y un 3,7 %.' },
      { t: [10, 20], antetitulo: 'Si cobras 1.000 € al mes', bloque: { tipo: 'flecha', de: '1.000 €', a: '{n:1000:1033:0} – {n:1000:1037:0} €' }, apoyo: 'En bruto y en 14 pagas: entre 33 y 37 € más cada mes.', sub: 'Si cobras 1.000 euros, pasarás a cobrar entre 1.033 y 1.037 al mes.' },
      { t: [20, 26], antetitulo: 'Cuándo se sabrá', grande: 'A finales de *noviembre*', tam: 'l', apoyo: 'Con el IPC adelantado de noviembre. Se cobra con la pensión de enero, sin pedir nada.', sub: 'La cifra exacta se sabrá a finales de noviembre, con el IPC de noviembre.' },
    ],
    cierre: { t: [26, 30], sub: 'Calcula la tuya en jubilometro.com/subida.' },
  },
  {
    archivo: 'video-02-naciste-1962',
    enlace: 'jubilometro.com/edad',
    final: 'Tu mes exacto, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Edad de jubilación', grande: '¿Naciste en *1962*?', tam: 'xl', sub: 'Si naciste en 1962, esta es tu edad de jubilación.' },
      { t: [3, 12], antetitulo: 'Si llevas 38 años y 6 meses cotizados', bloque: { tipo: 'linea', puntos: [['1962', 'naces'], ['2027', '65 años', true]] }, apoyo: 'Te jubilas a los *65*, sin recorte.', sub: 'Cumples 65 en 2027. Si para entonces llevas 38 años y 6 meses cotizados, te jubilas a los 65 sin recorte.' },
      { t: [12, 20], antetitulo: 'Si no llegas a esos años', bloque: { tipo: 'linea', puntos: [['1962', 'naces'], ['2027', '65 años'], ['2029', '67 años', true]] }, apoyo: 'Te toca a los *67*, en 2029.', sub: 'Si no llegas, te toca a los 67, en 2029.' },
      { t: [20, 26], antetitulo: 'Ojo', grande: 'Cuentan los años cotizados *el día que te jubilas*', tam: 'm', sub: 'Cuentan los años que tengas cotizados el día que te jubilas, no los de hoy.' },
    ],
    cierre: { t: [26, 30], sub: 'Pon tu fecha en jubilometro.com/edad y te dice el mes exacto.' },
  },
  {
    archivo: 'video-03-viudedad',
    enlace: 'jubilometro.com/calcula-viudedad',
    final: 'Calcula la tuya, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Pensión de viudedad', grande: 'No siempre es el *52 %*', tam: 'l', sub: 'Mucha gente cree que la viudedad es siempre el 52 %.' },
      { t: [3, 10], antetitulo: 'De la base reguladora de quien falleció', bloque: { tipo: 'barras', barras: [[52, 'Caso general']] }, sub: 'El 52 % es el caso general, sobre la base reguladora de quien falleció.' },
      { t: [10, 19], antetitulo: 'Desde los 65 años', bloque: { tipo: 'barras', barras: [[52, 'Caso general'], [60, 'Sin otra pensión ni trabajo y pocas rentas', true]] }, apoyo: 'Ese *60 %* hay que pedirlo.', sub: 'Con 65 años o más, sin otra pensión ni trabajo y pocas rentas, es el 60 %. Y hay que pedirlo.' },
      { t: [19, 26], antetitulo: 'Con cargas familiares', bloque: { tipo: 'barras', barras: [[52, 'Caso general'], [60, 'Desde los 65, hay que pedirlo'], [70, 'Cargas familiares e ingresos bajos', true]] }, sub: 'Con cargas familiares e ingresos bajos, el 70 %.' },
    ],
    cierre: { t: [26, 30], sub: 'Calcula la tuya en Jubilómetro.' },
  },
  {
    archivo: 'video-04-imserso-plazas',
    enlace: 'jubilometro.com/plazas-imserso',
    final: 'Todos los trucos, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Viajes del Imserso', grande: '¿Te quedaste *sin plaza*?', tam: 'l', sub: '¿Te quedaste sin viaje del Imserso?' },
      { t: [3, 10], antetitulo: 'Temporada hasta junio de 2027', grande: 'Las plazas canceladas *vuelven a la venta*', tam: 'm', sub: 'Las plazas que otros cancelan o no pagan vuelven a la venta toda la temporada.' },
      { t: [10, 17], antetitulo: 'Sobre todo', grande: '*{n:0:45:0} días* antes de cada salida', tam: 'l', sub: 'Sobre todo, unos 45 días antes de cada salida.' },
      { t: [17, 25], antetitulo: 'Para encontrarlas', bloque: { tipo: 'lista', items: ['Mira a menudo turismosocial.es o mundicolor.es', 'Busca también desde otras provincias', 'Sé flexible con el destino y las fechas'] }, sub: 'Busca también desde otras provincias y sé flexible con el destino y las fechas.' },
    ],
    cierre: { t: [25, 30], sub: 'Los trucos, en jubilometro.com/plazas-imserso.' },
  },
  /* ---------- Guiones del primer mes (mes-1.mjs) ---------- */
  {
    archivo: 'video-05-naciste-1960',
    enlace: 'jubilometro.com/edad',
    final: 'Tu mes exacto, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Edad de jubilación', grande: '¿Naciste en *1960*?', tam: 'xl', sub: 'Si naciste entre marzo y diciembre de 1960, ojo con tu edad de jubilación.' },
      { t: [3, 11], antetitulo: 'Muchas tablas dicen', grande: '66 años y *8 meses*', tam: 'l', apoyo: 'Es la edad que se pedía en 2025, y nadie nacido en 1960 la cumple ese año.', sub: 'Muchas tablas dicen que te jubilas a los 66 años y 8 meses.' },
      { t: [11, 19], antetitulo: 'Si naciste de marzo a diciembre', grande: 'Te jubilas a los *67*, en 2027', tam: 'l', apoyo: 'Si no llegas a 38 años y 6 meses cotizados.', sub: 'Pero si no llegas a 38 años y 6 meses cotizados, te jubilas a los 67, en 2027.' },
      { t: [19, 26], antetitulo: 'Por qué', grande: 'Cuenta el año en que *te jubilas*', tam: 'm', apoyo: 'No el año en que naciste.', sub: 'Porque cuenta la edad que se pide el año en que te jubilas, no el año en que naciste.' },
    ],
    cierre: { t: [26, 30], sub: 'Calcula tu mes exacto en jubilometro.com/edad.' },
  },
  {
    archivo: 'video-06-cuidador',
    enlace: 'jubilometro.com/cuidador',
    final: 'Cómo pedirlo, paso a paso',
    escenas: [
      { t: [0, 3], antetitulo: 'Si cuidas de un familiar', grande: '¿Dejaste de trabajar para *cuidar*?', tam: 'm', sub: '¿Has dejado de trabajar para cuidar de tu madre o de tu padre?' },
      { t: [3, 11], antetitulo: 'Convenio especial del cuidador', grande: 'Cotiza para tu jubilación *gratis*', tam: 'l', apoyo: 'Si cobra la prestación por cuidados familiares. La cuota la paga el Imserso.', sub: 'Si cobra la prestación por cuidados familiares, puedes cotizar para tu jubilación sin pagar: la cuota la paga el Imserso.' },
      { t: [11, 19], antetitulo: 'Con grado III', grande: 'Base de *{n:0:1424.40:2} €*', tam: 'l', apoyo: 'Con grado I, la mitad: 712,20 € al mes en 2026.', sub: 'Con grado III cotizas por la base mínima, 1.424,40 euros al mes, y con grado I, por la mitad.' },
      { t: [19, 26], antetitulo: 'Plazo', grande: 'Pídelo en *{n:0:90:0} días*', tam: 'l', apoyo: 'En la Tesorería, desde que reconocen la ayuda.', sub: 'Pídelo en la Tesorería en los 90 días siguientes a que reconozcan la ayuda, y cuenta desde ese día.' },
    ],
    cierre: { t: [26, 30], sub: 'Cómo pedirlo, en jubilometro.com/cuidador.' },
  },
  {
    archivo: 'video-07-demorada',
    enlace: 'jubilometro.com/demorada',
    final: 'Tu caso, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Jubilación demorada', grande: '¿Y si te jubilas *más tarde*?', tam: 'm', sub: '¿Qué ganas si te jubilas más tarde?' },
      { t: [3, 11], antetitulo: 'Por cada año completo de retraso', grande: '*+{n:0:4:0} %* de pensión', tam: 'xl', apoyo: 'Para siempre.', sub: 'Por cada año completo de retraso, un 4 % más de pensión, para siempre.' },
      { t: [11, 19], antetitulo: 'O un pago único por año', grande: 'De *4.800* a *13.500 €*', tam: 'l', apoyo: 'Según tu pensión y tus años cotizados.', sub: 'O un pago único de entre unos 4.800 y 13.500 euros por año de retraso.' },
      { t: [19, 26], antetitulo: 'O una mezcla de los dos', grande: 'Desde *2 años* de retraso', tam: 'l', sub: 'O una mezcla de los dos, si retrasas al menos dos años.' },
    ],
    cierre: { t: [26, 30], sub: 'Tu caso, en jubilometro.com/demorada.' },
  },
  {
    archivo: 'video-08-retencion',
    enlace: 'jubilometro.com/neta',
    final: 'Calcula la tuya, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Pensión e IRPF', grande: '¿Cuánto te *retienen*?', tam: 'l', sub: '¿Cuánto IRPF te quitan de la pensión?' },
      { t: [3, 11], antetitulo: 'Sin hijos, hasta 16.476 € al año', grande: '*Nada*', tam: 'xl', apoyo: 'Unos 1.176 € al mes en 14 pagas.', sub: 'Sin hijos a cargo y con hasta 16.476 euros al año, no te retienen nada.' },
      { t: [11, 19], antetitulo: 'Con 1.500 € al mes', grande: 'En torno al *{n:0:9:0} %*', tam: 'l', sub: 'Con 1.500 euros al mes, en torno al 9 %.' },
      { t: [19, 26], antetitulo: 'Con 2.000 € al mes', grande: 'Cerca del *{n:0:17:0} %*', tam: 'l', apoyo: 'Con 3.000 €, alrededor del 22 %.', sub: 'Con 2.000, cerca del 17 %, y con 3.000, alrededor del 22 %.' },
    ],
    cierre: { t: [26, 30], sub: 'Tu pensión neta, en jubilometro.com/neta.' },
  },
  {
    archivo: 'video-09-lagunas',
    enlace: 'jubilometro.com/lagunas',
    final: 'La guía completa, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Años sin cotizar', grande: 'No cuentan como *cero*', tam: 'l', sub: '¿Tienes años sin cotizar? No cuentan como cero.' },
      { t: [3, 11], antetitulo: 'Los 48 primeros meses', grande: 'Con la *base mínima*', tam: 'l', apoyo: '1.424,40 € al mes en 2026.', sub: 'Los 48 primeros meses se rellenan con la base mínima.' },
      { t: [11, 19], antetitulo: 'El resto', grande: 'Con el *{n:0:50:0} %*', tam: 'xl', apoyo: 'Las asalariadas tienen reglas mejores desde 2026.', sub: 'El resto, con el 50 % de la base mínima. Las asalariadas tienen reglas mejores desde 2026.' },
      { t: [19, 26], antetitulo: 'Ojo', grande: 'Mejoran la base, pero *no suman años*', tam: 'm', sub: 'Mejoran tu base reguladora, pero no suman años cotizados.' },
    ],
    cierre: { t: [26, 30], sub: 'Más en jubilometro.com/lagunas.' },
  },
  {
    archivo: 'video-10-brecha',
    enlace: 'jubilometro.com/brecha',
    final: 'Requisitos, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Madres pensionistas', grande: '¿Tienes *hijos* y cobras pensión?', tam: 'm', sub: 'Si tienes hijos y cobras una pensión, mira esto.' },
      { t: [3, 11], antetitulo: 'Complemento de brecha de género', grande: '*{n:0:36.90:2} €* al mes por hijo', tam: 'l', apoyo: 'En 2026, en 14 pagas.', sub: 'El complemento de brecha de género son 36,90 euros al mes por cada hijo.' },
      { t: [11, 19], antetitulo: 'Hasta cuatro hijos', bloque: { tipo: 'flecha', de: '4 hijos', a: '{n:0:147.60:2} € al mes' }, sub: 'Hasta cuatro hijos: 147,60 euros al mes, en 14 pagas.' },
      { t: [19, 26], antetitulo: 'Se suma a tu pensión de', bloque: { tipo: 'lista', items: ['Jubilación', 'Incapacidad permanente', 'Viudedad'] }, sub: 'Se suma a la pensión de jubilación, de incapacidad permanente o de viudedad.' },
    ],
    cierre: { t: [26, 30], sub: 'Requisitos en jubilometro.com/brecha.' },
  },
  {
    archivo: 'video-11-tarjeta-dorada',
    enlace: 'jubilometro.com/tarjeta-dorada',
    final: 'Cómo sacarla',
    escenas: [
      { t: [0, 3], antetitulo: 'Desde los 60 años', grande: '¿Viajas en *tren*?', tam: 'l', sub: '¿Tienes 60 años o más y viajas en tren?' },
      { t: [3, 11], antetitulo: 'Tarjeta Dorada de Renfe', grande: '*{n:0:6:0} €* al año', tam: 'xl', sub: 'La Tarjeta Dorada de Renfe cuesta 6 euros al año.' },
      { t: [11, 19], antetitulo: 'Cercanías y Media Distancia', grande: '*{n:0:40:0} %* de descuento', tam: 'l', sub: 'Te da un 40 % de descuento en Cercanías y Media Distancia.' },
      { t: [19, 26], antetitulo: 'AVE y Larga Distancia', grande: '*{n:0:25:0} %* de descuento', tam: 'l', apoyo: 'Se saca en la taquilla o en una agencia de viajes.', sub: 'Y un 25 % en AVE y Larga Distancia.' },
    ],
    cierre: { t: [26, 30], sub: 'Cómo sacarla, en jubilometro.com/tarjeta-dorada.' },
  },
  {
    archivo: 'video-12-15-anos',
    enlace: 'jubilometro.com/15-anos',
    final: 'Tu caso, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Pocos años cotizados', grande: '¿Solo *15 años* cotizados?', tam: 'l', sub: '¿Tienes solo 15 años cotizados?' },
      { t: [3, 11], antetitulo: 'Tienes pensión', grande: 'El *{n:0:50:0} %* de tu base', tam: 'l', apoyo: 'La base reguladora es la media de lo que cotizaste.', sub: 'Tienes pensión: el 50 % de tu base reguladora.' },
      { t: [11, 19], antetitulo: 'Edad', grande: 'A los *67 años*', tam: 'l', sub: 'A los 67 años.' },
      { t: [19, 26], antetitulo: 'Requisito', grande: '*2 años* dentro de los últimos 15', tam: 'm', sub: 'Y dos de esos años tienen que estar dentro de los últimos 15.' },
    ],
    cierre: { t: [26, 30], sub: 'Tu caso, en jubilometro.com/15-anos.' },
  },

  /* ---------- Banco de publicaciones (herramientas/redes/banco/videos.mjs) ---------- */
  {
    archivo: 'video-13-sovi',
    enlace: 'jubilometro.com/sovi',
    final: 'Requisitos y cómo pedirla',
    escenas: [
      { t: [0, 3], antetitulo: 'Pensión del SOVI', grande: '¿Tu madre trabajó antes de *1967*?', tam: 'm', sub: '¿Tu madre trabajó antes de 1967? Puede tener pensión.' },
      { t: [3, 11], antetitulo: 'Con 1.800 días cotizados antes de 1967', grande: '*{n:0:599.60:2} €* al mes', tam: 'l', apoyo: 'En 14 pagas en 2026. Con viudedad, 582,10 €.', sub: 'Con 1.800 días cotizados antes de 1967, la pensión del SOVI es de 599,60 euros al mes.' },
      { t: [11, 19], antetitulo: 'Cada hijo nacido antes de 1967', grande: 'Suma *{n:0:112:0} días*', tam: 'l', apoyo: 'Para llegar a los 1.800, según el Tribunal Supremo.', sub: 'Cada hijo nacido antes de 1967 suma 112 días para llegar a los 1.800, según el Tribunal Supremo.' },
      { t: [19, 26], antetitulo: 'Requisitos', bloque: { tipo: 'lista', items: ['Tener 65 años', 'Sin otra pensión, salvo la de viudedad', 'Se pide al INSS'] }, sub: 'Hace falta tener 65 años y no tener otra pensión, salvo la de viudedad. Se pide al INSS.' },
    ],
    cierre: { t: [26, 30], sub: 'Requisitos en jubilometro.com/sovi.' },
  },
  {
    archivo: 'video-14-auxilio-defuncion',
    enlace: 'jubilometro.com/auxilio-defuncion',
    final: 'Cómo pedirlo',
    escenas: [
      { t: [0, 3], antetitulo: 'Tras un fallecimiento', grande: 'Una ayuda que *se suele olvidar*', tam: 'm', sub: 'Tras un fallecimiento, hay una ayuda que se suele olvidar.' },
      { t: [3, 10], antetitulo: 'Auxilio por defunción', grande: '*{n:0:46.50:2} €*', tam: 'xl', apoyo: 'En un solo pago, para quien pagó el entierro.', sub: 'El auxilio por defunción: 46,50 euros para quien pagó el entierro.' },
      { t: [10, 18], antetitulo: 'Se da si la persona fallecida', bloque: { tipo: 'lista', items: ['Trabajaba, o cobraba el paro o una baja', 'Era pensionista de jubilación o de incapacidad'] }, apoyo: 'No, si solo cobraba viudedad o una no contributiva.', sub: 'Se da si la persona trabajaba, cobraba el paro o una baja, o era pensionista de jubilación o de incapacidad.' },
      { t: [18, 25], antetitulo: 'Plazo', grande: '*{n:0:5:0} años* para pedirlo', tam: 'l', apoyo: 'Por internet, incluso sin certificado digital.', sub: 'Hay cinco años para pedirlo, y se puede hacer por internet.' },
    ],
    cierre: { t: [25, 30], sub: 'Cómo pedirlo, en jubilometro.com/auxilio-defuncion.' },
  },
  {
    archivo: 'video-15-baja',
    enlace: 'jubilometro.com/baja',
    final: 'Con un ejemplo en euros',
    escenas: [
      { t: [0, 3], antetitulo: 'Baja por enfermedad', grande: '¿Cuánto se cobra *de baja*?', tam: 'l', sub: '¿Cuánto se cobra de baja por enfermedad?' },
      { t: [3, 9], antetitulo: 'Días 1 a 3', grande: '*Nada*', tam: 'xl', apoyo: 'Salvo que tu convenio lo mejore.', sub: 'Los tres primeros días, nada, salvo que tu convenio lo mejore.' },
      { t: [9, 17], antetitulo: 'Del día 4 al 20', grande: 'El *{n:0:60:0} %* de tu base', tam: 'l', apoyo: 'Hasta el día 15 lo paga la empresa.', sub: 'Del día 4 al 20, el 60 % de tu base reguladora.' },
      { t: [17, 26], antetitulo: 'Desde el día 21', bloque: { tipo: 'barras', barras: [[60, 'Del día 4 al 20'], [75, 'Desde el día 21', true]] }, apoyo: 'Por accidente de trabajo, el *75 %* desde el día siguiente.', sub: 'Desde el día 21, el 75 %. Y por accidente de trabajo, el 75 % desde el día siguiente.' },
    ],
    cierre: { t: [26, 30], sub: 'Con un ejemplo en euros, en jubilometro.com/baja.' },
  },
  {
    archivo: 'video-16-compensa',
    enlace: 'jubilometro.com/compensa',
    final: 'Haz tus cuentas',
    escenas: [
      { t: [0, 3], antetitulo: 'Jubilarse antes', grande: '¿Compensa adelantarla *2 años*?', tam: 'm', sub: '¿Compensa jubilarse dos años antes?' },
      { t: [3, 11], antetitulo: 'El recorte, para toda la vida', grande: 'Del *{n:0:2.81:2} %* al *{n:0:21:0} %*', tam: 'l', apoyo: 'Según los meses que adelantes y tus años cotizados.', sub: 'Te recortan la pensión entre un 2,81 y un 21 %, para toda la vida.' },
      { t: [11, 19], antetitulo: 'Lo cobrado de más se agota', grande: 'Entre los *73* y los *79 años*', tam: 'l', apoyo: 'Desde ahí, cada año pierdes dinero.', sub: 'Lo que cobras de más se agota entre los 73 y los 79 años. Desde ahí, pierdes dinero cada año.' },
      { t: [19, 26], antetitulo: 'Esperanza de vida a los 65', grande: 'Más de *19 años*', tam: 'l', apoyo: 'En los hombres. En las mujeres, más de 23.', sub: 'Y a los 65 quedan de media más de 19 años de vida en los hombres y más de 23 en las mujeres.' },
    ],
    cierre: { t: [26, 30], sub: 'Haz tus cuentas en jubilometro.com/compensa.' },
  },
  {
    archivo: 'video-17-complemento-minimos',
    enlace: 'jubilometro.com/complemento-minimos',
    final: 'Requisitos, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Pensiones bajas', grande: '¿No llegas a la *pensión mínima*?', tam: 'm', sub: '¿Tu pensión no llega a la mínima?' },
      { t: [3, 11], antetitulo: 'Mínima con 65 años, viviendo solo', grande: '*{n:0:936.20:2} €* al mes', tam: 'l', apoyo: 'En 2026, en 14 pagas.', sub: 'En 2026, la mínima con 65 años y viviendo solo es de 936,20 euros al mes.' },
      { t: [11, 19], antetitulo: 'Si cobras 750 € al mes', bloque: { tipo: 'flecha', de: '750 €', a: '{n:750:936.20:2} €' }, apoyo: 'La Seguridad Social pone los 186,20 € que faltan.', sub: 'Si cobras 750, la Seguridad Social te paga los 186,20 euros que faltan.' },
      { t: [19, 26], antetitulo: 'Si tus otros ingresos', grande: 'No pasan de *9.442 €* al año', tam: 'm', apoyo: 'Y vives en España.', sub: 'Siempre que tus otros ingresos no pasen de 9.442 euros al año y vivas en España.' },
    ],
    cierre: { t: [26, 30], sub: 'Requisitos en jubilometro.com/complemento-minimos.' },
  },
  {
    archivo: 'video-18-dependencia-espera',
    enlace: 'jubilometro.com/espera-dependencia',
    final: 'Mira tu comunidad',
    escenas: [
      { t: [0, 3], antetitulo: 'Dependencia', grande: '¿Cuánto tarda *de verdad*?', tam: 'l', sub: '¿Cuánto tarda de verdad la dependencia?' },
      { t: [3, 9], antetitulo: 'Lo que dice la ley', grande: '*6 meses*', tam: 'xl', sub: 'La ley da seis meses para resolverla.' },
      { t: [9, 17], antetitulo: 'La media real en España', grande: '*{n:0:302:0} días*', tam: 'xl', apoyo: 'De la solicitud a la prestación, según el Imserso.', sub: 'La media real en España son 302 días, según el Imserso.' },
      { t: [17, 26], antetitulo: 'Depende de tu comunidad', bloque: { tipo: 'lista', items: ['Aragón: 111 días', 'País Vasco: 130 días', 'Región de Murcia: 536 días'] }, sub: 'Desde 111 días en Aragón hasta 536 en la Región de Murcia.' },
    ],
    cierre: { t: [26, 30], sub: 'Tu comunidad, en jubilometro.com/espera-dependencia.' },
  },
  {
    archivo: 'video-19-volver-a-casarse',
    enlace: 'jubilometro.com/volver-a-casarse',
    final: 'Los requisitos, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Pensión de viudedad', grande: '¿La pierdes si te *vuelves a casar*?', tam: 'm', sub: '¿Pierdes la viudedad si te vuelves a casar?' },
      { t: [3, 9], antetitulo: 'Regla general', grande: 'Sí, *se pierde*', tam: 'l', apoyo: 'También si formalizas una pareja de hecho.', sub: 'Como regla general, sí. También si formalizas una pareja de hecho.' },
      { t: [9, 19], antetitulo: 'Salvo que cumplas las tres', bloque: { tipo: 'lista', items: ['Más de 61 años', 'La viudedad es al menos el 75 % de tus ingresos', 'Entre los dos, hasta 34.188 € al año'] }, sub: 'Salvo que tengas más de 61 años, la viudedad sea tu principal ingreso y entre los dos no paséis de 34.188 euros al año.' },
      { t: [19, 26], antetitulo: 'Y no olvides', grande: 'Comunicarlo al *INSS*', tam: 'l', apoyo: 'Si no, tendrás que devolver lo cobrado de más.', sub: 'Y comunícalo al INSS: si no, tendrás que devolver lo cobrado de más.' },
    ],
    cierre: { t: [26, 30], sub: 'Más en jubilometro.com/volver-a-casarse.' },
  },
  {
    archivo: 'video-20-grados-incapacidad',
    enlace: 'jubilometro.com/calcula-incapacidad',
    final: 'Calcula la tuya, gratis',
    escenas: [
      { t: [0, 3], antetitulo: 'Incapacidad permanente', grande: '*4 grados*, 4 formas de cobrar', tam: 'm', sub: 'La incapacidad permanente tiene cuatro grados, y cada uno se cobra distinto.' },
      { t: [3, 9], antetitulo: 'Parcial', grande: '*24* mensualidades', tam: 'l', apoyo: 'De una vez, y sigues en tu trabajo.', sub: 'Parcial: 24 mensualidades de una vez, y sigues en tu trabajo.' },
      { t: [9, 15], antetitulo: 'Total', grande: 'El *{n:0:55:0} %* de tu base', tam: 'l', apoyo: 'El 75 % desde los 55 años, si no trabajas.', sub: 'Total: el 55 % de tu base reguladora, o el 75 % desde los 55 años si no trabajas.' },
      { t: [15, 21], antetitulo: 'Absoluta', grande: 'El *{n:0:100:0} %*, sin IRPF', tam: 'l', sub: 'Absoluta: el 100 %, sin IRPF.' },
      { t: [21, 26], antetitulo: 'Gran incapacidad', grande: '100 % *y un complemento*', tam: 'l', apoyo: 'Para pagar a quien te cuida.', sub: 'Gran incapacidad: el 100 % más un complemento para pagar a quien te cuida.' },
    ],
    cierre: { t: [26, 30], sub: 'Calcula la tuya en jubilometro.com/calcula-incapacidad.' },
  },
];
