// Reel 3 · 15 años cotizados y sin pensión: la regla de los 2 años en los últimos 15
// Fuentes: contenido/jubilacion/15-anos-cotizados/articulo.md (requisitos y ejemplo de Carmen)
//          contenido/jubilacion/convenio-especial/articulo.md (1.080 días en los 12 años anteriores a la baja)
const ENVIAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`;

export default {
  tema: "Años cotizados",
  marcaAgua: "15",
  tempo: 1.12,
  guion: `Puedes tener 15 años cotizados y quedarte sin pensión de jubilación.

Los 15 años son el mínimo, sí. Pero hay una segunda regla: al menos 2 de esos años tienen que estar dentro de los 15 años anteriores a tu jubilación.

Pongamos a Carmen. Cotizó 15 años de joven y dejó de cotizar hace 20. No cumple la regla. Se queda sin pensión contributiva.

Si es tu caso, hay salidas: volver a trabajar y cotizar 2 años antes de jubilarte o, si tus ingresos son bajos, pedir la pensión no contributiva. Y si acabas de dejar de trabajar, aún estás a tiempo de firmar un convenio especial.

Lo primero: pide tu vida laboral y mira tus últimos 15 años.

Envíaselo a quien dejó de trabajar hace tiempo.`,

  escenas: [
    { // 0 · Gancho
      html: `
        <div class="kicker" data-a="fijo">Ojo con esta regla</div>
        <div class="titular" data-a="fijo">15 años cotizados <span class="rojo">≠</span> pensión asegurada</div>
        <div class="sub" data-en="quedarte sin" data-a="sube">Hay un requisito que se olvida</div>`,
    },
    { en: "Los 15 años son",
      html: `
        <div class="kicker">Para cobrar pensión de jubilación</div>
        <div class="fila" data-a="sube"><div class="ico n">1</div><div>15 años cotizados<small>es el mínimo</small></div></div>
        <div class="fila" data-en="Pero hay una segunda" data-a="sube"><div class="ico n">2</div><div>Y <mark>2 de ellos</mark> dentro de los últimos 15 antes de jubilarte</div></div>
        <div data-en="al menos 2" data-a="sube" style="display:flex;flex-direction:column;gap:30px">
          <div class="regla">
            <div class="seg" style="left:0;width:84%;color:var(--tenue)">últimos 15 años</div>
            <div class="seg" data-en="tienen que estar" data-a="ancho" data-ancho="16" data-dur="0.8" style="right:0;width:0;background:rgba(111,211,160,0.32);color:var(--verde);overflow:hidden">2 años</div>
          </div>
          <div class="regla-pie"><span>hace 15 años</span><span>jubilación</span></div>
        </div>`,
    },
    { en: "Pongamos a Carmen",
      html: `
        <div class="kicker">Caso de ejemplo · Carmen</div>
        <div style="display:flex;flex-direction:column;gap:30px">
          <div class="regla">
            <div class="seg" data-en="Cotizó 15 años" data-a="ancho" data-ancho="43" data-dur="0.7" style="left:0;width:0;background:rgba(127,177,234,0.35);color:var(--tinta);overflow:hidden">15 años</div>
            <div class="seg" data-en="No cumple" data-a="aparece" style="right:0;width:43%;border-left:4px dashed var(--rojo);background:rgba(255,122,112,0.12);color:var(--rojo)">últimos 15: 0</div>
          </div>
          <div class="regla-pie"><span>de joven</span><span data-en="dejó de cotizar" data-a="aparece">20 años sin cotizar</span><span>jubilación</span></div>
        </div>
        <div class="sello" data-en="Se queda sin" data-a="sello">Sin pensión</div>
        <div class="nota centro" data-en="pensión contributiva" data-a="aparece" style="align-self:center">contributiva de jubilación</div>`,
    },
    { en: "Si es tu caso",
      html: `
        <div class="kicker">Si es tu caso, hay salidas</div>
        <div class="paso" data-en="volver a trabajar" data-a="sube"><div class="num">1</div><div class="tx">Volver a cotizar 2 años<small>trabajando, antes de jubilarte</small></div></div>
        <div class="paso" data-en="si tus ingresos" data-a="sube"><div class="num">2</div><div class="tx">Pensión no contributiva<small>desde los 65, con ingresos bajos y residencia en España</small></div></div>
        <div class="paso" data-en="Y si acabas" data-a="sube"><div class="num">3</div><div class="tx">¿Acabas de dejar de trabajar? Convenio especial<small>si cotizaste 1.080 días en los 12 años previos y lo pides en el año siguiente</small></div></div>`,
    },
    { en: "Lo primero",
      html: `
        <div class="kicker">Lo primero</div>
        <div class="titular m" data-en="pide tu vida" data-a="sube">Pide tu <mark>informe de vida laboral</mark></div>
        <div class="fila" data-en="y mira tus" data-a="sube"><div class="ico si">✓</div><div>Cuenta lo cotizado en tus últimos 15 años</div></div>
        <div class="nota" data-en="y mira tus" data-a="aparece">Se descarga al momento en Import@ss, con SMS, Cl@ve o certificado digital.</div>`,
    },
    { en: "Envíaselo",
      html: `
        <div class="cta">
          <div class="icono" data-a="pop">${ENVIAR}</div>
          <div class="titular m" data-a="sube">Envíaselo a quien dejó de trabajar <mark>hace tiempo</mark></div>
          <div class="url" data-a="sube" data-dur="0.6">Más casos en jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general (art. 205 de la Ley General de la Seguridad Social). Confirma tu caso con la Seguridad Social.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Ojo con esta regla</div>
    <div class="cifra xl" data-a="fijo">15 años</div>
    <div class="titular" data-a="fijo">cotizados… y <span class="rojo">sin pensión</span></div>
    <div class="sub" data-a="fijo">El requisito que casi nadie revisa</div>`,
};
