# Guías de los programas electorales (29N)

- `genera_partidos.py RAIZ` escribe las seis guías por partido (`contenido/elecciones/programa-<partido>-pensiones/articulo.md`) con la misma estructura. Los textos de cada partido están en el diccionario `P`.
- `genera_verif.py RAIZ CARPETA` busca cada cita «…» en el PDF del partido (`CARPETA/<pp|psoe|vox|fa|erc|pnv>/p.pdf`, descargados con curl) y escribe `verificacion-fuentes.md` de cada guía y de la comparativa. Si dice «NO ENCONTRADA», la cita no está tal cual en el PDF: corrígela.
- `donde.py PDF "texto" …` dice en qué páginas del PDF está cada texto.

La comparativa (`propuestas-pensiones-partidos`) se escribe a mano. Las páginas que se citan son las del PDF.
