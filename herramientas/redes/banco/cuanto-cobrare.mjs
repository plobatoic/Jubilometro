// Banco de publicaciones · Cuánto cobraré. Cifras de las guías de jubilometro.com a 12 de octubre de 2026.
// Lo que ya está en el primer mes (mes-1.mjs) no se repite aquí: pensión según el sueldo en X y LinkedIn,
// bruta y neta en X, mínima en Facebook e Instagram, brecha de género, lagunas en Facebook y LinkedIn,
// certificado y vida laboral en X, pensión máxima en X y paga extra de Navidad.
import { L, FB_WEB } from './comun.mjs';

export const CUANTO_COBRARE = [
  /* ---------- Cómo se calcula ---------- */
  {
    id: 'como-se-calcula-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/cuanto-cobrare/como-se-calcula-la-pension/',
    texto: `Tu pensión de jubilación sale de tres pasos: la base reguladora (la media de lo que has cotizado en los últimos 25 años), el porcentaje por años cotizados (del 50 % con 15 años al 100 % con 37) y los ajustes por jubilarte antes o después.

${L('como-se-calcula', 'x')}`,
  },
  {
    id: 'como-se-calcula-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/cuanto-cobrare/como-se-calcula-la-pension/',
    texto: `Cómo se calcula la pensión de jubilación, en tres pasos y con un ejemplo.

1. La base reguladora: la media de lo que has cotizado en los últimos 25 años, repartida en 14 pagas. Las bases antiguas se actualizan con el IPC para que no pierdan valor.
2. El porcentaje por años cotizados: con 15 años, el 50 % de esa base; con 37 años (36 y medio si te jubilas en 2026), el 100 %.
3. Los ajustes: un recorte si te jubilas antes, un 4 % más por cada año que la retrases, el complemento a mínimos si no llegas a la mínima y el tope de la pensión máxima, 3.359,60 euros al mes en 2026.

Ejemplo: con una base reguladora de 1.800 euros y 33 años y 4 meses cotizados, quien se jubila en 2027 cobra el 91,80 %, es decir, 1.652,40 euros al mes.

${FB_WEB}`,
  },
  {
    id: 'como-se-calcula-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Calcula tu caso', fuente: '/cuanto-cobrare/como-se-calcula-la-pension/',
    diapositivas: [
      'Cómo se calcula tu pensión: tres pasos, sin fórmulas raras.',
      'Primer paso: la base reguladora, que es la media de lo que has cotizado en los últimos 25 años.',
      'Las bases antiguas se actualizan con el IPC, y los meses sin cotizar se rellenan con la base mínima.',
      'Segundo paso: el porcentaje por años cotizados. Con 15 años te corresponde el 50 % de la base.',
      '100 %: con 37 años cotizados si te jubilas desde 2027 (36 años y 6 meses en 2026).',
      'Tercer paso: los ajustes. Un recorte si te adelantas y un 4 % más por cada año que te retrasas.',
      'Pensión máxima: 3.359,60 € al mes en 2026, aunque hayas cotizado más.',
      'Guárdalo para cuando hagas tus cuentas. Calcula tu pensión en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Base reguladora, porcentaje por años cotizados y ajustes: así sale tu pensión de jubilación. La calculadora, con el enlace de la biografía.

#pensiones #jubilacion #seguridadsocial #calculadora`,
  },

  /* ---------- Base reguladora ---------- */
  {
    id: 'base-reguladora-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/cuanto-cobrare/base-reguladora/',
    texto: `Desde 2026, la Seguridad Social calcula tu base reguladora de dos formas: con los últimos 25 años, o con un periodo algo más largo descartando tus peores meses. Te aplica la que más pensión te dé, sin que tengas que pedirlo.

${L('base-reguladora', 'x')}`,
  },
  {
    id: 'base-reguladora-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/cuanto-cobrare/base-reguladora/',
    cifra: { ante: 'Ejemplo', antes: 'Rosa cotizó 630.000 € en sus últimos 300 meses. Entre 350, su base reguladora es de', grande: '1.800 €', despues: 'Con 38 años cotizados, esa es su pensión al mes, en 14 pagas.', fuente: 'Artículo 209 de la Ley General de la Seguridad Social.', corto: 'base-reguladora' },
    texto: `La base reguladora es la cifra de la que sale tu pensión. Es la media de lo que has cotizado en los últimos años, y conviene entender tres detalles.

Se divide entre 350 y no entre 300, aunque se miren 300 meses, porque la pensión se cobra en 14 pagas.

Las bases de los dos últimos años cuentan tal cual. Las anteriores se actualizan con el IPC, así que lo que cotizaste hace 20 años no pierde valor.

Si te pagaban más de la base máxima (5.101,20 euros al mes en 2026), lo que pasa de ahí no cuenta. Y si tu sueldo sube mucho en los dos últimos años, por encima de lo que marca tu convenio, ese exceso tampoco se computa.

Ejemplo: Rosa suma 630.000 euros en sus últimos 300 meses. Entre 350, su base reguladora es de 1.800 euros, y con 38 años cotizados esa es su pensión. ${FB_WEB}`,
  },
  {
    id: 'base-reguladora-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/cuanto-cobrare/como-se-calcula-la-pension/',
    texto: `Para asesorías laborales: el sistema dual de la base reguladora ya se aplica a las jubilaciones de 2026, y cambia algunos consejos habituales.

La Seguridad Social calcula la base de dos formas y reconoce de oficio la más alta hasta 2040. La clásica, con los últimos 300 meses entre 350. La nueva, que en 2026 toma las 302 mejores bases de los últimos 304 meses (divisor 352,33) y amplía cada año el periodo en 4 meses y el descarte en 2, hasta 348 meses con 24 descartes en 2037.

Quien cotizó siempre parecido obtiene casi lo mismo con las dos. La nueva favorece a quien tiene malos meses al final de su carrera (despidos, reducciones de jornada, paro). Un ejemplo de 2027: 24 meses finales a media jornada dan 14,59 euros más al mes con el cálculo nuevo.

Ejemplos completos en el enlace del primer comentario.`,
    comentario: `Cómo se calcula la pensión: ${L('como-se-calcula', 'in')}`,
  },

  /* ---------- Porcentaje por años cotizados ---------- */
  {
    id: 'porcentaje-x', red: 'x', pilar: 'Calcula tu caso', fuente: '/cuanto-cobrare/porcentaje-anos-cotizados/',
    texto: `Con 30 años cotizados cobras el 84,20 % de tu base reguladora si te jubilas en 2027 o después. Con 15 años, el 50 %, y con 37, el 100 %. Cada año de más suma unos 2,3 puntos.

Tabla completa: ${L('anos-cotizados', 'x')}`,
  },
  {
    id: 'ano-mas-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/porcentaje-anos-cotizados/',
    texto: `José se jubila en 2027 con 36 años cotizados y una base reguladora de 2.200 €: cobra 2.152,48 € al mes. Con un año más cotizado llegaría al 100 % y cobraría 2.200 €. Son 47,52 € más al mes de por vida.

${L('anos-cotizados', 'x')}`,
  },
  {
    id: 'porcentaje-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/cuanto-cobrare/porcentaje-anos-cotizados/',
    cifra: { ante: 'La cifra', antes: 'Con 30 años cotizados, si te jubilas en 2027', grande: '84,20 %', despues: 'de tu base reguladora. Con 15 años, el 50 %; con 37, el 100 %.', fuente: 'Disposición transitoria 9.ª de la Ley General de la Seguridad Social.', corto: 'anos-cotizados' },
    texto: `¿Qué porcentaje de pensión te corresponde por tus años cotizados? Esta es la escala para quien se jubila en 2027 o después.

Con 15 años cotizados, el 50 % de la base reguladora. Con 20 años, el 61,40 %. Con 25, el 72,80 %. Con 30, el 84,20 %. Con 35, el 95,60 %. Y con 37 años, el 100 %.

En 2026 la escala era algo más suave: el 100 % llegaba con 36 años y 6 meses. Desde 2027 hace falta medio año más, y con los mismos años el porcentaje es alrededor de un punto menor.

Por encima del 100 % no se gana nada, salvo que retrases la jubilación más allá de tu edad ordinaria: entonces cada año completo suma un 4 %. ${FB_WEB}`,
  },

  /* ---------- Complemento a mínimos ---------- */
  {
    id: 'complemento-minimos-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/complemento-a-minimos/',
    texto: `Si tu pensión no llega a la mínima, la Seguridad Social te paga la diferencia: es el complemento a mínimos. En 2026, la mínima con 65 años o más es de 936,20 € al mes si vives solo, y tus otros ingresos no pueden pasar de 9.442 € al año.

${L('complemento-minimos', 'x')}`,
  },
  {
    id: 'complemento-minimos-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/complemento-a-minimos/',
    cifra: { ante: 'Ejemplo', antes: 'Julián, 70 años, viudo, con una pensión de 750 € y sin otros ingresos', grande: '+186,20 €', despues: 'al mes de complemento a mínimos, hasta los 936,20 € de la pensión mínima.', fuente: 'Artículo 59 de la Ley General de la Seguridad Social y Real Decreto 241/2026.', corto: 'complemento-minimos' },
    texto: `Julián tiene 70 años, es viudo y cobra una pensión de jubilación de 750 euros al mes. No tiene otros ingresos. La pensión mínima para su caso es de 936,20 euros, así que la Seguridad Social le paga 186,20 euros más cada mes: es el complemento a mínimos.

Lo cobras si tu pensión no llega a la mínima, vives en España y tus otros ingresos no pasan de 9.442 euros al año (11.013 entre los dos si tienes cónyuge a cargo).

Dos cosas que conviene saber. Si tus ingresos pasan un poco del límite, no lo pierdes todo: cobras una parte. Y desde mayo de 2026, quien cobra el complemento a mínimos no paga nada por los medicamentos con receta.

Y si un año tus ingresos superan el límite, hay que avisar en un mes y devolver el complemento cobrado ese año. ${FB_WEB}`,
  },
  {
    id: 'complemento-minimos-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/complemento-a-minimos/',
    diapositivas: [
      '¿Tu pensión no llega a la mínima? La Seguridad Social te paga la diferencia.',
      'Se llama complemento a mínimos y se suma a tu pensión en las mismas 14 pagas.',
      'Pensión mínima: 936,20 € al mes en 2026 si tienes 65 años o más y vives solo.',
      'Con cónyuge a cargo: 1.256,60 € al mes.',
      'Requisito: que tus otros ingresos no pasen de 9.442 € al año (11.013 € con cónyuge a cargo).',
      'Tope: el complemento no puede pasar de 628,80 € al mes en las pensiones causadas desde 2013.',
      'Desde mayo de 2026, quien lo cobra no paga nada por los medicamentos con receta.',
      'Envíaselo a quien cobre una pensión baja. Requisitos en Jubilómetro (enlace en la biografía).',
    ],
    texto: `El complemento a mínimos sube tu pensión hasta la mínima si tus ingresos son bajos. Cifras de 2026 y requisitos en la guía de la biografía.

#pensiones #pensionminima #jubilacion #seguridadsocial`,
  },
  {
    id: 'minima-x', red: 'x', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/pension-minima/',
    texto: `Pensión mínima de jubilación en 2026, desde los 65 años: 1.256,60 € al mes con cónyuge a cargo, 936,20 € si vives solo y 888,70 € con cónyuge no a cargo. Siempre en 14 pagas y con un límite de otros ingresos.

${L('minima', 'x')}`,
  },
  {
    id: 'minima-wa', red: 'whatsapp', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/pension-minima/',
    texto: `Para tenerlo a mano: la pensión mínima de jubilación en 2026, a partir de los 65 años, es de 1.256,60 € al mes con cónyuge a cargo, 936,20 € si vives solo y 888,70 € con cónyuge que no está a cargo, en 14 pagas.

Si tu pensión no llega y tus ingresos son bajos, la Seguridad Social te paga la diferencia: ${L('minima', 'wa')}`,
  },

  /* ---------- Pensión máxima ---------- */
  {
    id: 'maxima-fb', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/pension-maxima/',
    texto: `La pensión máxima de 2026 es de 3.359,60 euros brutos al mes en 14 pagas: 47.034,40 euros al año. Es el tope para cualquier pensión pública, y también para la suma de varias, por ejemplo, una jubilación y una viudedad.

Para llegar a ella hace falta haber cotizado de media por unos 3.920 euros al mes en los años que cuentan, lo que equivale a un sueldo bruto de unos 47.000 euros al año, y tener el 100 % por años cotizados.

Si has cotizado por encima de eso, no cobrarás más. Lo que sí se paga aparte es el premio por retrasar la jubilación: el 4 % por año de demora que no cabe en la máxima se cobra como una cantidad añadida, con un límite de 61.214,40 euros al año entre todo. ${FB_WEB}`,
  },

  /* ---------- Bruta y neta, sueldo ---------- */
  {
    id: 'bruta-neta-fb', red: 'facebook', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/pension-bruta-y-neta/',
    texto: `Si en la carta de la Seguridad Social pone una cifra y en el banco te llega otra, es por la retención del IRPF. La pensión que te reconocen es bruta, y lo que llega a la cuenta es la neta.

Los pensionistas no pagan cotizaciones sociales, solo esa retención. Sin hijos a cargo y con una pensión de hasta 16.476 euros brutos al año (unos 1.176 euros al mes en 14 pagas), no te retienen nada.

Por encima, el porcentaje sube poco a poco: con 1.500 euros al mes, en torno al 9 %; con 2.000, cerca del 17 %, y con 3.000, alrededor del 22 %.

La retención se puede cambiar: por ejemplo, pedir un tipo más alto para que no te salga a pagar en la declaración. ${FB_WEB}`,
  },
  {
    id: 'bruta-neta-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'La cifra que te toca', fuente: '/cuanto-cobrare/pension-bruta-y-neta/',
    diapositivas: [
      '¿Por qué llega menos pensión de la que pone la carta? Bruta y neta.',
      'La pensión que te reconocen es bruta. La Seguridad Social te retiene el IRPF y te ingresa la neta.',
      'Los pensionistas no pagan cotizaciones sociales: solo la retención.',
      'Sin retención: hasta 16.476 € brutos al año de pensión, si no tienes hijos a cargo.',
      '1.500 € al mes → en torno al 9 % de retención.',
      '2.000 € al mes → cerca del 17 % de retención.',
      'Puedes pedir una retención más alta para que no te salga a pagar en la renta.',
      'Guárdalo y calcula tu pensión neta en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Pensión bruta, retención del IRPF y pensión neta: lo que llega de verdad al banco. Calculadora en la biografía.

#pensiones #irpf #jubilacion #seguridadsocial`,
  },
  {
    id: 'sueldo-fb', red: 'facebook', pilar: 'Calcula tu caso', fuente: '/cuanto-cobrare/pension-segun-sueldo/',
    cifra: { ante: 'Regla sencilla', antes: 'Con 37 años cotizados siempre por la misma base, la pensión al mes es', grande: '6/7', despues: 'de esa base. Al año cobras lo mismo que tu sueldo bruto anual.', fuente: 'Artículos 209 y 210 de la Ley General de la Seguridad Social.', corto: 'sueldo' },
    texto: `¿Cuánto cobraré de pensión con mi sueldo? Hay una regla sencilla para hacerse una idea.

Si has cotizado 37 años siempre por la misma base, tu pensión bruta al mes es 6/7 de esa base. Como la pensión se cobra en 14 pagas, al año cobras lo mismo que tu sueldo bruto anual.

Con una base de 1.500 euros, unos 1.286 euros de pensión al mes. Con 2.000, unos 1.714. Con 3.000, unos 2.571. A partir de una base de 3.919,53 euros llegas a la pensión máxima, 3.359,60 euros al mes en 2026.

La base de cotización es tu sueldo bruto con las pagas extra repartidas en 12 meses: aparece en la nómina. ${FB_WEB}`,
  },
  {
    id: 'sueldo-ig', red: 'instagram', tipo: 'Carrusel', pilar: 'Calcula tu caso', fuente: '/cuanto-cobrare/pension-segun-sueldo/',
    diapositivas: [
      '¿Cuánto cobraré de pensión con mi sueldo? Una regla para hacerte una idea.',
      'Lo que cuenta es tu base de cotización: el sueldo bruto con las pagas extra repartidas en 12 meses.',
      'Con 37 años cotizados por la misma base, la pensión al mes es 6/7 de esa base.',
      '1.500 € de base → 1.286 € de pensión al mes.',
      '2.000 € de base → 1.714 € de pensión al mes.',
      '3.000 € de base → 2.571 € de pensión al mes.',
      'Pensión máxima: 3.359,60 € al mes en 2026, con una base de 3.919,53 € o más.',
      'Guárdalo y haz tus cuentas en Jubilómetro (enlace en la biografía).',
    ],
    texto: `Con 37 años cotizados por la misma base, tu pensión mensual es 6/7 de esa base. Ejemplos y calculadora, con el enlace de la biografía.

#pensiones #jubilacion #sueldo #seguridadsocial`,
  },

  /* ---------- Lagunas, vida laboral, certificado ---------- */
  {
    id: 'lagunas-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/lagunas-de-cotizacion/',
    texto: `Los meses sin cotizar dentro de tus últimos 25 años no cuentan como cero. Los 48 primeros se rellenan con la base mínima y el resto, con la mitad. Desde 2026, las asalariadas rellenan además los meses 49 a 60 al 100 % y del 61 al 84 al 80 %.

${L('lagunas', 'x')}`,
  },
  {
    id: 'vida-laboral-fb', red: 'facebook', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/informe-vida-laboral/',
    texto: `Un consejo que ahorra disgustos: revisa tu vida laboral años antes de jubilarte, no el mes de antes.

El informe de vida laboral recoge todas tus altas y bajas en la Seguridad Social. Si falta un periodo trabajado (un verano en una fábrica, un contrato de los años 80, una empresa que cerró), pierdes años cotizados y puede bajar tu base reguladora.

Se pide gratis en el portal Import@ss con Cl@ve, certificado, DNI electrónico o un SMS al móvil, y también se puede pedir que te lo manden a casa por correo. Si encuentras un error, se pide la rectificación en la sede de la Seguridad Social, con nóminas, contratos o cualquier papel que lo pruebe.

Cuanto antes lo revises, más fácil es encontrar esos papeles. ${FB_WEB}`,
  },
  {
    id: 'vida-laboral-wa', red: 'whatsapp', pilar: 'Trámites sin líos', fuente: '/cuanto-cobrare/informe-vida-laboral/',
    texto: `Un trámite de cinco minutos que conviene hacer años antes de jubilarse: descargar el informe de vida laboral y comprobar que no falta ningún periodo trabajado. Es gratis, con Cl@ve o con un SMS al móvil.

Cómo pedirlo y cómo corregir errores: ${L('vida-laboral', 'wa')}`,
  },
  {
    id: 'certificado-fb', red: 'facebook', pilar: 'Trámites sin líos', fuente: '/cuanto-cobrare/certificado-pension/',
    texto: `El banco, el ayuntamiento o una residencia te piden el certificado de tu pensión. Se saca gratis y al momento por internet, sin ir a ninguna oficina.

Está en la sede electrónica de la Seguridad Social, en el certificado integral de prestaciones. Puedes entrar con certificado digital, con Cl@ve o con un código por SMS, si la Seguridad Social tiene tu móvil.

Con un solo acceso descargas todos los modelos: el resumido o el desglosado con lo que cobras, uno sin importes, el de retenciones del IRPF para la declaración de la renta, el de revalorización del año y, si no cobras nada, el de no pensionista.

Si te cuesta, puede hacerlo un familiar con tu permiso. ${FB_WEB}`,
  },
  {
    id: 'certificado-wa', red: 'whatsapp', pilar: 'Trámites sin líos', fuente: '/cuanto-cobrare/certificado-pension/',
    texto: `Para guardar: el certificado de tu pensión (con importes, sin importes, de retenciones o de revalorización) se descarga gratis en la sede de la Seguridad Social con Cl@ve, certificado digital o un SMS al móvil.

Paso a paso: ${L('certificado', 'wa')}`,
  },

  /* ---------- Cobro, MEI, subida ---------- */
  {
    id: 'cobro-x', red: 'x', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/calendario-pago-pensiones/',
    texto: `La pensión se cobra a mes vencido: la Seguridad Social la paga como tarde el primer día hábil del mes siguiente, y nunca después del día 4. La mayoría de los bancos la adelantan, y suele llegar entre el 22 y el 26 del mismo mes.

${L('cobro', 'x')}`,
  },
  {
    id: 'cobro-fb', red: 'facebook', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/calendario-pago-pensiones/',
    texto: `«¿Por qué a mi vecina le llega la pensión antes que a mí?» Porque cada banco decide si adelanta el pago y qué día.

La Seguridad Social paga la pensión a mes vencido: la de cada mes, como tarde, el primer día hábil del mes siguiente, y nunca después del día 4. La mayoría de los bancos la adelantan, y el dinero suele llegar entre el 22 y el 26 del mismo mes.

Se cobran 14 pagas: las doce mensuales y dos extra, que llegan con la pensión de junio y con la de noviembre. Las pensiones por accidente de trabajo o enfermedad profesional se cobran en 12 pagas, con las extra repartidas. ${FB_WEB}`,
  },
  {
    id: 'mei-x', red: 'x', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/mei-cuota-solidaridad/',
    texto: `En tu nómina hay una línea que pone MEI. Es una cotización extra para la hucha de las pensiones: en 2026 pagas el 0,15 % de tu base (3 € al mes con una base de 2.000 €) y la empresa, el 0,75 %. No suma nada a tu pensión.

${L('mei', 'x')}`,
  },
  {
    id: 'mei-li', red: 'linkedin', pilar: 'Profesionales', fuente: '/cuanto-cobrare/mei-cuota-solidaridad/',
    texto: `Para equipos de nóminas: el MEI y la cuota de solidaridad suben cada año, y en enero de 2027 vuelven a cambiar los tipos.

MEI (artículo 127 bis de la Ley General de la Seguridad Social): 0,90 % en 2026 (0,75 % empresa y 0,15 % trabajador) y 1,00 % en 2027 (0,83 % y 0,17 %), hasta el 1,20 % desde 2029. No computa para prestaciones y va al Fondo de Reserva. Los autónomos pagan el 0,90 % entero.

Cuota de solidaridad (artículo 19 bis), solo para asalariados, sobre lo que supera la base máxima: en 2026, el 1,15 %, el 1,25 % y el 1,46 % según el tramo; en 2027, el 1,38 %, el 1,50 % y el 1,75 %. Con 8.000 euros brutos al mes, este año son 36,46 euros: 30,37 a cargo de la empresa y 6,09 del trabajador.

Tablas completas hasta 2045 en el primer comentario.`,
    comentario: `MEI y cuota de solidaridad: ${L('mei', 'in')}`,
  },
  {
    id: 'subida-sola-x', red: 'x', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/revalorizacion-pensiones/', hasta: '2027-01-31',
    texto: `La subida de las pensiones de enero se aplica sola: no hay que pedirla. En 2027 será lo que haya subido de media el IPC de diciembre de 2025 a noviembre de 2026, y las mínimas y las no contributivas subirán algo más.

Calcula la tuya: ${L('subida', 'x')}`,
  },
  {
    id: 'subida-fb', red: 'facebook', pilar: 'Calendario y avisos', fuente: '/calculadoras/subida-pensiones/', hasta: '2027-01-31',
    texto: `¿Cuánto cobrarás en 2027 con la subida de las pensiones? Lo puedes calcular en un minuto.

Las pensiones contributivas suben en enero lo que haya subido de media el IPC en los doce meses de diciembre de 2025 a noviembre de 2026. No hay que pedirlo: la Seguridad Social lo aplica sola desde la pensión de enero. Las mínimas y las no contributivas suben además lo necesario para acercarse al umbral de la pobreza, como marca la ley para 2027.

En la calculadora de la subida pones tu pensión de 2026 y te dice cuánto cobrarás al mes y al año, y cuánto más que ahora. ${FB_WEB}`,
  },
  {
    id: 'subida-wa', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/calculadoras/subida-pensiones/', hasta: '2027-01-31',
    texto: `¿Cuánto cobrarás en 2027? Pon tu pensión de 2026 en la calculadora de la subida y te dice el importe nuevo al mes y al año. La subida no hay que pedirla: se aplica sola desde la pensión de enero.

${L('subida', 'wa')}`,
  },
  {
    id: 'paga-junio-x', red: 'x', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/pagas-extra/', desde: '2027-06-01', hasta: '2027-06-25',
    texto: `La paga extra de verano llega junto con la pensión de junio. Si tu banco adelanta el pago, suele llegar entre el 22 y el 26 de junio. Es una mensualidad entera si cobraste la pensión todo el semestre; si no, la parte proporcional.

${L('paga-extra', 'x')}`,
  },
  {
    id: 'paga-junio-wa', red: 'whatsapp', pilar: 'Calendario y avisos', fuente: '/cuanto-cobrare/pagas-extra/', desde: '2027-06-01', hasta: '2027-06-25',
    texto: `Recordatorio: la paga extra de verano llega con la pensión de junio, normalmente entre el 22 y el 26 si tu banco adelanta el pago. Las pensiones por accidente de trabajo o enfermedad profesional no tienen paga extra aparte: van repartidas en 12 pagas.

${L('paga-extra', 'wa')}`,
  },
  {
    id: 'brecha-wa', red: 'whatsapp', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/complemento-brecha-genero/',
    texto: `Para las madres pensionistas: el complemento de brecha de género suma 36,90 € al mes por cada hijo en 2026, hasta 4 hijos (147,60 €), en 14 pagas. Se suma a la jubilación, la incapacidad permanente o la viudedad.

Quién lo cobra y cómo se pide: ${L('brecha', 'wa')}`,
  },
];
