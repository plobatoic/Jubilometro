// Banco de publicaciones · Incapacidad y bajas. Cifras de las guías de jubilometro.com a 12 de octubre de 2026.
// Ya está en el primer mes: la incapacidad total cualificada (X, Facebook y LinkedIn).
import { L, FB_WEB } from './comun.mjs';

export const INCAPACIDAD = [
  /* ---------- Cuánto se cobra de baja ---------- */
  {
    id: 'baja-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/incapacidad/cuanto-se-cobra-de-baja/',
    texto: `De baja por enfermedad común: los 3 primeros días no se cobran, del día 4 al 20 cobras el 60 % de tu base reguladora y desde el 21, el 75 %. Por accidente de trabajo, el 75 % desde el día siguiente. Tu convenio puede mejorarlo.

${L('baja', 'x')}`,
  },
  {
    id: 'baja-fb', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/incapacidad/cuanto-se-cobra-de-baja/',
    cifra: { ante: 'Ejemplo', antes: 'Lucía, 30 días de baja por enfermedad con una base de 1.800 € al mes', grande: '1.062 €', despues: 'brutos ese mes, si su convenio no mejora la baja.', fuente: 'Artículo 173 de la Ley General de la Seguridad Social, Real Decreto 53/1980 y Decreto 3158/1966.', corto: 'baja' },
    texto: `¿Cuánto se cobra de baja? Lo vemos con el caso de Lucía, que cotiza por una base de 1.800 euros al mes y pasa 30 días de baja por una gripe complicada.

Su base reguladora diaria es de 60 euros (1.800 entre 30). Los 3 primeros días no cobra nada. Del día 4 al 20 cobra el 60 %, 36 euros al día: los paga la empresa hasta el día 15 y el INSS o la mutua desde el 16. Del día 21 al 30, el 75 %, 45 euros al día.

En total, 1.062 euros brutos en lugar de 1.800. Si hubiera sido un accidente de trabajo, habría cobrado 1.365.

Antes de hacer cuentas, mira tu convenio colectivo: muchos obligan a la empresa a completar la baja hasta el 100 % del sueldo. ${FB_WEB}`,
  },
  {
    id: 'baja-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'La cifra que te toca', fuente: '/incapacidad/cuanto-se-cobra-de-baja/',
    diapositivas: [
      '¿Cuánto se cobra de baja? Día a día, según el motivo.',
      'Enfermedad común, días 1 a 3: nada, salvo que tu convenio lo mejore.',
      '60 %: de tu base reguladora del día 4 al 20. Hasta el día 15 lo paga la empresa.',
      '75 %: desde el día 21, a cargo del INSS o de la mutua, aunque lo sigues cobrando en la nómina.',
      'Accidente de trabajo: el día del accidente, el sueldo entero, y el 75 % desde el día siguiente.',
      'La base reguladora diaria es tu base de cotización del mes anterior entre 30.',
      'Desde 2023 no tienes que llevar el parte a la empresa: el INSS se lo comunica.',
      'Guárdalo por si te hace falta. La guía con el ejemplo en euros, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Cuánto se cobra de baja por enfermedad o por accidente de trabajo, día a día y con un ejemplo en euros. Guía en la biografía.

#baja #incapacidadtemporal #trabajo #seguridadsocial`,
  },
  {
    id: 'baja-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/incapacidad/cuanto-se-cobra-de-baja/',
    texto: `Para equipos de recursos humanos y nóminas: tres puntos de la incapacidad temporal que siguen generando dudas en la plantilla.

Pago delegado. Del día 4 al 15 de una baja por enfermedad común, el 60 % de la base reguladora corre a cargo de la empresa. Desde el día 16 lo paga el INSS o la mutua, pero la empresa lo sigue abonando en nómina y lo compensa en la liquidación de cuotas.

Partes. Desde el 1 de abril de 2023 (Real Decreto 1060/2022), la persona trabajadora ya no entrega copia del parte: el INSS lo comunica a la empresa por vía telemática.

Fin del contrato durante la baja. Si el contrato termina estando de baja por enfermedad común, se sigue cobrando, pero la cuantía pasa a ser la del paro, y ese tiempo se descuenta luego de la prestación (artículo 283 de la Ley General de la Seguridad Social). Por accidente de trabajo se mantiene la misma cuantía hasta el alta.

Tabla y ejemplo en euros en el primer comentario.`,
    comentario: `Cuánto se cobra de baja: ${L('baja', 'in')}`,
  },
  {
    id: 'baja-wa', red: 'whatsapp', pilar: 'La cifra que te toca', fuente: '/incapacidad/cuanto-se-cobra-de-baja/',
    texto: `De baja por enfermedad común se cobra el 60 % de la base del día 4 al 20 y el 75 % desde el día 21. Los tres primeros días no se cobran, salvo que el convenio diga otra cosa. Por accidente de trabajo, el 75 % desde el día siguiente.

Con un ejemplo en euros: ${L('baja', 'wa')}`,
  },
  {
    id: 'baja-larga-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/incapacidad/incapacidad-temporal/',
    texto: `La baja dura como máximo 365 días, que se pueden alargar 180 más. A los 545 días se acaba, pero sigues cobrando lo mismo hasta que el INSS decide si tienes una incapacidad permanente, con un límite de 730 días en total.

${L('baja-larga', 'x')}`,
  },
  {
    id: 'baja-larga-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/incapacidad/incapacidad-temporal/',
    texto: `Qué pasa cuando una baja se alarga, mes a mes.

La baja (la incapacidad temporal) dura como máximo 365 días. Al llegar ahí, solo el INSS decide: te puede dar el alta, prorrogar la baja otros 180 días si espera que te recuperes o empezar el expediente de incapacidad permanente.

A los 545 días la baja termina, pero sigues cobrando lo mismo mientras el INSS resuelve si tienes una incapacidad permanente. Tiene 90 días para hacerlo, y entre baja y espera nunca se pueden pasar los 730 días.

Hasta el día 545 sigues de alta y se cotiza por ti, así que esos meses cuentan para tu jubilación. Desde ahí, mientras esperas la decisión, ya no se cotiza. ${FB_WEB}`,
  },

  /* ---------- Grados ---------- */
  {
    id: 'grados-incapacidad-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/incapacidad/grados-incapacidad/',
    texto: `Los cuatro grados de incapacidad permanente: parcial (24 mensualidades de una vez), total (el 55 % de tu base, o el 75 % desde los 55 si no trabajas), absoluta (el 100 %, sin IRPF) y gran incapacidad (el 100 % más un complemento).

${L('grados-incapacidad', 'x')}`,
  },
  {
    id: 'grados-incapacidad-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/incapacidad/grados-incapacidad/',
    texto: `La incapacidad permanente tiene cuatro grados, según cuánto te impide trabajar, y cada uno se cobra de una forma.

Parcial: rindes al menos un 33 % menos en tu trabajo, pero puedes seguir haciéndolo. Cobras una indemnización única de 24 mensualidades y sigues en tu puesto.

Total: no puedes hacer tu trabajo habitual, pero sí otro. Cobras el 55 % de tu base reguladora, que sube al 75 % desde los 55 años si no trabajas.

Absoluta: no puedes trabajar en nada. Cobras el 100 %, sin retención de IRPF.

Gran incapacidad: además, necesitas ayuda de otra persona para comer, vestirte o moverte. Cobras el 100 % más un complemento para pagar a quien te cuida.

${FB_WEB}`,
  },
  {
    id: 'grados-incapacidad-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Calcula tu caso', fuente: '/incapacidad/grados-incapacidad/',
    diapositivas: [
      'Incapacidad permanente: los 4 grados y cuánto se cobra en cada uno.',
      'Parcial: rindes al menos un 33 % menos, pero puedes seguir en tu trabajo.',
      'Parcial: 24 mensualidades de una vez, y la empresa te mantiene en tu puesto.',
      'Total: 55 % de tu base reguladora, si no puedes hacer tu trabajo habitual pero sí otro.',
      'Total cualificada: 75 % desde los 55 años, mientras no trabajes.',
      'Absoluta: 100 % de tu base, sin IRPF, si no puedes trabajar en nada.',
      'Gran incapacidad: 100 % más un complemento para pagar a quien te cuida.',
      'Guárdalo y calcula la tuya en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Parcial, total, absoluta y gran incapacidad: qué significa cada grado y cuánto se cobra. Calculadora en la biografía.

#incapacidadpermanente #pensiones #seguridadsocial #inss`,
  },
  {
    id: 'total-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/incapacidad/incapacidad-total/',
    texto: `Con una incapacidad total, desde mayo de 2025 la empresa ya no puede despedirte sin más. Tienes 10 días para decirle por escrito que quieres seguir, y ella tiene 3 meses para adaptar tu puesto o cambiarte a otro compatible.

${L('total', 'x')}`,
  },
  {
    id: 'total-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/incapacidad/incapacidad-total/',
    texto: `Si te reconocen una incapacidad permanente total, tu contrato ya no se termina solo. Es un cambio de mayo de 2025 que mucha gente aún no conoce.

Tienes 10 días naturales desde que te notifican la incapacidad para decir por escrito a tu empresa que quieres seguir. Desde ahí, la empresa tiene tres meses para adaptar tu puesto o cambiarte a uno vacante que puedas hacer. Solo puede terminar el contrato si la adaptación es una carga excesiva, si no hay ningún puesto compatible o si rechazas un cambio adecuado.

La pensión de la total, el 55 % de tu base reguladora, es compatible con el sueldo de ese otro puesto, en tu empresa o en otra. ${FB_WEB}`,
  },
  {
    id: 'total-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/incapacidad/incapacidad-y-trabajo/',
    texto: `Para recursos humanos y despachos laboralistas: dos cambios recientes en la relación entre incapacidad permanente y empleo que conviene tener presentes.

Incapacidad permanente total, absoluta o gran incapacidad y contrato (Ley 2/2025, desde el 1 de mayo de 2025): la declaración ya no extingue el contrato de forma automática. La persona dispone de 10 días naturales para manifestar por escrito su voluntad de continuar, y la empresa, de tres meses para realizar ajustes razonables o un cambio a un puesto vacante compatible. Solo cabe extinguir si el ajuste supone una carga excesiva, no hay puesto o se rechaza el cambio.

Absoluta y gran incapacidad y trabajo (Ley 7/2024, desde el 22 de diciembre de 2024): si la actividad da lugar al alta en la Seguridad Social, el INSS suspende el pago de la pensión mientras dure y lo reanuda al cesar.

Lo explicamos grado a grado en el enlace del primer comentario.`,
    comentario: `Trabajar con una incapacidad permanente: ${L('incapacidad-trabajo', 'in')}`,
  },
  {
    id: 'absoluta-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/incapacidad/incapacidad-absoluta/',
    texto: `Incapacidad permanente absoluta: el 100 % de tu base reguladora, de por vida y sin IRPF. Desde el 22 de diciembre de 2024, si trabajas con alta en la Seguridad Social, el INSS suspende la pensión mientras dure el trabajo.

${L('absoluta', 'x')}`,
  },
  {
    id: 'gran-incapacidad-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/incapacidad/gran-incapacidad/',
    texto: `Gran incapacidad: el 100 % de tu base reguladora más un complemento para pagar a quien te cuida, del 45 % de la base mínima (640,98 € en 2026) más el 30 % de tu última base. La mínima, si vives solo, es de 1.404,30 € al mes.

${L('gran-incapacidad', 'x')}`,
  },
  {
    id: 'parcial-incapacidad-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/incapacidad/incapacidad-parcial/',
    texto: `La incapacidad permanente parcial no es una pensión: cobras una sola vez 24 mensualidades de la base de tu baja y sigues trabajando. La empresa tiene que mantenerte en tu puesto o en uno adecuado, y solo puede bajarte el sueldo hasta un 25 %.

${L('incapacidad-parcial', 'x')}`,
  },

  /* ---------- Pedirla, recurrirla, revisarla ---------- */
  {
    id: 'enfermedades-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/incapacidad/enfermedades/',
    texto: `No hay una lista de enfermedades que den la incapacidad permanente. El tribunal médico valora las limitaciones que te deja, comparadas con lo que exige tu trabajo. Por eso la misma enfermedad da la incapacidad a una persona y a otra no.

${L('enfermedades', 'x')}`,
  },
  {
    id: 'enfermedades-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/incapacidad/enfermedades/',
    texto: `«¿Qué enfermedades dan la incapacidad permanente?» es de las preguntas que más se buscan, y la respuesta sorprende: no existe una lista.

Lo que valora el tribunal médico del INSS (el Equipo de Valoración de Incapacidades) son las limitaciones que te deja la enfermedad. Tienen que ser graves, se tienen que poder comprobar con pruebas y tienen que ser previsiblemente definitivas. Y se comparan con lo que exige tu profesión: una lesión de rodilla no pesa igual en un albañil que en un administrativo.

Por eso, más que el diagnóstico, importan los informes que describen qué no puedes hacer.

Lo que sí tiene lista oficial son las enfermedades profesionales: si la tuya lo es, no te piden cotización mínima. ${FB_WEB}`,
  },
  {
    id: 'pedir-incapacidad-x', red: 'x', pilar: 'Trámites sin líos', fuente: '/incapacidad/solicitar/',
    texto: `La incapacidad permanente la puedes pedir tú, en la sede de la Seguridad Social o con cita previa. Te valora el tribunal médico, tienes 10 días para alegar antes de la decisión y el INSS tiene 135 días para resolver. Si no contesta, puedes reclamar.

${L('pedir-incapacidad', 'x')}`,
  },
  {
    id: 'denegada-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/incapacidad/denegada/',
    texto: `¿Te han denegado la incapacidad permanente? Tienes 30 días para la reclamación previa ante el INSS. Si la rechaza o no contesta en 45 días, otros 30 para ir al Juzgado de lo Social. Aporta todos tus informes en la reclamación previa.

${L('incapacidad-denegada', 'x')}`,
  },
  {
    id: 'denegada-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/incapacidad/denegada/',
    texto: `Si el INSS te deniega la incapacidad permanente, o te da un grado menor del que crees que te corresponde, no está todo perdido, pero hay que moverse rápido.

Tienes 30 días desde la notificación para presentar una reclamación previa ante el propio INSS. Si en 45 días no contesta o la rechaza, tienes otros 30 días para presentar una demanda en el Juzgado de lo Social.

Un consejo importante: en el juicio solo se discuten los hechos que constan en el expediente, salvo los nuevos. Por eso conviene aportar todos tus informes médicos ya en la reclamación previa.

Para el juicio no es obligatorio ir con abogado, aunque el INSS siempre va con el suyo. Tienes derecho a la justicia gratuita sin importar tus ingresos. ${FB_WEB}`,
  },
  {
    id: 'denegada-wa', red: 'whatsapp', pilar: 'Errores que cuestan dinero', fuente: '/incapacidad/denegada/',
    texto: `Si te deniegan la incapacidad permanente, el plazo corre: 30 días desde la notificación para la reclamación previa ante el INSS, y otros 30 para la demanda si la rechaza o no contesta en 45 días.

Paso a paso: ${L('incapacidad-denegada', 'wa')}`,
  },
  {
    id: 'abogado-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/incapacidad/abogado/',
    texto: `Para pedir la incapacidad y para la reclamación previa no necesitas abogado. Para el juicio no es obligatorio, pero el INSS va con el suyo. Como beneficiario de la Seguridad Social tienes justicia gratuita, sin importar tus ingresos.

${L('abogado-incapacidad', 'x')}`,
  },
  {
    id: 'revision-grado-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/incapacidad/revision-grado/',
    texto: `Pedir la revisión del grado de incapacidad tiene un riesgo: el INSS no está atado a lo que pides y puede bajarte de grado. La revisión se puede pedir desde la fecha que indica tu resolución, y solo hasta la edad de jubilación.

${L('revision-grado', 'x')}`,
  },
  {
    id: 'incapacidad-jubilacion-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/incapacidad/incapacidad-y-jubilacion/',
    texto: `A los 67 años, la pensión de incapacidad permanente pasa a llamarse de jubilación, sin ningún otro cambio: ni la cuantía ni las condiciones. Y si tienes derecho a las dos del mismo régimen, cobras una sola, la más alta.

${L('incapacidad-jubilacion', 'x')}`,
  },
  {
    id: 'calcula-incapacidad-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/calculadoras/incapacidad-permanente/',
    texto: `¿Cuánto cobrarías con una incapacidad permanente? Elige el grado (parcial, total, absoluta o gran incapacidad) y pon tu base reguladora: la calculadora te da lo que cobrarías, con el 75 % de la total cualificada desde los 55 años.

${L('calcula-incapacidad', 'x')}`,
  },
];
