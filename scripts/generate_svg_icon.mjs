// scripts/generate_svg_icon.mjs
import fs from 'fs';
import zlib from 'zlib';

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

const p = 'C:/Users/Rana Adeel/.gemini/antigravity/brain/a4f75e34-d104-42fd-a98d-7e8be6ee7b3f/.user_uploaded/media_1793555421633_60ad3ea1.png';
const { w, h, pixels } = decodePng(fs.readFileSync(p));
const minX = 60, minY = 22, width = 57, height = 38;

let pathD = '';
for (let y = 0; y < height; y++) {
  let startX = -1;
  for (let x = 0; x < width; x++) {
    const i = ((minY + y) * w + (minX + x)) * 4;
    const lum = 0.299 * pixels[i] + 0.587 * pixels[i+1] + 0.114 * pixels[i+2];
    const isInk = lum < 150;
    if (isInk && startX === -1) {
      startX = x;
    } else if (!isInk && startX !== -1) {
      pathD += `M${startX} ${y}h${x - startX}v1h-${x - startX}z `;
      startX = -1;
    }
  }
  if (startX !== -1) {
    pathD += `M${startX} ${y}h${width - startX}v1h-${width - startX}z `;
  }
}

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="currentColor" className="w-full h-full">\n  <path d="${pathD.trim()}" />\n</svg>\n`;

fs.writeFileSync('src/components/brandIconPath.ts', `export const BRAND_ICON_PATH = "${pathD.trim()}";\nexport const BRAND_ICON_VIEWBOX = "0 0 ${width} ${height}";\n`);
console.log('Saved src/components/brandIconPath.ts successfully!');
