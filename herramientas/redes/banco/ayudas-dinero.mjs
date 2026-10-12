// Banco de publicaciones · Ayudas y dinero. Cifras de las guías de jubilometro.com a 12 de octubre de 2026.
// Ya están en el primer mes: pensión no contributiva en X, bono social eléctrico y cambiar la pensión de banco en Facebook.
import { L, FB_WEB } from './comun.mjs';

export const AYUDAS_DINERO = [
  /* ---------- Ayudas para ingresos bajos ---------- */
  {
    id: 'imv-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/ayudas/ingreso-minimo-vital-mayores/',
    texto: `El ingreso mínimo vital no tiene edad máxima. Con más de 65 años lo puedes cobrar si tus ingresos no llegan a 733,60 € al mes viviendo solo (2026). Es compatible con una pensión baja: cubre la diferencia.

${L('imv', 'x')}`,
  },
  {
    id: 'imv-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/ayudas/ingreso-minimo-vital-mayores/',
    texto: `Mucha gente cree que el ingreso mínimo vital es solo para jóvenes o para familias con hijos. No tiene edad máxima, y lo cobran también personas mayores de 65 años.

Te corresponde si tus ingresos no llegan a la renta garantizada: en 2026, 733,60 euros al mes si vives solo, en 12 pagas, y más si convives con familia o tienes una discapacidad del 65 %.

Es compatible con una pensión, aunque solo cubre la diferencia hasta esa cifra. Lo cobran sobre todo mayores con una pensión muy baja o del extranjero, mayores que viven en un hogar con pocos ingresos y quienes no llegan a los 10 años de residencia que pide la pensión no contributiva: el ingreso mínimo vital pide solo uno.

¿Conoces a alguien que podría estar en este caso? ${FB_WEB}`,
  },
  {
    id: 'pnc-invalidez-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/ayudas/pnc-invalidez/',
    texto: `Con una discapacidad del 65 %, entre 18 y 64 años y pocos ingresos, puedes cobrar la pensión no contributiva de invalidez sin haber cotizado: hasta 628,80 € al mes en 2026, y 314,40 € más si llegas al 75 % y necesitas ayuda de otra persona.

${L('pnc-invalidez', 'x')}`,
  },
  {
    id: 'pnc-invalidez-fb', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/ayudas/pnc-invalidez/',
    texto: `Si tienes una discapacidad o una enfermedad crónica del 65 % o más, tienes entre 18 y 64 años y apenas ingresos, puede corresponderte una pensión aunque no hayas cotizado nunca: la pensión no contributiva de invalidez.

En 2026 es de hasta 628,80 euros al mes en 14 pagas, y como mínimo de 157,20. Si la discapacidad llega al 75 % y necesitas ayuda de otra persona para la vida diaria, se suma un complemento de 314,40 euros al mes.

Hay que vivir en España desde hace cinco años y no superar un límite de ingresos. Es compatible con un trabajo, con ciertos límites, y a los 65 años pasa a ser de jubilación. Se pide en los servicios sociales de tu comunidad. ${FB_WEB}`,
  },
  {
    id: 'alquiler-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/ayudas/complemento-alquiler/',
    texto: `Si cobras una pensión no contributiva y vives de alquiler, puedes pedir un complemento de 525 € al año (2026). Tienes que ser el titular del contrato, no tener casa en propiedad y que el casero no sea familiar tuyo.

${L('alquiler', 'x')}`,
  },
  {
    id: 'alquiler-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/ayudas/complemento-alquiler/',
    texto: `Una ayuda que se queda sin pedir muchos años: el complemento de alquiler de la pensión no contributiva. Son 525 euros al año en 2026, en un solo pago.

Lo puedes cobrar si tienes una pensión no contributiva de jubilación o de invalidez, no tienes vivienda en propiedad y vives de alquiler como titular del contrato. El casero no puede ser tu cónyuge, tu pareja ni un familiar hasta el tercer grado.

Se pide en los servicios sociales de tu comunidad autónoma, los mismos que gestionan tu pensión, y no cuenta como ingreso para seguir cobrando la no contributiva.

Si tienes una vecina o un familiar en esta situación, cuéntaselo. ${FB_WEB}`,
  },
  {
    id: 'ayudas-comunidad-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/ayudas/ayudas-autonomicas/',
    texto: `Si cobras una pensión no contributiva, siete comunidades te dan algo más en 2026: Baleares, Cataluña, Aragón, Canarias, Galicia, Andalucía y la Comunitat Valenciana. En Andalucía, Aragón, Canarias y Galicia llega sin pedirlo.

${L('ayudas-comunidad', 'x')}`,
  },
  {
    id: 'ayudas-comunidad-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/ayudas/ayudas-autonomicas/',
    texto: `Las comunidades autónomas no pagan las pensiones, pero algunas las completan. Estos son los complementos de la pensión no contributiva en 2026.

Baleares, 168,77 euros al mes. Cataluña, hasta 119,67 euros al mes. Aragón, 820,80 euros en un pago. Canarias, 400 euros en dos pagos. Galicia, 218 euros. Andalucía, 192,04 euros. La Comunitat Valenciana, según tus ingresos.

En Andalucía, Aragón, Canarias y Galicia se cobra sin pedirlo. En el resto, hay que solicitarlo.

Y para pensiones contributivas bajas: en Navarra, la jubilación y la viudedad se completan hasta 15.400 euros al año con una deducción del IRPF, y en el País Vasco la renta de garantía de ingresos asegura 1.107,84 euros al mes a un pensionista que vive solo. ${FB_WEB}`,
  },
  {
    id: 'ayudas-vivienda-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/ayudas/ayudas-vivienda/',
    texto: `Si en tu casa vive alguien mayor de 70 años, tu comunidad de vecinos está obligada a poner rampa o salvaescaleras si lo pides, siempre que a cada vecino no le cueste más de 12 cuotas mensuales al año, descontadas las ayudas.

${L('ayudas-vivienda', 'x')}`,
  },
  {
    id: 'ayudas-vivienda-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/ayudas/ayudas-vivienda/',
    texto: `Subir y bajar escaleras se vuelve un problema con los años, y muchas personas mayores dejan de salir de casa por eso. La ley y las ayudas públicas están de tu parte.

Si en tu casa vive alguien mayor de 70 años o con discapacidad, la comunidad de vecinos está obligada a hacer las obras de accesibilidad que pidas (rampa, ascensor, salvaescaleras), siempre que a cada vecino no le cueste más de 12 cuotas mensuales al año, descontadas las ayudas. Si cuesta más, puedes pagar tú la diferencia.

Además, el Plan Estatal de Vivienda 2026-2030, que convoca cada comunidad, subvenciona hasta el 80 % de esas obras en el edificio si vive una persona mayor de 65 años o con discapacidad, con un máximo de 18.000 euros por vivienda. ${FB_WEB}`,
  },
  {
    id: 'ayudas-vivienda-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/ayudas/ayudas-vivienda/',
    texto: `Para administradores de fincas: las obras de accesibilidad son obligatorias para la comunidad en más casos de los que se suele pensar.

Según el artículo 10.1.b de la Ley de Propiedad Horizontal, la comunidad debe realizar los ajustes razonables de accesibilidad que solicite un propietario en cuya vivienda vivan, trabajen o presten servicios voluntarios personas mayores de 70 años o con discapacidad, siempre que el coste repercutido anualmente, descontadas las subvenciones, no supere doce mensualidades ordinarias de gastos comunes. Si las supera, la obra sigue siendo obligatoria si el solicitante asume la diferencia.

Las ayudas del Plan Estatal de Vivienda 2026-2030 llegan al 80 % del coste en edificios donde vive una persona mayor de 65 años o con discapacidad, con un máximo de 18.000 euros por vivienda.

Lo resumimos para los vecinos en el enlace del primer comentario.`,
    comentario: `Ayudas para adaptar la vivienda: ${L('ayudas-vivienda', 'in')}`,
  },

  /* ---------- Trámites, transporte, salud ---------- */
  {
    id: 'tramites-x', red: 'x', pilar: 'Trámites sin líos', fuente: '/ayudas/tramites-online/',
    texto: `Sin Cl@ve también puedes sacar la vida laboral y los certificados de tu pensión: con un código por SMS, si la Seguridad Social tiene tu móvil. Y si un SMS te parece un engaño, llama gratis al 017, de 8 de la mañana a 11 de la noche.

${L('tramites', 'x')}`,
  },
  {
    id: 'tramites-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Trámites sin líos', fuente: '/ayudas/tramites-online/',
    diapositivas: [
      'Trámites por internet sin agobios: lo básico para mayores.',
      'Cl@ve: con la app en el móvil entras en la Seguridad Social y en Hacienda sin recordar contraseñas.',
      'Registrarte: por videollamada desde el móvil, con una carta que llega a casa o en una oficina con tu DNI.',
      'Sin Cl@ve: la vida laboral y los certificados de la pensión, con un código por SMS a tu móvil.',
      'La jubilación se puede pedir con tu correo, una foto del DNI y un selfi.',
      'Un familiar puede hacerlo por ti si le das permiso, hasta 5 años, y se lo puedes quitar cuando quieras.',
      'Si un SMS o un correo te parece un engaño, llama gratis al 017, de 8 de la mañana a 11 de la noche.',
      'Envíaselo a tus padres. La guía paso a paso, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Cl@ve, SMS, apoderar a un familiar y el 017 contra los engaños: los trámites por internet, explicados para mayores. Guía en la biografía.

#mayores #tramites #seguridadsocial #clave`,
  },
  {
    id: 'tramites-wa', red: 'whatsapp', pilar: 'Trámites sin líos', fuente: '/ayudas/tramites-online/',
    texto: `Para guardar en el móvil: si recibes un SMS o un correo «de la Seguridad Social» o «de Hacienda» que te parece raro, no pinches en el enlace y llama gratis al 017, de 8 de la mañana a 11 de la noche.

Más trucos para hacer trámites sin agobios: ${L('tramites', 'wa')}`,
  },
  {
    id: 'transporte-x', red: 'x', pilar: 'Calendario y avisos', fuente: '/ayudas/descuentos-transporte/', hasta: '2026-12-20',
    texto: `Hasta el 31 de diciembre de 2026, Renfe tiene un abono mensual de Cercanías de 20 € para todas las zonas de tu núcleo. Si vas a menudo en tren, puede salirte mejor que la Tarjeta Dorada, que rebaja un 40 % cada billete.

${L('transporte', 'x')}`,
  },
  {
    id: 'transporte-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/ayudas/descuentos-transporte/',
    texto: `Descuentos de transporte para mayores que conviene tener a mano.

En toda España, la Tarjeta Dorada de Renfe cuesta 6 euros al año desde los 60 y rebaja un 40 % Cercanías y Media Distancia y un 25 % el AVE.

Y según dónde vivas: en la Comunidad de Madrid, el Abono +65 es gratis para todo el transporte público; en el área de Barcelona, la Targeta Rosa es gratuita o reducida desde los 60 con ingresos bajos; en Galicia, el autobús interurbano es gratis desde los 65 con la Tarjeta de Movilidad; en Andalucía, la Tarjeta Andalucía Junta 65 da un 50 % en el autobús interurbano.

Muchos ayuntamientos tienen además el autobús urbano gratis o rebajado para mayores. ¿Cómo es en tu pueblo o tu ciudad? ${FB_WEB}`,
  },
  {
    id: 'seguro-salud-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/dinero/seguro-salud-mayores/',
    texto: `Desde mayo de 2026 no pagas nada en la farmacia por los medicamentos con receta si cobras el complemento a mínimos, una pensión no contributiva o el ingreso mínimo vital. El resto de pensionistas paga el 10 %, con un tope al mes.

${L('seguro-salud', 'x')}`,
  },
  {
    id: 'farmacia-wa', red: 'whatsapp', pilar: 'Errores que cuestan dinero', fuente: '/dinero/seguro-salud-mayores/',
    texto: `Para pensionistas: desde mayo de 2026, los medicamentos con receta son gratis si cobras el complemento a mínimos, una pensión no contributiva o el ingreso mínimo vital. Los demás pagan el 10 %, con un tope de 8,23 € al mes si ganan menos de 18.000 € al año.

${L('seguro-salud', 'wa')}`,
  },
  {
    id: 'decesos-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/dinero/seguro-decesos/',
    texto: `A partir de los 60 te interesa saberlo: la aseguradora no puede negarse a renovar tu seguro de decesos, ni por la edad ni por ningún otro motivo. Lo que sí puede es subir la prima, avisándote con dos meses de antelación.

${L('decesos', 'x')}`,
  },
  {
    id: 'decesos-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/dinero/seguro-decesos/',
    texto: `Tres cosas del seguro de decesos que muchas familias descubren tarde.

Si el entierro cuesta menos que la suma asegurada, la diferencia es para los herederos. Si la familia prefiere otra funeraria, la aseguradora tiene que pagarles la suma asegurada. Y si tienes dos seguros de decesos con la misma compañía, puedes anular uno y te devuelven las primas desde que coincidieron.

Además, a partir de los 60 años, la aseguradora no puede negarse a renovarlo. Solo tú puedes darlo de baja. La prima sí puede subir, pero te tienen que avisar con dos meses de antelación. ${FB_WEB}`,
  },

  /* ---------- Impuestos, casa y ahorro ---------- */
  {
    id: 'renta-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/dinero/declaracion-renta-jubilados/',
    texto: `Si solo cobras tu pensión de un único pagador (la Seguridad Social, aunque sean jubilación y viudedad), no estás obligado a hacer la declaración de la renta si no pasas de 22.000 € brutos al año. Con dos pagadores, el límite puede bajar a 15.876 €.

${L('renta', 'x')}`,
  },
  {
    id: 'renta-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/dinero/declaracion-renta-jubilados/',
    texto: `¿Tienen que hacer la declaración de la renta los jubilados? Depende de cuánto cobras y de cuántos pagadores tienes.

Si solo cobras tu pensión y te la paga un único pagador, no estás obligado si no pasas de 22.000 euros brutos al año. Ojo: la jubilación y la viudedad de la Seguridad Social cuentan como un solo pagador.

Si tienes dos o más pagadores y el segundo te paga más de 1.500 euros al año (por ejemplo, el rescate de un plan de pensiones), el límite baja a 15.876 euros. También baja si cobras una pensión del extranjero.

Aunque no estés obligado, a veces conviene presentarla: si te han retenido de más, Hacienda te lo devuelve. ${FB_WEB}`,
  },
  {
    id: 'retencion-x', red: 'x', pilar: 'Trámites sin líos', fuente: '/dinero/irpf-pensiones/',
    texto: `¿Te sale a pagar la renta cada año? Puedes pedir a la Seguridad Social una retención de IRPF más alta en tu pensión, desde la sede o en una oficina. Y si te casas, enviudas o te reconocen una discapacidad, comunícalo para que la ajusten.

${L('retencion', 'x')}`,
  },
  {
    id: 'vender-casa-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/dinero/vender-vivienda-65/',
    texto: `Con más de 65 años, si vendes tu vivienda habitual, la ganancia no paga IRPF, ganes lo que ganes y hagas lo que hagas con el dinero. Lo que sí pagas es la plusvalía municipal, que no tiene exención por edad.

${L('vender-casa', 'x')}`,
  },
  {
    id: 'hipoteca-inversa-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/dinero/hipoteca-inversa/',
    texto: `Tres formas de sacar dinero de tu casa sin dejar de vivir en ella, desde los 65: la hipoteca inversa, vender la nuda propiedad quedándote el usufructo de por vida, o vender y contratar una renta vitalicia.

${L('hipoteca-inversa', 'x')}`,
  },
  {
    id: 'casa-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Calcula tu caso', fuente: '/dinero/hipoteca-inversa/',
    diapositivas: [
      'Tu casa, convertida en dinero sin dejar de vivir en ella: tres formas.',
      'Hipoteca inversa: un préstamo con tu casa como garantía, que cobras de una vez o cada mes.',
      'Sigues siendo el dueño. La deuda la pagan tus herederos, o venden la casa, cuando faltas.',
      'Nuda propiedad: vendes la casa, pero te quedas el derecho a vivir en ella toda tu vida.',
      'Renta vitalicia: vendes y, con el dinero, contratas una renta de por vida con una aseguradora.',
      'Desde los 65, vender tu vivienda habitual no paga IRPF por la ganancia.',
      'Con 70 años o más, solo tributa el 8 % de cada pago de una renta vitalicia.',
      'Guárdalo y háblalo en casa antes de decidir. Las tres opciones, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Hipoteca inversa, nuda propiedad o renta vitalicia: tres formas de convertir tu casa en ingresos sin mudarte. Guía en la biografía.

#jubilacion #vivienda #hipotecainversa #ahorro`,
  },
  {
    id: 'renta-vitalicia-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/dinero/renta-vitalicia/',
    texto: `Con más de 65 años, si vendes un piso que no es tu vivienda, acciones o fondos con ganancia, no pagas IRPF por ella si metes el dinero en una renta vitalicia asegurada en seis meses. Máximo, 240.000 € en toda tu vida.

${L('renta-vitalicia', 'x')}`,
  },
  {
    id: 'renta-vitalicia-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/dinero/renta-vitalicia/',
    texto: `Para asesores financieros y fiscales con clientes mayores de 65 años: la reinversión en renta vitalicia sigue siendo una de las exenciones más útiles del IRPF, y de las menos explicadas.

El artículo 38.3 de la Ley del IRPF exime la ganancia patrimonial obtenida por un mayor de 65 años en la transmisión de cualquier elemento patrimonial si el importe se destina, en seis meses, a constituir una renta vitalicia asegurada a su favor, con un límite de 240.000 euros en toda su vida. Después, la renta tributa como rendimiento del capital mobiliario solo en un porcentaje que depende de la edad al constituirla: el 8 % desde los 70 años.

El coste es la indisponibilidad: el rescate o la anticipación de la renta hace perder la exención.

Ejemplos en el enlace del primer comentario.`,
    comentario: `Renta vitalicia para mayores de 65: ${L('renta-vitalicia', 'in')}`,
  },
  {
    id: 'herencias-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/dinero/herencias-donaciones/',
    texto: `Donar en vida un piso que ha ganado valor puede salir mucho más caro que dejarlo en herencia. Si lo donas, tú pagas IRPF por la ganancia; si lo heredan, esa ganancia no tributa. Y en los dos casos se paga la plusvalía municipal.

${L('herencias', 'x')}`,
  },
  {
    id: 'herencias-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/dinero/herencias-donaciones/',
    texto: `«Les doy ya el piso a mis hijos y así se ahorran la herencia.» Antes de hacerlo, haced números, porque puede salir más caro.

Heredar y recibir una donación pagan el mismo impuesto, el de Sucesiones y Donaciones, y en muchas comunidades es muy bajo entre padres, hijos y cónyuges: Madrid, Andalucía, Castilla y León o la Comunitat Valenciana bonifican el 99 %.

La diferencia está en el IRPF de quien da. Si donas en vida un piso que ha ganado valor desde que lo compraste, tú pagas IRPF por esa ganancia. Si lo dejas en herencia, esa ganancia no tributa.

Y en los dos casos, si es un inmueble urbano, se paga la plusvalía municipal. ${FB_WEB}`,
  },
  {
    id: 'rescate-10-anos-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/dinero/rescate-aportaciones-10-anos/',
    texto: `Desde 2025 puedes sacar dinero de tu plan de pensiones sin estar jubilado: lo aportado hasta 2015, con su rentabilidad, y después cada aportación cuando cumple 10 años. Tributa en el IRPF como un sueldo, sumado a tus demás ingresos.

${L('rescate-10-anos', 'x')}`,
  },
  {
    id: 'plan-pensiones-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/dinero/rescate-plan-pensiones/',
    texto: `Un error caro al jubilarse: sacar de golpe todo el plan de pensiones el mismo año.

Todo lo que rescatas tributa en el IRPF como un sueldo, sumado a tu pensión. Si lo sacas entero en un año, puedes saltar a un tramo mucho más alto y pagar miles de euros de más.

No hay prisa: el plan se puede dejar invertido y cobrar cuando quieras, de una vez, en pagos periódicos, combinando ambos o con pagos sueltos. Repartirlo en varios años suele salir mejor.

Si aportaste antes de 2007, esa parte tiene una reducción del 40 % si la cobras de una vez en el año de tu jubilación o en los dos siguientes. ${FB_WEB}`,
  },
  {
    id: 'ahorro-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/dinero/ahorro-jubilacion/',
    texto: `¿Cuánto ahorro necesito para jubilarme? Si tu pensión se queda 250 € al mes por debajo de lo que gastas, en 25 años de jubilación te hacen falta 75.000 €, o unos 59.000 si tus ahorros rinden un 2 % por encima de la inflación.

${L('calcula-ahorro', 'x')}`,
  },
  {
    id: 'ahorro-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/dinero/ahorro-jubilacion/',
    texto: `¿Cuánto dinero hace falta tener ahorrado para jubilarse tranquilo? La cuenta es más sencilla de lo que parece.

Necesitas lo que tu pensión no cubre de tus gastos, multiplicado por los años que vas a estar jubilado. Si tu pensión se queda 250 euros al mes por debajo de lo que gastas, en 25 años te hacen falta 75.000 euros. Si consigues que tus ahorros rindan un 2 % por encima de la inflación, unos 59.000.

Como referencia, según el INE, una persona de 65 años o más que vive sola gastó de media unos 1.919 euros al mes en 2025. Y a los 65 años quedan de media casi 22 años de vida: 19,87 los hombres y 23,64 las mujeres.

En la calculadora de ahorro pones tu edad, tu pensión y lo que quieres tener al mes, y te dice cuánto apartar. ${FB_WEB}`,
  },
  {
    id: 'vivir-fuera-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/dinero/pension-extranjero/',
    texto: `Puedes irte a vivir a otro país y seguir cobrando tu jubilación o tu viudedad. Lo que pierdes es lo que exige vivir en España, como el complemento a mínimos. Y cada año tienes que acreditar que sigues con vida, desde el móvil con la app VIVESS.

${L('vivir-fuera', 'x')}`,
  },
  {
    id: 'fe-de-vida-wa', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/dinero/pension-extranjero/', desde: '2027-01-02', hasta: '2027-03-20',
    texto: `Si cobras una pensión española y vives en el extranjero: el plazo para la fe de vida de 2027 va, si se mantiene el calendario, del 1 de enero al 31 de marzo. Se hace desde el móvil con la app VIVESS, en el consulado o en la consejería de Trabajo. Si no se acredita, se suspende el pago.

${L('vivir-fuera', 'wa')}`,
  },
  /* ---------- Carruseles de refuerzo ---------- */
  {
    id: 'pnc-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'La cifra que te toca', fuente: '/ayudas/pension-no-contributiva/',
    diapositivas: [
      'Pensión no contributiva: para quien no llegó a cotizar lo suficiente.',
      'Jubilación: desde los 65 años, sin pensión contributiva y con ingresos bajos.',
      '628,80 €: al mes en 2026 como máximo, en 14 pagas.',
      'Residencia: 10 años en España desde los 16, dos de ellos justo antes de pedirla.',
      'Ingresos propios por debajo de 8.803,20 € al año. Si vives con familia, cuentan también los suyos.',
      'Siete comunidades la complementan, y en cuatro llega sin pedirlo.',
      'Si vives de alquiler, puedes pedir además 525 € al año de complemento.',
      'Envíaselo a quien le pueda servir. Requisitos, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Pensión no contributiva de jubilación en 2026: cuantía, requisitos y complementos. Guía en la biografía.

#pensiones #pensionnocontributiva #mayores #ayudas`,
  },
  {
    id: 'renta-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Errores que cuestan dinero', fuente: '/dinero/declaracion-renta-jubilados/',
    diapositivas: [
      '¿Tienen que hacer la renta los jubilados? Depende de esto.',
      'Un solo pagador: no estás obligado hasta 22.000 € brutos al año.',
      'La jubilación y la viudedad de la Seguridad Social cuentan como un solo pagador.',
      'Dos pagadores: si el segundo, como un plan de pensiones, pasa de 1.500 € al año, el límite baja a 15.876 €.',
      'También baja el límite si cobras una pensión del extranjero.',
      'La incapacidad permanente absoluta y las ayudas de la dependencia no tributan.',
      'Aunque no estés obligado, si te han retenido de más, presentarla te devuelve ese dinero.',
      'Guárdalo para la próxima campaña. La guía, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Cuándo tiene que hacer la declaración de la renta un jubilado: los límites y los casos que cambian las cuentas. Guía en la biografía.

#renta #jubilados #pensiones #hacienda`,
  },
  {
    id: 'herencias-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Errores que cuestan dinero', fuente: '/dinero/herencias-donaciones/',
    diapositivas: [
      '¿Donar en vida o dejar en herencia? Lo que cambia en impuestos.',
      'Las dos pagan el Impuesto sobre Sucesiones y Donaciones, y lo paga quien recibe.',
      'Entre padres, hijos y cónyuges, en muchas comunidades se paga muy poco.',
      'Madrid, Andalucía, Castilla y León o la Comunitat Valenciana bonifican el 99 %.',
      'La diferencia: si donas en vida un piso que ha ganado valor, tú pagas IRPF por esa ganancia.',
      'Si lo dejas en herencia, esa ganancia no tributa.',
      'En los dos casos, si es un inmueble urbano, se paga la plusvalía municipal.',
      'Guárdalo y háblalo en familia. La guía, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Donar un piso a los hijos en vida puede salir más caro que dejarlo en herencia. Por qué, en la guía de la biografía.

#herencia #impuestos #familia #jubilacion`,
  },
  {
    id: 'transporte-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Errores que cuestan dinero', fuente: '/ayudas/descuentos-transporte/',
    diapositivas: [
      'Viajar más barato después de los 60: descuentos que conviene conocer.',
      'Tarjeta Dorada de Renfe: 6 € al año desde los 60.',
      '40 %: en Cercanías y Media Distancia con la Tarjeta Dorada. En el AVE, un 25 %.',
      'Comunidad de Madrid: el Abono +65 es gratis en todo el transporte público.',
      'Área de Barcelona: la Targeta Rosa, gratis o reducida desde los 60 con ingresos bajos.',
      'Galicia: autobús interurbano gratis desde los 65 con la Tarjeta de Movilidad.',
      'Andalucía: 50 % en el autobús interurbano con la Tarjeta Andalucía Junta 65.',
      'Compártelo con quien viaje contigo. Todos los descuentos, en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Tarjeta Dorada, abonos gratis y descuentos de autobús para mayores, comunidad a comunidad. Guía en la biografía.

#mayores #transporte #descuentos #jubilados`,
  },

  /* ---------- Emigrantes retornados ---------- */
  {
    id: 'retornados-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/ayudas/emigrantes-retornados/',
    texto: `Si vuelves a España tras trabajar 12 meses en los últimos 6 años fuera del Espacio Económico Europeo, tienes el subsidio para emigrantes retornados: hasta 18 meses, 570 € al mes los seis primeros. Pídelo en los 15 días hábiles siguientes a tu vuelta.

${L('retornados', 'x')}`,
  },
  {
    id: 'retornados-fb', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/ayudas/emigrantes-retornados/',
    cifra: { antes: 'Subsidio para emigrantes retornados en 2026', grande: '570 €', despues: 'al mes los seis primeros meses; después, 540 y 480. Hasta 18 meses.', fuente: 'Ley General de la Seguridad Social, disposición adicional 57.ª y artículo 278.', corto: 'retornados' },
    texto: `Si tienes familia que emigró y está pensando en volver, esto le interesa: los españoles que regresan después de trabajar fuera tienen un subsidio propio, el subsidio para emigrantes retornados. Lo paga el SEPE.

Es para quien ha trabajado al menos 12 meses en los últimos 6 años en países de fuera del Espacio Económico Europeo y no cobró paro allí. Son 570 euros al mes los seis primeros meses, 540 los seis siguientes y 480 los seis últimos. Antes hay que pedir el certificado de emigrante retornado en la Delegación o Subdelegación del Gobierno.

Ojo con el plazo: si se pide en los 15 días hábiles siguientes a la vuelta, se cobra desde el día siguiente; pasados 6 meses, lo deniegan. Y quien vuelve con 65 años o más y sin ingresos puede tener una pensión asistencial por ancianidad.

${FB_WEB}`,
  },
  {
    id: 'retornados-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'La cifra que te toca', fuente: '/ayudas/emigrantes-retornados/',
    diapositivas: [
      'Vuelves a España después de trabajar fuera: esto es lo que te corresponde.',
      '570 €: al mes los seis primeros meses del subsidio para emigrantes retornados. Después, 540 y 480.',
      '18 meses: es lo que dura como máximo, si sigues cumpliendo los requisitos.',
      'Quién lo cobra: quien trabajó 12 meses en los últimos 6 años fuera del Espacio Económico Europeo y no cobró paro allí.',
      'El certificado: lo da la Delegación o Subdelegación del Gobierno. Tienes que estar empadronado.',
      'El plazo: pídelo en los 15 días hábiles siguientes a tu vuelta. Pasados 6 meses, te lo deniegan.',
      '733,60 €: al mes de pensión asistencial para retornados de 65 años o más sin ingresos, según el país del que vuelvas.',
      'Sanidad: la tienes por ser español y vivir en España. Pide el reconocimiento a la Seguridad Social.',
      'Compártelo con quien esté pensando en volver. Todo en la guía de Jubilómetro (enlace en la biografía).',
    ],
    texto: `Si vuelves a España después de trabajar fuera, puedes cobrar el subsidio para emigrantes retornados: hasta 18 meses, 570 € al mes al principio. Requisitos, certificado y plazos en la guía del enlace de la biografía.

#emigrantes #retorno #pensiones #seguridadsocial`,
  },
  {
    id: 'retornados-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/ayudas/emigrantes-retornados/',
    texto: `Para trabajadoras y trabajadores sociales, y para quien atiende a españoles que vuelven del extranjero: desde el 1 de noviembre de 2024, el subsidio para emigrantes retornados está regulado en la disposición adicional 57.ª de la Ley General de la Seguridad Social.

Exige el certificado de emigrante retornado de la Delegación o Subdelegación del Gobierno, 12 meses trabajados en los últimos 6 años en países de fuera del Espacio Económico Europeo o sin convenio de desempleo, no haber cobrado paro allí y carecer de rentas (75 % del salario mínimo). Dura hasta 18 meses, con el 95, el 90 y el 80 % del IPREM: 570, 540 y 480 euros en 2026. El hecho causante es la fecha de la vuelta, así que el plazo de 15 días hábiles corre desde la llegada.

Para mayores de 65 sin recursos, el artículo 25 del Real Decreto 8/2008 prevé una pensión asistencial por ancianidad que no exige los 10 años de residencia de la no contributiva.

Resumen completo en el enlace del primer comentario.`,
    comentario: `Emigrantes retornados: ${L('retornados', 'in')}`,
  },
  {
    id: 'retornados-wa', red: 'whatsapp', pilar: 'La cifra que te toca', fuente: '/ayudas/emigrantes-retornados/',
    texto: `¿Tienes un familiar que vuelve a España después de años trabajando en el extranjero? Si trabajó fuera del Espacio Económico Europeo, puede cobrar el subsidio para emigrantes retornados: hasta 18 meses, con 570 € al mes los seis primeros. Antes tiene que pedir el certificado en la Delegación del Gobierno, y cuanto antes, mejor.

Requisitos y plazos: ${L('retornados', 'wa')}`,
  },
];
