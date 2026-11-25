# Voz de los reels con Chatterbox multilingüe (Resemble AI, licencia MIT), en español.
# Timbre de referencia: voces/ref-hombre.wav (lector de LibriVox, MLS hablante 8304, CC BY 4.0) o voces/ref-rosa.wav (mujer, Kokoro).
# Uso: python3 voz_chatterbox.py <texto.txt> <salida.wav> <hombre|rosa>
import re, sys, os
import torch, torchaudio
from chatterbox.mtl_tts import ChatterboxMultilingualTTS

texto, salida, quien = sys.argv[1], sys.argv[2], sys.argv[3]
ref = os.path.join(os.path.dirname(os.path.abspath(__file__)), "voces", f"ref-{quien}.wav")
m = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
torch.manual_seed(7)
# Un trozo por párrafo (y por frases si el párrafo es largo): el modelo va mejor con frases cortas
parrafos = [p.strip() for p in re.split(r"\n\s*\n", open(texto, encoding="utf-8").read()) if p.strip()]
trozos = []
for p in parrafos:
    p = re.sub(r"\s+", " ", p)
    if len(p) <= 220: trozos.append((p, 0.45)); continue
    frases = re.split(r"(?<=[.!?…])\s+", p)
    for i, f in enumerate(frases): trozos.append((f, 0.45 if i == len(frases) - 1 else 0.2))
partes = []
for t, pausa in trozos:
    w = m.generate(t, language_id="es", audio_prompt_path=ref, exaggeration=0.6, cfg_weight=0.4)
    partes += [w, torch.zeros(1, int(m.sr * pausa))]
    print("  ·", t[:60], flush=True)
torchaudio.save(salida, torch.cat(partes, dim=1), m.sr)
