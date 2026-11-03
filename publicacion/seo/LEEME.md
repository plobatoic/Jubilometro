# Palabras clave de Jubilómetro

## De dónde salen

Las palabras clave secundarias de cada guía (`palabras_clave_secundarias` en el front matter) salen de las **sugerencias reales de búsqueda** de Google y Bing en España para la palabra clave principal de cada guía (autocompletado), recogidas el 3/11/2026 con `herramientas/publicar/sugerencias-busqueda.mjs`. El resultado completo está en `sugerencias-2026-11-03.json`.

Criterios:

- Solo se usan sugerencias que la guía **ya responde** (todas sus palabras aparecen en el texto).
- Se descartan las de otros países (Colombia, México, Chile, Perú…), años pasados, otras comunidades y las que hablan de otra cosa.
- Hasta cuatro por guía. Se suben a Rank Math junto con la principal (`rank_math_focus_keyword`, separadas por comas).

## Qué no se hace

No se repiten palabras clave para «rellenar»: Google lo considera relleno de palabras clave (*keyword stuffing*) y lo penaliza, y AdSense lo trata como contenido de poco valor. Las palabras clave van donde las pondría una persona: el título, la descripción, la primera frase, los títulos de sección y las preguntas frecuentes, escritas como las busca la gente.

## Repetirlo

Cada pocos meses, o al publicar guías nuevas:

```
node herramientas/publicar/sugerencias-busqueda.mjs publicacion/seo/sugerencias-AAAA-MM-DD.json
```

y revisar qué preguntas nuevas aparecen que las guías no respondan.
