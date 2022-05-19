import joi from "joi";
import restrictions from "@/utils/restrictions/createDestination_OLD";
// Types
import type { Schema } from "joi";
import { CreateDestinationRequestPardesBody } from "@/@types/router/destination";

const scheme = joi.object({
    city: joi.string().min(restrictions.city.min).max(restrictions.city.max).required(),
    continent: joi.valid("Asia", "Europe", "Africa", "North_America", "South_America", "Australia_Oceania", "Antarctica"),
    country: joi.object({
        code: joi.string().length(2).required(),
        label: joi.string().max(60).required(),
        phone: joi.string().max(10),
    }),
    population: joi.number().min(restrictions.population.min).max(restrictions.population.max).required(),
    quickDescription: joi.string().min(restrictions.quickDescription.min).max(restrictions.quickDescription.max),
} as Record<keyof CreateDestinationRequestPardesBody, Schema>);

export default scheme;
