// Ejecutar con: node --test herramientas/edad-jubilacion/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { jubilacionOrdinaria, mesesCompletos, reglaDelAno, sumarMeses, formatearEdad } from './edad-jubilacion.mjs';
import { filaPorAno } from './tabla-por-nacimiento.mjs';

const f = (dia, mes, ano) => ({ ano, mes, dia });
const am = (anos, meses = 0) => anos * 12 + meses;

test('calendario de la DT 7.ª LGSS', () => {
  assert.deepEqual(reglaDelAno(2025), { ano: 2025, umbral: am(38, 3), edadCarreraCorta: am(66, 8) });
  assert.deepEqual(reglaDelAno(2026), { ano: 2026, umbral: am(38, 3), edadCarreraCorta: am(66, 10) });
  assert.deepEqual(reglaDelAno(2027), { ano: 2027, umbral: am(38, 6), edadCarreraCorta: am(67) });
  // A partir de 2027 la regla ya no cambia.
  assert.deepEqual(reglaDelAno(2040), { ano: 2040, umbral: am(38, 6), edadCarreraCorta: am(67) });
});

test('aritmética de fechas', () => {
  assert.deepEqual(sumarMeses(f(31, 1, 1960), am(66, 10)), f(30, 11, 2026));
  assert.deepEqual(sumarMeses(f(29, 2, 1960), am(67)), f(28, 2, 2027));
  assert.equal(mesesCompletos(f(15, 3, 2027), f(14, 4, 2027)), 0);
  assert.equal(mesesCompletos(f(15, 3, 2027), f(15, 4, 2027)), 1);
  assert.equal(mesesCompletos(f(15, 3, 2027), f(15, 3, 2027)), 0);
  assert.equal(formatearEdad(am(66, 1)), '66 años y 1 mes');
  assert.equal(formatearEdad(am(67)), '67 años');
});

test('nacido en marzo de 1960 con carrera corta: 67 años en 2027, no 66 y 10 meses', () => {
  const r = jubilacionOrdinaria({ nacimiento: f(20, 4, 1960), cotizadoMeses: am(34), referencia: f(27, 9, 2026), sigueCotizando: true });
  assert.deepEqual(r.fecha, f(20, 4, 2027));
  assert.equal(r.edadMeses, am(67));
  assert.equal(r.via, 'edad');
});

test('nacido en febrero de 1960 con carrera corta: 66 años y 10 meses en 2026', () => {
  const r = jubilacionOrdinaria({ nacimiento: f(15, 2, 1960), cotizadoMeses: am(30), referencia: f(15, 2, 2025), sigueCotizando: false });
  assert.deepEqual(r.fecha, f(15, 12, 2026));
  assert.equal(r.edadMeses, am(66, 10));
});

test('nacida en 1962 con 39 años cotizados: 65 años en 2027', () => {
  const r = jubilacionOrdinaria({ nacimiento: f(12, 6, 1962), cotizadoMeses: am(39), referencia: f(12, 6, 2027), sigueCotizando: false });
  assert.deepEqual(r.fecha, f(12, 6, 2027));
  assert.equal(r.edadMeses, am(65));
  assert.equal(r.via, 'carrera-larga');
});

test('llega a 38 años y 6 meses entre los 65 y los 67: se jubila en ese momento', () => {
  const base = { nacimiento: f(10, 10, 1962), cotizadoMeses: am(37, 9), referencia: f(10, 10, 2027) };
  const trabajando = jubilacionOrdinaria({ ...base, sigueCotizando: true });
  assert.deepEqual(trabajando.fecha, f(10, 7, 2028));
  assert.equal(trabajando.edadMeses, am(65, 9));
  assert.equal(trabajando.via, 'carrera-larga');

  const sinCotizar = jubilacionOrdinaria({ ...base, sigueCotizando: false });
  assert.deepEqual(sinCotizar.fecha, f(10, 10, 2029));
  assert.equal(sinCotizar.edadMeses, am(67));
});

test('salto de diciembre de 2026 a enero de 2027 en carreras largas', () => {
  // 38 años y 4 meses al cumplir 65 en diciembre de 2026: le basta (umbral 2026: 38a 3m).
  const en2026 = jubilacionOrdinaria({ nacimiento: f(15, 12, 1961), cotizadoMeses: am(38, 4), referencia: f(15, 12, 2026), sigueCotizando: false });
  assert.deepEqual(en2026.fecha, f(15, 12, 2026));
  assert.equal(en2026.via, 'carrera-larga');

  // Si deja pasar el año sin jubilarse y sigue cotizando, en 2027 necesita 38a 6m.
  const en2027 = jubilacionOrdinaria({ nacimiento: f(15, 12, 1961), cotizadoMeses: am(38, 4), referencia: f(1, 1, 2027), sigueCotizando: true });
  assert.deepEqual(en2027.fecha, f(1, 3, 2027));
  assert.equal(en2027.cotizadoMeses, am(38, 6));

  // Si deja de cotizar el 1 de enero de 2027 sin haberse jubilado, debe esperar a los 67.
  const sinCotizar = jubilacionOrdinaria({ nacimiento: f(15, 12, 1961), cotizadoMeses: am(38, 4), referencia: f(1, 1, 2027), sigueCotizando: false });
  assert.deepEqual(sinCotizar.fecha, f(15, 12, 2028));
  assert.equal(sinCotizar.edadMeses, am(67));
});

test('persona que ya cumple los requisitos', () => {
  const r = jubilacionOrdinaria({ nacimiento: f(1, 5, 1958), cotizadoMeses: am(30), referencia: f(27, 9, 2026), sigueCotizando: true });
  assert.equal(r.yaCumple, true);
  assert.deepEqual(r.fecha, f(27, 9, 2026));
});

test('aviso si no se alcanza el periodo mínimo de 15 años', () => {
  const r = jubilacionOrdinaria({ nacimiento: f(1, 1, 1963), cotizadoMeses: am(10), referencia: f(27, 9, 2026), sigueCotizando: false });
  assert.equal(r.alcanzaPeriodoMinimo, false);
  assert.deepEqual(r.fecha, f(1, 1, 2030));
});

test('tabla por año de nacimiento (valores publicados en el artículo)', () => {
  const resumen = (ano) => filaPorAno(ano).tramos.map((t) => [t.desde, t.hasta, t.edadMeses, t.anoJubilacionDesde, t.anoJubilacionHasta]);
  assert.deepEqual(resumen(1959), [[1, 4, am(66, 8), 2025, 2025], [5, 12, am(66, 10), 2026, 2026]]);
  assert.deepEqual(resumen(1960), [[1, 2, am(66, 10), 2026, 2026], [3, 12, am(67), 2027, 2027]]);
  assert.deepEqual(resumen(1961), [[1, 12, am(67), 2028, 2028]]);
  assert.deepEqual(resumen(1962), [[1, 12, am(67), 2029, 2029]]);
  assert.equal(filaPorAno(1961).umbral65, am(38, 3));
  assert.equal(filaPorAno(1962).umbral65, am(38, 6));
  for (let ano = 1963; ano <= 1975; ano++) {
    assert.deepEqual(resumen(ano), [[1, 12, am(67), ano + 67, ano + 67]]);
    assert.equal(filaPorAno(ano).umbral65, am(38, 6));
  }
});

test('todas las fechas de nacimiento 1950-1980: la edad resultante respeta la regla del año', () => {
  for (let ano = 1950; ano <= 1980; ano++) {
    for (let mes = 1; mes <= 12; mes++) {
      for (const dia of [1, 15, 28, 29, 30, 31]) {
        const nacimiento = { ano, mes, dia: Math.min(dia, new Date(Date.UTC(ano, mes, 0)).getUTCDate()) };
        const referencia = sumarMeses(nacimiento, am(60));
        const r = jubilacionOrdinaria({ nacimiento, cotizadoMeses: am(20), referencia, sigueCotizando: false });
        const regla = reglaDelAno(r.fecha.ano);
        assert.ok(r.edadMeses >= regla.edadCarreraCorta, `${ano}-${mes}-${dia}`);
        // Un mes antes no se cumplía la regla de ese momento.
        const antes = sumarMeses(nacimiento, r.edadMeses - 1);
        if (r.edadMeses > am(65)) {
          assert.ok(r.edadMeses - 1 < reglaDelAno(antes.ano).edadCarreraCorta, `${ano}-${mes}-${dia} (mes previo)`);
        }
        assert.ok(r.edadMeses <= am(67));
      }
    }
  }
});
