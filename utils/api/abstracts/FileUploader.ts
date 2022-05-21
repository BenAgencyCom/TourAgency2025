// Types
import type { SubmittedFile } from "@/utils/api/handleMultipartFormDataRequest";
// Helpers
import fse from "fs-extra";
import sharp from "sharp";
import path from "path";
import { uploadDir } from "@/utils/paths";

interface Resolution {
    width: number;
    height: number;
}
interface UsedResolution extends Resolution {
    name: string;
}
type SquareResolutions = "thumbnail" | "small" | "medium" | "large";
type RectangularResolutions = "360p" | "480p" | "720p" | "1080p";
type AvailableResolution = SquareResolutions | RectangularResolutions;

export default abstract class FileUploader {
    private readonly AVAILABLE_RESOLUTIONS: Record<AvailableResolution, Resolution> = {
        thumbnail: {
            width: 56,
            height: 56,
        },
        small: {
            width: 168,
            height: 168,
        },
        medium: {
            width: 360,
            height: 360,
        },
        large: {
            width: 720,
            height: 720,
        },
        "360p": {
            width: 480,
            height: 360,
        },
        "480p": {
            width: 858,
            height: 480,
        },
        "720p": {
            width: 1280,
            height: 720,
        },
        "1080p": {
            width: 1920,
            height: 1080,
        },
    };
    private usedResolutions: UsedResolution[] = [];

    public constructor(resolutions: AvailableResolution[]) {
        if (resolutions.length === 0) throw new Error();

        const { AVAILABLE_RESOLUTIONS, usedResolutions } = this;
        resolutions.forEach((name) => usedResolutions.push({ name, ...AVAILABLE_RESOLUTIONS[name] }));
    }

    /**
     * Upload single file recived from multipart-formdata broker- `@/utils/api/HandleMultipartFormDataRequest`
     */
    protected async uploadSingleFile(file: SubmittedFile, savePath: string): Promise<void> {
        const { filepath: temporaryFilePath } = file;
        const dirPath = path.join(uploadDir, savePath);
        await fse.ensureDir(dirPath);

        const _createPath = (name: string) => path.join(dirPath, `${name}.jpg`);
        for (const { width, height, name } of this.usedResolutions) {
            await sharp(temporaryFilePath).resize(width, height).toFile(_createPath(name));
        }
        await fse.remove(temporaryFilePath);
    }
}
