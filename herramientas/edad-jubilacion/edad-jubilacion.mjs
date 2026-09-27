// Edad ordinaria de jubilación en España (Régimen General y RETA).
//
// Norma aplicada:
//   - Art. 205.1.a) del texto refundido de la Ley General de la Seguridad Social
//     (Real Decreto Legislativo 8/2015): 67 años, o 65 con 38 años y 6 meses cotizados,
//     sin contar la parte proporcional de pagas extra y en años y meses completos.
//   - Disposición transitoria 7.ª LGSS: calendario 2013-2027. Cada fila se aplica
//     según el AÑO DEL HECHO CAUSANTE (el año en que te jubilas), no según el año
//     de nacimiento ni el año en que cumples 65.
//   - Art. 205.1.b) LGSS: periodo mínimo de 15 años cotizados.
//
// Lo que NO calcula: jubilación anticipada, edades reducidas (discapacidad, profesiones
// con coeficientes reductores), cláusula de salvaguarda (DT 4.ª LGSS), Clases Pasivas
// ni el requisito de 2 años cotizados dentro de los últimos 15.
// Es una estimación orientativa: la fecha oficial la fija el INSS.

// [año, cotización para jubilarse a los 65 (meses), edad exigida si no se alcanza (meses)]
const CALENDARIO = [
  [2013, 35 * 12 + 3, 65 * 12 + 1],
  [2014, 35 * 12 + 6, 65 * 12 + 2],
  [2015, 35 * 12 + 9, 65 * 12 + 3],
  [2016, 36 * 12, 65 * 12 + 4],
  [2017, 36 * 12 + 3, 65 * 12 + 5],
  [2018, 36 * 12 + 6, 65 * 12 + 6],
  [2019, 36 * 12 + 9, 65 * 12 + 8],
  [2020, 37 * 12, 65 * 12 + 10],
  [2021, 37 * 12 + 3, 66 * 12],
  [2022, 37 * 12 + 6, 66 * 12 + 2],
  [2023, 37 * 12 + 9, 66 * 12 + 4],
  [2024, 38 * 12, 66 * 12 + 6],
  [2025, 38 * 12 + 3, 66 * 12 + 8],
  [2026, 38 * 12 + 3, 66 * 12 + 10],
  [2027, 38 * 12 + 6, 67 * 12],
];

const EDAD_MINIMA = 65 * 12;
const EDAD_MAXIMA = 67 * 12;
const PERIODO_MINIMO = 15 * 12;

export function reglaDelAno(ano) {
  if (ano < 2013) return { ano, umbral: null, edadCarreraCorta: EDAD_MINIMA };
  const fila = CALENDARIO.find(([a]) => a === Math.min(ano, 2027));
  return { ano, umbral: fila[1], edadCarreraCorta: fila[2] };
}

// Suma meses a una fecha. Si el día no existe en el mes de destino (p. ej., 31 de
// febrero), se toma el último día de ese mes.
export function sumarMeses({ ano, mes, dia }, meses) {
  const total = ano * 12 + (mes - 1) + meses;
  const a = Math.floor(total / 12);
  const m = (total % 12) + 1;
  const ultimoDia = new Date(Date.UTC(a, m, 0)).getUTCDate();
  return { ano: a, mes: m, dia: Math.min(dia, ultimoDia) };
}

export function comparar(f1, f2) {
  return f1.ano - f2.ano || f1.mes - f2.mes || f1.dia - f2.dia;
}

// Meses completos transcurridos entre dos fechas (0 si hasta <= desde).
export function mesesCompletos(desde, hasta) {
  if (comparar(hasta, desde) <= 0) return 0;
  let meses = (hasta.ano - desde.ano) * 12 + (hasta.mes - desde.mes);
  if (comparar(sumarMeses(desde, meses), hasta) > 0) meses -= 1;
  return meses;
}

// Fecha de jubilación ordinaria (la primera fecha, desde `referencia`, en la que se
// cumplen los requisitos de edad y cotización del año en curso).
//   nacimiento:      { ano, mes, dia }
//   cotizadoMeses:   años y meses completos cotizados a fecha de referencia, en meses
//                    (sin la parte proporcional de pagas extra)
//   referencia:      fecha a la que corresponde cotizadoMeses (normalmente, hoy)
//   sigueCotizando:  si seguirá cotizando sin interrupción hasta jubilarse
export function jubilacionOrdinaria({ nacimiento, cotizadoMeses, referencia, sigueCotizando }) {
  const cumple65 = sumarMeses(nacimiento, EDAD_MINIMA);
  const cumple67 = sumarMeses(nacimiento, EDAD_MAXIMA);
  const inicio = comparar(referencia, cumple65) > 0 ? referencia : cumple65;

  // Solo puedes pasar a cumplir los requisitos cuando cumples un mes más de edad o
  // sumas un mes más cotizado. El cambio de año nunca los facilita (el calendario
  // solo endurece), así que no hace falta evaluarlo.
  const candidatas = [inicio];
  for (let edad = EDAD_MINIMA; edad <= EDAD_MAXIMA; edad++) {
    candidatas.push(sumarMeses(nacimiento, edad));
  }
  if (sigueCotizando) {
    const hasta = mesesCompletos(referencia, cumple67) + 1;
    for (let n = 1; n <= hasta; n++) candidatas.push(sumarMeses(referencia, n));
  }
  const fechas = candidatas
    .filter((f) => comparar(f, inicio) >= 0)
    .sort(comparar)
    .filter((f, i, lista) => i === 0 || comparar(f, lista[i - 1]) !== 0);

  for (const fecha of fechas) {
    const edadMeses = mesesCompletos(nacimiento, fecha);
    const cotizado = cotizadoMeses + (sigueCotizando ? mesesCompletos(referencia, fecha) : 0);
    const regla = reglaDelAno(fecha.ano);
    const porCarreraLarga = regla.umbral !== null && cotizado >= regla.umbral;
    if (edadMeses >= EDAD_MINIMA && (porCarreraLarga || edadMeses >= regla.edadCarreraCorta)) {
      return {
        fecha,
        edadMeses,
        cotizadoMeses: cotizado,
        via: porCarreraLarga ? 'carrera-larga' : 'edad',
        regla,
        yaCumple: comparar(fecha, referencia) <= 0,
        alcanzaPeriodoMinimo: cotizado >= PERIODO_MINIMO,
      };
    }
  }
  throw new Error('Sin resultado: revisa los datos de entrada');
}

export function formatearEdad(meses) {
  const anos = Math.floor(meses / 12);
  const resto = meses % 12;
  if (resto === 0) return `${anos} años`;
  return `${anos} años y ${resto} ${resto === 1 ? 'mes' : 'meses'}`;
}
