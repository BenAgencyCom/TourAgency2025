// Tools
import { PrismaClient } from "@prisma/client";
import faker from "faker/locale/de";
import fse from "fs-extra";
import FormData from "form-data";
import path from "path";
// Types
import type { CreateDestinationRequest } from "@/@types/router/destination";
import { FieldType } from "@/@types/Description";

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
            header: faker.lorem.words(10).slice(0, 50),
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
            content: faker.lorem.words(300).slice(0, 1000),
        },
        {
            type: FieldType.IMAGE,
            src: null,
            url: "description_3",
        },
    ],
    quickDescription: faker.lorem.words(20).slice(0, 150),
    population: 10000,
    landmarks: [
        {
            type: "ANTIQUE",
            description: faker.lorem.words(100).slice(0, 1000),
            title: faker.lorem.words(6).slice(0, 49),
            tags: [faker.lorem.words(2).slice(0, 20), faker.lorem.words(2).slice(0, 20), faker.lorem.words(2).slice(0, 20)],
            pictureURL: "landmark_1",
        },
        {
            type: "RESTAURANT",
            description: faker.lorem.words(100).slice(0, 1000),
            title: faker.lorem.words(6).slice(0, 49),
            tags: [faker.lorem.words(2).slice(0, 20), faker.lorem.words(2).slice(0, 20), faker.lorem.words(2).slice(0, 20)],
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

// For testing validators
export const formDataWithoutThumbnail: FormData = (() => {
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
    body.append("description_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_2", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_3", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("landmark_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("landmark_2", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));

    return body;
})();

export const formDataWithoutDescriptionImage: FormData = (() => {
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
    body.append("thumbnail", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_2", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("landmark_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("landmark_2", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));

    return body;
})();

export const formDataWithoutLandmarkImage: FormData = (() => {
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
    body.append("thumbnail", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_2", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_3", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("landmark_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));

    return body;
})();

export const formWithInvalidGeneralInformation: FormData = (() => {
    const body = new FormData();
    // Data:
    body.append("city", faker.lorem.sentence(100));
    body.append("continent", "essa");
    body.append("description", JSON.stringify(data.description));
    body.append("landmarks", JSON.stringify(data.landmarks));
    // Images
    body.append("thumbnail", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_2", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_3", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("landmark_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("landmark_2", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));

    return body;
})();

export const formDataWithInvalidLandmarks: FormData = (() => {
    const body = new FormData();
    // Data:
    body.append("city", data.city);
    body.append("continent", data.continent);
    body.append("country", JSON.stringify(data.country));
    body.append("description", JSON.stringify(data.description));
    body.append("quickDescription", data.quickDescription);
    body.append("population", data.population);
    body.append(
        "landmarks",
        JSON.stringify([
            {
                type: "ANTIQUE",
                description: faker.lorem.words(1500), // Invalid length
                title: faker.lorem.words(6).slice(0, 50),
                tags: [faker.lorem.words(1), faker.lorem.words(1), faker.lorem.words(1)],
                pictureURL: "landmark_1",
            },
            {
                type: "RESTAURANT",
                description: faker.lorem.words(100),
                title: faker.lorem.words(6).slice(0, 50),
                tags: [faker.lorem.words(1), faker.lorem.words(1), faker.lorem.words(1)],
                pictureURL: "landmark_2",
            },
        ])
    );
    // Images
    body.append("thumbnail", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_2", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_3", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("landmark_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("landmark_2", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));

    return body;
})();

//
const _createFormDataWithInvalidDescription = (description: Record<any, unknown>[]): FormData => {
    const body = new FormData();
    // Data:
    body.append("city", data.city);
    body.append("continent", data.continent);
    body.append("country", JSON.stringify(data.country));
    body.append("description", JSON.stringify(description));
    body.append("quickDescription", data.quickDescription);
    body.append("population", data.population);
    body.append("landmarks", JSON.stringify(data.landmarks));
    // Images
    body.append("thumbnail", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_2", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("description_3", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("landmark_1", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));
    body.append("landmark_2", fse.createReadStream(path.join(__dirname, "images", "destination", "tiny.jpg")));

    return body;
};
export const formDataWithInvalidDescription__NoTypeProvided: FormData = (() => {
    return _createFormDataWithInvalidDescription([
        {
            // INVALID
            header: faker.lorem.words(10).slice(0, 50),
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
            content: faker.lorem.words(300).slice(0, 1000),
        },
        {
            type: FieldType.IMAGE,
            src: null,
            url: "description_3",
        },
    ]);
})();
export const formDataWithInvalidDescription__UnexpectedType: FormData = (() => {
    return _createFormDataWithInvalidDescription([
        {
            type: FieldType.HEADER,
            header: faker.lorem.words(10).slice(0, 50),
        },
        {
            type: "ESSA", // INVALID
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
            content: faker.lorem.words(300).slice(0, 1000),
        },
        {
            type: FieldType.IMAGE,
            src: null,
            url: "description_3",
        },
    ]);
})();
export const formDataWithInvalidDescription__NoImageProvided: FormData = (() => {
    return _createFormDataWithInvalidDescription([
        {
            type: FieldType.HEADER,
            header: faker.lorem.words(10).slice(0, 50),
        },
        {
            type: FieldType.SPLITTED,
            left: {
                type: FieldType.IMAGE,
                src: null,
                // INVALID
            },
            right: {
                type: FieldType.IMAGE,
                src: null,
                url: "description_2",
            },
        },
        {
            type: FieldType.PARAGRAPH,
            content: faker.lorem.words(300).slice(0, 1000),
        },
        {
            type: FieldType.IMAGE,
            src: null,
            url: "description_3",
        },
    ]);
})();
export const formDataWithInvalidDescription__InvalidHeaderLength: FormData = (() => {
    return _createFormDataWithInvalidDescription([
        {
            type: FieldType.HEADER,
            header: faker.lorem.words(100), // INVALID
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
            content: faker.lorem.words(300).slice(0, 1000),
        },
        {
            type: FieldType.IMAGE,
            src: null,
            url: "description_3",
        },
    ]);
})();
export const formDataWithInvalidDescription__InvalidParagraphLengthInSplittedField: FormData = (() => {
    return _createFormDataWithInvalidDescription([
        {
            type: FieldType.HEADER,
            header: faker.lorem.words(10).slice(0, 50),
        },
        {
            type: FieldType.SPLITTED,
            left: {
                type: FieldType.IMAGE,
                src: null,
                url: "description_1",
            },
            right: {
                type: FieldType.PARAGRAPH,
                content: "too short", //INVALID
            },
        },
        {
            type: FieldType.PARAGRAPH,
            content: faker.lorem.words(300).slice(0, 1000),
        },
        {
            type: FieldType.IMAGE,
            src: null,
            url: "description_3",
        },
    ]);
})();
