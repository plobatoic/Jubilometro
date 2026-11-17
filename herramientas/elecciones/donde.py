import subprocess,sys,re
pdf=sys.argv[1]
n=int(re.search(r'Pages:\s+(\d+)',subprocess.run(['pdfinfo',pdf],capture_output=True,text=True).stdout).group(1))
pages=[re.sub(r'\s+',' ',subprocess.run(['pdftotext','-f',str(p),'-l',str(p),pdf,'-'],capture_output=True,text=True).stdout).replace('- ','') for p in range(1,n+1)]
for q in sys.argv[2:]:
    hits=[i+1 for i,t in enumerate(pages) if q.lower() in t.lower()]
    print(repr(q), hits)
