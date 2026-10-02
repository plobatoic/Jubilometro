/* Jubilómetro · calculadoras para otras webs (https://jubilometro.com/calculadoras/para-tu-web/)
   Script opcional: ajusta la altura de los iframes de Jubilómetro a su contenido. No usa cookies
   ni envía datos: solo pide y recibe la altura de la propia calculadora. */
(function () {
  'use strict';
  if (window.jubilometroInsertar) return;
  window.jubilometroInsertar = true;
  var ORIGEN = 'https://jubilometro.com';
  function marcos() { return document.querySelectorAll('iframe[src^="' + ORIGEN + '/"]'); }
  window.addEventListener('message', function (e) {
    if (e.origin !== ORIGEN || !e.data || e.data.jubilometro !== 'alto') return;
    var m = marcos();
    for (var i = 0; i < m.length; i++) {
      if (m[i].contentWindow === e.source) m[i].style.height = Math.min(Math.max(Number(e.data.alto) || 0, 320), 4000) + 'px';
    }
  });
  // Pide la altura a las calculadoras ya cargadas y a las que carguen después
  function pedir() {
    var m = marcos();
    for (var i = 0; i < m.length; i++) {
      if (!m[i].jubilometro) { m[i].jubilometro = true; m[i].addEventListener('load', pedir); }
      try { m[i].contentWindow.postMessage({ jubilometro: 'pide-alto' }, ORIGEN); } catch (e) { /* aún sin cargar */ }
    }
  }
  pedir();
  document.addEventListener('DOMContentLoaded', pedir);
  window.addEventListener('load', pedir);
})();
