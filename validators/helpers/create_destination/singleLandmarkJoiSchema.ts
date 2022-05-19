import joi from "joi";
import restrictions from "@/utils/restrictions/createDestination_OLD";

const { title, description, tag } = restrictions.landmark;

const schema = joi.object({
    title: joi.string().min(title.min).max(title.max),
    description: joi.string().min(description.min).max(description.max),
    type: joi.valid("RESTAURANT", "MONUMENT", "ANTIQUE", "RELIC", "ART", "NATURE"),
    tags: joi.array().items(joi.string().min(tag.min).max(tag.max)),
});

export default schema;
