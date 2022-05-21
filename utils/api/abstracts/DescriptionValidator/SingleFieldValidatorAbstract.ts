// Tools
import joi from "joi";
import { InvalidRequestedBody } from "@/utils/api/Errors";
import createBetterJoiErrors from "@/utils/api/betterJoiErrors";
// Types
import { FieldType } from "@/@types/Description";
import type { Restriction } from "@/@types/Restriction";
import type { HeaderContentField, ParagraphContentField, ImageContentField } from "@/@types/Description";

interface SingleFieldValidatorAbstractParams {
    index: number;
    restrictions: Restriction;
    field: HeaderContentField | ParagraphContentField | ImageContentField;
    requiredProperties: string[];
    textToValidate: string;
}

/**
 * Abstract `SingleFieldValidatorAbstract` reduces repeatable code for diffrent validators
 *
 * Params:
 * - `index`- index comming from *forEach* loop
 * - `restrictions`- object containing `min` and `max` properties
 * - `requiredProperties`- string[]- containing properties which are mandatory
 * - `field`- main hero of the abstract
 * - `textToValidate`- self evident
 *
 * Throwns
 * - `InvalidRequestedBody`- when any issue is detected
 * */
export default abstract class SingleFieldValidatorAbstract {
    public index: number;
    public restrictions: Restriction;
    public field: HeaderContentField | ParagraphContentField | ImageContentField;
    public requiredProperties: string[];
    public textToValidate: string;
    //
    private actualProperties: string[];

    public constructor(props: SingleFieldValidatorAbstractParams) {
        // Public
        this.index = props.index;
        this.field = props.field;
        this.restrictions = props.restrictions;
        this.requiredProperties = props.requiredProperties;
        this.textToValidate = props.textToValidate;
        // Private
        this.actualProperties = Object.keys(props.field);
    }

    public validate() {
        this.validateLength();
        this.ensureThatAllRequiredPropertiesArePassed();
        this.eraseRedundantProperties();
    }

    private validateLength() {
        const { min, max } = this.restrictions;
        const scheme = joi.string().min(min).max(max).required();
        //
        const { error } = scheme.validate(this.textToValidate);
        if (error) {
            const errorMSG = createBetterJoiErrors(error);
            errorMSG[0].element = `Description field with index ${this.index}`;
            throw new InvalidRequestedBody(errorMSG);
        }
    }

    private ensureThatAllRequiredPropertiesArePassed() {
        const { requiredProperties, actualProperties } = this;

        requiredProperties.forEach((requiredProperty) => {
            if (!actualProperties.includes(requiredProperty)) {
                throw new InvalidRequestedBody([
                    {
                        element: `Description field with index ${this.index}`,
                        message: "Invalid field syntax",
                        type: "Unprocessable value received",
                    },
                ]);
            }
        });
    }

    private eraseRedundantProperties() {
        const { requiredProperties, actualProperties } = this;
        if (requiredProperties.length === actualProperties.length) return;

        actualProperties.forEach((property) => {
            if (!requiredProperties.includes(property)) delete (this.field as any)[property];
        });
    }
}
