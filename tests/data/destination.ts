// Tools
import { PrismaClient } from "@prisma/client";
import faker from "faker/locale/de";
import fse from "fs-extra";
import FormData from "form-data";
import path from "path";
// Types
import type { LandmarkType, Continent, User } from "@prisma/client";
import type { CreateDestinationRequest } from "../../@types/router/destination";
import { FieldType } from "../../@types/DestinationDescription";

const prisma = new PrismaClient();
const API_ADDRESS = "http://localhost:3000";

export const data = {
    city: faker.address.cityName(),
    continent: "Europe",
    country: {
        code: "DE",
        label: "Germany",
        phone: "49",
    },
    description: [
        {
            type: FieldType.HEADER,
            header: faker.lorem.sentence(49),
        },
        {
            type: FieldType.SPLITTED,
            left: {
                type: FieldType.IMAGE,
                src: null,
                url: "description_1",
            },
            right: {
                type: FieldType.IMAGE,
                src: null,
                url: "description_2",
            },
        },
        {
            type: FieldType.PARAGRAPH,
            content: faker.lorem.sentence(1000),
        },
        {
            type: FieldType.IMAGE,
            src: null,
            url: "description_3",
        },
    ],
    quickDescription: faker.lorem.sentence(75),
    population: "100000",
    landmarks: [
        {
            type: "ANTIQUE",
            description: faker.lorem.sentence(1000),
            title: faker.lorem.sentence(50),
            tags: [faker.lorem.sentence(20), faker.lorem.sentence(20), faker.lorem.sentence(20)],
            pictureURL: "landmark_1",
        },
        {
            type: "RESTAURANT",
            description: faker.lorem.sentence(1000),
            title: faker.lorem.sentence(50),
            tags: [faker.lorem.sentence(20), faker.lorem.sentence(20), faker.lorem.sentence(20)],
            pictureURL: "landmark_2",
        },
    ],
} as CreateDestinationRequest["body"];

export const formData: FormData = (() => {
    const body = new FormData();
    // Data:
    body.append("city", data.city);
    body.append("continent", data.continent);
    body.append("country", JSON.stringify(data.country));
    body.append("description", JSON.stringify(data.description));
    body.append("quickDescription", data.quickDescription);
    body.append("population", data.population);
    body.append("landmarks", JSON.stringify(data.landmarks));
    // Images
    body.append("thumbnail", fse.createReadStream(path.join(__dirname, "images", "destination", "thumbnail.jpg")));
    body.append("description_1", fse.createReadStream(path.join(__dirname, "images", "destination", "description_1.jpg")));
    body.append("description_2", fse.createReadStream(path.join(__dirname, "images", "destination", "description_2.jpg")));
    body.append("description_3", fse.createReadStream(path.join(__dirname, "images", "destination", "description_3.jpg")));
    body.append("landmark_1", fse.createReadStream(path.join(__dirname, "images", "destination", "landmark_1.jpg")));
    body.append("landmark_2", fse.createReadStream(path.join(__dirname, "images", "destination", "landmark_2.jpg")));

    return body;
})();
