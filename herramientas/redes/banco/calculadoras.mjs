// Banco de publicaciones · Calculadoras y datos. Lo que pide cada calculadora está comprobado en la web el 12 de octubre de 2026.
// Ya están en el primer mes: la calculadora de edad (X e Instagram), la de la subida y las calculadoras para otras webs (LinkedIn).
import { L, FB_WEB } from './comun.mjs';

export const CALCULADORAS = [
  /* ---------- Una por calculadora ---------- */
  {
    id: 'simulador-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/calculadoras/simulador-jubilacion/',
    texto: `El simulador de jubilación te da en una sola página tu fecha exacta de jubilación, tu pensión, lo que ganas o pierdes adelantándola o retrasándola mes a mes y lo que te llega neto. Pide tu fecha de nacimiento, lo cotizado y tu base.

${L('simulador', 'x')}`,
  },
  {
    id: 'simulador-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/calculadoras/simulador-jubilacion/',
    texto: `Si solo vas a usar una calculadora de Jubilómetro, que sea el simulador de jubilación. Responde en una página a las preguntas que más nos hacéis.

Pones tu mes y año de nacimiento, los años y meses que llevas cotizados, tu base de cotización y tu comunidad autónoma. El simulador te dice en qué fecha exacta te puedes jubilar, cuánto cobrarías, cuánto ganas o pierdes si adelantas o retrasas la jubilación mes a mes y lo que te llegaría neto después del IRPF.

No pide datos personales ni se guarda nada. ${FB_WEB}`,
  },
  {
    id: 'simulador-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/calculadoras/simulador-jubilacion/',
    texto: `Para asesorías y despachos que atienden consultas de jubilación: un recurso gratuito para la primera conversación con un cliente.

El simulador de Jubilómetro calcula con la fecha de nacimiento, la carrera de cotización, la base y la comunidad autónoma: la fecha exacta de acceso a la jubilación ordinaria según la disposición transitoria 7.ª de la Ley General de la Seguridad Social, la pensión con el sistema dual de base reguladora, el efecto mes a mes de adelantar o demorar la jubilación y la pensión neta tras la retención del IRPF.

No sustituye al informe de la Seguridad Social, pero ordena la conversación y ahorra tiempo. Enlace en el primer comentario.`,
    comentario: `Simulador de jubilación: ${L('simulador', 'in')}`,
  },
  {
    id: 'simulador-wa', red: 'whatsapp', pilar: 'Calcula tu caso', fuente: '/calculadoras/simulador-jubilacion/',
    texto: `Con el simulador de jubilación sabes en una sola página cuándo te puedes jubilar, cuánto cobrarás y lo que ganas o pierdes adelantándolo o retrasándolo. Solo pide tu fecha de nacimiento, lo cotizado y tu base. No se guarda nada.

${L('simulador', 'wa')}`,
  },
  {
    id: 'pension-calc-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/calculadoras/pension-jubilacion/',
    texto: `¿Cuánto cobraré de pensión? La calculadora aplica los dos métodos de cálculo que conviven desde 2026 y te dice cuál te favorece. Pon el año en que te jubilas, tu base de cotización media y los años que tendrás cotizados.

${L('pension', 'x')}`,
  },
  {
    id: 'anticipada-calc-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/calculadoras/jubilacion-anticipada/',
    texto: `¿Cuánto pierdes si te jubilas antes? Elige si es voluntaria o involuntaria, los meses de adelanto y tus años cotizados. La calculadora aplica los coeficientes reductores mes a mes de la ley y te da la pensión que te quedaría.

${L('anticipada', 'x')}`,
  },
  {
    id: 'neta-calc-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/calculadoras/pension-neta-irpf/',
    texto: `Lo que te llega al banco es la pensión neta. Pon tu pensión bruta, tu comunidad, tu edad y tu grado de discapacidad, si lo tienes, y la calculadora te da la retención del IRPF y lo que cobras de verdad cada mes.

${L('neta', 'x')}`,
  },
  {
    id: 'demorada-calc-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/calculadoras/jubilacion-demorada-flexible/',
    texto: `Si retrasas tu jubilación, ganas un 4 % de pensión por cada año completo. La calculadora te dice cuánto sube la tuya con el retraso y cuánto cobrarías si sigues trabajando con la jubilación activa o la flexible.

${L('calcula-demorada', 'x')}`,
  },
  {
    id: 'viudedad-calc-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/calculadoras/pension-viudedad/',
    texto: `¿Te corresponde el 52 %, el 60 % o el 70 % de viudedad? La calculadora lo decide con tu edad, tus otros ingresos, tus cargas familiares y si cobras otra pensión, y te dice si llegas a la pensión mínima.

${L('calcula-viudedad', 'x')}`,
  },
  {
    id: 'comparador-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/calculadoras/comparador-ingresos-jubilacion/',
    texto: `¿Jubilarte antes, a tu edad o más tarde? El comparador suma lo que cobrarías en total en cada caso hasta la edad que elijas, con la subida anual de las pensiones, y te dice desde qué edad compensa esperar.

${L('comparador', 'x')}`,
  },
  {
    id: 'comparador-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/calculadoras/comparador-ingresos-jubilacion/',
    texto: `Jubilarse antes significa cobrar menos cada mes, pero durante más años. Jubilarse más tarde, cobrar más, pero empezar después. ¿Qué sale mejor en total? Depende de tus números, y hay una forma de verlo.

El comparador de Jubilómetro suma lo que cobrarías en total si te jubilas antes, a tu edad ordinaria o más tarde, hasta la edad que tú elijas y con la subida anual de las pensiones. Y te dice a partir de qué edad compensa esperar.

Solo necesitas la pensión que tendrías a tu edad ordinaria y tus años cotizados. ${FB_WEB}`,
  },

  /* ---------- Pensión media por provincia ---------- */
  {
    id: 'provincia-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/datos/pension-media-provincia/',
    texto: `Pensión media de jubilación en septiembre de 2026: 1.941 € en Bizkaia y 1.142 € en Ourense, casi 800 € de diferencia. La de España, 1.576 €, y solo 17 de las 52 provincias la superan. ¿Cómo está la tuya?

${L('provincia', 'x')}`,
  },
  {
    id: 'provincia-fb', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/datos/pension-media-provincia/',
    cifra: { ante: 'La cifra', antes: 'Pensión media de jubilación en España, septiembre de 2026', grande: '1.576,10 €', despues: 'Bizkaia, la más alta: 1.941,48 €. Ourense, la más baja: 1.142,35 €.', fuente: 'Seguridad Social, nómina de septiembre de 2026.', corto: 'provincia' },
    texto: `La pensión media de jubilación en España era de 1.576,10 euros al mes en septiembre de 2026. Pero cambia mucho según dónde vivas.

Las más altas: Bizkaia (1.941 euros), Álava (1.925), Gipuzkoa (1.858), Asturias (1.839) y Madrid (1.799). Las más bajas: Ourense (1.142), Lugo (1.242), Almería (1.299), Jaén (1.319) y Cáceres (1.321).

Las diferencias vienen sobre todo de carreras de cotización más largas y sueldos más altos en las zonas industriales, frente a provincias con más peso del campo y de los autónomos. Y es la media de todas las pensiones que se cobran hoy: quien se jubila ahora cobra de media unos 1.711 euros.

¿Cómo está tu provincia? La tabla completa, con las 52, está en la web. El enlace, en la información de esta página.`,
  },
  {
    id: 'provincia-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'La cifra que te toca', fuente: '/datos/pension-media-provincia/',
    diapositivas: [
      'Pensión media de jubilación por provincia: dónde se cobra más y dónde menos.',
      'España: 1.576,10 € al mes de media en septiembre de 2026.',
      'Bizkaia: 1.941,48 € al mes, la más alta.',
      'Le siguen Álava, 1.925 €; Gipuzkoa, 1.858 €; Asturias, 1.839 €, y Madrid, 1.799 €.',
      'Ourense: 1.142,35 € al mes, la más baja.',
      'Por la cola, Lugo, 1.242 €; Almería, 1.299 €; Jaén, 1.319 €, y Cáceres, 1.321 €.',
      'Solo 17 de las 52 provincias superan la media de España.',
      'Busca la tuya en la tabla de Jubilómetro (enlace en la biografía).',
    ],
    texto: `De 1.941 € en Bizkaia a 1.142 € en Ourense: la pensión media de jubilación en las 52 provincias. Tabla completa en la biografía.

#pensiones #jubilacion #espana #datos`,
  },
  {
    id: 'provincia-wa', red: 'whatsapp', pilar: 'La cifra que te toca', fuente: '/datos/pension-media-provincia/',
    texto: `Un dato para comparar: la pensión media de jubilación era de 1.576,10 € en septiembre de 2026, de 1.941 € en Bizkaia a 1.142 € en Ourense. La tabla de las 52 provincias, actualizada cada mes:

${L('provincia', 'wa')}`,
  },
];
