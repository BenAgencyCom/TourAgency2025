// Tools
import restrictions from "@/utils/restrictions/createDescription";
import SingleFieldValidatorAbstract from "./SingleFieldValidatorAbstract";
// Types
import type { HeaderContentField } from "@/@types/Description";

interface HeaderFieldValidatorParams {
    field: HeaderContentField;
    index: number;
}

export default class HeaderFieldValidator extends SingleFieldValidatorAbstract {
    public constructor(props: HeaderFieldValidatorParams) {
        super({
            field: props.field,
            index: props.index,
            requiredProperties: ["type", "header"],
            restrictions: restrictions.header,
            textToValidate: props.field.header,
        });
    }
}
