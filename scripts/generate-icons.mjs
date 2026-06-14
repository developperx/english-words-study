// PWAアイコン(PNG)を外部ライブラリなしで生成する。
// シンプルな地球儀風デザイン（ブランドカラー背景＋白いライン）を描画して PNG エンコードする。
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function encodePng(width, height, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  // rest 0
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter type none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function draw(size) {
  const rgba = Buffer.alloc(size * size * 4);
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.32; // 地球の半径
  const lineW = Math.max(2, size * 0.02);
  // 背景色 brand-500 #0ea5e9
  const bg = [14, 165, 233, 255];
  const white = [255, 255, 255, 255];

  const set = (x, y, c) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4;
    rgba[i] = c[0];
    rgba[i + 1] = c[1];
    rgba[i + 2] = c[2];
    rgba[i + 3] = c[3];
  };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.hypot(dx, dy);
      let c = bg;
      // 円周（経線の外枠）
      if (Math.abs(dist - R) < lineW) c = white;
      // 縦の経線（楕円）
      const ell = Math.hypot(dx / (R * 0.42), dy / R);
      if (Math.abs(ell - 1) < lineW / (R * 0.6) && dist < R) c = white;
      // 赤道（横線）
      if (Math.abs(dy) < lineW && dist < R) c = white;
      // 緯線（上下）
      if (Math.abs(Math.abs(dy) - R * 0.5) < lineW && dist < R * 0.95) c = white;
      set(x, y, c);
    }
  }
  return rgba;
}

for (const size of [192, 512]) {
  const png = encodePng(size, size, draw(size));
  writeFileSync(join(outDir, `icon-${size}.png`), png);
  console.log(`generated icon-${size}.png (${png.length} bytes)`);
}
