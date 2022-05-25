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
    private readonly type: LandmarkType;
    private slug: string;
    private id: string;

    public constructor(params: LandmarkInfo) {
        this.type = params.type;
        // it does not matter at all, just to be roughly random and it will be sufficient
        this.slug = slugGenerator(faker.lorem.words(3));
        this.id = `${Date.now()}_${this.slug}`;
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
                title: "testing landmark",
                title_lowercase: "testing landmark",
            },
        });
        //
    }
    public async remove(): Promise<void> {
        await prisma.destination.delete({
            where: { id: this.id },
        });
    }
}
