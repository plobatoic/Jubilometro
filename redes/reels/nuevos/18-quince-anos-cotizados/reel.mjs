// Reel 18 · ¿Con 15 años cotizados tienes pensión? (el Short con más visitas de YouTube, 1.160, contado otra vez en 3D)
// Fuente: contenido/jubilacion/15-anos-cotizados/articulo.md (+ verificacion-fuentes.md): 15 años, 2 en los últimos 15,
// 50 % de la base reguladora a los 67 (2027), complemento a mínimos hasta 936,20 €/mes (2026, sin cónyuge), ejemplo de Carmen.
// Muñecos 3D en el salón y la oficina hechos con código (Pau, 25/11). Voz: herramientas/reels/voz.mjs.
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
const CAM = {
  gancho: { desde: { pos: [-1.2, 2.9, 10.4], mira: [0, 2.85, 0] }, hasta: { pos: [-0.4, 2.8, 8.8], mira: [0, 2.8, 0] } },
  medio: { desde: { pos: [0, 2.9, 8.8], mira: [0, 3.05, 0] }, hasta: { pos: [0, 2.85, 7.9], mira: [0, 3.0, 0] } },
  medio2: { desde: { pos: [1.6, 2.9, 10.6], mira: [0, 2.95, 0] }, hasta: { pos: [1.0, 2.85, 9.6], mira: [0, 2.9, 0] } },
  oficina: { desde: { pos: [0.6, 3.9, 10.6], mira: [0.2, 2.35, -0.6] }, hasta: { pos: [0.5, 3.8, 9.7], mira: [0.2, 2.3, -0.6] } },
  general2: { desde: { pos: [0, 3.0, 12.6], mira: [0, 2.9, 0] }, hasta: { pos: [0, 2.9, 11.2], mira: [0, 2.85, 0] } },
  cierre: { desde: { pos: [0.2, 2.9, 12.0], mira: [0, 3.35, 0] }, hasta: { pos: [0.1, 2.9, 11.2], mira: [0, 3.3, 0] } },
};

export default {
  tema: "15 años cotizados",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/04ccbe32-a3e1-4c80-aa68-879342c36b94.m4a",
  musicaBucle: { ini: 2.727, fin: 13.636 },
  volumenMusica: 0.12,
  guion: `¿Con [[15|quince]] años cotizados tienes pensión? Sí, pero con una trampa.

Dos de esos [[15|quince]] años tienen que estar en los últimos [[15|quince]] antes de jubilarte.

Pongamos que Carmen cotizó [[15|quince]] años de joven y lo dejó hace [[20|veinte]]. No cumple: se queda sin pensión contributiva.

Si cumples, cobras la mitad de tu base reguladora, a los [[67|sesenta y siete]]. Y si te sale baja, el complemento a mínimos puede subirla hasta [[936|novecientos treinta y seis]] euros al mes.

Guárdatelo, o pásaselo a quien tenga pocos años cotizados.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "salon", camara: CAM.gancho,
        actores: { luis: { pos: [0, 0.4], giro: 8, pose: "piensa", cara: "preocupada", acciones: [{ en: "Sí, pero", pose: "senalaArriba", cara: "sorpresa" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "luis", texto: "?", t: 0.3, hasta: 2.0 }],
      },
      html: `
        <div class="kicker" data-a="fijo">Jubilación con 15 años cotizados</div>
        <div class="titular relieve" data-a="fijo">¿15 años cotizados? <span class="ambar">Ojo a la trampa</span></div>`,
    },
    { en: "Dos de esos", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.medio2,
        actores: { rosa: { pos: [0.2, 0.5], giro: -10, pose: "senala", cara: "contenta", acciones: [{ en: "antes de jubilarte", pose: "pulgar", cara: "neutra" }] } },
      },
      html: `
        <div class="kicker">La trampa</div>
        <div class="cifra m ambar" data-en="Dos de esos" data-a="pop">2 de 15</div>
        <div class="titular s" data-en="en los últimos" data-a="sube">tienen que estar en los últimos 15 años</div>`,
    },
    { en: "Pongamos que Carmen", clase: "arriba", transicion: "giro",
      animacion: {
        set: "oficina", camara: CAM.oficina,
        actores: { rosa: { pos: [-0.55, 0.15], giro: 22, pose: "carpeta", cara: "neutra", acciones: [{ en: "No cumple", pose: "encoge", cara: "preocupada" }] } },
        atrezo: [{ tipo: "carpeta", pos: [0.8, 1.38, -0.95], giro: -8, texto: "Carmen", marca: "✗ NO CUMPLE", colorMarca: "#c24b43", en: "No cumple" }],
      },
      html: `
        <div class="kicker">Ejemplo · Carmen</div>
        <div class="tarjeta" style="zoom:0.9">
          <div class="par" data-en="cotizó 15" data-a="sube"><span>Años cotizados</span><b>15</b></div>
          <div class="par" data-en="lo dejó hace" data-a="sube"><span>Último año cotizado</span><b>hace 20</b></div>
          <div class="par" data-en="No cumple" data-a="sube"><span>Pensión contributiva</span><b class="rojo">No</b></div>
        </div>`,
    },
    { en: "Si cumples", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon", camara: CAM.general2,
        actores: {
          luis: { pos: [-0.85, 0.5], giro: 12, pose: "piensa", cara: "neutra", acciones: [{ en: "complemento a mínimos", pose: "celebra", cara: "feliz" }] },
          rosa: { pos: [0.85, 0.5], giro: -12, pose: "senala", cara: "contenta", acciones: [{ en: "complemento a mínimos", pose: "pulgar", cara: "feliz" }] },
        },
        atrezo: [{ tipo: "monedas", en: "complemento a mínimos", n: 30 }],
      },
      html: `
        <div class="kicker">Si cumples</div>
        <div class="tarjeta" style="zoom:0.9">
          <div class="par" data-en="la mitad" data-a="sube"><span>Pensión</span><b>50 % de tu base</b></div>
          <div class="par" data-en="a los 67" data-a="sube"><span>Edad (2027)</span><b>67 años</b></div>
          <div class="par" data-en="hasta 936" data-a="sube"><span>Con complemento</span><b class="verde">hasta 936 €</b></div>
        </div>`,
    },
    { en: "Guárdatelo", clase: "arriba", transicion: "sube",
      animacion: {
        set: "salon", camara: CAM.cierre,
        actores: {
          rosa: { pos: [-0.75, 0.6], giro: 8, pose: "saluda", cara: "feliz" },
          luis: { pos: [0.95, 0.3], giro: -10, pose: "pulgar", cara: "feliz" },
        },
      },
      html: `
        <div class="cta">
          <div class="icono" data-a="latido">${GUARDAR}</div>
          <div class="titular m relieve" data-a="sube">Guárdatelo, o pásaselo a <span class="ambar">quien tenga pocos años cotizados</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Todos los casos: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. Edad de 2027 (en 2026, 66 años y 10 meses). Complemento a mínimos de 2026: 936,20 €/mes sin cónyuge, tope de 628,80 € y límite de ingresos de 9.442 €/año.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Jubilación</div>
    <div class="titular relieve" data-a="fijo">¿15 años cotizados? <span class="ambar">Ojo a la trampa</span></div>
    <div class="sub" data-a="fijo">2 tienen que ser de los últimos 15</div>`,
};
