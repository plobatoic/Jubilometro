# Revisión diaria · frases que hablan en futuro de una fecha que ya ha pasado («hasta el 31 de octubre», «se abrirá…»).
# Uso: python3 herramientas/revision/fechas.py
import re, glob, datetime, os
HOY = datetime.date.today()
RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
MES = {m:i+1 for i,m in enumerate(['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'])}
FUT = re.compile(r'\b(hasta el|podrás|podrá|se abre|se abrirá|abrirá|será|serán|se publicará|publicará|empezará|comenzará|entrará en vigor|está abierto|está abierta|sigue abierto|queda abierta|queda abierto|vence|vencerá|tienes hasta|antes del|a partir del)\b', re.I)
out = []
for f in sorted(glob.glob(os.path.join(RAIZ, 'contenido/*/*/articulo.md'))):
    txt = open(f).read().split('\n---\n', 1)[-1]
    txt = re.sub(r'\*Historial de cambios:.*', '', txt)
    for sent in re.split(r'(?<=[.!?])\s+|\n', txt):
        for m in re.finditer(r'(\d{1,2}) de (' + '|'.join(MES) + r') de (20\d\d)', sent):
            d = datetime.date(int(m.group(3)), MES[m.group(2)], int(m.group(1)))
            if d < HOY and FUT.search(sent) and d > HOY - datetime.timedelta(days=150):
                out.append((f.split('/contenido/')[1].replace('/articulo.md', ''), d.isoformat(), sent.strip()[:220]))
                break
for o in out: print(' | '.join(o))
print(len(out))
