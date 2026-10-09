// «La cifra en 30 segundos»: vídeos verticales sin cara para TikTok, Reels y Shorts.
// Cada escena dura lo que marca su guion (herramientas/redes/mes-1.mjs) y lleva:
//   antetitulo · cifra o frase grande · texto de apoyo · subtítulo (lo que diría la voz)
// En los textos, {n:desde:hasta:decimales} es una cifra que cuenta hasta su valor y *palabra* va resaltada.
// Las cifras son las de las guías a 9 de octubre de 2026.

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
];
