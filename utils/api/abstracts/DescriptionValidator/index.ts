// Tools
import { InvalidRequestedBody } from "@/utils/api/Errors";
// Fields' validators
import ImageFieldValidator from "./ImageFieldValidator";
import HeaderFieldValidator from "./HeaderFieldValidator";
import SplittedFieldValidator from "./SplittedFieldValidator";
import ParagraphFieldValidator from "./ParagraphFieldValidator";
// Types
import { FieldType } from "@/@types/Description";
import type { DescriptionContentField, HeaderContentField, ParagraphContentField, ImageContentField, SplittedContentField } from "@/@types/Description";
/**
 * Abstract `DescriptionValidator` is designed to provide easy to use approach
 * to ensure that received from user description match restrictions and is completly
 * save to been save in DB and enjoyed by the community later on.
 *
 * - The only required parameter is a description object\
 * - If any issues are encountered, the `InvalidRequestedBody` error will be thrown
 */
export default abstract class DescriptionValidator {
    public constructor(private description?: DescriptionContentField[]) {}

    public validateDescription() {
        this.ensureThatDescriptionHasBeenReceived();
        this.ensureThatDescriptionIsTypeOfObject();

        (this.description as DescriptionContentField[]).forEach((field, index) => {
            this.distinguishFurtherValidationStep(field, index);
        });
    }

    private ensureThatDescriptionHasBeenReceived() {
        if (!this.description) {
            throw new InvalidRequestedBody([
                {
                    element: `description`,
                    message: `description field is required, but has not been received`,
                    type: "required",
                },
            ]);
        }
    }

    /**
     * Functions ensures that received description is type of object and furthermore is an array.
     */
    private ensureThatDescriptionIsTypeOfObject() {
        if (!(this.description instanceof Object && this.description.map)) {
            throw new InvalidRequestedBody([
                {
                    element: "description",
                    message: `description property has been received with unprocessable type`,
                    type: "invalid type",
                },
            ]);
        }
    }

    /**
     * Expect one param of type `DescriptionContentField`, pushes field into further
     * validation step based on it's type
     */
    private distinguishFurtherValidationStep(field: DescriptionContentField, index: number) {
        switch (field.type as unknown) {
            case FieldType.HEADER:
                return this.validateHeader(field as HeaderContentField, index);
            case FieldType.PARAGRAPH:
                return this.validateParagraph(field as ParagraphContentField, index);
            case FieldType.IMAGE:
                return this.validateImage(field as ImageContentField, index);
            case FieldType.SPLITTED:
                return this.validateSplitted(field as SplittedContentField, index);
            default:
                throw new InvalidRequestedBody([
                    {
                        element: `Description field with index ${index}`,
                        message: `Received unexpected field type- "${field.type as any}"`,
                        type: "Unprocessable value received",
                    },
                ]);
        }
    }
    /** Subsequent step after `distinguishFurtherValidationStep` method */
    private validateHeader(field: HeaderContentField, index: number) {
        new HeaderFieldValidator({ field, index }).validate();
    }
    /** Subsequent step after `distinguishFurtherValidationStep` method */
    private validateParagraph(field: ParagraphContentField, index: number) {
        new ParagraphFieldValidator({ field, index }).validate();
    }
    /** Subsequent step after `distinguishFurtherValidationStep` method */
    private validateImage(field: ImageContentField, index: number) {
        new ImageFieldValidator({ field, index }).validate();
    }
    /** Subsequent step after `distinguishFurtherValidationStep` method */
    private validateSplitted(field: SplittedContentField, index: number) {
        new SplittedFieldValidator({ field, index }).validate();
    }
}
