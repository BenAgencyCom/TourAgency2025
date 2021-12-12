// Libraries
import fse from "fs-extra";
import path from "path";
import sharp from "sharp";
import formidable from "formidable";
import { PrismaClient } from "@prisma/client";
// Types
import type { NextApiResponse } from "next";
import type { RegisterRequest, RegisterBody } from "@/@types/router/auth/register";
// My helpers
import { uploadDir } from "@/utils/paths";
import slugGenerator from "@/utils/slugGenerator";
import { InvalidRequestedBody } from "@/utils/Errors";
import RegisterBodyValidator from "@/validators/registerBodyValidator";
//
const prisma = new PrismaClient();
//

export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler(req: RegisterRequest, res: NextApiResponse) {
    class Register {
        private folderName: string;

        constructor(private fields: RegisterBody, private files: Record<string, { originalFilename: string; filepath: string }>) {
            this.folderName = slugGenerator(`${fields.email}_${fields.name}_${fields.surname}_`).slice(0, 200);
        }

        private async uploadAvatar(): Promise<void> {
            const { files, folderName } = this;
            for (const fileName in files) {
                const file = files[fileName];
                const dirName = path.join(uploadDir, "avatars", folderName);
                await fse.ensureDir(dirName);

                const createNewFileName = (type: string): string => path.join(dirName, `${type}.jpg`);
                await sharp(file.filepath).resize(56, 56).toFile(createNewFileName("thumbnail"));
                await sharp(file.filepath).resize(168, 168).toFile(createNewFileName("small"));
                await sharp(file.filepath).resize(360, 360).toFile(createNewFileName("medium"));
                await sharp(file.filepath).resize(720, 720).toFile(createNewFileName("large"));

                await fse.remove(file.filepath);
            }
        }

        private async validateFileds(): Promise<void> {
            const validationResult = await RegisterBodyValidator(this.fields);
            if (validationResult !== true) throw new InvalidRequestedBody(validationResult);
        }

        public async main(): Promise<void> {
            await this.validateFileds();
            // await this.uploadAvatar();
        }
    }

    const { fields, files } = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({ uploadDir: path.join(uploadDir, "temp") });
        form.parse(req, async (err, fields, files) => {
            resolve({ fields: fields, files: files });
        });
    });

    try {
        await new Register(fields, files).main();
        res.status(201).end();
    } catch (e: unknown) {
        if (e instanceof InvalidRequestedBody) {
            res.status(400).json(e.joiFeedback);
        } else {
            res.status(500).end();
        }
    }
}
