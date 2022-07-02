// Tools
import faker from "faker";
import prisma from "@/tests/API/helpers/db";
import slugGenerator from "@/utils/api/slugGenerator";
// Types
import type { Mock } from "./@types";
import type { Continent, ContentStatus } from "@prisma/client";

interface DestinationInfo {
    continent?: Continent;
    status?: ContentStatus;
}

export default class MockDestination implements Mock {
    public id: string | null = null;
    public city: string | null = null;
    public country: string | null = null;

    public constructor() {}

    public async prepare(params?: DestinationInfo): Promise<MockDestination> {
        const slug = slugGenerator(faker.lorem.words(3));
        const { id, country, city, status } = await prisma.destination.create({
            data: {
                continent: (params && params.continent) ?? "Europe",
                slug,
                status: (params && params.status) ?? "APPROVED",
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
        this.city = city;
        this.country = country;

        return this;
    }
    public async remove(): Promise<MockDestination> {
        if (this.id !== null) {
            await prisma.destination.delete({
                where: { id: this.id },
            });
        }
        this.id = null;
        this.city = null;
        this.country = null;

        return this;
    }
}
