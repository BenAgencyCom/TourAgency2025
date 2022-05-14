// Tools
import { PrismaClient } from "@prisma/client";
import fse from "fs-extra";
import path from "path";
import ConsolePrettier from "../utils/ConsolePrettier";
// Data
import userData from "./data/users";
import destinationData from "./data/destinations";
import landmarkData from "./data/landmarks";
import destinationReviewData from "./data/destinationsReviews";
import landmarksReviews from "./data/landmarksReviews";
import destinationReviewLike from "./data/destinationsReviewsLikes";
import landmarkReviewLike from "./data/landmarksReviewsLikes";
// Types
import { SeederDataList, User, Destination, Landmark, DestinationReview, ModelName, LandmarkReview, DestinationReviewLike, LandmarkReviewLike } from "./data/@types";
import { uploadDir } from "../utils/paths";

const prisma = new PrismaClient();

class PrismaSeeder extends ConsolePrettier {
    protected imagesToUpload: Set<string> = new Set();
    public constructor(
        protected userData: SeederDataList<User>, //
        protected destinationData: SeederDataList<Destination>,
        protected landmarkData: SeederDataList<Landmark>,
        protected destinationReviewData: SeederDataList<DestinationReview>,
        protected landmarksReviews: SeederDataList<LandmarkReview>,
        protected destinationReviewLike: SeederDataList<DestinationReviewLike>,
        protected landmarkReviewLike: SeederDataList<LandmarkReviewLike>
    ) {
        super();
    }

    protected async deleteCurrentImages() {
        const foldersToRefresh = ["avatars", "temp", "destinations", "landmarks"];
        this.consoleMsg("Delete currently storing images");

        for (const folder of foldersToRefresh) {
            await fse.remove(path.join(uploadDir, folder));
            await fse.mkdir(path.join(uploadDir, folder));
            this.consoleMsg(`${folder}- folder has been revamped`, "SUCCESS");
        }
    }

    protected async seedModel(name: ModelName, dataset: SeederDataList<any>) {
        await (prisma[name] as any).deleteMany();
        this.consoleMsg(`Store ${name} data`);

        const data = dataset.map((el) => {
            const { _imagesDir, ...rest } = el;
            if (_imagesDir) this.imagesToUpload.add(_imagesDir);
            return rest;
        });

        await (prisma[name] as any).createMany({
            data: data as any,
        });
        this.consoleMsg(`${data.length} records have been added`, "SUCCESS");
    }

    protected async uploadAllImages() {
        this.consoleMsg("Save all images distinguished in above steps");
        const dataDir = path.join(__dirname, "data", "images");
        for (const img of Array.from(this.imagesToUpload)) {
            try {
                await fse.copy(path.join(dataDir, img), path.join(uploadDir, img));
                this.consoleMsg(`${img} images director has been stored`, "SUCCESS");
            } catch (e) {
                this.consoleMsg(`${img} images director has NOT been stored`, "ERROR");
            }
        }
    }

    async main() {
        if (process.env.NODE_ENV === "production") return;
        await this.deleteCurrentImages();

        await this.seedModel("user", this.userData);
        await this.seedModel("destination", this.destinationData);
        await this.seedModel("landmark", this.landmarkData);
        await this.seedModel("destinationReview", this.destinationReviewData);
        await this.seedModel("landmarkReview", this.landmarksReviews);
        await this.seedModel("destinationReviewLike", this.destinationReviewLike);
        await this.seedModel("landmarkReviewLike", this.landmarkReviewLike);

        await this.uploadAllImages();
    }
}

const main = async () => {
    console.clear();
    await new PrismaSeeder(userData, destinationData, landmarkData, destinationReviewData, landmarksReviews, destinationReviewLike, landmarkReviewLike).main();
};

main();
