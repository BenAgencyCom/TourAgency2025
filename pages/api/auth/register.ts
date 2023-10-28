// Libraries
import path from "path";
import sharp from "sharp";
import fse from "fs-extra";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/db";
// Types
import type { User } from "@prisma/client";
import type { NextApiResponse } from "next";
import type { CountryType } from "@/data/countries";
import { ImageFileMimetypes } from "@/utils/restrictions/imageFile";
import type { RegisterRequest, RegisterBody } from "@/@types/router/auth/register";
import type { SubmittedFilesCollection } from "@/utils/api/HandleMultipartFormDataRequest";
// My helpers
import { uploadDir } from "@/utils/paths";
import slugGenerator from "@/utils/api/slugGenerator";
import CookieCreator from "@/utils/api/abstracts/CookieCreator";
import { InvalidRequestedBody } from "@/utils/api/Errors";
import RegisterBodyValidator from "@/validators/registerBodyValidator";
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
import HandleMultipartFormDataRequest from "@/utils/api/HandleMultipartFormDataRequest";
//
//
//
export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler(req: RegisterRequest, res: NextApiResponse) {
    class Register extends CookieCreator {
        private folderName: string | null;
        private avatarsFilePath: string | null = null;

        constructor(private fields: RegisterBody, files: SubmittedFilesCollection) {
            super(res);

            this.folderName = slugGenerator(`${fields.email}_${fields.name}_${fields.surname}_`).slice(0, 200);
            if (files.avatar && ImageFileMimetypes.includes(files.avatar.mimetype)) {
                this.avatarsFilePath = files.avatar.filepath;
            }
        }

        private async uploadAvatar(): Promise<void> {
            const { avatarsFilePath, folderName } = this;
            if (avatarsFilePath === null) return;

            const dirName = path.join(uploadDir, "avatars", folderName as string);
            const __createNewFileName = (type: string): string => path.join(dirName, `${type}.jpg`);

            await fse.ensureDir(dirName);
            await sharp(avatarsFilePath).resize(56, 56).toFile(__createNewFileName("thumbnail"));
            await sharp(avatarsFilePath).resize(168, 168).toFile(__createNewFileName("small"));
            await sharp(avatarsFilePath).resize(360, 360).toFile(__createNewFileName("medium"));
            await sharp(avatarsFilePath).resize(720, 720).toFile(__createNewFileName("large"));
            await fse.remove(avatarsFilePath);
        }

        private async validateFileds(): Promise<void> {
            const validationResult = await RegisterBodyValidator(this.fields);
            if (validationResult !== true) throw new InvalidRequestedBody(validationResult);
        }

        private async cryptPassword(): Promise<string> {
            return await bcrypt.hash(this.fields.password, await bcrypt.genSalt());
        }

        private async saveUserInDB(): Promise<User> {
            const { fields, folderName, avatarsFilePath } = this;
            const { label: countryName, code: countryCode } = JSON.parse(this.fields.country as string) as CountryType;

            return await prisma.user.create({
                data: {
                    avatar: avatarsFilePath !== null ? folderName : null,
                    birth: new Date(fields.birth),
                    country: countryName,
                    countryCode: countryCode.toLowerCase(),
                    email: fields.email,
                    emailVerified: null,
                    gender: fields.gender,
                    name: fields.name,
                    surname: fields.surname,
                    password: await this.cryptPassword(),
                },
            });
        }

        public async main(): Promise<void> {
            await this.validateFileds();
            await this.uploadAvatar();
            const user = await this.saveUserInDB();
            // Cookie
            this.createAccessToken(user);
            this.generateCookieHeader();
            await this.createSession(user.email as string);
        }
    }

    try {
        const { fields, files } = await HandleMultipartFormDataRequest<RegisterBody>(req);
        await GuardedAPIEndpoint(req, "POST", "anonymous");
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
