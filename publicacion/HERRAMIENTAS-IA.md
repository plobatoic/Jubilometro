# Skills, plugins y conectores revisados (6 de octubre de 2026)

Qué hay instalado en el entorno de trabajo, para qué sirve en Jubilómetro y qué se usó para el simulador animado. Las instalaciones viven en el contenedor de la sesión: en una sesión nueva habría que repetirlas (los comandos están abajo).

## Lo que instalé hoy

| Herramienta | Qué es | Estado | Utilidad para Jubilómetro |
|---|---|---|---|
| **motion-design** (subida por ti) | Método para hacer vídeos animados con código (HTML + Playwright + ffmpeg) | Instalada. Sus scripts y rutas son de otro proyecto (Howseen) y no venían en el archivo | Alta para vídeos cortos del simulador (Reels, Shorts, YouTube). Ya apliqué sus reglas de movimiento en la página: muelles sin rebote, un solo color de acento, una cosa moviéndose cada vez |
| **apple-design** (subida por ti) | Revisor de diseño con las guías de Apple y una mirada de «estudio» | Instalada sin sus 123 páginas de referencia (no venían en el archivo): sirve la parte de criterio, no las citas | Media: revisiones de diseño. Usé su lente de oficio (un elemento firma, nada de plantilla, quitar lo que sobra) |
| **find-skills** (subida por ti) | Busca e instala skills del ecosistema `npx skills` | Instalada y funcionando | Media: encontrar skills nuevas cuando haga falta |
| **prompt-master** (subida por ti) | Escribe prompts para otras IA (ChatGPT, Midjourney, Cursor…) | Instalada (versión 1.8.0, más nueva que la que ya tenías) | Baja: solo si quieres prompts para otras herramientas |
| **agent-reach** (zip) | Guía para leer webs, Reddit, YouTube, X… | Instalada; solo son instrucciones, sin programas | Media: investigar qué pregunta la gente sobre pensiones (Reddit, YouTube). Sus herramientas extra (xreach, mcporter) no están instaladas |
| **caveman** (22 skills) | Modo de respuesta muy breve para gastar menos, y flujos de trabajo de programación (investigar antes de tocar, parches mínimos, verificar y parar) | Instaladas. Solo actúan si se invocan; no añaden ganchos ni cambian ajustes | Baja-media. **No uses** caveman-setup ni las de «Caveman Cloud»: desvían el tráfico de IA por un servidor de terceros y la web no usa IA |
| **HyperFrames** (plugin, 21 skills) | Vídeos a partir de HTML: explicadores, lanzamientos, subtítulos, música | Instalado (v0.8.138). Faltan 84 archivos de ejemplo grandes (Git LFS), no necesarios | Alta para vídeo: un vídeo de 15-30 s del simulador para redes |
| **Composio CLI** | Conecta la IA con cientos de apps | **No se pudo instalar**: el instalador descarga de GitHub y este entorno bloquea esa descarga; además `composio login` necesita abrir un navegador | Ejecútalo en tu ordenador: `curl -fsSL https://composio.dev/install \| sh` y `composio login` |

Comandos para reinstalar en otra sesión:

```bash
npx skills add JuliusBrussee/caveman -g -y --agent claude-code
claude plugin marketplace add heygen-com/hyperframes && claude plugin install hyperframes@hyperframes
# Las 5 skills subidas: copiar cada SKILL.md a ~/.claude/skills/<nombre>/SKILL.md
```

## Conectores

| Conector | Estado | Utilidad |
|---|---|---|
| **Hostinger** | Conectado | Alta. Ve jubilometro.com (WordPress, cuenta u426669644). Sirve para caché, copias de seguridad, PHP y archivos sin entrar al panel. Lo usé para comprobar el alojamiento |
| **WordPress.com** | Conectado | No aplica: tu web es WordPress instalado en Hostinger, no WordPress.com. Publicamos por la API de tu propia web |
| **vidIQ** | Conectado | Media: palabras clave y títulos si hacemos vídeos para YouTube |
| **GitHub** | Conectado | Alta: el repositorio de la web (rama de trabajo) |
| **Claude Docs** | Disponible | Baja: documentos compartidos |
| **Apify** | Instalado, sin conectar | Media: extraer datos de webs (por ejemplo, preguntas frecuentes en foros). Conéctalo en claude.ai si lo quieres usar |

## Skills que ya tenías y más sirven a la web

- **Diseño y experiencia**: web-design-guidelines (usada hoy: revisión de la página), dataviz (usada hoy: colores del gráfico validados para daltonismo y contraste), cro, theme-factory.
- **Visitas desde Google**: seo-audit, seo-review, schema, site-architecture, programmatic-seo.
- **Visitas desde IA**: ai-seo (la web ya tiene llms.txt; el simulador entra solo en él).
- **Contenido**: content-strategy, copywriting, copy-editing.
- **Herramientas**: free-tools.
- **Crecer y medir**: analytics, ab-testing, directory-submissions, public-relations, co-marketing.
- **Fidelizar**: emails, lead-magnets.

## Lo que se construyó con ellas: el simulador animado

https://jubilometro.com/calculadoras/simulador-jubilacion/

- Tema 2.8.4: `assets/js/simulador.js` y `assets/css/simulador.css`, que solo se cargan en esa página.
- Página generada con `herramientas/calculadoras/simulador-jubilacion.mjs`. Hay que volver a ejecutarlo cuando cambien las cifras de `CFG`, igual que la calculadora de la subida.
- Brief de diseño y movimiento: `publicacion/simulador/BRIEF.md`.
- Comprobado en vivo:
  - Lighthouse: accesibilidad, buenas prácticas y SEO 100; rendimiento 97 en escritorio y entre 88 y 95 en móvil.
  - Desplazamiento al cargar entre 0 y 0,07.
  - axe: 0 fallos.
  - Sin errores de JavaScript.
  - Probado sin JavaScript y con «reducir movimiento».
