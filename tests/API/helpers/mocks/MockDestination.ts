// Tools
import faker from "faker";
import prisma from "@/tests/API/helpers/db";
import slugGenerator from "@/utils/api/slugGenerator";
// Types
import type { Mock } from "./@types";
import type { Continent } from "@prisma/client";

interface DestinationInfo {
    continent: Continent;
}

export default class MockDestination implements Mock {
    public id: string | null = null;

    public constructor() {}

    public async prepare(params?: DestinationInfo): Promise<MockDestination> {
        const slug = slugGenerator(faker.lorem.words(3));
        const { id } = await prisma.destination.create({
            data: {
                continent: (params && params.continent) ?? "Europe",
                slug,
                //
                city: "testing",
                city_lowercase: "testing",
                country: "testing",
                countryCode: "testing",
                country_lowercase: "testing",
                description: [],
                folder: slug,
                population: 1,
                shortDescription: "testing lorem ipsum",
            },
        });
        this.id = id;
        return this;
    }
    public async remove(): Promise<MockDestination> {
        await prisma.destination.delete({
            where: { id: this.id as string },
        });
        this.id = null;
        return this;
    }
}
