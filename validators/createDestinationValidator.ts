// Tools
import joi from "joi";
import restrictions from "@/utils/restrictions/createDestination";
import { ValidationError } from "@/utils/api/Errors";
import { FieldType } from "@/@types/DestinationDescription";
// Types
import type { DestinationContentField } from "@/@types/DestinationDescription";

const { header, paragraph } = restrictions.description;
// Schemas
const _headerSchema = joi.string().min(header.min).max(header.max);
const _paragraphSchema = joi.string().min(paragraph.min).max(paragraph.max);
// Validators
const _throwError = (condition: boolean) => {
    if (!condition) throw new ValidationError();
};
const validateHeader = (header: string) => {
    const { error } = _headerSchema.validate(header);
    return !Boolean(error);
};
const validateParagraph = (paragraph: string) => {
    const { error } = _paragraphSchema.validate(paragraph);
    return !Boolean(error);
};
const validateImage = (img: unknown): boolean => {
    if (img instanceof File) {
        return ["image/png", "image/jpeg"].includes(img.type);
    } else return false;
};
export const validateDescription = (description: DestinationContentField[]): boolean => {
    try {
        description.forEach((field) => {
            if (field.type === FieldType.HEADER) _throwError(validateHeader(field.header));
            else if (field.type === FieldType.PARAGRAPH) _throwError(validateParagraph(field.content));
            else if (field.type === FieldType.IMAGE) _throwError(validateImage(field.src));
        });
        return true;
    } catch (e: unknown) {
        if (e instanceof ValidationError) return false;
        else {
            console.error(e);
            return false;
        }
    }
};
