import type { NextApiRequest, NextApiResponse } from "next";
import type { CountryType } from "@/data/countries";
import { PersistentFile } from "formidable";
import { PrismaClient } from "@prisma/client";
import { prismaCertainProps } from "@/utils/prismaCertainProps";
import formidable from "formidable";
import { uploadDir } from "@/utils/paths";
import slugGenerator from "@/utils/slugGenerator";
import fse from "fs-extra";
import path from "path";
import sharp from "sharp";
//
const prisma = new PrismaClient();
//
interface RegisterRequest extends NextApiRequest {
    body: {
        name: string;
        surname: string;
        email: string;
        country: CountryType;
        sex: "MALE" | "FEMALE" | "OTHER";
        password: string;
        passwordRepeatation: string;
        born: Date;
    };
}
export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler(req: RegisterRequest, res: NextApiResponse) {
    class Register {
        private folderName: string;
        constructor(private fields: RegisterRequest["body"], private files: Record<string, { originalFilename: string; filepath: string }>) {
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

        public async main(): Promise<void> {
            await this.uploadAvatar();
        }
    }

    const { fields, files } = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({ uploadDir: path.join(uploadDir, "temp") });
        form.parse(req, async (err, fields, files) => {
            resolve({ fields: fields, files: files });
        });
    });

    await new Register(fields, files).main();
    res.status(201).end();
}
