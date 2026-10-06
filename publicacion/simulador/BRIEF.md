# Simulador de jubilación animado · brief de diseño y movimiento

**URL**: /calculadoras/simulador-jubilacion/ · **Palabra clave**: simulador de jubilación
**Promesa (una frase)**: con tres datos ves tu jubilación entera, de la fecha al dinero que llega al banco, y puedes moverla con el dedo.

## Para quién
Personas de 50 a 66 años que buscan «cuándo me jubilo» y «cuánto cobraré», muchas desde el móvil. Lectura en voz baja, sin prisa, con miedo a equivocarse: claridad antes que espectáculo.

## Elemento firma
**La cinta de la vida laboral**: una sola forma (una línea horizontal por edades) que aparece en la cabecera, se convierte en el deslizador de «Elige tu momento» y acaba en la libreta del resumen. Todo lo demás es tranquilo.

## Capítulos (estados)
1. **Cuándo**: edad y mes exactos (motor `JM.edad`), por qué (vía general o carrera larga) y una cuenta atrás en un panel de tablillas (estilo estación antigua, ligado a la atmósfera vintage del tema).
2. **Cuánto**: pensión bruta (`JM.pension`, sistema dual): base reguladora × porcentaje por años cotizados = pensión, con su sitio entre la mínima y la máxima.
3. **Elige tu momento**: deslizador mes a mes, de la anticipada más temprana posible a 5 años de demora (`JM.anticipada`, `JM.demorada`), con el gráfico de lo cobrado en total hasta los 90 y el punto en que una opción alcanza a la otra.
4. **Lo que llega al banco**: neto tras el IRPF de tu comunidad (`JM.neto`) con la opción elegida.
5. **Tu resumen**: libreta con sello y enlace para compartir (los datos viajan en el `#` de la URL, nunca al servidor).

## Reglas de movimiento
- Nada se oculta esperando al scroll (lección del tema 2.7.1): el texto está siempre visible; se animan las cifras, los gráficos y lo que tocas.
- Muelles críticos (k 170, c 26, sin rebote) para cifras y medidores; trazado de la cinta 900 ms una sola vez; tablillas que giran 260 ms; un solo acento (azul de la marca).
- Una cosa se mueve cada vez. Sin partículas, sin degradados arcoíris, sin giros 3D gratuitos.
- `prefers-reduced-motion`: todo instantáneo, sin pulso ni tablillas giratorias. La cuenta atrás se pausa fuera de pantalla y con la pestaña oculta.

## Datos y honestidad
- Todas las cifras salen de `calculadoras.js` (CFG 2026, LGSS). Supuestos visibles: base constante, sin lagunas, euros de hoy sin revalorización en el acumulado, sin el sueldo que se deja de cobrar.
- Gráfico: 2 series validadas con `dataviz/validate_palette.js` (azul #1D4ED8 tu elección, naranja #C2410C ordinaria; pasa CVD, normal y contraste sobre blanco), leyenda, etiquetas directas, tabla equivalente y cursor por teclado.

## Comprobación
Capturas a 390, 768 y 1440 px, axe sin errores, sin desbordes horizontales, Lighthouse sin regresión, prueba con movimiento reducido y sin JavaScript (se ve el ejemplo).
