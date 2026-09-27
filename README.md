# Jubilómetro

Contenidos y herramientas de Jubilómetro, web de referencia sobre jubilación y pensiones en España.

## Estructura

```
contenido/<categoría>/<slug>/    Un artículo por carpeta; la ruta coincide con su URL
  articulo.md                    Versión maestra (texto + ficha de publicación en el front matter)
  articulo.html                  Versión maquetada, generada: HTML semántico, metaetiquetas, JSON-LD y calculadora
  verificacion-fuentes.md        Cada dato del artículo con su fuente, para la verificación en el BOE
  ficha-seo.md, imagenes/, descargas/   Solo en los artículos que los necesitan
herramientas/
  edad-jubilacion/               Lógica de la edad de jubilación (DT 7.ª LGSS), tests y widget de calculadora
  compensa/                      Calculadora de «¿compensa jubilarse antes?»
  graficos/                      Generación y rasterizado de gráficos
  checklist/                     Lista de documentos en PDF para descargar
  publicar/                      Generador de HTML, archivo de importación de WordPress y comprobaciones
paginas/<slug>/pagina.md         Páginas de confianza del sitio (Quiénes somos, Política editorial, Contacto, Aviso legal, Privacidad, Cookies)
publicacion/
  wordpress-borradores.xml       Las 22 páginas como borradores para Herramientas > Importar > WordPress
  wordpress-paginas.xml          Las 6 páginas de confianza como páginas de WordPress en borrador
  PLAN-PUBLICACION.md            Lista previa, orden de revisión, importación, lanzamiento y mantenimiento
```

### Convenciones del Markdown

- Una cita que empieza por **Respuesta rápida** se convierte en la caja de respuesta rápida; el resto de citas, en cajas de aviso.
- `<!-- tabla: Título -->` antes de una tabla le pone título (`<caption>`).
- `<!-- calculadora:nombre -->` inserta `herramientas/nombre/widget-calculadora.html`.
- Los enlaces internos a páginas que aún no existen se publican como texto plano y se activan solos al crear la página.

## Artículos

Categoría 1 «Jubilación» del informe de nicho, completa. Todas las páginas están en **borrador pendiente de revisión profesional**: ver `publicacion/PLAN-PUBLICACION.md`.

| N.º del plan | Título (H1) | URL |
|---|---|---|
| 1 | Edad de jubilación en 2027: tabla por año de nacimiento y años cotizados | `/jubilacion/edad-de-jubilacion/` |
| 2 | Jubilación anticipada voluntaria: requisitos, coeficientes reductores y ejemplos con cifras | `/jubilacion/anticipada-voluntaria/` |
| 3 | Jubilación anticipada involuntaria por despido o ERE: requisitos y cuánto se pierde | `/jubilacion/anticipada-involuntaria/` |
| 4 | ¿Compensa jubilarse antes? Comparativa real a los 63, 64 y 65 años | `/jubilacion/compensa-jubilarse-antes/` |
| 5 | Jubilación demorada: cuánto sube tu pensión por cada año extra (porcentaje, cheque o mixto) | `/jubilacion/demorada/` |
| 6 | Jubilación flexible 2026: qué cambia con el Real Decreto 416/2026 y a quién le interesa | `/jubilacion/flexible/` |
| 7 | Jubilación activa: requisitos y qué parte de la pensión cobras si sigues trabajando | `/jubilacion/activa/` |
| 8 | Jubilación parcial con contrato de relevo: requisitos y quién puede pedirla | `/jubilacion/parcial/` |
| 9 | Jubilación flexible, activa o parcial: cuál te conviene según tu situación | `/jubilacion/flexible-activa-o-parcial/` |
| 10 | Jubilación de autónomos: requisitos, cuánto cobran y cómo mejorar su pensión | `/jubilacion/autonomos/` |
| 11 | Jubilación anticipada por discapacidad: grados y edades mínimas | `/jubilacion/anticipada-discapacidad/` |
| 12 | Jubilación anticipada por profesión (bomberos, policía local, mineros…): coeficientes reductores de edad | `/jubilacion/anticipada-por-profesion/` |
| 13 | Cómo solicitar la jubilación por internet paso a paso (Tu Seguridad Social) | `/jubilacion/solicitar-jubilacion-internet/` |
| 14 | Documentos para pedir la jubilación: checklist descargable | `/jubilacion/documentos-jubilacion/` |
| 15 | Cuánto tarda en resolverse la jubilación y qué hacer si se retrasa | `/jubilacion/cuanto-tarda-jubilacion/` |
| 16 | Despido a los 60: paro, subsidio y jubilación, en qué orden y cuánto cobrarás | `/jubilacion/despido-a-los-60/` |
| 17 | Subsidio para mayores de 52 años: requisitos, cuantía y efecto en tu futura pensión | `/jubilacion/subsidio-mayores-52/` |
| 18 | Convenio especial con la Seguridad Social: cuándo compensa pagarlo antes de jubilarte | `/jubilacion/convenio-especial/` |
| 19 | Jubilación con 15 años cotizados: cuánto se cobra y ejemplos | `/jubilacion/15-anos-cotizados/` |
| 20 | Me faltan años cotizados para jubilarme: opciones legales para completarlos | `/jubilacion/faltan-anos-cotizados/` |
| 21 | Jubilarse habiendo trabajado en otro país de la UE o de Latinoamérica: cómo se suman los años | `/jubilacion/trabajado-en-otro-pais/` |
| Herramienta | Calculadora de edad de jubilación: tu fecha exacta según lo que llevas cotizado | `/calculadoras/edad-de-jubilacion/` |

## Flujo editorial de cada artículo

1. Investigación en fuentes oficiales (BOE, Seguridad Social, Ministerio) y en las preguntas reales de los usuarios.
2. Redacción de `articulo.md` y de la versión `articulo.html`.
3. Tabla `verificacion-fuentes.md`: un dato sin fuente se elimina.
4. Cálculos con código testeado cuando el artículo incluye tablas o ejemplos numéricos.
5. Revisión por un profesional colegiado (nombre y n.º de colegiado reales en la caja «Revisado por»).
6. `npm run publicar` y `npm run comprobar`, e importación en WordPress según `publicacion/PLAN-PUBLICACION.md`.

## Comandos

Requieren Node.js 22 o posterior y `npm install`. Los que usan navegador requieren Playwright con Chromium.

```bash
npm test             # Lógica de edad de jubilación y generador (enlaces, WordPress)
npm run publicar     # Regenera el widget, todos los articulo.html y publicacion/wordpress-borradores.xml
npm run comprobar    # En navegador: móvil sin desbordes, un H1, title y description, JSON-LD, errores de consola
npm run e2e          # Calculadoras de edad de jubilación y de «¿compensa?» en móvil y escritorio
npm run pdf          # Regenera el PDF de la lista de documentos

# Tabla por año y mes de nacimiento
node herramientas/edad-jubilacion/tabla-por-nacimiento.mjs 1958 1972

# Regenerar el gráfico (SVG) y exportarlo a PNG y WebP
node herramientas/graficos/grafico-edad-jubilacion.mjs > contenido/jubilacion/edad-de-jubilacion/imagenes/edad-jubilacion-2013-2027.svg
NODE_PATH=$(npm root -g) node herramientas/graficos/rasterizar.cjs contenido/jubilacion/edad-de-jubilacion/imagenes/edad-jubilacion-2013-2027.svg
```

## Aviso

Los contenidos son informativos y no sustituyen el asesoramiento profesional ni las resoluciones del INSS.
