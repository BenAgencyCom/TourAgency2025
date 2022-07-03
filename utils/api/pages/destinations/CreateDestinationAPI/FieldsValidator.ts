// Tools
import joi from "joi";
import { InvalidRequestedBody } from "@/utils/api/Errors";
import createBetterJoiErrors from "@/utils/api/betterJoiErrors";
import restrictions from "@/utils/restrictions/createDestination";
import DescriptionValidator from "@/utils/api/abstracts/DescriptionValidator";
// Types
import type { ParsedRequestBody } from "./@types";

/**
 * This class is resposible for ensuring
 * that all expected properties have been received
 * - The only argument is a `fields` object
 * - If any issues are encountered, the `InvalidRequestedBody` error will be thrown
 */
export default class FieldsValidator extends DescriptionValidator {
    public constructor(protected fields: ParsedRequestBody) {
        super(fields.description);
    }

    public async validate() {
        this.validateAllFields();
        this.ensureThereIsNoHiddenJSON();

        this.validateDescription();
    }

    /** Validate each field **expect** `description` */
    private validateAllFields() {
        const { city, shortDescription, country } = restrictions;

        type PropertiesToValidate = keyof ParsedRequestBody;

        const scheme = joi.object({
            city: joi.string().min(city.min).max(city.max).required(),
            shortDescription: joi.string().min(shortDescription.min).max(shortDescription.max).required(),
            country: joi
                .object({
                    code: joi.string().length(2).required(),
                    label: joi.string().min(country.label.min).max(country.label.max).required(),
                    phone: joi.string().min(country.phone.min).max(country.phone.max).required(),
                })
                .required(),
            population: joi.number().min(1).max(7000000000),
            continent: joi.valid("Asia", "Europe", "Africa", "North_America", "South_America", "Australia_Oceania", "Antarctica").required(),
        } as Record<PropertiesToValidate, any>);

        const { error } = scheme.validate({
            city: this.fields.city,
            shortDescription: this.fields.shortDescription,
            country: this.fields.country,
            population: this.fields.population,
            continent: this.fields.continent,
        } as Record<PropertiesToValidate, any>);

        if (error) throw new InvalidRequestedBody(createBetterJoiErrors(error));
    }

    private ensureThereIsNoHiddenJSON() {
        const test = (property: string, value: any) => {
            try {
                if (JSON.parse(value) instanceof Object) {
                    throw new InvalidRequestedBody([
                        {
                            element: property,
                            message: `${property} property has been received with unprocessable type`,
                            type: "invalid type",
                        },
                    ]);
                }
            } catch (e: any) {
                if (e instanceof InvalidRequestedBody) {
                    throw new InvalidRequestedBody(e.joiFeedback);
                }
            }
        };
        const generalProperties: (keyof ParsedRequestBody)[] = ["city", "population", "continent", "shortDescription"];

        for (const property of generalProperties) {
            test(property, this.fields[property]);
        }

        if (this.fields.country) {
            const countryFieldProperties: (keyof ParsedRequestBody["country"])[] = ["label", "phone"];

            for (const property of countryFieldProperties) {
                test(`country.${property}`, this.fields.country[property]);
            }
        }
    }
}
