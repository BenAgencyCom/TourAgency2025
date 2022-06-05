// Tools
import faker from "faker";
import prisma from "@/tests/API/helpers/db";
import slugGenerator from "@/utils/api/slugGenerator";
// Types
import type { Mock } from "./@types";
import type { LandmarkType, ContentStatus } from "@prisma/client";

interface LandmarkInfo {
    type?: LandmarkType;
    status?: ContentStatus;
}

export default class MockLandmark implements Mock {
    public readonly type: LandmarkType;
    public readonly slug: string;
    public readonly id: string;
    public readonly title: string;
    public readonly status: ContentStatus;

    public constructor(params?: LandmarkInfo) {
        this.type = params?.type ? params.type : "ANTIQUE";
        this.status = params?.status ? params.status : "APPROVED";
        // it does not matter at all, just to be roughly random and it will be sufficient
        this.slug = slugGenerator(faker.lorem.words(3));
        this.id = `${Date.now()}_${this.slug}`;
        this.title = faker.lorem.words(3).slice(0, 50);
    }

    public async prepare(destinationId: string): Promise<MockLandmark> {
        await prisma.landmark.create({
            data: {
                id: this.id,
                slug: this.slug,
                type: this.type,
                status: this.status,
                destinationId: destinationId,
                shortDescription: "testing lorem ipsum",
                description: [],
                folder: this.slug,
                title: this.title,
                title_lowercase: this.title.toLowerCase(),
            },
        });
        return this;
    }
    public async remove(): Promise<MockLandmark> {
        await prisma.landmark.delete({
            where: { id: this.id },
        });
        return this;
    }
}
