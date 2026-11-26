# Auditoría de SEO y rastreo: analiza lo que descarga auditoria-bajar.mjs. Uso: python3 herramientas/revision/auditoria-analiza.py <carpeta>
import json, re, sys, collections, html as H
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
D=sys.argv[1]
M=json.load(open(f'{D}/meta.json')); S=json.load(open(f'{D}/sitemaps.json'))
W='https://jubilometro.com'
pages={}; inbound=collections.Counter(); outlinks={}; issues=collections.defaultdict(list)
sitemap_urls=set(e['loc'] for v in S['sitemap'].values() for e in v)
for m in M['meta']:
    u=m['url']; b=open(f"{D}/html/{m['f']}",encoding='utf-8',errors='ignore').read()
    if m['status']!=200: issues['estado'].append((u,m['status'])); continue
    s=BeautifulSoup(b,'lxml')
    t=(s.title.string or '').strip() if s.title else ''
    md=s.find('meta',attrs={'name':'description'}); d=md['content'].strip() if md and md.get('content') else ''
    can=s.find('link',rel='canonical'); can=can['href'] if can else ''
    rob=s.find('meta',attrs={'name':'robots'}); rob=rob['content'] if rob else ''
    h1=s.find_all('h1'); hs=[(h.name,h.get_text(' ',strip=True)) for h in s.find_all(['h1','h2','h3','h4','h5','h6'])]
    main=s.find('main') or s.body
    txt=main.get_text(' ',strip=True) if main else ''
    words=len(txt.split())
    lds=[]
    for sc in s.find_all('script',type='application/ld+json'):
        try:
            j=json.loads(sc.string or '{}')
            def types(x):
                if isinstance(x,dict):
                    if '@type' in x: lds.append(x['@type'] if isinstance(x['@type'],str) else '/'.join(x['@type']))
                    for v in x.values(): types(v)
                elif isinstance(x,list):
                    for v in x: types(v)
            types(j)
        except Exception as e: issues['jsonld_invalido'].append((u,str(e)[:60]))
    imgs=s.find_all('img'); noalt=[i.get('src','')[-50:] for i in imgs if i.get('alt') is None]; nodim=[i.get('src','')[-50:] for i in imgs if not (i.get('width') and i.get('height'))]
    links=[]
    for a in s.find_all('a',href=True):
        href=urljoin(u,a['href']); p=urlparse(href)
        if p.netloc=='jubilometro.com':
            clean=href.split('#')[0]
            links.append((clean,a.get('rel'),a.get_text(' ',strip=True)[:40]))
    internal=set(l[0] for l in links)
    for l in internal: inbound[l]+=1 if l!=u else 0
    outlinks[u]=internal
    og=s.find('meta',property='og:image'); ogi=og['content'] if og else ''
    lang=(s.html.get('lang') if s.html else '')
    http_mixed=len(re.findall(r'(?:src|href)="http://',b))
    pages[u]=dict(t=t,d=d,can=can,rob=rob,h1=len(h1),h1t=h1[0].get_text(' ',strip=True) if h1 else '',hs=hs,words=words,ld=lds,imgs=len(imgs),noalt=noalt,nodim=nodim,lang=lang,ogi=ogi,mixed=http_mixed,kb=len(b)//1024,ms=m['ms'],xr=m['h'].get('x-robots-tag'),cache=m['h'].get('cache-control'),lm=m['h'].get('last-modified'),nofollow=[l for l in links if l[1] and 'nofollow' in l[1]])
# checks
tc=collections.defaultdict(list); dc=collections.defaultdict(list); h1c=collections.defaultdict(list)
for u,p in pages.items():
    tc[p['t']].append(u); dc[p['d']].append(u); h1c[p['h1t']].append(u)
    if p['h1']!=1: issues['h1_no_unico'].append((u,p['h1']))
    if not p['can']: issues['sin_canonical'].append(u)
    elif p['can']!=u: issues['canonical_distinta'].append((u,p['can']))
    if 'noindex' in p['rob'] or (p['xr'] and 'noindex' in p['xr']): issues['noindex_en_sitemap'].append(u)
    if len(p['t'])>62: issues['title_largo'].append((u,len(p['t'])))
    if len(p['t'])<30: issues['title_corto'].append((u,p['t']))
    if not p['d']: issues['sin_description'].append(u)
    elif len(p['d'])>160: issues['desc_larga'].append((u,len(p['d'])))
    elif len(p['d'])<70: issues['desc_corta'].append((u,len(p['d'])))
    if p['noalt']: issues['img_sin_alt'].append((u,p['noalt'][:3]))
    if p['nodim']: issues['img_sin_dimensiones'].append((u,len(p['nodim']),p['nodim'][:2]))
    if p['mixed']: issues['http_mixto'].append((u,p['mixed']))
    if p['lang']!='es' and not str(p['lang']).startswith('es'): issues['lang'].append((u,p['lang']))
    if not p['ogi']: issues['sin_og_image'].append(u)
    if p['nofollow']: issues['enlaces_internos_nofollow'].append((u,p['nofollow'][:3]))
    if p['words']<500: issues['poco_texto'].append((u,p['words']))
    # heading order
    lv=[int(h[0][1]) for h in p['hs']]; 
    for a,b2 in zip(lv,lv[1:]):
        if b2>a+1: issues['salto_encabezado'].append((u,f'h{a}->h{b2}')); break
    if not p['ld']: issues['sin_jsonld'].append(u)
    if p['kb']>400: issues['html_pesado'].append((u,p['kb']))
    if p['ms']>1500: issues['lento'].append((u,p['ms']))
for k,v in tc.items():
    if len(v)>1: issues['title_duplicado'].append((k,v))
for k,v in dc.items():
    if len(v)>1 and k: issues['desc_duplicada'].append((k[:60],v))
for k,v in h1c.items():
    if len(v)>1: issues['h1_duplicado'].append((k,v))
# orphans and links to non-sitemap urls
alllinked=set().union(*outlinks.values())
for u in pages:
    if inbound[u]==0: issues['huerfana'].append(u)
    elif inbound[u]<=2: issues['pocos_enlaces_entrantes'].append((u,inbound[u]))
notsm=sorted(l for l in alllinked if l not in sitemap_urls and not re.search(r'\.(csv|xml|txt|png|jpg|webp|pdf|json)$|/wp-|/feed|\?',l))
issues['enlazadas_fuera_sitemap']=notsm
# depth from home
from collections import deque
dep={W+'/':0}; q=deque([W+'/'])
while q:
    x=q.popleft()
    for y in outlinks.get(x,()):
        if y in pages and y not in dep: dep[y]=dep[x]+1; q.append(y)
for u in pages:
    if u not in dep: issues['inalcanzable_desde_portada'].append(u)
    elif dep[u]>3: issues['profundidad>3'].append((u,dep[u]))
issues['_profundidad']=collections.Counter(dep.values())
issues['_ld_tipos']=collections.Counter(t for p in pages.values() for t in set(p['ld']))
issues['_extra']=M['extra']
issues['_sitemaps']={k:len(v) for k,v in S['sitemap'].items()}
issues['_cache']=collections.Counter(p['cache'] for p in pages.values())
json.dump({'pages':{u:{k:v for k,v in p.items() if k!='hs'} for u,p in pages.items()},'inbound':inbound,'outlinks':{k:sorted(v) for k,v in outlinks.items()}},open(f'{D}/analisis.json','w'),ensure_ascii=False,default=str)
for k,v in issues.items():
    n=len(v) if hasattr(v,'__len__') else v
    print(f'== {k} ({n})')
    if isinstance(v,(list,)) : 
        for x in v[:12]: print('   ',x)
    else: print('   ',v)

# Enlaces a apartados (#) que no existen en la página de destino
import re as _re
_html={m['url']:open(f"{D}/html/{m['f']}",encoding='utf-8',errors='ignore').read() for m in M['meta']}
_ids={u:set(_re.findall(r'\bid="([^"]+)"',b)) for u,b in _html.items()}
_malos=set()
for u,b in _html.items():
    for h in _re.findall(r'<a [^>]*href="([^"]*#[^"]+)"',b):
        full=u+h if h.startswith('#') else urljoin(u,h.replace('&#038;','&').replace('&amp;','&'))
        if '#' not in full: continue
        base,frag=full.split('#',1)
        if base in _ids and frag and frag not in _ids[base] and not frag.startswith(':~:'): _malos.add((u[24:],base[24:],frag))
print(f'== anclas_rotas ({len(_malos)})')
for x in sorted(_malos)[:30]: print('   ',x)
