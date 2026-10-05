import { existsSync } from "node:fs";

import { loadImage } from "./load-image.js";
import { renderImage } from "../src/student.js";

function parseImagePath(argumentsList: string[]): string {
    let image = "assets/pixel-heart.png";
    for (let index = 0; index < argumentsList.length; index += 1) {
        const argument = argumentsList[index];
        if (argument !== "--image") {
            throw new Error("Použi iba --image cesta/k/obrazku.png.");
        }
        image = argumentsList[++index] ?? "";
    }
    if (!image) throw new Error("Chýba cesta po --image. Napríklad assets/pixel-heart.png");
    if (!existsSync(image)) throw new Error(`Obrázok neexistuje: ${image}`);
    return image;
}

async function main(): Promise<void> {
    const imagePath = parseImagePath(process.argv.slice(2));
    const pixels = await loadImage(imagePath);

    const result = renderImage(pixels);

    console.log(result || "Tvoje renderImage zatiaľ nevrátilo text.");
}

main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "Nastala neznáma chyba.";
    console.error(`Chyba: ${message}`);
    process.exitCode = 1;
});
