// Escribe paginas/calculadoras/<slug>.md: el texto de apoyo de cada calculadora (ejemplos resueltos,
// errores frecuentes, preguntas y enlace a la guía) y el de la portada /calculadoras/. Las cifras de los
// ejemplos salen del mismo motor que usa la web (tema/jubilometro/assets/js/calculadoras.js), así que
// cuando cambian las cuantías del año basta con actualizar CFG y volver a ejecutarlo.
// Uso (desde la raíz del proyecto):
//   node herramientas/calculadoras/ejemplos.mjs
//   node herramientas/publicar/subir-portadas.mjs --carpeta=calculadoras [--prueba] [--solo=pension-viudedad]
import { writeFileSync, mkdirSync, copyFileSync, mkdtempSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const require = createRequire(import.meta.url);
const copia = join(mkdtempSync(join(tmpdir(), 'jm-')), 'calc.cjs');
copyFileSync(new URL('../../tema/jubilometro/assets/js/calculadoras.js', import.meta.url), copia);
const J = require(copia);
const C = J.CFG, A = C.anio;
// Los textos describen reglas de 2026 (porcentaje por años cotizados, edad, coeficientes). Con otro año
// hay que revisarlos antes de volver a publicar.
if (A !== 2026) throw new Error(`CFG es de ${A}: revisa los textos de este archivo antes de generarlos`);
const CARPETA = new URL('../../paginas/calculadoras/', import.meta.url).pathname;

const n = (x, d = 0) => J.num(x, d);
// Importes en euros: sin «,00» cuando la cifra es redonda
const eu = (x, d = 2) => (d === 2 && Math.abs(x - Math.round(x)) < 0.005 ? J.num(Math.round(x), 0) : J.num(x, d)) + ' euros';
const pc = (x, d = 2) => J.num(x, d) + ' %';
const anios = (m) => { const a = Math.floor(m / 12), r = m % 12; return `${a} años${r ? ` y ${r} ${r === 1 ? 'mes' : 'meses'}` : ''}`; };
const edadTxt = (x) => { const a = Math.floor(x + 1e-9), m = Math.round((x - a) * 12); return `${a} años${m ? ` y ${m} ${m === 1 ? 'mes' : 'meses'}` : ''}`; };
const MIN65 = C.minimos.jub65.sin, MAX = C.pensionMax;
const paginas = {};

// ------------------------------------------------------------------ Pensión de jubilación
{
  const car = J.pension({ anio: A, base: 2000, cotAnios: 37 });
  const ant = J.pension({ anio: A, base: 1600, cotAnios: 25 });
  const [per, mejores, div] = car.dual;
  const x = ant.cot - 180, p1 = Math.min(x, 49) * 0.21, p2 = Math.max(0, Math.min(x - 49, 209)) * 0.19;
  if (Math.abs(50 + p1 + p2 - ant.porcentaje) > 0.001 || car.porcentaje !== 100) throw new Error('El porcentaje por años cotizados no cuadra con el texto');
  paginas['pension-jubilacion'] = `## Ejemplos resueltos con las cifras de ${A}

Los ejemplos usan bases de cotización ya actualizadas y una carrera sin lagunas, igual que la calculadora. Puedes repetirlos arriba con los mismos datos.

### Carmen: 37 años cotizados y bases de 2.000 euros

1. **Método tradicional**: 300 meses × 2.000 euros ÷ 350 = **${eu(car.brT)}**.
2. **Método nuevo**: los ${mejores} mejores meses de los últimos ${per} × 2.000 euros ÷ ${n(div, 2)} = **${eu(car.brN)}**.
3. La Seguridad Social aplica el más favorable: base reguladora de ${eu(car.br)}.
4. Con 37 años cotizados le corresponde el **100 %**.

Pensión: **${eu(car.bruta)} al mes** en 14 pagas, ${eu(car.anual, 0)} al año.

### Antonio: 25 años cotizados y bases de 1.600 euros

1. Base reguladora: **${eu(ant.br)}**, con el método nuevo (el tradicional da ${eu(ant.brT)}).
2. Porcentaje: los primeros 15 años dan el 50 %. Los ${x} meses siguientes suman ${Math.min(x, 49)} × 0,21 + ${Math.max(0, x - 49)} × 0,19 = ${n(p1 + p2, 2)} puntos: **${pc(ant.porcentaje)}**.
3. Pensión: ${eu(ant.br)} × ${pc(ant.porcentaje)} = **${eu(ant.bruta)} al mes**.

Queda por encima de la pensión mínima de 65 años sin cónyuge (${eu(MIN65)}), así que no le corresponde complemento a mínimos.

## Errores frecuentes

- **Usar el sueldo neto.** La base de cotización es, más o menos, tu sueldo bruto mensual con la parte proporcional de las pagas extra, con un máximo de ${eu(C.baseMaxima)} al mes en ${A}. La ves en tus nóminas o en tu informe de bases de cotización de Tu Seguridad Social.
- **Contar como cotizados los meses sin cotizar.** Los meses sin trabajar ni cobrar el paro son lagunas: no suman años y en la base reguladora pesan menos que un mes trabajado. Lo explicamos en [las lagunas de cotización](/cuanto-cobrare/lagunas-de-cotizacion/).
- **Olvidar la pensión máxima.** Aunque tu base reguladora sea más alta, en ${A} la pensión no pasa de ${eu(MAX)} al mes.
- **Leer la cifra como neta.** Es bruta. Para saber lo que te llega al banco, pásala por la [calculadora de pensión neta](/calculadoras/pension-neta-irpf/).
- **Pensar que el método nuevo siempre gana.** Si tus mejores sueldos son los últimos, puede salir mejor el tradicional. No tienes que elegir: la Seguridad Social aplica el que te dé más.

## Preguntas frecuentes

### ¿Por qué no coincide con el simulador de la Seguridad Social?

Porque el simulador oficial usa tus bases reales mes a mes, actualizadas con el IPC, y aquí partimos de una base media. Para la cifra exacta, entra con certificado digital o Cl@ve en Tu Seguridad Social y usa su simulador con tu vida laboral.

### ¿Cuántos años hay que cotizar para cobrar el 100 %?

En 2026, 36 años y 6 meses. Desde 2027, 37 años.

### ¿Cuál es el mínimo para cobrar una pensión de jubilación?

15 años cotizados, 2 de ellos dentro de los 15 años anteriores a la jubilación. Con 15 años cobras el 50 % de la base reguladora.

## Guía completa

Paso a paso y con más casos, en [cómo se calcula la pensión de jubilación](/cuanto-cobrare/como-se-calcula-la-pension/). Cada pieza por separado: [el porcentaje por años cotizados](/cuanto-cobrare/porcentaje-anos-cotizados/) y [cuánto se cobra según el sueldo](/cuanto-cobrare/pension-segun-sueldo/).
`;
}

// ------------------------------------------------------------------ Jubilación anticipada
{
  const marta = J.anticipada({ tipo: 'voluntaria', meses: 24, cotAnios: 36, pension: 1800 });
  const jorge = J.anticipada({ tipo: 'voluntaria', meses: 12, cotAnios: 40, pension: 1800 });
  const pilar = J.anticipada({ tipo: 'involuntaria', meses: 48, cotAnios: 34, pension: 1500 });
  if (marta.tramo !== 'a' || jorge.tramo !== 'b' || pilar.tramo !== 'a' || !marta.superaMin) throw new Error('Los tramos de los ejemplos han cambiado');
  const e26 = J.EDAD[A];
  const dos = ['a', 'b', 'c', 'd'].map((t) => J.VOL[t][23]);
  paginas['jubilacion-anticipada'] = `## Ejemplos resueltos con las cifras de ${A}

### Marta: voluntaria, 2 años antes y 36 años cotizados

Su pensión sin recorte sería de 1.800 euros.

1. Con ${J.TRAMO_TXT.a} cotizados, adelantar 24 meses tiene un coeficiente del **${pc(marta.coef, 0)}**.
2. Pensión: 1.800 × (100 % − ${pc(marta.coef, 0)}) = **${eu(marta.final)} al mes**.
3. Pierde ${eu(marta.perdidaMes)} al mes, ${eu(marta.perdidaAnio, 0)} al año, **para siempre**.

Cumple los dos requisitos de la voluntaria: 35 años cotizados y una pensión final por encima de la mínima que le correspondería a los 65 (${eu(MIN65)} sin cónyuge).

### Jorge: voluntaria, 1 año antes y 40 años cotizados

1. Con ${J.TRAMO_TXT.b} cotizados, 12 meses de adelanto cuestan un **${pc(jorge.coef)}**.
2. Pensión: 1.800 × (100 % − ${pc(jorge.coef)}) = **${eu(jorge.final)} al mes**, ${eu(jorge.perdidaMes)} menos.

Adelantar un año con una carrera larga cuesta mucho menos que adelantar dos con una más corta.

### Pilar: involuntaria tras un despido, 4 años antes y 34 años cotizados

1. En la involuntaria, con ${J.TRAMO_TXT.a} cotizados, cada mes de adelanto resta un ${pc(J.INVOL.a, 3)}: 48 meses × ${pc(J.INVOL.a, 3)} = **${pc(pilar.coef, 0)}**.
2. Pensión: 1.500 × (100 % − ${pc(pilar.coef, 0)}) = **${eu(pilar.final)} al mes**.

Para la involuntaria necesita 33 años cotizados, haber perdido el empleo por una causa ajena a ella (un ERE, un despido objetivo, el cierre de la empresa) y llevar al menos 6 meses inscrita como demandante de empleo.

## Errores frecuentes

- **Aplicar el recorte a la base reguladora.** Se aplica a la pensión ya calculada, después del porcentaje por años cotizados.
- **Pensar que el recorte se acaba al cumplir la edad ordinaria.** Es para siempre. La pensión sigue subiendo cada enero con la revalorización, pero desde la cifra recortada.
- **Contar los meses desde los 65.** Se cuentan desde tu edad ordinaria, que en ${A} es de 65 años si has cotizado ${anios(e26[0])}, o de ${anios(e26[1])} si no. Comprueba la tuya en la [calculadora de edad de jubilación](/calculadoras/edad-jubilacion/).
- **Olvidar el requisito de la mínima.** En la voluntaria, si la pensión final queda por debajo de la mínima que te correspondería a los 65 años, no puedes jubilarte antes.
- **Pensiones por encima de la máxima.** Si tu pensión sin recorte superaría la máxima (${eu(MAX)}), el recorte se aplica sobre la máxima con un calendario gradual. En ese caso, pide el cálculo al INSS.

## Preguntas frecuentes

### ¿Cuánto se pierde por jubilarse 2 años antes?

Entre el ${pc(dos[3], 0)} y el ${pc(dos[0], 0)} de la pensión, según los años cotizados: ${pc(dos[0], 0)} con ${J.TRAMO_TXT.a}, ${pc(dos[1], 0)} ${J.TRAMO_TXT.b}, ${pc(dos[2], 0)} ${J.TRAMO_TXT.c} y ${pc(dos[3], 0)} con ${J.TRAMO_TXT.d}.

### ¿Se puede adelantar más de 2 años?

La voluntaria permite como máximo 2 años, y la involuntaria, 4. Hay otras vías para algunas profesiones y para personas con discapacidad: lo explicamos en [la anticipada por profesión](/jubilacion/anticipada-por-profesion/) y [la anticipada por discapacidad](/jubilacion/anticipada-discapacidad/).

### ¿También se reducen las pagas extra?

Sí. El recorte se aplica a la pensión, y las dos pagas extra son de la misma cuantía que cada mensualidad.

## Guía completa

Requisitos, tablas completas de coeficientes y más ejemplos en [la jubilación anticipada voluntaria](/jubilacion/anticipada-voluntaria/) y [la anticipada involuntaria](/jubilacion/anticipada-involuntaria/). Si dudas entre adelantar o esperar, lee [¿compensa jubilarse antes?](/jubilacion/compensa-jubilarse-antes/) y prueba el [comparador de ingresos](/calculadoras/comparador-ingresos-jubilacion/).
`;
}

// ------------------------------------------------------------------ Pensión neta (IRPF)
{
  const a = J.neto({ bruta: 1200, pagas: 14, edad: '65', ccaa: 'madrid' });
  const and = J.neto({ bruta: 1800, pagas: 14, edad: '65', ccaa: 'andalucia' });
  const cat = J.neto({ bruta: 1800, pagas: 14, edad: '65', ccaa: 'cataluna' });
  const val = J.neto({ bruta: 2800, pagas: 14, edad: '75', ccaa: 'valencia' });
  const mil = J.neto({ bruta: 1000, pagas: 14, edad: '65', ccaa: 'madrid' });
  const r1500 = Object.keys(J.CCAA).map((k) => J.neto({ bruta: 1500, pagas: 14, edad: '65', ccaa: k })).sort((x, y) => x.total - y.total);
  if (mil.total !== 0 || and.red !== 0) throw new Error('Los ejemplos del IRPF han cambiado');
  paginas['pension-neta-irpf'] = `## Ejemplos resueltos

Calculamos el impuesto de un año completo con las escalas del IRPF del último ejercicio publicado, como la calculadora: solo la pensión, sin otros ingresos ni mínimos por hijos o ascendientes.

### Pensión de 1.200 euros, 67 años, Comunidad de Madrid

1. Ingresos: 1.200 × 14 = ${eu(a.anual, 0)} al año.
2. Menos 2.000 euros de gastos deducibles: ${eu(a.rn, 0)}.
3. Menos la reducción por rendimientos del trabajo, ${eu(a.red, 0)}: base de ${eu(a.base, 0)}.
4. Cuota: el impuesto de esa base menos el que corresponde a tu mínimo personal (${eu(a.minimo, 0)} desde los 65 años). Estatal, ${eu(a.estatal)}; autonómica, ${eu(a.autonomica)}.

IRPF: **${eu(a.total)} al año** (el ${pc(a.tipo)}). Te quedan **${eu(a.netoMes)} al mes** de media.

### Pensión de 1.800 euros, 66 años: Andalucía frente a Cataluña

Con ${eu(and.anual, 0)} al año ya no hay reducción por rendimientos del trabajo: la base es de ${eu(and.base, 0)}.

- **Andalucía**: IRPF de ${eu(and.total)} al año (${pc(and.tipo)}), ${eu(and.netoMes)} netos al mes.
- **Cataluña**: ${eu(cat.total)} (${pc(cat.tipo)}), ${eu(cat.netoMes)} netos al mes.

Con pensiones medias, la comunidad cambia poco el resultado: aquí, ${eu(Math.abs(cat.total - and.total), 0)} al año.

### Pensión de 2.800 euros, 76 años, Comunitat Valenciana

Desde los 75 años el mínimo personal sube a ${eu(val.minimo, 0)}. IRPF: **${eu(val.total)} al año** (${pc(val.tipo)}), ${eu(val.netoMes)} netos al mes.

Con 1.000 euros al mes (${eu(mil.anual, 0)} al año) no se paga IRPF: entre la reducción y el mínimo personal, la cuota queda en cero.

## Errores frecuentes

- **Confundir la retención con el impuesto.** Lo que te retienen cada mes es un adelanto. El impuesto real sale en la declaración de la renta, y puede tocar pagar o devolver.
- **Creer que siempre hay que declarar.** Con un solo pagador no estás obligado si cobras menos de 22.000 euros al año; con dos pagadores, si el segundo pasa de 1.500 euros, el límite baja a 15.876 euros. Lo explicamos en [la declaración de la renta de los jubilados](/dinero/declaracion-renta-jubilados/).
- **Pensar que todas las pensiones tributan.** Las de incapacidad permanente absoluta y gran incapacidad están exentas.
- **Olvidar el mínimo por edad.** Desde los 65 años el mínimo personal sube de 5.550 a 6.700 euros, y desde los 75, a 8.100. Con la misma pensión, pagas algo menos al cumplir años.

## Preguntas frecuentes

### ¿Cuánto IRPF se paga por una pensión de 1.500 euros?

Con 65 años o más y sin otros ingresos, entre ${eu(r1500[0].total, 0)} al año en ${r1500[0].ccaa} y ${eu(r1500.at(-1).total, 0)} en ${r1500.at(-1).ccaa}: alrededor del ${pc(r1500[0].tipo, 0)} de la pensión.

### ¿Por qué no están Navarra ni el País Vasco?

Porque tienen su propio IRPF foral, con escalas y reducciones distintas.

### ¿Las pagas extra tributan?

Sí, como el resto de la pensión. La retención se reparte entre las 14 pagas.

## Guía completa

Cómo tributa cada tipo de pensión, en [el IRPF de las pensiones](/dinero/irpf-pensiones/). La diferencia entre lo que figura en tu resolución y lo que cobras, en [pensión bruta y neta](/cuanto-cobrare/pension-bruta-y-neta/).
`;
}

// ------------------------------------------------------------------ Demorada, activa y flexible
{
  const t = J.demorada({ pension: 1800, anios: 2, meses: 6, jornada: 50 });
  const r = J.demorada({ pension: 1600, anios: 3, meses: 0, jornada: 50 });
  const l = J.demorada({ pension: 1500, anios: 0, meses: 0, jornada: 60 });
  const l40 = J.demorada({ pension: 1500, anios: 0, meses: 0, jornada: 40 });
  const uno = J.demorada({ pension: 1800, anios: 1, meses: 6 });
  if (t.extra !== 10 || r.activaPct !== 65 || l.flexIncentivo !== 25 || uno.extra !== 4) throw new Error('Las reglas de la demorada han cambiado');
  paginas['jubilacion-demorada-flexible'] = `## Ejemplos resueltos con las cifras de ${A}

### Teresa retrasa la jubilación 2 años y 6 meses

Su pensión a la edad ordinaria sería de 1.800 euros.

1. Dos años completos: 4 % + 4 % = 8 %.
2. Los 6 meses que siguen al segundo año suman otro 2 %: **${pc(t.extra, 0)}** en total.
3. Pensión: 1.800 × 1,10 = **${eu(t.nueva)} al mes**, ${eu(t.complementoAnual, 0)} más al año, de por vida.

Mientras sigue trabajando cobra su sueldo, pero no la pensión: deja de ingresar ${eu(t.dejas, 0)} de pensión. Con el incremento tardaría ${n(t.recuperaAnios)} años en recuperarlos, así que la demora compensa sobre todo a quien quiere seguir trabajando. En lugar del porcentaje, puede pedir un pago único por cada año completo de demora o una fórmula mixta.

### Ramón vuelve a trabajar con la jubilación activa

Pidió su pensión de 1.600 euros 3 años después de su edad ordinaria. Con la activa cobra el **${pc(r.activaPct, 0)}** mientras trabaja: **${eu(r.activaImporte)} al mes**, además de su sueldo. El porcentaje sube 5 puntos por cada 12 meses seguidos en jubilación activa.

### Lucía, ya jubilada, vuelve a trabajar con la flexible

Su pensión es de 1.500 euros y trabaja el 60 % de una jornada completa.

1. La pensión se reduce en proporción a la jornada: cobra el 40 %, ${eu(l.flexImporte)}.
2. Empezó a trabajar más de 6 meses después de jubilarse y su jornada está entre el 55 % y el 80 %: suma un ${pc(l.flexIncentivo, 0)} de su pensión, ${eu(l.flexConIncentivo - l.flexImporte)}.

Pensión: **${eu(l.flexConIncentivo)} al mes**, además de su salario. Con una jornada del 40 %, cobraría el 60 % de la pensión (${eu(l40.flexImporte)}) más un ${pc(l40.flexIncentivo, 0)} (${eu(l40.flexConIncentivo - l40.flexImporte)}): ${eu(l40.flexConIncentivo)}.

## Errores frecuentes

- **Contar el medio año antes de tiempo.** Los 6 meses extra solo suman un 2 % a partir del segundo año completo: con 1 año y 6 meses de demora el incremento es del ${pc(uno.extra, 0)}.
- **Pensar que la activa exige el 100 % de la pensión.** Desde abril de 2025 ya no: basta con haber retrasado la jubilación al menos un año.
- **Confundir la flexible con la parcial.** La flexible es para quien ya está jubilado y vuelve a trabajar. La [jubilación parcial](/jubilacion/parcial/) es para quien aún no se ha jubilado y reduce su jornada.
- **Superar la pensión máxima con la demora.** Si con el incremento pasas de ${eu(MAX)}, el exceso se cobra aparte, como una cantidad anual.

## Preguntas frecuentes

### ¿Cuánto sube la pensión por cada año de demora?

Un 4 % por cada año completo después de tu edad ordinaria. Desde el segundo año, cada 6 meses más suman un 2 %.

### ¿Puedo cobrar la pensión entera y trabajar a la vez?

Con la jubilación activa, si retrasaste la jubilación 5 años o más: cobras el 100 % de la pensión además de tu sueldo.

### ¿Pueden acogerse los autónomos a la flexible?

Sí, desde el 28 de agosto de 2026: cobran el 25 % de su pensión mientras dure la actividad, si no fueron autónomos en los 3 años anteriores a jubilarse.

## Guía completa

Cada modalidad tiene su guía con requisitos y ejemplos: [jubilación demorada](/jubilacion/demorada/), [jubilación activa](/jubilacion/activa/) y [jubilación flexible](/jubilacion/flexible/). Si dudas entre ellas, mira [flexible, activa o parcial: cuál elegir](/jubilacion/flexible-activa-o-parcial/).
`;
}

// ------------------------------------------------------------------ Viudedad
{
  const V = C.minimos.viudedad;
  const marisa = J.viudedad({ br: 2000, edad: 'menor', ingresos: 24000, cargas: false });
  const concha = J.viudedad({ br: 1400, edad: '65', ingresos: 0, cargas: false });
  const laura = J.viudedad({ br: 1500, edad: 'menor', ingresos: 0, cargas: true });
  if (marisa.porc !== 52 || concha.porc !== 60 || laura.porc !== 70 || !concha.complemento || !laura.complemento) throw new Error('Los ejemplos de viudedad han cambiado');
  const porMiembro = laura.importe * 14 / 3, limCargas = 1221 * 12 * 0.75;
  paginas['pension-viudedad'] = `## Ejemplos resueltos con las cifras de ${A}

### Marisa, 58 años, trabaja y gana 24.000 euros al año

La base reguladora de su marido es de 2.000 euros. Le corresponde el porcentaje general: 2.000 × 52 % = **${eu(marisa.importe)} al mes** en 14 pagas. Cobra la pensión entera aunque trabaje; por sus ingresos, no tendría complemento a mínimos.

### Concha, 72 años, sin otra pensión ni otros ingresos

La base reguladora de su marido es de 1.400 euros.

1. Cumple los requisitos del 60 % y lo pide: 1.400 × 60 % = ${eu(concha.importe)} (con el 52 % serían ${eu(1400 * 0.52)}).
2. La mínima de viudedad con 65 años o más es de ${eu(V.mayor65)}. Como no tiene otros ingresos, cobra ${eu(concha.complemento)} de complemento a mínimos.

Total: **${eu(concha.total)} al mes**.

### Laura, 45 años, con dos hijos de 8 y 12 años y sin otros ingresos

La base reguladora de su marido es de 1.500 euros.

1. Con cargas familiares puede pedir el 70 %: 1.500 × 70 % = ${eu(laura.importe)} al mes, ${eu(laura.importe * 14)} al año.
2. Límite de ingresos para el 70 % con menos de 60 años: ${eu(laura.limite70)}. Cumple.
3. Ingresos por miembro de la familia: ${eu(laura.importe * 14)} ÷ 3 = ${eu(porMiembro)}, por debajo de ${eu(limCargas, 0)}. Cumple.
4. La mínima con cargas familiares es de ${eu(V.cargas)}: le corresponden ${eu(laura.complemento)} de complemento a mínimos.

Total: **${eu(laura.total)} al mes**.

## Errores frecuentes

- **Pensar que la viudedad se pierde al trabajar.** Es compatible con cualquier sueldo. Lo único que puedes perder por tus ingresos es el 60 %, el 70 % o el complemento a mínimos.
- **Esperar que el 60 % llegue solo.** No se aplica de oficio: hay que pedirlo al cumplir 65 años si cumples los requisitos.
- **Usar el sueldo neto de la persona fallecida.** La base reguladora sale de sus bases de cotización (24 meses seguidos de los últimos 15 años, divididos entre 28) o de la base de su pensión si ya estaba jubilada.
- **Olvidar el tope del complemento.** En las pensiones causadas desde 2013, el complemento a mínimos no puede pasar de ${eu(C.subida.pnc)} al mes.

## Preguntas frecuentes

### ¿Cuánto se cobra de viudedad con una base reguladora de 1.000 euros?

520 euros con el 52 %, 600 con el 60 % y 700 con el 70 %. Si quedas por debajo de la mínima de tu situación y tus otros ingresos no pasan de ${eu(C.limiteIngresosMinimos, 0)} al año, se completa hasta ella.

### ¿La viudedad se cobra en 14 pagas?

Sí, como el resto de las pensiones contributivas: 12 mensualidades y dos pagas extra, en junio y en noviembre.

## Guía completa

Base reguladora, porcentajes y mínimas, en [la cuantía de la pensión de viudedad](/viudedad/cuantia/). Antes de calcular, comprueba [los requisitos](/viudedad/requisitos/), y si ya cobras tu jubilación, lee [viudedad y jubilación a la vez](/viudedad/viudedad-y-jubilacion/).
`;
}

// ------------------------------------------------------------------ Incapacidad permanente
{
  const par = J.incapacidad({ br: 1500, grado: 'parcial' });
  const tot = J.incapacidad({ br: 1500, grado: 'total' });
  const cua = J.incapacidad({ br: 1500, grado: 'total', mayor55: true });
  const abs = J.incapacidad({ br: 1500, grado: 'absoluta' });
  const gi = J.incapacidad({ br: 1500, grado: 'gran', ultima: 1800 });
  if (tot.porc !== 55 || cua.porc !== 75 || gi.complemento < gi.mensual * 0.45) throw new Error('Los ejemplos de incapacidad han cambiado');
  paginas['incapacidad-permanente'] = `## Ejemplos resueltos con las cifras de ${A}

Los cinco casos parten de la misma base reguladora, 1.500 euros, para ver cuánto cambia la cuantía según el grado.

| Grado | Cálculo | Cuantía |
|---|---|---|
| Parcial | 24 × 1.500 | ${eu(par.unica, 0)} de una vez |
| Total | 55 % de 1.500 | ${eu(tot.mensual)} al mes |
| Total cualificada (55 años o más) | 75 % de 1.500 | ${eu(cua.mensual)} al mes |
| Absoluta | 100 % de 1.500 | ${eu(abs.mensual)} al mes |
| Gran incapacidad (última base de 1.800 euros) | 1.500 + 45 % de ${eu(C.baseMinima)} + 30 % de 1.800 | ${eu(gi.total)} al mes |

### Gran incapacidad, paso a paso

1. Pensión: el 100 % de la base reguladora, ${eu(gi.mensual)}.
2. Complemento para la persona que te ayuda: 45 % de la base mínima de cotización (${eu(C.baseMinima * 0.45)}) más el 30 % de tu última base de cotización (${eu(1800 * 0.3)}): ${eu(gi.complemento)}.
3. Total: **${eu(gi.total)} al mes** en 14 pagas, sin IRPF.

El complemento nunca puede ser menor que el 45 % de la pensión (aquí, ${eu(gi.mensual * 0.45)}).

## Errores frecuentes

- **Confundir la base reguladora con el sueldo.** Depende de la causa: si la incapacidad viene de una enfermedad común, se calcula con tus bases de cotización de los últimos años; si viene de un accidente de trabajo, con tu salario real.
- **Pensar que la total impide trabajar.** Con la incapacidad total puedes trabajar en otra profesión distinta de la habitual y seguir cobrando la pensión.
- **Creer que la cualificada llega sola a los 55.** Hay que pedirla, exige que te cueste encontrar otro empleo y se suspende mientras trabajes.
- **Olvidar el IRPF.** La absoluta y la gran incapacidad no tributan; la total, sí.

## Preguntas frecuentes

### ¿Cuánto se cobra con una incapacidad permanente total?

El 55 % de la base reguladora, o el 75 % desde los 55 años si tienes difícil encontrar otro empleo. Con una base de 1.500 euros, ${eu(tot.mensual)} o ${eu(cua.mensual)} al mes.

### ¿Qué pasa con la incapacidad al llegar a la edad de jubilación?

La pensión pasa a llamarse de jubilación, con la misma cuantía. Lo explicamos en [incapacidad y jubilación](/incapacidad/incapacidad-y-jubilacion/).

## Guía completa

Qué grado te puede corresponder, en [los grados de incapacidad permanente](/incapacidad/grados-incapacidad/). Cada uno en detalle: [total](/incapacidad/incapacidad-total/), [absoluta](/incapacidad/incapacidad-absoluta/) y [gran incapacidad](/incapacidad/gran-incapacidad/). Para empezar el trámite, [cómo pedir la incapacidad](/incapacidad/solicitar/).
`;
}

// ------------------------------------------------------------------ ¿Cuánto necesito ahorrar?
{
  const s = J.ahorro({ edadActual: 45, edadJub: 67, edadFin: 90, gasto: 2000, pension: 1500, ahorro: 20000, rent: 4, infl: 2 });
  const nu = J.ahorro({ edadActual: 55, edadJub: 67, edadFin: 90, gasto: 2000, pension: 1500, ahorro: 20000, rent: 4, infl: 2 });
  if (!(nu.mensual > s.mensual * 2)) throw new Error('El ejemplo de Nuria ya no muestra el efecto de empezar tarde');
  const rm = Math.pow(1.04 / 1.02, 1 / 12) - 1, cien = 100 * (1 - Math.pow(1 + rm, -12 * 23)) / rm;
  paginas['cuanto-ahorrar-jubilacion'] = `## Ejemplos resueltos

Los dos usan los datos por defecto de la calculadora: un 4 % de rentabilidad y un 2 % de inflación, es decir, un 2 % al año en euros de hoy.

### Sergio, 45 años, quiere jubilarse a los 67 y planifica hasta los 90

1. Quiere gastar 2.000 euros al mes. Su pensión estimada es de 1.500 euros en 14 pagas: ${eu(s.penMes)} al mes repartidos en 12.
2. Le faltan ${eu(s.hueco)} al mes durante ${s.R} años. Para cubrirlos necesita, al jubilarse, **${eu(s.capital, 0)}** de hoy (${eu(s.capitalNominal, 0)} de entonces).
3. Ya tiene 20.000 euros ahorrados, que a los 67 valdrán ${eu(s.fv, 0)} de hoy.
4. Le faltan ${eu(s.falta, 0)}: **${eu(s.mensual)} al mes** durante ${s.n} años.

### Nuria, 55 años, con los mismos números que Sergio

Quiere el mismo gasto, tendrá la misma pensión y también tiene 20.000 euros ahorrados, que a los 67 valdrán ${eu(nu.fv, 0)} de hoy. Le faltan ${eu(nu.falta, 0)}, pero solo le quedan ${nu.n} años para ahorrarlos: **${eu(nu.mensual)} al mes**, ${n(nu.mensual / s.mensual, 1)} veces lo que necesita Sergio. Empezar antes reduce mucho el esfuerzo.

## Errores frecuentes

- **Comparar la pensión en 14 pagas con un gasto mensual.** 1.500 euros en 14 pagas son ${eu(s.penMes)} al mes repartidos en 12. La calculadora ya hace esa cuenta.
- **Olvidar la inflación.** Una rentabilidad del 4 % con una inflación del 2 % es, en realidad, un 2 % en euros de hoy.
- **Suponer una rentabilidad alta sin riesgo.** Las rentabilidades altas van con más riesgo. Prueba también con un 2 % o un 3 % para ver cuánto cambia.
- **Olvidar los impuestos al rescatar.** Lo que saques de un plan de pensiones tributa en el IRPF como rendimiento del trabajo. Lo explicamos en [el rescate del plan de pensiones](/dinero/rescate-plan-pensiones/).

## Preguntas frecuentes

### ¿Cuánto dinero necesito para jubilarme?

Depende del hueco entre tus gastos y tu pensión. Con un 2 % de rentabilidad en euros de hoy, cada 100 euros al mes de hueco durante 23 años piden unos ${eu(Math.round(cien / 100) * 100, 0)} al jubilarte.

### ¿La calculadora tiene en cuenta la subida de las pensiones?

Todo va en euros de hoy: suponemos que la pensión y tus gastos suben con la inflación. Si tu pensión subiera menos, el hueco crecería con los años.

## Guía completa

Cómo calcular tu hueco, dónde ahorrar y cuánto, en [cuánto ahorrar para la jubilación](/dinero/ahorro-jubilacion/). Otras formas de convertir ahorro en ingresos: [la renta vitalicia](/dinero/renta-vitalicia/) y [la hipoteca inversa](/dinero/hipoteca-inversa/).
`;
}

// ------------------------------------------------------------------ Comparador de ingresos
{
  const c1 = J.comparador({ pension: 1800, edadOrd: 67, cotAnios: 38, meses: 24, demora: 2, fin: 100, reval: 2 });
  const c2 = J.comparador({ pension: 1800, edadOrd: 65, cotAnios: 42, meses: 12, demora: 2, fin: 100, reval: 2 });
  if (!c1.cruceOA || !c1.cruceDO || !c2.cruceOA) throw new Error('Los cruces del comparador han cambiado');
  const [ant1, ord1, dem1] = c1.esc, [ant2] = c2.esc;
  paginas['comparador-ingresos-jubilacion'] = `## Ejemplos resueltos

Los dos suponen una subida de las pensiones del 2 % al año y comparan el dinero que cobrarías en total, sumado mes a mes.

### Con 38 años cotizados: adelantar 2 años o retrasar 2

La pensión a la edad ordinaria (67 años) sería de 1.800 euros.

- **Anticipada a los 65**: coeficiente del ${pc(c1.coef, 0)} por tener ${J.TRAMO_TXT[c1.tramo]} cotizados: ${eu(ant1.mensual)} al mes.
- **Ordinaria a los 67**: ${eu(ord1.mensual)} al mes.
- **Demorada a los 69**: un 8 % más, ${eu(dem1.mensual)} al mes.

La ordinaria alcanza en dinero acumulado a la anticipada a los **${edadTxt(c1.cruceOA)}**. La demorada no supera a la ordinaria hasta los **${edadTxt(c1.cruceDO)}**: los dos años sin pensión pesan mucho.

### Con 42 años cotizados: adelantar 1 año

La edad ordinaria es de 65 años y la pensión, de 1.800 euros. Adelantar 12 meses cuesta un ${pc(c2.coef, 0)}: ${eu(ant2.mensual)} desde los 64. La ordinaria no la alcanza hasta los **${edadTxt(c2.cruceOA)}**. Con carreras largas, adelantar un año cuesta poco.

## Errores frecuentes

- **Mirar solo la pensión mensual.** Lo que importa es cuánto cobrarás en total durante los años que vivas: una pensión más baja durante más tiempo puede sumar más.
- **Olvidar los requisitos.** La anticipada voluntaria exige 35 años cotizados y una pensión por encima de la mínima; la calculadora compara cuantías, no si tienes derecho.
- **Comparar sin el sueldo.** Si retrasas la jubilación, mientras tanto cobras tu sueldo. El comparador solo cuenta la pensión.

## Preguntas frecuentes

### ¿A partir de qué edad compensa no adelantar la jubilación?

Depende de tus años cotizados y de cuánto adelantes. Con 38 años cotizados y 2 años de adelanto, a partir de los ${edadTxt(c1.cruceOA)} la ordinaria te habrá dado más dinero en total.

### ¿Tiene en cuenta el IRPF?

No: compara pensiones brutas. Con una pensión más baja también pagas algo menos de IRPF; calcúlalo con la [calculadora de pensión neta](/calculadoras/pension-neta-irpf/).

## Guía completa

Los números y lo que no se ve en ellos (salud, trabajo, impuestos), en [¿compensa jubilarse antes?](/jubilacion/compensa-jubilarse-antes/). Cada opción en detalle: [anticipada voluntaria](/jubilacion/anticipada-voluntaria/) y [jubilación demorada](/jubilacion/demorada/).
`;
}

// ------------------------------------------------------------------ Portada /calculadoras/
paginas.calculadoras = `## Qué calculadora necesitas

| Tu pregunta | Calculadora |
|---|---|
| ¿Cuándo me puedo jubilar? | [Edad de jubilación](/calculadoras/edad-jubilacion/) |
| ¿Cuánto cobraré? | [Pensión de jubilación](/calculadoras/pension-jubilacion/) |
| ¿Cuánto pierdo si me jubilo antes? | [Jubilación anticipada](/calculadoras/jubilacion-anticipada/) |
| ¿Qué gano si me jubilo más tarde o sigo trabajando? | [Demorada, activa y flexible](/calculadoras/jubilacion-demorada-flexible/) |
| ¿Me compensa adelantar o retrasar? | [Comparador de ingresos](/calculadoras/comparador-ingresos-jubilacion/) |
| ¿Cuánto me llega al banco? | [Pensión neta (IRPF)](/calculadoras/pension-neta-irpf/) |
| ¿Cuánto subirá mi pensión? | [Subida de las pensiones](/calculadoras/subida-pensiones/) |
| ¿Cuánto cobraré de viudedad? | [Pensión de viudedad](/calculadoras/pension-viudedad/) |
| ¿Cuánto cobraré con una incapacidad? | [Incapacidad permanente](/calculadoras/incapacidad-permanente/) |
| ¿Cuánto tengo que ahorrar? | [Ahorro para la jubilación](/calculadoras/cuanto-ahorrar-jubilacion/) |
| Lo quiero ver todo junto | [Simulador de jubilación](/calculadoras/simulador-jubilacion/) |

## Qué datos tener a mano

- **Tus años cotizados**, del informe de vida laboral. Lo descargas gratis en Tu Seguridad Social; te contamos cómo en [el informe de vida laboral](/cuanto-cobrare/informe-vida-laboral/).
- **Tus bases de cotización**, que salen en tus nóminas y en el informe de bases de Tu Seguridad Social. Para la pensión de jubilación basta con una media aproximada.
- **Si ya cobras una pensión**, la cifra bruta de tu resolución o de tu certificado de pensiones. Para viudedad e incapacidad, la base reguladora que figure en la resolución.

## Por qué el resultado puede no coincidir con el oficial

Las calculadoras dan una estimación con las reglas de la ley, no la cifra de tu resolución. Simplificamos algunas cosas: usamos una base media en lugar de tus bases mes a mes, no conocemos tus lagunas exactas ni tus periodos en otros países, y no aplicamos complementos que dependen de tu familia o de tus ingresos salvo cuando la calculadora los pregunta. Cada calculadora explica qué tiene en cuenta y qué no.

Para la cifra oficial, usa el simulador de Tu Seguridad Social con tu certificado digital o Cl@ve, o pide una simulación al INSS.

## Cada cuánto las actualizamos

Las cuantías de ${A} (pensión máxima de ${eu(MAX)}, mínimas, límite de ingresos de ${eu(C.limiteIngresosMinimos, 0)} y bases de cotización) salen del decreto de revalorización y de la orden de cotización de este año, y las cambiamos cuando se publica el BOE del año siguiente. El IRPF usa las escalas del último ejercicio que ha publicado la Agencia Tributaria. Las reglas de cálculo y las fuentes de cada cifra están en [cómo hacemos los cálculos](/metodologia/).

Los datos que escribes no salen de tu navegador: no los guardamos ni los enviamos a ningún sitio.
`;

mkdirSync(CARPETA, { recursive: true });
for (const [slug, md] of Object.entries(paginas)) {
  writeFileSync(join(CARPETA, slug + '.md'), md);
  console.log(slug.padEnd(32), md.split(/\s+/).filter(Boolean).length, 'palabras');
}
