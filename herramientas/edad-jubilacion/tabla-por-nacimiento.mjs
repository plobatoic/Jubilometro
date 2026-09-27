// Genera la tabla de edad de jubilación ordinaria por año y mes de nacimiento.
// Uso: node herramientas/edad-jubilacion/tabla-por-nacimiento.mjs [desde] [hasta]
import { jubilacionOrdinaria, reglaDelAno, sumarMeses, formatearEdad } from './edad-jubilacion.mjs';

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre'];

export function filaPorAno(anoNacimiento) {
  const tramos = [];
  for (let mes = 1; mes <= 12; mes++) {
    const nacimiento = { ano: anoNacimiento, mes, dia: 15 };
    const referencia = sumarMeses(nacimiento, 65 * 12);
    // Carrera corta: nunca alcanza el umbral (se usa el periodo mínimo de 15 años).
    const corta = jubilacionOrdinaria({ nacimiento, cotizadoMeses: 15 * 12, referencia, sigueCotizando: false });
    const clave = `${corta.edadMeses}`;
    const ultimo = tramos[tramos.length - 1];
    if (ultimo && ultimo.clave === clave) {
      ultimo.hasta = mes;
      ultimo.anoJubilacionHasta = corta.fecha.ano;
    } else {
      tramos.push({ clave, desde: mes, hasta: mes, edadMeses: corta.edadMeses,
        anoJubilacionDesde: corta.fecha.ano, anoJubilacionHasta: corta.fecha.ano });
    }
  }
  const umbral65 = reglaDelAno(anoNacimiento + 65).umbral;
  return { anoNacimiento, anoCumple65: anoNacimiento + 65, umbral65, tramos };
}

function textoMeses(desde, hasta) {
  if (desde === 1 && hasta === 12) return 'todo el año';
  if (desde === hasta) return MESES[desde - 1];
  return `${MESES[desde - 1]}-${MESES[hasta - 1]}`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const desde = Number(process.argv[2] ?? 1957);
  const hasta = Number(process.argv[3] ?? 1972);
  for (let ano = desde; ano <= hasta; ano++) {
    const fila = filaPorAno(ano);
    const larga = `65 años (en ${fila.anoCumple65}) con ${formatearEdad(fila.umbral65)} cotizados`;
    const cortas = fila.tramos.map((t) => {
      const anos = t.anoJubilacionDesde === t.anoJubilacionHasta
        ? `${t.anoJubilacionDesde}` : `${t.anoJubilacionDesde}-${t.anoJubilacionHasta}`;
      return `${textoMeses(t.desde, t.hasta)}: ${formatearEdad(t.edadMeses)} (en ${anos})`;
    }).join(' | ');
    console.log(`${ano} -> larga: ${larga} || corta: ${cortas}`);
  }
}
