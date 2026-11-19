# Guías de los programas electorales (29N)

- `genera_partidos.py RAIZ [slug,slug]` escribe las siete guías por partido (`contenido/elecciones/programa-<partido>-pensiones/articulo.md`) con la misma estructura. Los textos de cada partido están en el diccionario `P`.
- `genera_verif.py RAIZ CARPETA` busca cada cita «…» en el PDF del partido (`CARPETA/<pp|psoe|vox|fa|erc|pnv|bildu>/p.pdf`, descargados con curl) y escribe `verificacion-fuentes.md` de cada guía y de la comparativa. Si dice «NO ENCONTRADA», la cita no está tal cual en el PDF: corrígela.
- `donde.py PDF "texto" …` dice en qué páginas del PDF está cada texto.

La comparativa (`propuestas-pensiones-partidos`) se escribe a mano. Las páginas que se citan son las del PDF.

**Ojo:** las guías se han retocado a mano después de generarlas (páginas de Frente Amplio, salario mínimo de 2027, enlaces). Genera solo la que necesites con el segundo argumento (`genera_partidos.py . eh-bildu`); si lanzas todas, se pierden esos cambios. `genera_verif.py` reescribe la verificación de todas: vuelve a añadir después las notas a mano (por ejemplo, la del salario mínimo de 2027 en Frente Amplio y la comparativa).
