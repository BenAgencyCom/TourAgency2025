import { ValidationError } from "joi";
//
interface JoiError {
    message: string;
    path: string[];
    type: string;
    context: {
        label: string;
        key: string;
    };
}
//
export type BetterJoiError = {
    message: string;
    type: string;
    element: string;
};
//
const createBetterJoiErrors = (joiErrorsSchema: ValidationError): BetterJoiError[] => {
    const resultElementsList: BetterJoiError[] = [];
    // instead of `any` type in the following  line it supposed to be `JoiError` type, but unfortunately ts doesn't have a craving to cooperate.
    joiErrorsSchema.details.forEach((singleError: any) => {
        const result = {} as BetterJoiError;
        //
        result.element = singleError.path[0];
        result.type = singleError.type.split(".")[1];
        result.message = singleError.message;
        // avoid duplicate errors for the same element ( array validation case )
        if (!resultElementsList.find((el) => el.element === result.element)) {
            resultElementsList.push(result);
        }
    });
    //
    return resultElementsList;
};

export default createBetterJoiErrors;
