/* El Tapete — Sudoku */
(function (raiz) {
  'use strict';

  // ---------- Lógica (sin DOM; se prueba también en Node) ----------
  const FILA = (i) => Math.floor(i / 9);
  const COL = (i) => i % 9;
  const CAJA = (i) => Math.floor(FILA(i) / 3) * 3 + Math.floor(COL(i) / 3);

  // Para cada casilla, sus 20 «vecinas» (misma fila, columna o caja).
  const VECINAS = [];
  for (let i = 0; i < 81; i++) {
    const v = new Set();
    for (let j = 0; j < 81; j++) {
      if (j !== i && (FILA(j) === FILA(i) || COL(j) === COL(i) || CAJA(j) === CAJA(i))) v.add(j);
    }
    VECINAS.push([...v]);
  }

  const bits = (m) => {
    let n = 0;
    while (m) {
      m &= m - 1;
      n++;
    }
    return n;
  };

  // Cuenta soluciones hasta `limite` (rellena `salida` con la primera encontrada).
  function contarSoluciones(tablero, limite, salida) {
    const t = tablero.slice();
    const filas = new Array(9).fill(0);
    const cols = new Array(9).fill(0);
    const cajas = new Array(9).fill(0);
    for (let i = 0; i < 81; i++) {
      const v = t[i];
      if (v) {
        const b = 1 << v;
        if (filas[FILA(i)] & b || cols[COL(i)] & b || cajas[CAJA(i)] & b) return 0;
        filas[FILA(i)] |= b;
        cols[COL(i)] |= b;
        cajas[CAJA(i)] |= b;
      }
    }
    let total = 0;
    function resolver() {
      // Elegir la casilla vacía con menos candidatos.
      let mejor = -1;
      let mejorMask = 0;
      let mejorN = 10;
      for (let i = 0; i < 81; i++) {
        if (t[i]) continue;
        const mask = ~(filas[FILA(i)] | cols[COL(i)] | cajas[CAJA(i)]) & 0x3fe;
        const n = bits(mask);
        if (n < mejorN) {
          mejor = i;
          mejorMask = mask;
          mejorN = n;
          if (n <= 1) break;
        }
      }
      if (mejor === -1) {
        total++;
        if (salida && total === 1) for (let i = 0; i < 81; i++) salida[i] = t[i];
        return total >= limite;
      }
      if (mejorN === 0) return false;
      const f = FILA(mejor);
      const c = COL(mejor);
      const k = CAJA(mejor);
      for (let v = 1; v <= 9; v++) {
        const b = 1 << v;
        if (!(mejorMask & b)) continue;
        t[mejor] = v;
        filas[f] |= b;
        cols[c] |= b;
        cajas[k] |= b;
        if (resolver()) return true;
        filas[f] &= ~b;
        cols[c] &= ~b;
        cajas[k] &= ~b;
        t[mejor] = 0;
      }
      return false;
    }
    resolver();
    return total;
  }

  function solucionCompleta(rnd) {
    const t = new Array(81).fill(0);
    const orden = [];
    function intentar(i) {
      if (i === 81) return true;
      const usados = new Set(VECINAS[i].map((j) => t[j]));
      const cand = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((v) => !usados.has(v));
      for (let a = cand.length - 1; a > 0; a--) {
        const b = Math.floor(rnd() * (a + 1));
        [cand[a], cand[b]] = [cand[b], cand[a]];
      }
      for (const v of cand) {
        t[i] = v;
        if (intentar(i + 1)) return true;
      }
      t[i] = 0;
      return false;
    }
    intentar(0);
    return t;
  }

  const NIVELES = {
    facil: { nombre: 'Fácil', pistas: 40 },
    media: { nombre: 'Media', pistas: 33 },
    dificil: { nombre: 'Difícil', pistas: 28 },
    experto: { nombre: 'Experto', pistas: 24 },
  };

  // Genera un sudoku con solución única y simetría central.
  function generar(rnd, nivel) {
    const objetivo = (NIVELES[nivel] || NIVELES.media).pistas;
    const solucion = solucionCompleta(rnd);
    const puzle = solucion.slice();
    const orden = [];
    for (let i = 0; i <= 40; i++) orden.push(i);
    for (let a = orden.length - 1; a > 0; a--) {
      const b = Math.floor(rnd() * (a + 1));
      [orden[a], orden[b]] = [orden[b], orden[a]];
    }
    let pistas = 81;
    for (const i of orden) {
      if (pistas <= objetivo) break;
      const j = 80 - i;
      const vi = puzle[i];
      const vj = puzle[j];
      if (!vi) continue;
      puzle[i] = 0;
      puzle[j] = 0;
      const quitadas = i === j ? 1 : 2;
      if (pistas - quitadas < objetivo - 1 || contarSoluciones(puzle, 2) !== 1) {
        puzle[i] = vi;
        puzle[j] = vj;
      } else {
        pistas -= quitadas;
      }
    }
    return { puzle, solucion, pistas };
  }

  const logica = { generar, contarSoluciones, NIVELES, VECINAS, FILA, COL, CAJA };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = logica;
    return;
  }
  raiz.SudokuLogica = logica;

  // ---------- Interfaz ----------
  document.addEventListener('DOMContentLoaded', iniciar);

  function iniciar() {
    const T = window.Tapete;
    const zona = document.getElementById('sudoku');
    if (!zona) return;
    const tableroEl = zona.querySelector('.sudoku-tablero');
    const tecladoEl = zona.querySelector('.teclado-numeros');
    const relojEl = zona.querySelector('[data-reloj]');
    const erroresEl = zona.querySelector('[data-errores]');
    const tituloEl = zona.querySelector('[data-titulo-partida]');
    const btnNotas = zona.querySelector('[data-accion="notas"]');
    const chkErrores = zona.querySelector('[data-mostrar-errores]');

    let estado = null;
    let seleccion = -1;
    let clave = '';
    const reloj = T.cronometro((s) => {
      relojEl.textContent = T.tiempo(s);
      if (estado && !estado.terminado && Math.floor(s) % 5 === 0) guardar();
    });

    // Celdas
    const celdas = [];
    for (let i = 0; i < 81; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `sudoku-celda f${FILA(i)} c${COL(i)}`;
      b.dataset.i = i;
      b.setAttribute('aria-label', `Fila ${FILA(i) + 1}, columna ${COL(i) + 1}`);
      b.addEventListener('click', () => seleccionar(i));
      tableroEl.appendChild(b);
      celdas.push(b);
    }
    // Teclado numérico
    const teclas = [];
    for (let v = 1; v <= 9; v++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tecla-num';
      b.innerHTML = `${v}<small></small>`;
      b.setAttribute('aria-label', `Número ${v}`);
      b.addEventListener('click', () => poner(v));
      tecladoEl.appendChild(b);
      teclas.push(b);
    }

    zona.querySelectorAll('[data-nivel]').forEach((b) =>
      b.addEventListener('click', () => {
        const modo = zona.dataset.modo;
        cargar(modo, b.dataset.nivel);
      }),
    );
    zona.querySelectorAll('[data-modo]').forEach((b) =>
      b.addEventListener('click', () => {
        if (b.tagName !== 'BUTTON') return;
        cargar(b.dataset.modo, zona.dataset.nivel);
      }),
    );
    zona.querySelector('[data-accion="borrar"]').addEventListener('click', borrar);
    zona.querySelector('[data-accion="deshacer"]').addEventListener('click', deshacer);
    zona.querySelector('[data-accion="pista"]').addEventListener('click', pista);
    btnNotas.addEventListener('click', () => {
      estado.notasActivas = !estado.notasActivas;
      pintar();
    });
    zona.querySelector('[data-accion="nuevo"]').addEventListener('click', () => {
      if (zona.dataset.modo === 'diario') cargar('libre', zona.dataset.nivel);
      else cargar('libre', zona.dataset.nivel, true);
    });
    chkErrores.checked = T.guardado.leer('sudoku:mostrarErrores', true);
    chkErrores.addEventListener('change', () => {
      T.guardado.escribir('sudoku:mostrarErrores', chkErrores.checked);
      pintar();
    });

    document.addEventListener('keydown', (e) => {
      if (!estado || e.ctrlKey || e.metaKey || e.altKey) return;
      if (document.querySelector('dialog[open]')) return;
      const k = e.key;
      if (/^[1-9]$/.test(k)) {
        poner(Number(k));
        e.preventDefault();
      } else if (k === 'Backspace' || k === 'Delete' || k === '0') {
        borrar();
        e.preventDefault();
      } else if (k === 'n' || k === 'N') {
        estado.notasActivas = !estado.notasActivas;
        pintar();
      } else if (k === 'z' || k === 'Z') {
        deshacer();
      } else if (k.startsWith('Arrow')) {
        if (seleccion < 0) seleccion = 40;
        let f = FILA(seleccion);
        let c = COL(seleccion);
        if (k === 'ArrowUp') f = (f + 8) % 9;
        if (k === 'ArrowDown') f = (f + 1) % 9;
        if (k === 'ArrowLeft') c = (c + 8) % 9;
        if (k === 'ArrowRight') c = (c + 1) % 9;
        seleccionar(f * 9 + c);
        celdas[seleccion].focus();
        e.preventDefault();
      }
    });

    function cargar(modo, nivel, forzarNuevo) {
      if (estado && !estado.terminado) guardar();
      reloj.parar();
      nivel = NIVELES[nivel] ? nivel : 'media';
      zona.dataset.modo = modo;
      zona.dataset.nivel = nivel;
      T.guardado.escribir('sudoku:ultimo', { modo, nivel });
      zona.querySelectorAll('button[data-modo]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.modo === modo)));
      zona.querySelectorAll('[data-nivel]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.nivel === nivel)));
      const fecha = T.hoy();
      if (modo === 'diario') {
        clave = `sudoku:dia:${fecha}:${nivel}`;
      } else {
        clave = `sudoku:libre:${nivel}`;
      }
      let guardadoPrevio = forzarNuevo ? null : T.guardado.leer(clave, null);
      if (guardadoPrevio && modo === 'libre' && guardadoPrevio.terminado) guardadoPrevio = null;
      if (guardadoPrevio && guardadoPrevio.puzle) {
        estado = guardadoPrevio;
      } else {
        const semilla = modo === 'diario' ? `sudoku-${fecha}-${nivel}` : `sudoku-libre-${Date.now()}-${Math.random()}`;
        const g = generar(T.aleatorio(semilla), nivel);
        estado = {
          puzle: g.puzle,
          solucion: g.solucion,
          valores: g.puzle.slice(),
          notas: new Array(81).fill(0),
          historial: [],
          errores: 0,
          pistasUsadas: [],
          tiempo: 0,
          terminado: false,
          notasActivas: false,
          fecha,
          modo,
          nivel,
        };
      }
      tituloEl.textContent =
        modo === 'diario'
          ? `Sudoku del día · ${NIVELES[nivel].nombre} · ${T.fechaCorta(fecha)}`
          : `Sudoku libre · ${NIVELES[nivel].nombre}`;
      seleccion = -1;
      reloj.reiniciar(estado.tiempo || 0);
      if (!estado.terminado) reloj.iniciar();
      pintar();
    }

    function guardar() {
      if (!estado) return;
      estado.tiempo = reloj.valor();
      T.guardado.escribir(clave, estado);
    }

    function seleccionar(i) {
      seleccion = i;
      pintar();
    }

    function apuntar(cambio) {
      estado.historial.push(cambio);
      if (estado.historial.length > 300) estado.historial.shift();
    }

    function poner(v) {
      if (!estado || estado.terminado || seleccion < 0) return;
      const i = seleccion;
      if (estado.puzle[i] || estado.pistasUsadas.includes(i)) return;
      if (estado.notasActivas) {
        if (estado.valores[i]) return;
        apuntar({ i, valor: estado.valores[i], notas: estado.notas[i] });
        estado.notas[i] ^= 1 << v;
      } else {
        if (estado.valores[i] === v) return;
        apuntar({ i, valor: estado.valores[i], notas: estado.notas[i], vecinas: VECINAS[i].map((j) => [j, estado.notas[j]]) });
        estado.valores[i] = v;
        estado.notas[i] = 0;
        // Quitar ese número de las notas de las vecinas.
        VECINAS[i].forEach((j) => (estado.notas[j] &= ~(1 << v)));
        if (v !== estado.solucion[i]) {
          estado.errores++;
        }
      }
      pintar();
      comprobarFin();
      guardar();
    }

    function borrar() {
      if (!estado || estado.terminado || seleccion < 0) return;
      const i = seleccion;
      if (estado.puzle[i] || estado.pistasUsadas.includes(i)) return;
      if (!estado.valores[i] && !estado.notas[i]) return;
      apuntar({ i, valor: estado.valores[i], notas: estado.notas[i] });
      estado.valores[i] = 0;
      estado.notas[i] = 0;
      pintar();
      guardar();
    }

    function deshacer() {
      if (!estado || estado.terminado) return;
      const c = estado.historial.pop();
      if (!c) {
        T.aviso('No hay nada que deshacer');
        return;
      }
      estado.valores[c.i] = c.valor;
      estado.notas[c.i] = c.notas;
      if (c.vecinas) c.vecinas.forEach(([j, n]) => (estado.notas[j] = n));
      seleccion = c.i;
      pintar();
      guardar();
    }

    function pista() {
      if (!estado || estado.terminado) return;
      let i = seleccion;
      if (i < 0 || estado.valores[i] === estado.solucion[i]) {
        // Buscar la casilla vacía o errónea con menos candidatos.
        const candidatas = [];
        for (let j = 0; j < 81; j++) if (estado.valores[j] !== estado.solucion[j]) candidatas.push(j);
        if (!candidatas.length) return;
        i = candidatas[0];
      }
      apuntar({ i, valor: estado.valores[i], notas: estado.notas[i] });
      estado.valores[i] = estado.solucion[i];
      estado.notas[i] = 0;
      VECINAS[i].forEach((j) => (estado.notas[j] &= ~(1 << estado.solucion[i])));
      estado.pistasUsadas.push(i);
      seleccion = i;
      T.aviso('Pista: casilla rellenada');
      pintar();
      comprobarFin();
      guardar();
    }

    function comprobarFin() {
      for (let i = 0; i < 81; i++) if (estado.valores[i] !== estado.solucion[i]) return;
      estado.terminado = true;
      reloj.parar();
      estado.tiempo = reloj.valor();
      guardar();
      const t = T.tiempo(estado.tiempo);
      let racha = '';
      if (estado.modo === 'diario') {
        const st = T.registrarReto('sudoku', estado.fecha, { ok: true, nivel: estado.nivel, tiempo: Math.round(estado.tiempo) });
        racha = st.racha > 1 ? `<p>Llevas <strong>${st.racha} días seguidos</strong> resolviendo el sudoku del día.</p>` : '';
      }
      const nivelNombre = NIVELES[estado.nivel].nombre;
      const texto =
        estado.modo === 'diario'
          ? `🧩 Sudoku del día ${T.fechaCorta(estado.fecha)} (${nivelNombre}) resuelto en ${t}${estado.errores ? ` con ${estado.errores} ${estado.errores === 1 ? 'error' : 'errores'}` : ' sin errores'}.\n¿Lo mejoras? https://eltapete.com/sudoku/`
          : `🧩 He resuelto un sudoku ${nivelNombre.toLowerCase()} en ${t} en El Tapete. https://eltapete.com/sudoku/`;
      setTimeout(() => {
        T.dialogo(
          `<h2>¡Sudoku resuelto!</h2>
           <p>Nivel <strong>${nivelNombre}</strong> en <strong>${t}</strong>.</p>
           <p>Errores: ${estado.errores} · Pistas: ${estado.pistasUsadas.length}</p>${racha}`,
          [
            { texto: 'Compartir resultado', principal: true, accion: () => T.compartir(texto), mantener: true },
            {
              texto: estado.modo === 'diario' ? 'Jugar uno libre' : 'Otro sudoku',
              accion: () => cargar('libre', estado.nivel, true),
            },
            { texto: 'Cerrar' },
          ],
        );
      }, 350);
      pintar();
    }

    function pintar() {
      if (!estado) return;
      const mostrarErrores = chkErrores.checked;
      const vSel = seleccion >= 0 ? estado.valores[seleccion] : 0;
      const cuenta = new Array(10).fill(0);
      for (let i = 0; i < 81; i++) {
        const b = celdas[i];
        const v = estado.valores[i];
        if (v && v === estado.solucion[i]) cuenta[v]++;
        const dada = !!estado.puzle[i];
        b.className = `sudoku-celda f${FILA(i)} c${COL(i)}`;
        if (dada) b.classList.add('dada');
        if (estado.pistasUsadas.includes(i)) b.classList.add('pista-dada');
        if (seleccion >= 0) {
          if (i === seleccion) b.classList.add('seleccionada');
          else if (vSel && v === vSel) b.classList.add('mismo');
          else if (FILA(i) === FILA(seleccion) || COL(i) === COL(seleccion) || CAJA(i) === CAJA(seleccion)) b.classList.add('zona');
        }
        if (mostrarErrores && v && !dada && v !== estado.solucion[i]) b.classList.add('error');
        if (v) {
          b.textContent = v;
        } else if (estado.notas[i]) {
          let h = '<span class="sudoku-notas" aria-hidden="true">';
          for (let n = 1; n <= 9; n++) h += `<span>${estado.notas[i] & (1 << n) ? n : ''}</span>`;
          b.innerHTML = h + '</span>';
        } else {
          b.textContent = '';
        }
        b.setAttribute('aria-label', `Fila ${FILA(i) + 1}, columna ${COL(i) + 1}${v ? ', ' + v : ', vacía'}${dada ? ' (fija)' : ''}`);
      }
      teclas.forEach((t, k) => {
        const n = k + 1;
        const quedan = 9 - cuenta[n];
        t.classList.toggle('agotada', quedan <= 0);
        t.querySelector('small').textContent = quedan > 0 ? quedan : '';
      });
      btnNotas.setAttribute('aria-pressed', String(!!estado.notasActivas));
      btnNotas.querySelector('span').textContent = estado.notasActivas ? 'Notas: sí' : 'Notas: no';
      erroresEl.textContent = estado.errores;
      zona.classList.toggle('terminado', !!estado.terminado);
    }

    const previo = T.guardado.leer('sudoku:ultimo', { modo: 'diario', nivel: 'media' });
    const params = new URLSearchParams(location.search);
    const nivelUrl = params.get('nivel');
    cargar(params.get('modo') === 'libre' ? 'libre' : previo.modo || 'diario', nivelUrl || previo.nivel || 'media');
    window.addEventListener('pagehide', guardar);
    raiz.__sudoku = { estado: () => estado, poner, seleccionar };
  }
})(typeof window !== 'undefined' ? window : globalThis);
