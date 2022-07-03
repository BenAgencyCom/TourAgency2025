// Tools
import joi from "joi";
import { prisma } from "@/prisma/db";
import { InvalidRequestedBody } from "@/utils/api/Errors";
import createBetterJoiErrors from "@/utils/api/betterJoiErrors";
import restrictions from "@/utils/restrictions/createLandmark";
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
        // validate destination ID
        await this.findDestinationWithRecivedId();
        //
        this.validateDescription();
    }

    /** Validate each field **expect** `description` */
    private validateAllFields() {
        const { title, shortDescription } = restrictions;

        const scheme = joi.object({
            title: joi.string().min(title.min).max(title.max).required(),
            shortDescription: joi.string().min(shortDescription.min).max(shortDescription.max).required(),
            destinationId: joi.string().required(),
            type: joi.valid("ANTIQUE", "ART", "BUILDING", "MONUMENT", "MUSEUM", "NATURE", "RESTAURANT").required(),
        });

        const { error } = scheme.validate({
            title: this.fields.title,
            shortDescription: this.fields.shortDescription,
            destinationId: this.fields.destinationId,
            type: this.fields.type,
        });

        if (error) throw new InvalidRequestedBody(createBetterJoiErrors(error));
    }
    /** Ensure that there is a destination with received id */
    private async findDestinationWithRecivedId() {
        const result = await prisma.destination.findUnique({
            where: {
                id: this.fields.destinationId,
            },
        });
        if (!result) {
            throw new InvalidRequestedBody([
                {
                    element: "destinationId",
                    type: "Invalid",
                    message: "Given id does not reflect any record in db",
                },
            ]);
        }
    }
}
