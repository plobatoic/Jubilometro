// Imágenes con la cifra (1080 × 1350) para Facebook, X e Instagram.
// Cada una: un dato grande (o un titular), lo justo de texto, la fuente abajo y la dirección corta.
// Para hacer una nueva, copia un bloque, cambia los textos y ejecuta kit.mjs con --solo=cifras.
// *texto* no hace falta: las cifras con unidad (%, €, años, meses, días) se resaltan solas.

export const CIFRAS = [
  {
    archivo: '2026-10-12-presentacion', nombre: 'Presentación de la página (12 de octubre, Facebook)',
    ante: 'Guías y calculadoras',
    titulo: 'Las cifras de tu pensión, con su norma y su fecha.',
    despues: 'Jubilación, viudedad, Imserso y dependencia en España, explicados con calma.',
  },
  {
    archivo: '2026-10-14-subida-2027', nombre: 'Subida de 2027 con el IPC de septiembre (14 de octubre, Facebook)',
    nota: 'Revisar el 14 de octubre con el IPC definitivo de septiembre antes de publicarla.',
    ante: 'Estimación', corto: 'subida',
    antes: 'Subida de las pensiones en enero de 2027',
    grande: '3,3-3,7 %',
    filas: [['800 €', '826,40 a 829,60 €'], ['1.000 €', '1.033 a 1.037 €'], ['1.500 €', '1.549,50 a 1.555,50 €']],
    fuente: 'INE (IPC hasta septiembre) y artículo 58 de la Ley General de la Seguridad Social. Euros brutos al mes, en 14 pagas.',
  },
  {
    archivo: '2026-11-06-paga-extra', nombre: 'Paga extra de Navidad (6 de noviembre, Facebook)',
    ante: 'Calendario', corto: 'paga-extra',
    antes: 'Paga extra de Navidad, si tu banco adelanta el pago',
    grande: '22-26 nov.',
    despues: 'Si no lo adelanta, la Seguridad Social la paga como tarde el primer día hábil de diciembre.',
    fuente: 'Seguridad Social. Cada banco decide si adelanta y qué día.',
  },
  {
    archivo: 'ejemplo-pension-maxima', nombre: 'Ejemplo para X: pensión máxima de 2026',
    ante: 'La cifra', corto: 'maxima',
    antes: 'Pensión máxima de 2026',
    grande: '3.359,60 €',
    despues: 'al mes en 14 pagas: 47.034,40 € al año.',
    fuente: 'Real Decreto 241/2026, de revalorización de las pensiones (BOE).',
  },
  {
    archivo: 'ejemplo-edad-2027', nombre: 'Ejemplo para X: edad de jubilación en 2027',
    ante: 'La cifra', corto: 'edad',
    antes: 'Edad de jubilación en 2027',
    grande: '67 años',
    despues: 'O 65 años si llevas al menos 38 años y 6 meses cotizados. Cuenta el año en que te jubilas.',
    fuente: 'Artículo 205 y disposición transitoria 7.ª de la Ley General de la Seguridad Social.',
  },
];
