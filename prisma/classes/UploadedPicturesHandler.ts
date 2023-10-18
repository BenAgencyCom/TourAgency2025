// Tools
import fse from "fs-extra";
import path from "path";
import { uploadDir } from "../../utils/paths";
import ConsolePrettier from "../../utils/ConsolePrettier";
// Types
import type { PrismaSeederData } from "./@types";

export class UploadedPicturesHandler extends ConsolePrettier {
    private FOLDERS_TO_REFRESH: readonly string[] = ["avatars", "temp", "destinations", "landmarks"];

    protected imagesToUpload: Set<string> = new Set();

    public constructor(data: PrismaSeederData) {
        super();

        for (const [_, value] of Object.entries(data)) {
            if (Array.isArray(value)) {
                for (const el of value) {
                    if (el._imagesDir) this.imagesToUpload.add(el._imagesDir);
                }
            }
        }
    }

    protected async deleteCurrentImages() {
        this.consoleMsg("Delete currently storing images");

        for (const folder of this.FOLDERS_TO_REFRESH) {
            const uploadedFolderPath = path.join(uploadDir, folder);
            const pathExists: boolean = fse.pathExistsSync(uploadedFolderPath);

            if (pathExists) await fse.remove(uploadedFolderPath);

            await fse.mkdir(uploadedFolderPath);
            this.consoleMsg(`${folder}- folder has been revamped`, "SUCCESS");
        }
    }

    protected async uploadAllImages() {
        this.consoleMsg("Save all images distinguished in above steps");
        const dataDir = path.join(__dirname, "..", "data", "images");

        console.log(this.imagesToUpload);

        for (const folderName of Array.from(this.imagesToUpload)) {
            try {
                await fse.copy(path.join(dataDir, folderName), path.join(uploadDir, folderName));
                this.consoleMsg(`${folderName} images director has been stored`, "SUCCESS");
            } catch (e) {
                this.consoleMsg(`${folderName} images director has NOT been stored`, "ERROR");
            }
        }
    }

    public async main() {
        await this.deleteCurrentImages();
        await this.uploadAllImages();
    }
}
