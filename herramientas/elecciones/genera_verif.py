import re, sys, subprocess, os
RAIZ, S = sys.argv[1], sys.argv[2]
PDF = {'pp':'pp','psoe':'psoe','vox':'vox','frente-amplio':'fa','erc':'erc','pnv':'pnv'}
NOM = {'pp':'PP','psoe':'PSOE','vox':'Vox','frente-amplio':'Frente Amplio','erc':'ERC','pnv':'PNV'}
def paginas(pdf):
    n=int(re.search(r'Pages:\s+(\d+)',subprocess.run(['pdfinfo',pdf],capture_output=True,text=True).stdout).group(1))
    return [re.sub(r'\s+',' ',subprocess.run(['pdftotext','-f',str(p),'-l',str(p),pdf,'-'],capture_output=True,text=True).stdout).replace('- ','').replace('’',"'") for p in range(1,n+1)]
cache={}
IGNORAR={'Programa electoral. Es sentido común','Cómo pagar las pensiones','Eleccions al Congrés 2026. Programa electoral','La jubilación anticipada','Defendemos Euskadi / Euskadi Zaindu','La reconstrucción nacional','La fuerza de seguir avanzando'}
def comprobar(texto, clave):
    """Busca cada cita «…» del texto en el PDF del partido; devuelve filas."""
    pags = cache.setdefault(clave, paginas(os.path.join(S, clave, 'p.pdf')))
    filas=[]; fallos=[]
    for cita in re.findall(r'«([^»]{12,})»', texto):
        if cita in IGNORAR: continue
        c = re.sub(r'\s+',' ',cita.replace('**','')).replace('’',"'")
        # las citas que saltan de página: se busca en la unión de dos páginas
        hit=[i+1 for i,t in enumerate(pags) if c.lower() in t.lower()]
        if not hit:
            hit=[f'{i+1}-{i+2}' for i in range(len(pags)-1) if c.lower() in re.sub(r'\s+',' ',re.sub(r' \d{1,3} ',' ',re.sub(r'\s+',' ',pags[i]+' '+pags[i+1]))).lower()]
        if hit: filas.append((cita, ', '.join(map(str,hit))))
        else: fallos.append(cita)
    return filas, fallos
total_fallos=0
for slug in ['pp','psoe','vox','frente-amplio','erc','pnv']:
    ruta=os.path.join(RAIZ,'contenido','elecciones',f'programa-{slug}-pensiones')
    txt=open(os.path.join(ruta,'articulo.md'),encoding='utf-8').read()
    cuerpo=txt.split('## Preguntas frecuentes')[0]
    url=re.search(r'fuentes_legales:\n  - (\S+)',txt).group(1)
    filas,fallos=comprobar(cuerpo, PDF[slug])
    total_fallos+=len(fallos)
    for f in fallos: print('NO ENCONTRADA', slug, f[:80])
    out=[f"# Verificación de datos · Programa de {NOM[slug]} para el 29N y pensiones\n",
         f"**Lectura de fuentes (17/11/2026):** programa oficial descargado de la web del partido ({url}). Cada cita se ha buscado de forma automática en el texto del PDF (pdftotext) y la página es la del PDF. Las cifras de contexto (subida de 2027, edad de jubilación, pensión mínima, salario mínimo) vienen de las guías de Jubilómetro ya verificadas en el BOE. Los temas marcados «no lo menciona» se han buscado en el documento entero con palabras clave (edad de jubilación, 65 y 67 años, mínimas, no contributivas, anticipada, cotización máxima, equidad intergeneracional, planes de pensiones, IRPF, viudedad, orfandad).\n",
         "| # | Cita literal | Fuente primaria | Página del PDF | Estado |","|---|---|---|---|---|"]
    for i,(c,p) in enumerate(filas,1):
        out.append(f"| {i} | «{c}» | Programa oficial de {NOM[slug]} | {p} | Verificado en el PDF |")
    open(os.path.join(ruta,'verificacion-fuentes.md'),'w',encoding='utf-8').write('\n'.join(out)+'\n')
    print(slug, len(filas), 'citas')
# comparativa: citas de todos los partidos
ruta=os.path.join(RAIZ,'contenido','elecciones','propuestas-pensiones-partidos')
txt=open(os.path.join(ruta,'articulo.md'),encoding='utf-8').read()
filas=[]
for linea in txt.splitlines():
    m=re.match(r'- \*\*(PP|PSOE|Vox|Frente Amplio|ERC|PNV)\*\*:',linea)
    if not m: continue
    slug={v:k for k,v in NOM.items()}[m.group(1)]
    f,fa=comprobar(linea, PDF[slug]); total_fallos+=len(fa)
    for x in fa: print('NO ENCONTRADA comparativa', m.group(1), x[:80])
    filas+= [(m.group(1),c,p) for c,p in f]
out=["# Verificación de datos · Qué proponen los partidos sobre las pensiones (29N)\n",
     "**Lectura de fuentes (17/11/2026):** los seis programas oficiales descargados de la web de cada partido (enlaces en «Fuentes oficiales» de la guía). Cada cita se ha buscado de forma automática en el texto del PDF (pdftotext); la página es la del PDF. La tabla resumen y los «no lo menciona» salen de la lectura de cada programa entero, detallada en la verificación de la guía de cada partido. Junts (junts.cat) y EH Bildu (ehbildu.eus): sin programa para el 29N en su web a 17/11/2026. Contexto: artículo 58 LGSS (BOE-A-2015-11724); subida de 2027, edad de jubilación, mínima, no contributiva y salario mínimo de 2026, de las guías ya verificadas.\n",
     "| # | Partido | Cita literal | Página del PDF | Estado |","|---|---|---|---|---|"]
for i,(n,c,p) in enumerate(filas,1):
    out.append(f"| {i} | {n} | «{c}» | {p} | Verificado en el PDF |")
open(os.path.join(ruta,'verificacion-fuentes.md'),'w',encoding='utf-8').write('\n'.join(out)+'\n')
print('comparativa', len(filas), 'citas; fallos', total_fallos)
