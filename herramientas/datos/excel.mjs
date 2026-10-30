// Lectura mínima de los Excel (.xlsx) de la Seguridad Social, sin dependencias: un .xlsx es un zip
// de XML. hoja(archivo, nombre) devuelve un Map fila → { columna: valor } (texto ya sin espacios
// sobrantes o número).
import { readFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';

function leerZip(buf) {
  const fin = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (fin < 0) throw new Error('El Excel no es un .xlsx válido');
  const archivos = new Map();
  for (let i = 0, p = buf.readUInt32LE(fin + 16); i < buf.readUInt16LE(fin + 10); i++) {
    const [metodo, tam, ln, lx, lc, local] = [buf.readUInt16LE(p + 10), buf.readUInt32LE(p + 20), buf.readUInt16LE(p + 28), buf.readUInt16LE(p + 30), buf.readUInt16LE(p + 32), buf.readUInt32LE(p + 42)];
    const ini = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const datos = buf.subarray(ini, ini + tam);
    archivos.set(buf.toString('utf8', p + 46, p + 46 + ln), metodo === 8 ? inflateRawSync(datos) : datos);
    p += 46 + ln + lx + lc;
  }
  return archivos;
}
const xml = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&#x([0-9a-f]+);/gi, (x, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (x, d) => String.fromCodePoint(+d)).replace(/&amp;/g, '&');
const atributo = (tag, a) => tag.match(new RegExp(`\\b${a}="([^"]*)"`))?.[1];
function hojaDe(archivos, nombre) {
  const leer = (f) => archivos.get(f)?.toString('utf8') ?? '';
  const tag = [...leer('xl/workbook.xml').matchAll(/<sheet\b[^>]*>/g)].map((x) => x[0]).find((t) => xml(atributo(t, 'name') ?? '') === nombre);
  if (!tag) throw new Error(`El Excel no tiene la hoja «${nombre}»`);
  const id = atributo(tag, 'r:id');
  const rel = [...leer('xl/_rels/workbook.xml.rels').matchAll(/<Relationship\b[^>]*>/g)].map((x) => x[0]).find((t) => atributo(t, 'Id') === id);
  const destino = atributo(rel, 'Target').replace(/^\/?(xl\/)?/, 'xl/');
  const textos = [...leer('xl/sharedStrings.xml').matchAll(/<si>([\s\S]*?)<\/si>/g)].map((x) => [...x[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => xml(t[1])).join(''));
  const filas = new Map();
  for (const [, attrs, cuerpo = ''] of leer(destino).matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
    const [, col, fila] = atributo(attrs, 'r').match(/^([A-Z]+)(\d+)$/);
    const t = atributo(attrs, 't'), v = cuerpo.match(/<v>([\s\S]*?)<\/v>/)?.[1];
    const valor = t === 's' ? textos[+v] : t === 'inlineStr' ? xml(cuerpo.replace(/<[^>]+>/g, '')) : t === 'str' ? xml(v ?? '') : v == null ? null : Number(v);
    if (!filas.has(+fila)) filas.set(+fila, {});
    filas.get(+fila)[col] = typeof valor === 'string' ? valor.trim() : valor;
  }
  return filas;
}

export function hoja(archivo, nombre) {
  return hojaDe(leerZip(readFileSync(archivo)), nombre);
}
