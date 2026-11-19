// Reels por partido (elecciones del 29/11/2026): misma plantilla, misma duración y mismo trato para los siete.
// Orden alfabético. Sin valoraciones: solo lo que dice el programa oficial, con su página.
// Fuente: contenido/elecciones/programa-*-pensiones/articulo.md (rama claude/keen-mccarthy-i7kn75),
// «Respuesta rápida» y «¿De qué no habla el programa?».
// Uso: node redes/reels/elecciones/partidos/genera.mjs  → escribe una carpeta por partido.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));

// Cada punto: { en: frase exacta del guion donde aparece, pantalla: texto corto, voz: frase del guion }.
const PARTIDOS = [
  {
    id: 'eh-bildu', clipA: ['125430', 0.5], clipB: ['4878', 0.5], nombre: 'EH Bildu', art: 'EH Bildu', slug: 'programa-eh-bildu-pensiones', paginas: 'págs. 7-8',
    puntos: [
      { voz: 'Subir las pensiones mínimas hasta al menos [[1.220|mil doscientos veinte]] euros.', en: 'Subir las pensiones mínimas', pantalla: 'Mínimas: <b>al menos 1.220 €</b>' },
      { voz: 'Subir un [[15 %|quince por ciento]] la viudedad y las no contributivas.', en: 'la viudedad y las no', pantalla: 'Viudedad y no contributivas: <b>+15 %</b>' },
      { voz: 'Y jubilarse sin recorte con [[40|cuarenta]] años cotizados.', en: 'Y jubilarse sin recorte', pantalla: 'Sin recorte con <b>40 años</b> cotizados' },
    ],
    noHabla: ['el IRPF de las pensiones'],
  },
  {
    id: 'erc', clipA: ['151194', 0.45], clipB: ['84005', 0.5], nombre: 'ERC', art: 'ERC', slug: 'programa-erc-pensiones', paginas: 'medidas 106-110, págs. 25-27',
    puntos: [
      { voz: 'Blindar la subida de las pensiones con la inflación.', en: 'Blindar la subida', pantalla: '<b>Blindar</b> la subida con la inflación' },
      { voz: 'Con el IPC de cada territorio, no con el de toda España.', en: 'Subirlas con el IPC', pantalla: 'Con el <b>IPC de cada territorio</b>' },
      { voz: 'Y anticipada sin recorte en profesiones penosas o peligrosas.', en: 'Y anticipada sin recorte', pantalla: 'Anticipada <b>sin recorte</b> en oficios penosos' },
    ],
    noHabla: ['las pensiones mínimas', 'el IRPF de las pensiones', 'la viudedad'],
  },
  {
    id: 'frente-amplio', clipA: ['237650', 0.5], clipB: ['27230', 0.5], nombre: 'Frente Amplio', art: 'Frente Amplio', slug: 'programa-frente-amplio-pensiones', paginas: 'págs. 57-58',
    puntos: [
      { voz: 'Volver a la jubilación a los [[65|sesenta y cinco]].', en: 'Volver a la jubilación', pantalla: 'Jubilación a los <b>65</b>' },
      { voz: 'Que ninguna pensión sea menor que el salario mínimo.', en: 'Que ninguna pensión', pantalla: 'Ninguna pensión <b>bajo el salario mínimo</b>' },
      { voz: 'Y quitar el recorte de la anticipada involuntaria con más de [[40|cuarenta]] años cotizados.', en: 'Y quitar el recorte', pantalla: 'Anticipada involuntaria <b>sin recorte</b> con +40 años' },
    ],
    noHabla: ['la viudedad'],
  },
  {
    id: 'pnv', clipA: ['377024', 0.4], clipB: ['3013', 0.6], nombre: 'PNV', art: 'el PNV', slug: 'programa-pnv-pensiones', paginas: 'medidas 01-06, págs. 30-31',
    puntos: [
      { voz: 'Subirlas cada año con el IPC y mejorar poco a poco las mínimas.', en: 'Subirlas cada año', pantalla: 'Con el <b>IPC</b> y mínimas más altas' },
      { voz: 'Quitar el recorte de la anticipada con más de [[40|cuarenta]] años cotizados.', en: 'Quitar el recorte', pantalla: 'Anticipada <b>sin recorte</b> con +40 años' },
      { voz: 'Y que los años de cuidados cuenten para la pensión.', en: 'Y que los años', pantalla: 'Los años de <b>cuidados cuentan</b>' },
    ],
    noHabla: ['el IRPF de las pensiones', 'la viudedad'],
  },
  {
    id: 'pp', clipA: ['125431', 0.72], clipB: ['2339', 0.75], nombre: 'PP', art: 'el PP', slug: 'programa-pp-pensiones', paginas: 'medidas 108 y 114, págs. 42-44',
    puntos: [
      { voz: 'Subirlas cada año con el IPC y reconstruir el Pacto de Toledo.', en: 'Subirlas cada año', pantalla: 'Con el <b>IPC</b> y nuevo <b>Pacto de Toledo</b>' },
      { voz: 'Rebajas en el IRPF para quien cobra la pensión y trabaja.', en: 'Rebajas en el IRPF', pantalla: '<b>IRPF</b> más bajo en la jubilación activa' },
      { voz: 'Y un pacto de Estado por la dependencia.', en: 'Y un pacto', pantalla: 'Pacto de Estado por la <b>dependencia</b>' },
    ],
    noHabla: ['la edad de jubilación', 'las pensiones mínimas', 'la viudedad'],
  },
  {
    id: 'psoe', clipA: ['140724', 0.42], clipB: ['221844', 0.45], nombre: 'PSOE', art: 'el PSOE', slug: 'programa-psoe-pensiones', paginas: 'medidas 98-106, págs. 39-41',
    puntos: [
      { voz: 'Llevar a la Constitución la subida con el IPC.', en: 'Llevar a la Constitución', pantalla: 'Subida con el IPC <b>en la Constitución</b>' },
      { voz: 'Seguir acercando las mínimas a los ingresos de la sociedad.', en: 'Seguir acercando', pantalla: '<b>Mínimas</b> más cerca de los ingresos medios' },
      { voz: 'Y evaluar un recorte menor en la anticipada involuntaria con carreras largas.', en: 'Y evaluar', pantalla: '«Evaluar» <b>menos recorte</b> en la anticipada' },
    ],
    noHabla: ['el IRPF de las pensiones'],
  },
  {
    id: 'vox', clipA: ['140722', 0.7], clipB: ['229069', 0.5], nombre: 'Vox', art: 'Vox', slug: 'programa-vox-pensiones', paginas: 'medidas 7 y 94-96, págs. 10-11 y 51-52',
    puntos: [
      { voz: 'Garantizar que el sistema sea sostenible con más empleo y crecimiento.', en: 'Garantizar que el sistema', pantalla: '<b>Sostenibilidad</b> con más empleo' },
      { voz: 'Que el Estado cotice por quien cuida de sus hijos.', en: 'Que el Estado cotice', pantalla: 'El Estado <b>cotiza</b> por quien cuida a sus hijos' },
      { voz: 'Y más dinero para la dependencia.', en: 'Y más dinero', pantalla: 'Más dinero para la <b>dependencia</b>' },
    ],
    noHabla: ['la subida con el IPC', 'la edad de jubilación', 'las mínimas', 'la anticipada', 'la viudedad'],
  },
];

const listaVoz = (xs) => xs.length === 1 ? xs[0] : xs.slice(0, 2).join(' ni de ');
const voz = (t) => t.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, '$2');
const conMayus = (s) => s[0].toUpperCase() + s.slice(1);
const del = (p) => (p.art.startsWith('el ') ? 'del ' + p.nombre : 'de ' + p.nombre);

PARTIDOS.forEach((p, i) => {
  const n = i + 1;
  const dir = join(AQUI, `${n}-${p.id}`);
  mkdirSync(dir, { recursive: true });
  const guion = [
    `¿Qué propone ${p.art} sobre las pensiones? Esto dice su programa.`,
    p.puntos.map((x) => x.voz).join(' '),
    `No habla de ${listaVoz(p.noHabla)}.`,
    `Los siete partidos, comparados en Jubilómetro.`,
  ].join('\n\n');

  const reel = `// Reel ${n} de 7 · Qué propone ${p.nombre} sobre las pensiones (elecciones del 29/11/2026)
// Generado por ../genera.mjs: misma plantilla para los siete partidos. No editar a mano; cambiar genera.mjs.
// Fuente: contenido/elecciones/${p.slug}/articulo.md (rama claude/keen-mccarthy-i7kn75).
export default {
  tema: "Elecciones 29-N",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/59610ed8-671e-4654-8b95-bc066c1bf45a.m4a",
  musicaBucle: { ini: 2.4, fin: 14.4 },
  volumenMusica: 0.1,
  guion: ${JSON.stringify(guion)},

  escenas: [
    { clase: "arriba", fondo: { clip: "pixabay:${p.clipA[0]}", desde: 0.5, x: ${p.clipA[1]} },
      html: \`
        <div class="kicker" data-a="fijo">Elecciones 29N · Partido ${n} de 7</div>
        <div class="titular relieve" data-a="fijo">¿Qué propone ${p.art.startsWith('el ') ? 'el ' : ''}<span class="ambar">${p.nombre}</span> sobre las pensiones?</div>\`,
    },
    { en: ${JSON.stringify(p.puntos[0].en)}, clase: "arriba",
      html: \`
        <div class="kicker">Lo que dice su programa</div>
${p.puntos.map((x, k) => `        <div class="paso" data-en=${JSON.stringify(x.en)} data-a="sube"><div class="num">${k + 1}</div><div class="tx" style="font-size:54px">${x.pantalla}</div></div>`).join('\n')}
        <div class="nota" data-a="aparece">Programa oficial ${del(p)}, ${p.paginas}</div>\`,
    },
    { en: "No habla de", clase: "arriba", fondo: { clip: "pixabay:${p.clipB[0]}", desde: 0.5, x: ${p.clipB[1]} },
      html: \`
        <div class="kicker">Su programa no habla de…</div>
${p.noHabla.map((x) => `        <div class="paso" data-a="sube"><div class="num">✕</div><div class="tx" style="font-size:54px">${conMayus(x)}</div></div>`).join('\n')}\`,
    },
    { en: "Los siete partidos", clase: "arriba",
      html: \`
        <div class="cta">
          <div class="titular m relieve" data-a="sube">Los <span class="ambar">7 partidos</span>, comparados</div>
          <div class="url" data-a="sube" data-dur="0.6">jubilometro.com/elecciones</div>
          <div class="aviso" data-a="aparece">Solo lo que dice el programa oficial de cada partido, con su página. Sin valoraciones ni recomendación de voto. Orden alfabético. Información general.</div>
        </div>\`,
    },
  ],

  portada: \`
    <div class="kicker" data-a="fijo">Elecciones 29N · ${n} de 7</div>
    <div class="titular relieve" data-a="fijo">¿Qué propone ${p.art.startsWith('el ') ? 'el ' : ''}<span class="ambar">${p.nombre}</span> sobre las pensiones?</div>
    <div class="sub" data-a="fijo">Lo que dice su programa</div>\`,
};
`;
  writeFileSync(join(dir, 'reel.mjs'), reel);
  writeFileSync(join(dir, 'voz.txt'), voz(guion) + '\n');

  const url = `https://jubilometro.com/elecciones/${p.slug}/`;
  const puntosTxt = p.puntos.map((x) => '→ ' + x.pantalla.replace(/<[^>]+>/g, '')).join('\n');
  const noTxt = p.noHabla.join(', ');
  const pub = `# Reel ${n} de 7 · Qué propone ${p.art} sobre las pensiones

Voz: «Chris». Etiqueta de IA: sí. Primero sale el reel 1 y después los demás, en orden alfabético.

## Instagram (reel) · 19:30

\`\`\`
¿Qué propone ${p.art} sobre las pensiones? Esto dice su programa oficial para el 29 de noviembre:

${puntosTxt}

No habla de ${noTxt}.

Es el ${n} de 7: los siete partidos, con la misma plantilla y en orden alfabético. Solo lo que dice cada programa, con su página, sin valoraciones.

Guárdalo para comparar 🔖

#elecciones2026 #pensiones #29N #jubilacion #programaselectorales
\`\`\`

- Primer comentario: La guía completa, con las citas y las páginas del programa: ${url}

## Facebook (reel) · 20:43

- Título: ¿Qué propone ${p.art} sobre las pensiones?

\`\`\`
¿Qué propone ${p.art} sobre las pensiones? En el vídeo, lo que dice su programa oficial para el 29N. Es el ${n} de 7: todos los partidos con la misma plantilla y en orden alfabético, sin valoraciones.
\`\`\`

- Primer comentario: La guía completa, con las páginas del programa: ${url}

## YouTube (short) · 17:00

- Título: ¿Qué propone ${p.art} sobre las pensiones? Su programa para el 29N
- Etiquetas: elecciones 2026, pensiones, programa ${p.nombre}, 29N, programas electorales, jubilación
- Contenido alterado o sintético: sí

\`\`\`
Lo que dice el programa oficial ${del(p)} para las elecciones del 29 de noviembre de 2026 sobre las pensiones:
${puntosTxt}
No habla de ${noTxt}.

Guía completa con las citas y las páginas: ${url}

Es el ${n} de 7. Los siete partidos, con la misma plantilla y en orden alfabético. Información general, sin valoraciones ni recomendación de voto.

#shorts #elecciones2026 #pensiones
\`\`\`

## X · 20:43

\`\`\`
¿Qué propone ${p.art} sobre las pensiones? Lo que dice su programa para el 29N (${n}/7, orden alfabético, sin valoraciones) 👇

${url}
\`\`\`
`;
  writeFileSync(join(dir, 'publicacion.md'), pub);
  console.log(n, p.nombre, voz(guion).length, 'caracteres');
});
