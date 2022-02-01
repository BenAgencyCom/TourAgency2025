// Tools
import { PrismaClient } from "@prisma/client";
import fse from "fs-extra";
import path from "path";
import ConsolePrettier from "../utils/ConsolePrettier";
// Data
import userData from "./data/users";
import destinationsData from "./data/destinations";
import landmarksData from "./data/landmarks";
// Types
import { SeederDataList, User, Destination, Landmark } from "./data/@types";
import { uploadDir } from "../utils/paths";

const prisma = new PrismaClient();

class PrismaSeeder extends ConsolePrettier {
    protected imagesToUpload: string[] = [];
    public constructor(
        protected userData: SeederDataList<User>, //
        protected destinationsData: SeederDataList<Destination>,
        protected landmarksData: SeederDataList<Landmark>
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

    protected async seedUsers() {
        await prisma.user.deleteMany();
        this.consoleMsg("Store user data");
        const data = this.userData.map((el) => {
            const { _imagesDir, ...rest } = el;
            if (_imagesDir) this.imagesToUpload.push(_imagesDir);
            return rest;
        });

        await prisma.user.createMany({
            data: data as any,
        });
        this.consoleMsg(`${data.length} records have been added`, "SUCCESS");
    }

    protected async seedDestinations() {
        await prisma.destination.deleteMany();
        this.consoleMsg("Store destinations data");
        const data = this.destinationsData.map((el) => {
            const { _imagesDir, ...rest } = el;
            if (_imagesDir) this.imagesToUpload.push(_imagesDir);
            return rest;
        });

        await prisma.destination.createMany({
            data: data as any,
        });
        this.consoleMsg(`${data.length} records have been added`, "SUCCESS");
    }

    protected async seedLandmarks() {
        await prisma.landmark.deleteMany();
        this.consoleMsg("Store destinations data");
        const data = this.landmarksData.map((el) => {
            const { _imagesDir, ...rest } = el;
            if (_imagesDir) this.imagesToUpload.push(_imagesDir);
            return rest;
        });

        await prisma.landmark.createMany({
            data: data as any,
        });
        this.consoleMsg(`${data.length} records have been added`, "SUCCESS");
    }

    protected async uploadAllImages() {
        this.consoleMsg("Save all images distinguished in above steps");
        const dataDir = path.join(__dirname, "data", "images");
        for (const img of this.imagesToUpload) {
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
        await prisma.user.deleteMany();
        await this.seedUsers();
        await this.seedDestinations();
        await this.seedLandmarks();

        await this.uploadAllImages();
    }
}

const main = async () => {
    console.clear();
    await new PrismaSeeder(userData, destinationsData, landmarksData).main();
};

main();
