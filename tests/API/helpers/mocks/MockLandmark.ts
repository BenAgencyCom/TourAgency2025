// Tools
import faker from "faker";
import slugGenerator from "@/utils/api/slugGenerator";
import { prisma } from "../db";
// Types
import type { Mock } from "./@types";
import type { LandmarkType } from "@prisma/client";

interface LandmarkInfo {
    type: LandmarkType;
}

export default class MockLandmark implements Mock {
    public readonly type: LandmarkType;
    public readonly slug: string;
    public readonly id: string;
    public readonly title: string;

    public constructor(params?: LandmarkInfo) {
        this.type = params ? params.type : "ANTIQUE";
        // it does not matter at all, just to be roughly random and it will be sufficient
        this.slug = slugGenerator(faker.lorem.words(3));
        this.id = `${Date.now()}_${this.slug}`;
        this.title = faker.lorem.words(3).slice(0, 50);
    }

    public async prepare(destinationId: string): Promise<any> {
        await prisma.landmark.create({
            data: {
                id: this.id,
                slug: this.slug,
                type: this.type,
                destinationId: destinationId,
                shortDescription: "testing lorem ipsum",
                description: [],
                folder: this.slug,
                title: this.title,
                title_lowercase: this.title.toLowerCase(),
            },
        });
        //
    }
    public async remove(): Promise<void> {
        await prisma.landmark.delete({
            where: { id: this.id },
        });
    }
}
