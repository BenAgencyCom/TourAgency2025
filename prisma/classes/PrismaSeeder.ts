// Tools
import { PrismaClient } from "@prisma/client";
import fse from "fs-extra";
import path from "path";
import { uploadDir } from "../../utils/paths";
import { UploadedPicturesHandler } from "./UploadedPicturesHandler";
// Types
import type { SeederDataList, ModelName } from "../data/@types";

import type { PrismaSeederData } from "./@types";

const prisma = new PrismaClient();

export class PrismaSeeder extends UploadedPicturesHandler {
    protected data: PrismaSeederData;

    public constructor(data: PrismaSeederData) {
        super(data);

        this.data = data;
    }

    protected async seedModel(name: ModelName, dataset: SeederDataList<any>) {
        await (prisma[name] as any).deleteMany();
        this.consoleMsg(`Store ${name} data`);

        const data = dataset.map((el) => {
            const { _imagesDir, ...rest } = el;
            return rest;
        });

        await (prisma[name] as any).createMany({
            data: data as any,
        });
        this.consoleMsg(`${data.length} records have been added`, "SUCCESS");
    }

    private disconectPrisma() {
        prisma.$disconnect();
    }

    async main() {
        try {
            if (process.env.NODE_ENV === "production") return;
            await this.deleteCurrentImages();

            await this.seedModel("user", this.data.userData);
            await this.seedModel("destination", this.data.destinationData);
            await this.seedModel("landmark", this.data.landmarkData);
            await this.seedModel("destinationReview", this.data.destinationReviewData);
            await this.seedModel("landmarkReview", this.data.landmarksReviews);
            await this.seedModel("destinationReviewLike", this.data.destinationReviewLike);
            await this.seedModel("landmarkReviewLike", this.data.landmarkReviewLike);

            await this.uploadAllImages();
            this.disconectPrisma();
        } catch (e) {
            console.error(e);
            this.disconectPrisma();
        }
    }
}
