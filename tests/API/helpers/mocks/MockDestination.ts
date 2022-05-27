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
    private readonly continent: Continent;
    private slug: string;
    public id: string;

    public constructor(params?: DestinationInfo) {
        this.continent = params ? params.continent : "Africa";
        // it does not matter at all, just to be roughly random and it will be sufficient
        this.slug = slugGenerator(faker.lorem.words(3));
        this.id = `${Date.now()}_${this.slug}`;
    }

    public async prepare(): Promise<any> {
        await prisma.destination.create({
            data: {
                id: this.id,
                continent: this.continent,
                slug: this.slug,
                //
                city: "testing",
                city_lowercase: "testing",
                country: "testing",
                countryCode: "testing",
                country_lowercase: "testing",
                description: [],
                folder: this.slug,
                population: 1,
                shortDescription: "testing lorem ipsum",
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
