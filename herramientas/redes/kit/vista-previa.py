# Vista previa ligera del banco de publicaciones, para verla en el móvil o imprimirla: una fila por carrusel
# (todas sus diapositivas) y las imágenes con la cifra, en páginas A4 apaisadas.
# Uso (después de kit.mjs --banco): python3 herramientas/redes/kit/vista-previa.py
import os, sys, glob
from PIL import Image, ImageDraw, ImageFont
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
B = os.path.join(RAIZ, 'publicacion', 'redes', 'banco')
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(B, 'vista-previa-banco.pdf')
F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 22)
F2 = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18)
FT = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf', 34)
W, H = 1754, 1240  # A4 apaisado a 150 ppp
TW = 180; TH = int(TW * 1350 / 1080); GAP = 12; FILA = TH + 46
def pagina(titulo):
    p = Image.new('RGB', (W, H), '#F4F7FB'); d = ImageDraw.Draw(p)
    d.text((60, 36), titulo, font=FT, fill='#0F1B2D')
    return p, d
paginas = []
carr = sorted(os.listdir(os.path.join(B, 'carruseles')))
por_pag = (H - 120) // FILA
for k in range(0, len(carr), por_pag):
    p, d = pagina(f'Carruseles de Instagram del banco ({k + 1}-{min(k + por_pag, len(carr))} de {len(carr)})')
    y = 100
    for c in carr[k:k + por_pag]:
        d.text((60, y), c, font=F, fill='#1D4ED8')
        x = 60
        fs = sorted(glob.glob(os.path.join(B, 'carruseles', c, '*.png')))
        tw = min(TW, (W - 120 - (len(fs) - 1) * GAP) // len(fs)); th = int(tw * 1350 / 1080)  # 9 o 10 diapositivas: más estrechas
        for f in fs:
            im = Image.open(f).convert('RGB').resize((tw, th), Image.LANCZOS)
            p.paste(im, (x, y + 30)); x += tw + GAP
        y += FILA
    paginas.append(p)
cif = sorted(glob.glob(os.path.join(B, 'cifras', '*.png')))
CW = 240; CH = int(CW * 1350 / 1080)
for k in range(0, len(cif), 12):
    p, d = pagina('Imágenes con la cifra (Facebook y X)')
    for i, f in enumerate(cif[k:k + 12]):
        x = 60 + (i % 6) * (CW + 30); y = 100 + (i // 6) * (CH + 60)
        p.paste(Image.open(f).convert('RGB').resize((CW, CH), Image.LANCZOS), (x, y + 30))
        d.text((x, y), os.path.basename(f)[:-4], font=F2, fill='#1D4ED8')
    paginas.append(p)
paginas[0].save(OUT, save_all=True, append_images=paginas[1:], resolution=150, quality=82)
print(len(paginas), 'páginas', os.path.getsize(OUT) // 1024, 'KB')
