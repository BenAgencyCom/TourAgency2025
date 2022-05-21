// Tools
import faker from "faker";
import path from "path";
import fse from "fs-extra";
import FormData from "form-data";
import createValidLandmarkData from "./createValidLandmarkData";
// Types
import type { ValidLandmarkData } from "./@types";
import { Prisma } from "@prisma/client";

const VALID_IMAGE_FILE_PATH = path.join(__dirname, "..", "images", "tiny.jpg");
const INVALID_IMAGE_FILE_PATH = path.join(__dirname, "..", "images", "invalid_image.txt");

export const API_URL = "/api/landmark/create";
export const DESTINATION_ID = "TEST_PURPOSE_ONLY_DESTINATION";

export const VERY_LONG_STRING = faker.lorem.words(300);

export const destinationPrismaData = {
    data: {
        id: DESTINATION_ID,
        //
        city: "Abu dhabi",
        city_lowercase: "abu dhabi",
        continent: "Africa",
        country: "United Arab Emirates",
        countryCode: "AE",
        country_lowercase: "united arab emirates",
        description: [] as any,
        folder: "a",
        population: 1,
        shortDescription: "does not matter",
        slug: "abu_dhabi",
    },
} as Prisma.DestinationCreateArgs;

export const landmarkDataForCreation = createValidLandmarkData(DESTINATION_ID);

export const convertJSONintoFormData = (objectToConvert: Partial<ValidLandmarkData>, loadInvalidImages: boolean = false): FormData => {
    const formData = new FormData();
    const keys: (keyof ValidLandmarkData)[] = ["destinationId", "type", "title", "shortDescription"];
    const imagePath = loadInvalidImages ? INVALID_IMAGE_FILE_PATH : VALID_IMAGE_FILE_PATH;

    keys.forEach((propName) => {
        if (objectToConvert[propName]) formData.append(propName, objectToConvert[propName]);
    });
    if (objectToConvert.description) {
        formData.append("description", JSON.stringify(objectToConvert.description));
        for (let i = 1; i <= 3; i++) formData.append(`description_${i}`, fse.readFileSync(imagePath));
    }
    if (objectToConvert["thumbnail" as keyof ValidLandmarkData]) {
        formData.append(`thumbnail`, fse.readFileSync(imagePath));
    }

    return formData;
};
