import path from "path";
import fse from "fs-extra";
import sharp from "sharp";

const resolutions = [
    {
        name: "360p",
        width: 480,
        height: 360,
    },
    {
        name: "480p",
        width: 858,
        height: 480,
    },
    {
        name: "720p",
        width: 1280,
        height: 720,
    },
    {
        name: "1080p",
        width: 1920,
        height: 1080,
    },
];

const p = path.join(__dirname, "prisma", "data", "images", "landmarks");

(async () => {
    const dirs = fse.readdirSync(p);
    for (const dirName of dirs) {
        for (const { name, width, height } of resolutions) {
            if (await fse.pathExists(path.join(p, dirName, "image.jpg")))
                await sharp(path.join(p, dirName, "image.jpg"))
                    .resize(width, height)
                    .toFile(path.join(p, dirName, `${name}.jpg`));
        }
    }
})();
