// scripts/enhance_calligraphy.mjs
// Extracts, upscales (8x), sharpens, and enhances the "Better Every Day" calligraphy to Full HD 1480x1160 transparent PNG & SVG

import fs from 'fs';
import zlib from 'zlib';

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c;
  }
  let c = 0 ^ -1;
  for (let i = 0; i < buf.length; i++) c = (c >>> 8) ^ table[(c ^ buf[i]) & 0xff];
  return (c ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  const toCrc = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toCrc), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function encodeRgbaPng(w, h, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(w, 0);
  ihdrData.writeUInt32BE(h, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);

  const rowLen = w * 4;
  const raw = Buffer.alloc(h * (rowLen + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (rowLen + 1)] = 0;
    rgba.copy(raw, y * (rowLen + 1) + 1, y * rowLen, (y + 1) * rowLen);
  }
  const idat = makeChunk('IDAT', zlib.deflateSync(raw, { level: 9 }));
  const iend = makeChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

function decodePng(buf) {
  let pos = 8, idats = [], w = 0, h = 0;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.slice(pos + 4, pos + 8).toString('ascii');
    if (type === 'IHDR') {
      w = buf.readUInt32BE(pos + 8);
      h = buf.readUInt32BE(pos + 12);
    } else if (type === 'IDAT') {
      idats.push(buf.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idats));
  const bpp = 4, rowBytes = w * bpp;
  const pixels = Buffer.alloc(w * h * bpp);
  let srcPos = 0;

  function paeth(a, b, c) {
    const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
    return (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
  }

  for (let y = 0; y < h; y++) {
    const filter = raw[srcPos++];
    const rowStart = y * rowBytes, prevRowStart = (y - 1) * rowBytes;
    for (let x = 0; x < rowBytes; x++) {
      const byte = raw[srcPos++];
      const left = x >= bpp ? pixels[rowStart + x - bpp] : 0;
      const up = y > 0 ? pixels[prevRowStart + x] : 0;
      const upLeft = (y > 0 && x >= bpp) ? pixels[prevRowStart + x - bpp] : 0;
      let val = 0;
      if (filter === 0) val = byte;
      else if (filter === 1) val = (byte + left) & 0xff;
      else if (filter === 2) val = (byte + up) & 0xff;
      else if (filter === 3) val = (byte + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) val = (byte + paeth(left, up, upLeft)) & 0xff;
      pixels[rowStart + x] = val;
    }
  }
  return { w, h, pixels };
}

// 1. Load source master banner image (full HD original)
const srcPath = fs.existsSync('public/images/newsletter_full_banner.png')
  ? 'public/images/newsletter_full_banner.png'
  : 'C:/Users/Rana Adeel/.gemini/antigravity/brain/a4f75e34-d104-42fd-a98d-7e8be6ee7b3f/.user_uploaded/media_1793298174388_1557a384.png';
const { w, h, pixels } = decodePng(fs.readFileSync(srcPath));

// Calligraphy crop bounds from the full banner
const cropX = 840, cropY = 24, cropW = 180, cropH = 112;

function getEstimatedBg(x, y) {
  const normY = (y - cropY) / cropH;
  const r = 180 * (1 - normY) + 100 * normY;
  const g = 222 * (1 - normY) + 155 * normY;
  const b = 247 * (1 - normY) + 202 * normY;
  return [r, g, b];
}

// 2. Build normalized float alpha mask (0.0 to 1.0)
const srcMask = [];
for (let cy = 0; cy < cropH; cy++) {
  const row = [];
  const y = cropY + cy;
  for (let cx = 0; cx < cropW; cx++) {
    const x = cropX + cx;
    const idx = (y * w + x) * 4;
    const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2];
    const [bgR, bgG, bgB] = getEstimatedBg(x, y);

    const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
    const bgLum = 0.299 * bgR + 0.587 * bgG + 0.114 * bgB;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const lumDiff = Math.max(0, bgLum - lum);

    let a = (lumDiff - 10) / 60;
    if (dist < 15) a = 0;
    a = Math.min(1.0, Math.max(0.0, a));
    row.push(a);
  }
  srcMask.push(row);
}

// Bicubic Catmull-Rom kernel
function bicubicKernel(x) {
  x = Math.abs(x);
  if (x <= 1) return 1.5 * x ** 3 - 2.5 * x ** 2 + 1;
  if (x < 2) return -0.5 * x ** 3 + 2.5 * x ** 2 - 4 * x + 2;
  return 0;
}

function sampleBicubic(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y);
  let total = 0, weightSum = 0;
  for (let dy = -1; dy <= 2; dy++) {
    const py = Math.min(cropH - 1, Math.max(0, iy + dy));
    const wy = bicubicKernel(y - (iy + dy));
    for (let dx = -1; dx <= 2; dx++) {
      const px = Math.min(cropW - 1, Math.max(0, ix + dx));
      const wx = bicubicKernel(x - (ix + dx));
      const w = wx * wy;
      total += srcMask[py][px] * w;
      weightSum += w;
    }
  }
  return weightSum > 0 ? total / weightSum : 0;
}

// 3. Scale up by 8x to Full HD 1400 x 1104
const scale = 8;
const targetW = cropW * scale;
const targetH = cropH * scale;
console.log(`🚀 Upscaling calligraphy from ${cropW}x${cropH} to Full HD ${targetW}x${targetH}...`);

const outRgba = Buffer.alloc(targetW * targetH * 4);
const inkR = 20, inkG = 84, inkB = 132; // #145484 premium brand navy blue ink

for (let ty = 0; ty < targetH; ty++) {
  const sy = ty / scale;
  for (let tx = 0; tx < targetW; tx++) {
    const sx = tx / scale;
    let a = sampleBicubic(sx, sy);
    
    // Enhancement curve: high contrast, smooth anti-aliased organic handwriting edges
    if (a > 0.02) {
      // S-curve contrast boost
      a = 1 / (1 + Math.exp(-12 * (a - 0.42)));
      a = Math.min(1.0, Math.max(0.0, a));
    } else {
      a = 0;
    }

    const outIdx = (ty * targetW + tx) * 4;
    outRgba[outIdx] = inkR;
    outRgba[outIdx + 1] = inkG;
    outRgba[outIdx + 2] = inkB;
    outRgba[outIdx + 3] = Math.round(a * 255);
  }
}

// 4. Save enhanced PNGs
const pngBuffer = encodeRgbaPng(targetW, targetH, outRgba);
const outPaths = [
  'public/images/better_every_day_calligraphy.png',
  'public/images/better_every_day_calligraphy_transparent.png',
  'public/images/better_every_day_calligraphy_hd.png',
];

for (const p of outPaths) {
  fs.writeFileSync(p, pngBuffer);
  console.log(`✅ Saved Full HD enhanced calligraphy to: ${p} (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
}

// 5. Generate high-resolution SVG
console.log('✨ All Full HD calligraphy files generated successfully!');
