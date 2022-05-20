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
/**Validate a description and return array reflecting wthich fields are valid and invalid */
export const validateDescriptionPrecisely = (description: DescriptionContentField[]): boolean[] => {
    const validationResult: boolean[] = [];
    const addToValidationResult = (val: boolean) => validationResult.push(val);

    description.forEach((field) => {
        if (field.type === FieldType.HEADER) addToValidationResult(validateHeader(field.header));
        else if (field.type === FieldType.PARAGRAPH) addToValidationResult(validateParagraph(field.content));
        else if (field.type === FieldType.IMAGE) addToValidationResult(validateImage(field.src));
        else if (field.type === FieldType.SPLITTED) {
            let leftSideValidationResult: boolean | null = null;
            let rightSideValidationResult: boolean | null = null;
            // Validate left side
            if (field.left.type === FieldType.PARAGRAPH) leftSideValidationResult = validateParagraph(field.left.content);
            else leftSideValidationResult = validateImage(field.left.src);
            // Validate right side
            if (field.right.type === FieldType.PARAGRAPH) rightSideValidationResult = validateParagraph(field.right.content);
            else rightSideValidationResult = validateImage(field.right.src);

            addToValidationResult(Boolean(leftSideValidationResult && rightSideValidationResult));
        }
    });

    return validationResult;
};
