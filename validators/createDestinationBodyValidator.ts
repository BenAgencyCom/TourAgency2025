// Tools
import joi from "joi";
import { InvalidRequestedBody } from "@/utils/api/Errors";
import { FieldType } from "@/@types/Description";
import createBetterJoiErrors from "@/utils/api/betterJoiErrors";
import restrictions from "@/utils/restrictions/createDestination_OLD";
import GeneralInformationJoiSchema from "@/validators/helpers/create_destination/generalInformationJoiSchema";
import SingleLandmarkJoiSchema from "@/validators/helpers/create_destination/singleLandmarkJoiSchema";
import HandleMultipartFormDataRequest from "@/utils/api/HandleMultipartFormDataRequest";
// Types
import type { BetterJoiError } from "@/utils/api/betterJoiErrors";
import { ImageFileMimetypes } from "@/utils/restrictions/imageFile";
import type { SubmittedFilesCollection } from "@/utils/api/HandleMultipartFormDataRequest";
import type { CreateDestinationRequest, CreateDestinationRequestPardesBody } from "@/@types/router/destination";
import type { DescriptionContentField, SplittedContentField, SplittedSubfieldField } from "@/@types/Description";

interface ValidationResult {
    fields: CreateDestinationRequestPardesBody;
    files: SubmittedFilesCollection;
}

class CreateDestinationRequestBodyValidator {
    private fields: CreateDestinationRequestPardesBody = {} as CreateDestinationRequestPardesBody;
    private files: SubmittedFilesCollection = {};
    constructor(private req: CreateDestinationRequest) {}

    private async parseBody() {
        const { files, fields } = await HandleMultipartFormDataRequest<CreateDestinationRequest["body"]>(this.req);

        const parseProp = (prop: keyof CreateDestinationRequest["body"]) => {
            try {
                (fields as any)[prop] = JSON.parse(fields[prop] as string);
            } catch (e: unknown) {
                throw new InvalidRequestedBody([{ element: prop, message: `${prop} is required`, type: "required" }]);
            }
        };
        parseProp("country");
        parseProp("description");
        parseProp("landmarks");

        this.fields = fields as CreateDestinationRequestPardesBody;
        this.files = files;
    }
    private validateImages() {
        const expectedImages: string[] = ["thumbnail"];
        (this.fields.description as unknown as DescriptionContentField[]).forEach((item) => {
            if (item.type === FieldType.IMAGE) expectedImages.push(item.url as string);
            else if (item.type === FieldType.SPLITTED) {
                if (item.left.type === FieldType.IMAGE) expectedImages.push(item.left.url as string);
                if (item.right.type === FieldType.IMAGE) expectedImages.push(item.right.url as string);
            }
        });
        this.fields.landmarks.forEach((_, index) => expectedImages.push(`landmark_${index + 1}`));

        const actualImages = Object.keys(this.files);
        expectedImages.forEach((imageName) => {
            if (imageName && !actualImages.includes(imageName)) {
                throw new InvalidRequestedBody([
                    {
                        element: imageName,
                        message: "Image has not been provided",
                        type: "required",
                    },
                ]);
            } else if (this.files[imageName] && !ImageFileMimetypes.includes(this.files[imageName].mimetype)) {
                throw new InvalidRequestedBody([
                    {
                        element: imageName,
                        message: "Image has unexpected extension",
                        type: "extension",
                    },
                ]);
            }
        });
    }

    private valideGeneralInformation() {
        const { fields } = this;
        const { error } = GeneralInformationJoiSchema.validate(
            {
                city: fields.city,
                continent: fields.continent,
                country: fields.country,
                population: Number(fields.population),
                quickDescription: fields.quickDescription,
            } as CreateDestinationRequestPardesBody,
            { abortEarly: false }
        );
        if (error) throw new InvalidRequestedBody(createBetterJoiErrors(error));
    }

    private validateLandmarks() {
        this.fields.landmarks.forEach((landmark, index) => {
            const { error } = SingleLandmarkJoiSchema.validate({
                title: landmark.title,
                description: landmark.description,
                type: landmark.type,
                tags: landmark.tags,
            });
            if (error) {
                const betterError = createBetterJoiErrors(error)[0];
                throw new InvalidRequestedBody([
                    {
                        element: `Landmark with index ${index}`,
                        message: "Landmark is invalid",
                        type: `${betterError.element}-${betterError.type}`,
                    },
                ]);
            }
        });
    }

    private validateDescription() {
        const { header, paragraph } = restrictions.description;
        const _headerSchema = joi.string().min(header.min).max(header.max).required();
        const _paragraphSchema = joi.string().min(paragraph.min).max(paragraph.max).required();
        const _imageUrlSchema = joi.string().min(3).max(255).required();

        type ValidationResult = BetterJoiError | null;

        const _element = (index: number, subfield?: string) => `Description field with index ${index}${subfield ? `, subfield- ${subfield.toUpperCase()}` : ""}`;
        const handleValidationResult = (error: ValidationResult, index: number, subfield?: string) => {
            if (error) {
                throw new InvalidRequestedBody([
                    {
                        element: _element(index, subfield),
                        message: error.message,
                        type: error.type,
                    },
                ]);
            }
        };
        const handleUnexpectedType = (index: number, subfield?: string) => {
            throw new InvalidRequestedBody([
                {
                    element: _element(index, subfield),
                    message: "Unexpected type has been provided",
                    type: "unexpected-type",
                },
            ]);
        };
        const validateHeader = (header: string): ValidationResult => {
            const { error } = _headerSchema.validate(header);
            return error ? createBetterJoiErrors(error)[0] : null;
        };
        const validateParagraph = (paragraph: string): ValidationResult => {
            const { error } = _paragraphSchema.validate(paragraph);
            return error ? createBetterJoiErrors(error)[0] : null;
        };
        const validateImage = (img: string): ValidationResult => {
            const { error } = _imageUrlSchema.validate(img);
            return error ? createBetterJoiErrors(error)[0] : null;
        };

        const validateSplitted = (field: SplittedContentField, index: number): ValidationResult => {
            (["left", "right"] as (keyof SplittedContentField)[]).forEach((prop) => {
                const subfield = field[prop] as SplittedSubfieldField;
                if (subfield.type === FieldType.PARAGRAPH) handleValidationResult(validateParagraph(subfield.content), index, prop);
                else if (subfield.type === FieldType.IMAGE) handleValidationResult(validateImage(subfield.url as string), index, prop);
                else handleUnexpectedType(index, prop);
            });
            return null;
        };

        this.fields.description.forEach((field, index) => {
            if (field.type === undefined)
                throw new InvalidRequestedBody([
                    {
                        element: _element(index),
                        message: "Type property is mandatory",
                        type: "no-type-defined",
                    },
                ]);
            else if (field.type === FieldType.HEADER) handleValidationResult(validateHeader(field.header), index);
            else if (field.type === FieldType.PARAGRAPH) handleValidationResult(validateParagraph(field.content), index);
            else if (field.type === FieldType.IMAGE) handleValidationResult(validateImage(field.url as string), index);
            else if (field.type === FieldType.SPLITTED) validateSplitted(field, index);
            else handleUnexpectedType(index);
        });
        //
    }

    async main(): Promise<ValidationResult> {
        await this.parseBody();
        this.validateImages();
        this.valideGeneralInformation();
        this.validateDescription();
        this.validateLandmarks();

        return {
            fields: this.fields,
            files: this.files,
        };
    }
}
/**
 * Validate `fields` and `files` prior to create a destination
 */
const validateCreateDesinationBody = async (req: CreateDestinationRequest): Promise<ValidationResult> => {
    try {
        return await new CreateDestinationRequestBodyValidator(req).main();
    } catch (e: unknown) {
        if (e instanceof InvalidRequestedBody) {
            throw new InvalidRequestedBody(e.joiFeedback);
        } else throw new Error();
    }
};

export default validateCreateDesinationBody;
