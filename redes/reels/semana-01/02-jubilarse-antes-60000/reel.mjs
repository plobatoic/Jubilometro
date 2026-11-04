// Reel 2 · Jubilarse 2 años antes puede costar 60.000 euros
// Fuente: contenido/jubilacion/compensa-jubilarse-antes/articulo.md (ejemplo de Luis, punto de equilibrio y esperanza de vida del INE)
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;

export default {
  tema: "Jubilación anticipada",
  marcaAgua: "−60.000",
  tempo: 1.12,
  guion: `Jubilarte dos años antes puede costarte sesenta mil euros. Te enseño la cuenta.

Pongamos que Luis tiene 63 años, 39 cotizados y una base reguladora de 2.000 euros. Si se jubila ahora, el recorte es del 19 por ciento: cobra 1.620 euros en lugar de 2.000.

En esos dos años de adelanto ingresa 45.360 euros. Pero desde los 65 pierde 380 euros en cada paga. Para siempre.

A los 73 años y medio ya ha perdido todo lo que ganó. Y si vive hasta los 85, que es lo normal en un hombre de 65, pierde unos 60.000 euros.

¿Puede compensar? Sí: si no tienes otros ingresos, si tu salud no acompaña o si te han despedido.

Guárdalo antes de pedir tu jubilación.`,

  escenas: [
    { // 0 · Gancho
      html: `
        <div class="kicker" data-a="fijo">¿Jubilarte a los 63?</div>
        <div class="cifra m rojo" data-a="fijo">−60.000 €</div>
        <div class="titular s" data-a="fijo">Lo que puede costarte adelantarlo 2 años</div>
        <div class="sub" data-en="Te enseño" data-a="sube">La cuenta, paso a paso 👇</div>`,
    },
    { en: "Pongamos que Luis",
      html: `
        <div class="kicker">Caso de ejemplo · Luis</div>
        <div class="tarjeta">
          <div class="par" data-en="tiene 63" data-a="sube"><span>Edad</span><b>63 años</b></div>
          <div class="par" data-en="39 cotizados" data-a="sube"><span>Cotizados</span><b>39 años</b></div>
          <div class="par" data-en="una base reguladora" data-a="sube"><span>Base reguladora</span><b>2.000 €</b></div>
        </div>`,
    },
    { en: "Si se jubila ahora",
      html: `
        <div class="kicker">Si se jubila a los 63</div>
        <div class="cifra rojo" data-en="el recorte" data-a="pop">−19 %</div>
        <div class="titular m" data-en="cobra 1.620" data-a="sube"><span class="tachable tenue" data-en="en lugar de" data-a="tacha">2.000 €</span> → <span class="ambar">1.620 €</span></div>
        <div class="sub" data-en="cobra 1.620" data-a="sube">al mes, de por vida</div>`,
    },
    { en: "En esos dos años",
      html: `
        <div class="dos">
          <div class="caja gana" data-a="sube">
            <div class="etq">Gana</div>
            <div class="v" data-en="ingresa 45.360" data-a="cuenta" data-valor="45360" data-pre="+" data-suf=" €">+0 €</div>
            <div class="d">cobrando 2 años antes</div>
          </div>
          <div class="caja pierde" data-en="Pero desde los 65" data-a="sube">
            <div class="etq">Pierde</div>
            <div class="v" data-en="pierde 380" data-a="cuenta" data-valor="380" data-pre="−" data-suf=" €">−0 €</div>
            <div class="d">en cada paga desde los 65 (5.320 € al año)</div>
          </div>
        </div>
        <div class="sello" data-en="Para siempre" data-a="sello">Para siempre</div>`,
    },
    { en: "A los 73 años",
      html: `
        <div class="kicker">Lo ganado se agota a los…</div>
        <div class="cifra m ambar" data-a="pop">73,5 años</div>
        <div class="eje">
          <div class="barra"></div>
          <div class="relleno" data-a="eje" data-dur="1.2" data-hasta="0.48"></div>
          <div class="relleno" data-en="si vive hasta" data-a="eje" data-dur="1.4" data-hasta="1"></div>
          <div class="punto" style="left:0%"><div class="e">63</div><div class="pin" style="background:var(--verde)"></div><div class="l">se jubila</div></div>
          <div class="punto" style="left:48%"><div class="e ambar">73,5</div><div class="pin" style="background:var(--ambar)"></div><div class="l">empate</div></div>
          <div class="punto" style="left:100%;transform:translateX(-80%)"><div data-en="si vive hasta" data-a="aparece" style="display:flex;flex-direction:column;align-items:center;gap:8px"><div class="e rojo">85</div><div class="pin" style="background:var(--rojo)"></div><div class="l">esperanza<br>de vida</div></div></div>
        </div>
        <div class="titular s" data-en="pierde unos" data-a="sube">Balance: <span class="rojo" data-en="pierde unos" data-a="cuenta" data-dur="1.1" data-valor="60000" data-pre="−" data-suf=" €">−0 €</span></div>`,
    },
    { en: "¿Puede compensar?",
      html: `
        <div class="kicker">¿Puede compensar? Sí, si…</div>
        <div class="fila" data-en="si no tienes" data-a="sube"><div class="ico si">✓</div><div>No tienes otros ingresos<small>ni paro ni subsidio hasta tu edad ordinaria</small></div></div>
        <div class="fila" data-en="si tu salud" data-a="sube"><div class="ico si">✓</div><div>Tu salud no acompaña</div></div>
        <div class="fila" data-en="si te han despedido" data-a="sube"><div class="ico si">✓</div><div>Te han despedido<small>la anticipada involuntaria recorta menos</small></div></div>`,
    },
    { en: "Guárdalo",
      html: `
        <div class="cta">
          <div class="icono" data-a="pop">${GUARDAR}</div>
          <div class="titular m" data-a="sube">Guárdalo antes de pedir tu <mark>jubilación</mark></div>
          <div class="url" data-a="sube" data-dur="0.6">Calcula tu caso: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Ejemplo con 24 meses de adelanto voluntario y 14 pagas, sin revalorizaciones ni impuestos. Esperanza de vida a los 65: INE, 2024.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Jubilarse 2 años antes</div>
    <div class="cifra m rojo" data-a="fijo">−60.000 €</div>
    <div class="titular" data-a="fijo">¿Compensa?</div>
    <div class="sub" data-a="fijo">Te enseño la cuenta, euro a euro</div>`,
};
