// Tools
import joi from "joi";
import { InvalidRequestedBody } from "@/utils/api/Errors";
import createBetterJoiErrors from "@/utils/api/betterJoiErrors";
import restrictions from "@/utils/restrictions/createDescription";
// Fields' validators
import ImageFieldValidator from "./ImageFieldValidator";
import ParagraphFieldValidator from "./ParagraphFieldValidator";
// Types
import { FieldType } from "@/@types/Description";
import type { SplittedContentField, SplittedSubfieldField, ImageContentField, ParagraphContentField } from "@/@types/Description";

interface SplittedFieldValidatorParams {
    field: SplittedContentField;
    index: number;
}

export default class SplittedFieldValidator {
    // public
    public index: number;
    public field: SplittedContentField;
    // private
    private readonly REQUIRED_PROPERTIES = ["type", "left", "right"] as (keyof SplittedContentField)[];

    public constructor(params: SplittedFieldValidatorParams) {
        this.field = params.field;
        this.index = params.index;
    }

    public validate() {
        this.validateSyntax();
        this.eraseRedundantProperties();
        this.validateSubfields();
    }

    /**
     * Ensure that all required properties are received
     */
    private validateSyntax() {
        const { REQUIRED_PROPERTIES, field, index } = this;

        REQUIRED_PROPERTIES.forEach((property: string) => {
            if (!field.hasOwnProperty(property)) {
                throw new InvalidRequestedBody([
                    {
                        element: `Description field with index ${index}`,
                        message: `Required property ${property} has not been received"`,
                        type: "required",
                    },
                ]);
            }
        });
    }
    /**
     * Determine whether there are some extra properties for some reason and if so delete them
     */
    private eraseRedundantProperties() {
        const { REQUIRED_PROPERTIES, field } = this;
        Object.keys(field).forEach((property: any) => {
            if (!REQUIRED_PROPERTIES.includes(property)) delete (field as any)[property];
        });
    }

    private validateSubfields() {
        this.validateOneSide("left");
        this.validateOneSide("right");
    }

    /**
     * Subsequent step after `validateSubfields` method
     * */
    private validateOneSide(side: "left" | "right") {
        const { index } = this;
        const data = this.field[side];
        switch (data.type as unknown) {
            case FieldType.PARAGRAPH:
                return new ParagraphFieldValidator({
                    field: data as ParagraphContentField,
                    index,
                    splitted: true,
                }).validate();
            case FieldType.IMAGE:
                return new ImageFieldValidator({
                    field: data as ImageContentField,
                    index,
                }).validate();
            default:
                throw new InvalidRequestedBody([
                    {
                        element: `Description field with index ${index}`,
                        message: `Received unexpected field type- "${data.type as any}"`,
                        type: "Unprocessable value received",
                    },
                ]);
        }
    }
}
