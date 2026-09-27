# Jubilómetro

Contenidos y herramientas de Jubilómetro, web de referencia sobre jubilación y pensiones en España.

## Estructura

```
contenido/<categoría>/<slug>/    Un artículo por carpeta; la ruta coincide con su URL
  articulo.md                    Versión maestra (texto + ficha de publicación en el front matter)
  articulo.html                  Versión maquetada: HTML semántico, metaetiquetas, JSON-LD y calculadora
  ficha-seo.md                   Palabras clave, competencia, rastreo, enlazado interno y lista de publicación
  verificacion-fuentes.md        Cada dato del artículo con su fuente, para el revisor profesional
  imagenes/                      Imágenes propias (SVG fuente + WebP para el cuerpo + PNG para redes)
herramientas/
  edad-jubilacion/               Lógica de la edad de jubilación (DT 7.ª LGSS), tests y widget de calculadora
  graficos/                      Generación y rasterizado de gráficos
```

## Artículos

| # | Artículo | URL | Estado |
|---|---|---|---|
| 1 | Edad de jubilación en 2027: tabla por año de nacimiento y años cotizados | `/jubilacion/edad-de-jubilacion/` | Borrador pendiente de revisión profesional |

## Flujo editorial de cada artículo

1. Investigación en fuentes oficiales (BOE, Seguridad Social, Ministerio) y en las preguntas reales de los usuarios.
2. Redacción de `articulo.md` y de la versión `articulo.html`.
3. Tabla `verificacion-fuentes.md`: un dato sin fuente se elimina.
4. Cálculos con código testeado cuando el artículo incluye tablas o ejemplos numéricos.
5. Revisión por un profesional colegiado (nombre y n.º de colegiado reales en la caja «Revisado por»).
6. Publicación siguiendo la lista de `ficha-seo.md` y enlazado interno en las 48 horas siguientes.

## Comandos

Requieren Node.js 22 o posterior. Los que usan navegador requieren Playwright con Chromium.

```bash
# Tests de la lógica de edad de jubilación
node --test herramientas/edad-jubilacion/edad-jubilacion.test.mjs

# Tabla por año y mes de nacimiento
node herramientas/edad-jubilacion/tabla-por-nacimiento.mjs 1958 1972

# Regenerar el widget de la calculadora e insertarlo en el artículo
node herramientas/edad-jubilacion/construir.mjs contenido/jubilacion/edad-de-jubilacion/articulo.html

# Prueba en navegador del artículo y la calculadora (móvil y escritorio)
NODE_PATH=$(npm root -g) node herramientas/edad-jubilacion/widget.e2e.cjs contenido/jubilacion/edad-de-jubilacion/articulo.html

# Regenerar el gráfico (SVG) y exportarlo a PNG y WebP
node herramientas/graficos/grafico-edad-jubilacion.mjs > contenido/jubilacion/edad-de-jubilacion/imagenes/edad-jubilacion-2013-2027.svg
NODE_PATH=$(npm root -g) node herramientas/graficos/rasterizar.cjs contenido/jubilacion/edad-de-jubilacion/imagenes/edad-jubilacion-2013-2027.svg
```

## Aviso

Los contenidos son informativos y no sustituyen el asesoramiento profesional ni las resoluciones del INSS.
