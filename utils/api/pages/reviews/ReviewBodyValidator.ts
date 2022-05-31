import joi from "joi";
import { InvalidRequestedBody } from "@/utils/api/Errors";
import restrictions from "@/utils/restrictions/createReview";

interface ValidateParams {
    points: number;
    reviewContent: string;
    tags: string[];
}

export default class ReviewBodyValidator {
    /**
     * Validate data comming from `req.body`
     *
     * Throwns:
     * - `InvalidRequestedBody`- when anything gone wrong
     */
    public constructor() {}
    /**
     * Validate data comming from `req.body`
     *
     * Throwns:
     * - `InvalidRequestedBody`- when anything gone wrong
     */
    public validate(params: ValidateParams) {
        const scheme = joi.object({
            points: joi.number().min(0).max(10).required(),
            reviewContent: joi.string().min(restrictions.content.min).max(restrictions.content.max).required(),
            tags: joi.array().min(restrictions.tagsInGeneral.min).max(restrictions.tagsInGeneral.max).items(joi.string().min(restrictions.singleTag.min).max(restrictions.singleTag.max)).required(),
        });
        const { error } = scheme.validate(params);
        if (error) throw new InvalidRequestedBody();
    }
}
