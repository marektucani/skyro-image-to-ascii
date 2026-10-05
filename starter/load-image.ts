import sharp from "sharp";

import type { Pixel } from "../src/types.js";

export async function loadImage(path: string): Promise<Pixel[][]> {
    const { data, info } = await sharp(path)
        .flatten({ background: "#ffffff" })
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const rows: Pixel[][] = [];
    for (let y = 0; y < info.height; y += 1) {
        const row: Pixel[] = [];
        for (let x = 0; x < info.width; x += 1) {
            const offset = (y * info.width + x) * info.channels;
            row.push({ red: data[offset], green: data[offset + 1], blue: data[offset + 2] });
        }
        rows.push(row);
    }
    return rows;
}
