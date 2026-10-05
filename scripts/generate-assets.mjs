import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const output = new URL("../assets/", import.meta.url);
await mkdir(output, { recursive: true });
const file = (name) => fileURLToPath(new URL(name, output));
const saveSvg = (name, svg) => sharp(Buffer.from(svg)).png().toFile(file(name));
const svg = (content, width = 512, height = 512) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`;

function pixelImage(name, lines, palette) {
    const height = lines.length;
    const width = lines[0].length;
    const rgba = Buffer.alloc(width * height * 4);
    lines.forEach((line, y) => [...line].forEach((mark, x) => {
        const [r, g, b, a = 255] = palette[mark];
        const at = (y * width + x) * 4;
        rgba.set([r, g, b, a], at);
    }));
    return sharp(rgba, { raw: { width, height, channels: 4 } }).png().toFile(file(name));
}

await pixelImage("pixel-heart.png", [
    "................", "....##....##....", "...####..####...", "..############..", ".##############.", ".##############.", ".##############.", "..############..", "...##########...", "....########....", ".....######.....", "......####......", ".......##.......", "................", "................", "................",
], { ".": [255,255,255], "#": [35,35,35] });

await pixelImage("pixel-invader.png", [
    "....................", "......##....##......", "........####........", "......########......", "....############....", "...###.######.###...", "..################..", "..##..########..##..", "..##..##....##..##..", "......##....##......", "....##........##....", "...##..........##...", "....................", "....................", "....................", "....................",
], { ".": [255,255,255], "#": [25,25,25] });

await pixelImage("pixel-smiley.png", [
    "....................", "......########......", "....############....", "...##############...", "..################..", "..####..####..####..", ".####....##....####.", ".####....##....####.", ".##################.", ".##################.", ".####............##.", ".#####..........###.", "..######......####..", "...##############...", "....############....", "......########......", "....................", "....................", "....................", "....................",
], { ".": [255,255,255], "#": [30,30,30] });

await saveSvg("rocket.png", svg(`
 <rect width="512" height="512" fill="#f7f7f7"/><circle cx="414" cy="95" r="48" fill="#b8b8b8"/>
 <path d="M255 55 C345 135 350 280 292 367 L220 367 C162 280 167 135 255 55Z" fill="#333"/>
 <path d="M255 84 C296 140 303 251 273 325 L237 325 C207 251 214 140 255 84Z" fill="#e8e8e8"/>
 <circle cx="255" cy="175" r="39" fill="#4b4b4b"/><circle cx="255" cy="175" r="24" fill="#efefef"/>
 <path d="M220 294 L116 373 L116 413 L220 367Z M292 294 L396 373 L396 413 L292 367Z" fill="#555"/>
 <path d="M220 366 L255 455 L292 366Z" fill="#222"/><path d="M239 367 L255 421 L273 367Z" fill="#d0d0d0"/>
 <path d="M237 455 L255 499 L273 455Z" fill="#777"/>`));

await saveSvg("cat.png", svg(`
 <rect width="512" height="512" fill="#fafafa"/><path d="M91 187 L116 55 L203 124 Q256 91 309 124 L396 55 L421 187 Q449 251 421 365 Q390 454 256 461 Q122 454 91 365 Q63 251 91 187Z" fill="#383838"/>
 <path d="M123 152 L132 94 L177 138Z M389 152 L380 94 L335 138Z" fill="#d8d8d8"/>
 <ellipse cx="178" cy="250" rx="40" ry="48" fill="#efefef"/><ellipse cx="334" cy="250" rx="40" ry="48" fill="#efefef"/><ellipse cx="178" cy="255" rx="10" ry="29" fill="#222"/><ellipse cx="334" cy="255" rx="10" ry="29" fill="#222"/>
 <path d="M235 315 Q256 299 277 315 Q256 342 235 315Z" fill="#d8d8d8"/><path d="M256 337 Q221 369 190 340 M256 337 Q291 369 322 340" fill="none" stroke="#e8e8e8" stroke-width="9" stroke-linecap="round"/>
 <path d="M218 329 L61 306 M218 350 L55 359 M294 329 L451 306 M294 350 L457 359" stroke="#444" stroke-width="8" stroke-linecap="round"/>`));

await saveSvg("mountains.png", svg(`
 <rect width="512" height="512" fill="#f8f8f8"/><circle cx="378" cy="126" r="72" fill="#a0a0a0"/>
 <path d="M0 306 L120 177 L213 285 L299 151 L512 354 L512 512 L0 512Z" fill="#454545"/>
 <path d="M0 365 L106 256 L171 326 L279 206 L391 347 L512 250 L512 512 L0 512Z" fill="#6e6e6e"/>
 <path d="M106 256 L132 295 L151 282 L171 326 M279 206 L310 256 L333 237 L364 310" fill="none" stroke="#eeeeee" stroke-width="18"/>
 <path d="M0 399 Q72 364 144 402 T288 400 T432 390 T512 402 L512 512 L0 512Z" fill="#282828"/>
 <path d="M0 432 Q70 413 142 438 T283 431 T425 438 T512 426" fill="none" stroke="#cfcfcf" stroke-width="8"/>`));

const samples = ["pixel-heart.png", "pixel-invader.png", "pixel-smiley.png", "rocket.png", "cat.png", "mountains.png"];
const labels = ["heart", "invader", "smiley", "rocket", "cat", "mountains"];
const cards = await Promise.all(samples.map(async (name, index) => {
    const image = await sharp(file(name)).resize(210, 160, { fit: "contain", background: "white" }).png().toBuffer();
    const x = 30 + (index % 3) * 250, y = 30 + Math.floor(index / 3) * 230;
    return { input: image, left: x, top: y, label: `<text x="${x + 105}" y="${y + 195}" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#222">${labels[index]}</text>` };
}));
const labelsSvg = cards.map((card) => card.label).join("");
await sharp(Buffer.from(svg(`<rect width="780" height="500" fill="#ececec"/>${labelsSvg}`, 780, 500)))
    .composite(cards.map(({ input, left, top }) => ({ input, left, top })))
    .png().toFile(file("overview.png"));
