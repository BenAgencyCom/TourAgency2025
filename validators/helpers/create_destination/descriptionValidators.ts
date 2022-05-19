// Tools
import joi from "joi";
import restrictions from "@/utils/restrictions/createDestination_OLD";
import { ValidationError } from "@/utils/api/Errors";
import { FieldType } from "@/@types/Description";
// Types
import type { DescriptionContentField } from "@/@types/Description";

const { header, paragraph } = restrictions.description;
// Schemas
const _headerSchema = joi.string().min(header.min).max(header.max);
const _paragraphSchema = joi.string().min(paragraph.min).max(paragraph.max);
// Description validators
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
export const validateDescription = (description: DescriptionContentField[]): boolean => {
    const ensure = (condition: boolean) => {
        if (!condition) throw new ValidationError();
    };
    try {
        description.forEach((field) => {
            if (field.type === FieldType.HEADER) ensure(validateHeader(field.header));
            else if (field.type === FieldType.PARAGRAPH) ensure(validateParagraph(field.content));
            else if (field.type === FieldType.IMAGE) ensure(validateImage(field.src));
        });
        return true;
    } catch (e: unknown) {
        if (e instanceof ValidationError) return false;
        else {
            return false;
        }
    }
};
