# Comprueba las citas de una guía temática de elecciones (una línea por partido: «- **Partido**: …»)
# y escribe su verificacion-fuentes.md. Uso: python3 verif_tema.py RAIZ CARPETA_PDF slug "Título" "fecha"
import os, re, sys, subprocess
RAIZ, S, SLUG, TITULO, FECHA = sys.argv[1:6]
PDF = {'PP':'pp','PSOE':'psoe','Vox':'vox','Frente Amplio':'fa','ERC':'erc','EH Bildu':'bildu','PNV':'pnv'}
def norm(t): return re.sub(r'\s+',' ',t).replace('- ','').replace('’',"'").replace('‘',"'").replace('“','"').replace('”','"')
def paginas(pdf):
    n=int(re.search(r'Pages:\s+(\d+)',subprocess.run(['pdfinfo',pdf],capture_output=True,text=True).stdout).group(1))
    return [subprocess.run(['pdftotext','-f',str(p),'-l',str(p),pdf,'-'],capture_output=True,text=True).stdout for p in range(1,n+1)]
cache={}
def buscar(clave, cita):
    pags=cache.setdefault(clave, paginas(os.path.join(S, clave, 'p.pdf')))
    c=norm(cita).lower()
    hit=[str(i+1) for i,t in enumerate(pags) if c in norm(t).lower()]
    if not hit:
        for i in range(len(pags)-1):
            a=re.sub(r'\s*\d{1,3}\s*$','',pags[i].rstrip()); b=pags[i+1]
            j=norm(a+' '+b)
            j2=re.sub(r' \d{1,3} ',' ',re.sub(r' \d{1,3} [A-ZÁÉÍÓÚÑ ]{8,}(?= [a-záéíóúñ])',' ',j))
            if c in j.lower() or c in j2.lower(): hit.append(f'{i+1}-{i+2}')
    return hit
ruta=os.path.join(RAIZ,'contenido','elecciones',SLUG)
txt=open(os.path.join(ruta,'articulo.md'),encoding='utf-8').read().split('## Preguntas frecuentes')[0]
filas=[]; fallos=0; partido=None; avisos=[]
for linea in txt.splitlines():
    m=re.match(r'- \*\*(PP|PSOE|Vox|Frente Amplio|ERC|EH Bildu|PNV)\*\*',linea)
    if m: partido=m.group(1)
    elif not linea.startswith('  '): partido=None if not linea.startswith('- ') else partido
    if not partido: continue
    for m2 in re.finditer(r'«([^»]{12,})»',linea):
        cita=m2.group(1)
        h=buscar(PDF[partido],cita)
        if h:
            filas.append((partido,cita,', '.join(h)))
            # la página que dice la guía (la primera «página(s) N» tras la cita) debe estar entre las encontradas
            pm=re.search(r'páginas? (\d+)(?:\s*(?:y|-|a)\s*(\d+))?', linea[m2.end():])
            if pm:
                dichas={pm.group(1)}|({pm.group(2)} if pm.group(2) else set())
                encontradas=set(x for hh in h for x in hh.split('-'))
                if not dichas & encontradas: avisos.append(f'{partido}: «{cita[:60]}…» dice página {"/".join(sorted(dichas))}, está en {", ".join(h)}')
        else: fallos+=1; print('NO ENCONTRADA',partido,cita[:90])
out=[f"# Verificación de datos · {TITULO}\n",
     f"**Lectura de fuentes ({FECHA}):** los programas oficiales de PP, PSOE, Vox, Frente Amplio, ERC, EH Bildu y PNV para las elecciones del 29/11/2026, descargados de la web de cada partido (enlaces en «Fuentes oficiales» de la guía y en la verificación de la comparativa de pensiones). Cada cita se ha buscado de forma automática en el texto del PDF (pdftotext); la página es la del PDF. Los «no lo menciona» salen de buscar el tema con palabras clave en el programa entero.\n",
     "| # | Partido | Cita literal | Página del PDF | Estado |","|---|---|---|---|---|"]
for i,(n,c,p) in enumerate(filas,1): out.append(f"| {i} | {n} | «{c}» | {p} | Verificado en el PDF |")
open(os.path.join(ruta,'verificacion-fuentes.md'),'w',encoding='utf-8').write('\n'.join(out)+'\n')
print(SLUG, len(filas), 'citas; fallos', fallos)
for x in avisos: print('PÁGINA DISTINTA', x)
