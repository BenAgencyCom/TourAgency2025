// Tools
import path from "path";
import faker from "faker";
import fse from "fs-extra";
import FormData from "form-data";
import _createValidDestinationData from "./createValidDestinationData";
// Types
import type { ValidDestinationData } from "./@types";
export const createValidDestinationData = _createValidDestinationData;

const IMAGE_FILE_PATH = path.join(__dirname, "..", "..", "images", "tiny.jpg");

export const VERY_LONG_STRING = faker.lorem.words(300);

export const EXPECTED_DESCRIPTION_IMAGES = ["description_1", "description_2", "description_3"];

export const convertJSONintoFormData = (objectToConvert: Partial<ValidDestinationData>): FormData => {
    const formData = new FormData();
    const keys: (keyof ValidDestinationData)[] = ["city", "population", "shortDescription", "continent"];
    keys.forEach((propName) => {
        if (objectToConvert[propName]) formData.append(propName, objectToConvert[propName]);
    });
    if (objectToConvert.country) {
        formData.append("country", JSON.stringify(objectToConvert.country));
    }
    if (objectToConvert.description) {
        formData.append("description", JSON.stringify(objectToConvert.description));
        for (let i = 1; i <= 3; i++) formData.append(`description_${i}`, fse.readFileSync(IMAGE_FILE_PATH));
    }
    if (objectToConvert["thumbnail" as keyof ValidDestinationData]) {
        formData.append(`thumbnail`, fse.readFileSync(IMAGE_FILE_PATH));
    }

    return formData;
};
