/* El Tapete — utilidades comunes a todos los juegos */
(function () {
  'use strict';

  // Fecha de hoy en España peninsular (AAAA-MM-DD), para que el reto diario cambie a medianoche.
  function hoy() {
    try {
      const partes = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Madrid',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).formatToParts(new Date());
      const v = {};
      partes.forEach((p) => (v[p.type] = p.value));
      return `${v.year}-${v.month}-${v.day}`;
    } catch (e) {
      const d = new Date();
      return d.toISOString().slice(0, 10);
    }
  }

  // Número de día desde el lanzamiento (1 = primer reto).
  const LANZAMIENTO = Date.UTC(2026, 10, 12); // 12/11/2026
  function numeroDelDia(fecha) {
    const [a, m, d] = (fecha || hoy()).split('-').map(Number);
    return Math.floor((Date.UTC(a, m - 1, d) - LANZAMIENTO) / 86400000) + 1;
  }

  function fechaLarga(fecha) {
    const [a, m, d] = (fecha || hoy()).split('-').map(Number);
    try {
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        timeZone: 'UTC',
      }).format(new Date(Date.UTC(a, m - 1, d)));
    } catch (e) {
      return `${d}/${m}/${a}`;
    }
  }

  function fechaCorta(fecha) {
    const [, m, d] = (fecha || hoy()).split('-');
    return `${Number(d)}/${Number(m)}`;
  }

  // Generador pseudoaleatorio con semilla (mulberry32 + hash de texto).
  function semilla(texto) {
    let h1 = 0xdeadbeef ^ 0;
    let h2 = 0x41c6ce57 ^ 0;
    for (let i = 0; i < texto.length; i++) {
      const c = texto.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 2654435761);
      h2 = Math.imul(h2 ^ c, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    return h1 >>> 0;
  }

  function aleatorio(textoSemilla) {
    let a = semilla(String(textoSemilla));
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function barajar(lista, rnd) {
    const r = rnd || Math.random;
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Almacenamiento local tolerante a fallos (modo privado, bloqueos...).
  const guardado = {
    leer(clave, porDefecto) {
      try {
        const v = localStorage.getItem('tapete:' + clave);
        return v === null ? porDefecto : JSON.parse(v);
      } catch (e) {
        return porDefecto;
      }
    },
    escribir(clave, valor) {
      try {
        localStorage.setItem('tapete:' + clave, JSON.stringify(valor));
      } catch (e) {
        /* sin almacenamiento: el juego sigue funcionando */
      }
    },
    borrar(clave) {
      try {
        localStorage.removeItem('tapete:' + clave);
      } catch (e) {}
    },
  };

  // Estadísticas y racha de retos diarios por juego.
  function registrarReto(juego, fecha, datos) {
    const st = guardado.leer('estad:' + juego, { jugados: 0, ganados: 0, racha: 0, mejorRacha: 0, ultimo: null, historial: {} });
    if (st.historial[fecha]) return st;
    st.historial[fecha] = datos || { ok: true };
    st.jugados += 1;
    if (!datos || datos.ok !== false) {
      st.ganados += 1;
      const ayer = sumarDias(fecha, -1);
      st.racha = st.ultimo === ayer ? st.racha + 1 : 1;
      st.mejorRacha = Math.max(st.mejorRacha, st.racha);
      st.ultimo = fecha;
    } else {
      st.racha = 0;
    }
    // Mantener solo los últimos 120 días.
    const claves = Object.keys(st.historial).sort();
    while (claves.length > 120) delete st.historial[claves.shift()];
    guardado.escribir('estad:' + juego, st);
    return st;
  }

  function estadisticas(juego) {
    return guardado.leer('estad:' + juego, { jugados: 0, ganados: 0, racha: 0, mejorRacha: 0, ultimo: null, historial: {} });
  }

  function sumarDias(fecha, n) {
    const [a, m, d] = fecha.split('-').map(Number);
    const t = new Date(Date.UTC(a, m - 1, d) + n * 86400000);
    return t.toISOString().slice(0, 10);
  }

  function tiempo(seg) {
    seg = Math.max(0, Math.floor(seg));
    const h = Math.floor(seg / 3600);
    const m = Math.floor((seg % 3600) / 60);
    const s = seg % 60;
    const mm = h ? String(m).padStart(2, '0') : String(m);
    return (h ? h + ':' : '') + mm + ':' + String(s).padStart(2, '0');
  }

  // Cronómetro que se pausa cuando la pestaña no está visible.
  function cronometro(alCambiar, inicial) {
    let acumulado = inicial || 0;
    let desde = null;
    let intervalo = null;
    function valor() {
      return acumulado + (desde ? (Date.now() - desde) / 1000 : 0);
    }
    function tic() {
      alCambiar(valor());
    }
    const c = {
      iniciar() {
        if (desde) return;
        desde = Date.now();
        intervalo = setInterval(tic, 1000);
        tic();
      },
      parar() {
        if (!desde) return;
        acumulado = valor();
        desde = null;
        clearInterval(intervalo);
        tic();
      },
      reiniciar(v) {
        c.parar();
        acumulado = v || 0;
        tic();
      },
      valor,
      enMarcha: () => !!desde,
    };
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && desde) {
        c.parar();
        c._pausadoPorOculto = true;
      } else if (!document.hidden && c._pausadoPorOculto) {
        c._pausadoPorOculto = false;
        c.iniciar();
      }
    });
    return c;
  }

  let temporizadorAviso = null;
  function aviso(texto) {
    const el = document.getElementById('aviso');
    if (!el) return;
    el.textContent = texto;
    el.classList.add('visible');
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => el.classList.remove('visible'), 2600);
  }

  async function compartir(texto) {
    const datos = { text: texto };
    try {
      if (navigator.share && /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)) {
        await navigator.share(datos);
        return;
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
    try {
      await navigator.clipboard.writeText(texto);
      aviso('Resultado copiado. ¡Pégalo donde quieras!');
    } catch (e) {
      window.prompt('Copia tu resultado:', texto);
    }
  }

  // Diálogo modal reutilizable.
  function dialogo(html, botones) {
    let d = document.getElementById('dialogo-tapete');
    if (!d) {
      d = document.createElement('dialog');
      d.id = 'dialogo-tapete';
      d.className = 'dialogo';
      document.body.appendChild(d);
      d.addEventListener('click', (e) => {
        if (e.target === d) d.close();
      });
    }
    d.innerHTML = `<div class="dialogo-cuerpo">${html}<div class="dialogo-botones"></div></div>`;
    const zona = d.querySelector('.dialogo-botones');
    (botones || [{ texto: 'Cerrar', principal: true }]).forEach((b) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'boton' + (b.principal ? ' boton-principal' : '');
      btn.textContent = b.texto;
      btn.addEventListener('click', () => {
        if (!b.mantener) d.close();
        if (b.accion) b.accion();
      });
      zona.appendChild(btn);
    });
    if (typeof d.showModal === 'function') {
      if (d.open) d.close();
      d.showModal();
    } else {
      d.setAttribute('open', '');
    }
    return d;
  }

  function quitarTildes(s) {
    return s
      .replace(/ñ/g, '\u0001')
      .replace(/Ñ/g, '\u0002')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/\u0001/g, 'ñ')
      .replace(/\u0002/g, 'Ñ');
  }

  window.Tapete = {
    hoy,
    numeroDelDia,
    fechaLarga,
    fechaCorta,
    sumarDias,
    aleatorio,
    barajar,
    guardado,
    registrarReto,
    estadisticas,
    tiempo,
    cronometro,
    aviso,
    compartir,
    dialogo,
    quitarTildes,
  };

  // Portada: marcar los retos de hoy ya completados.
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-reto]').forEach((el) => {
      const st = estadisticas(el.getAttribute('data-reto'));
      const estado = el.querySelector('.estado-reto');
      if (!estado) return;
      if (st.historial && st.historial[hoy()]) {
        estado.textContent = '✓ Hecho hoy' + (st.racha > 1 ? ` · racha de ${st.racha} días` : '');
      } else {
        estado.textContent = 'Reto de hoy disponible';
      }
    });
    document.querySelectorAll('[data-fecha-hoy]').forEach((el) => {
      const f = fechaLarga();
      el.textContent = f.charAt(0).toUpperCase() + f.slice(1);
    });
  });
})();
